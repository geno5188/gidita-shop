import { Router, type Request, type Response } from 'express'
import { pool } from '../config/db'

export const productsRouter = Router()

type ProductRow = {
  id: string
  handle: string
  name: string
  tag: string | null
  description: string | null
  price: string
  compareAtPrice: string | null
  image: string | null
  images: string[] | null
  status: string
  createdAt: string
  collectionHandles?: string[]
}

function mapProduct(r: ProductRow) {
  return {
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
  }
}

const PRODUCT_SELECT = `
  SELECT p.*,
    COALESCE(
      array_agg(c.handle) FILTER (WHERE c.handle IS NOT NULL), '{}'
    ) AS "collectionHandles"
  FROM products p
  LEFT JOIN product_collections pc ON pc."productId" = p.id
  LEFT JOIN collections c ON c.id = pc."collectionId"
`

productsRouter.get('/', async (_req: Request, res: Response) => {
  const { rows } = await pool.query(
    `${PRODUCT_SELECT} GROUP BY p.id ORDER BY p."createdAt" DESC`,
  )
  res.json(rows.map(mapProduct))
})

productsRouter.get('/:handle', async (req: Request, res: Response) => {
  const { rows } = await pool.query(
    `${PRODUCT_SELECT} WHERE p.handle = $1 GROUP BY p.id`,
    [req.params.handle],
  )
  if (!rows.length) return res.status(404).json({ error: 'Product not found' })
  res.json(mapProduct(rows[0]))
})
