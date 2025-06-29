import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using DablieLearn, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, you may not use our services",
        "We reserve the right to modify these terms at any time with notice to users",
        "Continued use of the platform after changes constitutes acceptance of new terms"
      ]
    },
    {
      title: "User Accounts",
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the security of your account credentials",
        "You must notify us immediately of any unauthorized use of your account",
        "One person may not maintain multiple accounts",
        "We reserve the right to suspend or terminate accounts that violate our policies"
      ]
    },
    {
      title: "Course Access and Usage",
      content: [
        "Purchased courses provide lifetime access unless otherwise specified",
        "Course content is for personal, non-commercial use only",
        "You may not share, distribute, or resell course materials",
        "We reserve the right to update or modify course content",
        "Some courses may have prerequisites or technical requirements"
      ]
    },
    {
      title: "Payment and Refunds",
      content: [
        "All payments are processed securely through our payment partners",
        "Prices are subject to change without notice",
        "We offer a 30-day money-back guarantee for most courses",
        "Refund requests must be submitted within the specified timeframe",
        "Some promotional or discounted courses may have different refund policies"
      ]
    },
    {
      title: "Instructor Responsibilities",
      content: [
        "Instructors must provide accurate course descriptions and learning outcomes",
        "Course content must be original or properly licensed",
        "Instructors are responsible for maintaining course quality and updates",
        "Revenue sharing terms are outlined in separate instructor agreements",
        "We reserve the right to remove courses that violate our quality standards"
      ]
    },
    {
      title: "Prohibited Activities",
      content: [
        "Uploading malicious software or harmful content",
        "Harassing, threatening, or abusing other users",
        "Violating intellectual property rights",
        "Attempting to hack or compromise platform security",
        "Creating fake accounts or impersonating others",
        "Spamming or sending unsolicited communications"
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        "DablieLearn owns all platform technology and design elements",
        "Course content belongs to respective instructors or content creators",
        "Users retain rights to content they create (reviews, discussions, etc.)",
        "We respect intellectual property rights and respond to valid DMCA notices",
        "Unauthorized use of copyrighted material may result in account termination"
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        "DablieLearn provides the platform 'as is' without warranties",
        "We are not liable for any indirect, incidental, or consequential damages",
        "Our total liability is limited to the amount you paid for the specific service",
        "We do not guarantee specific learning outcomes or career advancement",
        "Users are responsible for their own learning progress and results"
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
                  Terms of{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                    Service
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Please read these terms carefully before using our platform. They govern your use of DablieLearn services.
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
                      Welcome to DablieLearn! These Terms of Service ("Terms") govern your use of our online learning platform 
                      and services. By using DablieLearn, you agree to comply with and be bound by these Terms. Please read 
                      them carefully before using our services.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Terms Sections */}
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

              {/* Governing Law */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="mt-12"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Governing Law and Disputes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        These Terms are governed by and construed in accordance with the laws of the jurisdiction 
                        where DablieLearn is headquartered, without regard to conflict of law principles.
                      </p>
                      <p>
                        Any disputes arising from these Terms or your use of DablieLearn will be resolved through 
                        binding arbitration, except where prohibited by law.
                      </p>
                      <p>
                        If any provision of these Terms is found to be unenforceable, the remaining provisions 
                        will remain in full force and effect.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="mt-8"
              >
                <Card className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-neutral-800 dark:to-neutral-700 border-rose-200 dark:border-neutral-600">
                  <CardHeader>
                    <CardTitle className="text-2xl">Questions About These Terms?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="space-y-2 text-muted-foreground">
                      <div><strong>Email:</strong> legal@dablielearn.com</div>
                      <div><strong>Address:</strong> 123 Learning Street, Education City, EC 12345</div>
                      <div><strong>Phone:</strong> +1 (555) 123-4567</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Agreement Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="mt-8"
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">
                      By continuing to use DablieLearn, you acknowledge that you have read, understood, 
                      and agree to be bound by these Terms of Service.
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