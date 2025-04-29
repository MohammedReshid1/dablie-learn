import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, FileText, MessageSquare, HelpCircle, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function HelpCenterPage() {
  return (
    <PageLayout>
      <section className="py-12 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/20 transition-colors duration-300">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">How can we help you?</h1>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for help articles..."
                className="pl-10 py-6 rounded-full border-input shadow-sm text-base"
              />
              <Button className="absolute right-1 top-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-rose-500" />
              </div>
              <h2 className="text-xl font-bold mb-2">Getting Started</h2>
              <p className="text-muted-foreground mb-4">
                New to DablieLearn? Learn the basics to get up and running quickly.
              </p>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Creating an account
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Finding the right course
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Enrollment process
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href="#">View all articles</Link>
              </Button>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-orange-500" />
              </div>
              <h2 className="text-xl font-bold mb-2">Account & Billing</h2>
              <p className="text-muted-foreground mb-4">
                Manage your account settings, subscriptions, and payment methods.
              </p>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Updating profile information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Subscription plans
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Payment methods
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href="#">View all articles</Link>
              </Button>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/30 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-fuchsia-500" />
              </div>
              <h2 className="text-xl font-bold mb-2">Course Experience</h2>
              <p className="text-muted-foreground mb-4">Learn how to make the most of your learning experience.</p>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Navigating course content
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Downloading resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Completing assignments
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href="#">View all articles</Link>
              </Button>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <HelpCircle className="h-6 w-6 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold mb-2">Troubleshooting</h2>
              <p className="text-muted-foreground mb-4">Find solutions to common issues and technical problems.</p>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Video playback issues
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Login problems
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Mobile app troubleshooting
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href="#">View all articles</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 bg-muted p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions or issues.
            </p>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
            >
              <Link href="/contact-us">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
