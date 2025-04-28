"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Check,
  FileText,
  ImageIcon,
  Info,
  List,
  PlusCircle,
  Settings,
  Upload,
  Video,
  Trash2,
} from "lucide-react"
import { InstructorShell } from "@/components/instructor-shell"

export default function CreateCoursePage() {
  const [activeTab, setActiveTab] = useState("basics")

  return (
    <InstructorShell>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/instructor/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Create New Course</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
            Continue
          </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-12">
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
          <nav className="grid gap-1 sticky top-24">
            <button
              onClick={() => setActiveTab("basics")}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                activeTab === "basics"
                  ? "text-rose-600 bg-rose-50"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <Info className="h-4 w-4" />
              <span>Course Basics</span>
              {activeTab === "basics" && <Check className="h-4 w-4 ml-auto" />}
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                activeTab === "curriculum"
                  ? "text-rose-600 bg-rose-50"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <List className="h-4 w-4" />
              <span>Curriculum</span>
              {activeTab === "curriculum" && <Check className="h-4 w-4 ml-auto" />}
            </button>
            <button
              onClick={() => setActiveTab("media")}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                activeTab === "media"
                  ? "text-rose-600 bg-rose-50"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              <span>Media</span>
              {activeTab === "media" && <Check className="h-4 w-4 ml-auto" />}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                activeTab === "settings"
                  ? "text-rose-600 bg-rose-50"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
              {activeTab === "settings" && <Check className="h-4 w-4 ml-auto" />}
            </button>
          </nav>
        </div>

        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          <Card>
            <CardContent className="p-6">
              {activeTab === "basics" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Course Basics</h2>
                    <p className="text-neutral-500">Provide the essential information about your course.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Course Title</Label>
                      <Input id="title" placeholder="e.g. Complete Web Development Bootcamp" />
                      <p className="text-xs text-neutral-500">
                        Your title should be clear and descriptive of what students will learn.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Course Subtitle</Label>
                      <Input
                        id="subtitle"
                        placeholder="e.g. Learn HTML, CSS, JavaScript, React, Node.js and more with practical projects"
                      />
                      <p className="text-xs text-neutral-500">
                        A brief description that appears below your course title.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Course Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what your course is about, what students will learn, and what they'll be able to do after completing it."
                        className="min-h-32"
                      />
                      <p className="text-xs text-neutral-500">
                        Provide a detailed description of your course content, target audience, and learning outcomes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="development">Development</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="data-science">Data Science</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="level">Level</Label>
                        <Select>
                          <SelectTrigger id="level">
                            <SelectValue placeholder="Select a level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="all-levels">All Levels</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="japanese">Japanese</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "curriculum" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Course Curriculum</h2>
                    <p className="text-neutral-500">Organize your course content into sections and lectures.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-neutral-50 p-4 flex items-center justify-between">
                        <div className="font-medium">Section 1: Introduction</div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="divide-y">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center">
                            <Video className="h-5 w-5 text-neutral-500 mr-3" />
                            <span>Welcome to the Course</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-neutral-500">2:15</div>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-neutral-500 mr-3" />
                            <span>Course Overview</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-neutral-500">Article</div>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-50">
                        <Button variant="outline" size="sm" className="w-full">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Lecture
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-neutral-50 p-4 flex items-center justify-between">
                        <div className="font-medium">Section 2: Getting Started</div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 text-center text-neutral-500">No lectures added yet</div>
                      <div className="p-4 bg-neutral-50">
                        <Button variant="outline" size="sm" className="w-full">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Lecture
                        </Button>
                      </div>
                    </div>

                    <Button className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New Section
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "media" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Course Media</h2>
                    <p className="text-neutral-500">Upload images and promotional video for your course.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Course Thumbnail</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                        <div className="h-40 w-full bg-neutral-100 rounded-lg mb-4 flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-neutral-400" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-sm text-neutral-500">Drag and drop an image, or click to browse</p>
                          <p className="text-xs text-neutral-400">Recommended size: 1280x720px (16:9 ratio)</p>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Promotional Video</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                        <div className="h-40 w-full bg-neutral-100 rounded-lg mb-4 flex items-center justify-center">
                          <Video className="h-12 w-12 text-neutral-400" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-sm text-neutral-500">Drag and drop a video, or click to browse</p>
                          <p className="text-xs text-neutral-400">Max file size: 1GB. Supported formats: MP4, MOV</p>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Video
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Course Settings</h2>
                    <p className="text-neutral-500">Configure additional settings for your course.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input id="price" type="number" placeholder="e.g. 49.99" />
                      <p className="text-xs text-neutral-500">
                        Set a competitive price for your course. You can also offer discounts later.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Course Requirements</Label>
                      <div className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Input placeholder="e.g. Basic knowledge of HTML and CSS" />
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Requirement
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Target Audience</Label>
                      <div className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Input placeholder="e.g. Beginners interested in web development" />
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Target Audience
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>What Students Will Learn</Label>
                      <div className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Input placeholder="e.g. Build responsive websites using HTML, CSS, and JavaScript" />
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Learning Outcome
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </InstructorShell>
  )
}
