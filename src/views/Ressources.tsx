import React, { useState } from 'react'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl p-5 shadow-sm ${className}`}>{children}</div>
}
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">{children}</p>
}

const CATEGORIES = ['Tous', 'Mobilité', 'Sommeil', 'Stress', 'Nutrition', 'Mental']

const ARTICLES = [
  { cat: 'Mobilité', emoji: '🦵', title: '5 minutes de mobilité chaque matin', desc: 'La routine minimale pour protéger les articulations et réduire les raideurs matinales. Faisable en slip avant la douche.', read: '4 min', color: '#F0FDF4', accent: '#163B2D' },
  { cat: 'Sommeil', emoji: '🌙', title: 'Pourquoi tu dors mal (et quoi faire)', desc: 'Écrans, stress, café tardif. Les vraies causes du mauvais sommeil chez les pères actifs et des solutions concrètes.', read: '6 min', color: '#EFF6FF', accent: '#1D4ED8' },
  { cat: 'Stress', emoji: '😤', title: 'Le stress chronique stocke la graisse', desc: 'Le cortisol, c\'est la molécule du gras abdominal. Comprendre pourquoi le stress sabote ta transformation.', read: '5 min', color: '#FEF3C7', accent: '#92400E' },
  { cat: 'Nutrition', emoji: '🥩', title: 'Calculer ses protéines sans balance', desc: 'La méthode de la main : portion de protéines = paume de main. Simple, efficace, pas besoin d\'app.', read: '3 min', color: '#F0FDF4', accent: '#163B2D' },
  { cat: 'Mental', emoji: '🧠', title: 'L\'identité avant la motivation', desc: 'La motivation fluctue. L\'identité, non. Devenir "quelqu\'un qui s\'entraîne" plutôt que "quelqu\'un qui essaie de s\'entraîner".', read: '7 min', color: '#F5F3FF', accent: '#5B21B6' },
  { cat: 'Mobilité', emoji: '🔙', title: 'Protéger son dos quand on travaille assis', desc: '8h assis par jour, c\'est 8h de compression lombaire. Les 3 exercices quotidiens pour contrebalancer ça.', read: '5 min', color: '#F0FDF4', accent: '#163B2D' },
  { cat: 'Mental', emoji: '🔄', title: 'Reprendre après une pause : le guide', desc: 'Tu n\'as pas raté. Tu as juste besoin d\'un système pour revenir. Exactement ce qu\'on fait ici.', read: '4 min', color: '#111827', accent: '#22C55E' },
  { cat: 'Sommeil', emoji: '📵', title: 'Écrans et testostérone : le lien', desc: 'La lumière bleue tarde à endormir mais elle impacte aussi la production hormonale. Ce que ça change pour toi.', read: '5 min', color: '#EFF6FF', accent: '#1D4ED8' },
]

const FAQS = [
  { q: 'Je n\'ai pas de matériel, est-ce que ça marche quand même ?', a: 'Oui. Les 3 séances DadFit sont conçues pour fonctionner sans rien d\'autre que ton propre poids. Une chaise ou un mur suffisent pour les variantes avancées.' },
  { q: 'J\'ai mal au dos, je peux quand même commencer ?', a: 'Consulte un médecin si la douleur est importante. Pour des raideurs légères, la plupart des exercices du programme protègent et renforcent le bas du dos. Le pont fessier et le gainage sont particulièrement bénéfiques.' },
  { q: 'Combien de poids je peux perdre en 90 jours ?', a: 'Entre 3 et 8 kg pour la plupart des hommes, en combinant les séances avec les 4 piliers. La vitesse dépend de ton point de départ. Ce qui compte plus que le chiffre : l\'énergie, la récupération, la force.' },
  { q: 'Dois-je suivre un régime particulier ?', a: 'Non. DadFit n\'impose aucun régime. Une seule règle : les protéines d\'abord à chaque repas. Tout le reste s\'adapte à ta vie.' },
  { q: 'Que faire si je rate plusieurs jours d\'affilée ?', a: 'Reprends à la séance suivante, pas au début. Les jours manqués ne suppriment pas le travail déjà fait. La constance ne veut pas dire perfection — ça veut dire toujours revenir.' },
  { q: 'Je suis végétarien, comment adapter la nutrition ?', a: 'Lentilles, pois chiches, tofu, tempeh, œufs, fromage blanc et yaourt grec. Les portions sont légèrement plus grandes pour atteindre les mêmes apports. La règle reste la même : une source à chaque repas.' },
]

const MOBILITY_ROUTINE = [
  { name: 'Rotations cervicales', reps: '10 × chaque côté', icon: '↔️' },
  { name: 'Rotations d\'épaules', reps: '10 × avant + arrière', icon: '🔄' },
  { name: 'Ouverture de hanches', reps: '8 × chaque côté', icon: '🦵' },
  { name: 'Rotations de chevilles', reps: '10 × chaque pied', icon: '🦶' },
  { name: 'Chat-vache (dos)', reps: '10 allers-retours lents', icon: '🐈' },
]

const CAT_ICONS: Record<string, string> = {
  'Tous': '📋', 'Mobilité': '🦵', 'Sommeil': '🌙', 'Stress': '😤', 'Nutrition': '🥩', 'Mental': '🧠',
}

export default function Ressources() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filtered = activeCategory === 'Tous' ? ARTICLES : ARTICLES.filter(a => a.cat === activeCategory)

  return (
    <div className="min-h-full bg-[#F8F8F5]">
      <div className="max-w-[1100px] mx-auto px-6 py-6">
        <div className="flex gap-6 items-start">

          {/* ── LEFT MAIN ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Header */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#9CA3AF] mb-1">DadFit</p>
              <h1 className="text-3xl font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>Ressources</h1>
              <p className="text-sm text-[#6B7280] mt-1">Guides, conseils et réponses — tout ce dont tu as besoin pour aller plus loin.</p>
            </div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                  style={{
                    background: activeCategory === c ? '#22C55E' : 'white',
                    color: activeCategory === c ? 'white' : '#6B7280',
                    border: `1.5px solid ${activeCategory === c ? '#22C55E' : '#F3F4F6'}`,
                  }}
                >
                  <span>{CAT_ICONS[c]}</span>
                  <span>{c}</span>
                </button>
              ))}
            </div>

            {/* Articles 2-col grid */}
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((a, i) => (
                <div key={i} className="rounded-2xl p-4 cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ background: a.color === '#111827' ? '#111827' : 'white', border: '1px solid #F3F4F6' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: `${a.accent}18` }}>
                      {a.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full"
                          style={{ background: `${a.accent}18`, color: a.color === '#111827' ? '#22C55E' : a.accent }}>
                          {a.cat}
                        </span>
                        <span className="text-[10px] text-[#9CA3AF]">{a.read}</span>
                      </div>
                      <p className="font-black text-sm mb-1 leading-snug" style={{ color: a.color === '#111827' ? 'white' : '#111827', fontFamily: 'Manrope' }}>
                        {a.title}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: a.color === '#111827' ? '#9CA3AF' : '#6B7280' }}>
                        {a.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <Card>
              <Label>Questions fréquentes</Label>
              <div className="space-y-2">
                {FAQS.map((faq, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-[#F3F4F6]">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-[#FAFAFA] transition-colors"
                    >
                      <span className="text-[#22C55E] font-black text-sm shrink-0 mt-0.5">Q</span>
                      <p className="text-sm font-bold text-[#111827] flex-1">{faq.q}</p>
                      <span className="text-[#9CA3AF] text-xs shrink-0 mt-0.5">{openFaq === i ? '▲' : '▼'}</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 border-t border-[#F9FAFB]">
                        <div className="flex gap-3 pt-3">
                          <span className="text-[#9CA3AF] font-black text-sm shrink-0">A</span>
                          <p className="text-sm text-[#6B7280] leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="w-72 shrink-0 space-y-4" style={{ position: 'sticky', top: 24 }}>

            {/* Mobility routine */}
            <Card>
              <Label>Routine mobilité · 5 min</Label>
              <p className="text-xs text-[#9CA3AF] mb-3">Chaque matin. Avant le café, avant la douche.</p>
              <div className="space-y-2">
                {MOBILITY_ROUTINE.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: '#F9FAFB' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0" style={{ background: '#22C55E' }}>{i + 1}</div>
                    <p className="text-sm font-bold text-[#111827] flex-1">{m.name}</p>
                    <p className="text-[11px] text-[#9CA3AF] shrink-0">{m.reps}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contact */}
            <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: '#22C55E' }}>💬</div>
              <div className="flex-1">
                <p className="font-black text-sm text-[#163B2D]" style={{ fontFamily: 'Manrope' }}>Une question ?</p>
                <p className="text-xs text-[#6B7280] mt-0.5 mb-3">L'équipe DadFit répond sous 24h.</p>
                <button className="w-full py-2 rounded-xl text-sm font-black text-white" style={{ background: '#22C55E', fontFamily: 'Manrope' }}>
                  Contacter
                </button>
              </div>
            </div>

            {/* Quick tip */}
            <div className="rounded-2xl p-4" style={{ background: '#111827' }}>
              <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-2">Le saviez-tu ?</p>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                20 minutes d'activité par jour réduit le risque cardiovasculaire de 35%. Pas besoin d'une salle de sport. Juste de la constance.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
