# Switch Dev AI Workshop

A web application built with React, Tailwind CSS, shadcn/ui, and Express.

## Tech Stack

- **Frontend:** React 19 + TypeScript, bundled with Vite
- **Styling:** Tailwind CSS v4
- **Component Library:** shadcn/ui (base-nova preset)
- **Backend:** Node.js with Express 5
- **Language:** TypeScript throughout

## Project Structure

```
.
├── server/             # Express backend
│   └── index.ts        # Server entry point with health-check endpoint
├── src/                # React frontend
│   ├── components/ui/  # shadcn/ui components
│   ├── lib/            # Utility functions
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # React entry point
│   └── index.css       # Tailwind CSS and theme configuration
├── public/             # Static assets
├── index.html          # HTML entry point
├── vite.config.ts      # Vite configuration (includes API proxy)
├── tsconfig.json       # TypeScript root config
├── tsconfig.app.json   # TypeScript config for the frontend
├── tsconfig.server.json# TypeScript config for the backend
└── components.json     # shadcn/ui configuration
```

## Prerequisites

- Node.js 20 or later
- npm 10 or later

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development servers:**

   ```bash
   npm run dev
   ```

   This starts both the Vite dev server (frontend on `http://localhost:5173`) and the Express server (backend on `http://localhost:3001`) concurrently.

   You can also start them individually:

   ```bash
   npm run dev:frontend   # Vite dev server only
   npm run dev:backend    # Express server only
   ```

3. **Build for production:**

   ```bash
   npm run build
   ```

## API Endpoints

| Method | Path          | Description               |
| ------ | ------------- | ------------------------- |
| GET    | `/api/health` | Returns server health status |

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

See the [shadcn/ui docs](https://ui.shadcn.com/docs/components) for available components.
