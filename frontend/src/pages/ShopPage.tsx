import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCollections, getProducts } from '@/lib/api'
import type { Collection, Product } from '@/lib/types'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { ProductCard } from '@/components/product/ProductCard'

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCollection = searchParams.get('collection') ?? ''

  const [collections, setCollections] = useState<Collection[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getCollections().then(setCollections)
    getProducts().then(setProducts)
  }, [])

  const filtered = useMemo(() => {
    if (!activeCollection) return products
    return products.filter((p) => p.collectionHandles.includes(activeCollection))
  }, [products, activeCollection])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-24 pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 border-b border-border pb-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-accent">
              The Catalogue
            </p>
            <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
              Shop all pieces
            </h1>
          </div>

          <div className="mb-10 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                !activeCollection
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-foreground hover:bg-secondary'
              }`}
            >
              All
            </button>
            {collections.map((c) => (
              <button
                key={c.handle}
                type="button"
                onClick={() => setSearchParams({ collection: c.handle })}
                className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                  activeCollection === c.handle
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-foreground hover:bg-secondary'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">
              No pieces in this collection yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
