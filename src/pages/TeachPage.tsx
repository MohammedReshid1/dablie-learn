import { PageLayout } from "@/components/page-layout"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, DollarSign, Users, Video, Award, TrendingUp, Globe, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"

export default function TeachPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
    courseIdea: ""
  })

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Money",
      description: "Set your own price and earn up to 70% revenue share on every course sale."
    },
    {
      icon: Users,
      title: "Reach Students Globally",
      description: "Connect with thousands of eager learners from around the world."
    },
    {
      icon: Video,
      title: "Easy Course Creation",
      description: "Our intuitive tools make it simple to create and publish your courses."
    },
    {
      icon: Award,
      title: "Build Your Brand",
      description: "Establish yourself as an expert and grow your professional reputation."
    }
  ]

  const stats = [
    { value: "500+", label: "Active Instructors" },
    { value: "$2M+", label: "Paid to Instructors" },
    { value: "50k+", label: "Students Taught" },
    { value: "4.8", label: "Average Rating" }
  ]

  const steps = [
    {
      step: "1",
      title: "Apply to Teach",
      description: "Fill out our application form and tell us about your expertise."
    },
    {
      step: "2", 
      title: "Get Approved",
      description: "Our team will review your application and get back to you within 48 hours."
    },
    {
      step: "3",
      title: "Create Your Course",
      description: "Use our course creation tools to build engaging content."
    },
    {
      step: "4",
      title: "Start Earning",
      description: "Publish your course and start earning money from day one."
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeLink="Teach" />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800 py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Teach and{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                    inspire
                  </span>{" "}
                  millions
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Share your knowledge with learners around the world. Create online courses, 
                  build your brand, and earn money doing what you love.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                  >
                    <a href="#apply">Start Teaching Today</a>
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Instructor teaching online"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold">$5,000+</div>
                      <div className="text-sm text-muted-foreground">Monthly earnings</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-rose-600 mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Teach on DablieLearn?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of instructors who are already building successful teaching careers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center">
                        <benefit.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Get started in just 4 simple steps
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center relative"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-xl flex items-center justify-center">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                    
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-rose-500 to-orange-500"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-lg text-muted-foreground">
                Hear from our top instructors
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Web Development Instructor",
                  image: "/placeholder.svg?height=100&width=100",
                  quote: "Teaching on DablieLearn has allowed me to reach students globally and build a sustainable income stream.",
                  earnings: "$15,000/month",
                  students: "25,000+"
                },
                {
                  name: "Michael Chen",
                  role: "Data Science Expert",
                  image: "/placeholder.svg?height=100&width=100",
                  quote: "The platform's tools make it easy to create engaging content and track student progress.",
                  earnings: "$12,000/month",
                  students: "18,000+"
                },
                {
                  name: "Emily Rodriguez",
                  role: "Design Instructor",
                  image: "/placeholder.svg?height=100&width=100",
                  quote: "I love the community aspect and how supportive both students and fellow instructors are.",
                  earnings: "$8,000/month",
                  students: "12,000+"
                }
              ].map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h3 className="font-bold">{story.name}</h3>
                          <p className="text-sm text-muted-foreground">{story.role}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 italic">"{story.quote}"</p>
                      <div className="flex justify-between text-sm">
                        <div>
                          <div className="font-bold text-green-600">{story.earnings}</div>
                          <div className="text-muted-foreground">Monthly earnings</div>
                        </div>
                        <div>
                          <div className="font-bold">{story.students}</div>
                          <div className="text-muted-foreground">Students</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-20">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Teaching?</h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and we'll get back to you within 48 hours
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Instructor Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="expertise">Area of Expertise</Label>
                      <Input
                        id="expertise"
                        name="expertise"
                        placeholder="e.g., Web Development, Data Science, Digital Marketing"
                        value={formData.expertise}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="experience">Teaching/Professional Experience</Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        placeholder="Tell us about your background and experience..."
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="courseIdea">Course Idea</Label>
                      <Textarea
                        id="courseIdea"
                        name="courseIdea"
                        placeholder="What course would you like to create? Describe the content and target audience..."
                        value={formData.courseIdea}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                    >
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How much can I earn as an instructor?",
                  answer: "Instructors earn up to 70% revenue share on course sales. Top instructors earn $5,000-$20,000+ per month."
                },
                {
                  question: "What equipment do I need to create courses?",
                  answer: "You'll need a computer, microphone, and screen recording software. We provide detailed guides on equipment recommendations."
                },
                {
                  question: "How long does the approval process take?",
                  answer: "We review applications within 48 hours. Once approved, you can start creating your course immediately."
                },
                {
                  question: "Do you provide marketing support?",
                  answer: "Yes! We help promote your courses through our platform, email marketing, and social media channels."
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}