import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutUsPage() {
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
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                  DablieLearn
                </span>
              </h1>
              <p className="text-xl text-neutral-600">
                Our mission is to provide accessible, high-quality education to everyone, everywhere.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-neutral-600">
                  <p>
                    DablieLearn was founded in 2023 with a simple mission: to make quality education accessible to
                    everyone, everywhere. We believe that learning should be engaging, affordable, and tailored to the
                    needs of modern learners.
                  </p>
                  <p>
                    What started as a small collection of courses has grown into a global learning platform with
                    thousands of instructors teaching millions of students across the world. Our diverse catalog covers
                    everything from technical skills to creative pursuits, business knowledge to personal development.
                  </p>
                  <p>
                    We're committed to helping individuals and organizations unlock their potential through the power of
                    education. Whether you're looking to advance your career, master a new skill, or pursue a passion,
                    DablieLearn is here to support your learning journey.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square relative">
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="DablieLearn team"
                    className="rounded-xl object-cover h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                  Values
                </span>
              </h2>
              <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
                These core principles guide everything we do at DablieLearn.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                  <span className="text-rose-600 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                <p className="text-neutral-600">
                  We believe education should be available to everyone, regardless of background or circumstances.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <span className="text-orange-600 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-neutral-600">
                  We're committed to maintaining high standards in all our courses and learning experiences.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-fuchsia-100 flex items-center justify-center mb-4">
                  <span className="text-fuchsia-600 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-neutral-600">
                  We continuously explore new ways to improve how people learn and teach online.
                </p>
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
