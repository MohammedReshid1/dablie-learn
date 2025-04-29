import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactUsPage() {
  return (
    <PageLayout>
      <div className="container py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Fill out the form below or reach out to us
              directly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-full">
                  <Mail className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email Us</h3>
                  <p className="text-muted-foreground text-sm mb-1">For general inquiries:</p>
                  <a href="mailto:info@dablielearn.com" className="text-rose-500 hover:text-rose-600 transition-colors">
                    info@dablielearn.com
                  </a>
                  <p className="text-muted-foreground text-sm mt-2 mb-1">For support:</p>
                  <a
                    href="mailto:support@dablielearn.com"
                    className="text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    support@dablielearn.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-full">
                  <Phone className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Call Us</h3>
                  <p className="text-muted-foreground text-sm mb-1">Monday to Friday, 9am to 5pm</p>
                  <a href="tel:+1234567890" className="text-rose-500 hover:text-rose-600 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Visit Us</h3>
                  <p className="text-muted-foreground text-sm">
                    123 Learning Street
                    <br />
                    Suite 456
                    <br />
                    San Francisco, CA 94105
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-card p-8 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What is this regarding?" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your message" rows={5} />
                  </div>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
