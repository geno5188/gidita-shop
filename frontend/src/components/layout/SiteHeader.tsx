import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Search, ShoppingBag } from 'lucide-react'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/#collections' },
  { label: 'The Craft', href: '/#atelier' },
  { label: 'Services', href: '/#services' },
  { label: 'Lookbook', href: '/#lifestyle' },
  { label: 'Journal', href: '/#journal' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <div className="flex flex-1 items-center gap-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`md:hidden ${scrolled ? 'text-foreground' : 'text-background'}`}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-60 ${
                  scrolled ? 'text-foreground' : 'text-background'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <Link
          to="/"
          className={`flex flex-col items-center leading-none transition-colors ${
            scrolled ? 'text-foreground' : 'text-background'
          }`}
        >
          <span className="font-serif text-2xl font-semibold tracking-[0.3em] md:text-[28px]">
            GIDITA
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.4em] opacity-70">
            Garden Living
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-5">
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.slice(3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-60 ${
                  scrolled ? 'text-foreground' : 'text-background'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Search"
            className={`transition-opacity hover:opacity-60 ${scrolled ? 'text-foreground' : 'text-background'}`}
          >
            <Search className="size-[18px]" />
          </button>
          <Link
            to="/shop"
            aria-label="Cart"
            className={`transition-opacity hover:opacity-60 ${scrolled ? 'text-foreground' : 'text-background'}`}
          >
            <ShoppingBag className="size-[18px]" />
          </Link>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-primary text-primary-foreground md:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <span className="font-serif text-2xl font-semibold tracking-[0.3em]">GIDITA</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="size-6" />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-1 px-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-primary-foreground/15 py-4 font-serif text-2xl"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
