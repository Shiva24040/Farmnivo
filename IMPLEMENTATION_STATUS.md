# Rythu Nestham — implementation status

This build is designed as a real application, not a fake-answer demo. Core user data is persisted with PostgreSQL and the AI, weather, market research, authentication, tasks, orders, bookings, finance, insurance, soil, inputs, community, reels, schemes and notifications are wired as application workflows.

## Real integrations in the code
- PostgreSQL + Prisma persistence.
- Server-side password hashing and HTTP-only sessions.
- OpenAI Responses API for Farm Copilot, Crop Doctor, farm insights and scheme/market research.
- OpenAI hosted web search for current information, with government-domain filtering where appropriate.
- Open-Meteo live weather/geocoding.
- Authenticated IoT gateway ingestion into PostgreSQL.
- Pan-India Central + State/UT scheme directory with AI current-information lookup.
- Orders, bookings, tasks, finance, insurance, soil and input records.
- Community like/comment/report actions.
- Real reel URLs rather than fake generated media.
- Rate limiting on AI endpoints and server-side ownership checks.

## Required before calling a deployment "live"
1. Set a real PostgreSQL DATABASE_URL.
2. Set a real OPENAI_API_KEY with available quota.
3. Set AUTH_SECRET to a long random server-only value.
4. Configure object storage/CDN if you want users to upload media directly from the platform.
5. Configure IOT_INGEST_TOKEN and IOT_DEFAULT_USER_ID only if a real sensor gateway will send telemetry.
6. Run Prisma migrations and the seed.
7. Run typecheck/build and exercise the login → farm → crop → AI → marketplace/order → notification flows.

No API key or private credential is bundled in this project.
