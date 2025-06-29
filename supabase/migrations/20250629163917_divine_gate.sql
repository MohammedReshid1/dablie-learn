/*
  # Initial Database Schema for DablieLearn

  1. New Tables
    - `profiles` - User profile information
      - `id` (uuid, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `avatar_url` (text, optional)
      - `role` (text, default 'student')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `categories` - Course categories
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `description` (text)
      - `icon` (text)
      - `color` (text)
      - `created_at` (timestamp)
    
    - `courses` - Course information
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `instructor_id` (uuid, references profiles)
      - `category_id` (uuid, references categories)
      - `price` (decimal)
      - `level` (text)
      - `duration_hours` (integer)
      - `image_url` (text)
      - `is_published` (boolean, default false)
      - `is_bestseller` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `enrollments` - Student course enrollments
      - `id` (uuid, primary key)
      - `student_id` (uuid, references profiles)
      - `course_id` (uuid, references courses)
      - `enrolled_at` (timestamp)
      - `progress` (integer, default 0)
      - `completed_at` (timestamp, optional)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Profiles are readable by everyone, editable by owner
    - Courses are readable by everyone, editable by instructor
    - Enrollments are readable/writable by student and instructor
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  role text DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  color text,
  created_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  instructor_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  price decimal(10,2) DEFAULT 0,
  level text DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  duration_hours integer DEFAULT 0,
  image_url text,
  is_published boolean DEFAULT false,
  is_bestseller boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed_at timestamptz,
  UNIQUE(student_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are readable by everyone"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Categories policies (readable by everyone)
CREATE POLICY "Categories are readable by everyone"
  ON categories
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Courses policies
CREATE POLICY "Published courses are readable by everyone"
  ON courses
  FOR SELECT
  TO authenticated
  USING (is_published = true OR instructor_id = auth.uid());

CREATE POLICY "Instructors can manage their own courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (instructor_id = auth.uid());

-- Enrollments policies
CREATE POLICY "Students can read their own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Instructors can read enrollments for their courses"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE id = course_id AND instructor_id = auth.uid()
    )
  );

CREATE POLICY "Students can enroll in courses"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their own enrollment progress"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid());

-- Insert sample categories
INSERT INTO categories (name, slug, description, icon, color) VALUES
  ('Development', 'development', 'Web, mobile, and software development courses for all skill levels', 'Code', 'from-sky-400 to-blue-600'),
  ('Design', 'design', 'Graphic design, UI/UX, and creative courses to build your skills', 'Palette', 'from-purple-400 to-indigo-600'),
  ('Marketing', 'marketing', 'Digital marketing strategies to grow your business and audience', 'Megaphone', 'from-amber-400 to-orange-600'),
  ('Data Science', 'data-science', 'Learn to analyze data and build machine learning models', 'LineChart', 'from-emerald-400 to-teal-600'),
  ('Business', 'business', 'Entrepreneurship, management, and business strategy courses', 'Lightbulb', 'from-red-400 to-rose-600'),
  ('Illustration', 'illustration', 'Digital art, drawing, and creative illustration techniques', 'PenTool', 'from-fuchsia-400 to-pink-600')
ON CONFLICT (slug) DO NOTHING;

-- Function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();