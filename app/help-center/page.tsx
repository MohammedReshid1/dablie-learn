import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, CreditCard, Users, MessageSquare, FileText, HelpCircle } from "lucide-react"

export default function HelpCenterPage() {
  const HELP_CATEGORIES = [
    {
      title: "Getting Started",
      icon: BookOpen,
      description: "Learn how to navigate the platform and find courses",
      articles: ["Creating an account", "Finding courses", "Enrolling in a course"],
    },
    {
      title: "Payments & Billing",
      icon: CreditCard,
      description: "Information about payments, refunds, and subscriptions",
      articles: ["Payment methods", "Refund policy", "Subscription plans"],
    },
    {
      title: "Account Management",
      icon: Users,
      description: "Manage your profile, settings, and notifications",
      articles: ["Updating profile", "Password reset", "Email preferences"],
    },
    {
      title: "Course Experience",
      icon: FileText,
      description: "Learn about course features and how to use them",
      articles: ["Watching lectures", "Downloading resources", "Course completion"],
    },
    {
      title: "Teaching on DablieLearn",
      icon: MessageSquare,
      description: "Resources for instructors and course creation",
      articles: ["Becoming an instructor", "Creating courses", "Instructor payments"],
    },
    {
      title: "Technical Support",
      icon: HelpCircle,
      description: "Troubleshooting and technical assistance",
      articles: ["Video playback issues", "Mobile app support", "Browser compatibility"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
              <span className="font-bold text-white text-xl">D</span>
            </div>
            <span className="font-bold text-xl">DablieLearn</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/courses"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/teach"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Teach
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-medium text-neutral-700 hover:text-neutral-900">
              Log in
            </Link>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <section className="py-20 bg-gradient-to-r from-rose-50 to-orange-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-6">
                How can we{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                  help you?
                </span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Find answers to your questions and get the support you need.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-500" />
                <Input
                  placeholder="Search for help articles..."
                  className="pl-10 py-6 rounded-full border-neutral-300 shadow-sm text-base"
                />
                <Button className="absolute right-1 top-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-8 text-center">
              Browse Help Categories
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {HELP_CATEGORIES.map((category) => (
                <Card key={category.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                        <category.icon className="h-5 w-5 text-rose-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                        <p className="text-neutral-600 text-sm mb-4">{category.description}</p>
                        <ul className="space-y-2">
                          {category.articles.map((article) => (
                            <li key={article}>
                              <Link href="#" className="text-sm text-rose-600 hover:underline">
                                {article}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-4">Still need help?</h2>
              <p className="text-neutral-600 mb-8">
                Our support team is here to assist you with any questions or issues you may have.
              </p>
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                asChild
              >
                <Link href="/contact-us">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
                  <span className="font-bold text-white text-xl">D</span>
                </div>
                <span className="font-bold text-xl text-white">DablieLearn</span>
              </Link>
              <p className="text-neutral-400 max-w-md mb-6">
                DablieLearn is an e-learning platform that helps you acquire new skills and knowledge through
                high-quality courses taught by industry experts.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Categories</h3>
              <ul className="space-y-3">
                {["Development", "Design", "Marketing", "Business", "Data Science", "Illustration"].map((category) => (
                  <li key={category}>
                    <Link
                      href={`/categories/${category.toLowerCase()}`}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {["About Us", "Careers", "Press", "Blog", "Affiliates", "Partnerships"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                {[
                  "Help Center",
                  "Contact Us",
                  "Terms of Service",
                  "Privacy Policy",
                  "Accessibility",
                  "Cookie Settings",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} DablieLearn. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
