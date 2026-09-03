import { ArrowRight } from 'lucide-react'

export function Lifestyle() {
  return (
    <section id="lifestyle" className="relative overflow-hidden">
      <img
        src="/images/lifestyle-patio.png"
        alt="A luxury Mediterranean villa terrace at dusk with a stone fountain, linen furniture and potted olive trees"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-7xl px-5 py-28 md:px-8 md:py-40">
        <div className="max-w-xl text-background">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-background/80">
            The Lookbook
          </p>
          <h2 className="text-balance font-serif text-4xl font-medium leading-[1.08] md:text-5xl">
            Bring the calm of a European courtyard home
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-background/85">
            See how designers pair our fountains, urns and statuary to compose
            terraces, courtyards and gardens that feel timeless — and unmistakably
            yours.
          </p>
          <a
            href="/#lifestyle"
            className="group mt-9 inline-flex items-center gap-2 rounded-sm bg-background px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Explore the lookbook
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
