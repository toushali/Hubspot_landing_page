'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import ScrollReveal from '@/components/motion/ScrollReveal'

/* ------------------------------------------------------------------ */
/* TESTIMONIAL DATA                                                    */
/* 3 from source doc verbatim + 3 in matching voice                    */
/* ------------------------------------------------------------------ */

interface Testimonial {
  id: string
  quote: string
  authorRole: string
  authorCompany: string
  authorLocation: string
  /** Two-letter initials for avatar bubble */
  initials: string
  /** Tailwind ring color class */
  accentColor: string
}

const testimonials: Testimonial[] = [
  // Row 1 (3 quotes)
  {
    id: 't1',
    quote:
      "Within an hour of reaching out, we had a senior dev ready to start. By Friday, he had cleaned up our messiest pipeline workflows and shipped two custom modules that were stuck in our backlog for months. The trial wasn't a sales gimmick — we genuinely got production work done.",
    authorRole: 'RevOps Lead',
    authorCompany: 'B2B SaaS',
    authorLocation: 'United States',
    initials: 'RL',
    accentColor: '#0DCFCF',
  },
  {
    id: 't2',
    quote:
      'We were six weeks into a Marketo to HubSpot migration with another partner and behind on every milestone. InsightsTap took it over and had us launching campaigns from the new portal in eleven days. Clean data, working workflows, no surprises.',
    authorRole: 'Marketing Director',
    authorCompany: 'Series B SaaS',
    authorLocation: 'United Kingdom',
    initials: 'MD',
    accentColor: '#7C3AED',
  },
  {
    id: 't3',
    quote:
      'We tried hiring through agencies twice — both times the developer turned out to be a junior with someone senior on the brief calls. With InsightsTap, we got the actual person doing the work from day one. Three months in and our HubSpot portal looks nothing like what we started with.',
    authorRole: 'CEO',
    authorCompany: 'SaaS Product',
    authorLocation: 'Australia',
    initials: 'CE',
    accentColor: '#FF6B35',
  },
  // Row 2 (3 quotes — opposite direction)
  {
    id: 't4',
    quote:
      'The Salesforce-HubSpot two-way sync we had been running was breaking every other week. Our developer rebuilt it as a private app on the v3 API, added proper retry logic, and we have not touched it since. Same person also rewrote our lead scoring.',
    authorRole: 'Head of Marketing Ops',
    authorCompany: 'B2B Fintech',
    authorLocation: 'Singapore',
    initials: 'HM',
    accentColor: '#1D4ED8',
  },
  {
    id: 't5',
    quote:
      "I needed someone who understood not just HubSpot but how a B2B revenue engine actually works. Our developer had built lifecycle stages, attribution, and forecasting at three other SaaS companies before us. We didn't have to teach them anything.",
    authorRole: 'Founder',
    authorCompany: 'Tech Startup',
    authorLocation: 'Germany',
    initials: 'FO',
    accentColor: '#08A8A8',
  },
  {
    id: 't6',
    quote:
      "I've worked with three HubSpot \u2018experts\u2019 before this. Two of them couldn't write HubL. One of them broke our portal. The developer InsightsTap matched us with shipped a custom theme, three integrations, and a reporting overhaul in his first month.",
    authorRole: 'CMO',
    authorCompany: 'eCommerce Platform',
    authorLocation: 'United States',
    initials: 'CM',
    accentColor: '#EA580C',
  },
]

// All 6 testimonials in a single marquee row
const allTestimonials = testimonials

/* ------------------------------------------------------------------ */
/* TESTIMONIAL CARD                                                    */
/* ------------------------------------------------------------------ */

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article
      className="flex-shrink-0 rounded-2xl bg-white p-7 flex flex-col"
      style={{
        width: 420,
        minHeight: 280,
        border: '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow:
          '0 4px 16px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(13, 207, 207, 0.04) inset',
      }}
    >
      {/* Quote icon */}
      <div
        className="mb-4"
        style={{ color: `${t.accentColor}33` }}
        aria-hidden
      >
        <Quote className="h-7 w-7" strokeWidth={2.5} />
      </div>

      {/* Quote text */}
      <blockquote className="text-text-primary text-[15px] leading-relaxed mb-6 flex-grow">
        {t.quote}
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border-light">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white"
          style={{
            background: `linear-gradient(135deg, ${t.accentColor}, ${t.accentColor}CC)`,
          }}
        >
          {t.initials}
        </div>
        <div className="flex-grow min-w-0">
          <div className="text-sm font-bold text-text-primary leading-tight">
            {t.authorRole}
          </div>
          <div className="text-xs text-text-secondary mt-0.5 leading-tight">
            {t.authorCompany} · {t.authorLocation}
          </div>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* MARQUEE ROW                                                         */
