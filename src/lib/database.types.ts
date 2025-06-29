export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          instructor_id: string | null
          category_id: string | null
          price: number | null
          level: string | null
          duration_hours: number | null
          image_url: string | null
          is_published: boolean | null
          is_bestseller: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          instructor_id?: string | null
          category_id?: string | null
          price?: number | null
          level?: string | null
          duration_hours?: number | null
          image_url?: string | null
          is_published?: boolean | null
          is_bestseller?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          instructor_id?: string | null
          category_id?: string | null
          price?: number | null
          level?: string | null
          duration_hours?: number | null
          image_url?: string | null
          is_published?: boolean | null
          is_bestseller?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          student_id: string | null
          course_id: string | null
          enrolled_at: string
          progress: number | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          student_id?: string | null
          course_id?: string | null
          enrolled_at?: string
          progress?: number | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string | null
          course_id?: string | null
          enrolled_at?: string
          progress?: number | null
          completed_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}