export interface Collection {
  id: string
  handle: string
  name: string
  description: string | null
  image: string | null
  productCount?: number
}

export interface Product {
  id: string
  handle: string
  name: string
  tag: string | null
  description: string | null
  price: number
  compareAtPrice: number | null
  image: string | null
  images: string[]
  collectionHandles: string[]
  status: 'active' | 'draft'
  createdAt: string
}

export interface CollectionWithProducts extends Collection {
  products: Product[]
}

export interface AdminAuth {
  token: string
}
