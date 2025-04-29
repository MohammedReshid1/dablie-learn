import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, Share2 } from "lucide-react";
import type { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="h-full overflow-hidden group flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.image || "/placeholder.svg?height=400&width=600"}
          alt={course.title}
          fill // Use fill for responsive aspect ratio
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {course.bestseller && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 border-none">
            Bestseller
          </Badge>
        )}
        {/* Optional: Add preview overlay on hover like in featured-courses if desired */}
      </div>
      <CardContent className="p-5 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">
          <Link href={`/courses/${course.id}`} className="hover:text-rose-600 transition-colors">
            {course.title}
          </Link>
        </h3>
        <p className="text-muted-foreground text-sm mb-4">By {course.instructor}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {course.students.toLocaleString()} students
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {course.hours} hours
          </div>
          <div className="line-clamp-1">{course.level}</div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex items-center justify-between">
        <div className="font-bold text-xl">${course.price}</div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary" aria-label="Share Course">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            asChild
            size="sm" // Match size from courses page
            className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
          >
            <Link href={`/courses/${course.id}`}>Enroll Now</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 