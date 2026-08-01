import { SiteNav } from '@/components/site-nav'
import { BackToTop } from '@/components/shared/back-to-top'
import { Hero } from '@/components/sections/hero'
import FeaturedWorkSlider from '@/components/sections/featured-work-slider'
import { BrandMarquee } from '@/components/sections/brand-marquee'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { Work } from '@/components/sections/work'
import { Process } from '@/components/sections/process'
import { Testimonials } from '@/components/sections/testimonials'
import { Stats } from '@/components/sections/stats'
import { Reels } from '@/components/sections/reels'
import { Contact } from '@/components/sections/contact'
import { SiteFooter } from '@/components/sections/site-footer'
import { FEATURED_PROJECTS } from '@/lib/content'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <Hero />
        <div className="bg-background px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <FeaturedWorkSlider projects={FEATURED_PROJECTS} />
          </div>
        </div>
        <BrandMarquee />
        <About />
        <Services />
        <Work />
        <Process />
        <Testimonials />
        <Stats />
        <Reels />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  )
}
