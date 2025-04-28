import Link from "next/link"
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react"

export function Footer() {
  return (
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
              DablieLearn is an e-learning platform that helps you acquire new skills and knowledge through high-quality
              courses taught by industry experts.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                <LinkedinIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                <YoutubeIcon className="h-5 w-5" />
              </Link>
            </div>
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
              <li>
                <Link href="/about-us" className="text-neutral-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-neutral-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-neutral-400 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/affiliates" className="text-neutral-400 hover:text-white transition-colors">
                  Affiliates
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="text-neutral-400 hover:text-white transition-colors">
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help-center" className="text-neutral-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-neutral-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-neutral-400 hover:text-white transition-colors">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/cookie-settings" className="text-neutral-400 hover:text-white transition-colors">
                  Cookie Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-neutral-500 text-sm">© {new Date().getFullYear()} DablieLearn. All rights reserved.</div>
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
  )
}
