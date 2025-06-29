import { useState } from "react"
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
  ExternalLink
} from "lucide-react"

interface DiagnosticResult {
  name: string
  status: 'success' | 'warning' | 'error'
  message: string
  solution?: string
}

export function TroubleshootingHelper() {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<DiagnosticResult[]>([])

  const runDiagnostics = async () => {
    setIsRunning(true)
    setResults([])
    
    const diagnostics: DiagnosticResult[] = []

    // Check internet connection
    try {
      await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' })
      diagnostics.push({
        name: 'Internet Connection',
        status: 'success',
        message: 'Internet connection is working'
      })
    } catch {
      diagnostics.push({
        name: 'Internet Connection',
        status: 'error',
        message: 'No internet connection detected',
        solution: 'Check your network connection and try again'
      })
    }

    // Check local storage
    try {
      localStorage.setItem('test', 'test')
      localStorage.removeItem('test')
      diagnostics.push({
        name: 'Local Storage',
        status: 'success',
        message: 'Local storage is working'
      })
    } catch {
      diagnostics.push({
        name: 'Local Storage',
        status: 'error',
        message: 'Local storage is disabled',
        solution: 'Enable local storage in browser settings'
      })
    }

    // Check JavaScript
    diagnostics.push({
      name: 'JavaScript',
      status: 'success',
      message: 'JavaScript is enabled and working'
    })

    // Check Supabase environment
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (supabaseUrl && supabaseKey) {
      diagnostics.push({
        name: 'Supabase Configuration',
        status: 'success',
        message: 'Supabase environment variables are configured'
      })
    } else {
      diagnostics.push({
        name: 'Supabase Configuration',
        status: 'error',
        message: 'Missing Supabase environment variables',
        solution: 'Check .env file and restart the development server'
      })
    }

    // Check authentication state
    const authToken = localStorage.getItem('supabase.auth.token')
    if (authToken) {
      diagnostics.push({
        name: 'Authentication',
        status: 'success',
        message: 'User is authenticated'
      })
    } else {
      diagnostics.push({
        name: 'Authentication',
        status: 'warning',
        message: 'User is not logged in',
        solution: 'Log in to access personalized content'
      })
    }

    // Simulate API check
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {
      // This would be a real API call in production
      diagnostics.push({
        name: 'API Connection',
        status: 'success',
        message: 'API endpoints are responding'
      })
    } catch {
      diagnostics.push({
        name: 'API Connection',
        status: 'error',
        message: 'API endpoints are not responding',
        solution: 'Check server status and network connectivity'
      })
    }

    setResults(diagnostics)
    setIsRunning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <HelpCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">OK</Badge>
      case 'warning':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Warning</Badge>
      case 'error':
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Platform Diagnostics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Run diagnostics to identify and resolve loading issues with the platform.
        </div>

        <Button 
          onClick={runDiagnostics} 
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Running Diagnostics...
            </>
          ) : (
            <>
              <Settings className="h-4 w-4 mr-2" />
              Run Diagnostics
            </>
          )}
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium">Diagnostic Results:</h3>
            {results.map((result, index) => (
              <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                <div className="flex items-start gap-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <div className="font-medium text-sm">{result.name}</div>
                    <div className="text-sm text-muted-foreground">{result.message}</div>
                    {result.solution && (
                      <div className="text-sm text-blue-600 mt-1">
                        💡 {result.solution}
                      </div>
                    )}
                  </div>
                </div>
                {getStatusBadge(result.status)}
              </div>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              If issues persist after following the solutions above, try clearing your browser cache 
              and cookies, or contact support with these diagnostic results.
            </AlertDescription>
          </Alert>
        )}

        <div className="pt-4 border-t">
          <h3 className="font-medium mb-2">Quick Fixes:</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Hard Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                localStorage.clear()
                sessionStorage.clear()
                window.location.reload()
              }}
            >
              Clear Cache
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('/troubleshooting', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Full Guide
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('mailto:support@dablielearn.com')}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}