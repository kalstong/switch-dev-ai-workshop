# switch-dev-ai-workshop

## Project overview

Workshop project for Switch Dev AI. A full-stack web application with a React frontend and Node.js backend.

## Tech stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui
- **Backend:** Node.js, Express 5, TypeScript
- **Dev tooling:** concurrently (parallel dev servers), tsx (TypeScript execution)

## Project structure

```
├── client/             # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/     # shadcn/ui components
│   │   ├── lib/        # Utilities (cn helper, etc.)
│   │   ├── App.tsx     # Root component
│   │   ├── main.tsx    # Entry point
│   │   └── index.css   # Global styles + Tailwind + shadcn theme
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/             # Node.js backend (Express + TypeScript)
│   ├── src/
│   │   └── index.ts    # Server entry point with health-check endpoint
│   ├── package.json
│   └── tsconfig.json
├── package.json        # Root scripts (dev, build, install:all)
└── CLAUDE.md
```

## Development

### Setup

```bash
npm run install:all     # Install root, client, and server dependencies
```

### Commands

```bash
npm run dev             # Start both frontend (port 5173) and backend (port 3001)
npm run dev:client      # Start only the frontend
npm run dev:server      # Start only the backend
npm run build           # Build both client and server for production
```

### API

- `GET /api/health` -- returns `{ "status": "ok", "timestamp": "..." }`
- The Vite dev server proxies `/api` requests to the backend at port 3001

### Path aliases

- Frontend uses `@/` alias pointing to `client/src/` (e.g., `import { cn } from "@/lib/utils"`)

## Conventions

- Keep code simple and readable
- Write tests for new functionality
- Use conventional commit messages (e.g., `feat:`, `fix:`, `docs:`, `chore:`)
- Use shadcn/ui components from `@/components/ui/` for UI elements
- Style with Tailwind CSS utility classes; use the `cn()` helper to merge classes
- Backend routes go under `/api/` prefix
- TypeScript strict mode is enabled on both frontend and backend
