import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import {
  adminGetProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminGetCollections,
  formatPrice,
} from '@/lib/api'
import type { Collection, Product } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FormState {
  id?: string
  name: string
  handle: string
  tag: string
  price: string
  compareAtPrice: string
  description: string
  image: string
  status: 'active' | 'draft'
  collectionHandles: string[]
}

const emptyForm: FormState = {
  name: '',
  handle: '',
  tag: '',
  price: '',
  compareAtPrice: '',
  description: '',
  image: '',
  status: 'active',
  collectionHandles: [],
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<FormState | null>(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    Promise.all([adminGetProducts(), adminGetCollections()])
      .then(([p, c]) => {
        setProducts(p)
        setCollections(c)
      })
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const openNew = () => setEditing({ ...emptyForm })
  const openEdit = (p: Product) =>
    setEditing({
      id: p.id,
      name: p.name,
      handle: p.handle,
      tag: p.tag ?? '',
      price: String(p.price),
      compareAtPrice: p.compareAtPrice ? String(p.compareAtPrice) : '',
      description: p.description ?? '',
      image: p.image ?? '',
      status: p.status,
      collectionHandles: p.collectionHandles,
    })

  const save = async () => {
    if (!editing) return
    if (!editing.name.trim()) return toast.error('Name is required')
    const handle = editing.handle.trim() || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const payload = {
      name: editing.name,
      handle,
      tag: editing.tag || null,
      price: Number(editing.price) || 0,
      compareAtPrice: editing.compareAtPrice ? Number(editing.compareAtPrice) : null,
      description: editing.description || null,
      image: editing.image || null,
      status: editing.status,
      collectionHandles: editing.collectionHandles,
    }
    setSaving(true)
    try {
      if (editing.id) {
        await adminUpdateProduct(editing.id, payload)
        toast.success('Product updated')
      } else {
        await adminCreateProduct(payload)
        toast.success('Product created')
      }
      setEditing(null)
      load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (p: Product) => {
    if (!confirm(`Delete "${p.name}"?`)) return
    try {
      await adminDeleteProduct(p.id)
      toast.success('Product deleted')
      load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Delete failed')
    }
  }

  const toggleCollection = (handle: string) => {
    if (!editing) return
    setEditing({
      ...editing,
      collectionHandles: editing.collectionHandles.includes(handle)
        ? editing.collectionHandles.filter((h) => h !== handle)
        : [...editing.collectionHandles, handle],
    })
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} pieces in your catalogue
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="size-4" /> New product
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Search className="size-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="max-w-xs"
        />
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Collections</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  Loading…
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={p.image || '/placeholder.svg'} alt="" className="size-11 rounded-sm object-cover" />
                      <div>
                        <p className="font-medium text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">/{p.handle}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{formatPrice(p.price)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {p.collectionHandles.join(', ') || '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={p.status === 'active' ? 'default' : 'secondary'}>
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => remove(p)}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? 'Edit product' : 'New product'}</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  placeholder="e.g. Provence Tiered Fountain"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="handle">Handle (URL slug)</Label>
                  <Input
                    id="handle"
                    value={editing.handle}
                    onChange={(e) => setEditing({ ...editing, handle: e.target.value })}
                    placeholder="auto from name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tag">Tag</Label>
                  <Input
                    id="tag"
                    value={editing.tag}
                    onChange={(e) => setEditing({ ...editing, tag: e.target.value })}
                    placeholder="Bestseller, New…"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                    placeholder="2480"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compare">Compare-at price</Label>
                  <Input
                    id="compare"
                    type="number"
                    value={editing.compareAtPrice}
                    onChange={(e) => setEditing({ ...editing, compareAtPrice: e.target.value })}
                    placeholder="optional"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image path / URL</Label>
                <Input
                  id="image"
                  value={editing.image}
                  onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                  placeholder="/images/product-fountain.png"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  rows={3}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={editing.status}
                  onValueChange={(v) => setEditing({ ...editing, status: v as 'active' | 'draft' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Collections</Label>
                <div className="flex flex-wrap gap-2">
                  {collections.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCollection(c.handle)}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        editing.collectionHandles.includes(c.handle)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-foreground hover:bg-secondary'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                  {collections.length === 0 && (
                    <span className="text-xs text-muted-foreground">No collections yet</span>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
