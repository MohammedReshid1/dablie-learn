"use client"

import { useState, useEffect } from "react"
import { Check, X, Clock, ChevronRight, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function Quiz({
  title = "Sample Quiz",
  description = "Test your knowledge with this quiz",
  questions = [
    {
      id: "q1",
      text: "What is the capital of France?",
      type: "single",
      options: [
        { id: "a", text: "London" },
        { id: "b", text: "Berlin" },
        { id: "c", text: "Paris" },
        { id: "d", text: "Madrid" },
      ],
      correctAnswer: ["c"],
    },
    {
      id: "q2",
      text: "Which of the following are programming languages? (Select all that apply)",
      type: "multiple",
      options: [
        { id: "a", text: "JavaScript" },
        { id: "b", text: "HTML" },
        { id: "c", text: "Python" },
        { id: "d", text: "CSS" },
      ],
      correctAnswer: ["a", "c"],
    },
  ],
  timeLimit = 0, // in seconds, 0 means no time limit
  passingScore = 70, // percentage
  onComplete = () => {},
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (timeLimit > 0 && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            completeQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeLimit, quizCompleted])

  const handleSingleAnswer = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: [optionId],
    })
  }

  const handleMultipleAnswer = (questionId, optionId, checked) => {
    const currentAnswers = answers[questionId] || []

    if (checked) {
      setAnswers({
        ...answers,
        [questionId]: [...currentAnswers, optionId],
      })
    } else {
      setAnswers({
        ...answers,
        [questionId]: currentAnswers.filter((id) => id !== optionId),
      })
    }
  }

  const isAnswered = (questionId) => {
    return answers[questionId] && answers[questionId].length > 0
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      completeQuiz()
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const completeQuiz = () => {
    let correctAnswers = 0

    questions.forEach((question) => {
      const userAnswer = answers[question.id] || []
      const correctAnswer = question.correctAnswer

      // Check if arrays have the same elements (order doesn't matter)
      const isCorrect =
        userAnswer.length === correctAnswer.length && userAnswer.every((answer) => correctAnswer.includes(answer))

      if (isCorrect) correctAnswers++
    })

    const calculatedScore = Math.round((correctAnswers / questions.length) * 100)
    setScore(calculatedScore)
    setQuizCompleted(true)

    if (onComplete) {
      onComplete({
        score: calculatedScore,
        passed: calculatedScore >= passingScore,
        answers,
      })
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setQuizCompleted(false)
    setScore(0)
    setTimeRemaining(timeLimit)
    setShowResults(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  if (quizCompleted && !showResults) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>{title} - Results</CardTitle>
          <CardDescription>
            You scored {score}% ({score >= passingScore ? "Passed" : "Failed"})
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center items-center space-x-4">
            <div className="relative h-40 w-40">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="text-muted-foreground stroke-current"
                  strokeWidth="10"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className={`${score >= passingScore ? "text-green-500" : "text-red-500"} stroke-current`}
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  strokeDasharray={`${score * 2.51} 251.2`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{score}%</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="font-medium">
              {score >= passingScore ? (
                <span className="flex items-center justify-center text-green-500">
                  <Check className="mr-2 h-5 w-5" /> Congratulations! You passed the quiz.
                </span>
              ) : (
                <span className="flex items-center justify-center text-red-500">
                  <X className="mr-2 h-5 w-5" /> You did not pass the quiz.
                </span>
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              You answered {Object.keys(answers).length} out of {questions.length} questions.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button onClick={() => setShowResults(true)}>Review Answers</Button>
          <Button variant="outline" onClick={resetQuiz}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (showResults) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{title} - Answer Review</CardTitle>
          <CardDescription>Review your answers and see the correct solutions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question, index) => {
            const userAnswers = answers[question.id] || []
            const isCorrect =
              userAnswers.length === question.correctAnswer.length &&
              userAnswers.every((answer) => question.correctAnswer.includes(answer))

            return (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium">
                    Question {index + 1}: {question.text}
                  </h3>
                  {isCorrect ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      <Check className="mr-1 h-3 w-3" /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      <X className="mr-1 h-3 w-3" /> Incorrect
                    </span>
                  )}
                </div>

                <div className="mt-2 space-y-2">
                  {question.options.map((option) => {
                    const isUserSelected = userAnswers.includes(option.id)
                    const isCorrectAnswer = question.correctAnswer.includes(option.id)

                    let optionClass = ""
                    if (isUserSelected && isCorrectAnswer) {
                      optionClass = "bg-green-50 border-green-200"
                    } else if (isUserSelected && !isCorrectAnswer) {
                      optionClass = "bg-red-50 border-red-200"
                    } else if (!isUserSelected && isCorrectAnswer) {
                      optionClass = "bg-amber-50 border-amber-200"
                    }

                    return (
                      <div key={option.id} className={`flex items-center p-2 border rounded ${optionClass}`}>
                        <div className="mr-2">
                          {isUserSelected && isCorrectAnswer && <Check className="h-4 w-4 text-green-500" />}
                          {isUserSelected && !isCorrectAnswer && <X className="h-4 w-4 text-red-500" />}
                          {!isUserSelected && isCorrectAnswer && <Check className="h-4 w-4 text-amber-500" />}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={resetQuiz}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {timeLimit > 0 && (
            <div className="flex items-center text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">{currentQuestion.text}</h3>

            {currentQuestion.type === "single" ? (
              <RadioGroup
                value={answers[currentQuestion.id]?.[0] || ""}
                onValueChange={(value) => handleSingleAnswer(currentQuestion.id, value)}
              >
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id}>{option.text}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={(answers[currentQuestion.id] || []).includes(option.id)}
                      onCheckedChange={(checked) => handleMultipleAnswer(currentQuestion.id, option.id, checked)}
                    />
                    <Label htmlFor={option.id}>{option.text}</Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={previousQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>
        <Button onClick={nextQuestion} disabled={!isAnswered(currentQuestion.id)}>
          {currentQuestionIndex < questions.length - 1 ? (
            <>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Complete Quiz"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
