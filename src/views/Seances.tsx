import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import type { WorkoutSession, WorkoutExercise } from '../data/workouts'
import {
  SESSIONS_BY_WEEK, WEEK_GOALS, DIFFICULTY_LABEL, DIFFICULTY_COLOR, EXERCISE_GRADIENTS,
  ALL_SESSIONS, MODULES,
} from '../data/workouts'

const FOCUS_HERO: Record<string, { emoji: string; gradient: string }> = {
  'Corps entier':  { emoji: '⚡', gradient: 'linear-gradient(135deg, #0f2210 0%, #163b2d 60%, #1a4a35 100%)' },
  'Bas du corps':  { emoji: '🦵', gradient: 'linear-gradient(135deg, #0f1827 0%, #1e3a5f 60%, #1d4ed8 100%)' },
  'Haut du corps': { emoji: '💪', gradient: 'linear-gradient(135deg, #1a0a00 0%, #7c2d12 60%, #c2410c 100%)' },
  'Mobilité':      { emoji: '🧘', gradient: 'linear-gradient(135deg, #061a0f 0%, #134e4a 60%, #0f766e 100%)' },
}

type SessionStatus = 'done' | 'current' | 'next' | 'locked'

function getStatus(session: WorkoutSession, completedCount: number): SessionStatus {
  const idx = ALL_SESSIONS.findIndex(s => s.id === session.id)
  if (idx < completedCount) return 'done'
  if (idx === completedCount) return 'current'
  if (idx === completedCount + 1) return 'next'
  return 'locked'
}

function lockedMessage(sessionsAway: number): string {
  if (sessionsAway === 1) return "Débloqué après ta prochaine séance."
  if (sessionsAway === 2) return "Encore 2 séances. Tu y arrives."
  if (sessionsAway <= 5) return `Cette mission t'attend dans ${sessionsAway} séances.`
  return "Tu verras cette mission quand ton corps sera prêt."
}

