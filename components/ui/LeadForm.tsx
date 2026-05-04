'use client'

import React, { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadFormSchema, type LeadFormValues } from '@/lib/validation'
import Button from './Button'
import { AlertCircle } from 'lucide-react'

interface LeadFormProps {
  onSuccess?: () => void
  onClose?: () => void
  prefilledDev?: string
}

export default function LeadForm({ onSuccess, onClose, prefilledDev }: LeadFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onBlur',
  })

  const onSubmit = useCallback(
    async (data: LeadFormValues) => {
      try {
        setSubmitError(null)
        setFieldErrors({})

        const params = new URLSearchParams(window.location.search)
        const url = new URL('/api/lead', window.location.origin)

        // Append UTM params
        params.forEach((value, key) => {
          url.searchParams.append(key, value)
        })

        const response = await fetch(url.toString(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            website_url_confirm: '', // honeypot
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          if (response.status === 429) {
            setSubmitError('Too many submissions. Please try again later.')
          } else if (result.fields) {
            setFieldErrors(result.fields)
          } else {
            setSubmitError(result.error || 'Failed to submit form')
          }
          return
        }

        // Open thank-you page in new tab
        window.open('/thank-you', '_blank')

        // Close modal and reset form
        reset()
        onSuccess?.()
      } catch (error) {
        setSubmitError('An unexpected error occurred. Please try again.')
        console.error('Form submission error:', error)
      }
    },
    [reset, onSuccess]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {submitError && (
        <div className="flex items-start gap-3 rounded-lg bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <p className="text-sm text-red-700">{submitError}</p>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-text-primary">
          Full name *
        </label>
        <input
          {...register('fullName')}
          type="text"
          id="fullName"
          placeholder="Your name"
          className="mt-2 w-full rounded-lg border border-border-light bg-white px-4 py-3 text-text-primary placeholder-text-secondary transition-colors focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      {/* Work Email */}
      <div>
        <label htmlFor="workEmail" className="block text-sm font-medium text-text-primary">
          Work email *
        </label>
        <input
          {...register('workEmail')}
          type="email"
          id="workEmail"
          placeholder="you@company.com"
          className="mt-2 w-full rounded-lg border border-border-light bg-white px-4 py-3 text-text-primary placeholder-text-secondary transition-colors focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
          aria-invalid={!!errors.workEmail}
        />
        {errors.workEmail && (
          <p className="mt-1 text-sm text-red-600">{errors.workEmail.message}</p>
        )}
      </div>

      {/* Company Website */}
      <div>
        <label htmlFor="companyWebsite" className="block text-sm font-medium text-text-primary">
          Company website *
        </label>
        <input
          {...register('companyWebsite')}
          type="text"
          id="companyWebsite"
          placeholder="example.com"
          className="mt-2 w-full rounded-lg border border-border-light bg-white px-4 py-3 text-text-primary placeholder-text-secondary transition-colors focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
          aria-invalid={!!errors.companyWebsite}
        />
        {errors.companyWebsite && (
          <p className="mt-1 text-sm text-red-600">{errors.companyWebsite.message}</p>
        )}
      </div>

      {/* HubSpot Need */}
      <div>
        <label htmlFor="hubspotNeed" className="block text-sm font-medium text-text-primary">
          What is the one thing in HubSpot you need help with?
        </label>
        <input
          {...register('hubspotNeed')}
          type="text"
          id="hubspotNeed"
          placeholder={
            prefilledDev ? `Want to work with ${prefilledDev}` : 'e.g. CMS redesign, integration setup...'
          }
          maxLength={200}
          className="mt-2 w-full rounded-lg border border-border-light bg-white px-4 py-3 text-text-primary placeholder-text-secondary transition-colors focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
          aria-invalid={!!errors.hubspotNeed}
        />
        {errors.hubspotNeed && (
          <p className="mt-1 text-sm text-red-600">{errors.hubspotNeed.message}</p>
        )}
      </div>

      {/* Honeypot */}
      <input type="hidden" {...register('website_url_confirm')} value="" />

      <Button
        type="submit"
        size="lg"
        variant="primary"
        isLoading={isSubmitting}
        className="w-full"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Matching you with a developer…' : 'Get Matched'}
      </Button>

      <p className="text-center text-xs text-text-secondary">
        We respect your privacy. 7-day free trial included.
      </p>
    </form>
  )
}
