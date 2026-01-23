# Copilot / AI Agent Instructions for this repo

Short, actionable notes to help code agents be productive immediately.

- **Quick start (dev):**
  - Install: `npm install`
  - Frontend dev server: `npm run dev` (runs Vite)
  - Backend + hot-reload: `npm start` (nodemon + `ts-node` watches `server/**/*.ts`)
  - Build production frontend: `npm run build` -> outputs `client/dist` which the server serves.

- **Required env vars (.env):**
  - `MONGO_SRV` — MongoDB connection string used by `server/server.ts`
  - `SESSION_SECRET` — session secret used by `express-session` in `server/server.ts`
  - (Optional) Google OAuth client IDs referenced in `client` and `server/auth.ts` per README.

- **High-level architecture:**
  - `server/` — Typescript Express server. Main entry: `server/server.ts`.
  - `server/api.ts` — All HTTP API routes mounted under `/api`.
  - `server/server-socket.ts` — Socket.IO server and maps between sockets and players.
  - `client/` — React app (Vite + TypeScript). Entry points under `client/src` and built output in `client/dist`.
  - `shared/` — Type interfaces shared by client and server (keep these in sync with `server/models/*`).
  - `server/models/*` — Mongoose schemas (source of truth for persisted data).

- **Key integration patterns**
  - Authentication middleware: `server/auth.ts` adds `req.player` (the current player). Most API handlers check `if (!req.player) return ...` — preserve that guard when adding routes.
  - Socket linking: client calls `post("/api/initsocket", { socketid })` (see `client/src/components/App.tsx`) when `socket.on('connect')` and after login; server uses `server/server-socket.ts` to map sockets to players.
  - Socket events emitted by server (used across UI): `actionbegan`, `actioncomplete`, `actiondenied`, `actionfailed`, `updatestatus`, `paint` — search `server/api.ts` and `server/game-logic.ts` when changing behavior.
  - API helper on client: use `client/src/utilities.ts` `get()` and `post()` wrappers for requests (they throw helpful errors on HTTP problems).

- **Project-specific conventions & pitfalls**
  - Shared types live in `shared/`; when you change a Mongoose schema in `server/models/*`, update `shared/` accordingly to avoid runtime / type mismatches.
  - Server serves the built frontend from `client/dist` (see `server/server.ts`). `npm run build` must be run before expecting static assets in production mode.
  - Some server state is global (example: `cachedIndex` in `server/api.ts`). Be cautious refactoring global state — this repo intentionally uses simple globals for teaching/demo purposes.
  - Many API endpoints update `req.player` in-memory after DB updates (e.g., `req.player.items = ...`) to avoid requiring a browser refresh; keep that pattern for local state consistency.

- **Where to implement/change gameplay rules**
  - `server/game-logic.ts` — central place for verification and mutation logic (e.g., `verifyAction`, `parseAction`, `updateEmotions`, `verifyColor`). Modify game mechanics here; tests/consumers expect these functions to be stable.

- **Where to add server routes or socket handlers**
  - HTTP endpoints: `server/api.ts` (mounted at `/api`). Follow existing patterns: early `if (!req.player)` guard, use `await` for DB calls, and `res.send()` a JSON-serializable value.
  - Socket handlers: `server/server-socket.ts` for server-level events and maps. Emit to a client via `getSocketFromSocketID(req.body.socketid)?.emit(...)` as other routes do.

- **Client-side patterns**
  - `client/src/components/App.tsx` manages initial `whoami`, socket connect, login flow and sets the `ActiveCatContext` used across pages.
  - UI components call server routes via `post('/api/..')` and listen to socket events from `client/src/client-socket.ts` (`socket` is exported).
  - Inventory and cat-related components use the `shared` interfaces; update them together with server model/schema changes.

- **Example: linking socket after login**
  - Client: in `client/src/components/App.tsx` — on `socket.connect` and after successful `/api/login`, the client posts `{ socketid: socket.id }` to `/api/initsocket`.
  - Server: `server/api.ts` `/initsocket` looks up the socket via `socketManager.getSocketFromSocketID` and calls `socketManager.addUser(req.player, socket)`.

- **Testing / debugging tips**
  - Logs: server uses `morgan('dev')` for request logs (toggle/remove in `server/server.ts`). Socket connect/disconnect are logged in `server/server-socket.ts`.
  - If you change types or add packages, run `npm install` and restart both `vite` and the server (`npm run dev` and `npm start`).
  - When changing DB-related code, ensure `MONGO_SRV` points to a dev database and that the `databaseName` in `server/server.ts` matches expectations.

If anything here is unclear or you want a section expanded (for example, more file-level examples or event mappings), tell me which area and I will iterate.