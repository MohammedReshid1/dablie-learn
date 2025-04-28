"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // In a real application, you would implement actual logout logic here
    // For example, clearing authentication tokens, cookies, etc.

    // Simulate logout process with a small delay
    const timer = setTimeout(() => {
      // Redirect to home page after "logout"
      router.push("/")
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
            <span className="font-bold text-white text-3xl">D</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Logging you out...</h1>
        <p className="text-neutral-600">You will be redirected to the home page shortly.</p>
      </div>
    </div>
  )
}
