'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  onAnimationComplete?: () => void
}

export default function Counter({
  from = 0,
  to,
  duration = 2.5,
  suffix = '',
  prefix = '',
  className = '',
  onAnimationComplete,
}: CounterProps) {
  const [count, setCount] = useState(from)
  const countRef = useRef(from)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(to)
      onAnimationComplete?.()
      return
    }

    let animationFrameId: number
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)

      const newCount = Math.floor(from + (to - from) * progress)
      setCount(newCount)
      countRef.current = newCount

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(to)
        onAnimationComplete?.()
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [from, to, duration, prefersReducedMotion, onAnimationComplete])

  return (
    <span className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
