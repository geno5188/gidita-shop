import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section id="journal" className="relative overflow-hidden">
      <img
        src="/images/garden-pathway.png"
        alt="A misty formal garden pathway lined with stone planters and lavender leading to a fountain"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/65" />

      <div className="relative z-10 mx-auto max-w-2xl px-5 py-24 text-center text-background md:px-8 md:py-32">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-background/80">
          The GIDITA Journal
        </p>
        <h2 className="text-balance font-serif text-4xl font-medium leading-[1.1] md:text-5xl">
          New pieces, garden inspiration &amp; private previews
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-pretty leading-relaxed text-background/85">
          Join our list for seasonal releases and design ideas for living
          beautifully outdoors. Enjoy 10% off your first fountain.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="h-12 flex-1 rounded-sm border border-background/30 bg-background/10 px-4 text-sm text-background placeholder:text-background/60 backdrop-blur-sm outline-none transition-colors focus:border-background/70"
          />
          <button
            type="submit"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-background px-6 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {submitted ? (
              <>
                Subscribed
                <Check className="size-4" />
              </>
            ) : (
              <>
                Subscribe
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
        {submitted && (
          <p className="mt-4 text-sm text-background/90">
            Welcome to the garden — check your inbox for your discount.
          </p>
        )}
      </div>
    </section>
  )
}
