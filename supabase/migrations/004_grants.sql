-- Grant table-level permissions to authenticated and anon roles.
-- Tables created via SQL Editor do not get auto-grants unlike Dashboard-created tables.
-- RLS policies enforce row-level restrictions on top of these grants.

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles         TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_logs       TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workout_sessions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.weekly_checkins  TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fitness_tests    TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.milestones       TO authenticated;
GRANT SELECT                         ON public.subscriptions    TO authenticated;

-- anon: read-only on profiles (needed for auth flows), no access to user data tables
GRANT SELECT ON public.profiles TO anon;
