import { z } from 'zod'

const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
])

export const leadFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  workEmail: z
    .string()
    .email('Invalid email address')
    .refine((email) => {
      const domain = email.toLowerCase().split('@')[1]
      return !FREE_EMAIL_DOMAINS.has(domain)
    }, 'Please use your work email'),
  companyWebsite: z
    .string()
    .min(1, 'Company website is required')
    .refine((value) => {
      try {
        const url = value.includes('://') ? value : `https://${value}`
        new URL(url)
        return true
      } catch {
        return false
      }
    }, 'Invalid website domain'),
  hubspotNeed: z.string().max(200, 'Response must be under 200 characters').optional(),
  website_url_confirm: z.string().optional(),
})

export type LeadFormValues = z.infer<typeof leadFormSchema>
