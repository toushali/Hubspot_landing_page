'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/motion/ScrollReveal'
import { useLeadModal } from '@/hooks/useLeadModal'

/* ------------------------------------------------------------------ */
/* ATMOSPHERIC BACKGROUND — beacon/signal recipe                       */
/* Different from Hero, ToolOrbit, Results, FreeResources              */
/* ------------------------------------------------------------------ */

function BeaconBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <style>{`
        @keyframes beacon-ring {
          0% {
            transform: scale(0.4);
            opacity: 0;
          }
          25% { opacity: 0.5; }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        @keyframes scan-line {
          0% { transform: translateX(-100%); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .beacon-ring { animation: none !important; opacity: 0.15 !important; transform: scale(1) !important; }
          .scan-line { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      {/* Tech grid (subtle) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(13, 207, 207, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(13, 207, 207, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 50%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 50%, transparent 100%)',
        }}
      />

      {/* Centered radial spotlight — focuses eye on CTA */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(13, 207, 207, 0.22), transparent 70%)',
        }}
      />

      {/* Concentric expanding beacon rings — staggered for continuous pulse */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 600, height: 600 }}
      >
        {[0, 1.3, 2.6, 3.9].map((delay, i) => (
          <div
            key={i}
            className="beacon-ring absolute inset-0 rounded-full"
            style={{
              border: '1px solid rgba(13, 207, 207, 0.4)',
              animation: `beacon-ring 5.2s ease-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Subtle horizontal scan line */}
      <div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ height: 1 }}
      >
        <div
          className="scan-line absolute inset-y-0 w-1/3"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(13, 207, 207, 0.6), transparent)',
            animation: 'scan-line 8s linear infinite',
          }}
        />
      </div>

      {/* Bottom warm accent (ties back to Hero — page bookend) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255, 107, 53, 0.08), transparent 70%)',
        }}
      />

      {/* Top edge highlight — separates from FAQ section above */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(13, 207, 207, 0.3), transparent)',
        }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function ClosingCTA() {
  const { openModal } = useLeadModal()

  return (
    <section
      id="closing-cta"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0A1628 0%, #0E1D33 50%, #0A1628 100%)',
      }}
    >
      <BeaconBackground />

      <div className="container-safe relative z-10">
        <ScrollReveal variant="slideUp" className="max-w-3xl mx-auto text-center">
          {/* Decorative top dot — small visual anchor above H2 */}
          <motion.div
            className="mx-auto mb-8 w-2 h-2 rounded-full bg-brand-teal"
            style={{
              boxShadow:
                '0 0 16px rgba(13, 207, 207, 0.8), 0 0 32px rgba(13, 207, 207, 0.4)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />

          <h2
            className="text-display-h2 sm:text-display-h1-sm md:text-display-h1 text-text-on-dark tracking-tight leading-[1.05] mb-5"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            Ready to fix your HubSpot with us?
          </h2>

          <p className="text-text-on-dark-mut text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Send us the brief, and we will place a HubSpot developer within
            your portal.
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={() => openModal()}
            className="group inline-flex items-center"
          >
            Yes, audit my portal for free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}