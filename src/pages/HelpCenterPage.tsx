import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Users, CreditCard, Settings, MessageCircle, ChevronRight, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of using DablieLearn",
      articles: 12,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Account & Profile",
      description: "Manage your account settings and profile",
      articles: 8,
      color: "from-green-500 to-green-600"
    },
    {
      icon: CreditCard,
      title: "Billing & Payments",
      description: "Payment methods, refunds, and billing",
      articles: 15,
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Settings,
      title: "Technical Support",
      description: "Troubleshooting and technical issues",
      articles: 10,
      color: "from-orange-500 to-orange-600"
    }
  ]

  const popularArticles = [
    {
      title: "How to enroll in a course",
      category: "Getting Started",
      views: "15.2k views",
      rating: 4.8
    },
    {
      title: "How to reset your password",
      category: "Account & Profile", 
      views: "12.8k views",
      rating: 4.9
    },
    {
      title: "Refund policy and process",
      category: "Billing & Payments",
      views: "9.5k views",
      rating: 4.7
    },
    {
      title: "Video playback issues",
      category: "Technical Support",
      views: "8.3k views",
      rating: 4.6
    },
    {
      title: "How to download course materials",
      category: "Getting Started",
      views: "7.9k views",
      rating: 4.8
    },
    {
      title: "Updating payment information",
      category: "Billing & Payments",
      views: "6.4k views",
      rating: 4.5
    }
  ]

  const quickActions = [
    {
      title: "Contact Support",
      description: "Get help from our support team",
      action: "Contact Us",
      link: "/contact-us"
    },
    {
      title: "Report a Problem",
      description: "Report technical issues or bugs",
      action: "Report Issue",
      link: "/contact-us"
    },
    {
      title: "Feature Request",
      description: "Suggest new features or improvements",
      action: "Submit Request",
      link: "/contact-us"
    }
  ]

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
                  How can we{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                    help you?
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Search our knowledge base or browse categories to find answers to your questions.
                </p>
                
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for help articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-6 text-base"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
              <p className="text-lg text-muted-foreground">
                Find help articles organized by topic
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-rose-600 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {category.description}
                      </p>
                      <Badge variant="outline">
                        {category.articles} articles
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Articles</h2>
              <p className="text-lg text-muted-foreground">
                Most viewed help articles
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg hover:text-rose-600 transition-colors">
                                {article.title}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {article.category}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{article.views}</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                <span>{article.rating}</span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredArticles.length === 0 && searchTerm && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No articles found for "{searchTerm}"
                  </p>
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-lg text-muted-foreground">
                Can't find what you're looking for? We're here to help.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{action.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {action.description}
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link to={action.link}>{action.action}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "How do I access my purchased courses?",
                  answer: "Once you purchase a course, it will appear in your dashboard under 'My Courses'. You'll have lifetime access to all course materials."
                },
                {
                  question: "Can I get a refund for a course?",
                  answer: "Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied, you can request a full refund within 30 days of purchase."
                },
                {
                  question: "Do I get a certificate after completing a course?",
                  answer: "Yes, you'll receive a certificate of completion for every course you finish. Certificates can be downloaded and shared on professional networks."
                },
                {
                  question: "Can I download course videos for offline viewing?",
                  answer: "Course videos can be downloaded through our mobile app for offline viewing. This feature is available for all enrolled students."
                },
                {
                  question: "How do I become an instructor?",
                  answer: "You can apply to become an instructor by visiting our 'Teach' page and filling out the application form. Our team will review your application within 48 hours."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}