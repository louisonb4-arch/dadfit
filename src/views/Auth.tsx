import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { getStoredUTMs } from '../lib/utm'
import { track } from '../lib/posthog'

type Mode = 'login' | 'signup'

function friendlyError(raw: string): string {
  const r = raw.toLowerCase()
  if (r.includes('invalid login') || r.includes('invalid credentials')) return 'Wrong email or password.'
  if (r.includes('email not confirmed')) return 'Check your email — confirm your account first.'
  if (r.includes('already registered') || r.includes('user already exists')) return 'Account already exists. Sign in instead.'
  if (r.includes('password') && r.includes('short')) return 'Password must be at least 8 characters.'
  if (r.includes('rate limit')) return 'Too many attempts. Try again in a few minutes.'
  if (r.includes('network') || r.includes('fetch')) return 'Connection error. Check your internet.'
  return raw
}

export default function Auth() {
  const { signIn, signUp } = useApp()
  const [mode, setMode] = useState<Mode>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (mode === 'signup') track.signupStarted()
  }, [mode])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const utms = getStoredUTMs()
    const utmRecord = Object.keys(utms).length > 0 ? utms as Record<string, string> : undefined

    const { error: err } = mode === 'login'
      ? await signIn(email, password)
      : await signUp(email, password, utmRecord)

    if (err) {
      setError(friendlyError(err))
    } else if (mode === 'signup') {
      track.signupCompleted({
        utm_source: utms.utm_source,
        utm_campaign: utms.utm_campaign,
        utm_medium: utms.utm_medium,
      })
      setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#F8F8F5' }}>
      <div className="w-full max-w-sm">

        <div className="flex justify-center mb-8">
          <img src="/logo.png" alt="DadFit" style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
        </div>

        {success ? (
          <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl"
              style={{ background: '#DCF5E3' }}>
              ✉️
            </div>
            <h2 className="text-xl font-black text-[#111827] mb-3" style={{ fontFamily: 'Manrope' }}>
              Check your email
            </h2>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              We sent a confirmation link to <strong>{email}</strong>.<br />
              Click it to activate your account.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {mode === 'signup' && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: '#DCF5E3' }}>
                <span className="text-xs font-bold text-[#16A34A]">7 days free · No credit card required</span>
              </div>
            )}
            <h2 className="text-2xl font-black text-[#111827] mb-1 leading-tight" style={{ fontFamily: 'Manrope' }}>
              {mode === 'login' ? 'Welcome back.' : 'Start your free trial.'}
            </h2>
            <p className="text-sm text-[#9CA3AF] mb-6">
              {mode === 'login' ? 'Sign in to continue.' : 'Full access for 7 days. Cancel anytime.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#6B7280] mb-1.5 uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="marc@email.com"
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#F9FAFB] border-2 border-[#F3F4F6] font-inter text-sm text-[#111827] focus:outline-none focus:border-[#22C55E] placeholder-[#D1D5DB] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B7280] mb-1.5 uppercase tracking-widest">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'}
                  minLength={8}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#F9FAFB] border-2 border-[#F3F4F6] font-inter text-sm text-[#111827] focus:outline-none focus:border-[#22C55E] placeholder-[#D1D5DB] transition-colors"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 rounded-xl px-4 py-3 bg-red-50">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl text-base font-black text-white transition-all active:scale-95 disabled:opacity-60"
                style={{ background: '#22C55E', fontFamily: 'Manrope', boxShadow: '0 8px 24px rgba(34,197,94,0.3)' }}
              >
                {loading ? '…' : mode === 'login' ? 'Sign in →' : 'Start free — 7 days →'}
              </button>
            </form>

            <p className="text-center text-sm text-[#9CA3AF] mt-6">
              {mode === 'login' ? "No account?" : 'Already have an account?'}{' '}
              <button
                className="font-bold text-[#22C55E] hover:underline"
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null) }}
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
