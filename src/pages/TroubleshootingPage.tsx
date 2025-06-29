import { PageLayout } from "@/components/page-layout"
import { TroubleshootingHelper } from "@/components/TroubleshootingHelper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Wifi, 
  Database, 
  User,
  Settings,
  HelpCircle,
  ExternalLink,
  Monitor,
  Smartphone,
  Globe,
  Shield
} from "lucide-react"
import { motion } from "framer-motion"

export default function TroubleshootingPage() {
  const commonIssues = [
    {
      title: "Explore Page Loading",
      description: "Courses not appearing on the explore page",
      icon: Globe,
      solutions: [
        "Hard refresh the page (Ctrl+Shift+R)",
        "Clear browser cache and cookies",
        "Check internet connection",
        "Disable ad blockers temporarily"
      ]
    },
    {
      title: "Categories Not Loading",
      description: "Category cards not displaying properly",
      icon: Database,
      solutions: [
        "Try accessing categories directly via URL",
        "Check if other pages load correctly",
        "Verify database connection",
        "Test in incognito mode"
      ]
    },
    {
      title: "Dashboard Issues",
      description: "Dashboard showing infinite loading",
      icon: User,
      solutions: [
        "Verify you're logged in properly",
        "Check authentication token",
        "Log out and log back in",
        "Clear local storage data"
      ]
    },
    {
      title: "My Courses Empty",
      description: "Enrolled courses not showing up",
      icon: Monitor,
      solutions: [
        "Verify course enrollments in database",
        "Check RLS policies for data access",
        "Ensure courses are still published",
        "Test with sample enrollment data"
      ]
    }
  ]

  const browserSettings = [
    {
      browser: "Chrome",
      steps: [
        "Enable JavaScript: Settings → Privacy & Security → Site Settings → JavaScript",
        "Allow cookies: Settings → Privacy & Security → Cookies",
        "Clear cache: Ctrl+Shift+Delete → Select 'All time'"
      ]
    },
    {
      browser: "Firefox", 
      steps: [
        "Enable JavaScript: about:config → javascript.enabled → true",
        "Allow cookies: Settings → Privacy & Security → Cookies",
        "Clear cache: Ctrl+Shift+Delete → Select 'Everything'"
      ]
    },
    {
      browser: "Safari",
      steps: [
        "Enable JavaScript: Preferences → Security → Enable JavaScript",
        "Allow cookies: Preferences → Privacy → Cookies",
        "Clear cache: Develop → Empty Caches"
      ]
    }
  ]

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4">
                Platform{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                  Troubleshooting
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Resolve loading issues and get back to learning with our comprehensive troubleshooting guide.
              </p>
            </motion.div>
          </div>

          {/* Diagnostic Tool */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <TroubleshootingHelper />
          </motion.div>

          {/* Common Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Common Issues & Solutions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {commonIssues.map((issue, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <issue.icon className="h-5 w-5" />
                      {issue.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{issue.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {issue.solutions.map((solution, sIndex) => (
                        <div key={sIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{solution}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Browser Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Browser Configuration</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {browserSettings.map((browser, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      {browser.browser}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {browser.steps.map((step, sIndex) => (
                        <div key={sIndex} className="text-sm">
                          <strong>{step.split(':')[0]}:</strong>
                          <span className="text-muted-foreground ml-1">
                            {step.split(':').slice(1).join(':')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Network Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Network Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Required Connections:</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Stable internet connection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Access to supabase.co domain</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">DNS resolution working</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">No corporate firewall blocking</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Browser Permissions:</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">JavaScript enabled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Cookies allowed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Local storage enabled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Pop-ups allowed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Emergency Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Reset Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If all else fails, try these nuclear options:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => {
                      localStorage.clear()
                      sessionStorage.clear()
                      window.location.reload()
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear All Data & Reload
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => window.open(window.location.href, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => {
                      const userAgent = navigator.userAgent
                      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
                      alert(`Device: ${isMobile ? 'Mobile' : 'Desktop'}\nBrowser: ${userAgent.split(' ').pop()}`)
                    }}
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Check Device Info
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => window.open('mailto:support@dablielearn.com?subject=Platform Loading Issues')}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Success Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="border-green-200 bg-green-50 dark:bg-green-900/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  Success Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Platform Working Correctly:</h3>
                    <div className="space-y-2 text-sm">
                      <div>✅ Course cards visible on Explore page</div>
                      <div>✅ Category navigation functional</div>
                      <div>✅ Dashboard loads with user data</div>
                      <div>✅ My Courses shows enrollments</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Features Working:</h3>
                    <div className="space-y-2 text-sm">
                      <div>✅ Search and filters responsive</div>
                      <div>✅ Course details accessible</div>
                      <div>✅ User authentication working</div>
                      <div>✅ Progress tracking functional</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}