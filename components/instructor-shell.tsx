import type { ReactNode } from "react"
import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  PlusCircle,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface InstructorShellProps {
  children: ReactNode
}

export function InstructorShell({ children }: InstructorShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
                <span className="font-bold text-white text-lg">D</span>
              </div>
              <span className="font-bold text-xl">DablieLearn</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/instructor/dashboard"
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/instructor/courses"
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                My Courses
              </Link>
              <Link
                href="/instructor/analytics"
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Analytics
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 pl-8 rounded-full bg-neutral-50 border-neutral-200 focus-visible:ring-rose-500"
              />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1 container grid grid-cols-12 gap-6 py-8">
        <aside className="hidden md:block col-span-3 lg:col-span-2">
          <nav className="grid gap-2 sticky top-24">
            <Link
              href="/instructor/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-900 transition-all hover:text-rose-600 bg-neutral-100"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/instructor/courses"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-500 transition-all hover:text-neutral-900 hover:bg-neutral-100"
            >
              <BookOpen className="h-4 w-4" />
              <span>My Courses</span>
            </Link>
            <Link
              href="/instructor/create"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-500 transition-all hover:text-neutral-900 hover:bg-neutral-100"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Create Course</span>
            </Link>
            <Link
              href="/instructor/analytics"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-500 transition-all hover:text-neutral-900 hover:bg-neutral-100"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/instructor/students"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-500 transition-all hover:text-neutral-900 hover:bg-neutral-100"
            >
              <Users className="h-4 w-4" />
              <span>Students</span>
            </Link>
            <Link
              href="/instructor/messages"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-500 transition-all hover:text-neutral-900 hover:bg-neutral-100"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Messages</span>
            </Link>
            <Link
              href="/instructor/resources"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-500 transition-all hover:text-neutral-900 hover:bg-neutral-100"
            >
              <FileText className="h-4 w-4" />
              <span>Resources</span>
            </Link>
            <Link
              href="/instructor/settings"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-500 transition-all hover:text-neutral-900 hover:bg-neutral-100"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <Link
              href="/instructor/help"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-500 transition-all hover:text-neutral-900 hover:bg-neutral-100"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help Center</span>
            </Link>
            <div className="mt-4 pt-4 border-t">
              <Link
                href="/logout"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-500 transition-all hover:text-neutral-900 hover:bg-neutral-100"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </div>
          </nav>
        </aside>
        <main className="col-span-12 md:col-span-9 lg:col-span-10 space-y-8">{children}</main>
      </div>
    </div>
  )
}
