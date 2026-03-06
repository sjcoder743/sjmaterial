# SJMaterial

Modern premium ecommerce platform built with **Next.js 16 App Router**, **TypeScript**, **MongoDB/Mongoose**, **Tailwind CSS**, **Framer Motion**, and **Context API**.

## Features

- Product listing/details with server-side fetching, search, category filter, sort and pagination
- Featured products on home page
- Global cart state with localStorage persistence
- Multi-step checkout (address → payment → confirmation)
- Auth system (register/login/logout), signed cookie sessions, password hashing
- Admin dashboard for product and order management
- API routes for products, auth, checkout/orders, and admin operations
- Dark premium responsive UI with blue accents

## Folder Structure

```txt
src/
  app/
    admin/
    api/
    cart/
    checkout/
    login/
    products/
    register/
  components/
    cart/
    layout/
    sections/
    ui/
  context/
  lib/
  models/
  types/
```

## Environment Variables

Create `.env.local`:

```bash
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/sjmaterial
AUTH_SECRET=replace-with-strong-secret
```

## Development

```bash
npm run dev
```

## Seed Sample Products

```bash
curl http://localhost:3000/api/seed
```


## Common Local Issues

- **`/categories` returns 404**: pull latest changes and restart dev server; `/categories` page now exists.
- **MongoDB Atlas connection fails / whitelist error**: add your current IP in Atlas **Network Access** and verify `MONGODB_URI` in `.env.local`.
- If DB is unavailable, the app now shows fallback sample products so you can still preview the UI.

## Deployment Guide

1. Deploy to Vercel (recommended) or any Node.js platform.
2. Configure `MONGODB_URI` and `AUTH_SECRET` in environment variables.
3. Run build command:
   ```bash
   npm run build
   npm start
   ```
4. (Optional) Trigger `/api/seed` once in preview/dev to add sample products.

## Production Notes

- Rotate `AUTH_SECRET` regularly.
- Enforce HTTPS + secure cookies in production.
- Add request rate limiting and validation layer (e.g., Zod).
- Connect checkout to real payment gateway for ONLINE method.
