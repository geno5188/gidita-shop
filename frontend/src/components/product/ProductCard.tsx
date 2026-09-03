import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/api'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.handle}`} className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-sm bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground">
            {product.tag}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-serif text-lg font-medium leading-snug text-foreground">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{formatPrice(product.price)}</p>
        </div>
        <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}
