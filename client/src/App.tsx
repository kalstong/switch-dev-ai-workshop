import { useState } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold tracking-tight">
        Switch Dev AI Workshop
      </h1>
      <p className="text-muted-foreground text-lg">
        React + Tailwind CSS + shadcn/ui + Node.js
      </p>
      <div className="flex gap-4">
        <Button onClick={() => setCount((c) => c + 1)}>
          Count is {count}
        </Button>
        <Button
          variant="outline"
          onClick={() => window.open('/api/health', '_blank')}
        >
          Check API Health
        </Button>
      </div>
    </div>
  )
}

export default App
