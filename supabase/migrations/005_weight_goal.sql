ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS weight_goal_kg DECIMAL(5,2);
