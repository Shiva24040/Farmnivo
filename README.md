# Rythu Nestham — Pan-India Farmer Super Platform

Rythu Nestham combines farmer workflows that would otherwise be spread across separate tools: farm management, crops, AI Crop Doctor, AI Farm Copilot, weather, market intelligence, marketplace, machinery, livestock, services, government schemes, community, AgriReels, IoT, calculators, tasks, soil, inputs, finance, insurance, academy, expert requests, orders and notifications.

## Technology
- Next.js + React
- PostgreSQL + Prisma
- Server-side authentication with HTTP-only sessions
- OpenAI Responses API + hosted web search
- Open-Meteo weather/geocoding
- Authenticated IoT ingestion endpoint

## Setup

Copy `.env.example` to `.env.local` and configure the real values:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name initial
npx prisma db seed
npm run typecheck
npm run build
npm run dev
```

Then open `http://localhost:3000`.

## Important
The code contains no bundled OpenAI key, database password, storage secret or fake AI answer. A live deployment must provide the required credentials and external services. Government scheme information should always be verified against the current official source; the application stores official source links and can use OpenAI web search for current discovery.
