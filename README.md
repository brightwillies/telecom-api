# Telecom Experience API

A **lightweight, type-safe shopping cart API** built for telecom customer journeys.  
Implements a transient cart with **15-minute expiry**, **semantic HTTP**, and **clean architecture**.
---

## Features

- **TypeScript-first** — zero `any`, full interfaces
- **Clean architecture** — HTTP, Service, Infrastructure layers
- **In-memory test double** — no real Salesforce
- **15-minute cart expiry** — `410 Gone` on timeout
- **Semantic HTTP** — `201 + Location`, `404`, `400`
- **100% test coverage** — Jest + supertest
- **Zero persistence** — meets constraint

---


## API Endpoints

| Method | Path | Purpose |
|-------|------|--------|
| `POST /api/v1/cart` | Create cart |
| `GET /api/v1/cart/{id}` | Get cart |
| `POST /api/v1/cart/{id}/items` | Add item |

See [`SPEC-B-api.md`](./SPEC-B-api.md) for full contract.

---

## Project Structure
src/
├── api/                    → Controllers & routes
├── core/                   → Pure business logic
├── infrastructure/
│   └── salesforce/         → Test double
├── types/                  → Shared interfaces
└── server.ts               → Express entry
tests/
├── cart.service.test.ts
└── cart.controller.test.ts

SPEC-A-architecture.md
SPEC-B-api.md
PROMPTS.md
README.md



---

## Setup

```bash
npm install


Run
npm run dev

Test
npm test

All 6 tests pass:

Cart creation
Item addition
Expiry (410)
Invalid ID (404)
Input validation (400)

Build
npm run build    # tsc → dist/
npm start        # node dist/server.js

Known Gaps (By Design)

