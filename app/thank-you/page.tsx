import type { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/motion/FadeIn'

export const metadata: Metadata = {
  title: 'Thank You | Hire HubSpot Developers',
  robots: {
    index: false,
  },
}

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-surface-soft to-brand-teal-soft px-4 py-8">
      <div className="w-full max-w-2xl">
        <FadeIn>
          <div className="rounded-2xl bg-white p-12 shadow-lg">
            {/* Animated checkmark placeholder */}
            <div className="mb-8 flex justify-center">
              <div className="h-20 w-20 rounded-full bg-brand-teal/10 flex items-center justify-center">
                <svg
                  className="h-10 w-10 text-brand-teal"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Header */}
            <p className="eyebrow mb-4 text-center text-accent-orange">THANKS FOR REACHING OUT</p>
            <h1 className="mb-4 text-center text-4xl font-bold text-ink-navy md:text-5xl">
              We've got your details.
            </h1>
            <p className="mb-8 text-center text-lg text-text-secondary">
              We have your details, and a senior HubSpot developer is already being matched to your
              needs.
            </p>

            {/* What happens next timeline */}
            <div className="mb-10 space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal text-white font-bold">
                    1
                  </div>
                  <div className="mt-2 h-8 w-0.5 bg-brand-teal/20" />
                </div>
                <div className="pt-2 pb-6">
                  <h3 className="font-semibold text-text-primary">Within 1 Hour</h3>
                  <p className="text-sm text-text-secondary">
                    We match a senior HubSpot developer to your specific needs
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal text-white font-bold">
                    2
                  </div>
                  <div className="mt-2 h-8 w-0.5 bg-brand-teal/20" />
                </div>
                <div className="pt-2 pb-6">
                  <h3 className="font-semibold text-text-primary">Get Matched</h3>
                  <p className="text-sm text-text-secondary">
                    Meet your developer and confirm fit in a quick intro call
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal text-white font-bold">
                    3
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-text-primary">7-Day Free Trial</h3>
                  <p className="text-sm text-text-secondary">
                    Start working with zero commitment. Pay only if you're happy
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="https://insightstap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="primary" size="lg" className="w-full">
                Explore InsightsTap →
              </Button>
            </Link>

            {/* Secondary text */}
            <p className="mt-6 text-center text-xs text-text-secondary">
              Check your email for next steps. Questions?{' '}
              <a href="mailto:hello@insightstap.com" className="text-brand-teal hover:underline">
                hello@insightstap.com
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
