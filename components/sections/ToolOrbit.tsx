'use client'

import React, { useState } from 'react'
import { motion, type MotionProps } from 'framer-motion'
import ScrollReveal from '@/components/motion/ScrollReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* ------------------------------------------------------------------ */
/* GEOMETRY — verified collision-free                                  */
/* ------------------------------------------------------------------ */

const ORBIT_DIAMETER = 800
const CENTER = ORBIT_DIAMETER / 2
const HUBSPOT_SIZE = 120
const CHIP_SIZE = 80

const RING_1_RADIUS = 140
const RING_2_RADIUS = 240
const RING_3_RADIUS = 340

/* ------------------------------------------------------------------ */
/* TOOLS                                                               */
/* ------------------------------------------------------------------ */

interface Tool {
  name: string
  logo?: string
  logoHeight?: number
  text?: () => React.ReactNode
}

const ring1Tools: Tool[] = [
  {
    name: 'Salesforce',
    logo: 'https://cdn.simpleicons.org/salesforce/00A1E0',
    logoHeight: 36,
  },
  {
    name: 'Stripe',
    logo: 'https://cdn.simpleicons.org/stripe/635BFF',
    logoHeight: 32,
  },
  {
    name: 'Shopify',
    logo: 'https://cdn.simpleicons.org/shopify/7AB55C',
    logoHeight: 36,
  },
]

const ring2Tools: Tool[] = [
  {
    name: 'HubL',
    text: () => (
      <span className="text-text-primary font-bold text-sm tracking-tight">
        Hub<span className="text-brand-teal">L</span>
      </span>
    ),
  },
  {
    name: 'HubDB',
    text: () => (
      <span className="text-text-primary font-bold text-sm tracking-tight">
        Hub<span className="text-brand-teal">DB</span>
      </span>
    ),
  },
  {
    name: 'Apollo',
    text: () => (
      <span
        className="font-bold text-sm tracking-tight"
        style={{ color: '#3B33B7' }}
      >
        Apollo<span className="text-brand-teal">.io</span>
      </span>
    ),
  },
]

const ring3Tools: Tool[] = [
  {
    name: 'Zapier',
    logo: 'https://cdn.simpleicons.org/zapier/FF4F00',
    logoHeight: 32,
  },
  {
    name: 'Make',
    logo: 'https://cdn.simpleicons.org/make/6D00CC',
    logoHeight: 32,
  },
  {
    name: 'Clay',
    text: () => (
      <span className="text-text-primary font-bold text-sm tracking-tight">
        Clay
      </span>
    ),
  },
  {
    name: 'API',
    text: () => (
      <span className="font-mono font-bold text-xs tracking-wider text-brand-teal">
        {'<API/>'}
      </span>
    ),
  },
]

/* ------------------------------------------------------------------ */
/* CHIP                                                                */
/* ------------------------------------------------------------------ */

