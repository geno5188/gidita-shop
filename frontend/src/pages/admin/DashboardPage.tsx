import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, FolderTree, ArrowUpRight, Plus } from 'lucide-react'
import { getAdminToken, adminGetProducts, adminGetCollections } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/api'
import type { Collection, Product } from '@/lib/types'

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    adminGetProducts().then(setProducts).catch(() => {})
    adminGetCollections().then(setCollections).catch(() => {})
  }, [])

  const active = products.filter((p) => p.status === 'active').length
  const inventoryValue = products.reduce((sum, p) => sum + p.price, 0)

  const stats = [
    { label: 'Products', value: products.length, sub: `${active} active`, icon: Package },
    { label: 'Collections', value: collections.length, sub: 'curated', icon: FolderTree },
    { label: 'Catalogue value', value: formatPrice(inventoryValue), sub: 'list price total', icon: ArrowUpRight },
  ]

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back. Manage your GIDITA storefront.
          </p>
        </div>
        <Link to="/admin/products">
          <Button>
            <Plus className="size-4" /> Add product
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                <s.icon className="size-5" />
              </span>
              <div>
                <p className="text-2xl font-semibold text-foreground">{s.value}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl text-foreground">Recent products</h2>
              <Link to="/admin/products" className="text-xs uppercase tracking-[0.14em] text-accent hover:opacity-70">
                Manage
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {products.slice(0, 5).map((p) => (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <img src={p.image || '/placeholder.svg'} alt="" className="size-10 rounded-sm object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{formatPrice(p.price)}</p>
                  </div>
                  <span className={`text-xs ${p.status === 'active' ? 'text-primary' : 'text-muted-foreground'}`}>
                    {p.status}
                  </span>
                </li>
              ))}
              {products.length === 0 && (
                <li className="py-6 text-center text-sm text-muted-foreground">No products yet.</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl text-foreground">Collections</h2>
              <Link to="/admin/collections" className="text-xs uppercase tracking-[0.14em] text-accent hover:opacity-70">
                Manage
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {collections.map((c) => (
                <li key={c.id} className="flex items-center gap-3 py-3">
                  <img src={c.image || '/placeholder.svg'} alt="" className="size-10 rounded-sm object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.description}</p>
                  </div>
                </li>
              ))}
              {collections.length === 0 && (
                <li className="py-6 text-center text-sm text-muted-foreground">No collections yet.</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Signed in as store admin · token {getAdminToken()?.slice(0, 8)}…
      </p>
    </div>
  )
}
