
import type { SessionLog, Milestone } from '../types'
import { getPhase } from '../utils/score'

interface Props {
  sessions: SessionLog[]
  milestones: Milestone[]
  totalTarget?: number
}

export default function ProgressTimeline({ sessions, milestones, totalTarget = 36 }: Props) {
  const completed = sessions.filter(s => s.status !== 'skipped').length
  const { phase, label } = getPhase(completed)
  const phaseProgress = phase === 1 ? completed / 12 : phase === 2 ? (completed - 12) / 12 : (completed - 24) / 12

  const dots = Array.from({ length: Math.min(totalTarget, 36) }, (_, i) => {
    const sessionDone = i < completed
    const isPartial = sessions[i]?.status === 'partial'
    const milestone = milestones.find(m => m.triggerSessions === i + 1)
    return { i, sessionDone, isPartial, milestone }
  })

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between items-baseline mb-1">
        <p className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Progression</p>
        <p className="text-xs font-semibold text-[#6B7280]">{completed} / {totalTarget} séances</p>
      </div>

      {/* Phase label */}
      <p className="text-sm font-bold text-[#111827] mb-3">{label}</p>

      {/* Phase bar */}
      <div className="h-1.5 bg-[#F3F4F6] rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-[#22C55E] rounded-full transition-all"
          style={{ width: `${phaseProgress * 100}%` }}
        />
      </div>

      {/* Dot grid */}
      <div className="flex flex-wrap gap-1.5">
        {dots.map(({ i, sessionDone, isPartial, milestone }) => (
          <div key={i} className="relative">
            <div
              className="w-5 h-5 rounded-full transition-all"
              style={{
                background: sessionDone
                  ? (isPartial ? '#7AE582' : '#22C55E')
                  : '#F3F4F6',
                border: milestone ? '2px solid #163B2D' : 'none',
              }}
              title={milestone ? `${milestone.emoji} ${milestone.label}` : undefined}
            />
            {milestone && sessionDone && (
              <span className="absolute -top-1 -right-1 text-[8px]">{milestone.emoji}</span>
            )}
          </div>
        ))}
      </div>

      {/* Next milestone */}
      {(() => {
        const next = milestones.find(m => !m.unlocked)
        if (!next) return null
        const remaining = next.triggerSessions - completed
        return (
          <p className="text-xs text-[#6B7280] mt-3">
            {next.emoji} <strong className="text-[#111827]">{next.label}</strong> dans {remaining} séance{remaining > 1 ? 's' : ''}
          </p>
        )
      })()}
    </div>
  )
}
