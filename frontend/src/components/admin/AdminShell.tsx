import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, FolderTree, LogOut } from 'lucide-react'
import { clearAdminToken, getAdminToken } from '@/lib/api'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package, end: false },
  { to: '/admin/collections', label: 'Collections', icon: FolderTree, end: false },
]

export function AdminShell() {
  const navigate = useNavigate()
  if (!getAdminToken()) return <Navigate to="/admin/login" replace />

  const logout = () => {
    clearAdminToken()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="flex w-60 shrink-0 flex-col bg-primary text-primary-foreground">
        <div className="border-b border-primary-foreground/15 px-6 py-5">
          <span className="font-serif text-xl tracking-[0.2em]">GIDITA</span>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Admin</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-foreground/15 text-primary-foreground'
                    : 'text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                }`
              }
            >
              <item.icon className="size-4" />
              {item.label}
            </NavLink>
          ))}
          <a
            href="/"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            View storefront ↗
          </a>
        </nav>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 border-t border-primary-foreground/15 px-6 py-4 text-sm font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground"
        >
          <LogOut className="size-4" /> Log out
        </button>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
