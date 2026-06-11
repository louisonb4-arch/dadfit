import React, { useState } from 'react'

const WHY_ITEMS = [
  { icon: '🚶', bold: 'Tu bouges moins.', text: 'Avant, tu jouais, tu sortais, tu marchais. Aujourd\'hui, ta journée se résume souvent à voiture → bureau → canapé.' },
  { icon: '🪑', bold: 'Tu travailles assis.', text: 'Huit heures sur une chaise, c\'est huit heures où ton corps ne dépense presque rien.' },
  { icon: '😴', bold: 'Tu dors moins.', text: 'Les enfants, le travail, les écrans. Et moins de sommeil, c\'est plus d\'envies de sucre et moins de volonté.' },
  { icon: '😤', bold: 'Tu es stressé.', text: 'Le stress chronique pousse le corps à stocker.' },
  { icon: '🍺', bold: 'L\'alcool s\'est invité.', text: 'Une bière le soir pour décompresser, un verre au repas. Ça s\'additionne sans qu\'on le voie.' },
  { icon: '⏰', bold: 'Tu n\'as plus de temps pour toi.', text: 'Tu fais passer tout le monde avant. Logique. Mais à force, tu disparais de ta propre liste.' },
]

const PAR_Q = [
  'Un médecin t\'a-t-il déjà dit que tu avais un problème cardiaque ?',
  'Ressens-tu des douleurs à la poitrine au repos ou à l\'effort ?',
  'As-tu déjà perdu connaissance ou eu des vertiges ?',
  'As-tu un problème articulaire ou osseux qu\'un effort pourrait aggraver ?',
  'Prends-tu un traitement pour la tension ou le cœur ?',
  'Y a-t-il une autre raison qui t\'empêcherait de faire de l\'exercice ?',
]

const PILLARS = [
  { icon: '👟', label: 'Bouger', text: 'La majorité des calories dépensées viennent de l\'activité quotidienne, pas de la séance.' },
  { icon: '💧', label: 'S\'hydrater', text: 'Vise 2 L d\'eau. Une légère déshydratation suffit à provoquer fatigue et fringales.' },
  { icon: '🌙', label: 'Dormir', text: 'Fixe une heure de coucher cohérente. Le problème n\'est souvent pas la discipline, c\'est la fatigue.' },
  { icon: '🥩', label: 'Protéines d\'abord', text: 'À chaque repas, une seule question : où est ma source de protéines ? Pas de calcul, pas de balance.' },
]

const SCORE_TABLE = [
  { component: 'Séances complétées', pts: 40, how: '3 séances sur 4 = 30 pts.' },
  { component: 'Marche', pts: 25, how: 'Selon les jours où tu atteins ton objectif.' },
  { component: 'Hydratation', pts: 20, how: 'Crédit partiel : 1,5 L sur 2 L = 75%.' },
  { component: 'Sommeil', pts: 15, how: 'Le moins contrôlable, le moins pénalisant.' },
]

const SCORE_LEVELS = [
  { range: '85–100', msg: 'Semaine solide. Continue exactement comme ça.', color: '#163B2D', bg: '#DCF5E3' },
  { range: '65–84', msg: 'Tu avances. Les résultats suivent la constance.', color: '#92400E', bg: '#FEF3C7' },
  { range: '< 65', msg: 'Semaine difficile — l\'important, c\'est de revenir.', color: '#9CA3AF', bg: '#F3F4F6' },
]

