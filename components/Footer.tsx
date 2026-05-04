'use client'

import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ink-navy border-t border-border-dark">
      <div className="container-safe py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-12 pb-12 border-b border-border-dark">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-text-on-dark mb-4">Insightstap</h3>
            <p className="text-text-on-dark-mut text-sm">
              Pre-vetted HubSpot developers. Scale your team instantly.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-text-on-dark mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="text-text-on-dark-mut hover:text-text-on-dark transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-text-on-dark-mut hover:text-text-on-dark transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#resources" className="text-text-on-dark-mut hover:text-text-on-dark transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-text-on-dark mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://insightstap.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-on-dark-mut hover:text-text-on-dark transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://insightstap.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-on-dark-mut hover:text-text-on-dark transition-colors"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-text-on-dark mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://insightstap.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-on-dark-mut hover:text-text-on-dark transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="https://insightstap.com/legal/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-on-dark-mut hover:text-text-on-dark transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-text-on-dark-mut text-xs">
          <p>© {currentYear} Insightstap. All rights reserved.</p>
          <p>
            Built for ambitious teams scaling HubSpot.{' '}
            <a
              href="https://insightstap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal hover:text-brand-teal-deep transition-colors"
            >
              Visit Insightstap
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
