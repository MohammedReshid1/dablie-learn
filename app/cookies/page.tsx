import { PageLayout } from "@/components/page-layout"

export default function CookiesPolicyPage() {
  return (
    <PageLayout>
      <div className="container py-16 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Cookies Policy</h1>

        <div className="prose prose-lg dark:prose-invert">
          <p>Last updated: April 29, 2024</p>

          <h2>What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to the owners of the
            site.
          </p>

          <h2>How We Use Cookies</h2>
          <p>DablieLearn uses cookies for several purposes, including:</p>
          <ul>
            <li>Essential cookies: These are necessary for the website to function properly</li>
            <li>Functionality cookies: These remember your preferences and settings</li>
            <li>Performance cookies: These help us understand how visitors interact with our website</li>
            <li>Analytics cookies: These help us measure and improve the performance of our site</li>
            <li>Advertising cookies: These are used to deliver relevant ads and track ad campaign performance</li>
          </ul>

          <h2>Types of Cookies We Use</h2>
          <p>We use both session cookies and persistent cookies:</p>
          <ul>
            <li>Session cookies: These are temporary and are deleted when you close your browser</li>
            <li>Persistent cookies: These remain on your device until they expire or you delete them</li>
          </ul>

          <h2>Third-Party Cookies</h2>
          <p>
            Some cookies are placed by third parties on our behalf. These third parties may include analytics providers,
            advertising networks, and social media platforms.
          </p>

          <h2>Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings. You can usually find these settings
            in the "Options" or "Preferences" menu of your browser. You can also use your browser settings to delete
            existing cookies.
          </p>

          <h2>Changes to This Cookies Policy</h2>
          <p>
            We may update this Cookies Policy from time to time. If we make material changes, we will notify you through
            our website or by email.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Cookies Policy, please contact us at privacy@dablielearn.com.</p>
        </div>
      </div>
    </PageLayout>
  )
}
