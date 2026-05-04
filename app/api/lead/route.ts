/*import { NextRequest, NextResponse } from 'next/server'
import { leadFormSchema } from '@/lib/validation'
import { prisma } from '@/lib/prisma'
import { hashIp, getClientIp } from '@/lib/utils'

const LEAD_SALT = process.env.LEAD_SALT || 'default-salt'
const RATE_LIMIT_WINDOW = 3600 * 1000 // 1 hour
const RATE_LIMIT_REQUESTS = 3

// In-memory rate limiting (for demo; use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(key)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (limit.count >= RATE_LIMIT_REQUESTS) {
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Honeypot check
    if (body.website_url_confirm) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Validate form data
    const validationResult = leadFormSchema.safeParse({
      fullName: body.fullName,
      workEmail: body.workEmail,
      companyWebsite: body.companyWebsite,
      hubspotNeed: body.hubspotNeed,
    })

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors
      return NextResponse.json(
        { error: 'Validation failed', fields: errors },
        { status: 400 }
      )
    }

    const data = validationResult.data
    const clientIp = getClientIp(request)
    const ipHash = hashIp(clientIp, LEAD_SALT)

    // Rate limiting
    const rateLimitKey = `${ipHash}:${data.workEmail.toLowerCase()}`
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        {
          error:
            'Too many submissions. Please try again in an hour.',
        },
        { status: 429 }
      )
    }

    // Parse URL params for UTM tracking
    const { searchParams } = new URL(request.url)
    const utmSource = searchParams.get('utm_source')
    const utmMedium = searchParams.get('utm_medium')
    const utmCampaign = searchParams.get('utm_campaign')
    const utmTerm = searchParams.get('utm_term')
    const utmContent = searchParams.get('utm_content')

    // Save to database
    const lead = await prisma.lead.create({
      data: {
        fullName: data.fullName,
        workEmail: data.workEmail.toLowerCase(),
        companyWebsite: data.companyWebsite,
        hubspotNeed: data.hubspotNeed || null,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        utmTerm: utmTerm || null,
        utmContent: utmContent || null,
        referrer: request.headers.get('referer') || null,
        userAgent: request.headers.get('user-agent') || null,
        ipHash,
      },
    })

    return NextResponse.json(
      {
        success: true,
        id: lead.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    )
  }
}*/
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  console.log('Lead submission (preview):', data)
  return NextResponse.json({ success: true })
}
