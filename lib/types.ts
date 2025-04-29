export type Course = {
  id: string;
  title: string;
  instructor: string;
  image?: string; // Make image optional for flexibility
  price: number;
  rating: number;
  students: number;
  hours: number;
  level: string;
  category: string;
  bestseller: boolean;
  description?: string; // Add optional description
}; 