import { ArrowRight, PenLine, Compass, Users } from 'lucide-react'

const services = [
  {
    icon: PenLine,
    title: 'Bespoke Commissions',
    text: 'Custom fountains and statuary designed to your dimensions, stone finish and vision — one-of-a-kind pieces for singular gardens.',
  },
  {
    icon: Compass,
    title: 'Garden Design Consultation',
    text: 'Work one-to-one with our design studio to compose water features, focal points and planting for a considered outdoor space.',
  },
  {
    icon: Users,
    title: 'Trade & Professional',
    text: 'A dedicated program for landscape architects, designers and hospitality — with trade pricing, samples and project support worldwide.',
  },
]

export function Services() {
  return (
    <section id="services" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-accent">
            Custom Projects &amp; Services
          </p>
          <h2 className="text-balance font-serif text-4xl font-medium leading-[1.08] text-foreground md:text-5xl">
            From first sketch to the finished garden
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Beyond our collections, we partner with private clients and design
            professionals on bespoke commissions and complete outdoor schemes —
            realised with quiet attention to detail, from concept to placement.
          </p>

          <dl className="mt-10 space-y-8 border-t border-border pt-8">
            {services.map((s) => (
              <div key={s.title} className="flex gap-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-background text-primary">
                  <s.icon className="size-5" />
                </span>
                <div>
                  <dt className="font-serif text-xl font-medium text-foreground">{s.title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</dd>
                </div>
              </div>
            ))}
          </dl>

          <a
            href="/#journal"
            className="group mt-10 inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Enquire about a project
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="relative order-first md:order-last">
          <div className="overflow-hidden rounded-sm">
            <img
              src="/images/services-design.png"
              alt="A landscape designer's table with garden drawings, natural stone samples and material swatches"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
