'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/motion/ScrollReveal'
import { useLeadModal } from '@/hooks/useLeadModal'

/* ------------------------------------------------------------------ */
/* DEV DATA                                                            */
/* ------------------------------------------------------------------ */

interface Developer {
  id: string
  name: string
  role: string
  bio: string
  skills: string[]
  moreCount: number
  /** Filename in /public/team/{photoSlug}.jpg */
  photoSlug: string
  /** Initials for graceful fallback */
  initials: string
}

const developers: Developer[] = [
  {
    id: 'arjun',
    name: 'Arjun',
    role: 'Senior HubSpot Developer',
    bio: 'Drives custom theme and landing page builds for B2B SaaS. 9 years of HubSpot CMS shipping at scale.',
    skills: ['HubL', 'JavaScript', 'CMS Hub', 'HubDB', 'GraphQL'],
    moreCount: 5,
    photoSlug: 'arjun',
    initials: 'A',
  },
  {
    id: 'shanice',
    name: 'Shanice',
    role: 'HubSpot Solutions Architect',
    bio: 'Designs HubSpot-as-source-of-truth architectures for multi-region B2B teams. Ex-consultant at a HubSpot Diamond partner.',
    skills: ['HubSpot API', 'Salesforce', 'Node.js', 'Operations Hub'],
    moreCount: 6,
    photoSlug: 'shanice',
    initials: 'S',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    role: 'Lead HubSpot Developer · RevOps',
    bio: 'Owns reporting and attribution. Builds forecasting dashboards that hold up in board meetings.',
    skills: ['Operations Hub', 'Python', 'SQL', 'Looker'],
    moreCount: 4,
    photoSlug: 'marcus',
    initials: 'M',
  },
  {
    id: 'esha',
    name: 'Esha',
    role: 'HubSpot Integrations Engineer',
    bio: 'Builds private apps and custom workflow actions on the HubSpot API v3. Stripe, Shopify, Snowflake, custom product DBs.',
    skills: ['HubSpot API', 'Node.js', 'Stripe', 'PostgreSQL'],
    moreCount: 6,
    photoSlug: 'esha',
    initials: 'E',
  },
]

/* ------------------------------------------------------------------ */
/* PHOTO COMPONENT                                                     */
/* Loads /public/team/{slug}.jpg, falls back to initials gradient.    */
/* Different objectPosition per variant keeps face visible.           */
/* ------------------------------------------------------------------ */

interface DevPhotoProps {
  dev: Developer
  variant: 'feature' | 'thumb'
}

