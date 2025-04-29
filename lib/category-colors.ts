// lib/category-colors.ts

interface CategoryColorClasses {
  slug: string;
  name: string; // For display
  text: string; // e.g., dark:text-blue-400
  bg: string; // e.g., dark:bg-blue-500/10
  border: string; // e.g., dark:border-blue-500/20
  gradientFrom: string; // e.g., dark:from-blue-500
  gradientTo: string; // e.g., dark:to-blue-700
}

// Define category colors (using Tailwind classes)
// Adjust shades as needed for visual appeal
const categoryColors: CategoryColorClasses[] = [
  {
    slug: "development",
    name: "Development",
    text: "dark:text-blue-400",
    bg: "dark:bg-blue-900/30", // Adjusted for badge background
    border: "dark:border-blue-500/20",
    gradientFrom: "dark:from-blue-500",
    gradientTo: "dark:to-blue-700",
  },
  {
    slug: "design",
    name: "Design",
    text: "dark:text-purple-400",
    bg: "dark:bg-purple-900/30",
    border: "dark:border-purple-500/20",
    gradientFrom: "dark:from-purple-500",
    gradientTo: "dark:to-purple-700",
  },
  {
    slug: "marketing",
    name: "Marketing",
    text: "dark:text-orange-400",
    bg: "dark:bg-orange-900/30",
    border: "dark:border-orange-500/20",
    gradientFrom: "dark:from-orange-500",
    gradientTo: "dark:to-orange-700",
  },
  {
    slug: "data-science",
    name: "Data Science",
    text: "dark:text-teal-400",
    bg: "dark:bg-teal-900/30",
    border: "dark:border-teal-500/20",
    gradientFrom: "dark:from-teal-500",
    gradientTo: "dark:to-teal-700",
  },
  {
    slug: "business",
    name: "Business",
    text: "dark:text-red-400",
    bg: "dark:bg-red-900/30",
    border: "dark:border-red-500/20",
    gradientFrom: "dark:from-red-500",
    gradientTo: "dark:to-red-700",
  },
  {
    slug: "illustration",
    name: "Illustration",
    text: "dark:text-pink-400",
    bg: "dark:bg-pink-900/30",
    border: "dark:border-pink-500/20",
    gradientFrom: "dark:from-pink-500",
    gradientTo: "dark:to-pink-700",
  },
  // Add other categories as needed
];

// Default colors (using primary theme color)
const defaultColors = {
  text: "text-primary", // Light mode text
  bg: "bg-primary/10", // Light mode badge bg
  border: "border-primary/20", // Light mode badge border
  gradientFrom: "from-primary", // Light mode gradient
  gradientTo: "to-orange-500", // Keep orange for the default gradient end
};

export function getCategoryColorClasses(slug?: string): CategoryColorClasses & { default: typeof defaultColors } {
  const category = categoryColors.find((c) => c.slug === slug);

  if (category) {
    return {
      ...category,
      // Combine dark mode specific classes with defaults for simpler usage
      text: `${defaultColors.text} ${category.text}`,
      bg: `${defaultColors.bg} ${category.bg}`,
      border: `${defaultColors.border} ${category.border}`,
      gradientFrom: `${defaultColors.gradientFrom} ${category.gradientFrom}`,
      gradientTo: `${defaultColors.gradientTo} ${category.gradientTo}`,
      default: defaultColors,
    };
  }

  // Return default colors if category not found, ensuring all keys exist
  return {
    slug: slug || "unknown",
    name: slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Unknown",
    text: defaultColors.text,
    bg: defaultColors.bg,
    border: defaultColors.border,
    gradientFrom: defaultColors.gradientFrom,
    gradientTo: defaultColors.gradientTo,
    default: defaultColors,
  };
}

// Function to get only the specific color class for simpler cases (e.g., active tab bg)
export function getCategoryHighlightColor(slug?: string): string {
    const category = categoryColors.find((c) => c.slug === slug);
    // Return dark background color or default primary background
    // Example: dark:bg-blue-600 or bg-primary
    // Adjust the specific color shade (e.g., 600) as needed for good contrast
    return category
        ? `bg-primary ${category.gradientFrom.replace('dark:from', 'dark:bg').replace('-500', '-600')}`
        : 'bg-primary';
} 