// ─── Difficulty stars ─────────────────────────────────────────────────────────
function Stars({ n, max = 5 }: { n: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
          fill={i < n ? '#F59E0B' : 'none'} stroke={i < n ? '#F59E0B' : '#4B5563'} strokeWidth={2}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

// ─── Exercise thumbnail ───────────────────────────────────────────────────────
function Thumb({ icon }: { icon: string }) {
  const gradient = EXERCISE_GRADIENTS[icon] ?? 'linear-gradient(135deg, #1c1917, #57534e)'
  return (
    <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-md"
      style={{ background: gradient }}>
      {icon}
    </div>
  )
}

// ─── Exercise row ─────────────────────────────────────────────────────────────
function ExRow({ num, ex }: { num: number; ex: WorkoutExercise }) {
  const [open, setOpen] = useState(false)
  const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(ex.videoSearch)}`

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #F3F4F6' }}>
      <div className="flex items-start gap-4 p-4 bg-white">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 mt-0.5"
          style={{ background: '#163B2D' }}>
          {num}
        </div>
        <Thumb icon={ex.icon} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <p className="font-black text-[#111827] text-base leading-tight" style={{ fontFamily: 'Manrope' }}>
              {ex.name}
            </p>
            <div className="flex items-center gap-2">
              <a href={ytUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black text-white shrink-0 transition-opacity hover:opacity-80"
                style={{ background: '#EF4444' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Voir la technique
              </a>
              <button onClick={() => setOpen(o => !o)}
                className="p-1 rounded-lg transition-colors hover:bg-[#F3F4F6]"
                style={{ color: '#9CA3AF' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                  style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[`${ex.sets} séries`, ex.reps, `Repos ${ex.rest}`].map(chip => (
              <span key={chip} className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: '#F3F4F6', color: '#374151' }}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 pb-3 bg-white">
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl" style={{ background: '#F0FDF4' }}>
          <span className="text-base shrink-0 mt-0.5">💚</span>
          <p className="text-xs text-[#166534] leading-relaxed">{ex.dadReason}</p>
        </div>
        <div className="flex items-start gap-2 px-3 py-2 mt-1.5">
          <span className="text-xs font-black text-[#22C55E] shrink-0">✓</span>
          <p className="text-xs text-[#374151] font-semibold">{ex.keyTip}</p>
        </div>
      </div>
      {open && (ex.easier || ex.harder) && (
        <div className="px-4 pb-4 bg-white border-t border-[#F3F4F6]">
          <p className="text-xs font-black uppercase tracking-widest text-[#9CA3AF] mt-3 mb-2">Variations</p>
          <div className="flex gap-2 flex-wrap">
            {ex.easier && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[180px]" style={{ background: '#ECFDF5' }}>
                <span className="text-sm">🟢</span>
                <div>
                  <p className="text-[10px] font-black text-[#166534] uppercase tracking-wide">Plus facile</p>
                  <p className="text-xs text-[#374151] mt-0.5">{ex.easier}</p>
                </div>
              </div>
            )}
            {ex.harder && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[180px]" style={{ background: '#FFF7ED' }}>
                <span className="text-sm">🔴</span>
                <div>
                  <p className="text-[10px] font-black text-[#C2410C] uppercase tracking-wide">Plus dur</p>
                  <p className="text-xs text-[#374151] mt-0.5">{ex.harder}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {(ex.easier || ex.harder) && (
        <button onClick={() => setOpen(o => !o)}
          className="w-full py-2 text-xs font-bold text-center border-t transition-colors hover:bg-[#F9FAFB]"
          style={{ background: 'white', color: '#6B7280', borderColor: '#F3F4F6' }}>
          {open ? '− Masquer les variantes' : '+ Voir les variantes'}
        </button>
      )}
    </div>
  )
}

// ─── Post-session form ────────────────────────────────────────────────────────
function PostSessionForm({ session, onClose, onDone }:
  { session: WorkoutSession; onClose: () => void; onDone: (msg: string) => void }) {
  const { addSession } = useApp()
  const [energy, setEnergy] = useState(3)
  const [diffFelt, setDiffFelt] = useState(3)
  const [painLevel, setPainLevel] = useState<'none' | 'light' | 'strong'>('none')
  const [submitted, setSubmitted] = useState(false)
  const [milestoneMsg, setMilestoneMsg] = useState<string | null>(null)

  function submit() {
    const milestone = addSession({
      date: new Date().toISOString().split('T')[0],
      type: session.type,
      exercises: [],
      status: 'completed',
      energyAfter: energy,
      durationMin: parseInt(session.duration),
      difficultyFelt: diffFelt,
      painLevel,
    })
    setMilestoneMsg(milestone ? `${milestone.emoji} ${milestone.label} unlocked!` : null)
    setSubmitted(true)
  }

  function handleClose() {
    if (milestoneMsg) onDone(milestoneMsg)
    else onDone('Session logged ✓')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">

        {submitted ? (
          <div className="text-center py-2">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
              style={{ background: '#DCF5E3' }}>
              💪
            </div>
            <h2 className="font-black text-xl text-[#111827] mb-2" style={{ fontFamily: 'Manrope' }}>
              Session done.
            </h2>
            <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
              You showed up. That matters more than intensity today.
            </p>
            {milestoneMsg && (
              <div className="rounded-xl px-4 py-3 mb-4 text-sm font-black text-white"
                style={{ background: '#163B2D' }}>
                {milestoneMsg}
              </div>
            )}
            <button onClick={handleClose}
              className="w-full py-3 rounded-2xl text-sm font-black text-white transition-all active:scale-95"
              style={{ background: '#22C55E' }}>
              Continue →
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-black text-xl text-[#111827] mb-1" style={{ fontFamily: 'Manrope' }}>Session done 💪</h2>
            <p className="text-sm text-[#6B7280] mb-5">{session.missionName}</p>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-2">Energy after</p>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(v => (
                    <button key={v} onClick={() => setEnergy(v)}
                      className="flex-1 py-2.5 rounded-xl text-lg font-bold transition-all"
                      style={{ background: energy === v ? '#163B2D' : '#F3F4F6', color: energy === v ? '#22C55E' : '#9CA3AF' }}>
                      {['😴','😐','🙂','😊','⚡'][v-1]}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-1 px-1">
                  <span>Drained</span><span>On fire</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-2">Difficulty felt</p>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(v => (
                    <button key={v} onClick={() => setDiffFelt(v)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                      style={{ background: diffFelt === v ? DIFFICULTY_COLOR[v] : '#F3F4F6', color: diffFelt === v ? 'white' : '#9CA3AF' }}>
                      {v}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-1 px-1">
                  <span>Easy</span><span>Intense</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-2">Any pain or discomfort?</p>
                <div className="flex gap-2">
                  {([
                    { v: 'none',   label: '✅ None' },
                    { v: 'light',  label: '⚠️ Light' },
                    { v: 'strong', label: '🔴 Strong' },
                  ] as const).map(({ v, label }) => (
                    <button key={v} onClick={() => setPainLevel(v)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all"
                      style={{
                        background: painLevel === v ? '#163B2D' : '#F3F4F6',
                        color: painLevel === v ? '#22C55E' : '#9CA3AF',
                      }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-bold text-[#6B7280] transition-colors hover:bg-[#F3F4F6]">
                Cancel
              </button>
              <button onClick={submit}
                className="flex-1 py-3 rounded-xl text-sm font-black text-white transition-all active:scale-95"
                style={{ background: '#22C55E' }}>
                Log session ✓
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Full session detail ──────────────────────────────────────────────────────
function SessionDetail({ session, status, onComplete }: {
  session: WorkoutSession
  status: 'current' | 'done'
  onComplete: () => void
}) {
  const hero = FOCUS_HERO[session.focus] ?? FOCUS_HERO['Corps entier']
  return (
    <div className="space-y-4">
      {/* Hero banner */}
      <div className="rounded-3xl overflow-hidden relative" style={{ background: hero.gradient }}>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-10" style={{ background: 'white' }} />
        <div className="absolute right-16 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-10" style={{ background: 'white' }} />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-7xl opacity-30 select-none pointer-events-none">
          {hero.emoji}
        </div>
        <div className="relative z-10 p-7">
          <div className="flex items-center gap-2 mb-3">
            <Stars n={session.difficulty} />
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#D1D5DB' }}>
              {DIFFICULTY_LABEL[session.difficulty]}
            </span>
            {status === 'done' && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.25)', color: '#7AE582' }}>
                ✓ Complétée
              </span>
            )}
          </div>
          <h1 className="text-2xl font-black text-white mb-1 leading-tight" style={{ fontFamily: 'Manrope' }}>
            {session.missionName}
          </h1>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.65)' }}>{session.weekGoal}</p>
          <div className="flex gap-2 flex-wrap">
            {[
              { icon: '⏱', label: session.duration, sub: 'Durée' },
              { icon: '🏃', label: session.focus, sub: 'Focus principal' },
              { icon: '↔', label: `${session.exercises.length} exercices`, sub: 'Programme' },
            ].map(chip => (
              <div key={chip.sub} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.12)' }}>
                <span className="text-base">{chip.icon}</span>
                <div>
                  <p className="text-xs font-black text-white leading-none">{chip.label}</p>
                  <p className="text-[10px] leading-none mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{chip.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warmup */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1.5px solid #F3F4F6' }}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: '#F0FDF4' }}>🔥</div>
            <p className="font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>Échauffement</p>
          </div>
          <a href="https://www.youtube.com/results?search_query=echauffement+sport+maison+5+minutes"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
            style={{ color: '#22C55E' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <circle cx="12" cy="12" r="10" /><polygon fill="currentColor" points="10 8 16 12 10 16 10 8" />
            </svg>
            Voir la démo
          </a>
        </div>
        <div className="flex gap-3 px-5 pb-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {session.warmup.map((item, i) => (
            <div key={i} className="rounded-xl p-3 flex items-start gap-3 shrink-0"
              style={{ background: '#F9FAFB', border: '1.5px solid #F3F4F6', minWidth: 200, maxWidth: 240 }}>
              <div className="flex flex-col items-center gap-1 shrink-0">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full whitespace-nowrap"
                  style={{ background: '#ECFDF5', color: '#166534' }}>
                  {item.duration}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-[#111827] leading-snug" style={{ fontFamily: 'Manrope' }}>{item.name}</p>
                <p className="text-[11px] text-[#6B7280] mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#163B2D' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth={2.5}>
              <rect x="2" y="9" width="3" height="6" rx="1.5"/><rect x="19" y="9" width="3" height="6" rx="1.5"/>
              <rect x="5" y="7" width="2" height="10" rx="1"/><rect x="17" y="7" width="2" height="10" rx="1"/>
              <line x1="7" y1="12" x2="17" y2="12"/>
            </svg>
          </div>
          <p className="font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>Exercices</p>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#F3F4F6', color: '#6B7280' }}>
            {session.exercises.length}
          </span>
        </div>
        {session.exercises.map((ex, i) => <ExRow key={ex.id} num={i + 1} ex={ex} />)}
      </div>

      {/* Cooldown */}
      <div className="rounded-2xl p-5" style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: '#DBEAFE' }}>🧘</div>
          <p className="font-black text-[#1E40AF]" style={{ fontFamily: 'Manrope' }}>Retour au calme</p>
        </div>
        <ul className="space-y-2">
          {session.cooldown.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-[#3B82F6] font-black text-sm shrink-0 mt-0.5">→</span>
              <p className="text-xs text-[#1E40AF] leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Coach note */}
      <div className="rounded-2xl p-5" style={{ background: '#163B2D' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📋</span>
          <p className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Note du coach</p>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{session.coachNote}</p>
      </div>

      {/* CTA */}
      {status === 'current' ? (
        <button onClick={onComplete}
          className="w-full py-4 rounded-2xl font-black text-lg text-white transition-all active:scale-[0.98] shadow-lg hover:shadow-xl"
          style={{ background: 'linear-gradient(135deg, #22C55E, #163B2D)', fontFamily: 'Manrope' }}>
          Marquer comme terminé ✓
        </button>
      ) : (
        <div className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold"
          style={{ background: '#F0FDF4', color: '#22C55E', border: '1.5px solid #BBF7D0' }}>
          ✓ Séance complétée — tu peux la revoir librement
        </div>
      )}
    </div>
  )
}

// ─── Next session preview ─────────────────────────────────────────────────────
function NextPreview({ session, currentMission }: { session: WorkoutSession; currentMission: string }) {
  const hero = FOCUS_HERO[session.focus] ?? FOCUS_HERO['Corps entier']
  return (
    <div className="space-y-4">
      <div className="rounded-3xl overflow-hidden relative" style={{ background: hero.gradient }}>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-7xl opacity-20 select-none pointer-events-none">{hero.emoji}</div>
        <div className="relative z-10 p-7">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#D1D5DB' }}>
            Prochaine séance
          </span>
          <h1 className="text-2xl font-black text-white mb-1 leading-tight" style={{ fontFamily: 'Manrope' }}>
            {session.missionName}
          </h1>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>{session.weekGoal}</p>
          <div className="flex gap-2 flex-wrap">
            {[
              { icon: '⏱', label: session.duration, sub: 'Durée' },
              { icon: '🏃', label: session.focus, sub: 'Focus' },
              { icon: '↔', label: `${session.exercises.length} exercices`, sub: 'Programme' },
            ].map(chip => (
              <div key={chip.sub} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.10)' }}>
                <span className="text-base">{chip.icon}</span>
                <div>
                  <p className="text-xs font-black text-white leading-none">{chip.label}</p>
                  <p className="text-[10px] leading-none mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{chip.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-2xl p-5 flex items-center gap-4"
        style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: '#DCF5E3' }}>⏳</div>
        <div>
          <p className="font-black text-sm text-[#163B2D]" style={{ fontFamily: 'Manrope' }}>Termine d'abord ta séance du jour</p>
          <p className="text-xs mt-0.5" style={{ color: '#22C55E' }}>{currentMission}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Locked session ───────────────────────────────────────────────────────────
function LockedSession({ session, sessionsAway }: { session: WorkoutSession; sessionsAway: number }) {
  const hero = FOCUS_HERO[session.focus] ?? FOCUS_HERO['Corps entier']
  return (
    <div className="space-y-4">
      <div className="rounded-3xl overflow-hidden relative" style={{ background: hero.gradient }}>
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-7xl opacity-10 select-none pointer-events-none">{hero.emoji}</div>
        <div className="relative z-10 p-7">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.4)' }}>
            🔒 Verrouillé
          </span>
          <h1 className="text-2xl font-black leading-tight mb-1" style={{ fontFamily: 'Manrope', color: 'rgba(255,255,255,0.5)' }}>
            {session.missionName}
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>{session.focus} · {session.duration}</p>
        </div>
      </div>
      <div className="rounded-2xl p-5" style={{ background: 'white', border: '1.5px solid #F3F4F6' }}>
        <p className="font-black text-base text-[#111827] mb-2" style={{ fontFamily: 'Manrope' }}>
          {lockedMessage(sessionsAway)}
        </p>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          Chaque séance complétée te rapproche de cette mission. Continue sur ta lancée.
        </p>
      </div>
    </div>
  )
}

// ─── Main view ────────────────────────────────────────────────────────────────
export default function Seances() {
  const { sessions, completedCount, milestones } = useApp()

  const currentIdx = Math.min(completedCount, ALL_SESSIONS.length - 1)
  const currentSession = ALL_SESSIONS[currentIdx]
  const currentWeek = currentSession?.week ?? 1

  const [overrideId, setOverrideId] = useState<string | null>(null)
  useEffect(() => { setOverrideId(null) }, [completedCount])

  const selectedSession = (overrideId ? ALL_SESSIONS.find(s => s.id === overrideId) : null) ?? currentSession
  const selectedStatus = getStatus(selectedSession, completedCount)

  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [showPastWeeks, setShowPastWeeks] = useState(false)

  const streakDays = (() => {
    if (!sessions.length) return 0
    const sorted = [...sessions].sort((a, b) => b.date.localeCompare(a.date))
    let streak = 0
    let prev = new Date()
    for (const s of sorted) {
      const d = new Date(s.date)
      const diff = Math.round((prev.getTime() - d.getTime()) / 86400000)
      if (diff <= 1) { streak++; prev = d }
      else break
    }
    return streak
  })()

  const unlockedBadges = milestones.filter(m => m.unlocked).length
  const nextMilestone = milestones.find(m => !m.unlocked)
  const badgeProgress = nextMilestone
    ? Math.min((completedCount / nextMilestone.triggerSessions) * 100, 100)
    : 100

  const thisWeekSessions = SESSIONS_BY_WEEK[currentWeek] ?? []
  const pastWeeks = Array.from({ length: currentWeek - 1 }, (_, i) => i + 1)

  function getModuleStatus(mod: typeof MODULES[0]) {
    if (!mod.available) return 'soon'
    if (currentWeek > mod.weeksRange[1]) return 'done'
    if (currentWeek >= mod.weeksRange[0] && currentWeek <= mod.weeksRange[1]) return 'active'
    return 'locked'
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  return (
    <div className="min-h-full" style={{ background: '#F8F8F5' }}>
      <div className="max-w-[1100px] mx-auto px-6 py-6">
        <div className="flex gap-6 items-start">

          {/* ── SIDEBAR ── */}
          <aside className="w-72 shrink-0 sticky top-6 space-y-4">

            {/* Stats */}
            <div className="rounded-2xl p-4" style={{ background: '#111827' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#22C55E] mb-3">Ton avancement</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-black text-white" style={{ fontFamily: 'Manrope' }}>{completedCount}</p>
                  <p className="text-[10px] text-[#6B7280] leading-tight">séances<br/>/ {ALL_SESSIONS.length}</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#22C55E]" style={{ fontFamily: 'Manrope' }}>{streakDays}</p>
                  <p className="text-[10px] text-[#6B7280] leading-tight">jours<br/>streak</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white" style={{ fontFamily: 'Manrope' }}>{unlockedBadges}</p>
                  <p className="text-[10px] text-[#6B7280] leading-tight">badges<br/>débloqués</p>
                </div>
              </div>
            </div>

            {/* Next badge */}
            {nextMilestone && (
              <div className="rounded-2xl p-4" style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0' }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#22C55E] mb-2">Prochain badge</p>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" style={{ filter: 'grayscale(0.5)' }}>{nextMilestone.emoji}</span>
                  <div className="flex-1">
                    <p className="font-black text-sm text-[#111827]" style={{ fontFamily: 'Manrope' }}>{nextMilestone.label}</p>
                    <p className="text-xs text-[#22C55E] font-semibold">
                      {Math.max(0, nextMilestone.triggerSessions - completedCount)} séances restantes
                    </p>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: '#BBF7D0' }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${badgeProgress}%`, background: '#22C55E' }} />
                </div>
              </div>
            )}

            {/* Cette semaine */}
            <div className="rounded-2xl overflow-hidden bg-white" style={{ border: '1.5px solid #F3F4F6' }}>
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#22C55E]">
                  Cette semaine · S{currentWeek}
                </p>
                <span className="text-[10px] font-bold text-[#9CA3AF]">{WEEK_GOALS[currentWeek]?.slice(0, 22)}…</span>
              </div>
              {thisWeekSessions.map(s => {
                const st = getStatus(s, completedCount)
                const isSelected = selectedSession.id === s.id
                return (
                  <button key={s.id}
                    onClick={() => setOverrideId(s.id === currentSession.id ? null : s.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#F9FAFB]"
                    style={{ background: isSelected ? '#F0FDF4' : 'white', borderTop: '1px solid #F3F4F6' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                      style={{
                        background: st === 'done' ? '#22C55E' : st === 'current' ? '#163B2D' : '#F3F4F6',
                        color: st === 'done' ? 'white' : st === 'current' ? '#22C55E' : '#9CA3AF',
                        border: st === 'next' ? '1.5px dashed #9CA3AF' : 'none',
                      }}>
                      {st === 'done' ? '✓' : st === 'current' ? '▶' : st === 'next' ? '…' : '🔒'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-[#111827] truncate">
                        {s.missionName.replace(/^Mission \d+ — /, '')}
                      </p>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5">{s.duration} · {s.focus}</p>
                    </div>
                    {st === 'current' && <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#22C55E' }} />}
                  </button>
                )
              })}
            </div>

            {/* Past weeks toggle */}
            {currentWeek > 1 && (
              <button
                onClick={() => setShowPastWeeks(v => !v)}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-center transition-colors"
                style={{ background: '#F9FAFB', color: '#6B7280', border: '1px solid #F3F4F6' }}>
                {showPastWeeks ? '− Masquer les semaines passées' : `+ Semaines 1–${currentWeek - 1} (revoir)`}
              </button>
            )}

            {showPastWeeks && pastWeeks.length > 0 && (
              <div className="rounded-2xl overflow-hidden bg-white" style={{ border: '1.5px solid #F3F4F6' }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] px-4 pt-4 pb-2">Séances passées</p>
                {pastWeeks.map(w => (SESSIONS_BY_WEEK[w] ?? []).map(s => (
                  <button key={s.id}
                    onClick={() => setOverrideId(s.id)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-[#F9FAFB]"
                    style={{ background: selectedSession.id === s.id ? '#F0FDF4' : 'white', borderTop: '1px solid #F3F4F6' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                      style={{ background: '#22C55E', color: 'white' }}>✓</div>
                    <p className="text-[10px] font-bold text-[#6B7280] truncate flex-1">
                      S{w} · {s.missionName.replace(/^Mission \d+ — /, '')}
                    </p>
                  </button>
                )))}
              </div>
            )}

            {/* Module roadmap */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1.5px solid #F3F4F6' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#22C55E] px-4 pt-4 pb-2">Roadmap 365j</p>
              {MODULES.map(mod => {
                const ms = getModuleStatus(mod)
                const isActive = ms === 'active'
                const isDone = ms === 'done'
                return (
                  <div key={mod.id} className="px-4 py-3 flex items-center gap-3"
                    style={{ borderTop: '1px solid #F3F4F6', opacity: ms === 'soon' ? 0.45 : 1 }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                      style={{
                        background: isActive ? mod.color : isDone ? '#F0FDF4' : '#F3F4F6',
                        color: isActive ? 'white' : isDone ? '#22C55E' : '#9CA3AF',
                      }}>
                      {isDone ? '✓' : mod.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-[#111827] leading-snug">{mod.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: isActive ? mod.color : '#9CA3AF' }}>
                        {mod.milestone} · {isActive ? 'En cours' : isDone ? 'Terminé ✓' : ms === 'soon' ? 'Bientôt' : 'À venir'}
                      </p>
                    </div>
                    {!isActive && !isDone && <span className="text-[11px] text-[#D1D5DB] shrink-0">🔒</span>}
                    {isActive && <div className="w-2 h-2 rounded-full shrink-0" style={{ background: mod.color }} />}
                  </div>
                )
              })}
            </div>

          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 min-w-0">
            {(selectedStatus === 'current' || selectedStatus === 'done') && (
              <SessionDetail
                session={selectedSession}
                status={selectedStatus}
                onComplete={() => setShowForm(true)}
              />
            )}
            {selectedStatus === 'next' && (
              <NextPreview session={selectedSession} currentMission={currentSession.missionName} />
            )}
            {selectedStatus === 'locked' && (
              <LockedSession
                session={selectedSession}
                sessionsAway={ALL_SESSIONS.findIndex(s => s.id === selectedSession.id) - completedCount}
              />
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <PostSessionForm
          session={selectedSession}
          onClose={() => setShowForm(false)}
          onDone={msg => showToast(msg)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-black text-white shadow-xl"
          style={{ background: '#163B2D' }}>
          {toast}
        </div>
      )}
    </div>
  )
}