function DevPhoto({ dev, variant }: DevPhotoProps) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-teal to-brand-teal-deep text-white font-bold"
        style={{ fontSize: variant === 'feature' ? 80 : 36 }}
      >
        {dev.initials}
      </div>
    )
  }

  // Sized appropriately per variant — next/image generates optimized versions
  const dimensions =
    variant === 'feature'
      ? { width: 560, height: 720 } // 280x360 displayed @ 2x DPI
      : { width: 360, height: 360 } // ~180px square @ 2x DPI

  return (
    <Image
      src={`/team/${dev.photoSlug}.jpg`}
      alt={dev.name}
      width={dimensions.width}
      height={dimensions.height}
      quality={90}
      priority={variant === 'feature'}
      className="w-full h-full object-cover"
      style={{
        objectPosition: variant === 'feature' ? 'center 25%' : 'center 30%',
      }}
      onError={() => setErrored(true)}
      sizes={
        variant === 'feature'
          ? '(max-width: 768px) 100vw, 280px'
          : '(max-width: 640px) 50vw, 180px'
      }
    />
  )
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function DeveloperCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { openModal } = useLeadModal()
  const active = developers[activeIndex]

  return (
    <section
      id="devs"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #FFFFFF 0%, rgba(230, 251, 251, 0.4) 50%, #FFFFFF 100%)',
      }}
    >
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
        {/* Header */}
        <ScrollReveal variant="slideUp" className="mb-12 sm:mb-14 text-center">
          <h2
            className="text-display-h2-sm md:text-display-h2 text-text-primary tracking-tight max-w-3xl mx-auto leading-[1.1]"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            Our experienced developers who have built and shipped HubSpot in
            production
          </h2>
        </ScrollReveal>

        {/* Feature card — centered, smaller */}
        <ScrollReveal
          variant="slideUp"
          delay={0.1}
          className="flex justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden mb-6 w-full"
              style={{
                maxWidth: 880,
                background:
                  'linear-gradient(135deg, #0A1628 0%, #0E1D33 50%, #14263F 100%)',
                boxShadow:
                  '0 30px 80px -20px rgba(10, 22, 40, 0.4), 0 0 0 1px rgba(13, 207, 207, 0.15) inset',
              }}
            >
              {/* Subtle teal glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 50% 50% at 30% 50%, rgba(13, 207, 207, 0.12), transparent 60%)',
                }}
                aria-hidden
              />

              <div className="grid md:grid-cols-[280px_1fr]">
                {/* Photo */}
                <div
                  className="relative h-72 md:h-[360px] overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(13, 207, 207, 0.15), rgba(20, 38, 63, 0.5))',
                  }}
                >
                  <DevPhoto dev={active} variant="feature" />
                </div>

                {/* Content */}
                <div className="relative p-6 sm:p-8 flex flex-col justify-center">
                  <p className="eyebrow mb-2 text-brand-teal">
                    FEATURED DEVELOPER
                  </p>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-text-on-dark mb-1 tracking-tight"
                    style={{
                      fontFamily: 'var(--font-display, Inter), sans-serif',
                    }}
                  >
                    {active.name}
                  </h3>
                  <p className="text-brand-teal text-sm font-medium mb-4">
                    {active.role}
                  </p>
                  <p className="text-text-on-dark-mut text-sm sm:text-base leading-relaxed mb-5">
                    {active.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {active.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-xs font-medium"
                        style={{
                          background: 'rgba(13, 207, 207, 0.12)',
                          color: '#5EEDED',
                          border: '1px solid rgba(13, 207, 207, 0.25)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                    <span
                      className="px-2.5 py-1 rounded-md text-xs font-medium"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: '#94A3B8',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      +{active.moreCount} more
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => openModal(active.name)}
                    className="self-start group"
                  >
                    Hire {active.name}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </ScrollReveal>

        {/* Thumbnail strip — smaller, centered */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mx-auto"
          style={{ maxWidth: 720 }}
        >
          {developers.map((dev, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={dev.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group relative rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  border: isActive
                    ? '2px solid #0DCFCF'
                    : '2px solid rgba(226, 232, 240, 0.8)',
                  boxShadow: isActive
                    ? '0 8px 20px -6px rgba(13, 207, 207, 0.35)'
                    : '0 2px 6px rgba(15, 23, 42, 0.04)',
                  transform: isActive ? 'translateY(-3px)' : 'none',
                }}
              >
                {/* Thumbnail photo */}
                <div className="relative w-full aspect-square bg-surface-soft">
                  <DevPhoto dev={dev} variant="thumb" />
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: isActive
                        ? 'linear-gradient(180deg, transparent 35%, rgba(10, 22, 40, 0.9) 100%)'
                        : 'linear-gradient(180deg, transparent 50%, rgba(10, 22, 40, 0.65) 100%)',
                    }}
                  />
                  {isActive && (
                    <motion.div
                      className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-teal"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.4, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-2.5 py-2 text-left">
                  <p className="text-xs font-bold text-white leading-tight">
                    {dev.name}
                  </p>
                  <p
                    className={`text-[10px] mt-0.5 leading-tight transition-colors ${
                      isActive ? 'text-brand-teal' : 'text-white/70'
                    }`}
                  >
                    {dev.role}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}