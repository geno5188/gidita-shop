import { Router, type Request, type Response } from 'express'
import { z } from 'zod'
import { pool } from '../config/db'
import { env } from '../config/env'
import { requireAdmin, signAdminToken } from '../middleware/auth'

export const adminRouter = Router()

/* ---------------- Auth ---------------- */

const loginInput = z.object({ password: z.string() })

adminRouter.post('/login', async (req: Request, res: Response) => {
  const parsed = loginInput.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Password required' })
  if (parsed.data.password !== env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' })
  }
  res.json({ token: signAdminToken() })
})

/* ---------------- Products (admin) ---------------- */

const adminProductsRouter = Router()
adminProductsRouter.use(requireAdmin)

const productInput = z.object({
  name: z.string().min(1),
  handle: z.string().optional(),
  tag: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  price: z.number().min(0),
  compareAtPrice: z.number().nullable().optional(),
  image: z.string().nullable().optional(),
  images: z.array(z.string()).optional(),
  status: z.enum(['active', 'draft']).default('active'),
  collectionHandles: z.array(z.string()).default([]),
})

async function linkCollections(productId: string, handles: string[]) {
  if (!handles.length) return
  const placeholders = handles
    .map((_, i) => `($1, (SELECT id FROM collections WHERE handle = $${i + 2}))`)
    .join(', ')
  await pool.query(
    `INSERT INTO product_collections ("productId", "collectionId")
     VALUES ${placeholders}
     ON CONFLICT DO NOTHING`,
    [productId, ...handles],
  )
}

adminProductsRouter.get('/', async (_req: Request, res: Response) => {
  const { rows } = await pool.query(
    `SELECT p.*,
       COALESCE(array_agg(c.handle) FILTER (WHERE c.handle IS NOT NULL), '{}') AS "collectionHandles"
     FROM products p
     LEFT JOIN product_collections pc ON pc."productId" = p.id
     LEFT JOIN collections c ON c.id = pc."collectionId"
     GROUP BY p.id ORDER BY p."createdAt" DESC`,
  )
  const mapped = rows.map((r: any) => ({
    id: r.id,
    handle: r.handle,
    name: r.name,
    tag: r.tag,
    description: r.description,
    price: Number(r.price),
    compareAtPrice: r.compareAtPrice != null ? Number(r.compareAtPrice) : null,
    image: r.image,
    images: r.images ?? (r.image ? [r.image] : []),
    collectionHandles: r.collectionHandles ?? [],
    status: r.status,
    createdAt: r.createdAt,
  }))
  res.json(mapped)
})

adminProductsRouter.post('/', async (req: Request, res: Response) => {
  const parsed = productInput.parse(req.body)
  const handle = parsed.handle?.trim() || parsed.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const images = parsed.images?.length ? parsed.images : parsed.image ? [parsed.image] : []

  const result = await pool.query(
    `INSERT INTO products (handle, name, tag, description, price, "compareAtPrice", image, images, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (handle) DO UPDATE SET
       name = EXCLUDED.name, tag = EXCLUDED.tag, description = EXCLUDED.description,
       price = EXCLUDED.price, "compareAtPrice" = EXCLUDED."compareAtPrice",
       image = EXCLUDED.image, images = EXCLUDED.images, status = EXCLUDED.status
     RETURNING id`,
    [
      handle,
      parsed.name,
      parsed.tag ?? null,
      parsed.description ?? null,
      parsed.price,
      parsed.compareAtPrice ?? null,
      parsed.image ?? null,
      images,
      parsed.status,
    ],
  )
  const productId = result.rows[0].id
  await pool.query('DELETE FROM product_collections WHERE "productId" = $1', [productId])
  await linkCollections(productId, parsed.collectionHandles)
  res.status(201).json({ id: productId, handle })
})

adminProductsRouter.put('/:id', async (req: Request, res: Response) => {
  const parsed = productInput.parse(req.body)
  const images = parsed.images?.length ? parsed.images : parsed.image ? [parsed.image] : []
  const result = await pool.query(
    `UPDATE products SET
       name = $2, tag = $3, description = $4, price = $5, "compareAtPrice" = $6,
       image = $7, images = $8, status = $9
     WHERE id = $1 RETURNING id`,
    [
      req.params.id,
      parsed.name,
      parsed.tag ?? null,
      parsed.description ?? null,
      parsed.price,
      parsed.compareAtPrice ?? null,
      parsed.image ?? null,
      images,
      parsed.status,
    ],
  )
  if (!result.rows.length) return res.status(404).json({ error: 'Product not found' })
  await pool.query('DELETE FROM product_collections WHERE "productId" = $1', [req.params.id])
  await linkCollections(req.params.id, parsed.collectionHandles)
  res.json({ id: req.params.id })
})

adminProductsRouter.delete('/:id', async (req: Request, res: Response) => {
  const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [req.params.id])
  if (!result.rows.length) return res.status(404).json({ error: 'Product not found' })
  res.json({ success: true })
})

adminRouter.use('/products', adminProductsRouter)

/* ---------------- Collections (admin) ---------------- */

const adminCollectionsRouter = Router()
adminCollectionsRouter.use(requireAdmin)

const collectionInput = z.object({
  name: z.string().min(1),
  handle: z.string().optional(),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
})

adminCollectionsRouter.get('/', async (_req: Request, res: Response) => {
  const { rows } = await pool.query(
    `SELECT c.*, COUNT(pc."productId")::int AS "productCount"
     FROM collections c
     LEFT JOIN product_collections pc ON pc."collectionId" = c.id
     GROUP BY c.id ORDER BY c."createdAt"`,
  )
  res.json(
    rows.map((r: any) => ({
      id: r.id,
      handle: r.handle,
      name: r.name,
      description: r.description,
      image: r.image,
      productCount: Number(r.productCount),
    })),
  )
})

adminCollectionsRouter.post('/', async (req: Request, res: Response) => {
  const parsed = collectionInput.parse(req.body)
  const handle = parsed.handle?.trim() || parsed.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const result = await pool.query(
    `INSERT INTO collections (handle, name, description, image)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (handle) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, image = EXCLUDED.image
     RETURNING id, handle`,
    [handle, parsed.name, parsed.description ?? null, parsed.image ?? null],
  )
  res.status(201).json({ id: result.rows[0].id, handle: result.rows[0].handle })
})

adminCollectionsRouter.put('/:id', async (req: Request, res: Response) => {
  const parsed = collectionInput.parse(req.body)
  const result = await pool.query(
    `UPDATE collections SET name = $2, description = $3, image = $4 WHERE id = $1 RETURNING id`,
    [req.params.id, parsed.name, parsed.description ?? null, parsed.image ?? null],
  )
  if (!result.rows.length) return res.status(404).json({ error: 'Collection not found' })
  res.json({ id: req.params.id })
})

adminCollectionsRouter.delete('/:id', async (req: Request, res: Response) => {
  const result = await pool.query('DELETE FROM collections WHERE id = $1 RETURNING id', [req.params.id])
  if (!result.rows.length) return res.status(404).json({ error: 'Collection not found' })
  res.json({ success: true })
})

adminRouter.use('/collections', adminCollectionsRouter)
