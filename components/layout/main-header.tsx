"use client" // Keep client directive if needed for future interactions, though currently static

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" // Assuming utils for cn exist

interface MainHeaderProps {
  activeLink?: "Explore" | "Categories" | "Teach" | "About Us" | "None"
}

export function MainHeader({ activeLink = "None" }: MainHeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-6"> {/* Added mr-6 */}
          {/* Logo */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
            <span className="font-bold text-primary-foreground text-xl">D</span>
          </div>
          <span className="font-bold text-xl text-foreground">DablieLearn</span>
        </Link>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center gap-6 flex-grow"> {/* Added flex-grow */}
          <Link
            href="/courses"
            className={cn(
              "text-sm font-medium transition-colors",
              activeLink === "Explore"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Explore
          </Link>
          <Link
            href="/categories"
            className={cn(
              "text-sm font-medium transition-colors",
              activeLink === "Categories"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Categories
          </Link>
          <Link
            href="/teach"
            className={cn(
              "text-sm font-medium transition-colors",
              activeLink === "Teach"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Teach
          </Link>
          {/* Added About Us Link */}
           <Link
             href="/about" // Assuming '/about' is the route
             className={cn(
               "text-sm font-medium transition-colors",
               activeLink === "About Us"
                 ? "text-primary"
                 : "text-muted-foreground hover:text-foreground"
             )}
           >
            About Us
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground">
            Log in
          </Link>
          <Button asChild className="rounded-full">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
} 