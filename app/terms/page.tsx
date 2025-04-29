import { PageLayout } from "@/components/page-layout"

export default function TermsOfServicePage() {
  return (
    <PageLayout>
      <div className="container py-16 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-lg dark:prose-invert">
          <p>Last updated: April 29, 2024</p>

          <h2>Welcome to DablieLearn</h2>
          <p>
            These Terms of Service ("Terms") govern your access to and use of the DablieLearn platform, including our
            website, services, and mobile applications (collectively, the "Service"). By accessing or using the Service,
            you agree to be bound by these Terms.
          </p>

          <h2>Using DablieLearn</h2>
          <p>
            You may use our Service only if you can form a binding contract with DablieLearn, and only in compliance
            with these Terms and all applicable laws. When you create your DablieLearn account, you must provide us with
            accurate and complete information.
          </p>

          <h2>Account Responsibilities</h2>
          <p>
            You are responsible for safeguarding your account, so use a strong password and limit its use to this
            account. DablieLearn cannot and will not be liable for any loss or damage arising from your failure to
            comply with the above.
          </p>

          <h2>Content and Behavior Rules</h2>
          <p>
            You may not post violent, nude, partially nude, discriminatory, unlawful, infringing, hateful, pornographic
            or sexually suggestive content. You must respect the intellectual property rights of others.
          </p>

          <h2>User Content</h2>
          <p>
            You retain your rights to any content you submit, post or display on or through the Service. By submitting,
            posting or displaying content on or through the Service, you grant us a worldwide, non-exclusive,
            royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and
            distribute such content.
          </p>

          <h2>Payments and Refunds</h2>
          <p>
            When you make a purchase through DablieLearn, you agree to provide accurate and complete payment
            information. You are responsible for all charges incurred under your account. Our refund policy varies by
            course and is specified at the time of purchase.
          </p>

          <h2>Termination</h2>
          <p>
            We may terminate or suspend your account if you violate these Terms or for any other reason at our
            discretion. Upon termination, your right to use the Service will immediately cease.
          </p>

          <h2>Disclaimers and Limitations of Liability</h2>
          <p>
            The Service and all content are provided "as is" without warranty of any kind. In no event will DablieLearn
            be liable for any indirect, incidental, special, consequential or punitive damages.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may modify these Terms at any time. If we make material changes, we will notify you through our website
            or by email.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at terms@dablielearn.com.</p>
        </div>
      </div>
    </PageLayout>
  )
}
