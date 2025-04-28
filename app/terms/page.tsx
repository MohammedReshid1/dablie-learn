import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
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
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">Terms of Service</h1>
              <p className="text-neutral-600">Last updated: April 28, 2023</p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto prose prose-neutral">
              <p>
                Welcome to DablieLearn. Please read these Terms of Service ("Terms") carefully as they contain important
                information about your legal rights, remedies, and obligations. By accessing or using the DablieLearn
                platform, you agree to comply with and be bound by these Terms.
              </p>

              <h2>1. Account Registration</h2>
              <p>
                To access certain features of the platform, you must register for an account. You must provide accurate,
                current, and complete information during the registration process and keep your account information
                up-to-date.
              </p>
              <p>
                You are responsible for safeguarding your password and for all activities that occur under your account.
                You agree to notify us immediately of any unauthorized use of your account.
              </p>

              <h2>2. Course Enrollment and Access</h2>
              <p>
                When you enroll in a course, you are granted a limited, non-exclusive, non-transferable license to
                access and view the course content for personal, non-commercial, educational purposes only.
              </p>
              <p>
                You may not share your account or course access with others. Unauthorized sharing or distribution of
                course content is strictly prohibited and may result in the termination of your account.
              </p>

              <h2>3. User Content</h2>
              <p>
                You retain ownership of any content you submit, post, or display on or through the platform ("User
                Content"). By submitting User Content, you grant DablieLearn a worldwide, non-exclusive, royalty-free
                license to use, reproduce, modify, adapt, publish, translate, and distribute your User Content.
              </p>
              <p>
                You are solely responsible for your User Content and the consequences of posting or publishing it. You
                affirm, represent, and warrant that you own or have the necessary licenses, rights, consents, and
                permissions to publish any User Content you submit.
              </p>

              <h2>4. Prohibited Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use the platform for any illegal purpose or in violation of any laws</li>
                <li>Violate or infringe other people's intellectual property, privacy, or other rights</li>
                <li>Interfere with or disrupt the platform or servers</li>
                <li>Attempt to gain unauthorized access to any part of the platform</li>
                <li>Use the platform to transmit malware or other harmful code</li>
                <li>Engage in any activity that could damage, disable, or impair the platform</li>
              </ul>

              <h2>5. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to the platform at any time for any reason
                without notice or liability. Upon termination, your right to use the platform will immediately cease.
              </p>

              <h2>6. Disclaimers</h2>
              <p>
                The platform and all content are provided "as is" without warranty of any kind. We disclaim all
                warranties, express or implied, including but not limited to implied warranties of merchantability,
                fitness for a particular purpose, and non-infringement.
              </p>

              <h2>7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, DablieLearn shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                directly or indirectly.
              </p>

              <h2>8. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. If we make changes, we will provide notice of such changes, such
                as by sending an email notification, providing notice through the platform, or updating the "Last
                Updated" date at the beginning of these Terms.
              </p>

              <h2>9. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p>
                <a href="mailto:legal@dablielearn.com" className="text-rose-600 hover:text-rose-700">
                  legal@dablielearn.com
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
