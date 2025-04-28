import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Facebook, Github } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
                <span className="font-bold text-white text-xl">D</span>
              </div>
              <span className="font-bold text-2xl">DablieLearn</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-neutral-500 mt-2">Sign in to your account to continue learning</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="w-full">
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-neutral-500">Or continue with</span>
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-rose-600 hover:text-rose-700">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
              >
                Sign In
              </Button>
            </form>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-rose-600 hover:text-rose-700">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-6 border-t">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-neutral-500 text-sm">© {new Date().getFullYear()} DablieLearn. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/terms" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Privacy
            </Link>
            <Link href="/help" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
