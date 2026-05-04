'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollReveal from '@/components/motion/ScrollReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* ------------------------------------------------------------------ */
/* SERVICES                                                            */
/* ------------------------------------------------------------------ */

interface Service {
  id: string
  title: string
  description: string
  capabilities: string[]
  image: string
  imageAlt: string
  /** Tag color theme — used for accent badges */
  accent: 'teal' | 'purple' | 'orange' | 'blue'
}

const services: Service[] = [
  {
    id: 'cms',
    title: 'HubSpot CMS Developer',
    description:
      'Custom websites, landing pages, themes, and HubL templates on CMS Hub. Migrations from WordPress, Webflow, or a custom CMS.',
    capabilities: ['Custom HubL', 'Themes & Modules', 'CMS Migration', 'Performance'],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Developer working on code in a modern editor',
    accent: 'teal',
  },
  {
    id: 'crm',
    title: 'HubSpot CRM and RevOps Developer',
    description:
      'Lifecycle stages, custom objects, lead scoring, custom-coded workflow actions, attribution dashboards. The work that makes sales and marketing trust the data.',
    capabilities: ['Lifecycle stages', 'Custom objects', 'Lead scoring', 'Attribution'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Analytics dashboard with charts and metrics',
    accent: 'blue',
  },
  {
    id: 'integration',
    title: 'HubSpot Integration Developer',
    description:
      'Two-way sync with Salesforce, Stripe, NetSuite, Shopify. Private apps and webhooks on the HubSpot API v3. Product event pipelines for SaaS.',
    capabilities: ['API v3', 'Two-way sync', 'Private apps', 'Webhooks'],
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Network nodes with glowing connections',
    accent: 'purple',
  },
  {
    id: 'migration',
    title: 'HubSpot Onboarding & Migration Specialist',
    description:
      'Set up new portals end to end. Migrate from Marketo, Pardot, ActiveCampaign, or Mailchimp. Clean data, working workflows, ready on day one.',
    capabilities: [
      'Portal setup',
      'Data migration',
      'Workflows ready',
      'Day-one launch',
    ],
    image:
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Server racks in a data center',
    accent: 'orange',
  },
]

const accentClasses: Record<Service['accent'], { bg: string; text: string; border: string }> = {
  teal: {
    bg: 'rgba(13, 207, 207, 0.1)',
    text: '#08A8A8',
    border: 'rgba(13, 207, 207, 0.25)',
  },
  blue: {
    bg: 'rgba(59, 130, 246, 0.1)',
    text: '#1D4ED8',
    border: 'rgba(59, 130, 246, 0.25)',
  },
  purple: {
    bg: 'rgba(139, 92, 246, 0.1)',
    text: '#7C3AED',
    border: 'rgba(139, 92, 246, 0.25)',
  },
  orange: {
    bg: 'rgba(255, 107, 53, 0.1)',
    text: '#EA580C',
    border: 'rgba(255, 107, 53, 0.25)',
  },
}

/* ------------------------------------------------------------------ */
/* SERVICE CARD                                                        */
/* ------------------------------------------------------------------ */

function ServiceCard({ service }: { service: Service }) {
  const [imgErrored, setImgErrored] = useState(false)
  const accent = accentClasses[service.accent]

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="flex-shrink-0 snap-start rounded-2xl bg-white overflow-hidden flex flex-col"
      style={{
        width: 380,
        height: 520,
        border: '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow:
          '0 4px 16px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(13, 207, 207, 0.04) inset',
      }}
    >
      {/* Image */}
      <div className="relative h-52 bg-surface-soft overflow-hidden flex-shrink-0">
        {!imgErrored ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={service.image}
            alt={service.imageAlt}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            onError={() => setImgErrored(true)}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: accent.bg }}
          >
            <span style={{ color: accent.text, fontWeight: 700, fontSize: 18 }}>
              {service.title}
            </span>
          </div>
        )}
        {/* Subtle gradient overlay for image legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, transparent 50%, rgba(15, 23, 42, 0.15) 100%)',
          }}
        />
        {/* Accent corner badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md text-xs font-semibold uppercase tracking-wider"
          style={{
            background: accent.bg,
            color: accent.text,
            border: `1px solid ${accent.border}`,
          }}
        >
          Service
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-7">
        <h3
          className="text-xl font-bold text-text-primary mb-3 leading-tight tracking-tight"
          style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
        >
          {service.title}
        </h3>
        <p className="text-sm text-text-secondary leading-[1.6] mb-5 flex-grow">
          {service.description}
        </p>

        {/* Capability chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {service.capabilities.map((cap) => (
            <span
              key={cap}
              className="text-xs font-medium px-2.5 py-1 rounded-md"
              style={{
                background: 'rgba(241, 245, 249, 0.8)',
                color: '#475569',
                border: '1px solid rgba(226, 232, 240, 0.8)',
              }}
            >
              {cap}
            </span>
          ))}
        </div>

      </div>
    </motion.article>
  )
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [progress, setProgress] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  // Update scroll state
  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const maxScroll = scrollWidth - clientWidth
    setCanScrollLeft(scrollLeft > 8)
    setCanScrollRight(scrollLeft < maxScroll - 8)
    setProgress(maxScroll === 0 ? 0 : (scrollLeft / maxScroll) * 100)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const scrollByCard = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    // Card width 380 + gap 24 = 404
    const amount = 404 * (direction === 'left' ? -1 : 1)
    el.scrollBy({ left: amount, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #FFFFFF 0%, rgba(230, 251, 251, 0.5) 50%, #FFFFFF 100%)',
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
        {/* Header */}
        <ScrollReveal variant="slideUp" className="mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h2
                className="text-display-h2-sm md:text-display-h2 text-text-primary tracking-tight leading-[1.1]"
                style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
              >
                All the HubSpot expertise you need, in one place.
              </h2>
            </div>

            {/* Desktop nav arrows */}
            <div className="hidden lg:flex gap-2">
              <button
                type="button"
                onClick={() => scrollByCard('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-border-light shadow-sm transition-all hover:bg-surface-soft disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5 text-text-primary" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-border-light shadow-sm transition-all hover:bg-surface-soft disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                <ChevronRight className="h-5 w-5 text-text-primary" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal scrollable cards — aligned with container heading */}
      <div className="container-safe relative">
        <div
          ref={scrollRef}
          className="overflow-x-auto scroll-smooth snap-x snap-mandatory -mx-2 px-2 -mt-3 pt-3 pb-6"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`
            section#services .overflow-x-auto::-webkit-scrollbar { display: none; }
          `}</style>

          <div className="flex gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div
            className="relative h-1 rounded-full overflow-hidden"
            style={{ background: 'rgba(226, 232, 240, 0.6)' }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #0DCFCF, #08A8A8)',
                width: `${Math.max(progress, 8)}%`,
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}