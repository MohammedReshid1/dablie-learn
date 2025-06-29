"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, ChevronLeft, Home, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HeaderProps {
  activeLink?: "Explore" | "Categories" | "Teach" | "About Us" | "None"
}

export function Header({ activeLink = "None" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const { user, profile, signOut } = useAuth()

  const getLinkClasses = (linkName: HeaderProps["activeLink"]) => {
    return cn(
      "text-sm font-medium transition-colors",
      activeLink === linkName
        ? "text-primary"
        : "text-foreground/80 hover:text-foreground"
    )
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="sticky top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border transition-colors duration-300">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {!isHomePage && (
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => window.history.back()} aria-label="Back to previous page">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
              <span className="font-bold text-white text-xl">D</span>
            </div>
            <span className="font-bold text-xl text-foreground">DablieLearn</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/courses" className={getLinkClasses("Explore")}>
            Explore
          </Link>
          <Link to="/categories" className={getLinkClasses("Categories")}>
            Categories
          </Link>
          <Link to="/teach" className={getLinkClasses("Teach")}>
            Teach
          </Link>
          <Link to="/about-us" className={getLinkClasses("About Us")}>
            About Us
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{profile?.full_name || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/my-courses" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    My Courses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Log in
              </Link>
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
              >
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <nav className="container py-4 flex flex-col gap-4">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors flex items-center gap-2",
                activeLink === "None" ? "text-primary" : "text-foreground/80 hover:text-foreground"
               )}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link
              to="/courses"
              className={getLinkClasses("Explore")}
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/categories"
              className={getLinkClasses("Categories")}
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/teach"
              className={getLinkClasses("Teach")}
              onClick={() => setIsMenuOpen(false)}
            >
              Teach
            </Link>
            <Link
              to="/about-us"
              className={getLinkClasses("About Us")}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            {!user && (
              <Link
                to="/login"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}