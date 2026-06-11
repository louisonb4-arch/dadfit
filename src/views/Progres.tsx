import React, { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { getStreak, calcWeeklyScore, getPhase } from '../utils/score'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl p-5 shadow-sm ${className}`}>{children}</div>
}
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">{children}</p>
}

function ScoreChart({ scores, labels }: { scores: number[]; labels: string[] }) {
  if (scores.length < 2) {
    return (
      <div className="flex items-center justify-center py-8 text-xs text-[#9CA3AF] text-center leading-relaxed">
        Fais au moins 2 semaines de check-ins<br />pour voir l'évolution de ton score.
      </div>
    )
  }
  const W = 500, H = 100
  const pts = scores.map((v, i) => [(i / (scores.length - 1)) * W, H - (v / 100) * H])
  const linePts = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const areaPts = [...pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`), `${W},${H}`, `0,${H}`].join(' ')
  return (
    <div className="w-full overflow-hidden">
      <svg width="100%" viewBox={`0 0 ${W} ${H + 30}`} preserveAspectRatio="none" style={{ height: 130 }}>
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[25, 50, 75, 100].map(v => {
          const y = H - (v / 100) * H
          return <line key={v} x1={0} y1={y} x2={W} y2={y} stroke="#F3F4F6" strokeWidth={1} />
        })}
        <polygon points={areaPts} fill="url(#sg)" />
        <polyline points={linePts} fill="none" stroke="#22C55E" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        {pts.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={5} fill={i === pts.length - 1 ? '#22C55E' : 'white'} stroke="#22C55E" strokeWidth={2} />
          </g>
        ))}
        {pts.map(([x], i) => (
          <text key={i} x={x} y={H + 22} textAnchor="middle" fontSize={10} fill="#9CA3AF" fontFamily="Manrope" fontWeight="600">
            {labels[i]}
          </text>
        ))}
      </svg>
    </div>
  )
}

function WeightChart({ weights, targetWeight }: { weights: { date: string; w: number }[]; targetWeight: number }) {
  if (weights.length < 2) {
    return (
      <div className="flex items-center justify-center py-8 text-xs text-[#9CA3AF] text-center leading-relaxed">
        Entre ton poids dans le check-in quotidien<br />pour voir la courbe d'évolution.
      </div>
    )
  }
  const W = 500, H = 80
  const vals = weights.map(w => w.w)
  const min = Math.max(0, Math.min(...vals, targetWeight) - 2)
  const max = Math.max(...vals) + 1
  const toY = (v: number) => H - ((v - min) / (max - min)) * H
  const coords = vals.map((v, i) => [+(i / (vals.length - 1) * W).toFixed(1), +toY(v).toFixed(1)])
  const line = coords.map(([x, y]) => `${x},${y}`).join(' ')
  const areaPath = `${coords.map(([x, y]) => `${x},${y}`).join(' ')} ${W},${H} 0,${H}`
  const targetY = toY(targetWeight)
  return (
    <svg width="100%" height={H + 30} viewBox={`0 0 ${W} ${H + 30}`} preserveAspectRatio="none" className="overflow-visible">
      <defs>
        <linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <line x1={0} y1={targetY} x2={W} y2={targetY} stroke="#22C55E" strokeWidth={1} strokeDasharray="4 3" opacity={0.4} />
      <text x={W - 2} y={targetY - 4} textAnchor="end" fontSize={9} fill="#22C55E" opacity={0.6} fontFamily="Manrope">Objectif</text>
      <polygon points={areaPath} fill="url(#wg2)" />
      <polyline points={line} fill="none" stroke="#22C55E" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === coords.length - 1 ? 5 : 3.5}
          fill={i === coords.length - 1 ? '#22C55E' : 'white'} stroke="#22C55E" strokeWidth={2} />
      ))}
      {weights.map(({ date }, i) => {
        const [x] = coords[i]
        const d = new Date(date)
        const label = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
        return (
          <text key={i} x={x} y={H + 20} textAnchor="middle" fontSize={9} fill="#9CA3AF" fontFamily="Manrope">
            {label}
          </text>
        )
      })}
    </svg>
  )
}

