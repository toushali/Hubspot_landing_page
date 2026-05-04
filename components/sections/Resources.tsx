'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import ScrollReveal from '@/components/motion/ScrollReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* ------------------------------------------------------------------ */
/* RESOURCES DATA — exact source-doc content                           */
/* ------------------------------------------------------------------ */

interface Resource {
  id: string
  title: string
  type: string
  url: string
  /** Unsplash hero image URL */
  image: string
  /** Alt text for image */
  imageAlt: string
  /** Accent color theme for the card */
  accent: 'teal' | 'blue' | 'purple' | 'orange' | 'green'
}

const resources: Resource[] = [
  {
    id: 'r1',
    title: 'HubSpot Management for Cloud-Based Enterprises',
    type: 'Case study',
    url: 'https://insightstap.com/success-stories/hubspot-manufacturing',
    image:
      'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=720&h=480&fit=crop&q=80&auto=format',
    imageAlt: 'Cloud servers and enterprise infrastructure',
    accent: 'teal',
  },
  {
    id: 'r2',
    title: 'HubSpot and Shopify Integration for E-commerce',
    type: 'Case study',
    url: 'https://insightstap.com/success-stories/shopify-hubspot-integration',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=720&h=480&fit=crop&q=80&auto=format',
    imageAlt: 'E-commerce shopping experience',
    accent: 'green',
  },
  {
    id: 'r3',
    title: 'ABM, HubSpot Management and Cold Outreach for IT Recruitment',
    type: 'Case study',
    url: 'https://insightstap.com/success-stories/abm-recruitment-outreach',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=720&h=480&fit=crop&q=80&auto=format',
    imageAlt: 'IT recruitment team meeting',
    accent: 'purple',
  },
  {
    id: 'r4',
    title:
      'Data Cleanup, CRM Unification and Platform Integration for a Real Estate Brokerage',
    type: 'Case study',
    url: 'https://insightstap.com/success-stories/data-cleanup-real-estate',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=720&h=480&fit=crop&q=80&auto=format',
    imageAlt: 'Real estate buildings',
    accent: 'orange',
  },
  {
    id: 'r5',
    title: 'Ads, Analytics and CRM Automation',
    type: 'Service overview',
    url: 'https://insightstap.com/services/crm-enrichment-automation/hubspot-services',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=720&h=480&fit=crop&q=80&auto=format',
    imageAlt: 'Analytics dashboard with charts',
    accent: 'blue',
  },
]

const accentMap: Record<
  Resource['accent'],
  { bg: string; glow: string; text: string }
> = {
  teal: {
    bg: 'rgba(13, 207, 207, 0.15)',
    glow: 'rgba(13, 207, 207, 0.25)',
    text: '#5EEDED',
  },
  green: {
    bg: 'rgba(34, 197, 94, 0.15)',
    glow: 'rgba(34, 197, 94, 0.22)',
    text: '#86EFAC',
  },
  purple: {
    bg: 'rgba(139, 92, 246, 0.15)',
    glow: 'rgba(139, 92, 246, 0.22)',
    text: '#C4B5FD',
  },
  orange: {
    bg: 'rgba(255, 107, 53, 0.18)',
    glow: 'rgba(255, 107, 53, 0.25)',
    text: '#FDBA74',
  },
  blue: {
    bg: 'rgba(59, 130, 246, 0.15)',
    glow: 'rgba(59, 130, 246, 0.22)',
    text: '#93C5FD',
  },
}

/* ------------------------------------------------------------------ */
/* RESOURCE CARD                                                       */
/* ------------------------------------------------------------------ */

