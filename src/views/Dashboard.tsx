import { useState, useMemo, useEffect } from 'react'
import type { CheckIn, SessionLog, Milestone } from '../types'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import { track } from '../lib/posthog'
import { getStreak, calcWeeklyScore } from '../utils/score'
import MilestoneToast from '../components/MilestoneToast'
import { ALL_SESSIONS, MODULES } from '../data/workouts'

// ─── Progress ring ────────────────────────────────────────────────────────────
function ProgressRing({ pct }: { pct: number }) {
  const r = 72, size = 180, sw = 13
  const circ = 2 * Math.PI * r
  const filled = (pct / 100) * circ
  return (
    <div className="relative flex items-center justify-center mx-auto" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E8F5E9" strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#22C55E" strokeWidth={sw}
          strokeLinecap="round" strokeDasharray={`${filled} ${circ}`}
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
      </svg>
      <div className="flex flex-col items-center z-10">
        <span className="font-black text-[#111827] leading-none" style={{ fontSize: 38, fontFamily: 'Manrope' }}>{pct}%</span>
        <span className="text-xs font-semibold text-[#6B7280] mt-0.5">complété</span>
      </div>
    </div>
  )
}

// ─── Score sparkline (last 10 daily scores) ───────────────────────────────────
function ScoreSparkline({ checkIns, sessions }: { checkIns: CheckIn[]; sessions: SessionLog[] }) {
  const points = useMemo(() => {
    const sorted = [...checkIns].sort((a, b) => a.date.localeCompare(b.date)).slice(-10)
    if (sorted.length < 1) return null
    return sorted.map(ci => {
      const sessionsOnDay = sessions.filter(s => s.date === ci.date && s.status === 'completed').length
      const walk = Math.round(Math.min(ci.steps / 7000, 1) * 25)
      const hydration = Math.round(Math.min(ci.waterL / 2, 1) * 20)
      const sleep = (ci.sleptWell ? 10 : 0) + (ci.bedtimeOK ? 5 : 0)
      const training = sessionsOnDay > 0 ? 40 : 0
      return training + walk + hydration + sleep
    })
  }, [checkIns, sessions])

  if (!points || points.length < 1) {
    return <div className="w-28 h-11 flex items-center justify-center text-[10px] text-[#9CA3AF]">En attente de données</div>
  }

  const W = 110, H = 44
  const max = Math.max(...points, 1)

  if (points.length === 1) {
    const cy = +(H - (points[0] / max) * H).toFixed(1)
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
        <circle cx={W / 2} cy={cy} r={4} fill="#22C55E" />
      </svg>
    )
  }

  const coords = points.map((v, i) => [+(i / (points.length - 1) * W).toFixed(1), +(H - (v / max) * H).toFixed(1)])
  const line = coords.map(([x, y]) => `${x},${y}`).join(' ')
  const lastX = coords[coords.length - 1][0], lastY = coords[coords.length - 1][1]
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <polyline points={line} fill="none" stroke="#22C55E" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lastX} cy={lastY} r={4} fill="#22C55E" />
    </svg>
  )
}

