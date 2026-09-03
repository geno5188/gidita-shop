import { Globe, ShieldCheck, PencilRuler, Hammer } from 'lucide-react'

const items = [
  {
    icon: Globe,
    title: 'Worldwide white-glove',
    text: 'Insured delivery & placement, wherever your garden lives.',
  },
  {
    icon: PencilRuler,
    title: 'Design service',
    text: 'Personal consultation to compose your outdoor space.',
  },
  {
    icon: Hammer,
    title: 'Enduring craftsmanship',
    text: 'Hand-finished natural stone, made to be passed down.',
  },
  {
    icon: ShieldCheck,
    title: 'Lifetime assurance',
    text: 'Frost-proof pieces backed by a 25-year warranty.',
  },
]

export function Assurances() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-4 md:grid-cols-4 md:px-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-start gap-3 px-2 py-6 md:flex-row md:items-center md:gap-4"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <item.icon className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
