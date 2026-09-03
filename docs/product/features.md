# GIDITA — Garden Living Storefront & Admin

A luxury garden-stone brand website (fountains, planters, statuary) with a
Shopify/Medusa-style backend for managing the catalogue.

## Storefront (Customer-facing)
- **Immersive home page** — hero, brand philosophy, craftsmanship, collections,
  featured pieces, services, lookbook gallery, testimonials, journal signup.
- **Catalogue (/shop)** — filter products by collection; responsive product grid.
- **Product detail (/product/:handle)** — imagery, price, description, related pieces.
- **Design system** — warm ivory / olive / terracotta palette, Playfair Display +
  Inter typography, consistent with the original brand.

## Backend (Shopify-like, Medusa-inspired)
- **Products & Collections** data model in managed PostgreSQL.
- **Public Store API** — list/get products and collections, with product counts.
- **Admin API** — authenticated CRUD for products and collections.
- **Seeded catalogue** — the original GIDITA pieces are pre-loaded.

## Admin Panel (/admin)
- **Login** — password-protected store admin.
- **Dashboard** — catalogue stats and recent items.
- **Products management** — create / edit / delete, link to collections, set status.
- **Collections management** — create / edit / delete curated collections.
