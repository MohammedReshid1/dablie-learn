import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, CheckCircle, DollarSign, Users, Award } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export default function TeachPage() {
  return (
    <PageLayout>
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
                Share Your Knowledge and{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Earn</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of instructors teaching millions of students on DablieLearn. Create an online course and
                earn income by sharing your expertise.
              </p>
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                asChild
              >
                <Link href="/instructor/create">Start Teaching Today</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Why Teach on{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                  DablieLearn
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform provides everything you need to create and sell high-quality online courses.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-card border-border">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-rose-100 dark:bg-secondary flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-rose-600 dark:text-rose-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Earn Revenue</h3>
                  <p className="text-muted-foreground">
                    Earn money every time a student purchases your course. Our revenue share model ensures you get paid
                    fairly for your expertise.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-orange-100 dark:bg-secondary flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Reach Millions</h3>
                  <p className="text-muted-foreground">
                    Get access to millions of students across the globe who are eager to learn from experts like you.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-fuchsia-100 dark:bg-secondary flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-fuchsia-600 dark:text-fuchsia-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Powerful Tools</h3>
                  <p className="text-muted-foreground">
                    Our intuitive course creation tools make it easy to build engaging courses with videos, quizzes, and
                    assignments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">How to Get Started</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-foreground">Plan Your Course</h3>
                      <p className="text-muted-foreground">
                        Decide what you'll teach and how you'll structure your course to provide the most value to
                        students.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-foreground">Create Your Content</h3>
                      <p className="text-muted-foreground">
                        Record high-quality videos, create engaging assignments, and develop comprehensive resources.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-foreground">Launch and Promote</h3>
                      <p className="text-muted-foreground">
                        Publish your course and use our marketing tools to reach students interested in your topic.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    asChild
                    className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                  >
                    <Link href="/instructor/create">
                      Create Your Course <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square relative">
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="Instructor teaching"
                    className="rounded-xl object-cover h-full w-full"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-card rounded-xl p-4 shadow-lg border dark:border-neutral-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-10 w-10 text-green-500 dark:text-green-400" />
                    <div>
                      <div className="font-medium text-foreground">Join 10,000+ instructors</div>
                      <div className="text-sm text-muted-foreground">Teaching on DablieLearn</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