// ─── Weight area chart ────────────────────────────────────────────────────────
function WeightChart({ weights, startWeight, targetWeight }: { weights: { date: string; w: number }[]; startWeight: number; targetWeight: number }) {
  if (weights.length < 1) {
    return (
      <div className="flex items-center justify-center py-6 text-xs text-center text-[#9CA3AF] leading-relaxed">
        Enregistre ton poids dans le check-in du jour<br />pour voir la courbe évoluer.
      </div>
    )
  }
  const W = 280, H = 80
  const vals = weights.map(w => w.w)
  const min = Math.max(0, Math.min(...vals, targetWeight > 0 ? targetWeight : vals[0]) - 2)
  const max = Math.max(...vals, startWeight > 0 ? startWeight : vals[0]) + 1
  const toY = (v: number) => H - ((v - min) / (max - min || 1)) * H
  const targetY = targetWeight > 0 ? toY(targetWeight) : null

  if (weights.length === 1) {
    const dotY = +toY(vals[0]).toFixed(1)
    return (
      <svg width="100%" height={H + 4} viewBox={`0 0 ${W} ${H + 4}`} preserveAspectRatio="none" className="overflow-visible">
        {targetY !== null && (
          <line x1={0} y1={targetY} x2={W} y2={targetY} stroke="#22C55E" strokeWidth={1} strokeDasharray="4 3" opacity={0.4} />
        )}
        <circle cx={W / 2} cy={dotY} r={5} fill="#22C55E" />
      </svg>
    )
  }

  const coords = vals.map((v, i) => [+(i / (vals.length - 1) * W).toFixed(1), +toY(v).toFixed(1)])
  const line = coords.map(([x, y]) => `${x},${y}`).join(' ')
  const areaPath = `${coords.map(([x, y]) => `${x},${y}`).join(' ')} ${W},${H} 0,${H}`
  return (
    <svg width="100%" height={H + 4} viewBox={`0 0 ${W} ${H + 4}`} preserveAspectRatio="none" className="overflow-visible">
      <defs>
        <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      {targetY !== null && (
        <line x1={0} y1={targetY} x2={W} y2={targetY} stroke="#22C55E" strokeWidth={1} strokeDasharray="4 3" opacity={0.4} />
      )}
      <polygon points={areaPath} fill="url(#wg)" />
      <polyline points={line} fill="none" stroke="#22C55E" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {coords.map(([x, y], i) => i === coords.length - 1 && (
        <circle key={i} cx={x} cy={y} r={4} fill="#22C55E" />
      ))}
    </svg>
  )
}

// ─── Stat cell ────────────────────────────────────────────────────────────────
function StatCell({ emoji, label, value, sub, accent }: {
  emoji: string; label: string; value: string; sub: string; accent?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: '#22C55E' }}>
        {emoji}
      </div>
      <p className="text-xs text-[#6B7280] font-semibold text-center leading-none">{label}</p>
      <p className="font-black text-[#111827] text-lg leading-none text-center" style={{ fontFamily: 'Manrope' }}>{value}</p>
      <p className="text-[11px] font-semibold text-center" style={{ color: accent ? '#22C55E' : '#6B7280' }}>{sub}</p>
    </div>
  )
}

