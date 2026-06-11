import React from 'react'
import { useApp } from '../context/AppContext'
import { getStreak } from '../utils/score'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl p-5 shadow-sm ${className}`}>{children}</div>
}
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">{children}</p>
}

const WEEKLY_CHALLENGES = [
  { id: 'wc1', icon: '🚶', title: '3 jours à 8 000 pas', desc: 'Atteins 8 000 pas sur au moins 3 jours cette semaine.', xp: '+10 pts score', goal: 3, metric: (steps: number) => steps >= 8000 },
  { id: 'wc2', icon: '💧', title: "2L d'eau · 5 jours", desc: "Atteins ton objectif d'hydratation sur 5 jours cette semaine.", xp: '+8 pts score', goal: 5, metric: (_steps: number, water: number) => water >= 2 },
  { id: 'wc3', icon: '🌙', title: 'Couché avant 23h · 4 soirs', desc: "Maintiens une heure de coucher régulière pour améliorer le score Sommeil.", xp: '+6 pts score', goal: 4, metric: (_steps: number, _water: number, bedOK: boolean) => bedOK },
]

const SPECIAL_CHALLENGES = [
  { icon: '🏃', title: '10 000 pas en un jour', desc: 'Dépasse les 10 000 pas en une seule journée.' },
  { icon: '🔥', title: "7 jours actifs d'affilée", desc: "Une activité (séance ou 6k pas minimum) chaque jour pendant 7 jours." },
  { icon: '⚡', title: 'Score 80+ une semaine', desc: "Atteins un score DadFit de 80 ou plus sur une semaine complète." },
  { icon: '💪', title: "Séance à énergie 3 ou moins", desc: "Fais une séance même quand l'énergie est au plus bas. Le vrai mental." },
  { icon: '🌅', title: 'Séance avant 8h', desc: "Lance une séance avant 8h du matin." },
  { icon: '🏆', title: 'Mois parfait', desc: "30 jours avec au moins une activité enregistrée par jour." },
]

export default function Defis() {
  const { checkIns, sessions, milestones } = useApp()

  const completedCount = sessions.filter(s => s.status !== 'skipped').length
  const streak = getStreak(sessions)
  const unlockedMilestones = milestones.filter(m => m.unlocked).length
  const nextMilestone = milestones.find(m => !m.unlocked)
  const totalXP = unlockedMilestones * 100 + completedCount * 10 + streak * 5

  // Compute this week's check-ins
  const weekStart = (() => {
    const d = new Date(); d.setDate(d.getDate() - d.getDay() + 1)
    return d.toISOString().split('T')[0]
  })()
  const weekCheckIns = checkIns.filter(ci => ci.date >= weekStart)
  sessions.filter(s => s.date >= weekStart && s.status === 'completed')

  // Weekly challenge progress
  const wc1Progress = weekCheckIns.filter(ci => ci.steps >= 8000).length
  const wc2Progress = weekCheckIns.filter(ci => ci.waterL >= 2).length
  const wc3Progress = weekCheckIns.filter(ci => ci.bedtimeOK).length

  const weeklyProgress = [wc1Progress, wc2Progress, wc3Progress]
  const weeklyGoals = [3, 5, 4]

  // Special challenge unlocks
  const hasOver10k = checkIns.some(ci => ci.steps >= 10000)
  const has7Streak = streak >= 7
  const sessionEnergy3 = sessions.some(s => {
    const ci = checkIns.find(ci => ci.date === s.date)
    return ci && ci.energy <= 3 && s.status === 'completed'
  })

  const specialUnlocked = [hasOver10k, has7Streak, false, sessionEnergy3, false, false]

  return (
    <div className="min-h-full bg-[#F8F8F5]">
      <div className="max-w-[1100px] mx-auto px-6 py-6 space-y-6">

        {/* ── Header full width ── */}
        <div className="rounded-3xl p-6 relative overflow-hidden" style={{ background: '#111827' }}>
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-5" style={{ background: '#22C55E', transform: 'translate(30%, -30%)' }} />
          <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-2">DadFit · Défis</p>
              <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Manrope' }}>Tes défis</h1>
              <p className="text-sm text-[#9CA3AF]">Chaque action compte. Chaque habitude se récompense.</p>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-3xl font-black text-[#22C55E]" style={{ fontFamily: 'Manrope' }}>{totalXP}</p>
                <p className="text-xs text-[#9CA3AF]">points totaux</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-white" style={{ fontFamily: 'Manrope' }}>{unlockedMilestones}</p>
                <p className="text-xs text-[#9CA3AF]">badges débloqués</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-white" style={{ fontFamily: 'Manrope' }}>{completedCount}</p>
                <p className="text-xs text-[#9CA3AF]">séances complètes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-start">

          {/* ── LEFT MAIN ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Weekly challenges */}
            <Card>
              <Label>Défis de la semaine</Label>
              <div className="space-y-3">
                {WEEKLY_CHALLENGES.map((c, idx) => {
                  const progress = weeklyProgress[idx]
                  const total = weeklyGoals[idx]
                  const done = progress >= total
                  return (
                    <div key={c.id} className="rounded-xl p-4"
                      style={{ background: done ? '#F0FDF4' : '#FAFAFA', border: `1.5px solid ${done ? '#BBF7D0' : '#F3F4F6'}` }}>
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                          style={{ background: done ? '#22C55E' : '#F3F4F6' }}>
                          {done ? '✓' : c.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-black text-sm text-[#111827]" style={{ fontFamily: 'Manrope' }}>{c.title}</p>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: '#DCF5E3', color: '#163B2D' }}>{c.xp}</span>
                          </div>
                          <p className="text-xs text-[#6B7280] mt-0.5 mb-2">{c.desc}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${Math.min((progress / total) * 100, 100)}%`, background: done ? '#22C55E' : '#60A5FA' }} />
                            </div>
                            <span className="text-xs font-bold text-[#6B7280]">{progress}/{total}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              {checkIns.length === 0 && (
                <p className="text-xs text-[#9CA3AF] text-center mt-3">Fais ton check-in quotidien pour suivre les défis.</p>
              )}
            </Card>

            {/* Special challenges */}
            <Card>
              <Label>Défis spéciaux</Label>
              <div className="grid grid-cols-2 gap-2">
                {SPECIAL_CHALLENGES.map((c, i) => {
                  const unlocked = specialUnlocked[i]
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                      style={{ background: unlocked ? '#F0FDF4' : '#FAFAFA', border: `1.5px solid ${unlocked ? '#BBF7D0' : '#F3F4F6'}`, opacity: unlocked ? 1 : 0.75 }}>
                      <span className="text-2xl shrink-0" style={{ filter: unlocked ? 'none' : 'grayscale(0.7)' }}>{c.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <p className="text-sm font-bold text-[#111827] leading-snug">{c.title}</p>
                          {unlocked ? <span className="text-xs font-black text-[#22C55E] shrink-0">✓</span> : <span className="text-xs text-[#D1D5DB] shrink-0">🔒</span>}
                        </div>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{c.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Streak challenge */}
            <div className="rounded-2xl p-5" style={{ background: '#163B2D' }}>
              <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">Défi streak</p>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">🔥</span>
                <div>
                  <p className="text-3xl font-black text-white" style={{ fontFamily: 'Manrope' }}>{streak} jours</p>
                  <p className="text-sm text-[#9CA3AF]">streak actuel</p>
                </div>
              </div>
              <p className="text-sm text-[#9CA3AF] leading-relaxed mb-3">
                Chaque jour actif allonge ta série. Elle ne se rompt pas à la première pause — elle se rompt si tu n'essaies plus de revenir.
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {Array.from({ length: 14 }, (_, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                    style={{ background: i < streak ? '#22C55E' : 'rgba(255,255,255,0.08)', color: i < streak ? 'white' : 'transparent' }}>
                    ✓
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="w-80 shrink-0 space-y-4">

            {/* Next milestone */}
            {nextMilestone && (
              <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0' }}>
                <span className="text-3xl" style={{ filter: 'grayscale(0.5)' }}>{nextMilestone.emoji}</span>
                <div className="flex-1">
                  <p className="text-xs font-black text-[#163B2D] mb-0.5">Prochain badge</p>
                  <p className="font-black text-[#111827] text-sm" style={{ fontFamily: 'Manrope' }}>{nextMilestone.label}</p>
                  <div className="h-1.5 bg-[#BBF7D0] rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${Math.min((completedCount / nextMilestone.triggerSessions) * 100, 100)}%` }} />
                  </div>
                  <p className="text-xs text-[#22C55E] mt-1 font-semibold">
                    {Math.max(0, nextMilestone.triggerSessions - completedCount)} séances restantes
                  </p>
                </div>
              </div>
            )}

            {/* Milestones */}
            <Card>
              <Label>Badges de progression</Label>
              <div className="grid grid-cols-3 gap-2">
                {milestones.map(m => (
                  <div key={m.id} className="flex flex-col items-center gap-2 p-3 rounded-2xl text-center"
                    style={{ background: m.unlocked ? '#F0FDF4' : '#F9FAFB', border: `1.5px solid ${m.unlocked ? '#BBF7D0' : '#F3F4F6'}` }}>
                    <span className="text-2xl" style={{ filter: m.unlocked ? 'none' : 'grayscale(1) opacity(0.25)' }}>{m.emoji}</span>
                    <p className="text-[10px] font-black leading-tight" style={{ color: m.unlocked ? '#163B2D' : '#9CA3AF' }}>{m.label}</p>
                    <p className="text-[9px]" style={{ color: m.unlocked ? '#22C55E' : '#D1D5DB' }}>{m.triggerSessions} séances</p>
                    {m.unlocked && (
                      <span className="text-[9px] font-black text-white px-1.5 py-0.5 rounded-full" style={{ background: '#22C55E' }}>✓</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}