const PHASES = [
  {
    num: 1, emoji: '🌱', title: 'Réactiver le corps', days: 'Jours 1–30',
    frequency: '3 séances/sem', steps: '7 000 pas/jour', color: '#22C55E', bg: '#F0FDF4',
    intro: 'La majorité des pères qui rejoignent DadFit ont déjà essayé de reprendre le sport. Ils ont commencé fort, la fatigue et le quotidien ont eu raison d\'eux, ils ont arrêté. Le problème n\'était pas la motivation : c\'était d\'avoir voulu faire trop, trop vite. Cette phase est volontairement simple. On ne brûle pas un maximum de calories. On reconstruit une chose plus précieuse : la confiance.',
    sessionLabel: 'Séance A — Réactiver (~15-20 min)',
    exercises: [
      { name: 'Squat au poids du corps', desc: 'L\'exercice le plus utile du quotidien. Chaque fois que tu t\'assois, te relèves ou portes ton enfant, tu fais un squat.', errors: [['Descendre trop vite', 'Contrôle la descente'], ['Décoller les talons', 'Poids au milieu du pied'], ['Arrondir le dos', 'Poitrine ouverte'], ['Regarder le sol', 'Regard devant toi']] },
      { name: 'Pompes inclinées', desc: 'Poitrine, épaules, triceps et gainage en un seul mouvement. La version inclinée réduit la difficulté et te laisse progresser en sécurité.', errors: [['Bassin qui s\'affaisse', 'Corps gainé en ligne droite'], ['Coudes trop écartés', 'Coudes à ~45° du corps'], ['Amplitude partielle', 'Descends jusqu\'à frôler le support']] },
      { name: 'Pont fessier', desc: 'Réveille les fessiers, endormis par les heures assises, et protège le bas du dos.', errors: [['Cambrer le bas du dos', 'Serre les abdos en montant'], ['Monter trop haut', 'Arrête-toi quand le corps est aligné']] },
      { name: 'Gainage (planche)', desc: 'Renforce le centre du corps : meilleure posture, meilleur équilibre, moins de douleurs lombaires.', errors: [['Fesses trop hautes', 'Corps en ligne droite'], ['Tête qui tombe', 'Nuque dans l\'alignement du dos'], ['Retenir sa respiration', 'Respire lentement']] },
    ],
    progression: [
      { label: 'Sem. 1', cols: ['3 × 12', '3 × 8', '3 × 15', '3 × 20 s'] },
      { label: 'Sem. 2', cols: ['3 × 15', '3 × 10', '3 × 15', '3 × 30 s'] },
      { label: 'Sem. 3', cols: ['3 × 15 (tempo)', '3 × 12', '3 × 18', '3 × 40 s'] },
      { label: 'Sem. 4', cols: ['4 × 15', '4 × 10', '3 × 20', '3 × 45 s'] },
    ],
    progressionHeaders: ['Squat', 'Pompes inclinées', 'Pont fessier', 'Planche'],
    coach: 'Si aujourd\'hui tu n\'as réussi que 2 séries au lieu de 3, c\'est normal. La réussite n\'est pas de faire une séance parfaite, c\'est de revenir à la suivante. Une mauvaise séance terminée vaut toujours mieux qu\'une séance parfaite jamais commencée.',
    milestones: [
      { icon: '🏅', n: 1, label: '1ʳᵉ séance', sub: 'Tu as commencé. La majorité des hommes n\'arrive jamais jusque-là.' },
      { icon: '🏅', n: 5, label: '5 séances', sub: 'Tu as déjà fait plus d\'activité physique que la plupart des hommes en un mois entier.' },
      { icon: '🏅', n: 12, label: '12 séances', sub: 'Les fondations sont en place. Tu n\'es plus en train d\'essayer. Tu es en train de changer.' },
    ],
  },
  {
    num: 2, emoji: '⚡', title: 'Construire les habitudes', days: 'Jours 31–60',
    frequency: '3–4 séances/sem', steps: '8 000–10 000 pas/jour', color: '#16A34A', bg: '#F0FDF4',
    intro: 'Si tu es arrivé ici, tu as déjà fait ce que beaucoup ne font jamais : tenir plus d\'un mois. Tu bouges davantage, tu dors mieux, l\'énergie revient. C\'est précisément ici que la plupart des hommes échouent : les premiers résultats leur donnent confiance, ils veulent accélérer, ils empilent séances et restrictions, puis s\'épuisent. Chez DadFit, on fait l\'inverse. On progresse lentement, mais durablement.',
    sessionLabel: 'Séance B — Construire (~20-25 min)',
    exercises: [
      { name: 'Squat tempo (ou goblet squat)', desc: 'On augmente la difficulté par le contrôle, pas par le saut. Descente lente sur 3 secondes, pause en bas, remontée.', errors: [['Bâcler la phase lente', 'Compte vraiment 3 secondes'], ['Genoux qui rentrent', 'Genoux dans l\'axe des pieds']] },
      { name: 'Pompes classiques', desc: 'Tu passes des pompes inclinées au sol. Si tu n\'atteins pas 8 répétitions propres, garde une légère inclinaison.', errors: [['Demi-amplitude', 'Poitrine près du sol'], ['Cou tendu vers l\'avant', 'Corps qui descend d\'un bloc']] },
      { name: 'Fentes arrière alternées', desc: 'Premier vrai travail sur une jambe — comme dans la vraie vie. Développe quadriceps, fessiers, ischios et équilibre.', errors: [['Genou avant qui dépasse l\'orteil', 'Genou aligné avec le pied'], ['Buste penché', 'Reste droit, gainé']] },
      { name: 'Gainage latéral', desc: 'Renforce les obliques et la stabilité du bassin — essentiel quand on reste assis toute la journée.', errors: [['Hanches qui tombent', 'Pousse le bassin vers le haut'], ['Épaule affaissée', 'Appuie fermement sur l\'avant-bras']] },
    ],
    progression: [
      { label: 'Sem. 5', cols: ['3 × 12', '3 × 8', '3 × 8', '3 × 25 s'] },
      { label: 'Sem. 6', cols: ['4 × 12', '3 × 10', '3 × 10', '3 × 30 s'] },
      { label: 'Sem. 7', cols: ['4 × 14', '4 × 10', '3 × 12', '3 × 35 s'] },
      { label: 'Sem. 8', cols: ['4 × 15', '4 × 12', '4 × 10', '3 × 40 s'] },
    ],
    progressionHeaders: ['Squat tempo', 'Pompes', 'Fentes /jambe', 'Gainage latéral'],
    coach: 'Le seul homme que tu dois battre, c\'est celui que tu étais au jour 1. Si tu soulèves plus, récupères plus vite ou montes les escaliers sans souffler — c\'est ça, le vrai résultat. Le miroir suit toujours, mais plus tard.',
    milestones: [
      { icon: '🏅', n: 25, label: '25 séances', sub: 'Les habitudes commencent à devenir automatiques. Tu ne te demandes plus si tu vas t\'entraîner. Tu te demandes quand.' },
    ],
  },
  {
    num: 3, emoji: '🔥', title: 'Renforcer et devenir autonome', days: 'Jours 61–90',
    frequency: '4 séances/sem', steps: '10 000 pas/jour', color: '#163B2D', bg: '#F0FDF4',
    intro: 'C\'est la phase la plus importante, et celle dont les autres programmes parlent le moins. Notre objectif est différent : construire un mode de vie. À la fin, tu dois être capable d\'organiser ta semaine seul, composer un repas équilibré sans y penser, ajuster ton activité selon ton énergie, et rebondir après un écart.',
    sessionLabel: 'Séance C — Renforcer (~25 min)',
    exercises: [
      { name: 'Squat bulgare (fente surélevée)', desc: 'Pied arrière surélevé sur un banc ou une chaise, descente contrôlée sur la jambe avant. Régression si l\'équilibre manque : fente arrière classique.', errors: [['Pied avant trop près', 'Recule-le pour protéger le genou'], ['Chercher l\'appui sur la jambe arrière', 'Tout le travail sur la jambe avant']] },
      { name: 'Pompes pieds surélevés (ou tempo)', desc: 'Plus de charge sur la poitrine et les épaules, sans variante acrobatique. Alternative : pompes classiques en tempo lent (3 s descente).', errors: [['Cambrure du dos', 'Gaine les abdos tout le mouvement'], ['Pieds trop hauts d\'un coup', 'Monte la hauteur progressivement']] },
      { name: 'Fentes marchées', desc: 'Force, équilibre et mobilité en mouvement. Pas après pas, genou aligné, buste droit.', errors: [['Petits pas instables', 'Pas franc, contrôlé'], ['Regard au sol', 'Regard devant pour l\'équilibre']] },
      { name: 'Gainage dynamique (ou dead bug)', desc: 'Depuis la planche, ramène alternativement un genou vers le coude, lentement. Ou dead bug : bras et jambe opposés s\'éloignent puis reviennent.', errors: [['Bassin qui balance', 'Garde le bassin stable'], ['Mouvement précipité', 'Lent et maîtrisé']] },
    ],
    progression: [
      { label: 'Sem. 9',  cols: ['3 × 8', '3 × 8', '3 × 10', '3 × 30 s'] },
      { label: 'Sem. 10', cols: ['4 × 8', '3 × 10', '3 × 12', '3 × 35 s'] },
      { label: 'Sem. 11', cols: ['4 × 10', '4 × 10', '4 × 10', '3 × 40 s'] },
      { label: 'Sem. 12', cols: ['4 × 10', '4 × 12', '4 × 12', '3 × 45 s'] },
    ],
    progressionHeaders: ['Squat bulgare', 'Pompes surélevées', 'Fentes marchées', 'Gainage dyn.'],
    coach: 'Tu approches de la fin. Le piège, maintenant, c\'est de penser que le jour 90 est une ligne d\'arrivée. Ce n\'en est pas une. C\'est le moment où tu cesses de suivre un programme et où tu deviens l\'homme qui n\'en a plus besoin.',
    milestones: [
      { icon: '🏅', n: 40, label: '40 séances', sub: 'Tu n\'as pas terminé un programme. Tu as construit un système. Et un système, ça reste.' },
    ],
  },
]

