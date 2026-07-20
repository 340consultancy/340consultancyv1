import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { img, home } from '@/content'

// ── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, active: boolean, duration = 2200) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) { setVal(0); return }
    let start: number | null = null
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(target)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return val
}

function fmt(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K'
  return String(n)
}

// ── Mini phone (fan phase) ────────────────────────────────────────────────────
const pm = home.phoneMock

const MiniPhone: React.FC<{ index: number }> = ({ index }) => {
  const isMission = index === 2

  const screens: React.ReactNode[] = [
    // 0 – Brand
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '6px 5px', background: '#F6F2EC' }}>
      <p style={{ fontFamily: 'Montserrat, serif', fontWeight: 700, color: '#A22131', fontSize: '10px', lineHeight: 1.1 }}>{pm.handle}</p>
      <div style={{ marginTop: 'auto', borderTop: '0.5px solid #DDD5CC', paddingTop: '4px', textAlign: 'center' }}>
        <p style={{ color: '#999', fontSize: '5px', letterSpacing: '0.08em', lineHeight: 1.7, textTransform: 'uppercase', whiteSpace: 'pre-line' }}>{pm.brandTagline}</p>
      </div>
    </div>,
    // 1 – Founders
    <div style={{ position: 'absolute', inset: 0 }}>
      <img src={img(pm.postImage)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 52%)' }} />
      <div style={{ position: 'absolute', bottom: '22px', left: '6px' }}>
        <p style={{ fontWeight: 700, color: '#fff', fontSize: '9px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{pm.keywords}</p>
      </div>
    </div>,
    // 2 – Mission (red)
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6px', background: '#A22131' }}>
      <p style={{ fontFamily: 'Montserrat, serif', fontWeight: 700, color: '#fff', fontSize: '16px', lineHeight: 1.2, whiteSpace: 'pre-line' }}>{pm.missionTitle}</p>
      <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '6px', marginTop: '5px', lineHeight: 1.6 }}>{pm.missionText}</p>
    </div>,
    // 3 – Strategy visual
    <div style={{ position: 'absolute', inset: 0 }}>
      <img src={img(pm.strategyImage)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(162,33,49,0.70)', display: 'flex', alignItems: 'center', padding: '8px' }}>
        <p style={{ fontWeight: 800, color: '#fff', fontSize: '8px', lineHeight: 1.55, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'pre-line' }}>{pm.strategyLabel}</p>
      </div>
    </div>,
    // 4 – Metrics dashboard
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '6px 5px', background: '#F6F2EC' }}>
      <p style={{ fontWeight: 700, color: '#3D1515', fontSize: '7px', marginBottom: '5px', letterSpacing: '0.04em', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{pm.performanceTitle}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
        {pm.metrics.map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '5px', color: '#888' }}>{label}</span>
            <span style={{ fontSize: '6px', fontWeight: 700, color: '#4A9A6A' }}>{value}</span>
          </div>
        ))}
      </div>
    </div>,
  ]

  return (
    <div style={{
      width: '68px', height: '138px',
      borderRadius: '11px', border: '2.5px solid #1C1C1C',
      background: '#1C1C1C', overflow: 'hidden',
      boxShadow: '0 8px 24px rgba(0,0,0,0.38)',
      position: 'relative', flexShrink: 0,
    }}>
      <div style={{ position: 'absolute', inset: '2px', borderRadius: '9.5px', overflow: 'hidden', background: isMission ? '#A22131' : '#F6F2EC' }}>
        {/* Status bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '13px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5px', fontSize: '5px', color: isMission ? '#fff' : '#3D1515', zIndex: 15 }}>
          <span>1:01</span><span>●●</span>
        </div>
        {/* Notch */}
        <div style={{ position: 'absolute', top: '3px', left: '50%', transform: 'translateX(-50%)', width: '16px', height: '4px', background: '#1C1C1C', borderRadius: '2px', zIndex: 20 }} />
        {/* IG header */}
        <div style={{ position: 'absolute', top: '13px', left: 0, right: 0, height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5px', zIndex: 10, background: isMission ? '#A22131' : '#F6F2EC' }}>
          <span style={{ fontSize: '6px', fontWeight: 700, color: isMission ? '#fff' : '#3D1515' }}>{pm.handle}</span>
          <span style={{ fontSize: '8px', color: isMission ? 'rgba(255,255,255,0.4)' : '#888' }}>•••</span>
        </div>
        {/* Content area */}
        <div style={{ position: 'absolute', top: '28px', bottom: '18px', left: 0, right: 0, overflow: 'hidden' }}>
          {screens[index]}
        </div>
        {/* IG interaction bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 4px', background: isMission ? 'rgba(140,20,35,0.96)' : 'rgba(246,242,236,0.97)', zIndex: 10 }}>
          {['♥ 256', '◯ 12', '↗ 47'].map(ic => (
            <span key={ic} style={{ fontSize: '6px', color: isMission ? 'rgba(255,255,255,0.7)' : '#555' }}>{ic}</span>
          ))}
        </div>
      </div>
      {/* Side button */}
      <div style={{ position: 'absolute', right: '-3px', top: '38px', width: '3px', height: '22px', background: '#2A2A2A', borderRadius: '2px 0 0 2px' }} />
    </div>
  )
}

// ── Large centered phone (final phase) ────────────────────────────────────────
const LargePhone: React.FC<{ likes: number; comments: number; shares: number; saves: number }> = ({ likes, comments, shares, saves }) => (
  <div style={{
    width: '186px', height: '380px',
    borderRadius: '30px', border: '4px solid #1C1C1C',
    background: '#1C1C1C', overflow: 'hidden',
    boxShadow: '0 28px 70px rgba(0,0,0,0.38), inset 0 0 0 1px rgba(255,255,255,0.06)',
    position: 'relative',
  }}>
    <div style={{ position: 'absolute', inset: '3px', borderRadius: '27px', overflow: 'hidden', background: '#F6F2EC' }}>
      {/* Status bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', fontSize: '9px', color: '#3D1515', zIndex: 15 }}>
        <span style={{ fontWeight: 600 }}>10:01</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span style={{ fontSize: '7px' }}>▲▲▲</span>
          <span style={{ fontSize: '7px' }}>◈</span>
          <span style={{ fontSize: '8px' }}>▮▮▮</span>
        </div>
      </div>
      {/* Dynamic island */}
      <div style={{ position: 'absolute', top: '7px', left: '50%', transform: 'translateX(-50%)', width: '58px', height: '15px', background: '#1C1C1C', borderRadius: '9px', zIndex: 20 }} />
      {/* IG header */}
      <div style={{ position: 'absolute', top: '22px', left: 0, right: 0, height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 11px', zIndex: 10, background: '#F6F2EC', borderBottom: '0.5px solid #E8E2D8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#3D1515', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #A22131' }}>
            <span style={{ fontSize: '7px', fontWeight: 700, color: '#F6F2EC' }}>{pm.brandName}</span>
          </div>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#3D1515' }}>{pm.handle}</span>
        </div>
        <span style={{ fontSize: '16px', color: '#888', lineHeight: 1 }}>•••</span>
      </div>
      {/* Post image */}
      <div style={{ position: 'absolute', top: '56px', left: 0, right: 0, height: '210px', overflow: 'hidden' }}>
        <img src={img(home.phoneMock.postImage)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, transparent 52%)' }} />
        <div style={{ position: 'absolute', bottom: '14px', left: '12px', right: '12px' }}>
          <p style={{ fontFamily: 'Montserrat, serif', fontWeight: 600, color: '#fff', fontSize: '17px', lineHeight: 1.3, whiteSpace: 'pre-line' }}>
            {pm.postHeadline}<span style={{ color: '#E8504A' }}>{pm.postHeadlineAccent}</span>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '7px', marginTop: '6px', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{pm.postSubtext}</p>
        </div>
      </div>
      {/* Engagement numbers */}
      <div style={{ position: 'absolute', top: '266px', left: 0, right: 0, padding: '7px 11px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: 700, color: '#A22131' }}>♥ {fmt(likes)}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#3D1515' }}>◯ {fmt(comments)}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#3D1515' }}>↗ {fmt(shares)}</span>
          </div>
          <span style={{ fontSize: '11px', color: '#3D1515' }}>⬡ {fmt(saves)}</span>
        </div>
        <p style={{ fontSize: '8.5px', color: '#3D1515', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
          <span style={{ fontWeight: 700 }}>{pm.handle}</span> {pm.captionText}
        </p>
        <p style={{ fontSize: '8px', color: '#888', marginTop: '2px' }}>{pm.moreLabel}</p>
        <p style={{ fontSize: '8px', color: '#aaa', marginTop: '2px' }}>{pm.viewCommentsPrefix} {fmt(comments)} {pm.viewCommentsSuffix}</p>
        <p style={{ fontSize: '8px', color: '#3D1515', marginTop: '3px' }}><span style={{ fontWeight: 700 }}>{pm.commentUser}</span> {pm.commentText}</p>
      </div>
      {/* IG nav */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px', background: '#F6F2EC', borderTop: '0.5px solid #E8E2D8' }}>
        {['⌂', '◎', '⊕', '▶', '○'].map(ic => (
          <span key={ic} style={{ fontSize: '13px', color: '#3D1515', opacity: 0.65 }}>{ic}</span>
        ))}
      </div>
    </div>
    {/* Buttons */}
    <div style={{ position: 'absolute', right: '-4px', top: '90px', width: '4px', height: '38px', background: '#2A2A2A', borderRadius: '0 3px 3px 0' }} />
    <div style={{ position: 'absolute', left: '-4px', top: '78px', width: '4px', height: '24px', background: '#2A2A2A', borderRadius: '3px 0 0 3px' }} />
    <div style={{ position: 'absolute', left: '-4px', top: '110px', width: '4px', height: '24px', background: '#2A2A2A', borderRadius: '3px 0 0 3px' }} />
  </div>
)

// ── Floating metric label ──────────────────────────────────────────────────────
const MetricLabel: React.FC<{ text: string; dx: number; dy: number; delay: number }> = ({ text, dx, dy, delay }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: '50%', top: '50%', x: dx, y: dy, translateX: '-50%', translateY: '-50%' }}
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
  >
    <div style={{
      background: 'rgba(255,255,255,0.93)',
      borderRadius: '20px', padding: '4px 11px',
      fontSize: '9px', fontWeight: 700, color: '#3D1515',
      boxShadow: '0 3px 14px rgba(0,0,0,0.12)',
      whiteSpace: 'nowrap', border: '1px solid rgba(61,21,21,0.1)',
    }}>
      {text}
    </div>
  </motion.div>
)

// ── Floating heart ────────────────────────────────────────────────────────────
const hearts = [
  { dx: -60, delay: 0.2 },
  { dx: 80,  delay: 0.7 },
  { dx: -30, delay: 1.3 },
  { dx: 55,  delay: 1.8 },
]

// ── Main component ────────────────────────────────────────────────────────────
type Phase = 'fan' | 'merging' | 'final'

const fanPositions = [
  { x: -168, rotate: -14, scale: 0.62, z: 1 },
  { x: -90,  rotate: -7,  scale: 0.76, z: 2 },
  { x: 0,    rotate: 0,   scale: 0.88, z: 5 },
  { x: 90,   rotate: 7,   scale: 0.76, z: 2 },
  { x: 168,  rotate: 14,  scale: 0.62, z: 1 },
]

const PhoneCinematicAnimation: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('fan')
  const [cycleKey, setCycleKey] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  // Trigger when scrolled into view
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true) },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Timeline
  useEffect(() => {
    if (!started) return
    setPhase('fan')
    const t1 = setTimeout(() => setPhase('merging'), 2800)
    const t2 = setTimeout(() => setPhase('final'), 4400)
    // Loop
    const tLoop = setTimeout(() => {
      setPhase('fan')
      setCycleKey(k => k + 1)
    }, 13000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(tLoop) }
  }, [started, cycleKey])

  const engaged = phase === 'final'
  const likes    = useCountUp(pm.likes,    engaged, 2600)
  const comments = useCountUp(pm.comments, engaged, 2200)
  const shares   = useCountUp(pm.shares,   engaged, 1900)
  const saves    = useCountUp(pm.saves,    engaged, 2400)

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: '500px' }}
    >
      {/* ── Fan / Merging phase ── */}
      <AnimatePresence>
        {phase !== 'final' && fanPositions.map((pos, i) => (
          <motion.div
            key={`phone-${i}`}
            className="absolute"
            initial={{ x: pos.x, rotate: pos.rotate, scale: pos.scale, opacity: 1 }}
            animate={
              phase === 'merging'
                ? { x: 0, rotate: 0, scale: i === 2 ? 0.92 : 0.15, opacity: i === 2 ? 1 : 0 }
                : { x: pos.x, rotate: pos.rotate, scale: pos.scale, opacity: 1 }
            }
            exit={{ opacity: 0, scale: 0.3, transition: { duration: 0.4 } }}
            transition={{ duration: 1.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ zIndex: pos.z }}
          >
            <MiniPhone index={i} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Final large phone ── */}
      <AnimatePresence>
        {phase === 'final' && (
          <motion.div
            key="final"
            className="relative"
            initial={{ scale: 0.65, opacity: 0, y: 20 }}
            animate={{ scale: 1,    opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-[30px]"
              style={{ boxShadow: '0 0 60px 10px rgba(162,33,49,0.12)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Floating animation */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <LargePhone likes={likes} comments={comments} shares={shares} saves={saves} />
            </motion.div>

            {/* Metric labels */}
            {(() => { const pos = [{ dx: -130, dy: -155 }, { dx: 130, dy: -110 }, { dx: 140, dy: 50 }, { dx: -145, dy: 80 }]; return pm.floatingLabels.map((text, i) => (
              <MetricLabel key={i} text={text} dx={pos[i]?.dx ?? 0} dy={pos[i]?.dy ?? 0} delay={0.6 + i * 0.3} />
            )); })()}

            {/* Floating hearts */}
            {hearts.map((h, j) => (
              <motion.div
                key={j}
                className="absolute pointer-events-none select-none"
                style={{ left: `calc(50% + ${h.dx}px)`, bottom: '70px', fontSize: '14px', color: '#A22131' }}
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], y: -70, scale: [0, 1.3, 0.8] }}
                transition={{ delay: h.delay, duration: 1.6, ease: 'easeOut', repeat: Infinity, repeatDelay: 3.5 }}
              >
                ♥
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PhoneCinematicAnimation
