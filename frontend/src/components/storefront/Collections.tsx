import { ArrowUpRight } from 'lucide-react'
import type { Collection } from '@/lib/types'

export function Collections({ collections }: { collections: Collection[] }) {
  return (
    <section id="collections" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-accent">
              The Collections
            </p>
            <h2 className="max-w-xl text-balance font-serif text-4xl font-medium leading-[1.05] text-foreground md:text-5xl">
              Curated for the considered garden
            </h2>
          </div>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-opacity hover:opacity-60"
          >
            View full catalogue
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {collections.map((c) => (
            <a
              key={c.handle}
              href={`/shop?collection=${c.handle}`}
              className="group flex flex-col overflow-hidden rounded-sm bg-card"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.image || '/placeholder.svg'}
                  alt={c.name}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground">
                  {c.productCount ?? 0} pieces
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="flex items-center justify-between font-serif text-2xl font-medium text-foreground">
                  {c.name}
                  <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
