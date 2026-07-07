import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

function App() {
  const [healthStatus, setHealthStatus] = useState<string>("checking...")

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setHealthStatus(data.status))
      .catch(() => setHealthStatus("unavailable"))
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold tracking-tight">
        Switch Dev AI Workshop
      </h1>
      <p className="text-muted-foreground text-lg">
        React + Vite + Tailwind CSS + shadcn/ui + Node.js
      </p>
      <div className="flex gap-4">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Backend status:{" "}
        <span
          className={
            healthStatus === "ok"
              ? "text-green-600 font-medium"
              : "text-yellow-600 font-medium"
          }
        >
          {healthStatus}
        </span>
      </p>
    </div>
  )
}

export default App
