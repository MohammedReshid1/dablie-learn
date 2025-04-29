"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  List,
  MessageSquare,
  Pause,
  Play,
  Settings,
  Volume2,
  X,
  Check,
} from "lucide-react"

export default function CourseLearnPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [playing, setPlaying] = useState(false)

  // In a real application, you would fetch course data based on the ID
  // For this example, we'll use mock data
  const course = {
    id: resolvedParams.id,
    title: "Complete Web Development Bootcamp",
    progress: 65,
    currentSection: "JavaScript Basics",
    currentLecture: "Variables and Data Types",
    sections: [
      {
        id: "1",
        title: "Introduction to Web Development",
        completed: true,
        lectures: [
          { id: "1-1", title: "Course Overview", duration: "10:15", completed: true, type: "video" },
          { id: "1-2", title: "How the Internet Works", duration: "15:30", completed: true, type: "video" },
          {
            id: "1-3",
            title: "Setting Up Your Development Environment",
            duration: "20:45",
            completed: true,
            type: "video",
          },
        ],
      },
      {
        id: "2",
        title: "HTML Fundamentals",
        completed: true,
        lectures: [
          { id: "2-1", title: "HTML Document Structure", duration: "12:20", completed: true, type: "video" },
          { id: "2-2", title: "Text Elements and Formatting", duration: "18:15", completed: true, type: "video" },
          { id: "2-3", title: "Links, Images, and Media", duration: "22:10", completed: true, type: "video" },
          { id: "2-4", title: "HTML Practice Exercise", duration: "N/A", completed: true, type: "exercise" },
        ],
      },
      {
        id: "3",
        title: "CSS Styling",
        completed: true,
        lectures: [
          { id: "3-1", title: "CSS Selectors and Properties", duration: "25:30", completed: true, type: "video" },
          { id: "3-2", title: "The Box Model", duration: "20:15", completed: true, type: "video" },
          { id: "3-3", title: "Flexbox and Grid Layout", duration: "35:45", completed: true, type: "video" },
          { id: "3-4", title: "CSS Resources", duration: "N/A", completed: true, type: "resource" },
        ],
      },
      {
        id: "4",
        title: "JavaScript Basics",
        completed: false,
        lectures: [
          { id: "4-1", title: "Introduction to JavaScript", duration: "15:20", completed: true, type: "video" },
          {
            id: "4-2",
            title: "Variables and Data Types",
            duration: "22:35",
            completed: false,
            type: "video",
            current: true,
          },
          { id: "4-3", title: "Control Flow and Loops", duration: "28:15", completed: false, type: "video" },
          { id: "4-4", title: "Functions and Scope", duration: "32:40", completed: false, type: "video" },
          { id: "4-5", title: "JavaScript Quiz", duration: "N/A", completed: false, type: "quiz" },
        ],
      },
      {
        id: "5",
        title: "Advanced JavaScript",
        completed: false,
        lectures: [
          { id: "5-1", title: "DOM Manipulation", duration: "30:15", completed: false, type: "video" },
          { id: "5-2", title: "Events and Event Handling", duration: "25:30", completed: false, type: "video" },
          { id: "5-3", title: "Asynchronous JavaScript", duration: "40:20", completed: false, type: "video" },
          { id: "5-4", title: "JavaScript Project", duration: "N/A", completed: false, type: "project" },
        ],
      },
    ],
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-background">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/courses/${resolvedParams.id}`}>
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </Link>
          </Button>
          <div>
            <h1 className="text-lg font-bold line-clamp-1 text-foreground">{course.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{course.currentSection}</span>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>{course.currentLecture}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <MessageSquare className="h-4 w-4 mr-2" />
            Q&A
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            {sidebarOpen ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="relative aspect-video bg-muted">
            <img
              src="/placeholder.svg?height=720&width=1280"
              alt="Video thumbnail"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/30 h-16 w-16"
                onClick={() => setPlaying(!playing)}
              >
                {playing ? <Pause className="h-8 w-8 text-secondary-foreground" /> : <Play className="h-8 w-8 text-secondary-foreground" />}
              </Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
              <div className="flex items-center justify-between text-primary-foreground">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
                    {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">12:45</span>
                    <span className="text-sm text-primary-foreground/70">/</span>
                    <span className="text-sm text-primary-foreground/70">22:35</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
                    <Volume2 className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <div className="h-1 bg-primary-foreground/30 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[56%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <Tabs defaultValue="overview">
              <TabsList className="mb-4 inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                <TabsTrigger value="overview" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">Overview</TabsTrigger>
                <TabsTrigger value="notes" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">Notes</TabsTrigger>
                <TabsTrigger value="resources" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">Resources</TabsTrigger>
                <TabsTrigger value="transcript" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">Transcript</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-6">
                <div className="prose max-w-none dark:prose-invert">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Variables and Data Types</h2>
                    <p>
                      In this lecture, you'll learn about JavaScript variables and the different data types available in
                      the language. We'll cover how to declare variables using var, let, and const, and explore primitive
                      data types like strings, numbers, booleans, null, and undefined, as well as complex types like
                      objects and arrays.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Learning Objectives</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Understand how to declare and initialize variables</li>
                      <li>Learn the differences between var, let, and const</li>
                      <li>Explore JavaScript's primitive data types</li>
                      <li>Understand type coercion and type conversion</li>
                      <li>Practice working with variables and data types</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-border">
                  <Button variant="outline" asChild>
                    <Link href="#">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous Lecture
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="#">
                      Next Lecture
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="notes" className="min-h-[200px] pt-6">
                <div className="border border-border rounded-lg p-4 h-full bg-card">
                  <textarea
                    placeholder="Add your notes for this lecture here..."
                    className="w-full h-full min-h-[200px] resize-none border-none focus:outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                  ></textarea>
                </div>
              </TabsContent>
              <TabsContent value="resources" className="space-y-4 pt-6">
                <div className="border border-border rounded-lg p-4 flex items-center justify-between bg-card">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <div className="font-medium text-foreground">JavaScript Variables Cheat Sheet</div>
                      <div className="text-sm text-muted-foreground">PDF, 256KB</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="border border-border rounded-lg p-4 flex items-center justify-between bg-card">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <div className="font-medium text-foreground">Code Examples</div>
                      <div className="text-sm text-muted-foreground">ZIP, 1.2MB</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="transcript" className="pt-6">
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    Hello and welcome to this lecture on JavaScript variables and data types. In this video, we're going
                    to explore how to declare variables in JavaScript and understand the different data types available
                    in the language.
                  </p>
                  <p>
                    Let's start with variables. A variable is essentially a container for storing data values. In
                    JavaScript, we have three ways to declare variables: var, let, and const. The var keyword was
                    traditionally used before ES6, but now we have let and const which offer better scoping rules.
                  </p>
                  <p>
                    Let's look at some examples. To declare a variable using let, we write: let name = "John"; This
                    creates a variable called name and assigns it the string value "John". If we want to create a
                    constant that cannot be reassigned, we use const: const PI = 3.14159;
                  </p>
                  <p>
                    Now, let's talk about data types. JavaScript has several primitive data types: strings for text,
                    numbers for numeric values, booleans for true/false values, null for intentionally empty values, and
                    undefined for variables that have been declared but not assigned a value.
                  </p>
                  <p>[Transcript continues...]</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {sidebarOpen && (
          <aside className="w-full md:w-80 lg:w-96 border-l border-border overflow-y-auto flex-shrink-0 bg-card text-card-foreground">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-foreground">Course Content</h2>
                <div className="text-sm text-muted-foreground">65% complete</div>
              </div>
              <Progress value={65} className="h-2 [&>*]:bg-primary" />
            </div>

            <div className="divide-y divide-border">
              {course.sections.map((section) => (
                <div key={section.id} className="py-2">
                  <div
                    className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-muted/50 ${
                      section.id === "4" ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <ChevronDown className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">{section.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {section.lectures.length} lectures • {section.completed ? "Completed" : "In progress"}
                        </div>
                      </div>
                    </div>
                    {section.completed && (
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                    )}
                  </div>

                  <div className="pl-11 pr-4 space-y-1 py-1">
                    {section.lectures.map((lecture) => (
                      <div
                        key={lecture.id}
                        className={`flex items-center justify-between px-2 py-2 rounded-md transition-colors ${
                          lecture.current ? "bg-primary/10 text-primary" : lecture.completed ? "text-muted-foreground opacity-70" : "text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center">
                          {lecture.type === "video" ? (
                            <Play className={`h-4 w-4 mr-2 ${lecture.current ? "text-primary" : "text-muted-foreground"}`} />
                          ) : lecture.type === "exercise" ? (
                            <FileText className={`h-4 w-4 mr-2 ${lecture.current ? "text-primary" : "text-muted-foreground"}`} />
                          ) : lecture.type === "quiz" ? (
                            <MessageSquare className={`h-4 w-4 mr-2 ${lecture.current ? "text-primary" : "text-muted-foreground"}`} />
                          ) : (
                            <BookOpen className={`h-4 w-4 mr-2 ${lecture.current ? "text-primary" : "text-muted-foreground"}`} />
                          )}
                          <span className={lecture.current ? "font-medium" : ""}>{lecture.title}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs mr-2 text-muted-foreground">{lecture.duration}</span>
                          {lecture.completed && (
                            <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                              <Check className="h-2 w-2 text-primary" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