function ResourceCard({ resource }: { resource: Resource }) {
  const accent = accentMap[resource.accent]
  const [imgErrored, setImgErrored] = useState(false)

  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group relative flex-shrink-0 snap-start rounded-2xl overflow-hidden flex flex-col"
      style={{
        width: 360,
        height: 340,
        background:
          'linear-gradient(160deg, rgba(20, 38, 63, 0.7) 0%, rgba(14, 29, 51, 0.95) 100%)',
        border: '1px solid rgba(13, 207, 207, 0.15)',
        boxShadow:
          '0 4px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(13, 207, 207, 0.04) inset',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Hero image */}
      <div className="relative h-36 overflow-hidden flex-shrink-0">
        {!imgErrored ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={resource.image}
            alt={resource.imageAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgErrored(true)}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: accent.bg }}
          >
            <span
              className="text-2xl font-black opacity-40"
              style={{ color: accent.text }}
            >
              0{parseInt(resource.id.replace('r', ''))}
            </span>
          </div>
        )}

        {/* Image overlay tint in card accent color */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `linear-gradient(180deg, ${accent.bg} 0%, transparent 50%, rgba(10, 22, 40, 0.4) 100%)`,
          }}
        />

        {/* Bottom-fade-into-card-bg for seamless transition */}
        <div
          className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(14, 29, 51, 0.95) 100%)',
          }}
        />

        {/* Resource number — sits over image bottom-right */}
        <div
          className="absolute bottom-3 right-4 text-5xl font-black leading-none opacity-95 pointer-events-none"
          style={{
            fontFamily: 'var(--font-display, Inter), sans-serif',
            color: accent.text,
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}
          aria-hidden
        >
          0{parseInt(resource.id.replace('r', ''))}
        </div>
      </div>

      {/* Top accent glow on hover */}
      <div
        className="absolute inset-x-0 top-0 h-36 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${accent.glow}, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Title */}
        <h3
          className="text-text-on-dark text-lg font-bold leading-snug tracking-tight flex-grow"
          style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
        >
          {resource.title}
        </h3>

        {/* Read link */}
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/10">
          <span
            className="text-sm font-semibold transition-colors"
            style={{ color: accent.text }}
          >
            Read more
          </span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: accent.text }}
          />
        </div>
      </div>
    </motion.a>
  )
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function FreeResources() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [progress, setProgress] = useState(0)
  const prefersReducedMotion = useReducedMotion()

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
    // Card width 360 + gap 24 = 384
    const amount = 384 * (direction === 'left' ? -1 : 1)
    el.scrollBy({
      left: amount,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section
      id="resources"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0A1628 0%, #0E1D33 50%, #0A1628 100%)',
      }}
    >
      {/* Atmospheric layers — different recipe from Hero/ToolOrbit/Results */}

      {/* Layer 1: Diagonal grid (subtle, like a knowledge ledger) */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(13, 207, 207, 1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(13, 207, 207, 1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden
      />

      {/* Layer 2: Soft top-center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(13, 207, 207, 0.15), transparent 70%)',
        }}
        aria-hidden
      />

      {/* Layer 3: Bottom-right warm accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 90% 100%, rgba(255, 107, 53, 0.06), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="container-safe relative z-10">
        {/* Header */}
        <ScrollReveal variant="slideUp" className="mb-12 sm:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h2
                className="text-display-h2-sm md:text-display-h2 text-text-on-dark tracking-tight leading-[1.1]"
                style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
              >
                Learn how to run HubSpot like a real revenue engine
              </h2>
            </div>

            {/* Desktop nav arrows */}
            <div className="hidden lg:flex gap-2">
              <button
                type="button"
                onClick={() => scrollByCard('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(13, 207, 207, 0.25)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <ChevronLeft className="h-5 w-5 text-text-on-dark" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(13, 207, 207, 0.25)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <ChevronRight className="h-5 w-5 text-text-on-dark" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal scrollable cards */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="overflow-x-auto scroll-smooth snap-x snap-mandatory -mt-3 pt-3 pb-6 -mx-2 px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style>{`
              section#resources .overflow-x-auto::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="flex gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div
              className="relative h-1 rounded-full overflow-hidden"
              style={{ background: 'rgba(255, 255, 255, 0.08)' }}
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
      </div>
    </section>
  )
}