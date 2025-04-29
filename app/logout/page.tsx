"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/page-layout"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // In a real application, you would handle logout logic here
    // For this example, we'll just redirect to the home page after a delay
    const timer = setTimeout(() => {
      router.push("/")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <PageLayout>
      <div className="container flex flex-col items-center justify-center min-h-[70vh] py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">You've Been Logged Out</h1>
        <p className="text-muted-foreground max-w-md mb-2">
          Thank you for using DablieLearn. You have been successfully logged out of your account.
        </p>
        <p className="text-muted-foreground max-w-md mb-8">
          You will be redirected to the home page in a few seconds...
        </p>
      </div>
    </PageLayout>
  )
}
