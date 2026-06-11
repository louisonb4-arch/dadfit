

interface Props {
  score: number
  delta: number
  size?: number
}

export default function ScoreRing({ score, delta, size = 140 }: Props) {
  const r = (size / 2) - 14
  const circ = 2 * Math.PI * r
  const filled = (score / 100) * circ
  const cx = size / 2

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="#DCF5E3" strokeWidth={10} />
        {/* Progress */}
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="#22C55E"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
      </svg>
      {/* Center label */}
      <div className="absolute flex flex-col items-center" style={{ marginTop: -(size / 2 + 20) }}>
        <span className="text-3xl font-black text-[#111827]" style={{ fontFamily: 'Manrope' }}>
          {score}
        </span>
        <span className="text-xs font-semibold text-[#6B7280]">/ 100</span>
      </div>
      {/* Delta */}
      {delta !== 0 && (
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            background: delta > 0 ? '#DCF5E3' : '#FEE2E2',
            color: delta > 0 ? '#163B2D' : '#991B1B',
          }}
        >
          {delta > 0 ? '+' : ''}{delta} vs sem. préc.
        </span>
      )}
    </div>
  )
}
