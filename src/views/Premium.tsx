import { useState, useEffect } from 'react'
import { startCheckout } from '../lib/stripe'
import { track } from '../lib/posthog'
import { useApp } from '../context/AppContext'

const FREE_FEATURES = [
  'Programme 90 jours complet',
  '3 séances guidées (A, B, C)',
  'DadFit Score hebdomadaire',
  'Check-in quotidien',
  'Suivi streak',
  'Badges de progression',
]

const PREMIUM_FEATURES = [
  { label: 'Programmes avancés (Phase 4, 5)', hot: false },
  { label: 'Séances avec matériel (haltères, bandes)', hot: false },
  { label: 'Plan nutrition personnalisé', hot: true },
  { label: 'Suivi du poids et des mesures', hot: false },
  { label: 'Vidéos de démonstration des exercices', hot: false },
  { label: 'Coaching IA — réponses personnalisées', hot: true },
  { label: 'Accès aux programmes spéciaux (dos, mobilité)', hot: false },
  { label: 'Contenu exclusif hebdomadaire', hot: false },
  { label: 'Support prioritaire', hot: false },
  { label: 'Téléchargement hors-ligne', hot: false },
]

const TESTIMONIALS = [
  { name: 'Marc L.', age: 42, text: '"J\'avais essayé 3 applis avant DadFit. Les autres me vendaient du rêve. DadFit m\'a appris à m\'adapter."', kg: '-7 kg', sessions: 28 },
  { name: 'Julien R.', age: 38, text: '"Le coaching IA est bluffant. Il sait quand pousser et quand reculer. Comme un vrai coach mais disponible à 6h du matin."', kg: '-5 kg', sessions: 34 },
  { name: 'David M.', age: 45, text: '"J\'ai récupéré plus d\'énergie en 6 semaines que je n\'en avais eu en 3 ans. Mes gamins remarquent la différence."', kg: '-4 kg', sessions: 21 },
]

export default function Premium({ showPaywall = false }: { showPaywall?: boolean }) {
  const { signOut } = useApp()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')

  async function handleCheckout() {
    setCheckoutError(null)
    setCheckoutLoading(true)
    try {
      await startCheckout()
    } catch (err) {
      setCheckoutError((err as Error).message)
      setCheckoutLoading(false)
    }
  }

  useEffect(() => {
    if (showPaywall) track.viewedPricing()
  }, [showPaywall])

  const price = billing === 'yearly' ? '9,90' : '14,90'
  const priceNote = billing === 'yearly' ? 'soit 118,80€/an · -33%' : '14,90€/mois'

  return (
    <div className="min-h-full bg-[#F8F8F5]">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-5">

        {/* ── Hero ── */}
        <div className="rounded-3xl p-6 relative overflow-hidden text-center"
          style={{ background: '#163B2D' }}>
          <div className="absolute inset-0 opacity-10" style={{
            background: 'radial-gradient(circle at 50% 100%, #22C55E 0%, transparent 70%)'
          }} />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
              style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.3)' }}>
              👑
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-2">DadFit Premium</p>
            <h1 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Manrope' }}>
              Va plus loin.<br />Sans tout changer.
            </h1>
            <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-xs mx-auto">
              Tout ce qui t'a fait progresser, multiplié par dix. Programmes avancés, coaching IA, nutrition personnalisée.
            </p>
          </div>
        </div>

        {/* ── Billing toggle ── */}
        <div className="flex items-center justify-center">
          <div className="flex p-1 rounded-xl" style={{ background: '#F3F4F6' }}>
            {(['monthly', 'yearly'] as const).map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="px-5 py-2 rounded-lg text-sm font-bold transition-all"
                style={{
                  background: billing === b ? 'white' : 'transparent',
                  color: billing === b ? '#111827' : '#9CA3AF',
                  boxShadow: billing === b ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {b === 'monthly' ? 'Mensuel' : 'Annuel'}
                {b === 'yearly' && (
                  <span className="ml-1.5 text-[10px] font-black text-[#22C55E]">-33%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Price card ── */}
        <div className="rounded-3xl p-6 text-center" style={{ background: '#22C55E' }}>
          <p className="text-6xl font-black text-white mb-1" style={{ fontFamily: 'Manrope' }}>
            {price}€
          </p>
          <p className="text-sm font-semibold text-white/70 mb-5">/mois · {priceNote}</p>
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="w-full py-4 rounded-2xl text-base font-black text-[#163B2D] transition-all active:scale-95 disabled:opacity-60"
            style={{ background: 'white', fontFamily: 'Manrope' }}>
            {checkoutLoading ? 'Redirecting…' : 'Start DadFit — $29/mo →'}
          </button>
          {checkoutError && <p className="text-xs text-red-300 mt-2 text-center">{checkoutError}</p>}
          <p className="text-xs text-white/60 mt-3">Cancel anytime · No commitment</p>
        </div>

        {/* ── Feature comparison ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* Free */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-[#9CA3AF] mb-3">Gratuit</p>
            <div className="space-y-2">
              {FREE_FEATURES.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#22C55E] text-xs mt-0.5">✓</span>
                  <p className="text-xs text-[#374151]">{f}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Premium */}
          <div className="rounded-2xl p-4" style={{ background: '#163B2D' }}>
            <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">Premium</p>
            <div className="space-y-2">
              {PREMIUM_FEATURES.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#22C55E] text-xs mt-0.5 shrink-0">★</span>
                  <p className="text-xs text-white/90">
                    {f.label}
                    {f.hot && (
                      <span className="ml-1 text-[9px] font-black text-[#22C55E]">NOUVEAU</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3 px-1">Ils ont sauté le pas</p>
          <div className="space-y-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-sm text-[#374151] leading-relaxed mb-3 italic">{t.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                      style={{ background: 'linear-gradient(135deg, #22C55E, #163B2D)' }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#111827]">{t.name} · {t.age} ans</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-right">
                    <div>
                      <p className="text-sm font-black text-[#22C55E]">{t.kg}</p>
                      <p className="text-[10px] text-[#9CA3AF]">perdus</p>
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#111827]">{t.sessions}</p>
                      <p className="text-[10px] text-[#9CA3AF]">séances</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Guarantee ── */}
        <div className="rounded-2xl p-4 flex items-start gap-3"
          style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
          <span className="text-2xl">🛡️</span>
          <div>
            <p className="font-black text-sm text-[#163B2D]">Satisfait ou remboursé · 30 jours</p>
            <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">
              Si tu n'es pas satisfait dans les 30 premiers jours, on te rembourse. Sans condition, sans formulaire.
            </p>
          </div>
        </div>

        {/* ── Final CTA ── */}
        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="w-full py-4 rounded-2xl text-base font-black text-white transition-all active:scale-95 disabled:opacity-60"
          style={{ background: '#163B2D', fontFamily: 'Manrope' }}>
          Start DadFit — $29/month →
        </button>

        {showPaywall && (
          <p className="text-center text-xs text-[#9CA3AF] mt-4">
            Already subscribed?{' '}
            <button className="text-[#22C55E] font-bold hover:underline" onClick={signOut}>
              Sign out
            </button>
          </p>
        )}

      </div>
    </div>
  )
}
