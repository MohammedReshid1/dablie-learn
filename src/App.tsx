import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

// Pages
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CategoriesPage from './pages/CategoriesPage'
import CategoryDetailPage from './pages/CategoryDetailPage'
import CourseDetailPage from './pages/CourseDetailPage'
import CourseLearnPage from './pages/CourseLearnPage'
import AboutUsPage from './pages/AboutUsPage'
import ContactUsPage from './pages/ContactUsPage'
import HelpCenterPage from './pages/HelpCenterPage'
import TeachPage from './pages/TeachPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LogoutPage from './pages/LogoutPage'
import NotFoundPage from './pages/NotFoundPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CookiesPage from './pages/CookiesPage'

// Dashboard Pages
import DashboardPage from './pages/dashboard/DashboardPage'
import MyCoursesPage from './pages/dashboard/MyCoursesPage'
import ProgressPage from './pages/dashboard/ProgressPage'

// Instructor Pages
import InstructorDashboardPage from './pages/instructor/InstructorDashboardPage'
import InstructorCoursesPage from './pages/instructor/InstructorCoursesPage'
import NewCoursePage from './pages/instructor/NewCoursePage'
import CreateCoursePage from './pages/instructor/CreateCoursePage'
import StudentProgressPage from './pages/instructor/StudentProgressPage'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:slug" element={<CategoryDetailPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/help-center" element={<HelpCenterPage />} />
            <Route path="/teach" element={<TeachPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />

            {/* Auth Routes (redirect if already logged in) */}
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <LoginPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <SignupPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/logout" element={<LogoutPage />} />

            {/* Protected Routes */}
            <Route 
              path="/courses/:id/learn" 
              element={
                <ProtectedRoute>
                  <CourseLearnPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/my-courses" 
              element={
                <ProtectedRoute>
                  <MyCoursesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/progress" 
              element={
                <ProtectedRoute>
                  <ProgressPage />
                </ProtectedRoute>
              } 
            />

            {/* Instructor Routes */}
            <Route 
              path="/instructor/dashboard" 
              element={
                <ProtectedRoute>
                  <InstructorDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/instructor/courses" 
              element={
                <ProtectedRoute>
                  <InstructorCoursesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/instructor/courses/new" 
              element={
                <ProtectedRoute>
                  <NewCoursePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/instructor/create-course" 
              element={
                <ProtectedRoute>
                  <CreateCoursePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/instructor/students/progress" 
              element={
                <ProtectedRoute>
                  <StudentProgressPage />
                </ProtectedRoute>
              } 
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App