# Web-Project — food ordering platform (MERN)

Three deployables in one repo. Each has its own `package.json`, lockfile (npm) and `node_modules`.

| Path | What | Stack | Dev |
|---|---|---|---|
| `Back-end/` | REST API `/api/admin/*` + static uploads | Express 4 (ESM), Mongoose, JWT, Multer | `npm start` → :1000 |
| `Front-end/User/` | Customer site (menu, blog, orders, contact) | Create React App, React Router, Axios | `npm start` → :3000 |
| `Front-end/Admin/` | Admin dashboard (foods, categories, orders, customers, delivery men, revenue) | Vite, React, Tailwind v4 | `npm run dev` → :5173 |

## Backend
- `Back-end/app.js` builds the Express app (routes, `verifyToken` JWT middleware, static `uploads/*`). `index.js` only listens; `api/index.js` exports the app for Vercel serverless.
- Routers in `Back-end/routers/*.route.js`, Mongoose models in `Back-end/models/*.model.js`. Config: `MONGO_URI`, `JWT_SECRET_KEY`, `PORT` (`.env`).
- Login routes (`customerlogin`, `manlogin`, `adminlogin`) are public; everything after `app.use(verifyToken)` needs `Authorization: Bearer <jwt>`.
- Uploaded images are written to `Back-end/uploads/<kind>/` and served at `/<kind>/<file>`.

## Frontends
- User: components under `src/component/<area>/`; API calls use Axios. Base URL is configurable via `REACT_APP_API_URL` (fallback `http://localhost:1000`).
- Admin: pages under `src/pages/<Area>/`, shared bits in `src/assets/components/`. Axios instance in `config/axios.js`; env `VITE_BACKEND_URL` (API base) and `VITE_API_URL` (static files base).

## Commands (run from the repo root)
- `npm run install:all` · `npm test` (backend + user) · `npm run lint` (admin eslint) · `npm run build` (both frontends)
- Per package: `cd Back-end && npm test` (node:test in `Back-end/tests/`), `cd Front-end/User && CI=true npm test`, `cd Front-end/Admin && npm run lint && npm run build`.

## Conventions
- Keep the three packages independent; never import across them.
- Backend changes ship with a `node:test` test in `Back-end/tests/` (models and pure logic can be tested without a DB; use `supertest` only when the route is DB-free).
- Frontend behaviour changes ship with a test next to the component (User: Jest/RTL via CRA, Admin: Vitest if added).
- Never hardcode `http://localhost:1000` in new frontend code; use the env base URL.
- Don't commit `uploads/` additions, secrets, or `node_modules`. Small conventional commits (`feat:`, `fix:`, `chore:`).
