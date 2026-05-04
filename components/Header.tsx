'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useLeadModal } from '@/hooks/useLeadModal'

/* ------------------------------------------------------------------ */
/* NAV ITEMS                                                           */
/* ------------------------------------------------------------------ */

const navItems = [
  { label: 'How It Works', href: '#process' },
  { label: 'Developers', href: '#devs' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#resources' },
]

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openModal } = useLeadModal()

  // Track scroll for nav background opacity / blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when a link is clicked
  const handleMobileLinkClick = () => setMobileOpen(false)

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(10, 22, 40, 0.75)'
            : '#0A1628',
          backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(13, 207, 207, 0.18)'
            : '1px solid rgba(13, 207, 207, 0.1)',
          boxShadow: scrolled ? '0 4px 24px rgba(0, 0, 0, 0.2)' : 'none',
        }}
      >
        <div className="container-safe">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            {/* Logo + wordmark */}
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/logo.png"
                alt="InsightsTap logo"
                className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <span
                className="text-lg sm:text-xl font-bold tracking-tight"
                style={{
                  fontFamily: 'var(--font-display, Inter), sans-serif',
                  color: '#F1F5F9',
                }}
              >
                Insightstap
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-white"
                  style={{ color: '#CBD5E1' }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button
                variant="primary"
                size="sm"
                onClick={() => openModal()}
              >
                Get Matched
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(13, 207, 207, 0.2)',
              }}
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-text-on-dark" />
              ) : (
                <Menu className="h-5 w-5 text-text-on-dark" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t"
            style={{
              background: 'rgba(10, 22, 40, 0.97)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(13, 207, 207, 0.15)',
            }}
          >
            <div className="container-safe py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleMobileLinkClick}
                  className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-white/5 transition-colors hover:text-white"
                  style={{ color: '#CBD5E1' }}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileOpen(false)
                    openModal()
                  }}
                  className="w-full"
                >
                  Get Matched
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-16 sm:h-[72px]" aria-hidden />
    </>
  )
}