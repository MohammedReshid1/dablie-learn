import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function CookiesPage() {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      purpose: "Required for basic website functionality",
      examples: ["User authentication", "Security features", "Form submissions"],
      retention: "Session or until logout",
      canDisable: false,
      badge: "Required"
    },
    {
      name: "Performance Cookies",
      purpose: "Help us understand how visitors use our website",
      examples: ["Page views", "Time spent on pages", "Error tracking"],
      retention: "Up to 2 years",
      canDisable: true,
      badge: "Optional"
    },
    {
      name: "Functional Cookies",
      purpose: "Remember your preferences and settings",
      examples: ["Language preferences", "Theme settings", "Course progress"],
      retention: "Up to 1 year",
      canDisable: true,
      badge: "Optional"
    },
    {
      name: "Analytics Cookies",
      purpose: "Help us improve our platform based on usage data",
      examples: ["Google Analytics", "User behavior tracking", "Feature usage"],
      retention: "Up to 2 years",
      canDisable: true,
      badge: "Optional"
    }
  ]

  const thirdPartyServices = [
    {
      name: "Google Analytics",
      purpose: "Website analytics and performance monitoring",
      dataCollected: "Page views, user interactions, device information",
      privacy: "https://policies.google.com/privacy"
    },
    {
      name: "Stripe",
      purpose: "Payment processing for course purchases",
      dataCollected: "Payment information, transaction data",
      privacy: "https://stripe.com/privacy"
    },
    {
      name: "Supabase",
      purpose: "Database and authentication services",
      dataCollected: "User account data, course progress",
      privacy: "https://supabase.com/privacy"
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
                  Cookie{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                    Policy
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Learn about how we use cookies and similar technologies to improve your experience on DablieLearn.
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
                    <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
                    <p className="text-lg leading-relaxed mb-4">
                      Cookies are small text files that are stored on your device when you visit our website. They help us 
                      provide you with a better experience by remembering your preferences, keeping you logged in, and 
                      helping us understand how you use our platform.
                    </p>
                    <p className="text-muted-foreground">
                      This Cookie Policy explains what cookies we use, why we use them, and how you can control them.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cookie Types */}
              <div className="mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-bold mb-4">Types of Cookies We Use</h2>
                  <p className="text-lg text-muted-foreground">
                    We use different types of cookies for various purposes
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  {cookieTypes.map((cookie, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl">{cookie.name}</CardTitle>
                            <Badge 
                              variant={cookie.canDisable ? "outline" : "default"}
                              className={cookie.canDisable ? "" : "bg-gradient-to-r from-rose-500 to-orange-500"}
                            >
                              {cookie.badge}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{cookie.purpose}</p>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-sm mb-2">Examples:</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {cookie.examples.map((example, i) => (
                                  <li key={i} className="flex items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 mt-2 mr-2 flex-shrink-0"></div>
                                    {example}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="pt-2 border-t">
                              <div className="text-sm">
                                <span className="font-medium">Retention:</span> {cookie.retention}
                              </div>
                              <div className="text-sm mt-1">
                                <span className="font-medium">Can be disabled:</span> {cookie.canDisable ? "Yes" : "No"}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Third Party Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mb-12"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Third-Party Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      We use trusted third-party services that may also set cookies. Here are the main services we use:
                    </p>
                    
                    <div className="space-y-6">
                      {thirdPartyServices.map((service, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-lg">{service.name}</h3>
                            <Button variant="outline" size="sm" asChild>
                              <a href={service.privacy} target="_blank" rel="noopener noreferrer">
                                Privacy Policy
                              </a>
                            </Button>
                          </div>
                          <p className="text-muted-foreground mb-2">{service.purpose}</p>
                          <div className="text-sm">
                            <span className="font-medium">Data collected:</span> {service.dataCollected}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cookie Control */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mb-12"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Managing Your Cookie Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2">Browser Settings</h3>
                        <p className="text-muted-foreground mb-3">
                          You can control cookies through your browser settings. Most browsers allow you to:
                        </p>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 mt-2 mr-3 flex-shrink-0"></div>
                            View and delete existing cookies
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 mt-2 mr-3 flex-shrink-0"></div>
                            Block cookies from specific websites
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 mt-2 mr-3 flex-shrink-0"></div>
                            Block all cookies (may affect website functionality)
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 mt-2 mr-3 flex-shrink-0"></div>
                            Delete cookies when you close your browser
                          </li>
                        </ul>
                      </div>

                      <div className="pt-4 border-t">
                        <h3 className="font-bold text-lg mb-2">Platform Settings</h3>
                        <p className="text-muted-foreground mb-4">
                          You can also manage some cookie preferences through your DablieLearn account settings.
                        </p>
                        <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                          Manage Cookie Preferences
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Important Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="mb-8"
              >
                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-sm flex items-center justify-center mr-2">!</span>
                      Important Notice
                    </h3>
                    <p className="text-muted-foreground">
                      Disabling certain cookies may affect the functionality of DablieLearn. Essential cookies cannot be 
                      disabled as they are necessary for the platform to work properly. If you disable optional cookies, 
                      some features like progress tracking and personalized recommendations may not work as expected.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Questions About Cookies?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      If you have any questions about our use of cookies, please contact us:
                    </p>
                    <div className="space-y-2 text-muted-foreground">
                      <div><strong>Email:</strong> privacy@dablielearn.com</div>
                      <div><strong>Address:</strong> 123 Learning Street, Education City, EC 12345</div>
                      <div><strong>Phone:</strong> +1 (555) 123-4567</div>
                    </div>
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