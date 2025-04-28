import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CookiesPage() {
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
        <section className="py-12 bg-gradient-to-r from-rose-50 to-orange-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">Cookie Policy</h1>
              <p className="text-neutral-600">Last updated: April 28, 2023</p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto prose prose-neutral">
              <p>
                This Cookie Policy explains how DablieLearn uses cookies and similar technologies to recognize you when
                you visit our platform. It explains what these technologies are and why we use them, as well as your
                rights to control our use of them.
              </p>

              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website.
                Cookies are widely used by website owners in order to make their websites work, or to work more
                efficiently, as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, DablieLearn) are called "first-party cookies." Cookies
                set by parties other than the website owner are called "third-party cookies." Third-party cookies enable
                third-party features or functionality to be provided on or through the website (e.g., advertising,
                interactive content, and analytics). The parties that set these third-party cookies can recognize your
                computer both when it visits the website in question and also when it visits certain other websites.
              </p>

              <h2>2. Why Do We Use Cookies?</h2>
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical
                reasons in order for our platform to operate, and we refer to these as "essential" or "strictly
                necessary" cookies. Other cookies also enable us to track and target the interests of our users to
                enhance the experience on our platform. Third parties serve cookies through our platform for
                advertising, analytics, and other purposes.
              </p>
              <p>
                The specific types of first and third-party cookies served through our platform and the purposes they
                perform are described below:
              </p>

              <h3>Essential Cookies</h3>
              <p>
                These cookies are strictly necessary to provide you with services available through our platform and to
                use some of its features, such as access to secure areas. Because these cookies are strictly necessary
                to deliver the platform, you cannot refuse them without impacting how our platform functions.
              </p>

              <h3>Performance and Functionality Cookies</h3>
              <p>
                These cookies are used to enhance the performance and functionality of our platform but are
                non-essential to their use. However, without these cookies, certain functionality may become
                unavailable.
              </p>

              <h3>Analytics and Customization Cookies</h3>
              <p>
                These cookies collect information that is used either in aggregate form to help us understand how our
                platform is being used or how effective our marketing campaigns are, or to help us customize our
                platform for you.
              </p>

              <h3>Advertising Cookies</h3>
              <p>
                These cookies are used to make advertising messages more relevant to you. They perform functions like
                preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in
                some cases selecting advertisements that are based on your interests.
              </p>

              <h2>3. How Can You Control Cookies?</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie
                preferences by clicking on the appropriate opt-out links provided in the cookie banner on our platform.
              </p>
              <p>
                You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject
                cookies, you may still use our platform though your access to some functionality and areas may be
                restricted. As the means by which you can refuse cookies through your web browser controls vary from
                browser to browser, you should visit your browser's help menu for more information.
              </p>

              <h2>4. How Often Will We Update This Cookie Policy?</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the
                cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this
                Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>

              <h2>5. Where Can You Get Further Information?</h2>
              <p>If you have any questions about our use of cookies or other technologies, please email us at:</p>
              <p>
                <a href="mailto:privacy@dablielearn.com" className="text-rose-600 hover:text-rose-700">
                  privacy@dablielearn.com
                </a>
              </p>
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
