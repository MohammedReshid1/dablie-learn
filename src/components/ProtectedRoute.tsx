import { useAuth } from "@/contexts/AuthContext"
import { Navigate, useLocation } from "react-router-dom"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  redirectTo = "/login" 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (requireAuth && !user) {
    // Redirect to login page with return url
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  if (!requireAuth && user) {
    // Redirect authenticated users away from auth pages
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}