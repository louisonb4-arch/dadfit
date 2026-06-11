import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { track } from '../lib/posthog'

const TOTAL_STEPS = 6

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="flex justify-center gap-2 mb-8">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <div key={i} className="h-2 rounded-full transition-all duration-300"
          style={{
            width: i === step ? 20 : 8,
            background: i < step ? '#22C55E' : i === step ? '#163B2D' : '#E5E7EB',
          }} />
      ))}
    </div>
  )
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
      style={{
        background: selected ? '#163B2D' : '#F3F4F6',
        color: selected ? '#22C55E' : '#6B7280',
        border: selected ? '1.5px solid #22C55E' : '1.5px solid transparent',
      }}>
      {label}
    </button>
  )
}

function GoalCard({ emoji, title, sub, selected, onClick }: {
  emoji: string; title: string; sub: string; selected: boolean; onClick: () => void
}) {
  return (
    <button onClick={onClick}
      className="w-full text-left p-4 rounded-2xl transition-all"
      style={{
        background: selected ? '#F0FDF4' : '#F9FAFB',
        border: selected ? '2px solid #22C55E' : '2px solid transparent',
      }}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <div>
          <p className="font-black text-sm text-[#111827]" style={{ fontFamily: 'Manrope' }}>{title}</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">{sub}</p>
        </div>
        {selected && (
          <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
            style={{ background: '#22C55E' }}>✓</div>
        )}
      </div>
    </button>
  )
}

