

interface Props {
  daysSince: number
}

export default function ResumeBanner({ daysSince }: Props) {
  if (daysSince < 5) return null

  return (
    <div
      className="rounded-2xl px-5 py-4 flex items-start gap-3"
      style={{ background: '#111827', color: 'white' }}
    >
      <span className="text-2xl">🔄</span>
      <div>
        <p className="font-black text-sm leading-snug" style={{ fontFamily: 'Manrope' }}>
          Tu n'as pas échoué. Tu reprends ici.
        </p>
        <p className="text-xs text-[#9CA3AF] mt-0.5">
          {daysSince} jours depuis ta dernière séance — la séquence repart maintenant.
        </p>
      </div>
    </div>
  )
}
