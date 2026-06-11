import { useEffect, useState } from 'react'
import type { Milestone } from '../types'

interface Props {
  milestone: Milestone | null
  onDismiss: () => void
}

export default function MilestoneToast({ milestone, onDismiss }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (milestone) {
      setVisible(true)
      const t = setTimeout(() => { setVisible(false); setTimeout(onDismiss, 300) }, 4000)
      return () => clearTimeout(t)
    }
  }, [milestone])

  if (!milestone) return null

  return (
    <div
      className="fixed top-4 inset-x-4 z-50 rounded-2xl px-5 py-4 shadow-xl flex items-center gap-4 transition-all duration-300"
      style={{
        background: '#163B2D',
        color: 'white',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-16px)',
      }}
    >
      <span className="text-3xl">{milestone.emoji}</span>
      <div className="flex-1">
        <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-0.5">
          Milestone débloqué
        </p>
        <p className="font-black text-white text-sm" style={{ fontFamily: 'Manrope' }}>
          {milestone.label}
        </p>
        <p className="text-xs text-[#7AE582] mt-0.5">
          {milestone.triggerSessions} séances complétées
        </p>
      </div>
      <button onClick={() => { setVisible(false); setTimeout(onDismiss, 300) }} className="text-[#7AE582] text-lg">
        ✕
      </button>
    </div>
  )
}
