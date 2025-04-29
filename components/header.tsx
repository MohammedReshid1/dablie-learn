"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, ChevronLeft, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  activeLink?: "Explore" | "Categories" | "Teach" | "About Us" | "None"
}

export function Header({ activeLink = "None" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const getLinkClasses = (linkName: HeaderProps["activeLink"]) => {
    return cn(
      "text-sm font-medium transition-colors",
      activeLink === linkName
        ? "text-primary"
        : "text-foreground/80 hover:text-foreground"
    )
  }

  return (
    <header className="sticky top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border transition-colors duration-300">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {!isHomePage && (
            <Button variant="ghost" size="icon" className="mr-2" asChild aria-label="Back to previous page">
              <Link href="#" onClick={() => window.history.back()}>
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
          )}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
              <span className="font-bold text-white text-xl">D</span>
            </div>
            <span className="font-bold text-xl text-foreground">DablieLearn</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/courses" className={getLinkClasses("Explore")}>
            Explore
          </Link>
          <Link href="/categories" className={getLinkClasses("Categories")}>
            Categories
          </Link>
          <Link href="/teach" className={getLinkClasses("Teach")}>
            Teach
          </Link>
          <Link href="/about" className={getLinkClasses("About Us")}>
            About Us
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden md:block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Log in
          </Link>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
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
              href="/"
              className={cn(
                "text-sm font-medium transition-colors flex items-center gap-2",
                activeLink === "None" ? "text-primary" : "text-foreground/80 hover:text-foreground"
               )}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link
              href="/courses"
              className={getLinkClasses("Explore")}
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/categories"
              className={getLinkClasses("Categories")}
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/teach"
              className={getLinkClasses("Teach")}
              onClick={() => setIsMenuOpen(false)}
            >
              Teach
            </Link>
            <Link
              href="/about"
              className={getLinkClasses("About Us")}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