/* CSS-driven infinite loop with pause-on-hover                        */
/* ------------------------------------------------------------------ */

function MarqueeRow({
  items,
  reverse = false,
  duration = 60,
}: {
  items: Testimonial[]
  reverse?: boolean
  duration?: number
}) {
  const [paused, setPaused] = useState(false)

  // Duplicate the array so the loop is seamless
  const doubled = [...items, ...items]

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0, black 4%, black 96%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0, black 4%, black 96%, transparent 100%)',
      }}
    >
      <div
        className="flex gap-6 py-2 testimonial-track"
        style={
          {
            '--duration': `${duration}s`,
            animationPlayState: paused ? 'paused' : 'running',
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* ANIMATED BACKGROUND ORBS                                            */
/* Slow-drifting blurred gradient orbs for atmospheric depth           */
/* ------------------------------------------------------------------ */

function BackgroundOrbs() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <style>{`
        @keyframes orb-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.05); }
          66% { transform: translate(-30px, 20px) scale(0.95); }
        }
        @keyframes orb-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 25px) scale(1.08); }
          66% { transform: translate(35px, -15px) scale(0.92); }
        }
        @keyframes orb-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 30px) scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orb { animation: none !important; }
        }
      `}</style>

      {/* Top-left teal orb */}
      <div
        className="orb absolute rounded-full"
        style={{
          width: 480,
          height: 480,
          top: '-15%',
          left: '-10%',
          background:
            'radial-gradient(circle, rgba(13, 207, 207, 0.18) 0%, rgba(13, 207, 207, 0.05) 50%, transparent 80%)',
          filter: 'blur(40px)',
          animation: 'orb-drift-1 22s ease-in-out infinite',
        }}
      />

      {/* Bottom-right deeper teal orb */}
      <div
        className="orb absolute rounded-full"
        style={{
          width: 560,
          height: 560,
          bottom: '-15%',
          right: '-10%',
          background:
            'radial-gradient(circle, rgba(8, 168, 168, 0.15) 0%, rgba(8, 168, 168, 0.04) 50%, transparent 80%)',
          filter: 'blur(50px)',
          animation: 'orb-drift-2 28s ease-in-out infinite',
        }}
      />

      {/* Center mid orb (warm accent) */}
      <div
        className="orb absolute rounded-full"
        style={{
          width: 360,
          height: 360,
          top: '40%',
          left: '60%',
          background:
            'radial-gradient(circle, rgba(255, 107, 53, 0.06) 0%, rgba(255, 107, 53, 0.02) 50%, transparent 80%)',
          filter: 'blur(60px)',
          animation: 'orb-drift-3 32s ease-in-out infinite',
        }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #FFFFFF 0%, rgba(230, 251, 251, 0.5) 50%, #FFFFFF 100%)',
      }}
    >
      {/* Animated atmospheric orbs */}
      <BackgroundOrbs />

      {/* Diagonal grid texture (different from dot pattern used elsewhere) */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(45deg, #0DCFCF 1px, transparent 1px), linear-gradient(-45deg, #0DCFCF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />

      {/* Soft horizontal teal accent band, centered vertically */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 30% at 50% 50%, rgba(13, 207, 207, 0.08), transparent 70%)',
        }}
        aria-hidden
      />

      {/* Marquee animation styles */}
      <style>{`
        @keyframes testimonial-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .testimonial-track {
          width: max-content;
          animation: testimonial-scroll var(--duration, 60s) linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-track {
            animation: none !important;
          }
        }
      `}</style>

      <div className="container-safe relative z-10">
        <ScrollReveal variant="slideUp" className="mb-12 sm:mb-16 text-center">
          <h2
            className="text-display-h2-sm md:text-display-h2 text-text-primary tracking-tight max-w-3xl mx-auto leading-[1.1]"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            What our clients say
          </h2>
          <p className="mt-5 text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Real teams, real production work, real outcomes.
          </p>
        </ScrollReveal>
      </div>

      {/* Single marquee row */}
      <div className="relative z-10">
        <ScrollReveal variant="slideUp">
          <MarqueeRow items={allTestimonials} duration={90} />
        </ScrollReveal>
      </div>
    </section>
  )
}