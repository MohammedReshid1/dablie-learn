import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Custom SVG icons
const MissionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-rose-500"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

const VisionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-orange-500"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
  </svg>
)

const ValuesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-fuchsia-500"
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <path d="M8 18v4" />
    <path d="M16 18v4" />
    <path d="M2 8h4" />
    <path d="M2 16h4" />
    <path d="M18 8h4" />
    <path d="M18 16h4" />
    <path d="M12 2v20" />
    <path d="M2 12h20" />
  </svg>
)

export default function AboutUsPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/20 transition-colors duration-300">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                DablieLearn
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Our mission is to provide accessible, high-quality education to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  DablieLearn was founded in 2023 with a simple mission: to make quality education accessible to
                  everyone, everywhere. We believe that learning should be engaging, affordable, and tailored to the
                  needs of modern learners.
                </p>
                <p>
                  What started as a small collection of courses has grown into a global learning platform with thousands
                  of instructors teaching millions of students across the world. Our diverse catalog covers everything
                  from technical skills to creative pursuits, business knowledge to personal development.
                </p>
                <p>
                  We're committed to helping individuals and organizations unlock their potential through the power of
                  education. Whether you're looking to advance your career, master a new skill, or pursue a passion,
                  DablieLearn is here to support your learning journey.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-rose-500/20 to-orange-500/20 dark:from-rose-500/10 dark:to-orange-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 dark:from-fuchsia-500/10 dark:to-rose-500/10 rounded-full blur-xl" />
              <div className="aspect-square relative">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="DablieLearn team"
                  className="rounded-xl object-cover h-full w-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                Core Principles
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              These foundational principles guide everything we do at DablieLearn.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-sm">
              <div className="mb-6">
                <MissionIcon />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">Our Mission</h3>
              <p className="text-muted-foreground">
                To transform lives through accessible, high-quality education that empowers individuals to achieve their
                personal and professional goals.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm">
              <div className="mb-6">
                <VisionIcon />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">Our Vision</h3>
              <p className="text-muted-foreground">
                A world where anyone, anywhere can transform their life through access to high-quality learning
                experiences.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm">
              <div className="mb-6">
                <ValuesIcon />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">Our Approach</h3>
              <p className="text-muted-foreground">
                We combine cutting-edge technology with expert instruction to create engaging, effective, and
                personalized learning experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/20 transition-colors duration-300">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
              Join Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                Learning Community
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're looking to learn new skills, advance your career, or share your expertise as an instructor,
              DablieLearn has a place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
              >
                <Link href="/signup">Start Learning</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/teach">Become an Instructor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
