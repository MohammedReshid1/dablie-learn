import { supabase } from './supabase'
import type { Database } from './database.types'

type Course = Database['public']['Tables']['courses']['Row']
type CourseInsert = Database['public']['Tables']['courses']['Insert']
type CourseUpdate = Database['public']['Tables']['courses']['Update']
type Category = Database['public']['Tables']['categories']['Row']
type Enrollment = Database['public']['Tables']['enrollments']['Row']

// Placeholder data for when Supabase is not available
const PLACEHOLDER_COURSES = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    title: "Complete Web Development Bootcamp",
    slug: "complete-web-development-bootcamp",
    description: "Master web development from scratch with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and become a full-stack developer.",
    instructor_id: "instructor-1",
    category_id: "cat-1",
    price: 89.99,
    level: "beginner",
    duration_hours: 42,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: { name: "Development", slug: "development", color: "from-sky-400 to-blue-600" },
    profiles: { full_name: "Sarah Johnson", avatar_url: null }
  },
  {
    id: "b2c3d4e5-f6g7-8901-2345-678901bcdefg",
    title: "UI/UX Design Masterclass",
    slug: "ui-ux-design-masterclass",
    description: "Learn user interface and user experience design from industry experts. Master Figma, design systems, and create stunning user experiences.",
    instructor_id: "instructor-2",
    category_id: "cat-2",
    price: 79.99,
    level: "intermediate",
    duration_hours: 38,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: { name: "Design", slug: "design", color: "from-purple-400 to-indigo-600" },
    profiles: { full_name: "Michael Chen", avatar_url: null }
  }
]

