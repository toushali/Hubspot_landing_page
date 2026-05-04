'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from 'framer-motion'
import ScrollReveal from '@/components/motion/ScrollReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* ------------------------------------------------------------------ */
/* STEP DATA                                                          */
/* ------------------------------------------------------------------ */

interface Step {
  number: string
  title: string
  description: string
  Illustration: React.FC<{ active: boolean }>
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Tell us what is broken',
    description:
      "A quick 20-minute call where you walk us through your portal and what's been built so far. As we go, we'll share anything we notice that could be improved or worth looking into.",
    Illustration: CallIllustration,
  },
  {
    number: '02',
    title: 'Meet your developer',
    description:
      "Within an hour, we'll line up a senior HubSpot developer for you. You'll get their profile upfront and a quick 30-minute intro call to see if it feels like the right fit before moving ahead.",
    Illustration: MatchIllustration,
  },
  {
    number: '03',
    title: 'Start the 7-day free trial',
    description:
      'Start with a 7-day free trial. Your developer gets started from day two, and you can see how things go in real working conditions.',
    Illustration: TrialIllustration,
  },
  {
    number: '04',
    title: 'Ship every week',
    description:
      'We stay aligned with regular weekly check-ins and clear monthly updates focused on real outcomes. As your needs change, you can scale the team up or down without any friction.',
    Illustration: ShipIllustration,
  },
]

/* ------------------------------------------------------------------ */
/* PATH GEOMETRY                                                      */
/* The path is built using percentage-based coordinates of the actual */
/* card grid container. We use a 100x100 viewBox (representing %)     */
/* so the path scales perfectly to whatever width/height the          */
/* container becomes.                                                  */
/*                                                                     */
/* Card horizontal centers (4-col grid, 25% each):                    */
/*   Card 0 → x = 12.5  (centered in first quarter)                   */
/*   Card 1 → x = 37.5                                                */
/*   Card 2 → x = 62.5                                                */
/*   Card 3 → x = 87.5                                                */
/*                                                                     */
/* Card vertical positions (% of container height ~556px):            */
/*   mt-0  = 0px    →  card center ~190/556 = 34%                     */
/*   mt-32 = 128px  →  card center ~318/556 = 57%                     */
/*   mt-12 = 48px   →  card center ~238/556 = 43%                     */
/*   mt-44 = 176px  →  card center ~366/556 = 66%                     */
/* ------------------------------------------------------------------ */

