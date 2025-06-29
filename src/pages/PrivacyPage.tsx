import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, profile information)",
        "Payment information when you purchase courses (processed securely through our payment partners)",
        "Course progress and learning data to track your educational journey",
        "Device and usage information to improve our platform performance",
        "Communications you send to us for support or feedback"
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "Provide and maintain our educational services",
        "Process payments and manage your account",
        "Send you course updates, recommendations, and important notifications",
        "Improve our platform based on usage patterns and feedback",
        "Ensure platform security and prevent fraud",
        "Comply with legal obligations and protect our rights"
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell your personal information to third parties",
        "Course instructors can see basic enrollment and progress data for their courses",
        "We may share aggregated, non-personal data for analytics and research",
        "We may disclose information when required by law or to protect our rights",
        "Service providers who help us operate our platform (with strict confidentiality agreements)"
      ]
    },
    {
      title: "Data Security",
      content: [
        "We use industry-standard encryption to protect your data",
        "Regular security audits and monitoring of our systems",
        "Secure payment processing through certified payment providers",
        "Limited access to personal data on a need-to-know basis",
        "Regular backups and disaster recovery procedures"
      ]
    },
    {
      title: "Your Rights and Choices",
      content: [
        "Access and update your personal information through your account settings",
        "Request deletion of your account and associated data",
        "Opt out of marketing communications while keeping essential notifications",
        "Request a copy of your personal data",
        "Contact us with any privacy concerns or questions"
      ]
    },
    {
      title: "Cookies and Tracking",
      content: [
        "We use cookies to enhance your browsing experience",
        "Analytics cookies help us understand how you use our platform",
        "You can control cookie settings through your browser",
        "Some features may not work properly if cookies are disabled",
        "We do not use cookies for advertising or tracking across other websites"
      ]
    }
  ]

  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Privacy{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                    Policy
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                </p>
                <div className="mt-6 text-sm text-muted-foreground">
                  Last updated: January 15, 2025
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
              >
                <Card>
                  <CardContent className="p-8">
                    <p className="text-lg leading-relaxed">
                      At DablieLearn, we are committed to protecting your privacy and ensuring the security of your personal information. 
                      This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                      online learning platform.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Policy Sections */}
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">{section.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {section.content.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="mt-12"
              >
                <Card className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-neutral-800 dark:to-neutral-700 border-rose-200 dark:border-neutral-600">
                  <CardHeader>
                    <CardTitle className="text-2xl">Contact Us About Privacy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="space-y-2 text-muted-foreground">
                      <div><strong>Email:</strong> privacy@dablielearn.com</div>
                      <div><strong>Address:</strong> 123 Learning Street, Education City, EC 12345</div>
                      <div><strong>Phone:</strong> +1 (555) 123-4567</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Updates Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="mt-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Policy Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We may update this Privacy Policy from time to time to reflect changes in our practices or for other 
                      operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
                      new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this 
                      Privacy Policy periodically to stay informed about how we protect your information.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}