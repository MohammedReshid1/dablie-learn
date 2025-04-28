import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, CheckCircle, DollarSign, Users, Award } from "lucide-react"

export default function TeachPage() {
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
            <Link href="/teach" className="text-sm font-medium text-rose-600">
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
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
                Share Your Knowledge and{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Earn</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Join thousands of instructors teaching millions of students on DablieLearn. Create an online course and
                earn income by sharing your expertise.
              </p>
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                asChild
              >
                <Link href="/instructor/create">Start Teaching Today</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                Why Teach on{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                  DablieLearn
                </span>
              </h2>
              <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
                Our platform provides everything you need to create and sell high-quality online courses.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Earn Revenue</h3>
                  <p className="text-neutral-600">
                    Earn money every time a student purchases your course. Our revenue share model ensures you get paid
                    fairly for your expertise.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Reach Millions</h3>
                  <p className="text-neutral-600">
                    Get access to millions of students across the globe who are eager to learn from experts like you.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-fuchsia-100 flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-fuchsia-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Powerful Tools</h3>
                  <p className="text-neutral-600">
                    Our intuitive course creation tools make it easy to build engaging courses with videos, quizzes, and
                    assignments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-6">How to Get Started</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Plan Your Course</h3>
                      <p className="text-neutral-600">
                        Decide what you'll teach and how you'll structure your course to provide the most value to
                        students.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Create Your Content</h3>
                      <p className="text-neutral-600">
                        Record high-quality videos, create engaging assignments, and develop comprehensive resources.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Launch and Promote</h3>
                      <p className="text-neutral-600">
                        Publish your course and use our marketing tools to reach students interested in your topic.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    asChild
                    className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                  >
                    <Link href="/instructor/create">
                      Create Your Course <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square relative">
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="Instructor teaching"
                    className="rounded-xl object-cover h-full w-full"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                    <div>
                      <div className="font-medium">Join 10,000+ instructors</div>
                      <div className="text-sm text-neutral-500">Teaching on DablieLearn</div>
                    </div>
                  </div>
                </div>
              </div>
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
              <div className="flex space-x-4">{/* Social icons */}</div>
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
