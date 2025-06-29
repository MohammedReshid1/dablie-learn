/*
  # Add Sample Courses and Data

  1. Sample Data
    - Add sample categories with proper data
    - Add sample courses with realistic content
    - Add sample instructor profiles
    - Add sample enrollments for testing

  2. Security
    - Maintain existing RLS policies
    - Ensure data is properly structured
*/

-- Insert sample categories
INSERT INTO categories (name, slug, description, icon, color) VALUES
  ('Development', 'development', 'Web, mobile, and software development courses for all skill levels', 'Code', 'from-sky-400 to-blue-600'),
  ('Design', 'design', 'Graphic design, UI/UX, and creative courses to build your skills', 'Palette', 'from-purple-400 to-indigo-600'),
  ('Marketing', 'marketing', 'Digital marketing strategies to grow your business and audience', 'Megaphone', 'from-amber-400 to-orange-600'),
  ('Data Science', 'data-science', 'Learn to analyze data and build machine learning models', 'LineChart', 'from-emerald-400 to-teal-600'),
  ('Business', 'business', 'Entrepreneurship, management, and business strategy courses', 'Lightbulb', 'from-red-400 to-rose-600'),
  ('Illustration', 'illustration', 'Digital art, drawing, and creative illustration techniques', 'PenTool', 'from-fuchsia-400 to-pink-600')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color;

-- Insert sample instructor profiles (these will be created when users sign up)
-- For now, we'll create some sample courses with placeholder instructor IDs

-- Get category IDs for reference
DO $$
DECLARE
  dev_cat_id uuid;
  design_cat_id uuid;
  marketing_cat_id uuid;
  data_cat_id uuid;
  business_cat_id uuid;
  illustration_cat_id uuid;
BEGIN
  SELECT id INTO dev_cat_id FROM categories WHERE slug = 'development';
  SELECT id INTO design_cat_id FROM categories WHERE slug = 'design';
  SELECT id INTO marketing_cat_id FROM categories WHERE slug = 'marketing';
  SELECT id INTO data_cat_id FROM categories WHERE slug = 'data-science';
  SELECT id INTO business_cat_id FROM categories WHERE slug = 'business';
  SELECT id INTO illustration_cat_id FROM categories WHERE slug = 'illustration';

  -- Insert sample courses
  INSERT INTO courses (title, slug, description, category_id, price, level, duration_hours, image_url, is_published, is_bestseller) VALUES
    (
      'Complete Web Development Bootcamp',
      'complete-web-development-bootcamp',
      'Master web development from scratch with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and become a full-stack developer.',
      dev_cat_id,
      89.99,
      'beginner',
      42,
      '/placeholder.svg?height=400&width=600',
      true,
      true
    ),
    (
      'UI/UX Design Masterclass',
      'ui-ux-design-masterclass',
      'Learn user interface and user experience design from industry experts. Master Figma, design systems, and create stunning user experiences.',
      design_cat_id,
      79.99,
      'intermediate',
      38,
      '/placeholder.svg?height=400&width=600',
      true,
      false
    ),
    (
      'Data Science & Machine Learning',
      'data-science-machine-learning',
      'Comprehensive course covering Python, pandas, scikit-learn, and machine learning algorithms. Build predictive models and analyze data.',
      data_cat_id,
      94.99,
      'advanced',
      56,
      '/placeholder.svg?height=400&width=600',
      true,
      true
    ),
    (
      'Digital Marketing Strategy',
      'digital-marketing-strategy',
      'Learn modern digital marketing techniques including SEO, social media marketing, content marketing, and paid advertising strategies.',
      marketing_cat_id,
      69.99,
      'beginner',
      32,
      '/placeholder.svg?height=400&width=600',
      true,
      false
    ),
    (
      'Full-Stack Mobile App Development',
      'full-stack-mobile-app-development',
      'Build cross-platform mobile apps with React Native. Learn backend development, API integration, and app store deployment.',
      dev_cat_id,
      99.99,
      'intermediate',
      48,
      '/placeholder.svg?height=400&width=600',
      true,
      true
    ),
    (
      'Business Finance & Accounting',
      'business-finance-accounting',
      'Master business finance fundamentals, accounting principles, financial analysis, and budgeting for entrepreneurs and professionals.',
      business_cat_id,
      74.99,
      'beginner',
      35,
      '/placeholder.svg?height=400&width=600',
      true,
      false
    ),
    (
      'Advanced React Development',
      'advanced-react-development',
      'Deep dive into React ecosystem with hooks, context, performance optimization, testing, and modern development patterns.',
      dev_cat_id,
      84.99,
      'advanced',
      40,
      '/placeholder.svg?height=400&width=600',
      true,
      false
    ),
    (
      'Graphic Design Fundamentals',
      'graphic-design-fundamentals',
      'Learn the principles of graphic design, typography, color theory, and master Adobe Creative Suite for professional design work.',
      design_cat_id,
      59.99,
      'beginner',
      28,
      '/placeholder.svg?height=400&width=600',
      true,
      false
    ),
    (
      'Python for Data Analysis',
      'python-data-analysis',
      'Master Python programming for data analysis with pandas, NumPy, matplotlib, and Jupyter notebooks. Perfect for beginners.',
      data_cat_id,
      64.99,
      'beginner',
      30,
      '/placeholder.svg?height=400&width=600',
      true,
      false
    ),
    (
      'Social Media Marketing Mastery',
      'social-media-marketing-mastery',
      'Complete guide to social media marketing across all platforms. Learn content creation, audience building, and conversion strategies.',
      marketing_cat_id,
      54.99,
      'intermediate',
      25,
      '/placeholder.svg?height=400&width=600',
      true,
      false
    ),
    (
      'Entrepreneurship Essentials',
      'entrepreneurship-essentials',
      'Learn how to start and grow a successful business. Covers business planning, funding, marketing, and scaling strategies.',
      business_cat_id,
      79.99,
      'beginner',
      36,
      '/placeholder.svg?height=400&width=600',
      true,
      false
    ),
    (
      'Digital Illustration with Procreate',
      'digital-illustration-procreate',
      'Create stunning digital artwork on iPad with Procreate. Learn drawing techniques, character design, and digital painting.',
      illustration_cat_id,
      49.99,
      'beginner',
      22,
      '/placeholder.svg?height=400&width=600',
      true,
      false
    );

END $$;