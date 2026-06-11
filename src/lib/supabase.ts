import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Use untyped client — run `supabase gen types typescript` to generate proper types
export const supabase = createClient(url, key)

export const isSupabaseConfigured = Boolean(url && key && !url.includes('your-project'))
