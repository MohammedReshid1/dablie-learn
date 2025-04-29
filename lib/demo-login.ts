// This is a mock service for demo login functionality
// In a real application, this would be replaced with actual authentication

export type UserRole = "student" | "instructor"

export interface DemoUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
}

// Demo users for testing
export const demoUsers: Record<UserRole, DemoUser> = {
  student: {
    id: "demo-student-1",
    name: "Demo Student",
    email: "student@dablielearn.com",
    role: "student",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  instructor: {
    id: "demo-instructor-1",
    name: "Demo Instructor",
    email: "instructor@dablielearn.com",
    role: "instructor",
    avatar: "/placeholder.svg?height=40&width=40",
  },
}

// Mock login function
export async function demoLogin(role: UserRole): Promise<DemoUser> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Return the demo user for the specified role
  return demoUsers[role]
}
