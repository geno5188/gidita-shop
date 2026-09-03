import { Pool } from 'pg'
import { env } from './env'

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handle TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handle TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tag TEXT,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  "compareAtPrice" NUMERIC(10,2),
  image TEXT,
  images TEXT[],
  status TEXT NOT NULL DEFAULT 'active',
  "createdAt" TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_collections (
  "productId" UUID REFERENCES products(id) ON DELETE CASCADE,
  "collectionId" UUID REFERENCES collections(id) ON DELETE CASCADE,
  PRIMARY KEY ("productId", "collectionId")
);
`

const SEED_COLLECTIONS = [
  {
    handle: 'fountains',
    name: 'Fountains',
    description: 'Tiered, wall & pond fountains that turn any garden into a sanctuary.',
    image: '/images/collection-fountains.png',
  },
  {
    handle: 'planters-urns',
    name: 'Planters & Urns',
    description: 'Hand-cast stone vessels for topiary, blooms and terrace grandeur.',
    image: '/images/collection-planters.png',
  },
  {
    handle: 'statuary-decor',
    name: 'Statuary & Décor',
    description: 'Classical figures, birdbaths and finials with an aged patina.',
    image: '/images/collection-statuary.png',
  },
]

const SEED_PRODUCTS = [
  {
    handle: 'provence-tiered-fountain',
    name: 'Provence Tiered Fountain',
    tag: 'Bestseller',
    description:
      'A three-tier centre-piece fountain in hand-cast natural stone, finished to age gracefully in any garden.',
    price: 2480,
    image: '/images/product-fountain.png',
    collections: ['fountains'],
  },
  {
    handle: 'toscana-urn-planter',
    name: 'Toscana Urn Planter',
    tag: 'New',
    description:
      'A classical urn planter with a weathered patina — perfect for topiary, blooms and terrace grandeur.',
    price: 640,
    image: '/images/product-planter.png',
    collections: ['planters-urns'],
  },
  {
    handle: 'athena-cast-stone-statue',
    name: 'Athena Cast-Stone Statue',
    tag: 'Signed edition',
    description:
      'A signed cast-stone figure with an aged patina, drawn from classical European gardens.',
    price: 1190,
    image: '/images/product-statue.png',
    collections: ['statuary-decor'],
  },
  {
    handle: 'lucca-wall-fountain',
    name: 'Lucca Wall Fountain',
    tag: 'Contemporary',
    description:
      'A space-saving wall fountain that brings the movement of water to courtyards and smaller terraces.',
    price: 1850,
    image: '/images/product-wall-fountain.png',
    collections: ['fountains'],
  },
]

export async function ensureSchema(): Promise<void> {
  await pool.query(SCHEMA_SQL)
}

export async function seedIfEmpty(): Promise<void> {
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM products')
  if (rows[0].count > 0) return

  for (const c of SEED_COLLECTIONS) {
    await pool.query(
      `INSERT INTO collections (handle, name, description, image)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (handle) DO NOTHING`,
      [c.handle, c.name, c.description, c.image],
    )
  }

  for (const p of SEED_PRODUCTS) {
    const res = await pool.query(
      `INSERT INTO products (handle, name, tag, description, price, image, images, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'active')
       ON CONFLICT (handle) DO NOTHING
       RETURNING id`,
      [p.handle, p.name, p.tag, p.description, p.price, p.image, [p.image]],
    )
    const productId = res.rows[0]?.id
    if (productId) {
      for (const handle of p.collections) {
        await pool.query(
          `INSERT INTO product_collections ("productId", "collectionId")
           SELECT $1, id FROM collections WHERE handle = $2
           ON CONFLICT DO NOTHING`,
          [productId, handle],
        )
      }
    }
  }
  console.log('✅ Seeded GIDITA catalogue')
}

export async function shutdown(): Promise<void> {
  await pool.end()
}
