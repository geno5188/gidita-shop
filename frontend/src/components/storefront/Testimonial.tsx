import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const quotes = [
  {
    quote:
      'Our courtyard fountain became the heart of the home. The stonework is extraordinary — it looks like it has been there for a century.',
    name: 'Eleanor Whitfield',
    location: 'Charleston, SC',
  },
  {
    quote:
      'White-glove delivery, flawless installation, and a patina that only gets more beautiful. Worth every dollar.',
    name: 'Marcus Bellini',
    location: 'Napa Valley, CA',
  },
  {
    quote:
      'GIDITA\'s studio helped us design the entire terrace. The urns and statuary feel collected over decades, not ordered online.',
    name: 'Priya Ramesh',
    location: 'Cotswolds, England',
  },
]

export function Testimonial() {
  const [index, setIndex] = useState(0)
  const active = quotes[index]

  const prev = () => setIndex((i) => (i - 1 + quotes.length) % quotes.length)
  const next = () => setIndex((i) => (i + 1) % quotes.length)

  return (
    <section className="bg-primary py-24 text-primary-foreground md:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="mb-10 text-xs font-medium uppercase tracking-[0.35em] text-primary-foreground/60">
          Voices from the garden
        </p>
        <blockquote className="min-h-[180px] text-balance font-serif text-3xl font-medium leading-[1.25] md:text-[2.5rem] md:leading-[1.2]">
          &ldquo;{active.quote}&rdquo;
        </blockquote>
        <div className="mt-8">
          <p className="font-medium">{active.name}</p>
          <p className="text-sm text-primary-foreground/60">{active.location}</p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex size-11 items-center justify-center rounded-full border border-primary-foreground/25 transition-colors hover:bg-primary-foreground/10"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-primary-foreground' : 'w-1.5 bg-primary-foreground/30'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex size-11 items-center justify-center rounded-full border border-primary-foreground/25 transition-colors hover:bg-primary-foreground/10"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
