'use client'
 
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-muted-foreground">
          We encountered an error while loading the agency details.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => reset()}
            variant="outline"
          >
            Try again
          </Button>
          <Button
            onClick={() => window.location.href = '/find-agencies'}
            variant="default"
          >
            Back to Agencies
          </Button>
        </div>
      </div>
    </div>
  )
}
