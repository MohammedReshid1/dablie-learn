"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Plus, Grip, ChevronDown, ChevronUp, Video, FileText, Edit, Trash2, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define prop types
interface CourseCurriculumProps {
  formData: { sections?: any[] }; // Use a more specific type for sections if available
  updateFormData: (data: Partial<{ sections: any[] }>) => void;
}

// Apply prop types and rename props
export function CourseCurriculum({ formData, updateFormData }: CourseCurriculumProps) {
  const [sections, setSections] = useState(formData?.sections || [])
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false)
  const [newSection, setNewSection] = useState({ title: "", description: "" })
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false)
  const [isEditSectionOpen, setIsEditSectionOpen] = useState(false)
  const [isEditLessonOpen, setIsEditLessonOpen] = useState(false)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(null)
  const [newLesson, setNewLesson] = useState({ title: "", type: "video", content: "", duration: "" })
  const [openSections, setOpenSections] = useState({})
  const [editingSectionIndex, setEditingSectionIndex] = useState(null)
  const [editingLessonData, setEditingLessonData] = useState({ sectionIndex: null, lessonIndex: null, lesson: null })

  useEffect(() => {
    // updateData is called when sections state changes
    updateFormData({ sections })
  }, [sections, updateFormData]) // Update dependency array

  const handleAddSection = () => {
    if (newSection.title.trim() === "") return

    setSections([...sections, { ...newSection, lessons: [] }])
    setNewSection({ title: "", description: "" })
    setIsAddSectionOpen(false)

    // Auto-open the newly added section
    setOpenSections({
      ...openSections,
      [sections.length]: true,
    })
  }

  const handleAddLesson = () => {
    if (newLesson.title.trim() === "" || currentSectionIndex === null) return

    const updatedSections = [...sections]
    updatedSections[currentSectionIndex].lessons = [
      ...(updatedSections[currentSectionIndex].lessons || []),
      { ...newLesson, id: `lesson-${Date.now()}` },
    ]

    setSections(updatedSections)
    setNewLesson({ title: "", type: "video", content: "", duration: "" })
    setIsAddLessonOpen(false)
  }

  const handleUpdateSection = () => {
    if (editingSectionIndex === null) return

    const updatedSections = [...sections]
    updatedSections[editingSectionIndex] = {
      ...updatedSections[editingSectionIndex],
      title: newSection.title,
      description: newSection.description,
    }

    setSections(updatedSections)
    setEditingSectionIndex(null)
    setNewSection({ title: "", description: "" })
    setIsEditSectionOpen(false)
  }

  const handleUpdateLesson = () => {
    const { sectionIndex, lessonIndex, lesson } = editingLessonData
    if (sectionIndex === null || lessonIndex === null || !lesson) return

    const updatedSections = [...sections]
    updatedSections[sectionIndex].lessons[lessonIndex] = lesson

    setSections(updatedSections)
    setEditingLessonData({ sectionIndex: null, lessonIndex: null, lesson: null })
    setIsEditLessonOpen(false)
  }

  const handleDeleteSection = (index) => {
    const updatedSections = [...sections]
    updatedSections.splice(index, 1)
    setSections(updatedSections)
  }

  const handleDeleteLesson = (sectionIndex, lessonIndex) => {
    const updatedSections = [...sections]
    updatedSections[sectionIndex].lessons.splice(lessonIndex, 1)
    setSections(updatedSections)
  }

  const toggleSection = (index) => {
    setOpenSections({
      ...openSections,
      [index]: !openSections[index],
    })
  }

  const editSection = (index) => {
    setEditingSectionIndex(index)
    setNewSection({
      title: sections[index].title,
      description: sections[index].description || "",
    })
    setIsEditSectionOpen(true)
  }

  const editLesson = (sectionIndex, lessonIndex) => {
    setEditingLessonData({
      sectionIndex,
      lessonIndex,
      lesson: { ...sections[sectionIndex].lessons[lessonIndex] },
    })
    setIsEditLessonOpen(true)
  }

  const onDragEnd = (result) => {
    const { destination, source, type } = result

    // If dropped outside the list or no movement
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Handle section reordering
    if (type === "section") {
      const reorderedSections = [...sections]
      const [removed] = reorderedSections.splice(source.index, 1)
      reorderedSections.splice(destination.index, 0, removed)

      setSections(reorderedSections)
      return
    }

    // Handle lesson reordering within the same section
    if (source.droppableId === destination.droppableId) {
      const sectionIndex = Number.parseInt(source.droppableId.split("-")[1], 10)
      const sectionCopy = { ...sections[sectionIndex] }
      const lessons = [...sectionCopy.lessons]

      const [removed] = lessons.splice(source.index, 1)
      lessons.splice(destination.index, 0, removed)

      sectionCopy.lessons = lessons

      const updatedSections = [...sections]
      updatedSections[sectionIndex] = sectionCopy

      setSections(updatedSections)
      return
    }

    // Handle lesson moving between sections
    const sourceSectionIndex = Number.parseInt(source.droppableId.split("-")[1], 10)
    const destSectionIndex = Number.parseInt(destination.droppableId.split("-")[1], 10)

    const sourceSectionCopy = { ...sections[sourceSectionIndex] }
    const destSectionCopy = { ...sections[destSectionIndex] }

    const sourceItems = [...sourceSectionCopy.lessons]
    const destItems = [...destSectionCopy.lessons]

    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)

    sourceSectionCopy.lessons = sourceItems
    destSectionCopy.lessons = destItems

    const updatedSections = [...sections]
    updatedSections[sourceSectionIndex] = sourceSectionCopy
    updatedSections[destSectionIndex] = destSectionCopy

    setSections(updatedSections)
  }

  const getLessonIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const calculateTotalDuration = () => {
    let totalMinutes = 0

    sections.forEach((section) => {
      if (section.lessons) {
        section.lessons.forEach((lesson) => {
          if (lesson.duration) {
            const durationMatch = lesson.duration.match(/^(\d+):(\d+)$/)
            if (durationMatch) {
              const minutes = Number.parseInt(durationMatch[1], 10)
              const seconds = Number.parseInt(durationMatch[2], 10)
              totalMinutes += minutes + seconds / 60
            }
          }
        })
      }
    })

    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.round(totalMinutes % 60)

    return `${hours}h ${minutes}m`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Course Curriculum</h3>
          <p className="text-sm text-muted-foreground">Organize your course content into sections and lessons</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Total Duration: {calculateTotalDuration()}</span>
          <Dialog open={isAddSectionOpen} onOpenChange={setIsAddSectionOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Section</DialogTitle>
                <DialogDescription>Create a new section to organize your course content.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="section-title">Section Title</Label>
                  <Input
                    id="section-title"
                    placeholder="e.g. Introduction to the Course"
                    value={newSection.title}
                    onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="section-description">Description (Optional)</Label>
                  <Textarea
                    id="section-description"
                    placeholder="Briefly describe what this section covers..."
                    value={newSection.description}
                    onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddSectionOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSection}>Add Section</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections" type="section">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {sections.length === 0 ? (
                <Card className="border-dashed border-border bg-card">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground text-center mb-4">
                      Your course curriculum is empty. Add sections and lessons to get started.
                    </p>
                    <Button variant="outline" onClick={() => setIsAddSectionOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Section
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                sections.map((section, sectionIndex) => (
                  <Draggable
                    key={`section-${sectionIndex}`}
                    draggableId={`section-${sectionIndex}`}
                    index={sectionIndex}
                  >
                    {(provided) => (
                      <Card ref={provided.innerRef} {...provided.draggableProps} className="border border-border bg-card">
                        <CardHeader className="p-4">
                          <div className="flex items-center">
                            <div {...provided.dragHandleProps} className="mr-2 cursor-grab active:cursor-grabbing">
                              <Grip className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <Collapsible
                              open={openSections[sectionIndex]}
                              onOpenChange={() => toggleSection(sectionIndex)}
                              className="w-full"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <CollapsibleTrigger asChild>
                                    <div className="flex items-center cursor-pointer">
                                      <CardTitle className="text-lg">{section.title}</CardTitle>
                                      {openSections[sectionIndex] ? (
                                        <ChevronUp className="ml-2 h-4 w-4" />
                                      ) : (
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                      )}
                                    </div>
                                  </CollapsibleTrigger>
                                  {section.description && (
                                    <p className="text-sm text-muted-foreground">{section.description}</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Edit section</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => editSection(sectionIndex)}>
                                        Edit Section
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => handleDeleteSection(sectionIndex)}
                                        className="text-destructive"
                                      >
                                        Delete Section
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  <Dialog
                                    open={currentSectionIndex === sectionIndex && isAddLessonOpen}
                                    onOpenChange={(open) => {
                                      setIsAddLessonOpen(open)
                                      if (open) setCurrentSectionIndex(sectionIndex)
                                    }}
                                  >
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Plus className="mr-1 h-3 w-3" />
                                        Add Lesson
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Add New Lesson</DialogTitle>
                                        <DialogDescription>
                                          Add a lesson to the "{section.title}" section.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                          <Label htmlFor="lesson-title">Lesson Title</Label>
                                          <Input
                                            id="lesson-title"
                                            placeholder="e.g. Introduction to Variables"
                                            value={newLesson.title}
                                            onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                                          />
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="lesson-type">Lesson Type</Label>
                                          <Select
                                            value={newLesson.type}
                                            onValueChange={(value) => setNewLesson({ ...newLesson, type: value })}
                                          >
                                            <SelectTrigger id="lesson-type">
                                              <SelectValue placeholder="Select lesson type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="video">Video</SelectItem>
                                              <SelectItem value="text">Text</SelectItem>
                                              <SelectItem value="quiz">Quiz</SelectItem>
                                              <SelectItem value="assignment">Assignment</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        {newLesson.type === "video" && (
                                          <div className="grid gap-2">
                                            <Label htmlFor="lesson-duration">Duration (MM:SS)</Label>
                                            <Input
                                              id="lesson-duration"
                                              placeholder="e.g. 10:30"
                                              value={newLesson.duration}
                                              onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                                            />
                                          </div>
                                        )}
                                        <div className="grid gap-2">
                                          <Label htmlFor="lesson-content">Content/Description</Label>
                                          <Textarea
                                            id="lesson-content"
                                            placeholder="Describe what this lesson covers..."
                                            value={newLesson.content}
                                            onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                                          />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsAddLessonOpen(false)}>
                                          Cancel
                                        </Button>
                                        <Button onClick={handleAddLesson}>Add Lesson</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                              <CollapsibleContent>
                                <div className="mt-4 border-t border-border pt-4 px-4 pb-4">
                                  <Droppable droppableId={`lessons-${sectionIndex}`} type="lesson">
                                    {(provided) => (
                                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                        {!section.lessons || section.lessons.length === 0 ? (
                                          <div className="py-4 text-center text-sm text-muted-foreground">
                                            No lessons in this section yet. Add your first lesson.
                                          </div>
                                        ) : (
                                          section.lessons.map((lesson, lessonIndex) => (
                                            <Draggable
                                              key={lesson.id || `lesson-${sectionIndex}-${lessonIndex}`}
                                              draggableId={lesson.id || `lesson-${sectionIndex}-${lessonIndex}`}
                                              index={lessonIndex}
                                            >
                                              {(provided) => (
                                                <div
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className="flex items-center justify-between rounded-md border border-border bg-background p-3"
                                                >
                                                  <div className="flex items-center gap-3">
                                                    <Grip className="h-4 w-4 text-muted-foreground" />
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                      {getLessonIcon(lesson.type)}
                                                    </div>
                                                    <div>
                                                      <p className="font-medium">{lesson.title}</p>
                                                      {lesson.content && (
                                                        <p className="text-xs text-muted-foreground line-clamp-1">
                                                          {lesson.content}
                                                        </p>
                                                      )}
                                                    </div>
                                                  </div>
                                                  <div className="flex items-center gap-2">
                                                    {lesson.duration && (
                                                      <div className="flex items-center text-xs text-muted-foreground">
                                                        <Clock className="mr-1 h-3 w-3" />
                                                        {lesson.duration}
                                                      </div>
                                                    )}
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      onClick={() => editLesson(sectionIndex, lessonIndex)}
                                                    >
                                                      <Edit className="h-4 w-4" />
                                                      <span className="sr-only">Edit lesson</span>
                                                    </Button>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      onClick={() => handleDeleteLesson(sectionIndex, lessonIndex)}
                                                    >
                                                      <Trash2 className="h-4 w-4 text-destructive" />
                                                      <span className="sr-only">Delete lesson</span>
                                                    </Button>
                                                  </div>
                                                </div>
                                              )}
                                            </Draggable>
                                          ))
                                        )}
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </div>
                        </CardHeader>
                      </Card>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Edit Section Dialog */}
      <Dialog open={isEditSectionOpen} onOpenChange={setIsEditSectionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>Update the section details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-section-title">Section Title</Label>
              <Input
                id="edit-section-title"
                value={newSection.title}
                onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-section-description">Description (Optional)</Label>
              <Textarea
                id="edit-section-description"
                value={newSection.description}
                onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditSectionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSection}>Update Section</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Lesson Dialog */}
      <Dialog open={isEditLessonOpen} onOpenChange={setIsEditLessonOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lesson</DialogTitle>
            <DialogDescription>Update the lesson details.</DialogDescription>
          </DialogHeader>
          {editingLessonData.lesson && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-lesson-title">Lesson Title</Label>
                <Input
                  id="edit-lesson-title"
                  value={editingLessonData.lesson.title}
                  onChange={(e) =>
                    setEditingLessonData({
                      ...editingLessonData,
                      lesson: { ...editingLessonData.lesson, title: e.target.value },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-lesson-type">Lesson Type</Label>
                <Select
                  value={editingLessonData.lesson.type}
                  onValueChange={(value) =>
                    setEditingLessonData({
                      ...editingLessonData,
                      lesson: { ...editingLessonData.lesson, type: value },
                    })
                  }
                >
                  <SelectTrigger id="edit-lesson-type">
                    <SelectValue placeholder="Select lesson type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {editingLessonData.lesson.type === "video" && (
                <div className="grid gap-2">
                  <Label htmlFor="edit-lesson-duration">Duration (MM:SS)</Label>
                  <Input
                    id="edit-lesson-duration"
                    value={editingLessonData.lesson.duration || ""}
                    onChange={(e) =>
                      setEditingLessonData({
                        ...editingLessonData,
                        lesson: { ...editingLessonData.lesson, duration: e.target.value },
                      })
                    }
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="edit-lesson-content">Content/Description</Label>
                <Textarea
                  id="edit-lesson-content"
                  value={editingLessonData.lesson.content || ""}
                  onChange={(e) =>
                    setEditingLessonData({
                      ...editingLessonData,
                      lesson: { ...editingLessonData.lesson, content: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditLessonOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateLesson}>Update Lesson</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
