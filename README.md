# GIDITA — 独立站（官网 + Shopify 风格后台）

GIDITA 是一个高端园林 / 石材品牌的独立站，包含：
- **官网前台**（React + Vite）：首页 12 个版块、商品列表 `/shop`、商品详情 `/product/:handle`
- **Shopify / Medusa 风格后台**（Express + PostgreSQL）：商品与系列的增删改查、JWT 登录、数据看板

## 目录结构
```
frontend/   官网前端（React + Vite + Tailwind + shadcn/ui 风格组件）
backend/    后台 API（Express + pg + JWT），数据模型 products / collections / product_collections
.cloudstudio  Cloud Studio 服务定义
```

## 本地运行
```bash
# 后端
cd backend
cp .env.example .env   # 填入 DATABASE_URL / JWT_SECRET / ADMIN_PASSWORD
pnpm install
pnpm dev               # http://localhost:3000

# 前端
cd frontend
pnpm install
pnpm dev               # http://localhost:5173
```
后台入口：`/admin`，默认密码见 `.env` 的 `ADMIN_PASSWORD`（本仓库示例为占位值，请自行设置）。

## 公开接口
- `GET /api/products`、`GET /api/products/:handle`
- `GET /api/collections`、`GET /api/collections/:handle`

## 管理接口（需 JWT）
- `POST /api/admin/login`
- `GET/POST/PUT/DELETE /api/admin/products`
- `GET/POST/PUT/DELETE /api/admin/collections`

## 部署
- 前端可静态部署（Vercel / Netlify / Cloud Studio Deploy）
- 后端需 Node 运行环境 + PostgreSQL（建议 Supabase / Neon / 腾讯云 TCB）
