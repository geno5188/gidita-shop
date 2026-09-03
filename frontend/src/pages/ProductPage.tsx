import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { getProduct, getProducts, formatPrice } from '@/lib/api'
import type { Product } from '@/lib/types'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { ProductCard } from '@/components/product/ProductCard'

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!handle) return
    setLoaded(false)
    getProduct(handle).then((p) => {
      setProduct(p)
      setLoaded(true)
    })
    getProducts().then((all) => {
      if (product) {
        setRelated(
          all
            .filter(
              (x) =>
                x.handle !== handle &&
                x.collectionHandles.some((h) => product.collectionHandles.includes(h)),
            )
            .slice(0, 4),
        )
      }
    })
  }, [handle])

  if (loaded && !product) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="flex flex-col items-center justify-center gap-4 pt-40 text-center">
          <p className="font-serif text-3xl text-foreground">Piece not found</p>
          <Link to="/shop" className="text-sm uppercase tracking-[0.16em] text-accent hover:opacity-70">
            Back to shop
          </Link>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="pt-40 text-center text-muted-foreground">Loading…</main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-24 pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Link
            to="/shop"
            className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition-opacity hover:opacity-60"
          >
            <ArrowLeft className="size-4" /> Back to shop
          </Link>

          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="overflow-hidden rounded-sm bg-secondary">
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              {product.tag && (
                <span className="mb-3 inline-block w-fit rounded-sm bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground">
                  {product.tag}
                </span>
              )}
              <h1 className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-2xl text-primary">{formatPrice(product.price)}</p>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <button
                type="button"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <ShoppingBag className="size-4" /> Add to enquiry
              </button>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Material</dt>
                  <dd className="mt-1 text-foreground">Natural cast stone</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Finish</dt>
                  <dd className="mt-1 text-foreground">Aged patina</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Warranty</dt>
                  <dd className="mt-1 text-foreground">25 years</dd>
                </div>
              </dl>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="mb-8 font-serif text-3xl font-medium text-foreground">
                You may also like
              </h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
