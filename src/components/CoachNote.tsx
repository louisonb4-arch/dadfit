import React from 'react'

interface Props {
  energy: number
  joints: 'good' | 'stiff' | 'pain'
  sessionsDone: number
}

const notes = {
  low: [
    "Corps dit stop — écoute-le. Marche 10 min, c'est gagné.",
    "Récupération = entraînement. Réserve ton énergie pour demain.",
    "Pas d'héroïsme aujourd'hui. Un père récupéré vaut mieux qu'un père blessé.",
  ],
  mid: [
    "Bon niveau. Lance-toi, l'énergie va monter une fois échauffé.",
    "Tu n'attends pas d'être parfait. Tu y vas et tu vois.",
    "Standard, c'est le plan. Exécute proprement.",
  ],
  high: [
    "Énergie max — pousse un peu plus que prévu. Tu peux.",
    "Journée de warrior. Donne tout, récupère demain.",
    "Ce niveau d'énergie, c'est rare. Exploite-le.",
  ],
  pain: [
    "Douleur = signal. Séance légère ou repos complet, pas de compromis.",
    "Articulations à vif — aucun exercice à impact. Mobilité douce seulement.",
    "Aujourd'hui, pas d'entraînement. C'est la décision intelligente.",
  ],
}

function getNote(energy: number, joints: string): string {
  if (joints === 'pain') return notes.pain[Math.floor(Math.random() * notes.pain.length)]
  if (energy <= 3) return notes.low[Math.floor(Math.random() * notes.low.length)]
  if (energy <= 6) return notes.mid[Math.floor(Math.random() * notes.mid.length)]
  return notes.high[Math.floor(Math.random() * notes.high.length)]
}

function getBg(energy: number, joints: string): string {
  if (joints === 'pain') return '#FEF2F2'
  if (energy <= 3) return '#F3F4F6'
  if (energy <= 6) return '#F0FDF4'
  return '#DCF5E3'
}

function getAccent(energy: number, joints: string): string {
  if (joints === 'pain') return '#DC2626'
  if (energy <= 3) return '#6B7280'
  if (energy <= 6) return '#22C55E'
  return '#163B2D'
}

export default function CoachNote({ energy, joints, sessionsDone }: Props) {
  const note = React.useMemo(() => getNote(energy, joints), [energy, joints])
  const bg = getBg(energy, joints)
  const accent = getAccent(energy, joints)

  return (
    <div className="rounded-2xl p-4" style={{ background: bg }}>
      <div className="flex items-start gap-3">
        <div className="text-2xl mt-0.5">
          {joints === 'pain' ? '⚠️' : energy <= 3 ? '😴' : energy <= 6 ? '💪' : '🔥'}
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: accent }}>
            Coach DadFit · Séance {sessionsDone}
          </p>
          <p className="text-sm font-semibold text-[#111827] leading-snug">{note}</p>
        </div>
      </div>
    </div>
  )
}
