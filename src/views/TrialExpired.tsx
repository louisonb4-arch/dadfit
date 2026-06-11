import { useApp } from '../context/AppContext'

export default function TrialExpired() {
  const { signOut, user } = useApp()
  const stripeEnabled = import.meta.env.VITE_STRIPE_ENABLED === 'true'

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#F8F8F5' }}>
      <div className="w-full max-w-sm text-center">

        <div className="flex justify-center mb-8">
          <img src="/logo.png" alt="DadFit" style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl"
            style={{ background: '#FEF3C7' }}>
            ⏰
          </div>
          <h2 className="text-2xl font-black text-[#111827] mb-3 leading-tight" style={{ fontFamily: 'Manrope' }}>
            Your free trial has ended{user.name ? `, ${user.name}` : ''}.
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
            Your 7-day free access is over. The full program is coming soon as a paid subscription.
          </p>

          {stripeEnabled ? (
            <a href="/?start-checkout=true"
              className="flex items-center justify-center w-full py-4 rounded-2xl text-base font-black text-white transition-all active:scale-95 mb-3"
              style={{ background: '#163B2D', fontFamily: 'Manrope' }}>
              Continue for $29/month →
            </a>
          ) : (
            <div className="rounded-2xl p-4 mb-4" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <p className="text-sm font-bold text-[#163B2D] mb-1">Subscriptions opening soon.</p>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                We'll notify you at <strong>{user.name}</strong>'s email when it's live.
              </p>
            </div>
          )}

          <button
            onClick={signOut}
            className="w-full py-3 rounded-2xl text-sm font-bold text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
          >
            Sign out
          </button>
        </div>

      </div>
    </div>
  )
}
