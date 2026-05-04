'use client'

import React, { useState } from 'react'
import Marquee from '@/components/ui/Marquee'
import ScrollReveal from '@/components/motion/ScrollReveal'

interface LogoItem {
  name: string
  file: string
  /** Pixel height of the logo. Default 48. Tune per logo for visual balance. */
  height?: number
  textFallback: () => React.ReactNode
}

const fb =
  'whitespace-nowrap text-text-secondary/70 transition-all duration-300 group-hover:text-text-primary'

const logos: LogoItem[] = [
  {
    name: 'Shootsta',
    file: 'shootsta.webp',
    height: 48,
    textFallback: () => (
      <span className={`${fb} font-bold text-3xl tracking-tight`}>Shootsta</span>
    ),
  },
  {
    name: 'Woliba',
    file: 'woliba.webp',
    height: 52,
    textFallback: () => (
      <span className={`${fb} font-extrabold text-3xl tracking-tighter lowercase`}>
        woliba
      </span>
    ),
  },
  {
    name: 'Innofied',
    file: 'innofied.webp',
    height: 54,
    textFallback: () => (
      <span className={`${fb} font-bold text-3xl tracking-tight`}>
        <span className="italic">Inno</span>fied
      </span>
    ),
  },
  {
    name: 'RB2B',
    file: 'rb2b.webp',
    height: 56,
    textFallback: () => (
      <span
        className={`${fb} font-black text-3xl tracking-wider`}
        style={{ fontFamily: 'ui-monospace, "SF Mono", monospace' }}
      >
        RB2B
      </span>
    ),
  },
  {
    name: 'Apollo',
    file: 'apollo.png',
    height: 48,
    textFallback: () => (
      <span className={`${fb} font-bold text-3xl tracking-tight uppercase`}>
        Apollo<span className="text-text-secondary/60">.io</span>
      </span>
    ),
  },
  {
    name: 'AWS',
    file: 'aws.svg',
    height: 58,
    textFallback: () => (
      <span className={`${fb} font-black text-3xl tracking-tight lowercase`}>aws</span>
    ),
  },
  {
    name: 'AllRide',
    file: 'allride.webp',
    height: 52,
    textFallback: () => (
      <span className={`${fb} font-bold text-3xl tracking-tight`}>
        All<span className="font-extrabold">Ride</span>
      </span>
    ),
  },
  {
    name: 'Snapfix',
    file: 'snapfix.webp',
    height: 48,
    textFallback: () => (
      <span className={`${fb} font-bold text-3xl tracking-tight italic`}>Snapfix</span>
    ),
  },
]

function LogoItem({ logo }: { logo: LogoItem }) {
  const [errored, setErrored] = useState(false)
  const height = logo.height ?? 48

  return (
    <div className="group flex items-center justify-center px-10 sm:px-16 h-24 shrink-0">
      {errored ? (
        logo.textFallback()
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`/logos/${logo.file}`}
          alt={`${logo.name} logo`}
          style={{ height: `${height}px` }}
          className="logo-mono w-auto max-w-[220px] object-contain transition-all duration-300 group-hover:scale-105"
          onError={() => setErrored(true)}
          loading="lazy"
        />
      )}
    </div>
  )
}

export default function LogoMarquee() {
  return (
    <section
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{
        background: '#F4F4F1',
      }}
    >
      {/* CSS for monochrome logo treatment */}
      <style>{`
        .logo-mono {
          filter: grayscale(100%) brightness(0.55) contrast(1.1) opacity(0.75);
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .group:hover .logo-mono {
          filter: grayscale(100%) brightness(0.35) contrast(1.2) opacity(1);
        }
      `}</style>

      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      <div className="container-safe relative z-10">
        <ScrollReveal variant="fadeIn" className="mb-10 sm:mb-12">
          <p className="eyebrow text-center text-text-secondary">
            Recognised by Top Companies Globally
          </p>
        </ScrollReveal>

        <div
          className="relative"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
          }}
        >
          <Marquee speed={50} pauseOnHover>
            <div className="flex items-center">
              {logos.map((logo) => (
                <LogoItem key={logo.name} logo={logo} />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  )
}