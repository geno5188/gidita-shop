import type {
  AdminAuth,
  Collection,
  CollectionWithProducts,
  Product,
} from '@/lib/types'
import { fallbackCollections, fallbackProducts } from '@/data/fallback'

const BASE = '/api'

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error || `Request failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

/* ----------------------------------------------------------------
 * Storefront (public) API — falls back to static content on error
 * ---------------------------------------------------------------- */

export async function getCollections(): Promise<Collection[]> {
  try {
    const data = await http<Collection[]>('/collections')
    return data.length ? data : fallbackCollections
  } catch {
    return fallbackCollections
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await http<Product[]>('/products')
    return data.length ? data : fallbackProducts
  } catch {
    return fallbackProducts
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  try {
    return await http<Product>(`/products/${handle}`)
  } catch {
    return fallbackProducts.find((p) => p.handle === handle) ?? null
  }
}

export async function getCollection(
  handle: string,
): Promise<CollectionWithProducts | null> {
  try {
    return await http<CollectionWithProducts>(`/collections/${handle}`)
  } catch {
    const col = fallbackCollections.find((c) => c.handle === handle)
    if (!col) return null
    return {
      ...col,
      products: fallbackProducts.filter((p) =>
        p.collectionHandles.includes(handle),
      ),
    }
  }
}

/* ----------------------------------------------------------------
 * Admin API
 * ---------------------------------------------------------------- */

const ADMIN_TOKEN_KEY = 'gidita_admin_token'

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY)
}

export function setAdminToken(token: string) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token)
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
}

export async function adminLogin(password: string): Promise<AdminAuth> {
  const data = await http<AdminAuth>('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
  setAdminToken(data.token)
  return data
}

function adminHeaders() {
  const token = getAdminToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function adminGetProducts(): Promise<Product[]> {
  return http<Product[]>('/admin/products', { headers: adminHeaders() })
}

export async function adminCreateProduct(
  input: Partial<Product>,
): Promise<Product> {
  return http<Product>('/admin/products', {
    method: 'POST',
    headers: adminHeaders(),
    body: JSON.stringify(input),
  })
}

export async function adminUpdateProduct(
  id: string,
  input: Partial<Product>,
): Promise<Product> {
  return http<Product>(`/admin/products/${id}`, {
    method: 'PUT',
    headers: adminHeaders(),
    body: JSON.stringify(input),
  })
}

export async function adminDeleteProduct(id: string): Promise<void> {
  await http<void>(`/admin/products/${id}`, {
    method: 'DELETE',
    headers: adminHeaders(),
  })
}

export async function adminGetCollections(): Promise<Collection[]> {
  return http<Collection[]>('/admin/collections', { headers: adminHeaders() })
}

export async function adminCreateCollection(
  input: Partial<Collection>,
): Promise<Collection> {
  return http<Collection>('/admin/collections', {
    method: 'POST',
    headers: adminHeaders(),
    body: JSON.stringify(input),
  })
}

export async function adminUpdateCollection(
  id: string,
  input: Partial<Collection>,
): Promise<Collection> {
  return http<Collection>(`/admin/collections/${id}`, {
    method: 'PUT',
    headers: adminHeaders(),
    body: JSON.stringify(input),
  })
}

export async function adminDeleteCollection(id: string): Promise<void> {
  await http<void>(`/admin/collections/${id}`, {
    method: 'DELETE',
    headers: adminHeaders(),
  })
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
