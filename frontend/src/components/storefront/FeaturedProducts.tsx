import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/types'
import { ProductCard } from '@/components/product/ProductCard'

export function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products.slice(0, 4)
  return (
    <section id="products" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-accent">
              Signature Pieces
            </p>
            <h2 className="max-w-xl text-balance font-serif text-4xl font-medium leading-[1.05] text-foreground md:text-5xl">
              Made to be the heart of your garden
            </h2>
          </div>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-opacity hover:opacity-60"
          >
            Shop all pieces
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
