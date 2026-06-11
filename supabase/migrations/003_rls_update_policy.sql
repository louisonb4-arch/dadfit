-- Explicit UPDATE policy for profiles.
-- The existing "own_profile" (FOR ALL) policy may not apply to UPDATE in all contexts.
-- This adds an unambiguous policy scoped to authenticated role only.
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING  (auth.uid() = id)
WITH CHECK (auth.uid() = id);