function SessionRow({ date, type, status, duration }: { date: string; type: string; status: string; duration?: number }) {
  const d = new Date(date)
  const label = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-[#F9FAFB] last:border-0">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
        style={{ background: type === 'A' ? '#22C55E' : type === 'B' ? '#16A34A' : '#163B2D' }}>
        {type}
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-[#111827] leading-none capitalize">{label}</p>
        <p className="text-[11px] text-[#9CA3AF] mt-0.5">
          {status === 'completed' ? 'Complète' : 'Partielle'}{duration ? ` · ${duration} min` : ''}
        </p>
      </div>
      <span className="text-xs font-bold px-2 py-1 rounded-full"
        style={{ background: status === 'completed' ? '#DCF5E3' : '#F3F4F6', color: status === 'completed' ? '#163B2D' : '#9CA3AF' }}>
        {status === 'completed' ? '✓' : '~'}
      </span>
    </div>
  )
}

export default function Progres() {
  const { user, checkIns, sessions, milestones } = useApp()

  const streak = getStreak(sessions)
  const completedSessions = sessions.filter(s => s.status !== 'skipped')
  const totalMin = completedSessions.reduce((a, s) => a + (s.durationMin ?? 20), 0)
  const { phase, label: phaseLabel } = getPhase(completedSessions.length)
  const phaseProgress = phase === 1
    ? completedSessions.length / 12
    : phase === 2 ? (completedSessions.length - 12) / 12
    : Math.min((completedSessions.length - 24) / 12, 1)

  const weightHistory = useMemo(() => {
    return checkIns
      .filter(ci => ci.weight)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(ci => ({ date: ci.date, w: ci.weight! }))
  }, [checkIns])

  const currentWeight = weightHistory.length > 0
    ? weightHistory[weightHistory.length - 1].w
    : user.weightCurrent
  const startWeight = weightHistory.length > 0 ? weightHistory[0].w : user.weightCurrent
  const weightDelta = startWeight && currentWeight ? +(currentWeight - startWeight).toFixed(1) : 0

  // Build last 6 weeks of scores
  const weeklyScores = useMemo(() => {
    const results: { score: number; label: string }[] = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - d.getDay() + 1 - i * 7)
      const weekStart = d.toISOString().split('T')[0]
      const score = calcWeeklyScore(checkIns, sessions, weekStart)
      const label = i === 0 ? 'Cette sem.' : `S-${i}`
      results.push({ score: score.total, label })
    }
    // Remove leading zeros (no data)
    let firstNonZero = 0
    while (firstNonZero < results.length - 1 && results[firstNonZero].score === 0) firstNonZero++
    return results.slice(firstNonZero)
  }, [checkIns, sessions])

  const weekStart = useMemo(() => {
    const d = new Date(); d.setDate(d.getDate() - d.getDay() + 1)
    return d.toISOString().split('T')[0]
  }, [])
  const lastWeekStart = useMemo(() => {
    const d = new Date(weekStart); d.setDate(d.getDate() - 7)
    return d.toISOString().split('T')[0]
  }, [weekStart])
  const thisWeek = calcWeeklyScore(checkIns, sessions, weekStart)
  const lastWeek = calcWeeklyScore(checkIns, sessions, lastWeekStart)
  const delta = thisWeek.total - lastWeek.total
  const nextMilestone = milestones.find(m => !m.unlocked)

  return (
    <div className="min-h-full bg-[#F8F8F5]">
      <div className="max-w-[1100px] mx-auto px-6 py-6">

        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-widest text-[#9CA3AF] mb-1">DadFit</p>
          <h1 className="text-3xl font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>Tes progrès</h1>
        </div>

        <div className="flex gap-6 items-start">

          {/* ── LEFT MAIN ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Score chart */}
            <Card>
              <div className="flex items-start justify-between mb-1">
                <Label>Score DadFit · semaines</Label>
                <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: '#DCF5E3', color: '#163B2D' }}>
                  {thisWeek.total} / 100
                </span>
              </div>
              <ScoreChart
                scores={weeklyScores.map(w => w.score)}
                labels={weeklyScores.map(w => w.label)}
              />
              <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-[#F3F4F6]">
                {[
                  { label: 'Séances', value: thisWeek.training, max: 40 },
                  { label: 'Marche', value: thisWeek.walk, max: 25 },
                  { label: 'Hydratation', value: thisWeek.hydration, max: 20 },
                  { label: 'Sommeil', value: thisWeek.sleep, max: 15 },
                ].map(({ label, value, max }) => (
                  <div key={label} className="text-center">
                    <p className="text-xs text-[#9CA3AF] mb-1">{label}</p>
                    <p className="text-xl font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>{value}</p>
                    <p className="text-[10px] text-[#9CA3AF]">/ {max}</p>
                    <div className="h-1 bg-[#F3F4F6] rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${(value / max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Phase progression */}
            <Card>
              <Label>Progression de phase</Label>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>{phaseLabel}</p>
                <p className="text-xs font-bold text-[#22C55E]">{completedSessions.length} séances</p>
              </div>
              <div className="h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden mb-2">
                <div className="h-full bg-[#22C55E] rounded-full transition-all" style={{ width: `${phaseProgress * 100}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-[#9CA3AF] font-semibold mb-4">
                <span>Phase {phase}</span>
                <span>{nextMilestone ? `Prochain : ${nextMilestone.triggerSessions} séances` : 'Programme terminé'}</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {Array.from({ length: 36 }, (_, i) => {
                  const done = i < completedSessions.length
                  const milestone = milestones.find(m => m.triggerSessions === i + 1)
                  return (
                    <div key={i} className="relative">
                      <div className="w-4 h-4 rounded-full" style={{ background: done ? '#22C55E' : '#F3F4F6', border: milestone ? '2px solid #163B2D' : 'none' }} />
                      {milestone && done && <span className="absolute -top-1 -right-1 text-[8px]">{milestone.emoji}</span>}
                    </div>
                  )
                })}
              </div>
              {completedSessions.length === 0 && (
                <p className="text-xs text-[#9CA3AF] mt-3 text-center">Complete ta première séance depuis le Dashboard.</p>
              )}
            </Card>

            {/* Weight chart */}
            <Card>
              <Label>Évolution du poids</Label>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>
                    {currentWeight > 0 ? `${currentWeight} kg` : '— kg'}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">actuel</p>
                </div>
                {weightDelta !== 0 && (
                  <div className="text-center">
                    <p className="text-2xl font-black" style={{ color: weightDelta < 0 ? '#22C55E' : '#EF4444', fontFamily: 'Manrope' }}>
                      {weightDelta > 0 ? '+' : ''}{weightDelta} kg
                    </p>
                    <p className="text-xs text-[#9CA3AF]">depuis le début</p>
                  </div>
                )}
                <div className="text-right">
                  <p className="text-3xl font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>{user.weightTarget} kg</p>
                  <p className="text-xs text-[#9CA3AF]">objectif</p>
                </div>
              </div>
              <WeightChart weights={weightHistory} targetWeight={user.weightTarget} />
              {weightHistory.length >= 2 && (
                <div className="h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden mt-4">
                  <div className="h-full rounded-full" style={{
                    width: `${Math.min(Math.max(0, ((startWeight - currentWeight) / (startWeight - user.weightTarget)) * 100), 100)}%`,
                    background: 'linear-gradient(90deg, #22C55E, #163B2D)',
                  }} />
                </div>
              )}
            </Card>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="w-80 shrink-0 space-y-4">

            {/* Stats 2×2 */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Séances totales', value: completedSessions.length || '—', sub: `Phase ${phase}`, color: '#22C55E' },
                { label: 'Score semaine', value: thisWeek.total || '—', sub: `${delta >= 0 ? '+' : ''}${delta} vs préc.`, color: delta >= 0 ? '#22C55E' : '#9CA3AF' },
                { label: 'Streak', value: streak || '—', sub: 'jours consécutifs', color: '#F97316' },
                { label: 'Temps total', value: totalMin > 0 ? `${Math.round(totalMin / 60)}h` : '—', sub: totalMin > 0 ? `${totalMin} min` : 'Aucune séance', color: '#163B2D' },
              ].map(({ label, value, sub, color }) => (
                <Card key={label}>
                  <p className="text-xs font-bold text-[#9CA3AF] mb-1">{label}</p>
                  <p className="text-2xl font-black leading-none mb-1" style={{ color, fontFamily: 'Manrope' }}>{value}</p>
                  <p className="text-xs text-[#9CA3AF]">{sub}</p>
                </Card>
              ))}
            </div>

            {/* Next milestone */}
            {nextMilestone && completedSessions.length > 0 && (
              <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0' }}>
                <span className="text-3xl" style={{ filter: 'grayscale(0.5)' }}>{nextMilestone.emoji}</span>
                <div className="flex-1">
                  <p className="text-xs font-black text-[#163B2D] mb-0.5">Prochain badge</p>
                  <p className="font-black text-[#111827] text-sm" style={{ fontFamily: 'Manrope' }}>{nextMilestone.label}</p>
                  <div className="h-1.5 bg-[#BBF7D0] rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${Math.min((completedSessions.length / nextMilestone.triggerSessions) * 100, 100)}%` }} />
                  </div>
                  <p className="text-xs text-[#22C55E] mt-1 font-semibold">{nextMilestone.triggerSessions - completedSessions.length} séances restantes</p>
                </div>
              </div>
            )}

            {/* Badges */}
            <Card>
              <Label>Badges de progression</Label>
              <div className="grid grid-cols-3 gap-2">
                {milestones.map(m => (
                  <div key={m.id} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl text-center"
                    style={{ background: m.unlocked ? '#F0FDF4' : '#F9FAFB', border: `1.5px solid ${m.unlocked ? '#BBF7D0' : '#F3F4F6'}` }}>
                    <span className="text-2xl" style={{ filter: m.unlocked ? 'none' : 'grayscale(1) opacity(0.3)' }}>{m.emoji}</span>
                    <p className="text-[10px] font-black leading-tight text-center" style={{ color: m.unlocked ? '#163B2D' : '#9CA3AF' }}>{m.label}</p>
                    <p className="text-[9px]" style={{ color: m.unlocked ? '#22C55E' : '#D1D5DB' }}>{m.triggerSessions} séances</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Session history */}
            <Card>
              <Label>Historique des séances</Label>
              {completedSessions.length === 0 ? (
                <p className="text-xs text-[#9CA3AF] text-center py-3">Aucune séance enregistrée pour le moment.</p>
              ) : (
                <>
                  {[...sessions]
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .slice(0, 8)
                    .map(s => (
                      <SessionRow key={s.id} date={s.date} type={s.type} status={s.status} duration={s.durationMin} />
                    ))}
                  <p className="text-xs text-[#9CA3AF] text-center mt-3">{sessions.length} séances enregistrées</p>
                </>
              )}
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}
