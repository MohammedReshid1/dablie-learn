"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { BarChart2, CheckCircle } from "lucide-react"

export interface PollOption {
  id: string
  text: string
  votes: number
}

export interface PollProps {
  id: string
  title: string
  description?: string
  options: PollOption[]
  totalVotes?: number
  onVote?: (pollId: string, optionId: string) => void
  className?: string
  showResults?: boolean
}

export function Poll({
  id,
  title,
  description,
  options,
  totalVotes: initialTotalVotes = 0,
  onVote,
  className,
  showResults: initialShowResults = false,
}: PollProps) {
  const { toast } = useToast()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [showResults, setShowResults] = useState(initialShowResults)
  const [pollOptions, setPollOptions] = useState<PollOption[]>(options)
  const [totalVotes, setTotalVotes] = useState(initialTotalVotes)

  // Calculate the percentage for each option
  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0
    return Math.round((votes / totalVotes) * 100)
  }

  // Handle voting
  const handleVote = () => {
    if (!selectedOption) return

    // Update local state
    setPollOptions((prev) =>
      prev.map((option) => (option.id === selectedOption ? { ...option, votes: option.votes + 1 } : option)),
    )
    setTotalVotes((prev) => prev + 1)
    setHasVoted(true)
    setShowResults(true)

    // Call external handler if provided
    if (onVote) {
      onVote(id, selectedOption)
    }

    toast({
      title: "Vote Submitted",
      description: "Thank you for participating in this poll.",
    })
  }

  // Toggle results view
  const toggleResults = () => {
    setShowResults((prev) => !prev)
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        {!showResults ? (
          <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-3">
            {pollOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={`poll-${id}-option-${option.id}`} />
                <Label
                  htmlFor={`poll-${id}-option-${option.id}`}
                  className="text-base font-normal leading-relaxed cursor-pointer"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-4">
            {pollOptions.map((option) => {
              const percentage = getPercentage(option.votes)
              const isSelected = option.id === selectedOption

              return (
                <div key={option.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {isSelected && hasVoted && <CheckCircle className="h-4 w-4 text-green-500" />}
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isSelected && hasVoted && "text-green-600 dark:text-green-400",
                        )}
                      >
                        {option.text}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>

                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        isSelected && hasVoted ? "bg-green-500" : "bg-gradient-to-r from-rose-500 to-orange-500",
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {option.votes} {option.votes === 1 ? "vote" : "votes"}
                  </p>
                </div>
              )
            })}

            <p className="text-sm text-center text-muted-foreground pt-2">Total votes: {totalVotes}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={toggleResults} className="flex items-center">
          <BarChart2 className="h-4 w-4 mr-2" />
          {showResults ? "Hide Results" : "Show Results"}
        </Button>

        {!hasVoted && (
          <Button
            onClick={handleVote}
            disabled={!selectedOption}
            className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
          >
            Submit Vote
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