export default function Onboarding() {
  const { completeOnboarding } = useApp()
  const [step, setStep] = useState(0)
  useEffect(() => { track.startedOnboarding() }, [])

  // Step 0 — Name
  const [name, setName] = useState('')
  // Step 1 — About (age + kids)
  const [age, setAge] = useState('')
  const [kids, setKids] = useState<number | null>(null)
  // Step 2 — Fitness level
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'some_experience' | 'regular' | ''>('')
  // Step 3 — Main goal
  const [mainGoal, setMainGoal] = useState('')
  // Step 4 — Pain check
  const [painAreas, setPainAreas] = useState<string[]>([])
  // Consent (collected on final step)
  const [consentDataHealth, setConsentDataHealth] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  function togglePain(area: string) {
    if (area === 'none') {
      setPainAreas(['none'])
      return
    }
    setPainAreas(prev => {
      const without = prev.filter(p => p !== 'none')
      return without.includes(area) ? without.filter(p => p !== area) : [...without, area]
    })
  }

  async function handleFinish() {
    setSaving(true)
    setSaveError(null)
    const { error } = await completeOnboarding({
      name: name.trim(),
      age: age || undefined,
      numberOfKids: kids ?? undefined,
      fitnessLevel: (fitnessLevel as 'beginner' | 'some_experience' | 'regular') || undefined,
      mainGoal: mainGoal || undefined,
      painAreas: painAreas.length ? painAreas : undefined,
      consentDataHealth,
    })
    if (error) {
      setSaveError('Failed to save. Check your connection and try again.')
      setSaving(false)
      return
    }
    track.completedOnboarding({ fitness_level: fitnessLevel || undefined, main_goal: mainGoal || undefined, age: age || undefined })
  }

  const canContinue = [
    name.trim().length > 0,
    true,
    fitnessLevel !== '',
    mainGoal !== '',
    true,
    consentDataHealth, // must consent to finish
  ][step]

  const isLast = step === TOTAL_STEPS - 1

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#F8F8F5' }}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.png" alt="DadFit" style={{ height: 52, width: 'auto', objectFit: 'contain' }} />
        </div>

        <ProgressDots step={step} />

        {/* Step 0 — Name */}
        {step === 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">Step 1 of {TOTAL_STEPS}</p>
            <h2 className="text-2xl font-black text-[#111827] mb-2 leading-tight" style={{ fontFamily: 'Manrope' }}>
              What's your name?
            </h2>
            <p className="text-sm text-[#9CA3AF] mb-6">We'll use it to personalize your program.</p>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Marc, Thomas, James…"
              className="w-full px-5 py-4 rounded-2xl text-xl font-bold text-[#111827] bg-[#F9FAFB] border-2 border-[#F3F4F6] focus:outline-none focus:border-[#22C55E] placeholder-[#D1D5DB]"
              onKeyDown={e => e.key === 'Enter' && name.trim() && setStep(1)}
              autoFocus
            />
          </div>
        )}

        {/* Step 1 — About */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">Step 2 of {TOTAL_STEPS}</p>
            <h2 className="text-2xl font-black text-[#111827] mb-2 leading-tight" style={{ fontFamily: 'Manrope' }}>
              Quick profile.
            </h2>
            <p className="text-sm text-[#9CA3AF] mb-6">Both optional. Helps us calibrate the program.</p>

            <div className="mb-5">
              <p className="text-xs font-black uppercase tracking-widest text-[#6B7280] mb-3">Age group</p>
              <div className="flex flex-wrap gap-2">
                {['Under 35', '35–39', '40–44', '45–49', '50–55', '55+'].map(a => (
                  <Chip key={a} label={a} selected={age === a} onClick={() => setAge(age === a ? '' : a)} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#6B7280] mb-3">Number of kids</p>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, '4+'].map(n => {
                  const val = typeof n === 'number' ? n : 4
                  const label = typeof n === 'number' ? String(n) : '4+'
                  return (
                    <Chip key={label} label={label} selected={kids === val}
                      onClick={() => setKids(kids === val ? null : val)} />
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Fitness level */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">Step 3 of {TOTAL_STEPS}</p>
            <h2 className="text-2xl font-black text-[#111827] mb-2 leading-tight" style={{ fontFamily: 'Manrope' }}>
              Your current fitness level?
            </h2>
            <p className="text-sm text-[#9CA3AF] mb-6">Be honest. DadFit adapts around where you are, not where you wish you were.</p>
            <div className="space-y-3">
              <GoalCard emoji="🛋️" title="Getting back to it"
                sub="Haven't trained regularly in a while"
                selected={fitnessLevel === 'beginner'}
                onClick={() => setFitnessLevel('beginner')} />
              <GoalCard emoji="🚶" title="Some movement"
                sub="Train occasionally, not consistently"
                selected={fitnessLevel === 'some_experience'}
                onClick={() => setFitnessLevel('some_experience')} />
              <GoalCard emoji="🏃" title="Already active"
                sub="Train 2–3x per week, want to be more consistent"
                selected={fitnessLevel === 'regular'}
                onClick={() => setFitnessLevel('regular')} />
            </div>
          </div>
        )}

        {/* Step 3 — Main goal */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">Step 4 of {TOTAL_STEPS}</p>
            <h2 className="text-2xl font-black text-[#111827] mb-2 leading-tight" style={{ fontFamily: 'Manrope' }}>
              What's your main goal?
            </h2>
            <p className="text-sm text-[#9CA3AF] mb-6">Pick the one that matters most right now.</p>
            <div className="space-y-3">
              <GoalCard emoji="⚡" title="More energy"
                sub="Stop feeling exhausted by 2pm"
                selected={mainGoal === 'energy'}
                onClick={() => setMainGoal('energy')} />
              <GoalCard emoji="💪" title="Build strength"
                sub="Feel physically capable and solid"
                selected={mainGoal === 'strength'}
                onClick={() => setMainGoal('strength')} />
              <GoalCard emoji="👨‍👧" title="Move with my kids"
                sub="Keep up, play, be the active dad"
                selected={mainGoal === 'family'}
                onClick={() => setMainGoal('family')} />
              <GoalCard emoji="🔄" title="Just restart"
                sub="Build the habit first, goals come later"
                selected={mainGoal === 'restart'}
                onClick={() => setMainGoal('restart')} />
            </div>
          </div>
        )}

        {/* Step 4 — Pain check */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">Step 5 of {TOTAL_STEPS}</p>
            <h2 className="text-2xl font-black text-[#111827] mb-2 leading-tight" style={{ fontFamily: 'Manrope' }}>
              Any recurring pain or discomfort?
            </h2>
            <p className="text-sm text-[#9CA3AF] mb-6">Select all that apply. We'll show exercise alternatives when relevant.</p>
            <div className="space-y-2">
              {[
                { key: 'none',      emoji: '✅', label: 'None — feeling good' },
                { key: 'back',      emoji: '🦴', label: 'Lower back' },
                { key: 'knees',     emoji: '🦵', label: 'Knees' },
                { key: 'shoulders', emoji: '💆', label: 'Shoulders' },
              ].map(({ key, emoji, label }) => (
                <button key={key}
                  onClick={() => togglePain(key)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all"
                  style={{
                    background: painAreas.includes(key) ? '#F0FDF4' : '#F9FAFB',
                    border: painAreas.includes(key) ? '1.5px solid #22C55E' : '1.5px solid transparent',
                  }}>
                  <span className="text-xl">{emoji}</span>
                  <span className="font-bold text-sm text-[#111827]">{label}</span>
                  {painAreas.includes(key) && (
                    <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white"
                      style={{ background: '#22C55E' }}>✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5 — Summary */}
        {step === 5 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl"
              style={{ background: '#DCF5E3' }}>
              💪
            </div>
            <h2 className="text-2xl font-black text-[#111827] mb-3 leading-tight" style={{ fontFamily: 'Manrope' }}>
              You're all set, {name || 'Dad'}.
            </h2>
            <p className="text-[#6B7280] leading-relaxed mb-6">
              Perfect. We'll start simple:<br />
              <strong className="text-[#111827]">3 workouts of around 20 minutes this week.</strong>
            </p>

            <div className="rounded-2xl p-4 mb-6 text-left" style={{ background: '#F8F8F5', border: '1.5px solid #F3F4F6' }}>
              <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">Your first week</p>
              <div className="space-y-2">
                {[
                  '3 beginner-friendly workouts',
                  '20 minutes per session',
                  'No gym — just a chair and a backpack',
                  'A clear next mission after each workout',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-[#22C55E] font-black text-sm">✓</span>
                    <span className="text-sm text-[#374151]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#9CA3AF] mb-1">
              Your kids don't need a perfect dad —
            </p>
            <p className="text-xs text-[#9CA3AF] mb-6">
              they need a dad who shows up.
            </p>

            {/* Consent */}
            <label className="flex items-start gap-3 cursor-pointer text-left p-4 rounded-2xl transition-all"
              style={{ background: consentDataHealth ? '#F0FDF4' : '#F9FAFB', border: `1.5px solid ${consentDataHealth ? '#22C55E' : 'transparent'}` }}>
              <input
                type="checkbox"
                checked={consentDataHealth}
                onChange={e => setConsentDataHealth(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#22C55E] shrink-0"
              />
              <span className="text-xs text-[#374151] leading-relaxed">
                I agree that DadFit stores my fitness data (workouts, check-ins, steps) to power my program.
                <strong className="text-[#111827]"> Data is never sold or shared.</strong> I can delete it anytime.
              </span>
            </label>
          </div>
        )}

        {/* Save error */}
        {saveError && (
          <p className="mt-3 text-sm text-red-500 rounded-xl px-4 py-3 bg-red-50 text-center">{saveError}</p>
        )}

        {/* CTA */}
        <button
          onClick={isLast ? handleFinish : () => setStep(s => s + 1)}
          disabled={!canContinue || saving}
          className="w-full mt-4 py-4 rounded-2xl text-base font-black text-white transition-all active:scale-95"
          style={{
            background: canContinue && !saving ? '#22C55E' : '#E5E7EB',
            color: canContinue && !saving ? 'white' : '#9CA3AF',
            fontFamily: 'Manrope',
            cursor: canContinue && !saving ? 'pointer' : 'not-allowed',
            boxShadow: canContinue && !saving ? '0 8px 24px rgba(34,197,94,0.3)' : 'none',
          }}
        >
          {saving ? 'Saving…' : isLast ? 'Start DadFit →' : 'Continue →'}
        </button>

        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="w-full mt-2 py-2 text-sm text-[#9CA3AF] hover:text-[#6B7280]">
            ← Back
          </button>
        )}

        {(step === 1 || step === 4) && (
          <p className="text-center text-xs text-[#D1D5DB] mt-2">Optional — you can skip this step</p>
        )}

        <p className="text-center text-xs text-[#9CA3AF] mt-6">
          Your data is encrypted and stored securely.
        </p>
      </div>
    </div>
  )
}
