const items = [
  {
    image: '/images/gallery-wall-fountain.png',
    title: 'The Ivy Wall Fountain',
    tag: 'Fountains',
    span: 'md:col-span-2 md:row-span-2',
    ratio: 'aspect-[4/3] md:aspect-auto md:h-full',
  },
  {
    image: '/images/gallery-birdbath.png',
    title: 'Lavender Birdbath',
    tag: 'Statuary',
    span: '',
    ratio: 'aspect-square',
  },
  {
    image: '/images/collection-planters.png',
    title: 'Provence Urn, Pair',
    tag: 'Planters',
    span: '',
    ratio: 'aspect-square',
  },
]

export function Gallery() {
  return (
    <section id="gallery" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 max-w-xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-accent">
            In the Garden
          </p>
          <h2 className="text-balance font-serif text-4xl font-medium leading-[1.05] text-foreground md:text-5xl">
            Pieces at home in real gardens
          </h2>
        </div>

        <div className="grid auto-rows-[1fr] gap-6 md:grid-cols-4 md:grid-rows-2">
          {items.map((item) => (
            <a
              key={item.title}
              href="/shop"
              className={`group relative overflow-hidden rounded-sm ${item.span}`}
            >
              <img
                src={item.image || '/placeholder.svg'}
                alt={item.title}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${item.ratio}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-background">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-background/75">
                  {item.tag}
                </span>
                <h3 className="mt-1 font-serif text-2xl font-medium">{item.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
