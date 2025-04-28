"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 to-orange-50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Stay Updated with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                DablieLearn
              </span>
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest course releases, learning tips, and exclusive promotions.
            </p>

            <div className="mt-8 max-w-md mx-auto">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="rounded-full border-neutral-300 py-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 py-6"
                  >
                    Subscribe
                  </Button>
                </form>
              ) : (
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">Thank You!</h3>
                  <p className="text-neutral-600">You've been successfully subscribed to our newsletter.</p>
                </div>
              )}

              <p className="mt-4 text-xs text-neutral-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from DablieLearn.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