// ─── Check-in form ────────────────────────────────────────────────────────────
function CheckInForm({ onSave, existing }: { onSave: (ci: Omit<CheckIn, 'id' | 'userId'>) => void; existing: CheckIn | null }) {
  const today = new Date().toISOString().split('T')[0]
  const [steps, setSteps] = useState(existing?.steps ?? 0)
  const [waterL, setWaterL] = useState(existing?.waterL ?? 1.5)
  const [energy, setEnergy] = useState(existing?.energy ?? 5)
  const [sleptWell, setSleptWell] = useState(existing?.sleptWell ?? true)
  const [bedtimeOK, setBedtimeOK] = useState(existing?.bedtimeOK ?? true)
  const [weight, setWeight] = useState<string>(existing?.weight ? String(existing.weight) : '')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    onSave({
      date: today,
      energy,
      sleptWell,
      joints: 'good',
      steps,
      waterL,
      bedtimeOK,
      weight: weight ? parseFloat(weight) : undefined,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const WATER_OPTIONS = [0.5, 1, 1.5, 2, 2.5]
  const ENERGY_LABELS: Record<number, { label: string; color: string }> = {
    1: { label: 'Épuisé', color: '#EF4444' },
    2: { label: 'Épuisé', color: '#EF4444' },
    3: { label: 'Fatigué', color: '#F97316' },
    4: { label: 'Fatigué', color: '#F97316' },
    5: { label: 'Moyen', color: '#F59E0B' },
    6: { label: 'Correct', color: '#84CC16' },
    7: { label: 'Bien', color: '#22C55E' },
    8: { label: 'Bien', color: '#22C55E' },
    9: { label: 'Super', color: '#16A34A' },
    10: { label: 'Au top !', color: '#166534' },
  }

  return (
    <div className="space-y-3">

      {/* Energy */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs font-black text-[#374151]">Énergie</p>
          <span className="text-xs font-black" style={{ color: ENERGY_LABELS[energy].color }}>
            {energy}/10 — {ENERGY_LABELS[energy].label}
          </span>
        </div>
        <input
          type="range" min={1} max={10} value={energy}
          onChange={e => setEnergy(Number(e.target.value))}
          className="w-full accent-[#22C55E]"
          style={{ accentColor: ENERGY_LABELS[energy].color }}
        />
        <div className="flex justify-between text-[9px] text-[#9CA3AF] mt-0.5">
          <span>1</span><span>5</span><span>10</span>
        </div>
      </div>

      {/* Steps */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs font-black text-[#374151]">Pas aujourd'hui</p>
          <span className="text-xs font-black" style={{ color: steps >= 7000 ? '#22C55E' : '#6B7280' }}>
            {steps.toLocaleString('fr-FR')} pas
            {steps >= 7000 && ' ✓'}
          </span>
        </div>
        <input
          type="number" value={steps === 0 ? '' : steps}
          onChange={e => setSteps(Math.max(0, parseInt(e.target.value) || 0))}
          placeholder="ex: 8 500"
          className="w-full px-3 py-2 rounded-xl text-sm font-bold text-[#111827] bg-[#F9FAFB] border border-[#F3F4F6] focus:outline-none focus:border-[#22C55E]"
        />
      </div>

      {/* Water */}
      <div>
        <p className="text-xs font-black text-[#374151] mb-1.5">Eau bue</p>
        <div className="flex gap-1.5">
          {WATER_OPTIONS.map(v => (
            <button key={v} onClick={() => setWaterL(v)}
              className="flex-1 py-1.5 rounded-lg text-xs font-black transition-all"
              style={{
                background: waterL === v ? '#22C55E' : '#F9FAFB',
                color: waterL === v ? 'white' : '#6B7280',
                border: `1.5px solid ${waterL === v ? '#22C55E' : '#F3F4F6'}`,
              }}>
              {v}L
            </button>
          ))}
        </div>
      </div>

      {/* Sleep + bedtime */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-xs font-black text-[#374151] mb-1.5">Sommeil ?</p>
          <div className="flex gap-1">
            {[{ v: true, label: '😴 Bien' }, { v: false, label: '😵 Mal' }].map(({ v, label }) => (
              <button key={String(v)} onClick={() => setSleptWell(v)}
                className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: sleptWell === v ? (v ? '#F0FDF4' : '#FEF9C3') : '#F9FAFB',
                  color: sleptWell === v ? (v ? '#163B2D' : '#92400E') : '#9CA3AF',
                  border: `1.5px solid ${sleptWell === v ? (v ? '#22C55E' : '#F59E0B') : '#F3F4F6'}`,
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-black text-[#374151] mb-1.5">Couché avant 23h ?</p>
          <div className="flex gap-1">
            {[{ v: true, label: '✓ Oui' }, { v: false, label: '✗ Non' }].map(({ v, label }) => (
              <button key={String(v)} onClick={() => setBedtimeOK(v)}
                className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: bedtimeOK === v ? (v ? '#F0FDF4' : '#FEF9C3') : '#F9FAFB',
                  color: bedtimeOK === v ? (v ? '#163B2D' : '#92400E') : '#9CA3AF',
                  border: `1.5px solid ${bedtimeOK === v ? (v ? '#22C55E' : '#F59E0B') : '#F3F4F6'}`,
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Weight (optional) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs font-black text-[#374151]">Poids (optionnel)</p>
          <span className="text-[10px] text-[#9CA3AF]">Mettre à jour la courbe</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number" value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="ex: 85.4"
            step={0.1} min={30} max={300}
            className="flex-1 px-3 py-2 rounded-xl text-sm font-bold text-[#111827] bg-[#F9FAFB] border border-[#F3F4F6] focus:outline-none focus:border-[#22C55E]"
          />
          <span className="text-sm font-bold text-[#9CA3AF]">kg</span>
        </div>
      </div>

      <button onClick={handleSave}
        className="w-full py-3 rounded-xl text-sm font-black text-white transition-all active:scale-95"
        style={{ background: saved ? '#163B2D' : '#22C55E', fontFamily: 'Manrope' }}>
        {saved ? '✓ Enregistré !' : existing ? 'Mettre à jour' : 'Enregistrer le check-in'}
      </button>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const { user, checkIns, sessions, todayCheckIn, upsertCheckIn, completedCount, updateUser, authUser } = useApp()
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null)
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [editingGoal, setEditingGoal] = useState(false)
  const [editWeight, setEditWeight] = useState('')
  const [editGoal, setEditGoal] = useState('')
  const [goalSaving, setGoalSaving] = useState(false)
  const [goalError, setGoalError] = useState<string | null>(null)
  useEffect(() => { track.dashboardViewed() }, [])

  async function saveGoal() {
    const w = parseFloat(editWeight)
    const g = parseFloat(editGoal)
    if (editGoal && editWeight && g >= w) {
      setGoalError('Goal must be less than current weight.')
      return
    }
    setGoalSaving(true)
    setGoalError(null)
    const payload: Record<string, number | null> = {}
    if (editWeight) payload.weight_kg = w
    if (editGoal) payload.weight_goal_kg = g
    payload.updated_at = Date.now() // ignored by Supabase type but triggers update
    const { error } = await supabase.from('profiles').update({
      ...(editWeight ? { weight_kg: w } : {}),
      ...(editGoal ? { weight_goal_kg: g } : {}),
      updated_at: new Date().toISOString(),
    }).eq('id', authUser!.id)
    if (error) { setGoalError(error.message); setGoalSaving(false); return }
    updateUser({
      ...(editWeight ? { weightCurrent: w } : {}),
      ...(editGoal ? { weightTarget: g } : {}),
    })
    setEditingGoal(false)
    setGoalSaving(false)
    setEditWeight('')
    setEditGoal('')
  }

  const today = new Date().toISOString().split('T')[0]
  const sessionDone = sessions.some(s => s.date === today && s.status === 'completed')
  const currentSession = ALL_SESSIONS[Math.min(completedCount, ALL_SESSIONS.length - 1)]
  const streak = useMemo(() => getStreak(sessions), [sessions])

  const startDate = user.startDate || today
  const dayInProgram = Math.max(1, Math.round((new Date(today).getTime() - new Date(startDate).getTime()) / 86400000) + 1)
  const programPct = Math.min(Math.round((dayInProgram / user.programDays) * 100), 100)

  const weightHistory = useMemo(() => {
    return checkIns
      .filter(ci => ci.weight)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(ci => ({ date: ci.date, w: ci.weight! }))
  }, [checkIns])

  const startWeight = weightHistory.length > 0 ? weightHistory[0].w : user.weightCurrent
  const currentWeight = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].w : user.weightCurrent
  const weightDelta = startWeight && currentWeight ? +(currentWeight - startWeight).toFixed(1) : 0

  const weekStart = useMemo(() => {
    const d = new Date(); d.setDate(d.getDate() - d.getDay() + 1)
    return d.toISOString().split('T')[0]
  }, [])
  const lastWeekStart = useMemo(() => {
    const d = new Date(weekStart); d.setDate(d.getDate() - 7)
    return d.toISOString().split('T')[0]
  }, [weekStart])
  const thisWeek = useMemo(() => calcWeeklyScore(checkIns, sessions, weekStart), [checkIns, sessions, weekStart])
  const lastWeek = useMemo(() => calcWeeklyScore(checkIns, sessions, lastWeekStart), [checkIns, sessions, lastWeekStart])
  const scoreDelta = lastWeek.total > 0 ? Math.round(((thisWeek.total - lastWeek.total) / lastWeek.total) * 100) : 0

  const stepsDone = todayCheckIn ? todayCheckIn.steps >= user.goals.steps : false
  const waterDone = todayCheckIn ? todayCheckIn.waterL >= user.goals.waterL : false

  const now = new Date()
  const dateLabel = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()

  return (
    <div className="min-h-full bg-[#F8F8F5]">
      <MilestoneToast milestone={activeMilestone} onDismiss={() => setActiveMilestone(null)} />

      <div className="p-6 max-w-[1100px] mx-auto">

        {/* ── Sub-header ── */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs font-bold text-[#9CA3AF] tracking-widest mb-1">{dateLabel}</p>
            <h1 className="text-3xl font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>
              Bonjour, {user.name} 👋
            </h1>
            <p className="text-sm text-[#6B7280] font-medium mt-1">Prêt à continuer sur ta lancée ?</p>
          </div>
          <button
            onClick={() => setShowCheckIn(!showCheckIn)}
            className="px-5 py-2.5 rounded-full text-sm font-black shrink-0 mt-1 transition-all"
            style={{
              background: todayCheckIn && !showCheckIn ? '#F0FDF4' : showCheckIn ? '#111827' : '#22C55E',
              color: todayCheckIn && !showCheckIn ? '#163B2D' : 'white',
              fontFamily: 'Manrope',
            }}
          >
            {todayCheckIn && !showCheckIn ? '✓ Check-in fait' : showCheckIn ? '✕ Fermer' : '+ Check-in du jour'}
          </button>
        </div>

        {/* ── Check-in modal ── */}
        {showCheckIn && (
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-4 border-2" style={{ borderColor: '#22C55E' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Check-in du jour</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">
                  {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
              </div>
              {todayCheckIn && <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: '#F0FDF4', color: '#163B2D' }}>Modifiable</span>}
            </div>
            <CheckInForm
              existing={todayCheckIn}
              onSave={ci => {
                upsertCheckIn(ci)
                setShowCheckIn(false)
              }}
            />
          </div>
        )}

        {/* ── 2-column grid ── */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 320px' }}>

          {/* ══ LEFT COLUMN ══ */}
          <div className="space-y-4">

            {/* Objective card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Ton objectif</p>
                <button
                  onClick={() => { setEditingGoal(e => !e); setGoalError(null); setEditWeight(currentWeight > 0 ? String(currentWeight) : ''); setEditGoal(user.weightTarget > 0 ? String(user.weightTarget) : '') }}
                  className="text-xs font-bold text-[#9CA3AF] hover:text-[#22C55E] transition-colors px-2 py-1 rounded-lg hover:bg-[#F0FDF4]"
                >
                  {editingGoal ? 'Annuler' : '✏️ Modifier'}
                </button>
              </div>

              {editingGoal ? (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-[#6B7280] mb-1">Poids actuel (kg)</p>
                      <input type="number" inputMode="decimal" value={editWeight} onChange={e => setEditWeight(e.target.value)} placeholder={currentWeight > 0 ? String(currentWeight) : '82'}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#F9FAFB] border-2 border-[#F3F4F6] text-sm font-bold text-[#111827] focus:outline-none focus:border-[#22C55E]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-[#6B7280] mb-1">Objectif (kg)</p>
                      <input type="number" inputMode="decimal" value={editGoal} onChange={e => { setEditGoal(e.target.value); setGoalError(null) }} placeholder={user.weightTarget > 0 ? String(user.weightTarget) : '75'}
                        className={`w-full px-3 py-2.5 rounded-xl bg-[#F9FAFB] border-2 text-sm font-bold text-[#111827] focus:outline-none ${goalError ? 'border-red-400' : 'border-[#F3F4F6] focus:border-[#22C55E]'}`} />
                    </div>
                  </div>
                  {goalError && <p className="text-xs text-red-500">{goalError}</p>}
                  <button onClick={saveGoal} disabled={goalSaving}
                    className="w-full py-2.5 rounded-xl text-sm font-black text-white transition-all active:scale-95 disabled:opacity-60"
                    style={{ background: '#22C55E', fontFamily: 'Manrope' }}>
                    {goalSaving ? 'Enregistrement…' : 'Enregistrer'}
                  </button>
                </div>
              ) : (
              <div className="grid gap-4" style={{ gridTemplateColumns: 'auto 1fr auto' }}>

                {/* Weight */}
                <div className="flex flex-col justify-center gap-3">
                  <div>
                    <p className="text-2xl font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>
                      {currentWeight > 0 ? `${currentWeight} kg` : '— kg'}
                    </p>
                    <p className="text-xs text-[#9CA3AF] font-semibold">actuel</p>
                  </div>
                  <span className="text-[#22C55E] text-lg font-bold">↓</span>
                  <div>
                    <p className="text-2xl font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>{user.weightTarget > 0 ? `${user.weightTarget} kg` : '— kg'}</p>
                    <p className="text-xs text-[#9CA3AF] font-semibold">objectif</p>
                  </div>
                </div>

                {/* Ring */}
                <div className="flex flex-col items-center justify-center gap-2">
                  <ProgressRing pct={programPct} />
                  <p className="text-sm font-black text-[#22C55E]" style={{ fontFamily: 'Manrope' }}>
                    Jour {dayInProgram} / {user.programDays}
                  </p>
                </div>

                {/* Sparkline + CTA */}
                <div className="flex flex-col justify-between">
                  <div>
                    <ScoreSparkline checkIns={checkIns} sessions={sessions} />
                    <p className="text-xl font-black mt-2" style={{
                      color: weightDelta === 0 ? '#9CA3AF' : weightDelta < 0 ? '#22C55E' : '#EF4444',
                      fontFamily: 'Manrope'
                    }}>
                      {weightDelta === 0 ? '— kg' : `${weightDelta > 0 ? '+' : ''}${weightDelta} kg`}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">depuis le début</p>
                  </div>
                  <button onClick={() => onNavigate?.('progression')} className="mt-4 text-sm font-bold text-[#22C55E] hover:underline whitespace-nowrap">
                    Voir mes progrès →
                  </button>
                </div>
              </div>
              )}
            </div>

            {/* Session hero card */}
            {!sessionDone ? (
              <div className="relative rounded-2xl overflow-hidden" style={{ background: '#0F2416', minHeight: 220 }}>
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 w-1/2"
                    style={{ background: 'linear-gradient(135deg, transparent 20%, rgba(22,59,45,0.4) 100%)' }} />
                  <svg className="absolute right-6 bottom-0" width="180" height="200" viewBox="0 0 180 200" fill="none" opacity="0.15">
                    <ellipse cx="120" cy="60" rx="30" ry="30" fill="#22C55E" />
                    <rect x="100" y="85" width="12" height="70" rx="6" fill="#22C55E" transform="rotate(-15 100 85)" />
                    <rect x="120" y="90" width="10" height="65" rx="5" fill="#22C55E" transform="rotate(10 120 90)" />
                    <rect x="60" y="100" width="80" height="12" rx="6" fill="#22C55E" />
                    <rect x="50" y="100" width="10" height="60" rx="5" fill="#22C55E" transform="rotate(-20 50 100)" />
                    <rect x="130" y="105" width="10" height="55" rx="5" fill="#22C55E" transform="rotate(15 130 105)" />
                  </svg>
                </div>
                <div className="relative z-10 p-6 max-w-[60%]">
                  <span className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                    style={{ background: 'rgba(34,197,94,0.2)', color: '#7AE582', border: '1px solid rgba(34,197,94,0.3)' }}>
                    Mission du jour · S{currentSession.week}
                  </span>
                  <h2 className="text-2xl font-black text-white mb-3 leading-tight" style={{ fontFamily: 'Manrope' }}>
                    {currentSession.missionName}
                  </h2>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7AE582" strokeWidth={2} strokeLinecap="round">
                        <rect x="2" y="9" width="3" height="6" rx="1.5"/><rect x="19" y="9" width="3" height="6" rx="1.5"/>
                        <rect x="5" y="7" width="2" height="10" rx="1"/><rect x="17" y="7" width="2" height="10" rx="1"/>
                        <line x1="7" y1="12" x2="17" y2="12"/>
                      </svg>
                      <span className="text-xs text-[#DCF5E3] font-semibold">{currentSession.exercises.length} exercices</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7AE582" strokeWidth={2} strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span className="text-xs text-[#DCF5E3] font-semibold">{currentSession.duration}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                      {currentSession.focus}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {currentSession.weekGoal}
                  </p>
                  <div className="flex items-center gap-3">
                    <button onClick={() => onNavigate?.('entrainement')}
                      className="px-5 py-2.5 rounded-full text-sm font-black text-white active:scale-95 transition-all"
                      style={{ background: '#22C55E', fontFamily: 'Manrope' }}>
                      Commencer →
                    </button>
                    <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      Séance {completedCount + 1}/{ALL_SESSIONS.length}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#DCF5E3] rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">🏆</div>
                <p className="text-xl font-black text-[#163B2D]" style={{ fontFamily: 'Manrope' }}>Séance complétée !</p>
                <p className="text-sm text-[#22C55E] font-semibold mt-1">Séance {completedCount} enregistrée · Bravo</p>
                <button onClick={() => onNavigate?.('entrainement')}
                  className="mt-3 text-xs font-bold text-[#22C55E] hover:underline">
                  Voir la prochaine séance →
                </button>
              </div>
            )}

            {/* Progress stats */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-4">Tes progrès</p>
              <div className="grid grid-cols-4 divide-x divide-[#F3F4F6]">
                <StatCell emoji="🔥" label="Streak" value={`${streak} j`} sub="Continue !" accent />
                <StatCell emoji="⚡" label="Score semaine" value={`${thisWeek.total}`} sub={`${scoreDelta >= 0 ? '+' : ''}${scoreDelta}% vs S-1`} />
                <StatCell emoji="⚖️" label="Poids perdu" value={weightDelta === 0 ? '—' : `${weightDelta > 0 ? '+' : ''}${weightDelta} kg`} sub="Depuis le début" />
                <StatCell emoji="🎯" label="Séances" value={`${completedCount}`} sub="complétées" accent />
              </div>
            </div>

            {/* Module roadmap */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-4">Roadmap 365 jours</p>
              <div className="space-y-2">
                {MODULES.map(mod => {
                  const isActive = currentSession.week >= mod.weeksRange[0] && currentSession.week <= mod.weeksRange[1]
                  const isDone = currentSession.week > mod.weeksRange[1]
                  const opacity = !mod.available ? 0.45 : 1
                  return (
                    <div key={mod.id} className="flex items-center gap-3 p-3 rounded-xl"
                      style={{
                        background: isActive ? 'rgba(34,197,94,0.06)' : '#FAFAFA',
                        border: `1.5px solid ${isActive ? 'rgba(34,197,94,0.18)' : '#F3F4F6'}`,
                        opacity,
                      }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                        style={{
                          background: isActive ? mod.color : isDone ? '#F0FDF4' : '#F3F4F6',
                          color: isActive ? 'white' : isDone ? '#22C55E' : '#9CA3AF',
                        }}>
                        {isDone ? '✓' : mod.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-[#111827] leading-tight">{mod.name}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: isActive ? mod.color : '#9CA3AF' }}>
                          {mod.milestone} · {isActive ? 'En cours' : isDone ? 'Terminé ✓' : !mod.available ? 'Bientôt disponible' : 'À venir'}
                        </p>
                      </div>
                      {!isActive && !isDone && <span className="text-[10px] text-[#D1D5DB] shrink-0">🔒</span>}
                      {isActive && <div className="w-2 h-2 rounded-full shrink-0" style={{ background: mod.color }} />}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="space-y-4">

            {/* Aujourd'hui checklist */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Aujourd'hui</p>
                {!todayCheckIn && (
                  <button onClick={() => setShowCheckIn(true)}
                    className="text-xs font-bold text-[#22C55E] hover:underline">
                    + Remplir
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {[
                  {
                    done: stepsDone,
                    label: `${user.goals.steps.toLocaleString('fr-FR')} pas`,
                    sub: todayCheckIn
                      ? (stepsDone ? 'Objectif atteint ✓' : `${todayCheckIn.steps.toLocaleString('fr-FR')} / ${user.goals.steps.toLocaleString('fr-FR')}`)
                      : 'Pas encore enregistré',
                  },
                  {
                    done: waterDone,
                    label: `${user.goals.waterL}L d'eau`,
                    sub: todayCheckIn
                      ? (waterDone ? 'Objectif atteint ✓' : `${todayCheckIn.waterL}L / ${user.goals.waterL}L`)
                      : 'Pas encore enregistré',
                  },
                  {
                    done: sessionDone,
                    label: 'Séance 20 min',
                    sub: sessionDone ? 'Complétée ✓' : 'À faire aujourd\'hui',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={{ background: item.done ? '#F0FDF4' : '#FAFAFA', border: `1px solid ${item.done ? '#BBF7D0' : '#F3F4F6'}` }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: item.done ? '#22C55E' : 'white', border: item.done ? 'none' : '2px solid #D1D5DB' }}>
                      {item.done && <span className="text-white text-[10px] font-black">✓</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#111827] leading-none">{item.label}</p>
                      <p className="text-[11px] text-[#6B7280] mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Score today */}
              {todayCheckIn && (
                <div className="mt-3 pt-3 border-t border-[#F9FAFB]">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#9CA3AF]">Score du jour</p>
                    <div className="flex gap-2">
                      {[
                        { label: 'Marche', val: Math.round(Math.min(todayCheckIn.steps / 7000, 1) * 25), max: 25, color: '#22C55E' },
                        { label: 'Eau', val: Math.round(Math.min(todayCheckIn.waterL / 2, 1) * 20), max: 20, color: '#60A5FA' },
                        { label: 'Sommeil', val: (todayCheckIn.sleptWell ? 10 : 0) + (todayCheckIn.bedtimeOK ? 5 : 0), max: 15, color: '#A78BFA' },
                      ].map(s => (
                        <div key={s.label} className="text-center">
                          <p className="text-[10px] text-[#9CA3AF]">{s.label}</p>
                          <p className="text-xs font-black" style={{ color: s.color }}>{s.val}/{s.max}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Weight progression chart */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Courbe de poids</p>
                {weightDelta !== 0 && (
                  <span className="text-xs font-black" style={{ color: weightDelta < 0 ? '#22C55E' : '#EF4444' }}>
                    {weightDelta > 0 ? '+' : ''}{weightDelta} kg
                  </span>
                )}
              </div>
              <div className="mb-3">
                <WeightChart
                  weights={weightHistory}
                  startWeight={user.weightCurrent}
                  targetWeight={user.weightTarget}
                />
              </div>
              {weightHistory.length >= 2 && (
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>{weightHistory[0].w} kg</p>
                    <p className="text-[10px] text-[#9CA3AF] font-semibold">départ</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-black" style={{ color: '#9CA3AF', fontFamily: 'Manrope' }}>{user.weightTarget} kg</p>
                    <p className="text-[10px] text-[#9CA3AF] font-semibold">objectif</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>{currentWeight} kg</p>
                    <p className="text-[10px] text-[#9CA3AF] font-semibold">actuel</p>
                  </div>
                </div>
              )}
            </div>

            {/* Score semaine */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Score cette semaine</p>
                <span className="text-xl font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>{thisWeek.total}/100</span>
              </div>
              <div className="h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden mb-3">
                <div className="h-full rounded-full transition-all" style={{ width: `${thisWeek.total}%`, background: 'linear-gradient(90deg, #22C55E, #163B2D)' }} />
              </div>
              <div className="grid grid-cols-4 gap-1 text-center">
                {[
                  { l: 'Séances', v: thisWeek.training, m: 40 },
                  { l: 'Marche', v: thisWeek.walk, m: 25 },
                  { l: 'Eau', v: thisWeek.hydration, m: 20 },
                  { l: 'Sommeil', v: thisWeek.sleep, m: 15 },
                ].map(({ l, v, m }) => (
                  <div key={l}>
                    <p className="text-[10px] text-[#9CA3AF]">{l}</p>
                    <p className="text-sm font-black" style={{ color: v >= m * 0.8 ? '#22C55E' : '#9CA3AF', fontFamily: 'Manrope' }}>{v}/{m}</p>
                  </div>
                ))}
              </div>
              {checkIns.length === 0 && (
                <p className="text-[10px] text-[#9CA3AF] text-center mt-2">Fais ton premier check-in pour voir ton score.</p>
              )}
            </div>

            {/* Coach card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ background: '#F9FAFB' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Coach DadFit</p>
                <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#22C55E' }}>
                  <span className="text-white text-sm">★</span>
                </button>
              </div>
              <div className="flex items-end gap-3 mb-4">
                <div className="w-20 h-20 rounded-2xl shrink-0 flex items-center justify-center text-3xl"
                  style={{ background: 'linear-gradient(135deg, #163B2D, #22C55E)' }}>💪</div>
                <div className="flex-1">
                  <span className="text-[#22C55E] text-3xl font-black leading-none">"</span>
                  <p className="text-base font-black text-[#111827] leading-snug -mt-2" style={{ fontFamily: 'Manrope' }}>
                    {completedCount >= 10
                      ? 'Tu es à mi-parcours. Continue. Les résultats viennent de la régularité.'
                      : completedCount >= 5
                        ? "L'habitude se forme maintenant. Chaque séance compte."
                        : completedCount > 0
                          ? "Les premières séances sont les plus dures. Tu les as passées."
                          : "Lance ta première séance aujourd'hui. C'est la plus importante."}
                  </p>
                </div>
              </div>
              <button className="text-sm font-bold text-[#22C55E] hover:underline">Voir tous les conseils →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
