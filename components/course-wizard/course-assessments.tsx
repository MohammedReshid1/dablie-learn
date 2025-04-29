"use client"

import { useState } from "react"
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

export default function CourseAssessments({ data, updateData }) {
  const [activeTab, setActiveTab] = useState("quizzes")
  const [quizzes, setQuizzes] = useState(data.quizzes || [])
  const [assignments, setAssignments] = useState(data.assignments || [])
  const [showAddQuizDialog, setShowAddQuizDialog] = useState(false)
  const [showAddAssignmentDialog, setShowAddAssignmentDialog] = useState(false)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(null)
  const [currentAssignmentIndex, setCurrentAssignmentIndex] = useState(null)

  // New quiz state
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    description: "",
    passingScore: 70,
    timeLimit: 0,
    questions: [],
  })

  // New question state
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "multiple-choice",
    options: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
    correctAnswerIndex: null,
  })

  // New assignment state
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    instructions: "",
    deadline: 7, // Days from enrollment
    passingGrade: 70,
    submissionType: "text",
    maxAttempts: 3,
  })

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
    updateData({ quizzes: updatedQuizzes })
  }

  const editQuiz = (index) => {
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
    updateData({ quizzes: updatedQuizzes })
  }

  const deleteQuiz = (index) => {
    const updatedQuizzes = quizzes.filter((_, i) => i !== index)
    setQuizzes(updatedQuizzes)
    updateData({ quizzes: updatedQuizzes })
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
      correctAnswerIndex: null,
    })
  }

  const removeQuestion = (index) => {
    const updatedQuestions = newQuiz.questions.filter((_, i) => i !== index)
    setNewQuiz({ ...newQuiz, questions: updatedQuestions })
  }

  const updateQuestionType = (type) => {
    setNewQuestion({
      ...newQuestion,
      type,
      options:
        type === "multiple-choice"
          ? [
              { text: "", isCorrect: false },
              { text: "", isCorrect: false },
            ]
          : [],
      correctAnswerIndex: null,
    })
  }

  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, { text: "", isCorrect: false }],
    })
  }

  const updateOption = (index, text) => {
    const updatedOptions = [...newQuestion.options]
    updatedOptions[index] = { ...updatedOptions[index], text }
    setNewQuestion({ ...newQuestion, options: updatedOptions })
  }

  const toggleOptionCorrect = (index) => {
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
    updateData({ assignments: updatedAssignments })
  }

  const editAssignment = (index) => {
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
    updateData({ assignments: updatedAssignments })
  }

  const deleteAssignment = (index) => {
    const updatedAssignments = assignments.filter((_, i) => i !== index)
    setAssignments(updatedAssignments)
    updateData({ assignments: updatedAssignments })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Course Assessments</h2>
        <p className="text-muted-foreground">Create quizzes and assignments to assess student understanding.</p>
      </div>

      <Tabs defaultValue="quizzes" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quizzes" className="flex items-center gap-2">
            <FileQuestion className="h-4 w-4" />
            <span>Quizzes</span>
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Assignments</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quizzes" className="p-4 pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Course Quizzes</h3>
              <p className="text-sm text-muted-foreground">
                Create quizzes to test student knowledge and provide feedback.
              </p>
            </div>

            <Dialog open={showAddQuizDialog} onOpenChange={setShowAddQuizDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Quiz
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{currentQuizIndex !== null ? "Edit Quiz" : "Create New Quiz"}</DialogTitle>
                  <DialogDescription>Design your quiz with multiple types of questions.</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="quizTitle">Quiz Title</Label>
                      <Input
                        id="quizTitle"
                        placeholder="e.g. JavaScript Fundamentals Quiz"
                        value={newQuiz.title}
                        onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quizDescription">Description (Optional)</Label>
                      <Textarea
                        id="quizDescription"
                        placeholder="Briefly describe what this quiz will cover..."
                        value={newQuiz.description}
                        onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="passingScore">Passing Score (%)</Label>
                        <Input
                          id="passingScore"
                          type="number"
                          min="0"
                          max="100"
                          value={newQuiz.passingScore}
                          onChange={(e) =>
                            setNewQuiz({ ...newQuiz, passingScore: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeLimit">Time Limit (minutes, 0 for no limit)</Label>
                        <Input
                          id="timeLimit"
                          type="number"
                          min="0"
                          value={newQuiz.timeLimit}
                          onChange={(e) => setNewQuiz({ ...newQuiz, timeLimit: Number.parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-4">Quiz Questions</h4>

                    {newQuiz.questions.length > 0 ? (
                      <div className="space-y-3 mb-6">
                        {newQuiz.questions.map((question, index) => (
                          <Card key={index}>
                            <CardHeader className="py-3">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-sm font-medium">Question {index + 1}</CardTitle>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => removeQuestion(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="text-sm">
                              <p className="font-medium">{question.text}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Type:{" "}
                                {question.type === "multiple-choice"
                                  ? "Multiple Choice"
                                  : question.type === "single-choice"
                                    ? "Single Choice"
                                    : "True/False"}
                              </p>

                              {(question.type === "multiple-choice" || question.type === "single-choice") && (
                                <div className="mt-2 space-y-1">
                                  {question.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex items-center gap-2">
                                      <div className="w-4 h-4 flex items-center justify-center">
                                        {option.isCorrect ? (
                                          <CheckSquare className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <SquareIcon className="h-4 w-4 text-gray-300" />
                                        )}
                                      </div>
                                      <span>{option.text}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {question.type === "true-false" && (
                                <div className="mt-2 text-sm">
                                  Correct answer:{" "}
                                  <span className="font-medium">{question.correctAnswer ? "True" : "False"}</span>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-6 border rounded-lg mb-6">
                        <p className="text-muted-foreground">No questions added yet.</p>
                        <p className="text-sm text-muted-foreground mt-1">Add questions below to build your quiz.</p>
                      </div>
                    )}

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Add New Question</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="questionText">Question Text</Label>
                          <Textarea
                            id="questionText"
                            placeholder="e.g. What is the correct way to declare a variable in JavaScript?"
                            value={newQuestion.text}
                            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Question Type</Label>
                          <RadioGroup
                            value={newQuestion.type}
                            onValueChange={updateQuestionType}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="multiple-choice" id="multiple-choice" />
                              <Label htmlFor="multiple-choice" className="cursor-pointer">
                                Multiple Choice
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="single-choice" id="single-choice" />
                              <Label htmlFor="single-choice" className="cursor-pointer">
                                Single Choice
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="true-false" id="true-false" />
                              <Label htmlFor="true-false" className="cursor-pointer">
                                True/False
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {(newQuestion.type === "multiple-choice" || newQuestion.type === "single-choice") && (
                          <div className="space-y-2">
                            <Label>Answer Options</Label>
                            <div className="space-y-2">
                              {newQuestion.options.map((option, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Checkbox
                                    id={`option-${index}`}
                                    checked={option.isCorrect}
                                    onCheckedChange={() => toggleOptionCorrect(index)}
                                  />
                                  <Input
                                    placeholder={`Option ${index + 1}`}
                                    value={option.text}
                                    onChange={(e) => updateOption(index, e.target.value)}
                                    className="flex-1"
                                  />
                                  {index > 1 && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                      onClick={() => {
                                        const updatedOptions = newQuestion.options.filter((_, i) => i !== index)
                                        setNewQuestion({ ...newQuestion, options: updatedOptions })
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              ))}

                              {newQuestion.options.length < 6 && (
                                <Button variant="outline" size="sm" className="mt-2" onClick={addOption}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Option
                                </Button>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {newQuestion.type === "multiple-choice"
                                ? "Check all correct answers."
                                : "Check the single correct answer."}
                            </p>
                          </div>
                        )}

                        {newQuestion.type === "true-false" && (
                          <div className="space-y-2">
                            <Label>Correct Answer</Label>
                            <RadioGroup
                              value={newQuestion.correctAnswer ? "true" : "false"}
                              onValueChange={(value) =>
                                setNewQuestion({
                                  ...newQuestion,
                                  correctAnswer: value === "true",
                                })
                              }
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="answer-true" />
                                <Label htmlFor="answer-true" className="cursor-pointer">
                                  True
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="answer-false" />
                                <Label htmlFor="answer-false" className="cursor-pointer">
                                  False
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        )}

                        <Button
                          className="w-full"
                          onClick={addQuestion}
                          disabled={
                            !newQuestion.text ||
                            ((newQuestion.type === "multiple-choice" || newQuestion.type === "single-choice") &&
                              !newQuestion.options.some((opt) => opt.text.trim() !== ""))
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddQuizDialog(false)
                      setCurrentQuizIndex(null)
                      setNewQuiz({
                        title: "",
                        description: "",
                        passingScore: 70,
                        timeLimit: 0,
                        questions: [],
                      })
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={currentQuizIndex !== null ? updateQuiz : addQuiz}
                    disabled={!newQuiz.title || newQuiz.questions.length === 0}
                    className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                  >
                    {currentQuizIndex !== null ? "Update Quiz" : "Save Quiz"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {quizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizzes.map((quiz, index) => (
                <Card key={quiz.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/30 pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{quiz.title}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {quiz.description || "No description provided."}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8" onClick={() => editQuiz(index)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteQuiz(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Questions:</span>
                        <span className="font-medium">{quiz.questions.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Passing Score:</span>
                        <span className="font-medium">{quiz.passingScore}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Time Limit:</span>
                        <span className="font-medium">
                          {quiz.timeLimit > 0 ? `${quiz.timeLimit} minutes` : "No limit"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border rounded-lg">
              <FileQuestion className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Quizzes Yet</h3>
              <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
                Create quizzes to test your students' knowledge and provide them with valuable feedback.
              </p>
              <Button
                className="mt-6 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                onClick={() => setShowAddQuizDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Quiz
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="assignments" className="p-4 pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Course Assignments</h3>
              <p className="text-sm text-muted-foreground">
                Create assignments for students to demonstrate their skills.
              </p>
            </div>

            <Dialog open={showAddAssignmentDialog} onOpenChange={setShowAddAssignmentDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {currentAssignmentIndex !== null ? "Edit Assignment" : "Create New Assignment"}
                  </DialogTitle>
                  <DialogDescription>Create an assignment for students to complete and submit.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignmentTitle">Assignment Title</Label>
                    <Input
                      id="assignmentTitle"
                      placeholder="e.g. Build a Responsive Landing Page"
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignmentDescription">Description</Label>
                    <Textarea
                      id="assignmentDescription"
                      placeholder="Briefly describe the purpose of this assignment..."
                      value={newAssignment.description}
                      onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignmentInstructions">Detailed Instructions</Label>
                    <Textarea
                      id="assignmentInstructions"
                      placeholder="Provide detailed instructions on what students need to do..."
                      className="min-h-32"
                      value={newAssignment.instructions}
                      onChange={(e) => setNewAssignment({ ...newAssignment, instructions: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="submissionType">Submission Type</Label>
                      <Select
                        value={newAssignment.submissionType}
                        onValueChange={(value) => setNewAssignment({ ...newAssignment, submissionType: value })}
                      >
                        <SelectTrigger id="submissionType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text Submission</SelectItem>
                          <SelectItem value="file">File Upload</SelectItem>
                          <SelectItem value="url">External URL</SelectItem>
                          <SelectItem value="project">Project Submission</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passingGrade">Passing Grade (%)</Label>
                      <Input
                        id="passingGrade"
                        type="number"
                        min="0"
                        max="100"
                        value={newAssignment.passingGrade}
                        onChange={(e) =>
                          setNewAssignment({ ...newAssignment, passingGrade: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline (days after enrollment)</Label>
                      <Input
                        id="deadline"
                        type="number"
                        min="1"
                        value={newAssignment.deadline}
                        onChange={(e) =>
                          setNewAssignment({ ...newAssignment, deadline: Number.parseInt(e.target.value) || 7 })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Number of days students have to complete after enrolling
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxAttempts">Maximum Attempts</Label>
                      <Input
                        id="maxAttempts"
                        type="number"
                        min="1"
                        value={newAssignment.maxAttempts}
                        onChange={(e) =>
                          setNewAssignment({ ...newAssignment, maxAttempts: Number.parseInt(e.target.value) || 1 })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        How many times students can submit this assignment
                      </p>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddAssignmentDialog(false)
                      setCurrentAssignmentIndex(null)
                      setNewAssignment({
                        title: "",
                        description: "",
                        instructions: "",
                        deadline: 7,
                        passingGrade: 70,
                        submissionType: "text",
                        maxAttempts: 3,
                      })
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={currentAssignmentIndex !== null ? updateAssignment : addAssignment}
                    disabled={!newAssignment.title}
                    className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                  >
                    {currentAssignmentIndex !== null ? "Update Assignment" : "Save Assignment"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {assignments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignments.map((assignment, index) => (
                <Card key={assignment.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/30 pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{assignment.title}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {assignment.description || "No description provided."}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8" onClick={() => editAssignment(index)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteAssignment(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Submission Type:</span>
                        <span className="font-medium capitalize">{assignment.submissionType}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Deadline:</span>
                        <span className="font-medium">{assignment.deadline} days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Passing Grade:</span>
                        <span className="font-medium">{assignment.passingGrade}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Maximum Attempts:</span>
                        <span className="font-medium">{assignment.maxAttempts}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border rounded-lg">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Assignments Yet</h3>
              <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
                Create assignments to help students apply what they've learned and demonstrate their skills.
              </p>
              <Button
                className="mt-6 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                onClick={() => setShowAddAssignmentDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Assignment
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
