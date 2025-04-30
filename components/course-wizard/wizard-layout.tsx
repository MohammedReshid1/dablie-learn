'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CourseBasics } from './course-basics';
import { CourseCurriculum } from './course-curriculum';
import { CourseMedia } from './course-media';
import CourseAssessments from './course-assessments';
import CourseSettings from './course-settings';
import { InstructorShell } from '@/components/instructor-shell';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface WizardLayoutProps {
  initialStep?: number;
  totalSteps?: number;
}

const steps = [
  { id: 1, name: 'Basics', description: 'Title, category, level', component: CourseBasics },
  { id: 2, name: 'Curriculum', description: 'Sections and lectures', component: CourseCurriculum },
  { id: 3, name: 'Media', description: 'Course image and promo video', component: CourseMedia },
  { id: 4, name: 'Assessments', description: 'Quizzes and assignments', component: CourseAssessments },
  { id: 5, name: 'Settings', description: 'Pricing and publication', component: CourseSettings },
];

export function WizardLayout({ initialStep = 1, totalSteps = 5 }: WizardLayoutProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState({}); // State to hold wizard data

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component;

  return (
    <InstructorShell>
      <div className="container max-w-5xl py-8">
        {/* Stepper */}
        <div className="mb-12">
          <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className={`relative flex-1 ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                  {step.id < currentStep ? (
                    // Completed Step
                    <>
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="h-0.5 w-full bg-gradient-to-r from-rose-500 to-orange-500" />
                      </div>
                      <button
                        onClick={() => setCurrentStep(step.id)}
                        className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                        aria-label={`Go to step ${step.name}`}
                      >
                        <Check className="h-5 w-5 text-white" aria-hidden="true" />
                      </button>
                    </>
                  ) : step.id === currentStep ? (
                    // Current Step
                    <>
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
                      </div>
                      <div
                        className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-rose-500 bg-background"
                        aria-current="step"
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-500" aria-hidden="true" />
                      </div>
                    </>
                  ) : (
                    // Upcoming Step
                    <>
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
                      </div>
                      <button
                        onClick={() => setCurrentStep(step.id)}
                        className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-background hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
                         aria-label={`Go to step ${step.name}`}
                     >
                        <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300 dark:group-hover:bg-gray-600" aria-hidden="true" />
                      </button>
                    </>
                  )}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                    <p className={`text-xs font-medium ${step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>{step.name}</p>
                     <p className={`text-xs ${step.id <= currentStep ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>{step.description}</p>
                 </div>
                </li>
              ))}
            </ol>
          </nav>
          {/* <Progress value={(currentStep / totalSteps) * 100} className="mt-4 h-2" /> */}
        </div>

        {/* Step Content */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Step {currentStep}: {steps.find(s => s.id === currentStep)?.name}</CardTitle>
            <CardDescription>{steps.find(s => s.id === currentStep)?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {CurrentStepComponent && <CurrentStepComponent formData={formData} updateFormData={updateFormData} />}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6 mt-6 border-border">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext} disabled={currentStep === totalSteps}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </InstructorShell>
  );
} 