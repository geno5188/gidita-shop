import { useEffect, useState } from 'react'
import { getCollections, getProducts } from '@/lib/api'
import type { Collection, Product } from '@/lib/types'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Hero } from '@/components/storefront/Hero'
import { BrandStatement } from '@/components/storefront/BrandStatement'
import { Assurances } from '@/components/storefront/Assurances'
import { BrandStory } from '@/components/storefront/BrandStory'
import { Collections } from '@/components/storefront/Collections'
import { FeaturedProducts } from '@/components/storefront/FeaturedProducts'
import { Atelier } from '@/components/storefront/Atelier'
import { Services } from '@/components/storefront/Services'
import { Lifestyle } from '@/components/storefront/Lifestyle'
import { Gallery } from '@/components/storefront/Gallery'
import { Testimonial } from '@/components/storefront/Testimonial'
import { Newsletter } from '@/components/storefront/Newsletter'

export default function HomePage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getCollections().then(setCollections)
    getProducts().then(setProducts)
  }, [])

  // Scroll to a section when arriving with a hash (e.g. /#collections)
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <BrandStatement />
        <Assurances />
        <BrandStory />
        <Collections collections={collections} />
        <FeaturedProducts products={products} />
        <Atelier />
        <Services />
        <Lifestyle />
        <Gallery />
        <Testimonial />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  )
}
