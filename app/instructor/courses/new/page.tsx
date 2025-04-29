import { WizardLayout } from "@/components/course-wizard/wizard-layout";

export default function NewCoursePage() {
  // For now, just render the layout. State management for steps will be added.
  return <WizardLayout initialStep={1} totalSteps={5} />;
} 