const PATH_D =
  'M 12.5,34 C 25,34 25,57 37.5,57 C 50,57 50,43 62.5,43 C 75,43 75,66 87.5,66'

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 90%', 'end 60%'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Remap so the line fully draws by the time we're 70% through the section.
  // This ensures the bright path reaches card 4 well before the user scrolls past.
  const pathLength = useTransform(smoothProgress, [0, 0.7], [0, 1])
  const dotProgress = useTransform(smoothProgress, [0, 0.7], [0, 1])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: '#FAFBFC' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(13, 207, 207, 0.05), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="container-safe relative z-10">
        <ScrollReveal variant="slideUp" className="mb-16 sm:mb-24 text-center">

          <h2
            className="text-display-h2-sm md:text-display-h2 text-text-primary tracking-tight max-w-3xl mx-auto leading-[1.1]"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            How do you get a senior HubSpot developer matched
          </h2>
          <p className="mt-5 text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From your first call to shipping production code, every step is
            deliberate. No bidding wars. No middlemen.
          </p>
        </ScrollReveal>

        {/* Cards container — SVG path is positioned absolutely over this */}
        <div className="relative">
          {/* Animated SVG connector path — desktop only */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="path-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#0DCFCF" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#0DCFCF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0DCFCF" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {/* Background dashed path (always visible, faint) */}
              <path
                d={PATH_D}
                stroke="rgba(13, 207, 207, 0.18)"
                strokeWidth="0.4"
                strokeDasharray="1.2 1.6"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />

              {/* Animated draw-on path */}
              {!prefersReducedMotion && (
                <motion.path
                  d={PATH_D}
                  stroke="url(#path-gradient)"
                  strokeWidth="0.6"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength, opacity: pathLength }}
                />
              )}

              {/* Traveling glowing dot */}
              {!prefersReducedMotion && <TravelingDot progress={dotProgress} />}
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative">
            {steps.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                totalSteps={steps.length}
                progress={smoothProgress}
                reducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* STEP CARD                                                          */
/* ------------------------------------------------------------------ */

function StepCard({
  step,
  index,
  totalSteps,
  progress,
  reducedMotion,
}: {
  step: Step
  index: number
  totalSteps: number
  progress: MotionValue<number>
  reducedMotion: boolean
}) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setIsActive(true)
      return
    }
    const threshold = (index + 0.5) / totalSteps
    const unsub = progress.on('change', (v: number) => {
      setIsActive(v >= threshold - 0.1)
    })
    return () => unsub()
  }, [progress, index, totalSteps, reducedMotion])

  const offsetClasses = ['lg:mt-0', 'lg:mt-32', 'lg:mt-12', 'lg:mt-44']

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative ${offsetClasses[index] ?? ''}`}
    >
      <div
        className="relative h-full rounded-2xl bg-white p-7 transition-all duration-500"
        style={{
          height: 440,
          border: isActive
            ? '1px solid rgba(13, 207, 207, 0.4)'
            : '1px solid rgba(226, 232, 240, 0.8)',
          boxShadow: isActive
            ? '0 20px 50px -10px rgba(13, 207, 207, 0.18), 0 0 0 1px rgba(13, 207, 207, 0.08) inset'
            : '0 4px 16px rgba(15, 23, 42, 0.04)',
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div
            className="flex items-center justify-center rounded-full font-bold text-sm transition-all duration-500"
            style={{
              width: 44,
              height: 44,
              background: isActive
                ? 'linear-gradient(135deg, #0DCFCF, #08A8A8)'
                : '#F1F5F9',
              color: isActive ? '#FFFFFF' : '#64748B',
              boxShadow: isActive
                ? '0 6px 20px rgba(13, 207, 207, 0.35)'
                : 'none',
            }}
          >
            {step.number}
          </div>

          {isActive && !reducedMotion && (
            <motion.div
              className="w-2 h-2 rounded-full bg-brand-teal"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>

        <div
          className="mb-4 flex items-center justify-center"
          style={{ height: 90 }}
        >
          <step.Illustration active={isActive} />
        </div>

        <h3
          className="text-xl font-bold text-text-primary mb-2 leading-tight tracking-tight"
          style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
        >
          {step.title}
        </h3>

        <p className="text-sm text-text-secondary leading-[1.55]">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* TRAVELING DOT                                                      */
/* ------------------------------------------------------------------ */

function TravelingDot({ progress }: { progress: MotionValue<number> }) {
  const pathRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const auraRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const path = pathRef.current
    const dot = dotRef.current
    const aura = auraRef.current
    if (!path || !dot || !aura) return

    const totalLength = path.getTotalLength()

    // Initial position
    const startPoint = path.getPointAtLength(0)
    dot.setAttribute('cx', String(startPoint.x))
    dot.setAttribute('cy', String(startPoint.y))
    aura.setAttribute('cx', String(startPoint.x))
    aura.setAttribute('cy', String(startPoint.y))

    const unsub = progress.on('change', (v: number) => {
      const clamped = Math.max(0, Math.min(1, v))
      const point = path.getPointAtLength(totalLength * clamped)
      dot.setAttribute('cx', String(point.x))
      dot.setAttribute('cy', String(point.y))
      aura.setAttribute('cx', String(point.x))
      aura.setAttribute('cy', String(point.y))
    })

    return () => unsub()
  }, [progress])

  return (
    <>
      <path ref={pathRef} d={PATH_D} fill="none" stroke="none" />
      <circle
        ref={auraRef}
        r="2.4"
        fill="rgba(13, 207, 207, 0.25)"
        cx="12.5"
        cy="34"
      >
        <animate
          attributeName="r"
          values="2.4;3.6;2.4"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;0.2;0.6"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        ref={dotRef}
        r="1.1"
        fill="#0DCFCF"
        cx="12.5"
        cy="34"
        style={{ filter: 'drop-shadow(0 0 4px rgba(13, 207, 207, 0.8))' }}
      />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* ILLUSTRATIONS                                                      */
/* ------------------------------------------------------------------ */

function CallIllustration({ active }: { active: boolean }) {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ scale: 0.9, opacity: 0.6 }}
      animate={{ scale: active ? 1 : 0.9, opacity: active ? 1 : 0.6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <circle cx="50" cy="50" r="42" fill="#E6FBFB" />
      <motion.path
        d="M 28 38 Q 28 28, 38 28 L 62 28 Q 72 28, 72 38 L 72 54 Q 72 64, 62 64 L 46 64 L 38 72 L 38 64 Q 28 64, 28 54 Z"
        fill="white"
        stroke="#0DCFCF"
        strokeWidth="2.5"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: active ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <motion.circle
        cx="40"
        cy="46"
        r="2.5"
        fill="#0DCFCF"
        animate={active ? { opacity: [0.3, 1, 0.3] } : {}}
        transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="50"
        cy="46"
        r="2.5"
        fill="#0DCFCF"
        animate={active ? { opacity: [0.3, 1, 0.3] } : {}}
        transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
      />
      <motion.circle
        cx="60"
        cy="46"
        r="2.5"
        fill="#0DCFCF"
        animate={active ? { opacity: [0.3, 1, 0.3] } : {}}
        transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
      />
    </motion.svg>
  )
}

function MatchIllustration({ active }: { active: boolean }) {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ scale: 0.9, opacity: 0.6 }}
      animate={{ scale: active ? 1 : 0.9, opacity: active ? 1 : 0.6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <circle cx="50" cy="50" r="42" fill="#E6FBFB" />
      <motion.circle
        cx="35"
        cy="50"
        r="13"
        fill="white"
        stroke="#0DCFCF"
        strokeWidth="2.5"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: active ? 0 : -10, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.circle
        cx="65"
        cy="50"
        r="13"
        fill="#0DCFCF"
        stroke="#08A8A8"
        strokeWidth="2.5"
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: active ? 0 : 10, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.path
        d="M 48 50 L 52 50"
        stroke="#FF6B35"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: active ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
      <circle cx="35" cy="46" r="3" fill="#0DCFCF" />
      <path
        d="M 28 56 Q 35 52, 42 56"
        stroke="#0DCFCF"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="65" cy="46" r="3" fill="white" />
      <path
        d="M 58 56 Q 65 52, 72 56"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <motion.path
        d="M 50 32 L 50 28 M 46 30 L 44 28 M 54 30 L 56 28"
        stroke="#FF6B35"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        style={{ transformOrigin: '50px 30px' }}
      />
    </motion.svg>
  )
}

function TrialIllustration({ active }: { active: boolean }) {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ scale: 0.9, opacity: 0.6 }}
      animate={{ scale: active ? 1 : 0.9, opacity: active ? 1 : 0.6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <circle cx="50" cy="50" r="42" fill="#E6FBFB" />
      <rect
        x="28"
        y="32"
        width="44"
        height="40"
        rx="4"
        fill="white"
        stroke="#0DCFCF"
        strokeWidth="2.5"
      />
      <rect x="28" y="32" width="44" height="10" rx="4" fill="#0DCFCF" />
      <rect x="36" y="28" width="3" height="8" rx="1.5" fill="#08A8A8" />
      <rect x="61" y="28" width="3" height="8" rx="1.5" fill="#08A8A8" />
      {[0, 1, 2, 3, 4, 5, 6].map((day) => {
        const col = day % 4
        const row = Math.floor(day / 4)
        const cx = 36 + col * 9
        const cy = 50 + row * 9
        return (
          <motion.circle
            key={day}
            cx={cx}
            cy={cy}
            r="2.5"
            fill={day < 7 ? '#0DCFCF' : '#E2E8F0'}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              active
                ? { opacity: 1, scale: 1 }
                : { opacity: 0.3, scale: 0.7 }
            }
            transition={{ duration: 0.3, delay: 0.3 + day * 0.07 }}
          />
        )
      })}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{
          duration: 0.4,
          delay: 1,
          type: 'spring',
          stiffness: 200,
        }}
        style={{ transformOrigin: '70px 70px' }}
      >
        <circle
          cx="70"
          cy="70"
          r="11"
          fill="#FF6B35"
          stroke="white"
          strokeWidth="2.5"
        />
        <text
          x="70"
          y="74"
          textAnchor="middle"
          fontSize="12"
          fontWeight="800"
          fill="white"
        >
          7
        </text>
      </motion.g>
    </motion.svg>
  )
}

function ShipIllustration({ active }: { active: boolean }) {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ scale: 0.9, opacity: 0.6 }}
      animate={{ scale: active ? 1 : 0.9, opacity: active ? 1 : 0.6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <circle cx="50" cy="50" r="42" fill="#E6FBFB" />
      <motion.g
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: active ? 0 : 8, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <path
          d="M 50 28 Q 56 28, 58 38 L 58 56 Q 58 60, 54 60 L 46 60 Q 42 60, 42 56 L 42 38 Q 44 28, 50 28 Z"
          fill="white"
          stroke="#0DCFCF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="42" r="4" fill="#0DCFCF" />
        <path d="M 42 56 L 36 64 L 42 60 Z" fill="#0DCFCF" />
        <path d="M 58 56 L 64 64 L 58 60 Z" fill="#0DCFCF" />
      </motion.g>
      <motion.path
        d="M 46 60 Q 48 68, 50 72 Q 52 68, 54 60 Z"
        fill="#FF6B35"
        initial={{ scaleY: 0 }}
        animate={
          active ? { scaleY: [0, 1.2, 0.9, 1.1, 1] } : { scaleY: 0 }
        }
        transition={{
          duration: 1,
          delay: 0.5,
          repeat: active ? Infinity : 0,
          repeatType: 'reverse',
        }}
        style={{ transformOrigin: '50px 60px' }}
      />
      <motion.circle
        cx="32"
        cy="38"
        r="1.5"
        fill="#0DCFCF"
        animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.circle
        cx="70"
        cy="44"
        r="1.5"
        fill="#0DCFCF"
        animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
      <motion.circle
        cx="28"
        cy="58"
        r="1.5"
        fill="#0DCFCF"
        animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      />
    </motion.svg>
  )
}