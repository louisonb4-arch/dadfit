-- Add explicit onboarding_completed flag to profiles.
-- first_name, age, fitness_level, main_goal, number_of_kids already exist from 001_initial.sql.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_completed    BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ;

-- Backfill any users who already completed onboarding via the old onboarded_at column.
UPDATE public.profiles
SET
  onboarding_completed    = TRUE,
  onboarding_completed_at = onboarded_at
WHERE onboarded_at IS NOT NULL
  AND onboarding_completed = FALSE;
