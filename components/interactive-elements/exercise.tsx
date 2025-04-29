"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, RefreshCw, Code, Eye } from "lucide-react"

export interface ExerciseProps {
  title: string
  description: string
  instructions: string
  initialCode?: string
  expectedOutput?: string
  solution?: string
  hint?: string
  language?: "javascript" | "typescript" | "python" | "html" | "css"
  onSubmit?: (code: string, isCorrect: boolean) => void
  className?: string
}

export function Exercise({
  title,
  description,
  instructions,
  initialCode = "",
  expectedOutput,
  solution,
  hint,
  language = "javascript",
  onSubmit,
  className,
}: ExerciseProps) {
  const { toast } = useToast()
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  // Simple evaluation function - in a real app, this would be more sophisticated
  const evaluateCode = () => {
    try {
      // This is a simplified evaluation that just compares with expected output
      // In a real app, you'd use a secure evaluation method or API

      // For demo purposes, we'll just check if the code contains certain keywords
      // or matches expected patterns based on the exercise

      let result = "Output would be shown here in a real implementation."
      let correct = false

      if (expectedOutput) {
        // Simple string comparison - this is just for demonstration
        // In a real app, you'd have proper code execution and testing
        correct = code.includes(expectedOutput)
        result = correct ? "Your code produces the expected output!" : "Your code doesn't produce the expected output."
      }

      setOutput(result)
      setIsCorrect(correct)

      if (onSubmit) {
        onSubmit(code, correct)
      }

      toast({
        title: correct ? "Correct Solution!" : "Not Quite Right",
        description: correct
          ? "Great job! Your solution works as expected."
          : "Your solution doesn't produce the expected output. Try again!",
        variant: correct ? "default" : "destructive",
      })
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`)
      setIsCorrect(false)
    }
  }

  const resetExercise = () => {
    setCode(initialCode)
    setOutput("")
    setIsCorrect(null)
    setShowHint(false)
    setShowSolution(false)
  }

  return (
    <Card className={cn("w-full max-w-3xl mx-auto", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Instructions:</h3>
          <div className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">{instructions}</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Your Code:</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">{language}</span>
              <Code className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono h-40 resize-y"
            placeholder={`Write your ${language} code here...`}
          />
        </div>

        {output && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Output:</h3>
            <div
              className={cn(
                "text-sm p-3 rounded-md whitespace-pre-wrap font-mono",
                isCorrect === true
                  ? "bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-200"
                  : isCorrect === false
                    ? "bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-200"
                    : "bg-muted",
              )}
            >
              {output}

              {isCorrect !== null && (
                <div className="flex items-center mt-2 pt-2 border-t border-border">
                  {isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span>{isCorrect ? "Correct! Well done." : "Not quite right. Try again or check the hint."}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {showHint && hint && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Hint:</h3>
            <div className="text-sm bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200 p-3 rounded-md whitespace-pre-wrap">
              {hint}
            </div>
          </div>
        )}

        {showSolution && solution && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Solution:</h3>
            <div className="text-sm bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-200 p-3 rounded-md whitespace-pre-wrap font-mono">
              {solution}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)} disabled={!hint}>
          {showHint ? "Hide Hint" : "Show Hint"}
        </Button>

        <Button variant="outline" size="sm" onClick={() => setShowSolution(!showSolution)} disabled={!solution}>
          <Eye className="h-4 w-4 mr-2" />
          {showSolution ? "Hide Solution" : "Show Solution"}
        </Button>

        <Button variant="outline" size="sm" onClick={resetExercise}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>

        <div className="flex-1" />

        <Button
          onClick={evaluateCode}
          className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
        >
          Run & Submit
        </Button>
      </CardFooter>
    </Card>
  )
}
