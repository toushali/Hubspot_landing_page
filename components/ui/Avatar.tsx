'use client'

import React, { useState } from 'react'

interface AvatarProps {
  /** Slug used to look up local /public/team/{slug}.jpg */
  slug: string
  /** randomuser.me path, e.g. "men/32.jpg" or "women/68.jpg" */
  fallbackPath: string
  /** Initials shown if both primary and fallback fail to load */
  initials: string
  /** Display name (used for alt text) */
  name: string
  /** Pixel size of the avatar (square). Defaults to 64. */
  size?: number
  /** Tailwind classes for the wrapper (e.g. for ring, shadow, etc.) */
  className?: string
  /** Set to true to apply a gradient ring around the photo */
  ring?: boolean
}

/**
 * Avatar with 3-tier fallback:
 *   1. Local /public/team/{slug}.jpg (preferred — drop your real photos here)
 *   2. randomuser.me portrait (stable placeholder for prototyping)
 *   3. Gradient circle with initials (final fallback)
 *
 * Usage:
 *   <Avatar slug="arjun" fallbackPath="men/32.jpg" initials="AK" name="Arjun K." />
 */
export default function Avatar({
  slug,
  fallbackPath,
  initials,
  name,
  size = 64,
  className = '',
  ring = false,
}: AvatarProps) {
  const [stage, setStage] = useState<'primary' | 'fallback' | 'initials'>('primary')

  const primary = `/team/${slug}.jpg`
  const fallback = `https://randomuser.me/api/portraits/${fallbackPath}`

  const handleError = () => {
    if (stage === 'primary') setStage('fallback')
    else setStage('initials')
  }

  const ringClass = ring ? 'ring-2 ring-brand-teal/40' : ''

  if (stage === 'initials') {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-gradient-to-br from-brand-teal to-brand-teal-deep text-white font-bold ${ringClass} ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.32 }}
        aria-label={name}
      >
        {initials}
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden rounded-full ${ringClass} ${className}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={stage === 'primary' ? primary : fallback}
        alt={name}
        className="w-full h-full object-cover"
        onError={handleError}
        loading="lazy"
      />
    </div>
  )
}