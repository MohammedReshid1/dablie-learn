import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">Privacy Policy</h1>
              <p className="text-neutral-600">Last updated: April 28, 2023</p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto prose prose-neutral">
              <p>
                At DablieLearn, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our platform. Please read this privacy policy
                carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
              </p>

              <h2>1. Information We Collect</h2>
              <p>We collect information that you provide directly to us when you:</p>
              <ul>
                <li>Register for an account</li>
                <li>Purchase or enroll in a course</li>
                <li>Complete forms or surveys</li>
                <li>Participate in forums or discussions</li>
                <li>Contact customer support</li>
              </ul>
              <p>
                This information may include your name, email address, payment information, and any other information
                you choose to provide.
              </p>
              <p>
                We also automatically collect certain information when you visit, use, or navigate the platform. This
                information does not reveal your specific identity but may include device and usage information, such as
                your IP address, browser and device characteristics, operating system, language preferences, referring
                URLs, device name, country, location, information about how and when you use our platform, and other
                technical information.
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect for various purposes, including to:</p>
              <ul>
                <li>Provide, maintain, and improve the platform</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative information, such as updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Personalize your experience and deliver content relevant to your interests</li>
                <li>Monitor and analyze trends, usage, and activities in connection with the platform</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>3. Sharing Your Information</h2>
              <p>We may share your information with:</p>
              <ul>
                <li>Service providers who perform services on our behalf</li>
                <li>Instructors, when you enroll in their courses</li>
                <li>Business partners, with your consent</li>
                <li>
                  In response to a request for information if we believe disclosure is in accordance with any applicable
                  law, regulation, or legal process
                </li>
                <li>
                  If we believe your actions are inconsistent with our user agreements or policies, or to protect the
                  rights, property, and safety of DablieLearn or others
                </li>
              </ul>

              <h2>4. Your Choices</h2>
              <p>
                You can update your account information and preferences at any time by logging into your account
                settings. You may also opt-out of receiving promotional communications from us by following the
                instructions in those communications.
              </p>
              <p>
                Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set
                your browser to remove or reject browser cookies. Please note that if you choose to remove or reject
                cookies, this could affect the availability and functionality of our platform.
              </p>

              <h2>5. Data Security</h2>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized
                access, disclosure, alteration, and destruction. However, no Internet or email transmission is ever
                fully secure or error-free.
              </p>

              <h2>6. Children's Privacy</h2>
              <p>
                Our platform is not directed to children under the age of 13, and we do not knowingly collect personal
                information from children under 13. If we learn we have collected or received personal information from
                a child under 13 without verification of parental consent, we will delete that information.
              </p>

              <h2>7. Changes to This Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. If we make material changes, we will notify you by
                email or through a notice on our platform prior to the change becoming effective.
              </p>

              <h2>8. Cookies Policy</h2>
              <p>
                We use cookies to improve your experience on our platform. By using our platform, you consent to the use
                of cookies in accordance with our cookies policy. More information about our cookies policy will be
                available soon.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
