# Switch Dev AI Workshop

A full-stack web application built with React, Tailwind CSS, shadcn/ui, and Node.js.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- npm v10 or later

### Installation

```bash
npm run install:all
```

This installs dependencies for the root project, the React frontend, and the Node.js backend.

### Development

```bash
npm run dev
```

This starts both the frontend and backend dev servers concurrently:

- **Frontend:** [http://localhost:5173](http://localhost:5173) (Vite + React)
- **Backend:** [http://localhost:3001](http://localhost:3001) (Express)

The Vite dev server proxies `/api` requests to the backend automatically.

### Build

```bash
npm run build
```

Builds both the client and server for production.

## Project Structure

```
├── client/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/     # shadcn/ui components (Button, etc.)
│   │   ├── lib/        # Utility functions
│   │   ├── App.tsx     # Root application component
│   │   ├── main.tsx    # Entry point
│   │   └── index.css   # Tailwind CSS + shadcn/ui theme
│   └── vite.config.ts  # Vite configuration with Tailwind plugin
├── server/             # Node.js backend
│   ├── src/
│   │   └── index.ts    # Express server with health-check endpoint
│   └── tsconfig.json   # TypeScript configuration
└── package.json        # Root-level scripts
```

## Tech Stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Frontend | React 19, Vite, TypeScript        |
| Styling  | Tailwind CSS v4, shadcn/ui        |
| Backend  | Node.js, Express 5, TypeScript    |
| Dev      | concurrently, tsx                 |

## API Endpoints

| Method | Path          | Description                              |
| ------ | ------------- | ---------------------------------------- |
| GET    | `/api/health` | Health check -- returns `{ status: "ok" }` |

## Available Scripts

| Script             | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start frontend and backend concurrently  |
| `npm run dev:client` | Start only the frontend dev server     |
| `npm run dev:server` | Start only the backend dev server      |
| `npm run build`    | Build both client and server             |
| `npm run install:all` | Install all dependencies              |
