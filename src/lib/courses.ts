import { supabase } from './supabase'
import type { Database } from './database.types'

type Course = Database['public']['Tables']['courses']['Row']
type CourseInsert = Database['public']['Tables']['courses']['Insert']
type CourseUpdate = Database['public']['Tables']['courses']['Update']
type Category = Database['public']['Tables']['categories']['Row']
type Enrollment = Database['public']['Tables']['enrollments']['Row']

export const courses = {
  // Get all published courses
  async getPublishedCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        categories (name, slug, color),
        profiles (full_name)
      `)
      .eq('is_published', true)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get courses by category
  async getCoursesByCategory(categorySlug: string) {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        categories (name, slug, color),
        profiles (full_name)
      `)
      .eq('is_published', true)
      .eq('categories.slug', categorySlug)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get course by ID
  async getCourseById(id: string) {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        categories (name, slug, color),
        profiles (full_name, avatar_url)
      `)
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Get course by slug
  async getCourseBySlug(slug: string) {
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
  },

  // Create new course
  async createCourse(course: CourseInsert) {
    const { data, error } = await supabase
      .from('courses')
      .insert(course)
      .select()
      .single()
    
    return { data, error }
  },

  // Update course
  async updateCourse(id: string, updates: CourseUpdate) {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  // Delete course
  async deleteCourse(id: string) {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id)
    
    return { error }
  },

  // Get instructor's courses
  async getInstructorCourses(instructorId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        categories (name, slug, color)
      `)
      .eq('instructor_id', instructorId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Enroll in course
  async enrollInCourse(courseId: string, studentId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        course_id: courseId,
        student_id: studentId,
      })
      .select()
      .single()
    
    return { data, error }
  },

  // Get user enrollments
  async getUserEnrollments(userId: string) {
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
    
    return { data, error }
  },

  // Update enrollment progress
  async updateEnrollmentProgress(enrollmentId: string, progress: number) {
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
  },

  // Check if user is enrolled in course
  async checkEnrollment(courseId: string, studentId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('course_id', courseId)
      .eq('student_id', studentId)
      .single()
    
    return { data, error }
  },
}

export const categories = {
  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    return { data, error }
  },

  // Get category by slug
  async getCategoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()
    
    return { data, error }
  },
}