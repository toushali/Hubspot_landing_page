'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/motion/ScrollReveal'
import { useLeadModal } from '@/hooks/useLeadModal'

/* ------------------------------------------------------------------ */
/* PRICING DATA — exact source-doc copy                                */
/* ------------------------------------------------------------------ */

interface PricingTier {
  id: string
  name: string
  /** Optional prefix line (e.g. "Starting from") — shown above the price in smaller text */
  pricePrefix?: string
  /** The big number value, e.g. "$75", "$3,800" */
  priceMain: string
  /** Optional suffix attached to price like "/hour" or "/month" */
  priceSuffix?: string
  /** Cadence/quantity line shown below the price */
  billing: string
  includes: string[]
  ctaLabel: string
  /** Whether this is the highlighted "Most Popular" card */
  popular?: boolean
}

const tiers: PricingTier[] = [
  {
    id: 'hourly',
    name: 'Hourly',
    priceMain: '$75',
    priceSuffix: '/hour',
    billing: 'Senior HubSpot developer · Minimum 10 hrs/week',
    includes: [
      'Senior HubSpot developer with current certifications',
      'Weekly review call included',
      '7-day free trial on every engagement',
      'NDA and IP protection on day one',
      'No setup fees, no onboarding charges',
    ],
    ctaLabel: 'Start Free Trial',
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    pricePrefix: 'Starting from',
    priceMain: '$3,800',
    priceSuffix: '/month',
    billing: 'One full-time HubSpot developer · 160 hrs/month',
    includes: [
      'Full HubSpot toolset and dev sandbox setup',
      'Bi-weekly strategy session included',
      '7-day free trial, then month-to-month rolling',
      'Replace the developer any time at no extra cost',
      'QA review on every new build',
      'NDA, IP rights, and data security agreement',
    ],
    ctaLabel: 'Start Free Trial',
    popular: true,
  },
  {
    id: 'project',
    name: 'Project',
    pricePrefix: 'Starting from',
    priceMain: '$4,500',
    billing: 'Fixed price 3 to 8 weeks, depending on scope',
    includes: [
      'One senior HubSpot developer dedicated to the project',
      'QA on the developer sandbox before anything goes live',
      'Code in your Git, workflows in your portal',
      'Handover docs plus a recorded walkthrough',
      '30 days of post-launch support and bug fixes',
      'NDA, IP rights, and data security agreement',
    ],
    ctaLabel: 'Get a Quote',
  },
]

/* ------------------------------------------------------------------ */
/* PRICING CARD                                                        */
/* ------------------------------------------------------------------ */

function PricingCard({
  tier,
  index,
}: {
  tier: PricingTier
  index: number
}) {
  const { openModal } = useLeadModal()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative h-full"
    >
      {/* MOST POPULAR ribbon — small, cleanly positioned above card */}
      {tier.popular && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full whitespace-nowrap"
          style={{
            background: 'linear-gradient(135deg, #0DCFCF, #08A8A8)',
            boxShadow: '0 4px 14px rgba(13, 207, 207, 0.35)',
          }}
        >
          <span className="text-[10px] font-bold tracking-wider text-white uppercase">
            Most Popular
          </span>
        </div>
      )}

      <div
        className={`relative h-full rounded-2xl bg-white flex flex-col ${
          tier.popular ? 'pt-9 px-7 pb-7 sm:px-8 sm:pb-8' : 'p-7 sm:p-8'
        }`}
        style={{
          border: tier.popular
            ? '1px solid rgba(13, 207, 207, 0.4)'
            : '1px solid rgba(226, 232, 240, 0.9)',
          boxShadow: tier.popular
            ? '0 8px 32px -4px rgba(13, 207, 207, 0.15), 0 0 0 1px rgba(13, 207, 207, 0.1) inset'
            : '0 4px 16px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(13, 207, 207, 0.04) inset',
        }}
      >
        {/* Tier name */}
        <div className="mb-2">
          <p className="text-xs uppercase tracking-wider text-text-secondary font-semibold mb-2">
            {tier.name}
          </p>
        </div>

        {/* Optional prefix (e.g. "Starting from") on its own line */}
        {tier.pricePrefix && (
          <p className="text-sm text-text-secondary mb-1">
            {tier.pricePrefix}
          </p>
        )}

        {/* Big price + suffix on one line */}
        <div className="mb-2 flex items-baseline flex-wrap">
          <span
            className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            {tier.priceMain}
          </span>
          {tier.priceSuffix && (
            <span className="text-xl text-text-secondary font-normal ml-1">
              {tier.priceSuffix}
            </span>
          )}
        </div>

        {/* Billing / quantity line */}
        <p className="text-sm text-text-secondary leading-relaxed mb-7">
          {tier.billing}
        </p>

        {/* Divider */}
        <div className="h-px bg-border-light mb-5" />

        {/* "Includes" label */}
        <p className="text-xs uppercase tracking-wider text-text-secondary font-semibold mb-4">
          Includes
        </p>

        {/* Includes list */}
        <ul className="space-y-3 mb-8 flex-grow">
          {tier.includes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                style={{
                  background: 'rgba(13, 207, 207, 0.12)',
                }}
              >
                <Check
                  className="h-3 w-3"
                  strokeWidth={3}
                  style={{ color: '#08A8A8' }}
                />
              </div>
              <span className="text-sm text-text-primary leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={tier.popular ? 'primary' : 'secondary'}
          size="md"
          onClick={() => openModal(tier.name)}
          className="w-full group"
        >
          {tier.ctaLabel}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #FFFFFF 0%, rgba(230, 251, 251, 0.45) 50%, #FFFFFF 100%)',
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
        <ScrollReveal variant="slideUp" className="mb-14 sm:mb-16 text-center">
          <h2
            className="text-display-h2-sm md:text-display-h2 text-text-primary tracking-tight max-w-3xl mx-auto leading-[1.1]"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            Our transparent pricing structure
          </h2>
        </ScrollReveal>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        {/* Footnote */}
        <ScrollReveal variant="slideUp" delay={0.3}>
          <p className="mt-12 text-center text-sm text-text-secondary max-w-2xl mx-auto">
            All plans include senior developers vetted by us, code review,
            and a 7-day free trial. Switch between plans anytime.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}