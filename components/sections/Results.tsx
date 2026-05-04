'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollReveal from '@/components/motion/ScrollReveal'

/* ------------------------------------------------------------------ */
/* RESULTS DATA — exact source-doc copy                                */
/* ------------------------------------------------------------------ */

interface Result {
  id: string
  /** The big number value (numeric only — formatting done separately) */
  value: number
  /** Prefix shown before number (e.g. nothing, or empty for percent) */
  prefix?: string
  /** Suffix after number (e.g. '%', 'x', ' days') */
  suffix: string
  /** What the metric means (short label — 2-3 words) */
  label: string
  /** Context — explains how this is achieved */
  context: string
  /** Decimal precision for the counter */
  decimals?: number
}

const results: Result[] = [
  {
    id: 'cac',
    value: 40,
    suffix: '%',
    label: 'Lower CAC',
    context:
      'Less spent acquiring each customer through better lead scoring and lifecycle automation',
  },
  {
    id: 'pipeline',
    value: 3,
    suffix: 'x',
    label: 'Pipeline growth',
    context:
      'Through better lifecycle automation, lead scoring, and attribution dashboards',
  },
  {
    id: 'meetings',
    value: 2.5,
    suffix: 'x',
    decimals: 1,
    label: 'More meetings',
    context:
      'Booked through automated outbound sequences and dedicated signal-led GTM workflows',
  },
  {
    id: 'days',
    value: 90,
    suffix: '',
    label: 'Days to results',
    context:
      'Most clients see measurable revenue impact within their first quarter of engagement',
  },
]

/* ------------------------------------------------------------------ */
/* ANIMATED COUNTER                                                    */
/* Counts from 0 to target value when in view                          */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  target,
  decimals = 0,
  duration = 1800,
  inView,
}: {
  target: number
  decimals?: number
  duration?: number
  inView: boolean
}) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    let rafId: number
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic for a satisfying landing
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setValue(target)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, target, duration])

  return <>{value.toFixed(decimals)}</>
}

/* ------------------------------------------------------------------ */
/* RESULT CARD                                                         */
/* ------------------------------------------------------------------ */

function ResultCard({ result, index }: { result: Result; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative h-full"
    >
      {/* Glow layer — appears on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(13, 207, 207, 0.18), transparent 70%)',
          filter: 'blur(8px)',
        }}
        aria-hidden
      />

      <div
        className="relative h-full rounded-2xl p-7 sm:p-8 transition-all duration-500 group-hover:-translate-y-1"
        style={{
          background:
            'linear-gradient(160deg, rgba(20, 38, 63, 0.7) 0%, rgba(14, 29, 51, 0.9) 100%)',
          border: '1px solid rgba(13, 207, 207, 0.15)',
          boxShadow:
            '0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(13, 207, 207, 0.05) inset',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Top accent line that lights up on hover */}
        <div
          className="absolute top-0 left-7 right-7 h-px transition-all duration-500"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(13, 207, 207, 0.4), transparent)',
            opacity: 0.5,
          }}
          aria-hidden
        />

        {/* Pulsing dot top-right */}
        <div
          className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-brand-teal"
          style={{ boxShadow: '0 0 8px rgba(13, 207, 207, 0.8)' }}
          aria-hidden
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-brand-teal"
            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Big number */}
        <div className="flex items-baseline mb-4">
          <span
            className="text-5xl sm:text-6xl font-black tracking-tight"
            style={{
              fontFamily: 'var(--font-display, Inter), sans-serif',
              background:
                'linear-gradient(135deg, #FFFFFF 0%, #5EEDED 60%, #0DCFCF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <AnimatedCounter
              target={result.value}
              decimals={result.decimals ?? 0}
              inView={inView}
            />
          </span>
          <span
            className="text-3xl sm:text-4xl font-black ml-1"
            style={{
              fontFamily: 'var(--font-display, Inter), sans-serif',
              background:
                'linear-gradient(135deg, #FFFFFF 0%, #5EEDED 60%, #0DCFCF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {result.suffix}
          </span>
        </div>

        {/* Label */}
        <div className="text-text-on-dark text-lg font-semibold mb-3 tracking-tight">
          {result.label}
        </div>

        {/* Context */}
        <p className="text-text-on-dark-mut text-sm leading-relaxed">
          {result.context}
        </p>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* ATMOSPHERIC BACKGROUND — mission-control feel                       */
/* Different from Hero (world-map) and ToolOrbit (constellation)       */
/* ------------------------------------------------------------------ */

function MissionControlBackground() {
  // Pre-computed positions for vertical data streams (deterministic for SSR)
  const streams = [
    { x: 12, delay: 0, duration: 14 },
    { x: 28, delay: 3, duration: 11 },
    { x: 47, delay: 1.5, duration: 16 },
    { x: 68, delay: 5, duration: 12 },
    { x: 86, delay: 2, duration: 13 },
  ]

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <style>{`
        @keyframes data-stream {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        @keyframes node-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .data-stream { animation: none !important; opacity: 0 !important; }
          .node-pulse { animation: none !important; }
        }
      `}</style>

      {/* Layer 1: Tech grid (lines) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(13, 207, 207, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(13, 207, 207, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 50%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 50%, transparent 100%)',
        }}
      />

      {/* Layer 2: Vertical data streams (Matrix-style, very subtle) */}
      {streams.map((s, i) => (
        <div
          key={i}
          className="data-stream absolute"
          style={{
            left: `${s.x}%`,
            top: 0,
            width: 1,
            height: '100%',
            background:
              'linear-gradient(180deg, transparent 0%, rgba(13, 207, 207, 0.5) 30%, rgba(13, 207, 207, 0.7) 50%, rgba(13, 207, 207, 0.5) 70%, transparent 100%)',
            animation: `data-stream ${s.duration}s linear ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Layer 3: Pulsing connection nodes at grid intersections */}
      {[
        { x: 18, y: 25 },
        { x: 55, y: 18 },
        { x: 82, y: 35 },
        { x: 35, y: 70 },
        { x: 70, y: 65 },
      ].map((n, i) => (
        <div
          key={i}
          className="node-pulse absolute rounded-full"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: 6,
            height: 6,
            background: 'rgba(13, 207, 207, 0.8)',
            boxShadow: '0 0 12px rgba(13, 207, 207, 0.6)',
            animation: `node-pulse ${3 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}

      {/* Layer 4: Top ambient teal glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(13, 207, 207, 0.15), transparent 70%)',
        }}
      />

      {/* Layer 4: Bottom-right warm accent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 90% 100%, rgba(255, 107, 53, 0.06), transparent 70%)',
        }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function Results() {
  return (
    <section
      id="results"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0A1628 0%, #0E1D33 50%, #0A1628 100%)',
      }}
    >
      <MissionControlBackground />

      <div className="container-safe relative z-10">
        {/* Header */}
        <ScrollReveal variant="slideUp" className="mb-14 sm:mb-16 text-center">
          <h2
            className="text-display-h2-sm md:text-display-h2 text-text-on-dark tracking-tight max-w-3xl mx-auto leading-[1.1]"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            Results that show up in the dashboard
          </h2>
          <p className="mt-5 text-text-on-dark-mut text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every engagement is tied to a measurable outcome. Here's what teams
            see in their first 90 days.
          </p>
        </ScrollReveal>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {results.map((result, i) => (
            <ResultCard key={result.id} result={result} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}