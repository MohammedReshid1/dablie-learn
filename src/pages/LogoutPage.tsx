import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { CheckCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function LogoutPage() {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = async () => {
      if (user) {
        await signOut()
      }
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate("/")
      }, 2000)
    }

    handleLogout()
  }, [signOut, navigate, user])

  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center">
                  {user ? (
                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                  ) : (
                    <CheckCircle className="h-8 w-8 text-white" />
                  )}
                </div>
                <h1 className="text-2xl font-bold mb-2">
                  {user ? "Signing you out..." : "You've been signed out"}
                </h1>
                <p className="text-muted-foreground">
                  {user 
                    ? "Please wait while we securely sign you out of your account."
                    : "Thank you for using DablieLearn. You have been successfully signed out."
                  }
                </p>
              </div>

              {!user && (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Redirecting to home page in a moment...
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      asChild 
                      variant="outline" 
                      className="flex-1"
                    >
                      <a href="/">Go to Home</a>
                    </Button>
                    <Button 
                      asChild 
                      className="flex-1 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                    >
                      <a href="/login">Sign In Again</a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  )
}