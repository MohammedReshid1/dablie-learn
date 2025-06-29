import { PageLayout } from "@/components/page-layout"
import { LandingHero } from "@/components/landing-hero"
import { FeaturedCourses } from "@/components/featured-courses"
import { Categories } from "@/components/categories"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { Instructors } from "@/components/instructors"
import { Newsletter } from "@/components/newsletter"

export default function HomePage() {
  return (
    <PageLayout>
      <LandingHero />
      <FeaturedCourses />
      <Categories />
      <HowItWorks />
      <Testimonials />
      <Instructors />
      <Newsletter />
    </PageLayout>
  )
}