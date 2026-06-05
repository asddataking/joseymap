# JoseyMap

A mobile-first companion app for physical cannabis treasure map events. Users pick up a map in-store, then use JoseyMap to track dispensary stops, check in, redeem offers, and leave Google reviews.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (PostgreSQL + auth-ready)
- Deploy-ready for **Vercel**

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (admin analytics only) |
| `ADMIN_PASSWORD` | Password for `/admin` dashboard |

**Without env vars**, the app runs with built-in mock data — great for local UI development.

### 3. Database setup

If using Supabase, apply the migration:

```bash
# Via Supabase CLI (linked project)
supabase db push

# Or run the SQL manually in the Supabase SQL editor:
# supabase/migrations/20250604000000_initial_schema.sql
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with active event cards |
| `/events/[slug]` | Event map with dispensary stops |
| `/events/[slug]/stops/[id]` | Stop detail with actions |
| `/admin` | Password-protected analytics dashboard |

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.example`
4. Deploy

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & API routes
├── components/           # Reusable UI (EventCard, StopCard, etc.)
└── lib/
    ├── supabase/         # Supabase clients & types
    ├── data.ts           # Unified data layer (Supabase + mock fallback)
    └── mock-data.ts      # Demo data for offline dev
```
