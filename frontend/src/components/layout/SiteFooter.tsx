const columns = [
  {
    title: 'Collections',
    links: ['Fountains', 'Planters & Urns', 'Statuary', 'Birdbaths', 'New Arrivals'],
  },
  {
    title: 'The House',
    links: ['Our Philosophy', 'Craftsmanship', 'Materials & Care', 'Journal', 'Sustainability'],
  },
  {
    title: 'Services',
    links: ['Design Consultation', 'Bespoke Commissions', 'Trade & Professional', 'Delivery & Installation', 'Contact'],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <span className="font-serif text-3xl font-semibold tracking-[0.2em]">GIDITA</span>
            <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-primary-foreground/60">
              Garden Living
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              A garden lifestyle house creating timeless fountains and décor in
              natural stone — composing elegant outdoor spaces the world over.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/85 transition-opacity hover:opacity-60"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-8 text-xs text-primary-foreground/60 md:flex-row">
          <p>&copy; {new Date().getFullYear()} GIDITA Garden Living. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-opacity hover:opacity-60">Privacy</a>
            <a href="#" className="transition-opacity hover:opacity-60">Terms</a>
            <a href="#" className="transition-opacity hover:opacity-60">Trade Enquiries</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
