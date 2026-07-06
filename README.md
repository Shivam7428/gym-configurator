# IRONCLAD — Membership Configurator

A full-stack rebuild of the gym membership configurator: React frontend talking to a real Express + Node backend over a REST API, instead of localStorage.

## Stack
- **Frontend:** React 18 + Vite
- **Backend:** Node + Express
- **Storage:** JSON file (`server/data/enrollments.json`) — easy to swap for a real database (MongoDB/Postgres) later

## Project structure
```
gym-configurator/
├── server/              # Express API
│   ├── server.js
│   └── data/
│       ├── plans.json         # seed data for the 3 membership tiers
│       └── enrollments.json   # written to when someone enrolls
└── client/              # React app (Vite)
    └── src/
        ├── App.jsx
        └── components/
            ├── Configurator.jsx   # fetches plans, tracks selection
            ├── PlanCard.jsx        # one plan tile
            └── EnrollForm.jsx      # name/email + submit
```

## Run it locally

**1. Start the backend**
```bash
cd server
npm install
npm start
```
Runs on http://localhost:5000. Test it: `curl http://localhost:5000/api/plans`

**2. Start the frontend** (in a new terminal)
```bash
cd client
npm install
npm run dev
```
Runs on http://localhost:5173 and proxies `/api` calls to the backend (see `vite.config.js`).

Open http://localhost:5173, pick a plan, fill the form, and submit — the enrollment gets written to `server/data/enrollments.json`.

## API reference

| Method | Endpoint          | Description                          |
|--------|-------------------|---------------------------------------|
| GET    | `/api/plans`      | Returns the 3 membership plans        |
| GET    | `/api/enrollments`| Returns all enrollments (debug/admin) |
| POST   | `/api/enroll`     | Body: `{ name, email, planId }`       |

## Where to take this next
- Swap the JSON file for MongoDB or PostgreSQL (this is the natural "add a database" step)
- Add authentication so users can view their own enrollment
- Add a `PATCH /api/enroll/:id` to allow plan upgrades/downgrades
- Deploy: backend to Render/Railway, frontend to Vercel/Netlify (update `API_BASE` in `Configurator.jsx` to the deployed backend URL)

## Why this project matters for your resume
This takes the original gym site's client-only localStorage persistence and rebuilds it with a genuine client-server architecture: a REST API, request validation, and server-side persistence — the concrete gap between "frontend developer" and "full-stack developer."
