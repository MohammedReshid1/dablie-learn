import { PageLayout } from "@/components/page-layout"

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <div className="container py-16 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-lg dark:prose-invert">
          <p>Last updated: April 29, 2024</p>

          <h2>Introduction</h2>
          <p>
            At DablieLearn, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website or use our e-learning platform.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Personal information (name, email address, etc.) when you register for an account</li>
            <li>Payment information when you purchase courses</li>
            <li>Profile information and preferences</li>
            <li>Course progress and completion data</li>
            <li>Communications with instructors and support</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative messages and updates</li>
            <li>Respond to your comments and questions</li>
            <li>Personalize your experience</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>

          <h2>Sharing Your Information</h2>
          <p>
            We may share your information with third parties in certain circumstances, such as with service providers
            who perform services on our behalf, when required by law, or in connection with a merger or acquisition.
          </p>

          <h2>Your Choices</h2>
          <p>
            You can update your account information and preferences at any time. You may also opt out of receiving
            promotional communications from us by following the instructions in those communications.
          </p>

          <h2>Security</h2>
          <p>
            We take reasonable measures to help protect your personal information from loss, theft, misuse, and
            unauthorized access, disclosure, alteration, and destruction.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make material changes, we will notify you through
            our website or by email.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@dablielearn.com.</p>
        </div>
      </div>
    </PageLayout>
  )
}
