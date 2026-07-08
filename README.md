# Switch Dev AI Workshop

A web application built with React, Tailwind CSS, shadcn/ui, and Node.js.

## Project Structure

```
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── components/ui/   # shadcn/ui components
│   │   ├── lib/             # Utilities
│   │   ├── App.tsx          # Main app component
│   │   └── index.css        # Tailwind + shadcn theme
│   ├── vite.config.ts
│   └── package.json
├── server/          # Node.js + Express backend
│   ├── index.js             # Express server with health endpoint
│   └── package.json
├── slides.html      # Workshop slide deck
├── presenter-notes.md
└── package.json     # Root scripts (concurrently)
```

## Prerequisites

- Node.js >= 18
- npm >= 9

## Setup

```bash
# Install all dependencies (root, client, and server)
npm install
npm --prefix client install
npm --prefix server install
```

## Development

Start both frontend and backend with a single command:

```bash
npm run dev
```

This runs:
- **Client** — Vite dev server at `http://localhost:5173`
- **Server** — Express API at `http://localhost:3001`

The Vite dev server proxies `/api/*` requests to the backend.

### Run individually

```bash
npm run dev:client   # Frontend only
npm run dev:server   # Backend only
```

## API Endpoints

| Method | Path          | Description          |
|--------|---------------|----------------------|
| GET    | `/api/health` | Health check endpoint |

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS v4, shadcn/ui
- **Backend:** Node.js, Express
- **Dev tooling:** concurrently, TypeScript