export const courses = {
  // Get all published courses
  async getPublishedCourses() {
    try {
      console.log('Fetching published courses...')
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          categories (name, slug, color),
          profiles (full_name)
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase error fetching courses:', error)
        console.log('Returning placeholder courses data')
        return { data: PLACEHOLDER_COURSES, error: null }
      }
      
      if (!data || data.length === 0) {
        console.log('No courses found, returning placeholder data')
        return { data: PLACEHOLDER_COURSES, error: null }
      }
      
      console.log('Successfully fetched courses:', data.length)
      return { data, error: null }
    } catch (err) {
      console.error('Error in getPublishedCourses:', err)
      return { data: PLACEHOLDER_COURSES, error: null }
    }
  },

  // Get courses by category
  async getCoursesByCategory(categorySlug: string) {
    try {
      console.log('Fetching courses for category:', categorySlug)
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          categories!inner (name, slug, color),
          profiles (full_name)
        `)
        .eq('is_published', true)
        .eq('categories.slug', categorySlug)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase error fetching category courses:', error)
        // Return filtered placeholder data
        const filteredCourses = PLACEHOLDER_COURSES.filter(course => 
          course.categories?.slug === categorySlug
        )
        return { data: filteredCourses, error: null }
      }
      
      if (!data || data.length === 0) {
        console.log('No courses found for category, returning placeholder data')
        const filteredCourses = PLACEHOLDER_COURSES.filter(course => 
          course.categories?.slug === categorySlug
        )
        return { data: filteredCourses, error: null }
      }
      
      return { data, error: null }
    } catch (err) {
      console.error('Error in getCoursesByCategory:', err)
      const filteredCourses = PLACEHOLDER_COURSES.filter(course => 
        course.categories?.slug === categorySlug
      )
      return { data: filteredCourses, error: null }
    }
  },

  // Get course by ID
  async getCourseById(id: string) {
    try {
      console.log('Fetching course by ID:', id)
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          categories (name, slug, color),
          profiles (full_name, avatar_url)
        `)
        .eq('id', id)
        .single()
      
      if (error && error.code === 'PGRST116') {
        console.log('Course not found, returning placeholder data')
        // Return mock course data
        return {
          data: {
            id: id,
            title: 'Sample Course - Complete Web Development',
            slug: 'sample-course-web-development',
            description: 'This is a sample course demonstrating the platform capabilities. Learn modern web development with hands-on projects and real-world applications.',
            instructor_id: 'sample-instructor-id',
            category_id: 'sample-category-id',
            price: 99.99,
            level: 'intermediate',
            duration_hours: 40,
            image_url: '/placeholder.svg?height=400&width=600',
            is_published: true,
            is_bestseller: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            categories: {
              name: 'Development',
              slug: 'development',
              color: 'from-sky-400 to-blue-600'
            },
            profiles: {
              full_name: 'Sarah Johnson',
              avatar_url: null
            }
          },
          error: null
        }
      }
      
      if (error) {
        console.error('Supabase error fetching course:', error)
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (err) {
      console.error('Error in getCourseById:', err)
      return { data: null, error: err }
    }
  },

  // Get course by slug
  async getCourseBySlug(slug: string) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          categories (name, slug, color),
          profiles (full_name, avatar_url)
        `)
        .eq('slug', slug)
        .single()
      
      return { data, error }
    } catch (err) {
      console.error('Error in getCourseBySlug:', err)
      return { data: null, error: err }
    }
  },

  // Create new course
  async createCourse(course: CourseInsert) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert(course)
        .select()
        .single()
      
      return { data, error }
    } catch (err) {
      console.error('Error in createCourse:', err)
      return { data: null, error: err }
    }
  },

  // Update course
  async updateCourse(id: string, updates: CourseUpdate) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      return { data, error }
    } catch (err) {
      console.error('Error in updateCourse:', err)
      return { data: null, error: err }
    }
  },

  // Delete course
  async deleteCourse(id: string) {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id)
      
      return { error }
    } catch (err) {
      console.error('Error in deleteCourse:', err)
      return { error: err }
    }
  },

  // Get instructor's courses
  async getInstructorCourses(instructorId: string) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          categories (name, slug, color)
        `)
        .eq('instructor_id', instructorId)
        .order('created_at', { ascending: false })
      
      return { data, error }
    } catch (err) {
      console.error('Error in getInstructorCourses:', err)
      return { data: [], error: err }
    }
  },

  // Enroll in course
  async enrollInCourse(courseId: string, studentId: string) {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .insert({
          course_id: courseId,
          student_id: studentId,
        })
        .select()
        .single()
      
      return { data, error }
    } catch (err) {
      console.error('Error in enrollInCourse:', err)
      return { data: null, error: err }
    }
  },

  // Get user enrollments
  async getUserEnrollments(userId: string) {
    try {
      console.log('Fetching enrollments for user:', userId)
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (
            id,
            title,
            slug,
            image_url,
            duration_hours,
            categories (name, color),
            profiles (full_name)
          )
        `)
        .eq('student_id', userId)
        .order('enrolled_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching enrollments:', error)
        // Return mock data if no enrollments exist or there's an error
        return { 
          data: [
            {
              id: 'mock-1',
              student_id: userId,
              course_id: 'mock-course-1',
              enrolled_at: new Date().toISOString(),
              progress: 65,
              completed_at: null,
              courses: {
                id: 'mock-course-1',
                title: 'Complete Web Development Bootcamp',
                slug: 'complete-web-development-bootcamp',
                image_url: '/placeholder.svg?height=400&width=600',
                duration_hours: 42,
                categories: { name: 'Development', color: 'from-sky-400 to-blue-600' },
                profiles: { full_name: 'Sarah Johnson' }
              }
            },
            {
              id: 'mock-2',
              student_id: userId,
              course_id: 'mock-course-2',
              enrolled_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              progress: 30,
              completed_at: null,
              courses: {
                id: 'mock-course-2',
                title: 'UI/UX Design Masterclass',
                slug: 'ui-ux-design-masterclass',
                image_url: '/placeholder.svg?height=400&width=600',
                duration_hours: 38,
                categories: { name: 'Design', color: 'from-purple-400 to-indigo-600' },
                profiles: { full_name: 'Michael Chen' }
              }
            }
          ], 
          error: null 
        }
      }
      
      if (!data || data.length === 0) {
        console.log('No enrollments found, returning mock data')
        return { 
          data: [
            {
              id: 'mock-1',
              student_id: userId,
              course_id: 'mock-course-1',
              enrolled_at: new Date().toISOString(),
              progress: 65,
              completed_at: null,
              courses: {
                id: 'mock-course-1',
                title: 'Complete Web Development Bootcamp',
                slug: 'complete-web-development-bootcamp',
                image_url: '/placeholder.svg?height=400&width=600',
                duration_hours: 42,
                categories: { name: 'Development', color: 'from-sky-400 to-blue-600' },
                profiles: { full_name: 'Sarah Johnson' }
              }
            }
          ], 
          error: null 
        }
      }
      
      return { data, error: null }
    } catch (err) {
      console.error('Error in getUserEnrollments:', err)
      return { 
        data: [
          {
            id: 'mock-1',
            student_id: userId,
            course_id: 'mock-course-1',
            enrolled_at: new Date().toISOString(),
            progress: 65,
            completed_at: null,
            courses: {
              id: 'mock-course-1',
              title: 'Complete Web Development Bootcamp',
              slug: 'complete-web-development-bootcamp',
              image_url: '/placeholder.svg?height=400&width=600',
              duration_hours: 42,
              categories: { name: 'Development', color: 'from-sky-400 to-blue-600' },
              profiles: { full_name: 'Sarah Johnson' }
            }
          }
        ], 
        error: null 
      }
    }
  },

  // Update enrollment progress
  async updateEnrollmentProgress(enrollmentId: string, progress: number) {
    try {
      const updates: any = { progress }
      
      // Mark as completed if progress is 100%
      if (progress >= 100) {
        updates.completed_at = new Date().toISOString()
      }
      
      const { data, error } = await supabase
        .from('enrollments')
        .update(updates)
        .eq('id', enrollmentId)
        .select()
        .single()
      
      return { data, error }
    } catch (err) {
      console.error('Error in updateEnrollmentProgress:', err)
      return { data: null, error: err }
    }
  },

  // Check if user is enrolled in course
  async checkEnrollment(courseId: string, studentId: string) {
    try {
      console.log('Checking enrollment for course:', courseId, 'student:', studentId)
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('course_id', courseId)
        .eq('student_id', studentId)
        .single()
      
      if (error && error.code === 'PGRST116') {
        // No enrollment found, return mock enrollment for demo
        console.log('No enrollment found, returning mock data')
        return {
          data: {
            id: 'mock-enrollment',
            student_id: studentId,
            course_id: courseId,
            enrolled_at: new Date().toISOString(),
            progress: 0,
            completed_at: null
          },
          error: null
        }
      }
      
      if (error) {
        console.error('Error checking enrollment:', error)
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (err) {
      console.error('Error in checkEnrollment:', err)
      return { data: null, error: err }
    }
  },
}

export const categories = {
  // Get all categories
  async getCategories() {
    try {
      console.log('Fetching categories...')
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      
      if (error) {
        console.error('Supabase error fetching categories:', error)
        // Return placeholder categories
        return { 
          data: [
            { id: "1", name: "Development", slug: "development", description: "Web, mobile, and software development courses", icon: "Code", color: "from-sky-400 to-blue-600" },
            { id: "2", name: "Design", slug: "design", description: "Graphic design, UI/UX, and creative courses", icon: "Palette", color: "from-purple-400 to-indigo-600" },
            { id: "3", name: "Marketing", slug: "marketing", description: "Digital marketing strategies", icon: "Megaphone", color: "from-amber-400 to-orange-600" },
            { id: "4", name: "Data Science", slug: "data-science", description: "Data analysis and machine learning", icon: "LineChart", color: "from-emerald-400 to-teal-600" },
            { id: "5", name: "Business", slug: "business", description: "Business and entrepreneurship", icon: "Lightbulb", color: "from-red-400 to-rose-600" },
            { id: "6", name: "Illustration", slug: "illustration", description: "Digital art and illustration", icon: "PenTool", color: "from-fuchsia-400 to-pink-600" }
          ], 
          error: null 
        }
      }
      
      if (!data || data.length === 0) {
        console.log('No categories found, returning placeholder data')
        return { 
          data: [
            { id: "1", name: "Development", slug: "development", description: "Web, mobile, and software development courses", icon: "Code", color: "from-sky-400 to-blue-600" },
            { id: "2", name: "Design", slug: "design", description: "Graphic design, UI/UX, and creative courses", icon: "Palette", color: "from-purple-400 to-indigo-600" },
            { id: "3", name: "Marketing", slug: "marketing", description: "Digital marketing strategies", icon: "Megaphone", color: "from-amber-400 to-orange-600" },
            { id: "4", name: "Data Science", slug: "data-science", description: "Data analysis and machine learning", icon: "LineChart", color: "from-emerald-400 to-teal-600" },
            { id: "5", name: "Business", slug: "business", description: "Business and entrepreneurship", icon: "Lightbulb", color: "from-red-400 to-rose-600" },
            { id: "6", name: "Illustration", slug: "illustration", description: "Digital art and illustration", icon: "PenTool", color: "from-fuchsia-400 to-pink-600" }
          ], 
          error: null 
        }
      }
      
      console.log('Successfully fetched categories:', data.length)
      return { data, error: null }
    } catch (err) {
      console.error('Error in getCategories:', err)
      return { 
        data: [
          { id: "1", name: "Development", slug: "development", description: "Web, mobile, and software development courses", icon: "Code", color: "from-sky-400 to-blue-600" },
          { id: "2", name: "Design", slug: "design", description: "Graphic design, UI/UX, and creative courses", icon: "Palette", color: "from-purple-400 to-indigo-600" },
          { id: "3", name: "Marketing", slug: "marketing", description: "Digital marketing strategies", icon: "Megaphone", color: "from-amber-400 to-orange-600" },
          { id: "4", name: "Data Science", slug: "data-science", description: "Data analysis and machine learning", icon: "LineChart", color: "from-emerald-400 to-teal-600" },
          { id: "5", name: "Business", slug: "business", description: "Business and entrepreneurship", icon: "Lightbulb", color: "from-red-400 to-rose-600" },
          { id: "6", name: "Illustration", slug: "illustration", description: "Digital art and illustration", icon: "PenTool", color: "from-fuchsia-400 to-pink-600" }
        ], 
        error: null 
      }
    }
  },

  // Get category by slug
  async getCategoryBySlug(slug: string) {
    try {
      console.log('Fetching category by slug:', slug)
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single()
      
      if (error && error.code === 'PGRST116') {
        // Return placeholder category data
        const placeholderCategories: any = {
          development: { id: "1", name: "Development", slug: "development", description: "Web, mobile, and software development courses", icon: "Code", color: "from-sky-400 to-blue-600" },
          design: { id: "2", name: "Design", slug: "design", description: "Graphic design, UI/UX, and creative courses", icon: "Palette", color: "from-purple-400 to-indigo-600" },
          marketing: { id: "3", name: "Marketing", slug: "marketing", description: "Digital marketing strategies", icon: "Megaphone", color: "from-amber-400 to-orange-600" },
          "data-science": { id: "4", name: "Data Science", slug: "data-science", description: "Data analysis and machine learning", icon: "LineChart", color: "from-emerald-400 to-teal-600" },
          business: { id: "5", name: "Business", slug: "business", description: "Business and entrepreneurship", icon: "Lightbulb", color: "from-red-400 to-rose-600" },
          illustration: { id: "6", name: "Illustration", slug: "illustration", description: "Digital art and illustration", icon: "PenTool", color: "from-fuchsia-400 to-pink-600" }
        }
        
        const placeholderCategory = placeholderCategories[slug]
        if (placeholderCategory) {
          return { data: placeholderCategory, error: null }
        }
      }
      
      return { data, error }
    } catch (err) {
      console.error('Error in getCategoryBySlug:', err)
      return { data: null, error: err }
    }
  },
}