import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { z } from 'zod'
import { query } from '@/lib/db'

/* ------------------------------------------------------------------ */
/* INPUT VALIDATION                                                    */
/* ------------------------------------------------------------------ */

// Helper: normalize the incoming object so we accept both
// camelCase and snake_case field names from the form.
function normalizeFields(raw: Record<string, unknown>): Record<string, unknown> {
  return {
    fullName:
      raw.fullName ?? raw.full_name ?? raw.name ?? raw.fullname ?? '',
    // Accept 'workEmail' (form field name) and 'email' (legacy/alt name)
    email: raw.workEmail ?? raw.work_email ?? raw.email ?? '',
    companyWebsite:
      raw.companyWebsite ??
      raw.company_website ??
      raw.companyUrl ??
      raw.website_url ??
      raw.company ??
      '',
    hubspotNeed:
      raw.hubspotNeed ??
      raw.hubspot_need ??
      raw.help ??
      raw.message ??
      raw.need ??
      '',
    // Honeypot field — accept all common names including the form's
    // 'website_url_confirm'
    website:
      raw.website_url_confirm ??
      raw.website ??
      raw.hp ??
      raw.honeypot ??
      '',
    utm_source: raw.utm_source ?? raw.utmSource ?? '',
    utm_medium: raw.utm_medium ?? raw.utmMedium ?? '',
    utm_campaign: raw.utm_campaign ?? raw.utmCampaign ?? '',
    utm_content: raw.utm_content ?? raw.utmContent ?? '',
    utm_term: raw.utm_term ?? raw.utmTerm ?? '',
    referrer: raw.referrer ?? raw.referer ?? '',
  }
}

const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name is required')
    .max(255, 'Full name is too long'),

  // Accept any email (work or personal — per current requirement)
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),

  // Accept with or without https/www, normalize on the server
  companyWebsite: z
    .string()
    .trim()
    .min(3, 'Company website is required')
    .max(500, 'Website is too long'),

  hubspotNeed: z
    .string()
    .trim()
    .max(500, 'Please keep your answer under 500 characters')
    .optional()
    .or(z.literal('')),

  // Honeypot — must be empty. If set, this is a bot.
  website: z.string().max(0, 'Bot detected').optional().or(z.literal('')),

  // UTM + referrer (all optional)
  utm_source: z.string().max(255).optional().or(z.literal('')),
  utm_medium: z.string().max(255).optional().or(z.literal('')),
  utm_campaign: z.string().max(255).optional().or(z.literal('')),
  utm_content: z.string().max(255).optional().or(z.literal('')),
  utm_term: z.string().max(255).optional().or(z.literal('')),
  referrer: z.string().max(500).optional().or(z.literal('')),
})

/* ------------------------------------------------------------------ */
/* HELPERS                                                             */
/* ------------------------------------------------------------------ */

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? 'hire-sdtcdigital-default-salt'
  return createHash('sha256').update(ip + salt).digest('hex')
}

function normalizeWebsite(input: string): string {
  let url = input.trim()
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`
  }
  return url
}

function getClientIp(request: NextRequest): string {
  // Vercel sets these headers
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return 'unknown'
}

/* ------------------------------------------------------------------ */
/* RATE LIMITING                                                       */
/* In-memory rate limit (works for single-instance deployments and    */
/* Vercel's warm function reuse, but resets on cold starts).          */
/* For production scale, swap this with Upstash Redis or similar.     */
/* ------------------------------------------------------------------ */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 3

function checkRateLimit(key: string): { ok: boolean; resetIn?: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { ok: true }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false, resetIn: Math.ceil((entry.resetAt - now) / 60_000) }
  }

  entry.count += 1
  return { ok: true }
}

/* ------------------------------------------------------------------ */
/* POST /api/lead                                                      */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json()
    const normalized = normalizeFields(rawData as Record<string, unknown>)

    // Log the incoming payload for debugging — remove this in production
    if (process.env.NODE_ENV !== 'production') {
      console.log('[lead] Raw payload:', rawData)
      console.log('[lead] Normalized:', normalized)
    }

    const parsed = leadSchema.safeParse(normalized)

    if (!parsed.success) {
      // Log full Zod error details for debugging
      console.error('[lead] Validation failed:', parsed.error.issues)
      const firstIssue = parsed.error.issues[0]
      const fieldName = firstIssue?.path.join('.') ?? 'unknown field'
      const message = firstIssue?.message ?? 'Invalid form data'
      return NextResponse.json(
        {
          success: false,
          error: `${message} (field: ${fieldName})`,
        },
        { status: 400 },
      )
    }

    const data = parsed.data

    // Honeypot triggered — silently succeed so bots don't probe further
    if (data.website && data.website.length > 0) {
      console.warn('[lead] Honeypot triggered, silent reject')
      return NextResponse.json({ success: true })
    }

    // Rate limit
    const ip = getClientIp(request)
    const hashedIp = hashIp(ip)
    const rateLimitKey = `${hashedIp}:${data.email}`
    const rl = checkRateLimit(rateLimitKey)
    if (!rl.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions. Try again in ${rl.resetIn} minute(s).`,
        },
        { status: 429 },
      )
    }

    // Normalize website URL
    const normalizedWebsite = normalizeWebsite(data.companyWebsite)

    // User agent for spam analysis
    const userAgent = request.headers.get('user-agent')?.slice(0, 500) ?? null

    // Insert into Postgres
    const result = await query<{ id: string }>(
      `
      INSERT INTO leads (
        full_name,
        email,
        company_website,
        hubspot_need,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        referrer,
        hashed_ip,
        user_agent
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
      )
      RETURNING id
      `,
      [
        data.fullName,
        data.email,
        normalizedWebsite,
        data.hubspotNeed || null,
        data.utm_source || null,
        data.utm_medium || null,
        data.utm_campaign || null,
        data.utm_content || null,
        data.utm_term || null,
        data.referrer || null,
        hashedIp,
        userAgent,
      ],
    )

    return NextResponse.json({
      success: true,
      leadId: result.rows[0]?.id,
    })
  } catch (error) {
    console.error('[lead] Submission error:', error)
    return NextResponse.json(
      {
        success: false,
        error:
          'Something went wrong on our end. Please try again or email us directly.',
      },
      { status: 500 },
    )
  }
}