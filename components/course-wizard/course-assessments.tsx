"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, FileQuestion, FileText, Trash2, Edit, CheckSquare, SquareIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Define interfaces for props and state
interface Option {
  text: string
  isCorrect: boolean
}

interface Question {
  text: string
  type: "multiple-choice" | "single-choice" | "true-false" | "short-answer"
  options: Option[]
  // Removed correctAnswerIndex as it's handled by Option.isCorrect for choice types
}

interface Quiz {
  id: string
  title: string
  description: string
  passingScore: number
  timeLimit: number // in minutes, 0 for no limit
  questions: Question[]
}

interface Assignment {
  id: string
  title: string
  description: string
  instructions: string
  deadline: number // days from enrollment
  passingGrade: number // percentage
  submissionType: "text" | "file" | "url"
  maxAttempts: number
}

interface CourseAssessmentsProps {
  formData: {
    quizzes?: Quiz[]
    assignments?: Assignment[]
  }
  updateFormData: (data: { quizzes?: Quiz[]; assignments?: Assignment[] }) => void
}

export default function CourseAssessments({ formData, updateFormData }: CourseAssessmentsProps) {
  const [activeTab, setActiveTab] = useState("quizzes")
  // Initialize state with types and from formData
  const [quizzes, setQuizzes] = useState<Quiz[]>(formData.quizzes || [])
  const [assignments, setAssignments] = useState<Assignment[]>(formData.assignments || [])
  const [showAddQuizDialog, setShowAddQuizDialog] = useState(false)
  const [showAddAssignmentDialog, setShowAddAssignmentDialog] = useState(false)
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number | null>(null)
  const [currentAssignmentIndex, setCurrentAssignmentIndex] = useState<number | null>(null)

  // New quiz state with type
  const [newQuiz, setNewQuiz] = useState<Omit<Quiz, "id">>({
    title: "",
    description: "",
    passingScore: 70,
    timeLimit: 0,
    questions: [],
  })

  // New question state with type
  const [newQuestion, setNewQuestion] = useState<Question>({
    text: "",
    type: "multiple-choice",
    options: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  })

  // New assignment state with type
  const [newAssignment, setNewAssignment] = useState<Omit<Assignment, "id">>({
    title: "",
    description: "",
    instructions: "",
    deadline: 7, // Days from enrollment
    passingGrade: 70,
    submissionType: "text",
    maxAttempts: 3,
  })

  // useEffect to update parent state
  useEffect(() => {
    updateFormData({ quizzes, assignments })
  }, [quizzes, assignments, updateFormData])

  // Handle quizzes
  const addQuiz = () => {
    if (!newQuiz.title) return

    const quiz = {
      id: `quiz-${quizzes.length + 1}`,
      ...newQuiz,
    }

    const updatedQuizzes = [...quizzes, quiz]
    setQuizzes(updatedQuizzes)
    setNewQuiz({
      title: "",
      description: "",
      passingScore: 70,
      timeLimit: 0,
      questions: [],
    })
    setShowAddQuizDialog(false)
  }

  const editQuiz = (index: number) => {
    setNewQuiz({ ...quizzes[index] })
    setCurrentQuizIndex(index)
    setShowAddQuizDialog(true)
  }

  const updateQuiz = () => {
    if (!newQuiz.title) return

    const updatedQuizzes = [...quizzes]
    updatedQuizzes[currentQuizIndex] = {
      ...updatedQuizzes[currentQuizIndex],
      ...newQuiz,
    }

    setQuizzes(updatedQuizzes)
    setNewQuiz({
      title: "",
      description: "",
      passingScore: 70,
      timeLimit: 0,
      questions: [],
    })
    setCurrentQuizIndex(null)
    setShowAddQuizDialog(false)
  }

  const deleteQuiz = (index: number) => {
    const updatedQuizzes = quizzes.filter((_, i) => i !== index)
    setQuizzes(updatedQuizzes)
  }

  // Handle questions in a quiz
  const addQuestion = () => {
    if (!newQuestion.text) return

    // Format question based on type
    const formattedQuestion = { ...newQuestion }

    if (newQuestion.type === "multiple-choice") {
      formattedQuestion.options = newQuestion.options.filter((option) => option.text.trim() !== "")

      // Ensure at least one option is marked as correct
      const hasCorrectOption = formattedQuestion.options.some((option) => option.isCorrect)
      if (!hasCorrectOption && formattedQuestion.options.length > 0) {
        formattedQuestion.options[0].isCorrect = true
      }
    }

    const updatedQuiz = {
      ...newQuiz,
      questions: [...newQuiz.questions, formattedQuestion],
    }

    setNewQuiz(updatedQuiz)
    setNewQuestion({
      text: "",
      type: "multiple-choice",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    })
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = newQuiz.questions.filter((_, i) => i !== index)
    setNewQuiz({ ...newQuiz, questions: updatedQuestions })
  }

  const updateQuestionType = (type: Question["type"]) => {
    setNewQuestion({
      ...newQuestion,
      type,
      options:
        type === "multiple-choice" || type === "single-choice"
          ? [
              { text: "", isCorrect: false },
              { text: "", isCorrect: false },
            ]
          : [], // Clear options for non-choice types
    })
  }

  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, { text: "", isCorrect: false }],
    })
  }

  const updateOption = (index: number, text: string) => {
    const updatedOptions = [...newQuestion.options]
    updatedOptions[index] = { ...updatedOptions[index], text }
    setNewQuestion({ ...newQuestion, options: updatedOptions })
  }

  const toggleOptionCorrect = (index: number) => {
    const updatedOptions = [...newQuestion.options]

    if (newQuestion.type === "multiple-choice") {
      // For multiple choice, multiple options can be correct
      updatedOptions[index] = {
        ...updatedOptions[index],
        isCorrect: !updatedOptions[index].isCorrect,
      }
    } else if (newQuestion.type === "single-choice") {
      // For single choice, only one option can be correct
      updatedOptions.forEach((option, i) => {
        option.isCorrect = i === index
      })
    }

    setNewQuestion({ ...newQuestion, options: updatedOptions })
  }

  // Handle assignments
  const addAssignment = () => {
    if (!newAssignment.title) return

    const assignment = {
      id: `assignment-${assignments.length + 1}`,
      ...newAssignment,
    }

    const updatedAssignments = [...assignments, assignment]
    setAssignments(updatedAssignments)
    setNewAssignment({
      title: "",
      description: "",
      instructions: "",
      deadline: 7,
      passingGrade: 70,
      submissionType: "text",
      maxAttempts: 3,
    })
    setShowAddAssignmentDialog(false)
  }

  const editAssignment = (index: number) => {
    setNewAssignment({ ...assignments[index] })
    setCurrentAssignmentIndex(index)
    setShowAddAssignmentDialog(true)
  }

  const updateAssignment = () => {
    if (!newAssignment.title) return

    const updatedAssignments = [...assignments]
    updatedAssignments[currentAssignmentIndex] = {
      ...updatedAssignments[currentAssignmentIndex],
      ...newAssignment,
    }

    setAssignments(updatedAssignments)
    setNewAssignment({
      title: "",
      description: "",
      instructions: "",
      deadline: 7,
      passingGrade: 70,
      submissionType: "text",
      maxAttempts: 3,
    })
    setCurrentAssignmentIndex(null)
    setShowAddAssignmentDialog(false)
  }

  const deleteAssignment = (index: number) => {
    const updatedAssignments = assignments.filter((_, i) => i !== index)
    setAssignments(updatedAssignments)
  }

  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Assessments</CardTitle>
        <CardDescription className="text-muted-foreground">
          Add quizzes and assignments to evaluate student learning.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Quizzes</h3>
              {/* Add Quiz Dialog Trigger */}
              <Dialog open={showAddQuizDialog} onOpenChange={setShowAddQuizDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => { setCurrentQuizIndex(null); setNewQuiz({ title: "", description: "", passingScore: 70, timeLimit: 0, questions: [] }); setShowAddQuizDialog(true); }}>
                    <Plus className="mr-2 h-4 w-4" /> Add Quiz
                  </Button>
                </DialogTrigger>
                {/* Add/Edit Quiz Dialog Content */}
                <DialogContent className="sm:max-w-[600px] bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">{currentQuizIndex !== null ? "Edit Quiz" : "Add New Quiz"}</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Configure the details and questions for this quiz.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                    {/* Quiz Details */}
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quiz-title" className="text-right text-foreground">Title</Label>
                      <Input
                        id="quiz-title"
                        value={newQuiz.title}
                        onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                        className="col-span-3 bg-input text-foreground border-border placeholder:text-muted-foreground"
                        placeholder="e.g., Introduction Quiz"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quiz-description" className="text-right text-foreground">Description</Label>
                      <Textarea
                        id="quiz-description"
                        value={newQuiz.description}
                        onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                        className="col-span-3 bg-input text-foreground border-border placeholder:text-muted-foreground"
                        placeholder="Briefly describe the quiz content"
                      />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quiz-passing-score" className="text-right text-foreground">Passing Score (%)</Label>
                        <Input
                          id="quiz-passing-score"
                          type="number"
                          min="0"
                          max="100"
                          value={newQuiz.passingScore}
                          onChange={(e) => setNewQuiz({ ...newQuiz, passingScore: parseInt(e.target.value) || 0 })}
                          className="col-span-3 bg-input text-foreground border-border placeholder:text-muted-foreground"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quiz-time-limit" className="text-right text-foreground">Time Limit (minutes)</Label>
                        <Input
                          id="quiz-time-limit"
                          type="number"
                          min="0"
                          value={newQuiz.timeLimit}
                          onChange={(e) => setNewQuiz({ ...newQuiz, timeLimit: parseInt(e.target.value) || 0 })}
                          className="col-span-3 bg-input text-foreground border-border placeholder:text-muted-foreground"
                          placeholder="0 for no limit"
                        />
                      </div>

                    {/* Questions Section */}
                    <div className="col-span-4 mt-4 border-t border-border pt-4">
                      <h4 className="font-semibold mb-2 text-foreground">Questions</h4>
                      {newQuiz.questions.map((q, index) => (
                        <div key={index} className="border border-border rounded-md p-3 mb-3 bg-background">
                           <div className="flex justify-between items-start">
                            <p className="text-sm font-medium text-foreground mb-1">{index + 1}. {q.text}</p>
                            <Button variant="ghost" size="icon" onClick={() => removeQuestion(index)} className="text-muted-foreground hover:text-destructive">
                               <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground capitalize mb-2">{q.type.replace('-', ' ')}</p>
                          {q.options && q.options.length > 0 && (
                            <ul className="list-disc list-inside pl-4 text-sm space-y-1 text-muted-foreground">
                              {q.options.map((opt, optIndex) => (
                                <li key={optIndex} className={`${opt.isCorrect ? 'text-green-600 font-medium' : ''}`}>
                                  {opt.text} {opt.isCorrect && "(Correct)"}
                                </li>
                              ))}
                            </ul>
                          )}
                           {q.type === 'short-answer' && <p className="text-sm text-muted-foreground italic">(Requires manual grading)</p>}
                           {q.type === 'true-false' && (
                              <p className="text-sm text-muted-foreground">Correct Answer: {q.options[0]?.isCorrect ? 'True' : 'False'}</p>
                           )}
                        </div>
                      ))}

                      {/* Add New Question Form */}
                      <div className="border border-dashed border-border rounded-lg p-4 mt-4 bg-background">
                        <h5 className="font-semibold mb-3 text-foreground">Add New Question</h5>
                        <div className="grid gap-3">
                          <Label htmlFor="question-type" className="text-foreground">Question Type</Label>
                          <Select value={newQuestion.type} onValueChange={(value: Question["type"]) => updateQuestionType(value)}>
                             <SelectTrigger className="w-full bg-input text-foreground border-border">
                                <SelectValue placeholder="Select question type" />
                             </SelectTrigger>
                             <SelectContent className="bg-popover text-popover-foreground border-border">
                                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                <SelectItem value="single-choice">Single Choice (Radio)</SelectItem>
                                <SelectItem value="true-false">True/False</SelectItem>
                                {/* <SelectItem value="short-answer">Short Answer</SelectItem> */} {/* Short Answer might need more complex handling */}
                             </SelectContent>
                          </Select>

                          <Label htmlFor="question-text" className="text-foreground">Question Text</Label>
                          <Textarea
                            id="question-text"
                            value={newQuestion.text}
                            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                            className="bg-input text-foreground border-border placeholder:text-muted-foreground"
                            placeholder="Enter the question here..."
                          />

                          {(newQuestion.type === "multiple-choice" || newQuestion.type === "single-choice") && (
                            <div className="space-y-2">
                              <Label className="text-foreground">Options</Label>
                              {newQuestion.options.map((option, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  {newQuestion.type === "multiple-choice" && (
                                    <Checkbox
                                      id={`option-correct-${index}`}
                                      checked={option.isCorrect}
                                      onCheckedChange={() => toggleOptionCorrect(index)}
                                    />
                                  )}
                                   {newQuestion.type === "single-choice" && (
                                      <RadioGroup value={newQuestion.options.findIndex(opt => opt.isCorrect).toString()} onValueChange={() => toggleOptionCorrect(index)}>
                                          <RadioGroupItem value={index.toString()} id={`option-correct-${index}`} />
                                      </RadioGroup>
                                  )}
                                  <Input
                                    type="text"
                                    value={option.text}
                                    onChange={(e) => updateOption(index, e.target.value)}
                                    className="flex-grow bg-input text-foreground border-border placeholder:text-muted-foreground"
                                    placeholder={`Option ${index + 1}`}
                                  />
                                </div>
                              ))}
                               <Button variant="outline" size="sm" onClick={addOption} className="mt-2">
                                Add Option
                              </Button>
                            </div>
                          )}

                          {newQuestion.type === "true-false" && (
                             <div className="space-y-2">
                               <Label className="text-foreground">Correct Answer</Label>
                               <RadioGroup
                                 value={newQuestion.options[0]?.isCorrect ? "true" : "false"}
                                 onValueChange={(value) => setNewQuestion({ ...newQuestion, options: [{text: "True/False Option", isCorrect: value === "true"}] })}
                                 className="flex space-x-4"
                               >
                                  <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="true" id="true" />
                                      <Label htmlFor="true" className="text-foreground">True</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="false" id="false" />
                                      <Label htmlFor="false" className="text-foreground">False</Label>
                                  </div>
                               </RadioGroup>
                             </div>
                          )}
                        </div>
                        <Button onClick={addQuestion} disabled={!newQuestion.text} className="mt-4 w-full">Add Question to Quiz</Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddQuizDialog(false)}>Cancel</Button>
                    <Button onClick={currentQuizIndex !== null ? updateQuiz : addQuiz}>
                      {currentQuizIndex !== null ? "Update Quiz" : "Add Quiz"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* List of Quizzes */}
            <div className="space-y-3">
              {quizzes.length === 0 ? (
                <p className="text-muted-foreground text-sm">No quizzes added yet.</p>
              ) : (
                quizzes.map((quiz, index) => (
                  <div key={quiz.id} className="flex items-center justify-between border border-border rounded-md p-3 bg-background">
                    <div>
                      <p className="font-medium text-foreground">{quiz.title}</p>
                      <p className="text-sm text-muted-foreground">{quiz.questions.length} question(s)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => editQuiz(index)} className="text-muted-foreground hover:text-foreground">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteQuiz(index)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Assignments</h3>
              {/* Add Assignment Dialog Trigger */}
               <Dialog open={showAddAssignmentDialog} onOpenChange={setShowAddAssignmentDialog}>
                 <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => { setCurrentAssignmentIndex(null); setNewAssignment({ title: "", description: "", instructions: "", deadline: 7, passingGrade: 70, submissionType: "text", maxAttempts: 3 }); setShowAddAssignmentDialog(true); }}>
                      <Plus className="mr-2 h-4 w-4" /> Add Assignment
                    </Button>
                 </DialogTrigger>
                {/* Add/Edit Assignment Dialog Content */}
                <DialogContent className="sm:max-w-[600px] bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">{currentAssignmentIndex !== null ? "Edit Assignment" : "Add New Assignment"}</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                       Define the assignment details, instructions, and submission criteria.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="assignment-title" className="text-right text-foreground">Title</Label>
                        <Input
                          id="assignment-title"
                          value={newAssignment.title}
                          onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                          className="col-span-3 bg-input text-foreground border-border placeholder:text-muted-foreground"
                          placeholder="e.g., Final Project Proposal"
                        />
                      </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="assignment-description" className="text-right text-foreground">Description</Label>
                        <Textarea
                          id="assignment-description"
                          value={newAssignment.description}
                          onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                          className="col-span-3 bg-input text-foreground border-border placeholder:text-muted-foreground"
                          placeholder="Brief description of the assignment"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="assignment-instructions" className="text-right text-foreground">Instructions</Label>
                        <Textarea
                          id="assignment-instructions"
                          value={newAssignment.instructions}
                          onChange={(e) => setNewAssignment({ ...newAssignment, instructions: e.target.value })}
                          className="col-span-3 h-24 bg-input text-foreground border-border placeholder:text-muted-foreground"
                          placeholder="Detailed instructions for the student"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="assignment-deadline" className="text-right text-foreground">Deadline (Days)</Label>
                        <Input
                          id="assignment-deadline"
                          type="number"
                          min="1"
                          value={newAssignment.deadline}
                          onChange={(e) => setNewAssignment({ ...newAssignment, deadline: parseInt(e.target.value) || 1 })}
                          className="col-span-3 bg-input text-foreground border-border placeholder:text-muted-foreground"
                          placeholder="Days from enrollment"
                        />
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="assignment-passing-grade" className="text-right text-foreground">Passing Grade (%)</Label>
                        <Input
                          id="assignment-passing-grade"
                          type="number"
                          min="0"
                          max="100"
                          value={newAssignment.passingGrade}
                          onChange={(e) => setNewAssignment({ ...newAssignment, passingGrade: parseInt(e.target.value) || 0 })}
                          className="col-span-3 bg-input text-foreground border-border placeholder:text-muted-foreground"
                        />
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="assignment-submission-type" className="text-right text-foreground">Submission Type</Label>
                         <Select value={newAssignment.submissionType} onValueChange={(value: Assignment["submissionType"]) => setNewAssignment({ ...newAssignment, submissionType: value })}>
                            <SelectTrigger className="col-span-3 bg-input text-foreground border-border">
                                <SelectValue placeholder="Select submission type" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover text-popover-foreground border-border">
                                <SelectItem value="text">Text Entry</SelectItem>
                                <SelectItem value="file">File Upload</SelectItem>
                                <SelectItem value="url">Website URL</SelectItem>
                            </SelectContent>
                        </Select>
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="assignment-max-attempts" className="text-right text-foreground">Max Attempts</Label>
                        <Input
                          id="assignment-max-attempts"
                          type="number"
                          min="1"
                          value={newAssignment.maxAttempts}
                          onChange={(e) => setNewAssignment({ ...newAssignment, maxAttempts: parseInt(e.target.value) || 1 })}
                          className="col-span-3 bg-input text-foreground border-border placeholder:text-muted-foreground"
                        />
                      </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddAssignmentDialog(false)}>Cancel</Button>
                     <Button onClick={currentAssignmentIndex !== null ? updateAssignment : addAssignment}>
                      {currentAssignmentIndex !== null ? "Update Assignment" : "Add Assignment"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* List of Assignments */}
            <div className="space-y-3">
               {assignments.length === 0 ? (
                 <p className="text-muted-foreground text-sm">No assignments added yet.</p>
              ) : (
                assignments.map((assignment, index) => (
                  <div key={assignment.id} className="flex items-center justify-between border border-border rounded-md p-3 bg-background">
                    <div>
                      <p className="font-medium text-foreground">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground capitalize">Type: {assignment.submissionType}, Deadline: {assignment.deadline} days</p>
                    </div>
                     <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => editAssignment(index)} className="text-muted-foreground hover:text-foreground">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteAssignment(index)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
