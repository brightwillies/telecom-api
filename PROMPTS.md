# PROMPTS.md — How This Project Was Built

This document records the **exact prompts** used to generate the **Telecom Experience API** using **Claude 3.5 Sonnet** (Anthropic).  
Each prompt was refined iteratively until the final, production-ready code was achieved.

## Prompt 1: Initial Architecture & Full Implementation

```text
You are a senior backend engineer at a telecom company. Build a **thin Experience API** in **TypeScript + Express** that sits on top of a **non-persistent Salesforce cart context**.

### Requirements:
- **Node 20+**, **TypeScript**, **Express**
- **No real Salesforce calls** → use a **test double**
- **In-memory only** → no database
- Carts **expire after 15 minutes of inactivity**
- Return `410 Gone` when expired
- Return `404` if cart never existed
- Use **pure service layer** (no Express in business logic)
- Folder structure:

src/
├── api/               → controllers, routes
├── core/              → business logic
├── infrastructure/    → external systems
│   └── salesforce/
├── types/
└── server.ts

- Full **unit tests** with **Jest + supertest**
- Include:
- `SPEC-A-architecture.md`
- `SPEC-B-api.md`
- `README.md`
- No auth, no OpenAPI, no persistence

### Deliver:
- Complete, working, type-safe code
- All files
- Tests pass with `npm test`
- Run with `npm run dev`

## Prompt 2: Fix Cart Expiry Logic

The cart is not expiring correctly.

In `SalesforceCartClient.double.ts`:
- On `getContext`, check if `now - lastAccessed > 15 * 60 * 1000`
- If yes → `carts.delete(cartId)` and return `null`
- Always update `lastAccessed = now` on access
- Use `Date.now()`
- Do not return stale context

## Prompt 3: Add Comprehensive Controller Tests

Write **supertest** tests in `tests/cart.controller.test.ts` for:

1. `POST /api/v1/cart` → `201 Created` + `Location` header + body `{ cartId }`
2. `GET /api/v1/cart/{id}` → `200` with cart data
3. `GET /api/v1/cart/{id}` after 16 min → `410 Gone`
4. `GET /api/v1/cart/invalid` → `404 Not Found`
5. `POST /api/v1/cart/{id}/items` → `200` with updated cart
6. `POST /items` with invalid body → `400 Bad Request`

Use `jest.useFakeTimers()` to control time.

Result:
→ 6 passing tests
→ Full coverage of HTTP contract


## Prompt 4: Final Polish & Documentation

Generate final versions of:

1. `SPEC-A-architecture.md` — layered design, test double, TTL
2. `SPEC-B-api.md` — exact HTTP contracts, status codes, JSON
3. `README.md` — setup, run, test, tradeoffs
4. `PROMPTS.md` — this file

Ensure:
- No placeholder text
- All code blocks are valid
- Markdown renders cleanly
- No `any` types
- All tests pass

Result:
→ This project is now complete and submittable

Final Notes

Total prompts used: 4
No manual coding beyond copy-paste and minor fixes
All constraints met
Production-grade patterns: clean architecture, test double, semantic HTTP
Ready for GitHub submission
