'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, type MotionProps } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const HUBSPOT_LOGO_URL = 'https://cdn.worldvectorlogo.com/logos/hubspot-1.svg'

const ARJUN_PHOTO = '/team/arjun.jpg' 

/* Typed helper so TS doesn't choke on the spread into motion.div */
type FloatProps = Pick<MotionProps, 'animate' | 'transition'>

function makeFloat(reducedMotion: boolean) {
  return (delay: number, range = 8, dur = 5): FloatProps => {
    if (reducedMotion) return {}
    return {
      animate: { y: [0, -range, 0] },
      transition: {
        duration: dur,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      },
    }
  }
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = heroRef.current
    if (!el) return

    let raf = 0
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        setMouse({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      })
    }
    el.addEventListener('mousemove', handleMove)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [prefersReducedMotion])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative overflow-hidden bg-ink-navy pt-28 pb-24 sm:pt-36 sm:pb-32"
    >
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden>
        <WorldMapSVG />
      </div>

      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(13, 207, 207, 0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden
      />

      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(13, 207, 207, 0.15), transparent 50%)`,
          }}
          aria-hidden
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 30% 30%, rgba(13, 207, 207, 0.18), transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(67, 56, 202, 0.12), transparent 60%)',
        }}
        aria-hidden
      />

      <div className="container-safe relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <p className="eyebrow mb-5 text-brand-teal">
              HUBSPOT DEVELOPMENT ON DEMAND
            </p>

            <h1 className="text-display-h1-sm md:text-display-h1 leading-[1.05] text-text-on-dark tracking-tight">
              Hire Certified{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-brand-teal via-cyan-300 to-brand-teal bg-clip-text text-transparent">
                  HubSpot developers
                </span>
              </span>{' '}
              with 10+ Years of Experience.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-text-on-dark-mut leading-relaxed">
              Insightstap offers a network of pre-vetted HubSpot developers, CMS
              engineers, integration specialists, and RevOps architects. Top B2B
              SaaS and enterprise teams choose us to scale their HubSpot
              projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-center justify-center"
          >
            <IsometricScene reducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-ink-navy/80 pointer-events-none" />
    </section>
  )
}

/* ------------------------------------------------------------------ */
function WorldMapSVG() {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
      fill="none"
    >
      <defs>
        <pattern id="map-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#0DCFCF" />
        </pattern>
        <mask id="continents-mask">
          <path d="M120,140 Q160,100 240,110 L320,130 Q360,150 340,210 L300,260 Q260,290 220,280 L160,270 Q120,250 110,200 Z" fill="white" />
          <path d="M280,300 Q320,290 340,330 L350,420 Q330,480 290,490 L260,470 Q240,420 250,360 Z" fill="white" />
          <path d="M540,130 Q600,110 660,130 L680,180 Q650,220 600,210 L540,200 Q510,170 540,130 Z" fill="white" />
          <path d="M560,230 Q620,220 670,250 L680,360 Q650,440 600,450 L560,430 Q520,360 530,290 Z" fill="white" />
          <path d="M700,140 Q800,110 920,140 L980,200 Q960,260 880,270 L780,260 Q700,230 700,180 Z" fill="white" />
          <path d="M880,400 Q940,390 980,410 L990,450 Q960,470 920,465 L880,445 Z" fill="white" />
        </mask>
      </defs>
      <rect width="1200" height="600" fill="url(#map-dots)" mask="url(#continents-mask)" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
function IsometricScene({ reducedMotion }: { reducedMotion: boolean }) {
  const float = makeFloat(reducedMotion)

  return (
    <div className="relative w-full max-w-[560px] aspect-square">
      <div
        className="absolute inset-[15%] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(13,207,207,0.35), transparent 70%)',
        }}
        aria-hidden
      />

      {!reducedMotion && <ConnectorLines />}
      {!reducedMotion && <FloatingParticles />}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        {...float(0, 6, 6)}
      >
        <IsometricDesk />
      </motion.div>

      <motion.div className="absolute top-[6%] left-[2%] z-20" {...float(0.3, 10, 5.5)}>
        <DealCard />
      </motion.div>

      <motion.div className="absolute top-[8%] right-[2%] z-20" {...float(0.6, 8, 5)}>
        <ContactCard />
      </motion.div>

      <motion.div className="absolute top-[42%] right-[-2%] z-20" {...float(0.9, 6, 4.5)}>
        <MatchedPill />
      </motion.div>

      <motion.div className="absolute bottom-[8%] left-[0%] z-20" {...float(1.2, 8, 5.5)}>
        <CodeSnippet />
      </motion.div>

      <motion.div className="absolute bottom-[6%] right-[4%] z-20" {...float(1.5, 7, 6)}>
        <AutomationCard />
      </motion.div>

      <motion.div
        className="absolute top-[-2%] left-1/2 -translate-x-1/2 z-20"
        {...float(0.4, 5, 4)}
      >
        <HubSpotOrb />
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
function IsometricDesk() {
  return (
    <div
      className="relative"
      style={{ transform: 'perspective(1200px) rotateX(18deg) rotateY(-12deg)' }}
    >
      <div
        className="w-[280px] h-[60px] rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(20,38,63,0.9), rgba(14,29,51,0.7))',
          border: '1px solid rgba(13, 207, 207, 0.15)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      />
      <div
        className="absolute -top-[170px] left-1/2 -translate-x-1/2 w-[240px] h-[160px] rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0E1D33, #0A1628)',
          border: '1px solid rgba(13, 207, 207, 0.3)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 40px rgba(13, 207, 207, 0.15)',
        }}
      >
        <div className="flex gap-1.5 px-3 py-2 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-red-400/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
          <div className="w-2 h-2 rounded-full bg-green-400/50" />
        </div>
        <div className="px-3 py-2 font-mono text-[9px] leading-[1.7] space-y-0.5">
          <div className="flex gap-2">
            <span className="text-text-on-dark-mut/40">1</span>
            <span className="text-purple-300">{'{% if'}</span>
            <span className="text-cyan-300">contact.lifecycle</span>
            <span className="text-purple-300">{'%}'}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-text-on-dark-mut/40">2</span>
            <span className="text-text-on-dark-mut">&nbsp;&nbsp;</span>
            <span className="text-brand-teal">&lt;div</span>
            <span className="text-orange-300">class</span>
            <span className="text-text-on-dark-mut">=</span>
            <span className="text-green-300">&quot;hero&quot;</span>
            <span className="text-brand-teal">&gt;</span>
          </div>
          <div className="flex gap-2">
            <span className="text-text-on-dark-mut/40">3</span>
            <span className="text-text-on-dark">&nbsp;&nbsp;&nbsp;&nbsp;Hi {'{{'} </span>
            <span className="text-cyan-300">first_name</span>
            <span className="text-text-on-dark"> {'}}'}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-text-on-dark-mut/40">4</span>
            <span className="text-brand-teal">&nbsp;&nbsp;&lt;/div&gt;</span>
          </div>
          <div className="flex gap-2">
            <span className="text-text-on-dark-mut/40">5</span>
            <span className="text-purple-300">{'{% endif %}'}</span>
          </div>
          <div className="flex gap-2 pt-1">
            <span className="text-text-on-dark-mut/40">6</span>
            <span className="inline-block w-1.5 h-3 bg-brand-teal animate-pulse" />
          </div>
        </div>
      </div>
      <div
        className="absolute -top-[20px] left-1/2 -translate-x-1/2 w-3 h-5"
        style={{ background: 'rgba(20,38,63,0.9)' }}
      />
    </div>
  )
}

function DealCard() {
  return (
    <div
      className="rounded-xl p-3 backdrop-blur-md"
      style={{
        background: 'linear-gradient(135deg, rgba(20,38,63,0.95), rgba(14,29,51,0.85))',
        border: '1px solid rgba(13, 207, 207, 0.25)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        transform: 'perspective(800px) rotateY(8deg) rotateX(-4deg)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-[10px] uppercase tracking-wider text-text-on-dark-mut font-semibold">
          Deal · Closed Won
        </span>
      </div>
      <div className="text-text-on-dark text-sm font-bold mb-1">$48,500</div>
      <div className="text-text-on-dark-mut text-[10px]">Acme Corp · Q4</div>
      <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-brand-teal to-cyan-300" />
      </div>
    </div>
  )
}

function ContactCard() {
  const [errored, setErrored] = React.useState(false)

  return (
    <div
      className="rounded-xl p-3 backdrop-blur-md flex items-center gap-2.5"
      style={{
        background: 'linear-gradient(135deg, rgba(20,38,63,0.95), rgba(14,29,51,0.85))',
        border: '1px solid rgba(13, 207, 207, 0.25)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        transform: 'perspective(800px) rotateY(-8deg) rotateX(-4deg)',
      }}
    >
      <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-teal/40 bg-gradient-to-br from-brand-teal to-brand-teal-deep">
        {!errored && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={ARJUN_PHOTO}
            alt="Arjun K."
            className="w-full h-full object-cover"
            onError={() => setErrored(true)}
          />
        )}
        {errored && (
          <div className="w-full h-full flex items-center justify-center text-white text-[10px] font-bold">
            AK
          </div>
        )}
      </div>
      <div>
        <div className="text-text-on-dark text-xs font-semibold">Arjun K.</div>
        <div className="text-brand-teal text-[10px]">Senior HubSpot Dev</div>
      </div>
    </div>
  )
}

function MatchedPill() {
  return (
    <div
      className="rounded-full px-3 py-1.5 flex items-center gap-1.5"
      style={{
        background: 'linear-gradient(135deg, rgba(13, 207, 207, 0.2), rgba(13, 207, 207, 0.05))',
        border: '1px solid rgba(13, 207, 207, 0.4)',
        boxShadow: '0 6px 20px rgba(13, 207, 207, 0.25)',
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 5L4 7L8 3" stroke="#0DCFCF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[10px] font-semibold text-brand-teal uppercase tracking-wider">
        Matched
      </span>
    </div>
  )
}

function CodeSnippet() {
  return (
    <div
      className="rounded-lg p-2 font-mono text-[10px]"
      style={{
        background: 'linear-gradient(135deg, rgba(20,38,63,0.95), rgba(14,29,51,0.85))',
        border: '1px solid rgba(13, 207, 207, 0.25)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        transform: 'perspective(800px) rotateY(6deg) rotateX(-2deg)',
      }}
    >
      <span className="text-purple-300">{'{% '}</span>
      <span className="text-cyan-300">module</span>
      <span className="text-text-on-dark"> </span>
      <span className="text-green-300">&quot;hero&quot;</span>
      <span className="text-purple-300">{' %}'}</span>
    </div>
  )
}

function AutomationCard() {
  return (
    <div
      className="rounded-xl p-3 backdrop-blur-md"
      style={{
        background: 'linear-gradient(135deg, rgba(20,38,63,0.95), rgba(14,29,51,0.85))',
        border: '1px solid rgba(13, 207, 207, 0.25)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        transform: 'perspective(800px) rotateY(-6deg) rotateX(-4deg)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-md bg-brand-teal/20 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2v8" stroke="#0DCFCF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-text-on-dark-mut font-semibold">
          Workflow
        </span>
      </div>
      <div className="text-text-on-dark text-xs font-semibold">Lead Routing</div>
      <div className="flex items-center gap-1 mt-1.5">
        <div className="h-1 w-6 rounded-full bg-brand-teal" />
        <div className="h-1 w-3 rounded-full bg-brand-teal/40" />
        <div className="h-1 w-3 rounded-full bg-brand-teal/40" />
      </div>
    </div>
  )
}

/* CHANGED: real HubSpot logo with text fallback */
function HubSpotOrb() {
  const [errored, setErrored] = useState(false)

  return (
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center bg-white"
      style={{
        boxShadow:
          '0 10px 30px rgba(13, 207, 207, 0.35), inset 0 2px 4px rgba(255,255,255,0.4), 0 0 0 2px rgba(13, 207, 207, 0.3)',
      }}
    >
      {errored ? (
        <span className="text-ink-navy font-bold text-[10px]">HUB</span>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={HUBSPOT_LOGO_URL}
          alt="HubSpot"
          className="w-9 h-9 object-contain"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  )
}

function ConnectorLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <style>{`
        .conn-line {
          stroke: rgba(13, 207, 207, 0.4);
          stroke-width: 0.2;
          stroke-dasharray: 0.8 0.6;
          fill: none;
          animation: dashflow 3s linear infinite;
        }
        @keyframes dashflow { to { stroke-dashoffset: -2.8; } }
        @media (prefers-reduced-motion: reduce) { .conn-line { animation: none; } }
      `}</style>
      <path className="conn-line" d="M 12,18 Q 30,30 50,40" />
      <path className="conn-line" d="M 88,20 Q 70,30 55,42" />
      <path className="conn-line" d="M 50,55 Q 70,52 92,48" />
      <path className="conn-line" d="M 8,85 Q 28,75 48,62" />
      <path className="conn-line" d="M 88,90 Q 70,75 55,62" />
    </svg>
  )
}

function FloatingParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => i)
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <style>{`
        @keyframes rise {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-120px); opacity: 0; }
        }
      `}</style>
      {particles.map((i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-brand-teal/60"
          style={{
            left: `${(i * 13 + 7) % 100}%`,
            top: `${70 + (i % 3) * 8}%`,
            animation: `rise ${4 + (i % 3)}s ease-in ${i * 0.7}s infinite`,
          }}
        />
      ))}
    </div>
  )
}