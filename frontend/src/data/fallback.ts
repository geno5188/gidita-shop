import type { Collection, Product } from '@/lib/types'

// Static fallback content so the storefront always renders, even before the
// backend is connected or seeded. Mirrors the original GIDITA marketing site.
export const fallbackProducts: Product[] = [
  {
    id: 'p-1',
    handle: 'provence-tiered-fountain',
    name: 'Provence Tiered Fountain',
    tag: 'Bestseller',
    description:
      'A three-tier centre-piece fountain in hand-cast natural stone, finished to age gracefully in any garden.',
    price: 2480,
    compareAtPrice: null,
    image: '/images/product-fountain.png',
    images: ['/images/product-fountain.png'],
    collectionHandles: ['fountains'],
    status: 'active',
    createdAt: '2025-01-10T00:00:00.000Z',
  },
  {
    id: 'p-2',
    handle: 'toscana-urn-planter',
    name: 'Toscana Urn Planter',
    tag: 'New',
    description:
      'A classical urn planter with a weathered patina — perfect for topiary, blooms and terrace grandeur.',
    price: 640,
    compareAtPrice: null,
    image: '/images/product-planter.png',
    images: ['/images/product-planter.png'],
    collectionHandles: ['planters-urns'],
    status: 'active',
    createdAt: '2025-02-02T00:00:00.000Z',
  },
  {
    id: 'p-3',
    handle: 'athena-cast-stone-statue',
    name: 'Athena Cast-Stone Statue',
    tag: 'Signed edition',
    description:
      'A signed cast-stone figure with an aged patina, drawn from classical European gardens.',
    price: 1190,
    compareAtPrice: null,
    image: '/images/product-statue.png',
    images: ['/images/product-statue.png'],
    collectionHandles: ['statuary-decor'],
    status: 'active',
    createdAt: '2025-01-20T00:00:00.000Z',
  },
  {
    id: 'p-4',
    handle: 'lucca-wall-fountain',
    name: 'Lucca Wall Fountain',
    tag: 'Contemporary',
    description:
      'A space-saving wall fountain that brings the movement of water to courtyards and smaller terraces.',
    price: 1850,
    compareAtPrice: null,
    image: '/images/product-wall-fountain.png',
    images: ['/images/product-wall-fountain.png'],
    collectionHandles: ['fountains'],
    status: 'active',
    createdAt: '2025-03-01T00:00:00.000Z',
  },
]

export const fallbackCollections: Collection[] = [
  {
    id: 'c-1',
    handle: 'fountains',
    name: 'Fountains',
    description:
      'Tiered, wall & pond fountains that turn any garden into a sanctuary.',
    image: '/images/collection-fountains.png',
    productCount: 42,
  },
  {
    id: 'c-2',
    handle: 'planters-urns',
    name: 'Planters & Urns',
    description:
      'Hand-cast stone vessels for topiary, blooms and terrace grandeur.',
    image: '/images/collection-planters.png',
    productCount: 68,
  },
  {
    id: 'c-3',
    handle: 'statuary-decor',
    name: 'Statuary & Décor',
    description:
      'Classical figures, birdbaths and finials with an aged patina.',
    image: '/images/collection-statuary.png',
    productCount: 55,
  },
]
