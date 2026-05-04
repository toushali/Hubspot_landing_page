'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ScrollReveal from '@/components/motion/ScrollReveal'

/* ------------------------------------------------------------------ */
/* FAQ DATA — exact source-doc copy                                    */
/* ------------------------------------------------------------------ */

interface FAQ {
  id: string
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    id: 'q1',
    question: 'How fast can a HubSpot developer start?',
    answer:
      'Within 48 hours for most engagements. Book a 20-minute call, get matched, and the 7-day free trial begins the next day.',
  },
  {
    id: 'q2',
    question: 'What if the developer is not the right fit?',
    answer:
      'The first seven days are free. If it is not working, we part ways and you owe zero. After that, request a replacement any time at no extra cost.',
  },
  {
    id: 'q3',
    question: 'Are your developers HubSpot certified?',
    answer:
      'Every developer holds current HubSpot certifications across CMS Developer, Marketing Software, and Sales Software. Most hold four or more.',
  },
  {
    id: 'q4',
    question: 'Can you work alongside our existing HubSpot Solutions Partner?',
    answer:
      'Yes. Many clients keep their Solutions Partner for strategy and bring us in for the development work. We collaborate directly and hand off cleanly.',
  },
  {
    id: 'q5',
    question: 'Do you sign an NDA before seeing our portal?',
    answer:
      'Always. NDA signed same day, before any developer gets portal access.',
  },
  {
    id: 'q6',
    question: 'What does a typical HubSpot migration cost?',
    answer:
      'Simple migrations from WordPress or Squarespace start at $3,500. Full migrations from Marketo, Pardot, or a custom CMS run $15,000 to $45,000 depending on data volume and automation complexity.',
  },
  {
    id: 'q7',
    question: 'Can you integrate HubSpot with our custom product?',
    answer:
      'Yes. We build private apps and custom-coded workflow actions on the HubSpot API v3. We have shipped two-way syncs with Salesforce, Stripe, NetSuite, Shopify, Snowflake, and proprietary product databases.',
  },
  {
    id: 'q8',
    question: 'Who owns the code and the portal configuration?',
    answer:
      'You do. All code sits in your Git repository, all workflows and themes live in your HubSpot account, and you get full handover documentation at the end of every engagement.',
  },
]

/* ------------------------------------------------------------------ */
/* FAQ ITEM                                                            */
/* ------------------------------------------------------------------ */

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="rounded-2xl bg-white transition-all duration-300"
      style={{
        border: isOpen
          ? '1px solid rgba(13, 207, 207, 0.35)'
          : '1px solid rgba(226, 232, 240, 0.9)',
        boxShadow: isOpen
          ? '0 8px 24px -6px rgba(13, 207, 207, 0.15), 0 0 0 1px rgba(13, 207, 207, 0.06) inset'
          : '0 2px 8px rgba(15, 23, 42, 0.04)',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${faq.id}-answer`}
        className="w-full flex items-start sm:items-center justify-between gap-4 px-6 sm:px-7 py-5 text-left group"
      >
        <h3
          className="text-base sm:text-lg font-bold text-text-primary leading-snug tracking-tight pr-2"
          style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
        >
          {faq.question}
        </h3>

        {/* Chevron in a circle, rotates when open */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300"
          style={{
            background: isOpen
              ? 'rgba(13, 207, 207, 0.12)'
              : 'rgba(241, 245, 249, 0.8)',
            border: isOpen
              ? '1px solid rgba(13, 207, 207, 0.3)'
              : '1px solid rgba(226, 232, 240, 0.8)',
          }}
        >
          <ChevronDown
            className="h-4 w-4 transition-colors duration-300"
            strokeWidth={2.5}
            style={{
              color: isOpen ? '#08A8A8' : '#64748B',
            }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${faq.id}-answer`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25, delay: isOpen ? 0.1 : 0 },
            }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-7 pb-6">
              <div
                className="h-px mb-5"
                style={{ background: 'rgba(226, 232, 240, 0.8)' }}
              />
              <p className="text-text-secondary text-base leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section
      id="faq"
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
        {/* Header */}
        <ScrollReveal variant="slideUp" className="mb-12 sm:mb-14 text-center">
          <h2
            className="text-display-h2-sm md:text-display-h2 text-text-primary tracking-tight max-w-3xl mx-auto leading-[1.1]"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            Frequently asked questions
          </h2>
          <p className="mt-5 text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            The questions our clients ask before signing the NDA.
          </p>
        </ScrollReveal>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <ScrollReveal
              key={faq.id}
              variant="slideUp"
              delay={i * 0.04}
              className="relative"
            >
              <FAQItem
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}