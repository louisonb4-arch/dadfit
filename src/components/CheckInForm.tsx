import { useState } from 'react'
import type { CheckIn } from '../types'

interface Props {
  onSubmit: (ci: Omit<CheckIn, 'id' | 'userId' | 'date'>) => void
}

const energyLabels: Record<number, string> = {
  1: 'Épuisé', 2: 'Très faible', 3: 'Faible', 4: 'Moyen-bas',
  5: 'Moyen', 6: 'Correct', 7: 'Bien', 8: 'Très bien', 9: 'Excellent', 10: 'Au max'
}

export default function CheckInForm({ onSubmit }: Props) {
  const [energy, setEnergy] = useState(6)
  const [sleptWell, setSleptWell] = useState(true)
  const [joints, setJoints] = useState<'good' | 'stiff' | 'pain'>('good')
  const [steps, setSteps] = useState(7000)
  const [waterL, setWaterL] = useState(2)
  const [bedtimeOK, setBedtimeOK] = useState(true)

  const submit = () => {
    onSubmit({ energy, sleptWell, joints, steps, waterL, bedtimeOK })
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#22C55E] mb-3">Check-in du jour</p>
      </div>

      {/* Energy */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-bold text-[#111827]">Énergie</label>
          <span className="text-sm font-semibold text-[#22C55E]">{energy} — {energyLabels[energy]}</span>
        </div>
        <input
          type="range" min={1} max={10} value={energy}
          onChange={e => setEnergy(Number(e.target.value))}
          className="w-full accent-[#22C55E] h-2"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[#9CA3AF]">Épuisé</span>
          <span className="text-[10px] text-[#9CA3AF]">Au max</span>
        </div>
      </div>

      {/* Sleep */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#111827]">Sommeil</p>
          <p className="text-xs text-[#6B7280]">Tu t'es bien reposé ?</p>
        </div>
        <div className="flex gap-2">
          {[true, false].map(v => (
            <button
              key={String(v)}
              onClick={() => setSleptWell(v)}
              className="px-4 py-1.5 rounded-full text-sm font-bold transition-all"
              style={{
                background: sleptWell === v ? (v ? '#22C55E' : '#111827') : '#F3F4F6',
                color: sleptWell === v ? 'white' : '#6B7280',
              }}
            >
              {v ? 'Oui' : 'Non'}
            </button>
          ))}
        </div>
      </div>

      {/* Joints */}
      <div>
        <p className="text-sm font-bold text-[#111827] mb-2">Articulations</p>
        <div className="flex gap-2">
          {(['good', 'stiff', 'pain'] as const).map(j => (
            <button
              key={j}
              onClick={() => setJoints(j)}
              className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                background: joints === j
                  ? (j === 'pain' ? '#FEE2E2' : j === 'stiff' ? '#FEF3C7' : '#DCF5E3')
                  : '#F3F4F6',
                color: joints === j
                  ? (j === 'pain' ? '#991B1B' : j === 'stiff' ? '#92400E' : '#163B2D')
                  : '#9CA3AF',
                border: joints === j ? '1.5px solid currentColor' : '1.5px solid transparent',
              }}
            >
              {j === 'good' ? '✓ Top' : j === 'stiff' ? '~ Raide' : '✕ Douleur'}
            </button>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-bold text-[#111827]">Pas aujourd'hui</label>
          <span className="text-sm font-semibold text-[#111827]">{steps.toLocaleString('fr-FR')}</span>
        </div>
        <input
          type="range" min={0} max={15000} step={500} value={steps}
          onChange={e => setSteps(Number(e.target.value))}
          className="w-full accent-[#22C55E] h-2"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[#9CA3AF]">0</span>
          <span className="text-[10px] text-[#22C55E] font-bold">Objectif: 7 000</span>
          <span className="text-[10px] text-[#9CA3AF]">15 000</span>
        </div>
      </div>

      {/* Water */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-bold text-[#111827]">Hydratation</label>
          <span className="text-sm font-semibold text-[#111827]">{waterL.toFixed(1)} L</span>
        </div>
        <input
          type="range" min={0} max={4} step={0.1} value={waterL}
          onChange={e => setWaterL(parseFloat(e.target.value))}
          className="w-full accent-[#22C55E] h-2"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[#9CA3AF]">0 L</span>
          <span className="text-[10px] text-[#22C55E] font-bold">Objectif: 2 L</span>
          <span className="text-[10px] text-[#9CA3AF]">4 L</span>
        </div>
      </div>

      {/* Bedtime */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#111827]">Couché avant 23h</p>
          <p className="text-xs text-[#6B7280]">+5 pts sur le score</p>
        </div>
        <div className="flex gap-2">
          {[true, false].map(v => (
            <button
              key={String(v)}
              onClick={() => setBedtimeOK(v)}
              className="px-4 py-1.5 rounded-full text-sm font-bold transition-all"
              style={{
                background: bedtimeOK === v ? (v ? '#22C55E' : '#111827') : '#F3F4F6',
                color: bedtimeOK === v ? 'white' : '#6B7280',
              }}
            >
              {v ? 'Oui' : 'Non'}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={submit}
        className="w-full py-3.5 rounded-2xl text-sm font-black text-white transition-all active:scale-95"
        style={{ background: '#22C55E', fontFamily: 'Manrope' }}
      >
        Valider mon check-in
      </button>
    </div>
  )
}
