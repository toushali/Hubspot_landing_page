'use client'

import React from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  speed?: number
}

export default function Marquee({
  children,
  className = '',
  reverse = false,
  pauseOnHover = true,
  speed = 40,
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex">{children}</div>
      </div>
    )
  }

  // Use a unique id-friendly hash for the keyframe name so multiple marquees don't collide
  const animName = reverse ? 'marquee-reverse' : 'marquee-forward'

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <style>{`
        @keyframes marquee-forward {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-${reverse ? 'r' : 'f'} {
          display: flex;
          width: max-content;
          animation: ${animName} ${speed}s linear infinite;
          will-change: transform;
        }
        ${
          pauseOnHover
            ? `.marquee-track-${reverse ? 'r' : 'f'}:hover { animation-play-state: paused; }`
            : ''
        }
      `}</style>
      <div className={`marquee-track-${reverse ? 'r' : 'f'}`}>
        <div className="flex flex-shrink-0">{children}</div>
        <div className="flex flex-shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}