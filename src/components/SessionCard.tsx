import { useState } from 'react'
import type { SessionLog } from '../types'

interface Props {
  session: SessionLog
  onComplete: (s: SessionLog) => void
  energy: number
}

export default function SessionCard({ session, onComplete, energy }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [sets, setSets] = useState<number[]>(session.exercises.map(e => e.setsDone))
  const [done, setDone] = useState(false)

  const allDone = sets.every((s, i) => s >= session.exercises[i].setsTarget)

  const handleComplete = () => {
    const updated: SessionLog = {
      ...session,
      exercises: session.exercises.map((e, i) => ({ ...e, setsDone: sets[i] })),
      status: allDone ? 'completed' : 'partial',
      energyAfter: energy,
    }
    setDone(true)
    onComplete(updated)
  }

  if (done) {
    return (
      <div className="bg-[#DCF5E3] rounded-2xl p-5 text-center">
        <div className="text-4xl mb-2">💪</div>
        <p className="font-black text-[#163B2D] text-lg">Séance enregistrée !</p>
        <p className="text-sm text-[#22C55E] font-semibold mt-1">
          {allDone ? 'Complète — bien joué.' : 'Partielle — compte quand même.'}
        </p>
      </div>
    )
  }

  const isLight = energy <= 4

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="px-5 py-4 cursor-pointer flex items-center justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-0.5">
            Séance {session.type} {isLight ? '· Version allégée' : ''}
          </p>
          <p className="font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>
            {session.exercises.length} exercices · ~{isLight ? '10-12' : '18-22'} min
          </p>
        </div>
        <div className="text-[#9CA3AF] text-lg">{expanded ? '↑' : '↓'}</div>
      </div>

      {/* Exercises */}
      {expanded && (
        <div className="px-5 pb-4 space-y-3 border-t border-[#F3F4F6]">
          {session.exercises.map((ex, i) => (
            <div key={ex.id} className="pt-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-sm text-[#111827]">{ex.name}</p>
                  <p className="text-xs text-[#6B7280]">{ex.reps}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSets(prev => prev.map((s, j) => j === i ? Math.max(0, s - 1) : s))}
                    className="w-7 h-7 rounded-full bg-[#F3F4F6] text-[#6B7280] font-bold text-sm flex items-center justify-center"
                  >-</button>
                  <span className="text-sm font-black text-[#111827] w-10 text-center">
                    {sets[i]}/{ex.setsTarget}
                  </span>
                  <button
                    onClick={() => setSets(prev => prev.map((s, j) => j === i ? Math.min(ex.setsTarget + 2, s + 1) : s))}
                    className="w-7 h-7 rounded-full bg-[#DCF5E3] text-[#163B2D] font-bold text-sm flex items-center justify-center"
                  >+</button>
                </div>
              </div>
              {/* Cues */}
              <div className="space-y-1">
                {ex.cues.map((cue, ci) => (
                  <div key={ci} className="flex gap-2 items-start">
                    <span className="text-[#22C55E] text-xs mt-0.5">›</span>
                    <span className="text-xs text-[#6B7280]">{cue}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleComplete}
            className="w-full mt-2 py-3.5 rounded-2xl text-sm font-black text-white transition-all active:scale-95"
            style={{ background: allDone ? '#22C55E' : '#111827', fontFamily: 'Manrope' }}
          >
            {allDone ? 'Séance complète ✓' : 'Enregistrer (partielle)'}
          </button>
        </div>
      )}

      {/* CTA when collapsed */}
      {!expanded && (
        <div className="px-5 pb-4">
          <button
            onClick={() => setExpanded(true)}
            className="w-full py-3 rounded-2xl text-sm font-black text-white transition-all active:scale-95"
            style={{ background: '#22C55E', fontFamily: 'Manrope' }}
          >
            Voir & lancer la séance →
          </button>
        </div>
      )}
    </div>
  )
}
