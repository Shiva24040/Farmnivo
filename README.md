# FarmNivo — Serious Agriculture Platform Foundation

FarmNivo combines farm management, AI assistance, Crop Doctor, machinery, marketplace, community, livestock, reels, academy, schemes, services, calculators, weather integration points, search, notifications and farmer accounts.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### AI without API credits
Use:

```env
DEMO_MODE=true
```

Copilot and Crop Doctor then use a local agriculture fallback so you can build and demonstrate the product without spending API credits.

### Real AI
Set `DEMO_MODE=false` and provide a valid provider key in `.env.local`. Never expose or commit that key.

## Included

- Farmer dashboard and persistent local development data
- Farm and crop records
- Local account/login foundation with HTTP-only session cookie
- AI Farm Copilot with provider + local fallback architecture
- AI Crop Doctor vision workflow
- Machinery and marketplace CRUD APIs
- Community and livestock APIs
- AgriReels creation/read API
- Academy, schemes and services workspaces
- Farm calculators
- Search and notifications
- Weather provider integration point
- Prisma PostgreSQL schema for production migration

## Production work still required

Before public launch, replace local JSON persistence with PostgreSQL/Prisma repositories, use a production identity provider, add object storage for images/videos, connect verified weather/market/scheme sources, implement moderation/rate limits/audit logs, add payments only through appropriate compliant providers, configure backups/monitoring, write automated tests and deploy with secret management.

This is a serious development foundation, not a claim that every external integration or production compliance requirement is already complete.
