import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import {
  adminGetCollections,
  adminCreateCollection,
  adminUpdateCollection,
  adminDeleteCollection,
} from '@/lib/api'
import type { Collection } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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

interface FormState {
  id?: string
  name: string
  handle: string
  description: string
  image: string
}

const emptyForm: FormState = { name: '', handle: '', description: '', image: '' }

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<FormState | null>(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    adminGetCollections()
      .then(setCollections)
      .catch(() => toast.error('Failed to load collections'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const openNew = () => setEditing({ ...emptyForm })
  const openEdit = (c: Collection) =>
    setEditing({
      id: c.id,
      name: c.name,
      handle: c.handle,
      description: c.description ?? '',
      image: c.image ?? '',
    })

  const save = async () => {
    if (!editing) return
    if (!editing.name.trim()) return toast.error('Name is required')
    const handle = editing.handle.trim() || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const payload = {
      name: editing.name,
      handle,
      description: editing.description || null,
      image: editing.image || null,
    }
    setSaving(true)
    try {
      if (editing.id) {
        await adminUpdateCollection(editing.id, payload)
        toast.success('Collection updated')
      } else {
        await adminCreateCollection(payload)
        toast.success('Collection created')
      }
      setEditing(null)
      load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (c: Collection) => {
    if (!confirm(`Delete "${c.name}"?`)) return
    try {
      await adminDeleteCollection(c.id)
      toast.success('Collection deleted')
      load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Delete failed')
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Collections</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Group your pieces into curated collections
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="size-4" /> New collection
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Collection</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-center text-muted-foreground">
                  Loading…
                </TableCell>
              </TableRow>
            ) : collections.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-center text-muted-foreground">
                  No collections yet.
                </TableCell>
              </TableRow>
            ) : (
              collections.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={c.image || '/placeholder.svg'} alt="" className="size-11 rounded-sm object-cover" />
                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">/{c.handle}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md text-sm text-muted-foreground">
                    {c.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(c)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => remove(c)}>
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing?.id ? 'Edit collection' : 'New collection'}</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cname">Name</Label>
                <Input
                  id="cname"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  placeholder="e.g. Fountains"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chandle">Handle (URL slug)</Label>
                <Input
                  id="chandle"
                  value={editing.handle}
                  onChange={(e) => setEditing({ ...editing, handle: e.target.value })}
                  placeholder="auto from name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cimage">Image path / URL</Label>
                <Input
                  id="cimage"
                  value={editing.image}
                  onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                  placeholder="/images/collection-fountains.png"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cdesc">Description</Label>
                <Textarea
                  id="cdesc"
                  rows={3}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save collection'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
