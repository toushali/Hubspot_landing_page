'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/motion/ScrollReveal'
import { useLeadModal } from '@/hooks/useLeadModal'

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const stats = [
  { value: '20+', label: 'Years experience' },
  { value: '20+', label: 'Countries served' },
  { value: '100+', label: 'HubSpot portals shipped' },
  { value: 'Top 1%', label: 'Fiverr Pro consultant' },
]

interface TeamMember {
  name: string
  role: string
  description: string
  photoSrc: string
  initials: string
}

const team: TeamMember[] = [
  {
    name: 'Haimosree',
    role: 'Customer Success Manager',
    description:
      'Owns the client experience after handover. Keeps the developer and client journey aligned.',
    photoSrc: '/team/haimosree.jpg',
    initials: 'H',
  },
  {
    name: 'Swarnendu De',
    role: 'Chief Technology Officer',
    description:
      '18 years across 600+ products in 29 countries. Sits on architecture reviews for the larger HubSpot integration and migration engagements.',
    photoSrc:
      'https://swarnendu.de/wp-content/uploads/2025/10/me_speaking-800x800-1.jpg',
    initials: 'SD',
  },
]

/* ------------------------------------------------------------------ */
/* PHOTO with fallback                                                 */
/* ------------------------------------------------------------------ */

function PhotoWithFallback({
  src,
  alt,
  initials,
  width,
  height,
  className = '',
  priority = false,
  isExternal = false,
}: {
  src: string
  alt: string
  initials: string
  width: number
  height: number
  className?: string
  priority?: boolean
  isExternal?: boolean
}) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-brand-teal to-brand-teal-deep text-white font-bold ${className}`}
        style={{
          fontSize: Math.max(width / 4, 24),
        }}
      >
        {initials}
      </div>
    )
  }

  // Use plain <img> for external sources (avoid next/image domain whitelisting friction)
  if (isExternal) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setErrored(true)}
        loading={priority ? 'eager' : 'lazy'}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={90}
      priority={priority}
      className={className}
      onError={() => setErrored(true)}
    />
  )
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function AboutRitesh() {
  const { openModal } = useLeadModal()

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #FFFFFF 0%, rgba(230, 251, 251, 0.4) 50%, #FFFFFF 100%)',
      }}
    >
      {/* Faint dot grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(13, 207, 207, 0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden
      />

      <div className="container-safe relative z-10">
        {/* Section header */}
        <ScrollReveal variant="slideUp" className="mb-12 sm:mb-14 text-center">
          <h2
            className="text-display-h2-sm md:text-display-h2 text-text-primary tracking-tight max-w-3xl mx-auto leading-[1.1]"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            Built by an InsightsTap team that ships HubSpot in production every
            week
          </h2>
        </ScrollReveal>

        {/* Split layout: portrait left, bio + stats right */}
        <div className="grid lg:grid-cols-[420px_1fr] gap-10 lg:gap-16 items-center">
          {/* LEFT: Dark portrait card with floating decorations */}
          <ScrollReveal variant="slideUp" className="relative">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div
                className="relative rounded-3xl overflow-hidden aspect-[4/5]"
                style={{
                  background:
                    'linear-gradient(135deg, #0A1628 0%, #0E1D33 50%, #14263F 100%)',
                  boxShadow:
                    '0 30px 80px -20px rgba(10, 22, 40, 0.45), 0 0 0 1px rgba(13, 207, 207, 0.15) inset',
                }}
              >
                {/* Subtle teal glow inside */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(13, 207, 207, 0.18), transparent 60%)',
                  }}
                  aria-hidden
                />

                {/* Photo */}
                <div className="absolute inset-0">
                  <PhotoWithFallback
                    src="/team/ritesh.jpg"
                    alt="Ritesh Osta"
                    initials="RO"
                    width={560}
                    height={700}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bottom gradient + name plate */}
                <div
                  className="absolute inset-x-0 bottom-0 p-5 sm:p-6"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 0%, rgba(10, 22, 40, 0.92) 60%, rgba(10, 22, 40, 0.98) 100%)',
                  }}
                >
                  <div className="text-text-on-dark text-xl font-bold tracking-tight">
                    Ritesh Osta
                  </div>
                  <div className="text-brand-teal text-sm font-medium mt-0.5">
                    Founder, InsightsTap
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: Bio + stats */}
          <ScrollReveal variant="slideUp" delay={0.15}>
            <p className="text-text-primary text-lg leading-relaxed mb-8">
              Ritesh Osta has spent 20+ years building products and revenue
              operations for B2B SaaS, IT services, and tech companies. He is a{' '}
              <span className="font-semibold text-brand-teal-deep">
                Top 1% Fiverr Pro consultant
              </span>
              , with HubSpot portals shipped to clients across 20+ countries.
            </p>

            {/* Stats grid — clean text, no animated counter, source doc */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 mb-10 max-w-md">
              {stats.map((s) => (
                <div key={s.label}>
                  <div
                    className="text-3xl sm:text-4xl font-black tracking-tight leading-none"
                    style={{
                      fontFamily: 'var(--font-display, Inter), sans-serif',
                      background:
                        'linear-gradient(135deg, #0A1628 0%, #08A8A8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm text-text-secondary mt-1.5 leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button
              variant="primary"
              size="lg"
              onClick={() => openModal()}
              className="group"
            >
              Get matched with a developer
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </ScrollReveal>
        </div>

        {/* Team row */}
        <ScrollReveal variant="slideUp" delay={0.25} className="mt-20 sm:mt-24">
          <div className="border-t border-border-light pt-14">
            <p className="text-center text-xs uppercase tracking-wider text-text-secondary font-semibold mb-10">
              Team Members
            </p>

            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="group relative rounded-2xl overflow-hidden aspect-square transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(13, 207, 207, 0.15), rgba(20, 38, 63, 0.5))',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    boxShadow:
                      '0 8px 24px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(13, 207, 207, 0.06) inset',
                  }}
                >
                  {/* Photo fills the card */}
                  <div className="absolute inset-0">
                    <PhotoWithFallback
                      src={member.photoSrc}
                      alt={member.name}
                      initials={member.initials}
                      width={600}
                      height={600}
                      isExternal={member.photoSrc.startsWith('http')}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom gradient overlay with content */}
                  <div
                    className="absolute inset-x-0 bottom-0 p-5 sm:p-6"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent 0%, rgba(10, 22, 40, 0.55) 30%, rgba(10, 22, 40, 0.92) 70%, rgba(10, 22, 40, 0.98) 100%)',
                    }}
                  >
                    <div
                      className="text-white font-bold text-xl leading-tight tracking-tight mb-1"
                      style={{
                        fontFamily: 'var(--font-display, Inter), sans-serif',
                      }}
                    >
                      {member.name}
                    </div>
                    <div className="text-brand-teal text-sm font-medium mb-3">
                      {member.role}
                    </div>
                    <p className="text-white/85 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}