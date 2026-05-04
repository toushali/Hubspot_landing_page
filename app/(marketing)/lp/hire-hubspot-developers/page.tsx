import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import LogoMarquee from '@/components/sections/LogoMarquee'
import Process from '@/components/sections/Process'
import ToolOrbit from '@/components/sections/ToolOrbit'
import Services from '@/components/sections/Services'
import DeveloperCarousel from '@/components/sections/DeveloperCarousel'
import Testimonials from '@/components/sections/Testimonials'
import Results from '@/components/sections/Results'
import Pricing from '@/components/sections/Pricing'
import AboutRitesh from '@/components/sections/AboutRitesh'
import Resources from '@/components/sections/Resources'
import FAQ from '@/components/sections/FAQ'
import ClosingCTA from '@/components/sections/ClosingCTA'

export const metadata: Metadata = {
  title: 'Hire HubSpot Developers · Top 1% Pre-vetted Talent · Insightstap',
  description: 'Stop searching. Senior HubSpot developers matched to your portal in 48 hours. 100+ portals shipped. 7-day free trial.',
  openGraph: {
    title: 'Hire HubSpot Developers · Top 1% Pre-vetted Talent · Insightstap',
    description: 'Stop searching. Senior HubSpot developers matched to your portal in 48 hours. 100+ portals shipped. 7-day free trial.',
    url: 'https://hire.sdtcdigital.com/lp/hire-hubspot-developers',
    siteName: 'Insightstap',
    type: 'website',
  },
  alternates: {
    canonical: 'https://hire.sdtcdigital.com/lp/hire-hubspot-developers',
  },
}

export default function HireHubSpotDevelopersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full">
        <Hero />
        <LogoMarquee />
        <Process />
        <ToolOrbit />
        <Services />
        <DeveloperCarousel />
        <Testimonials />
        <Results />
        <Pricing />
        <AboutRitesh />
        <Resources />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  )
}
