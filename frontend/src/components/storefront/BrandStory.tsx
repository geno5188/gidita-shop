const pillars = [
  {
    title: 'Nature & Water',
    text: 'The living movement of water, at the heart of every garden we compose.',
  },
  {
    title: 'Stone & Harmony',
    text: 'Natural stone shaped to feel as though it has always belonged.',
  },
  {
    title: 'Timeless Design',
    text: 'European sensibility that transcends season and trend.',
  },
]

export function BrandStory() {
  return (
    <section id="story" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <div className="order-2 md:order-1">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-accent">
            The GIDITA Story
          </p>
          <h2 className="text-balance font-serif text-4xl font-medium leading-[1.08] text-foreground md:text-5xl">
            A garden lifestyle drawn from Europe, composed for the world
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            GIDITA was born from a simple belief — that a garden should feel like a
            place apart. Inspired by the fountains of Provence, the terraces of
            Tuscany and the quiet formality of English gardens, we create pieces
            that turn open air into elegant, living space.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Water, stone and greenery move in harmony. Every fountain, planter and
            sculpture is conceived as a lasting companion to the garden it will one
            day define — an heirloom in the making, wherever in the world it stands.
          </p>

          <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title}>
                <h3 className="font-serif text-lg font-medium text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="overflow-hidden rounded-sm">
            <img
              src="/images/brand-story.png"
              alt="A serene European garden at golden hour with a natural stone fountain framed by hedges and olive trees"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
