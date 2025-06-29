import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'

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
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/courses/:id/learn" element={<CourseLearnPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:slug" element={<CategoryDetailPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
          <Route path="/teach" element={<TeachPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/my-courses" element={<MyCoursesPage />} />
          <Route path="/dashboard/progress" element={<ProgressPage />} />

          {/* Instructor Routes */}
          <Route path="/instructor/dashboard" element={<InstructorDashboardPage />} />
          <Route path="/instructor/courses" element={<InstructorCoursesPage />} />
          <Route path="/instructor/courses/new" element={<NewCoursePage />} />
          <Route path="/instructor/create-course" element={<CreateCoursePage />} />
          <Route path="/instructor/students/progress" element={<StudentProgressPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App