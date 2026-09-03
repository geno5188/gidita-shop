import { Router, type Request, type Response } from 'express'
import { pool } from '../config/db'

export const collectionsRouter = Router()

type CollectionRow = {
  id: string
  handle: string
  name: string
  description: string | null
  image: string | null
  createdAt: string
  productCount?: string
}

function mapCollection(r: CollectionRow) {
  return {
    id: r.id,
    handle: r.handle,
    name: r.name,
    description: r.description,
    image: r.image,
    productCount: r.productCount != null ? Number(r.productCount) : 0,
  }
}

collectionsRouter.get('/', async (_req: Request, res: Response) => {
  const { rows } = await pool.query(
    `SELECT c.*, COUNT(pc."productId")::int AS "productCount"
     FROM collections c
     LEFT JOIN product_collections pc ON pc."collectionId" = c.id
     GROUP BY c.id
     ORDER BY c."createdAt"`,
  )
  res.json(rows.map(mapCollection))
})

collectionsRouter.get('/:handle', async (req: Request, res: Response) => {
  const colRes = await pool.query(
    `SELECT c.*, COUNT(pc."productId")::int AS "productCount"
     FROM collections c
     LEFT JOIN product_collections pc ON pc."collectionId" = c.id
     WHERE c.handle = $1
     GROUP BY c.id`,
    [req.params.handle],
  )
  if (!colRes.rows.length) return res.status(404).json({ error: 'Collection not found' })

  const prodRes = await pool.query(
    `SELECT p.*,
       COALESCE(array_agg(cc.handle) FILTER (WHERE cc.handle IS NOT NULL), '{}') AS "collectionHandles"
     FROM products p
     JOIN product_collections pc ON pc."productId" = p.id
     LEFT JOIN collections cc ON cc.id = pc."collectionId"
     WHERE pc."collectionId" = $1
     GROUP BY p.id
     ORDER BY p."createdAt" DESC`,
    [colRes.rows[0].id],
  )

  const products = prodRes.rows.map((r) => ({
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

  res.json({ ...mapCollection(colRes.rows[0]), products })
})
