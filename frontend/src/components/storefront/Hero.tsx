import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <img
        src="/images/hero-fountain.png"
        alt="A tiered natural stone fountain in a lush formal European garden at golden hour"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-16 md:px-8 md:pb-24">
        <div className="max-w-2xl text-background">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-background/80">
            Timeless European Garden Living
          </p>
          <h1 className="text-balance font-serif text-5xl font-medium leading-[1.02] md:text-7xl lg:text-[5.25rem]">
            The art of water, stone &amp; the living garden
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-background/85 md:text-lg">
            A curated world of fountains, urns and statuary in natural stone —
            composing elegant outdoor spaces for the world&apos;s most considered
            gardens, terraces and estates.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/#collections"
              className="group inline-flex items-center gap-2 rounded-sm bg-background px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Explore Collections
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/#services"
              className="inline-flex items-center gap-2 rounded-sm border border-background/50 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-background transition-colors hover:bg-background/10"
            >
              Design Services
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
