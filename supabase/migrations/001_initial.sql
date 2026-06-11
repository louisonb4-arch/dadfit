-- ════════════════════════════════════════════════════════════
-- DadFit — Initial Schema
-- ════════════════════════════════════════════════════════════

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── profiles ────────────────────────────────────────────────
CREATE TABLE public.profiles (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name          TEXT,
  email               TEXT,
  age                 TEXT,
  main_goal           TEXT,
  fitness_level       TEXT,
  number_of_kids      INTEGER,
  pain_areas          TEXT[],
  weight_kg           DECIMAL(5,2),
  waist_cm            DECIMAL(5,2),
  program_start_date  DATE,
  onboarded_at        TIMESTAMPTZ,
  -- Health data consent
  consent_data_health BOOLEAN NOT NULL DEFAULT FALSE,
  consent_at          TIMESTAMPTZ,
  -- Free trial
  trial_started_at    TIMESTAMPTZ,
  trial_ends_at       TIMESTAMPTZ,
  -- Acquisition (UTM params stored as JSON)
  utm_params          JSONB,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── subscriptions ────────────────────────────────────────────
CREATE TABLE public.subscriptions (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_customer_id       TEXT UNIQUE,
  stripe_subscription_id   TEXT UNIQUE,
  status                   TEXT NOT NULL DEFAULT 'incomplete',
  current_period_end       TIMESTAMPTZ,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT valid_status CHECK (status IN ('active','canceled','past_due','trialing','incomplete'))
);

-- ── daily_logs ───────────────────────────────────────────────
-- Manual entry only (V1 — no Health/HealthConnect sync)
CREATE TABLE public.daily_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date        DATE NOT NULL,
  steps       INTEGER,
  energy_score INTEGER CHECK (energy_score BETWEEN 1 AND 5),
  weight_kg   DECIMAL(5,2),
  waist_cm    DECIMAL(5,2),
  slept_well  BOOLEAN,
  joints      TEXT CHECK (joints IN ('good','stiff','pain')),
  water_l     DECIMAL(4,2),
  bedtime_ok  BOOLEAN,
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, date)
);

-- ── workout_sessions ─────────────────────────────────────────
CREATE TABLE public.workout_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date            DATE NOT NULL,
  type            TEXT CHECK (type IN ('A','B','C','D')),
  status          TEXT NOT NULL CHECK (status IN ('completed','partial','skipped')),
  duration_min    INTEGER,
  energy_after    INTEGER CHECK (energy_after BETWEEN 1 AND 10),
  difficulty_felt INTEGER CHECK (difficulty_felt BETWEEN 1 AND 10),
  pain_level      TEXT CHECK (pain_level IN ('none','light','strong')),
  exercises       JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── weekly_checkins ──────────────────────────────────────────
CREATE TABLE public.weekly_checkins (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  week_start  DATE NOT NULL,
  score       INTEGER CHECK (score BETWEEN 0 AND 100),
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, week_start)
);

-- ── fitness_tests ────────────────────────────────────────────
-- Push-ups / Squats / Plank — manual entry (V1)
-- Architecture note: future health platform sync (Apple Health, Health Connect)
-- should INSERT into this table via a separate sync service,
-- keeping this schema unchanged.
CREATE TABLE public.fitness_tests (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tested_at      DATE NOT NULL,
  pushups        INTEGER,
  squats         INTEGER,
  plank_seconds  INTEGER,
  source         TEXT NOT NULL DEFAULT 'manual',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── milestones ───────────────────────────────────────────────
CREATE TABLE public.milestones (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  milestone_key  TEXT NOT NULL,
  unlocked_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, milestone_key)
);

-- ════════════════════════════════════════════════════════════
-- Row-Level Security
-- ════════════════════════════════════════════════════════════

ALTER TABLE public.profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_logs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_checkins  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fitness_tests    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones       ENABLE ROW LEVEL SECURITY;

-- Users only see/write their own data
CREATE POLICY "own_profile"          ON public.profiles         USING (id = auth.uid());
CREATE POLICY "own_subscriptions"    ON public.subscriptions    USING (user_id = auth.uid());
CREATE POLICY "own_daily_logs"       ON public.daily_logs       USING (user_id = auth.uid());
CREATE POLICY "own_sessions"         ON public.workout_sessions USING (user_id = auth.uid());
CREATE POLICY "own_weekly_checkins"  ON public.weekly_checkins  USING (user_id = auth.uid());
CREATE POLICY "own_fitness_tests"    ON public.fitness_tests    USING (user_id = auth.uid());
CREATE POLICY "own_milestones"       ON public.milestones       USING (user_id = auth.uid());

-- Allow insert on own records
CREATE POLICY "insert_profile"          ON public.profiles         FOR INSERT WITH CHECK (id = auth.uid());
CREATE POLICY "insert_daily_logs"       ON public.daily_logs       FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "insert_sessions"         ON public.workout_sessions FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "insert_weekly_checkins"  ON public.weekly_checkins  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "insert_fitness_tests"    ON public.fitness_tests    FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "insert_milestones"       ON public.milestones       FOR INSERT WITH CHECK (user_id = auth.uid());

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Protect server-owned fields from authenticated client modification.
-- Service role, postgres, and SQL Editor have auth.uid() = NULL → bypass.
CREATE OR REPLACE FUNCTION protect_server_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- auth.uid() is non-null only for requests carrying a Supabase JWT (anon/authenticated roles).
  -- postgres superuser, service_role, and SQL Editor all have auth.uid() = NULL → unrestricted.
  IF auth.uid() IS NOT NULL THEN
    NEW.trial_started_at = OLD.trial_started_at;
    NEW.trial_ends_at    = OLD.trial_ends_at;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_protect_trial_fields
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION protect_server_fields();

-- Subscriptions table is write-only from webhook (service role) — no client writes
-- The RLS policy "own_subscriptions" only allows SELECT for the user.
-- Explicitly revoke INSERT/UPDATE/DELETE via policy (no insert_subscriptions policy exists by design).

-- Auto-create profile row on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, trial_started_at, trial_ends_at)
  VALUES (NEW.id, NEW.email, NOW(), NOW() + INTERVAL '7 days');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