function ToolChip({ tool, size = CHIP_SIZE }: { tool: Tool; size?: number }) {
  const [logoErrored, setLogoErrored] = useState(false)
  const showLogo = tool.logo && !logoErrored

  return (
    <div
      className="flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
      style={{
        width: size,
        height: size,
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(241,245,249,0.92))',
        border: '1px solid rgba(13, 207, 207, 0.25)',
        boxShadow:
          '0 8px 24px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(13, 207, 207, 0.1) inset, 0 0 24px rgba(13, 207, 207, 0.12)',
      }}
      title={tool.name}
    >
      {showLogo ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={
            tool.logo!.startsWith('http')
              ? tool.logo
              : `/logos/${tool.logo}`
          }
          alt={`${tool.name} logo`}
          style={{ height: tool.logoHeight ?? 32 }}
          className="w-auto max-w-[60%] object-contain"
          onError={() => setLogoErrored(true)}
          loading="lazy"
        />
      ) : tool.text ? (
        tool.text()
      ) : (
        <span className="text-text-primary font-bold text-sm tracking-tight">
          {tool.name}
        </span>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* ORBIT RING                                                          */
/* ------------------------------------------------------------------ */

function OrbitRing({
  tools,
  radius,
  duration,
  reverse = false,
  reducedMotion,
}: {
  tools: Tool[]
  radius: number
  duration: number
  reverse?: boolean
  reducedMotion: boolean
}) {
  const animateProps: Pick<MotionProps, 'animate' | 'transition'> = reducedMotion
    ? {}
    : {
        animate: { rotate: reverse ? -360 : 360 },
        transition: { duration, repeat: Infinity, ease: 'linear' as const },
      }

  return (
    <motion.div
      className="absolute inset-0"
      style={{ width: ORBIT_DIAMETER, height: ORBIT_DIAMETER }}
      {...animateProps}
    >
      {tools.map((tool, i) => {
        const angle = (i / tools.length) * 2 * Math.PI - Math.PI / 2
        const x = CENTER + Math.cos(angle) * radius
        const y = CENTER + Math.sin(angle) * radius

        return (
          <motion.div
            key={tool.name}
            className="absolute"
            style={{
              left: x,
              top: y,
              width: CHIP_SIZE,
              height: CHIP_SIZE,
              marginLeft: -CHIP_SIZE / 2,
              marginTop: -CHIP_SIZE / 2,
            }}
            animate={reducedMotion ? {} : { rotate: reverse ? 360 : -360 }}
            transition={
              reducedMotion
                ? {}
                : { duration, repeat: Infinity, ease: 'linear' }
            }
          >
            <ToolChip tool={tool} />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* CONSTELLATION BACKGROUND                                            */
/* ------------------------------------------------------------------ */

function ConstellationBackground() {
  const stars = [
    { x: 8, y: 12, s: 1.2, d: 0 },
    { x: 18, y: 28, s: 0.8, d: 1.5 },
    { x: 28, y: 8, s: 1.5, d: 0.5 },
    { x: 38, y: 22, s: 1, d: 2 },
    { x: 12, y: 45, s: 1.3, d: 0.8 },
    { x: 25, y: 60, s: 0.9, d: 1.2 },
    { x: 6, y: 75, s: 1.1, d: 2.5 },
    { x: 32, y: 85, s: 0.7, d: 0.3 },
    { x: 65, y: 10, s: 1.4, d: 1.8 },
    { x: 78, y: 25, s: 0.9, d: 0.6 },
    { x: 88, y: 15, s: 1.2, d: 2.2 },
    { x: 72, y: 45, s: 1, d: 1.4 },
    { x: 92, y: 55, s: 1.3, d: 0.4 },
    { x: 80, y: 72, s: 0.8, d: 1.9 },
    { x: 95, y: 82, s: 1.1, d: 0.9 },
    { x: 68, y: 90, s: 1.4, d: 2.1 },
  ]

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          .star { animation: none !important; opacity: 0.5 !important; }
        }
      `}</style>
      {stars.map((star, i) => (
        <div
          key={i}
          className="star absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.s * 2}px`,
            height: `${star.s * 2}px`,
            background: 'rgba(13, 207, 207, 0.8)',
            boxShadow: `0 0 ${star.s * 4}px rgba(13, 207, 207, 0.6)`,
            animation: `twinkle ${3 + (i % 3)}s ease-in-out ${star.d}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* ROTATING HALO                                                       */
/* ------------------------------------------------------------------ */

function RotatingHalo({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      animate={reducedMotion ? {} : { rotate: 360 }}
      transition={
        reducedMotion
          ? {}
          : { duration: 180, repeat: Infinity, ease: 'linear' }
      }
      aria-hidden
    >
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${ORBIT_DIAMETER} ${ORBIT_DIAMETER}`}
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_3_RADIUS + 50}
          fill="none"
          stroke="rgba(13, 207, 207, 0.18)"
          strokeWidth="1"
          strokeDasharray="2 16"
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_3_RADIUS + 70}
          fill="none"
          stroke="rgba(13, 207, 207, 0.1)"
          strokeWidth="0.5"
          strokeDasharray="1 30"
        />
      </svg>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* HUBSPOT LOGO                                                        */
/* ------------------------------------------------------------------ */

function HubSpotLogo() {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <span className="text-brand-teal font-black text-xl tracking-tight">
        HubSpot
      </span>
    )
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="https://cdn.simpleicons.org/hubspot/FF7A59"
      alt="HubSpot"
      className="w-14 h-14 object-contain"
      onError={() => setErrored(true)}
    />
  )
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function ToolOrbit() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0A1628 0%, #0E1D33 50%, #0A1628 100%)',
      }}
    >
      {/* Layer 1: Twinkling constellation */}
      <ConstellationBackground />

      {/* Layer 2: Soft teal aura at center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 60%, rgba(13, 207, 207, 0.18), transparent 60%)',
        }}
        aria-hidden
      />

      {/* Layer 3: Faint horizontal teal band */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(13, 207, 207, 0.04) 40%, rgba(13, 207, 207, 0.06) 50%, rgba(13, 207, 207, 0.04) 60%, transparent 100%)',
        }}
        aria-hidden
      />

      {/* Section header — eyebrow removed */}
      <div className="container-safe relative z-20">
        <ScrollReveal variant="slideUp" className="mb-12 sm:mb-16 text-center">
          <h2
            className="text-display-h2-sm md:text-display-h2 text-text-on-dark tracking-tight max-w-3xl mx-auto leading-[1.1]"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            Built natively into the tools you already trust
          </h2>
          <p className="mt-5 text-text-on-dark-mut text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            HubSpot at the core. Every adjacent tool wired in cleanly — from CRM
            sync to billing to outbound automation.
          </p>
        </ScrollReveal>
      </div>

      {/* Orbit container */}
      <div className="relative w-full flex items-center justify-center">
        <div
          className="relative"
          style={{
            width: ORBIT_DIAMETER,
            height: ORBIT_DIAMETER,
            maxWidth: '95vw',
            maxHeight: '95vw',
            transform: 'scale(var(--orbit-scale, 1))',
          }}
        >
          <style>{`
            @media (max-width: 1024px) { :root { --orbit-scale: 0.85; } }
            @media (max-width: 768px) { :root { --orbit-scale: 0.65; } }
            @media (max-width: 480px) { :root { --orbit-scale: 0.5; } }
          `}</style>

          {/* Bright nucleus glow at center */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at center, rgba(13, 207, 207, 0.18) 0%, rgba(13, 207, 207, 0.08) 25%, transparent 55%)',
            }}
            aria-hidden
          />

          {/* Slowly rotating outer halo */}
          <RotatingHalo reducedMotion={prefersReducedMotion} />

          {/* Static dashed ring guides */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${ORBIT_DIAMETER} ${ORBIT_DIAMETER}`}
            aria-hidden
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RING_1_RADIUS}
              fill="none"
              stroke="rgba(13, 207, 207, 0.3)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RING_2_RADIUS}
              fill="none"
              stroke="rgba(13, 207, 207, 0.22)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RING_3_RADIUS}
              fill="none"
              stroke="rgba(13, 207, 207, 0.16)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          </svg>

          {/* Center HubSpot orb */}
          <motion.div
            className="absolute"
            style={{
              left: CENTER,
              top: CENTER,
              marginLeft: -HUBSPOT_SIZE / 2,
              marginTop: -HUBSPOT_SIZE / 2,
              width: HUBSPOT_SIZE,
              height: HUBSPOT_SIZE,
              zIndex: 10,
            }}
            animate={prefersReducedMotion ? {} : { scale: [1, 1.04, 1] }}
            transition={
              prefersReducedMotion
                ? {}
                : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <div
              className="w-full h-full rounded-full bg-white flex items-center justify-center"
              style={{
                boxShadow:
                  '0 0 80px rgba(13, 207, 207, 0.5), 0 0 0 10px rgba(13, 207, 207, 0.1), 0 0 0 20px rgba(13, 207, 207, 0.05)',
                border: '1px solid rgba(13, 207, 207, 0.4)',
              }}
            >
              <HubSpotLogo />
            </div>
          </motion.div>

          {/* Orbiting rings */}
          <OrbitRing
            tools={ring1Tools}
            radius={RING_1_RADIUS}
            duration={60}
            reverse={false}
            reducedMotion={prefersReducedMotion}
          />
          <OrbitRing
            tools={ring2Tools}
            radius={RING_2_RADIUS}
            duration={90}
            reverse={true}
            reducedMotion={prefersReducedMotion}
          />
          <OrbitRing
            tools={ring3Tools}
            radius={RING_3_RADIUS}
            duration={120}
            reverse={false}
            reducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  )
}