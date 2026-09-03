const stats = [
  { value: 'Est. 1952', label: 'European heritage' },
  { value: 'Hand-finished', label: 'Every single piece' },
  { value: 'Worldwide', label: 'Delivery & placement' },
]

export function Atelier() {
  return (
    <section id="atelier" className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <div className="relative">
          <div className="overflow-hidden rounded-sm">
            <img
              src="/images/craftsmanship.png"
              alt="An artisan hand-carving detail into natural stone in a sunlit workshop"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-accent">
            The Craft
          </p>
          <h2 className="text-balance font-serif text-4xl font-medium leading-[1.08] text-foreground md:text-5xl">
            Shaped by hand, weathered by nature
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            Every GIDITA piece is the work of master artisans who blend natural
            stone and mineral pigment, then hand-finish each form so no two wear
            their patina the same way. It is a slow, considered craft — one that
            treats a fountain as sculpture and a planter as heirloom.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Rooted in European tradition and finished to endure the open air, each
            piece is made to grow more beautiful with every passing season.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-serif text-4xl font-medium text-primary">{s.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