const SESSION_STRUCTURE = [
  { n: 1, label: 'Échauffement', detail: '3 à 5 min, articulations + cardio léger.' },
  { n: 2, label: 'Mouvement de jambes dominant', detail: 'Squat ou variante.' },
  { n: 3, label: 'Mouvement du haut du corps', detail: 'Pompe ou variante.' },
  { n: 4, label: 'Mouvement sur une jambe', detail: 'Fente, squat bulgare.' },
  { n: 5, label: 'Travail de tronc', detail: 'Gainage statique ou dynamique.' },
  { n: 6, label: 'Finisher court', detail: 'Intervalles, optionnel.' },
  { n: 7, label: 'Récupération', detail: 'Mobilité + respiration.' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">{children}</p>
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl p-5 shadow-sm ${className}`}>{children}</div>
}

function ExerciseCard({ ex }: { ex: typeof PHASES[0]['exercises'][0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-[#F3F4F6] overflow-hidden">
      <button className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#FAFAFA] transition-colors" onClick={() => setOpen(o => !o)}>
        <span className="font-bold text-[#111827] text-sm">{ex.name}</span>
        <span className="text-[#9CA3AF] text-xs ml-2">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-sm text-[#6B7280] leading-relaxed">{ex.desc}</p>
          <div className="space-y-1.5">
            {ex.errors.map(([wrong, right], i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <div className="flex items-start gap-2 bg-[#FEF2F2] rounded-lg px-3 py-2">
                  <span className="text-[#DC2626] text-xs mt-0.5 shrink-0">✕</span>
                  <span className="text-xs text-[#9B1C1C]">{wrong}</span>
                </div>
                <div className="flex items-start gap-2 bg-[#F0FDF4] rounded-lg px-3 py-2">
                  <span className="text-[#22C55E] text-xs mt-0.5 shrink-0">✓</span>
                  <span className="text-xs text-[#163B2D]">{right}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ProgressionTable({ headers, rows }: { headers: string[]; rows: { label: string; cols: string[] }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#F3F4F6]">
            <th className="text-left py-2 pr-4 text-xs font-black text-[#9CA3AF] uppercase tracking-wide w-20" />
            {headers.map(h => <th key={h} className="text-center py-2 px-2 text-xs font-bold text-[#6B7280]">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#F9FAFB] hover:bg-[#FAFAFA]">
              <td className="py-2.5 pr-4 text-xs font-black text-[#22C55E]">{row.label}</td>
              {row.cols.map((c, j) => <td key={j} className="py-2.5 px-2 text-center text-sm font-semibold text-[#111827]">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CoachNote({ text }: { text: string }) {
  return (
    <div className="rounded-2xl p-4 flex gap-3" style={{ background: '#163B2D' }}>
      <div className="shrink-0 text-xl mt-0.5">💬</div>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1.5">Coach Notes</p>
        <p className="text-sm text-[#DCF5E3] leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

export default function Programme() {
  const [activePhase, setActivePhase] = useState(1)
  const phase = PHASES[activePhase - 1]

  return (
    <div className="min-h-full bg-[#F8F8F5]">
      <div className="max-w-[1100px] mx-auto px-6 py-6">
        <div className="flex gap-6 items-start">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="w-72 shrink-0 space-y-4" style={{ position: 'sticky', top: 24 }}>

            {/* Hero */}
            <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: '#111827' }}>
              <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(circle at 80% 50%, #22C55E 0%, transparent 60%)' }} />
              <div className="relative z-10">
                <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-2">DadFit — Programme</p>
                <h1 className="text-lg font-black text-white leading-snug mb-3" style={{ fontFamily: 'Manrope' }}>
                  Reprendre le contrôle en 90 jours.
                </h1>
                <div className="flex gap-4">
                  {[{ n: '90', l: 'jours' }, { n: '3', l: 'phases' }, { n: '4', l: 'piliers' }].map(({ n, l }) => (
                    <div key={l} className="text-center">
                      <p className="text-xl font-black text-[#22C55E]" style={{ fontFamily: 'Manrope' }}>{n}</p>
                      <p className="text-[10px] text-[#9CA3AF] font-semibold">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phase selector */}
            <Card>
              <SectionLabel>Les 3 phases</SectionLabel>
              <div className="space-y-2">
                {PHASES.map(p => (
                  <button
                    key={p.num}
                    onClick={() => setActivePhase(p.num)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                    style={{
                      background: activePhase === p.num ? p.color : '#F9FAFB',
                      border: `1.5px solid ${activePhase === p.num ? p.color : '#F3F4F6'}`,
                    }}
                  >
                    <span className="text-xl shrink-0">{p.emoji}</span>
                    <div>
                      <p className="text-[11px] font-semibold" style={{ color: activePhase === p.num ? 'rgba(255,255,255,0.7)' : '#9CA3AF' }}>{p.days}</p>
                      <p className="text-sm font-black" style={{ color: activePhase === p.num ? 'white' : '#111827', fontFamily: 'Manrope' }}>{p.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* 4 Pillars */}
            <Card>
              <SectionLabel>4 piliers quotidiens</SectionLabel>
              <div className="space-y-2">
                {PILLARS.map(p => (
                  <div key={p.label} className="flex items-start gap-2.5 p-2.5 rounded-xl" style={{ background: '#F9FAFB' }}>
                    <span className="text-lg shrink-0">{p.icon}</span>
                    <div>
                      <p className="text-xs font-black text-[#111827]">{p.label}</p>
                      <p className="text-[11px] text-[#6B7280] leading-snug mt-0.5">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Score */}
            <Card>
              <SectionLabel>DadFit Score</SectionLabel>
              <div className="space-y-1.5 mb-3">
                {SCORE_TABLE.map(row => (
                  <div key={row.component} className="flex items-center gap-2.5 p-2 rounded-lg" style={{ background: '#F9FAFB' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: '#22C55E' }}>
                      <span className="text-white font-black text-xs">{row.pts}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#111827]">{row.component}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{row.how}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                {SCORE_LEVELS.map(l => (
                  <div key={l.range} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: l.bg }}>
                    <span className="text-xs font-black w-14 shrink-0" style={{ color: l.color }}>{l.range}</span>
                    <span className="text-xs text-[#374151]">{l.msg}</span>
                  </div>
                ))}
              </div>
            </Card>
          </aside>

          {/* ── RIGHT MAIN ── */}
          <main className="flex-1 min-w-0 space-y-5">

            {/* Pourquoi */}
            <Card>
              <SectionLabel>Pourquoi tu as pris du poids</SectionLabel>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                La plupart des hommes ne grossissent pas parce qu'ils sont paresseux. Ils grossissent parce que leur vie a changé, et que personne ne leur a appris à s'adapter.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {WHY_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#FAFAFA' }}>
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <p className="text-xs text-[#6B7280] leading-snug">
                      <strong className="text-[#111827]">{item.bold}</strong> {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-4 rounded-2xl" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                <p className="text-sm font-black text-[#163B2D] leading-snug">
                  Notre promesse : te rendre plus fort, plus énergique et plus capable. Pas une transformation de 90 jours que tu abandonnes au jour 100. Une transformation que tu gardes pour les dix prochaines années.
                </p>
              </div>
            </Card>

            {/* PAR-Q */}
            <div className="rounded-2xl p-5" style={{ background: '#FEF9C3', border: '1px solid #FDE68A' }}>
              <p className="text-xs font-black uppercase tracking-widest text-[#92400E] mb-3">Avant de commencer — Vérifie que tu peux y aller</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-3">
                {PAR_Q.map((q, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-[#D97706] font-black text-sm shrink-0">{i + 1}.</span>
                    <p className="text-xs text-[#92400E]">{q}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm font-black text-[#92400E]">Une seule réponse « oui » → parle à ton médecin avant de commencer.</p>
            </div>

            {/* Retard quote */}
            <div className="rounded-2xl p-5" style={{ background: '#111827' }}>
              <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-2">Tu as pris du retard ?</p>
              <blockquote className="text-lg font-black text-white leading-snug" style={{ fontFamily: 'Manrope' }}>
                "Ne recommence pas au jour 1. Ne cherche pas à rattraper les séances manquées. Reprends simplement là où tu t'es arrêté."
              </blockquote>
              <p className="text-sm text-[#6B7280] mt-3">La constance ne veut pas dire « ne jamais s'arrêter ». La constance veut dire <strong className="text-white">toujours revenir</strong>.</p>
            </div>

            {/* Phase header */}
            <div className="rounded-2xl p-5" style={{ background: phase.color }}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-1">{phase.emoji} Phase {phase.num}</p>
                  <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'Manrope' }}>{phase.title}</h2>
                </div>
                <div className="flex gap-5">
                  {[{ l: 'Durée', v: phase.days }, { l: 'Rythme', v: phase.frequency }, { l: 'Marche', v: phase.steps }].map(({ l, v }) => (
                    <div key={l} className="text-right">
                      <p className="text-xs text-white/60 font-semibold">{l}</p>
                      <p className="text-sm font-black text-white">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card>
              <p className="text-sm text-[#6B7280] leading-relaxed">{phase.intro}</p>
            </Card>

            {/* Exercises */}
            <Card>
              <SectionLabel>{phase.sessionLabel}</SectionLabel>
              <div className="mb-3 p-3 rounded-xl flex items-center gap-2" style={{ background: '#F0FDF4' }}>
                <span className="text-sm">🔥</span>
                <p className="text-xs text-[#163B2D] font-semibold">Échauffement 2–3 min avant. Récupération 2 min après.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {phase.exercises.map((ex, i) => <ExerciseCard key={i} ex={ex} />)}
              </div>
            </Card>

            {/* Progression */}
            <Card>
              <SectionLabel>Progression sur 30 jours</SectionLabel>
              <p className="text-xs text-[#9CA3AF] mb-3">On augmente une variable à la fois. Jamais tout d'un coup.</p>
              <ProgressionTable headers={phase.progressionHeaders} rows={phase.progression} />
            </Card>

            <CoachNote text={phase.coach} />

            {/* Milestones */}
            <div className="grid grid-cols-1 gap-3">
              {phase.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-0.5">Étape franchie — {m.label}</p>
                    <p className="text-sm text-[#374151]">{m.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Autonomie — Phase 3 only */}
            {activePhase === 3 && (
              <Card>
                <SectionLabel>Construis ta propre séance — Autonomie</SectionLabel>
                <div className="grid grid-cols-2 gap-2">
                  {SESSION_STRUCTURE.map(s => (
                    <div key={s.n} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#FAFAFA' }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black text-white" style={{ background: '#22C55E' }}>{s.n}</div>
                      <div>
                        <p className="text-sm font-bold text-[#111827]">{s.label}</p>
                        <p className="text-xs text-[#9CA3AF]">{s.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Closing */}
            <div className="rounded-3xl p-8 text-center" style={{ background: '#163B2D' }}>
              <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">L'objectif final</p>
              <p className="text-xl font-black text-white leading-snug mb-2" style={{ fontFamily: 'Manrope' }}>
                Le véritable objectif n'est pas le jour 90.
              </p>
              <p className="text-3xl font-black text-[#22C55E]" style={{ fontFamily: 'Manrope' }}>C'est le jour 900.</p>
              <p className="text-sm text-[#9CA3AF] mt-3 leading-relaxed max-w-md mx-auto">
                La meilleure transformation n'est pas celle qui impressionne les autres. C'est celle qui te permet de vivre plus longtemps, avec plus d'énergie, pour ceux qui comptent le plus.
              </p>
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}
