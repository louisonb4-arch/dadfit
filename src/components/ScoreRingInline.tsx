

interface Props {
  score: number
  delta: number
}

// Properly centered ring for dashboard card usage
export default function ScoreRingInline({ score, delta }: Props) {
  const size = 140
  const r = 56
  const circ = 2 * Math.PI * r
  const filled = (score / 100) * circ

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
        <circle cx={70} cy={70} r={r} fill="none" stroke="#DCF5E3" strokeWidth={10} />
        <circle
          cx={70} cy={70} r={r}
          fill="none"
          stroke="#22C55E"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
      </svg>
      <div className="flex flex-col items-center z-10">
        <span className="font-black text-[#111827] leading-none" style={{ fontSize: 30, fontFamily: 'Manrope' }}>
          {score}
        </span>
        <span className="text-xs font-semibold text-[#6B7280]">/ 100</span>
        {delta !== 0 && (
          <span
            className="text-[10px] font-bold mt-1 px-1.5 py-0.5 rounded-full"
            style={{
              background: delta > 0 ? '#DCF5E3' : '#FEE2E2',
              color: delta > 0 ? '#163B2D' : '#991B1B',
            }}
          >
            {delta > 0 ? '+' : ''}{delta}
          </span>
        )}
      </div>
    </div>
  )
}
