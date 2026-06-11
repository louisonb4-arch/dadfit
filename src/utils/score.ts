import type { CheckIn, SessionLog, WeeklyScore } from '../types'

export function calcDailyScore(checkIn: CheckIn, sessionDone: boolean): {
  training: number; walk: number; hydration: number; sleep: number; total: number
} {
  // Training: 40pts per completed session (simplified for daily)
  const training = sessionDone ? 40 : 0

  // Walk: 25pts at 7000 steps goal, partial credit linear
  const walkRatio = Math.min(checkIn.steps / 7000, 1)
  const walk = Math.round(walkRatio * 25)

  // Hydration: 20pts at 2L goal, partial credit linear
  const hydrRatio = Math.min(checkIn.waterL / 2, 1)
  const hydration = Math.round(hydrRatio * 20)

  // Sleep: 15pts — sleptWell 10pts + bedtimeOK 5pts
  const sleep = (checkIn.sleptWell ? 10 : 0) + (checkIn.bedtimeOK ? 5 : 0)

  return { training, walk, hydration, sleep, total: training + walk + hydration + sleep }
}

export function calcWeeklyScore(
  checkIns: CheckIn[],
  sessions: SessionLog[],
  weekStart: string
): WeeklyScore {
  const start = new Date(weekStart)
  const end = new Date(start)
  end.setDate(end.getDate() + 7)

  const weekCheckIns = checkIns.filter(ci => {
    const d = new Date(ci.date)
    return d >= start && d < end
  })
  const weekSessions = sessions.filter(s => {
    const d = new Date(s.date)
    return d >= start && d < end && s.status === 'completed'
  })

  // Training: up to 3 sessions per week = 40pts max (proportional)
  const sessionCount = weekSessions.length
  const training = Math.min(Math.round((sessionCount / 3) * 40), 40)

  // Average walk, hydration, sleep across days with check-ins
  const n = weekCheckIns.length || 1
  const walk = Math.round(
    weekCheckIns.reduce((acc, ci) => acc + Math.min(ci.steps / 7000, 1), 0) / n * 25
  )
  const hydration = Math.round(
    weekCheckIns.reduce((acc, ci) => acc + Math.min(ci.waterL / 2, 1), 0) / n * 20
  )
  const sleep = Math.round(
    weekCheckIns.reduce((acc, ci) => acc + (ci.sleptWell ? 10 : 0) + (ci.bedtimeOK ? 5 : 0), 0) / n
  )

  return {
    weekStart,
    training, walk, hydration, sleep,
    total: training + walk + hydration + sleep,
    vsLastWeek: 0, // set externally
  }
}

export function getPhase(sessionCount: number): { phase: number; label: string; nextAt: number } {
  if (sessionCount < 12) return { phase: 1, label: 'Phase 1 — Fondations', nextAt: 12 }
  if (sessionCount < 24) return { phase: 2, label: 'Phase 2 — Construction', nextAt: 24 }
  return { phase: 3, label: 'Phase 3 — Performance', nextAt: 36 }
}

export function getStreak(sessions: SessionLog[]): number {
  if (sessions.length === 0) return 0
  const sorted = [...sessions].sort((a, b) => b.date.localeCompare(a.date))
  const today = new Date().toISOString().split('T')[0]
  let streak = 0
  let expectedDate = today

  for (const s of sorted) {
    if (s.status === 'skipped') continue
    const diff = daysBetween(s.date, expectedDate)
    if (diff > 3) break // gap > 3 days breaks streak
    streak++
    const prev = new Date(s.date)
    prev.setDate(prev.getDate() - 2)
    expectedDate = s.date
  }
  return streak
}

function daysBetween(a: string, b: string): number {
  return Math.abs((new Date(b).getTime() - new Date(a).getTime()) / 86400000)
}

export function daysSinceLastSession(sessions: SessionLog[]): number {
  const completed = sessions.filter(s => s.status !== 'skipped')
  if (completed.length === 0) return 999
  const latest = completed.sort((a, b) => b.date.localeCompare(a.date))[0]
  return Math.round(daysBetween(latest.date, new Date().toISOString().split('T')[0]))
}
