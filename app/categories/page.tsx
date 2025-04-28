import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Code, LineChart, Lightbulb, Megaphone, Palette, PenTool } from "lucide-react"

export default function CategoriesPage() {
  const CATEGORIES = [
    {
      name: "Development",
      icon: Code,
      color: "from-sky-400 to-blue-600",
      courses: 425,
      description: "Web, mobile, and software development courses for all skill levels",
      popular: ["JavaScript", "React", "Python", "Node.js"],
    },
    {
      name: "Design",
      icon: Palette,
      color: "from-purple-400 to-indigo-600",
      courses: 310,
      description: "Graphic design, UI/UX, and creative courses to build your skills",
      popular: ["UI/UX", "Figma", "Adobe XD", "Graphic Design"],
    },
    {
      name: "Marketing",
      icon: Megaphone,
      color: "from-amber-400 to-orange-600",
      courses: 285,
      description: "Digital marketing strategies to grow your business and audience",
      popular: ["SEO", "Social Media", "Content Marketing", "Analytics"],
    },
    {
      name: "Data Science",
      icon: LineChart,
      color: "from-emerald-400 to-teal-600",
      courses: 195,
      description: "Learn to analyze data and build machine learning models",
      popular: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    },
    {
      name: "Business",
      icon: Lightbulb,
      color: "from-red-400 to-rose-600",
      courses: 350,
      description: "Entrepreneurship, management, and business strategy courses",
      popular: ["Entrepreneurship", "Finance", "Management", "Strategy"],
    },
    {
      name: "Illustration",
      icon: PenTool,
      color: "from-fuchsia-400 to-pink-600",
      courses: 220,
      description: "Digital art, drawing, and creative illustration techniques",
      popular: ["Digital Art", "Character Design", "Procreate", "Digital Painting"],
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
            <Link href="/categories" className="text-sm font-medium text-rose-600">
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
        <section className="py-12 bg-gradient-to-r from-rose-50 to-orange-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">
                Browse All{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                  Categories
                </span>
              </h1>
              <p className="text-neutral-600 text-lg mb-8">
                Explore our diverse range of categories to find the perfect courses for your learning journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((category) => (
                <Link key={category.name} href={`/categories/${category.name.toLowerCase()}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <div
                          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} p-3 shadow-lg`}
                        >
                          <category.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-xl">{category.name}</h3>
                          <span className="text-sm font-medium text-neutral-500">{category.courses} courses</span>
                        </div>

                        <p className="text-neutral-600 line-clamp-2">{category.description}</p>

                        <div className="pt-4">
                          <h4 className="text-sm font-medium text-neutral-700 mb-2">Popular Topics:</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.popular.map((topic) => (
                              <span
                                key={topic}
                                className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800 group-hover:bg-neutral-200 transition-colors"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
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
