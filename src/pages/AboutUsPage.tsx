import { PageLayout } from "@/components/page-layout"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Globe, Heart, Lightbulb } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function AboutUsPage() {
  const stats = [
    { label: "Students Worldwide", value: "50,000+", icon: Users },
    { label: "Expert Instructors", value: "500+", icon: Target },
    { label: "Courses Available", value: "1,200+", icon: Award },
    { label: "Countries Reached", value: "150+", icon: Globe },
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion for Learning",
      description: "We believe learning should be engaging, accessible, and transformative for everyone."
    },
    {
      icon: Target,
      title: "Quality First",
      description: "Every course is carefully crafted by industry experts to ensure the highest quality education."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our vibrant community of learners and instructors supports each other's growth and success."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously innovate our platform to provide the best learning experience possible."
    }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Former tech executive with 15+ years of experience in education technology."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Full-stack developer and architect with expertise in scalable learning platforms."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Content",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Educational designer with a passion for creating engaging learning experiences."
    },
    {
      name: "David Kim",
      role: "Head of Community",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Community builder focused on creating supportive learning environments."
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeLink="About Us" />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800 py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Empowering learners{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                    worldwide
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  DablieLearn is on a mission to democratize education and make high-quality learning 
                  accessible to everyone, everywhere. We believe that knowledge has the power to 
                  transform lives and create opportunities.
                </p>
                <Button 
                  asChild 
                  size="lg"
                  className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                >
                  <Link to="/courses">Start Learning Today</Link>
                </Button>
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
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-lg text-muted-foreground">
                  How we started and where we're going
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Founded on a Simple Belief</h3>
                  <p className="text-muted-foreground mb-6">
                    In 2020, our founders recognized that traditional education wasn't keeping pace 
                    with the rapidly evolving job market. They envisioned a platform where anyone 
                    could learn practical, in-demand skills from industry experts.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    What started as a small team of passionate educators and technologists has grown 
                    into a global community of learners, instructors, and innovators working together 
                    to shape the future of education.
                  </p>
                  <p className="text-muted-foreground">
                    Today, we're proud to serve students in over 150 countries, offering courses 
                    that bridge the gap between education and employment.
                  </p>
                </div>
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=400&width=500"
                    alt="Our team working together"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center">
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground">
                The passionate people behind DablieLearn
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                        <p className="text-rose-600 font-medium mb-3">{member.role}</p>
                        <p className="text-sm text-muted-foreground">{member.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're a learner looking to advance your career or an expert wanting to 
                share your knowledge, there's a place for you in our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                >
                  <Link to="/signup">Start Learning</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/teach">Become an Instructor</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}