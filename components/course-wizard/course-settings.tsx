"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, ArrowUpDown, DollarSign } from "lucide-react"

// Define prop types
interface CourseSettingsProps {
  data: {
    requirements?: string[];
    targetAudience?: string[];
    learningOutcomes?: string[];
    price?: string | number; // Allow string for input handling
    isPublished?: boolean;
  };
  updateData: (update: Partial<CourseSettingsProps['data']>) => void;
}

export default function CourseSettings({ data, updateData }: CourseSettingsProps) {
  const [requirements, setRequirements] = useState(data.requirements || [])
  const [newRequirement, setNewRequirement] = useState("")

  const [targetAudience, setTargetAudience] = useState(data.targetAudience || [])
  const [newTargetAudience, setNewTargetAudience] = useState("")

  const [learningOutcomes, setLearningOutcomes] = useState(data.learningOutcomes || [])
  const [newLearningOutcome, setNewLearningOutcome] = useState("")

  const [price, setPrice] = useState(data.price || "")
  const [isPublished, setIsPublished] = useState(data.isPublished || false)

  const addRequirement = () => {
    if (!newRequirement.trim()) return

    const updatedRequirements = [...requirements, newRequirement]
    setRequirements(updatedRequirements)
    setNewRequirement("")
    updateData({ requirements: updatedRequirements })
  }

  const removeRequirement = (index: number) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index)
    setRequirements(updatedRequirements)
    updateData({ requirements: updatedRequirements })
  }

  const addTargetAudience = () => {
    if (!newTargetAudience.trim()) return

    const updatedTargetAudience = [...targetAudience, newTargetAudience]
    setTargetAudience(updatedTargetAudience)
    setNewTargetAudience("")
    updateData({ targetAudience: updatedTargetAudience })
  }

  const removeTargetAudience = (index: number) => {
    const updatedTargetAudience = targetAudience.filter((_, i) => i !== index)
    setTargetAudience(updatedTargetAudience)
    updateData({ targetAudience: updatedTargetAudience })
  }

  const addLearningOutcome = () => {
    if (!newLearningOutcome.trim()) return

    const updatedLearningOutcomes = [...learningOutcomes, newLearningOutcome]
    setLearningOutcomes(updatedLearningOutcomes)
    setNewLearningOutcome("")
    updateData({ learningOutcomes: updatedLearningOutcomes })
  }

  const removeLearningOutcome = (index: number) => {
    const updatedLearningOutcomes = learningOutcomes.filter((_, i) => i !== index)
    setLearningOutcomes(updatedLearningOutcomes)
    updateData({ learningOutcomes: updatedLearningOutcomes })
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow only numbers and decimal point
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setPrice(value)
      updateData({ price: value })
    }
  }

  const handlePublishToggle = (checked: boolean) => {
    setIsPublished(checked)
    updateData({ isPublished: checked })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Course Settings</h2>
        <p className="text-muted-foreground">Configure additional settings and details for your course.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>Set the price for your course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Course Price ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="text"
                    inputMode="decimal"
                    placeholder="49.99"
                    value={price}
                    onChange={handlePriceChange}
                    className="pl-9"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Set a competitive price based on the course content, length, and value.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Publication Status</Label>
                  <Switch id="published" checked={isPublished} onCheckedChange={handlePublishToggle} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Toggle to control whether your course is visible to students.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prerequisites</CardTitle>
            <CardDescription>What should students know before taking your course?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Basic HTML and CSS knowledge"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addRequirement()}
                />
                <Button variant="outline" size="icon" onClick={addRequirement}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {requirements.length > 0 ? (
                <ul className="space-y-2">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center justify-between gap-2 border-b pb-2">
                      <span className="text-sm">{requirement}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeRequirement(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-2">No prerequisites added yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target Audience</CardTitle>
            <CardDescription>Who is this course designed for?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Web developers looking to learn React"
                  value={newTargetAudience}
                  onChange={(e) => setNewTargetAudience(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTargetAudience()}
                />
                <Button variant="outline" size="icon" onClick={addTargetAudience}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {targetAudience.length > 0 ? (
                <ul className="space-y-2">
                  {targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-center justify-between gap-2 border-b pb-2">
                      <span className="text-sm">{audience}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeTargetAudience(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-2">No target audience defined yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Outcomes</CardTitle>
            <CardDescription>What will students achieve after completing your course?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Build responsive websites with React"
                  value={newLearningOutcome}
                  onChange={(e) => setNewLearningOutcome(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addLearningOutcome()}
                />
                <Button variant="outline" size="icon" onClick={addLearningOutcome}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {learningOutcomes.length > 0 ? (
                <ul className="space-y-2">
                  {learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-center justify-between gap-2 border-b pb-2">
                      <span className="text-sm">{outcome}</span>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500"
                          onClick={() => {
                            if (index > 0) {
                              const newOutcomes = [...learningOutcomes]
                              const temp = newOutcomes[index]
                              newOutcomes[index] = newOutcomes[index - 1]
                              newOutcomes[index - 1] = temp
                              setLearningOutcomes(newOutcomes)
                              updateData({ learningOutcomes: newOutcomes })
                            }
                          }}
                          disabled={index === 0}
                        >
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeLearningOutcome(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-2">No learning outcomes added yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
