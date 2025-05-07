import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";
import {
  PenLineIcon, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeftIcon,
  SaveIcon, 
  EyeIcon, 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
  isSaving: boolean
}

const Footer = ({ currentStep, setCurrentStep, showSmResumePreview, setShowSmResumePreview, isSaving }: FooterProps) => {
  const currentStepIndex = steps.findIndex(step => step.key === currentStep);
  const totalSteps = steps.length;
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;
  
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  return (
    <footer className="w-full border-t relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="fixed bottom-20 right-4 md:hidden z-10">
        <Button 
          variant="default" 
          size="icon" 
          onClick={() => setShowSmResumePreview(!showSmResumePreview)} 
          className={cn(
            "h-12 w-12 rounded-full shadow-lg transition-all duration-300",
            showSmResumePreview ? "bg-primary/90 hover:bg-primary/80" : "bg-primary"
          )}
          title={showSmResumePreview ? "Show editor" : "Show preview"}
        >
          {showSmResumePreview ? <PenLineIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="hidden md:flex items-center space-x-1.5">
            {steps.map((step, idx) => (
              <div 
                key={step.key}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  currentStepIndex >= idx 
                    ? "bg-primary" 
                    : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>
          
          <div className="md:hidden text-sm font-medium">
            Step {currentStepIndex + 1} of {totalSteps}
          </div>
          
          <div 
            className={cn(
              "absolute left-1/2 -translate-x-1/2 top-5 transition-all duration-500 flex items-center gap-1.5 bg-black/80 text-white px-3 py-1.5 rounded-full text-xs font-medium",
              isSaving ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            <SaveIcon className="h-3 w-3 animate-pulse" />
            <span>Saving...</span>
          </div>
          
          <div className="flex items-center gap-6 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSmResumePreview(!showSmResumePreview)}
              className="hidden md:flex items-center text-xs gap-1.5 hover:bg-primary/5"
            >
              {showSmResumePreview ? (
                <>
                  <PenLineIcon className="h-3.5 w-3.5" />
                  <span>Editor View</span>
                </>
              ) : (
                <>
                  <EyeIcon className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </>
              )}
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                size="sm"
                asChild
              >
                <Link href="/resumes">
                  <ArrowLeftIcon className="h-4 w-4 mr-1" />
                  Back to resumes
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <Button
            variant="outline"
            size="lg"
            onClick={previousStep ? () => setCurrentStep(previousStep) : undefined}
            disabled={!previousStep}
            className={cn(
              "transition-all",
              !previousStep && "opacity-50 cursor-not-allowed"
            )}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="hidden md:block text-sm font-medium text-muted-foreground">
            {currentStepIndex + 1} of {totalSteps}
          </div>
          
          <Button
            variant={nextStep ? "default" : "outline"} 
            size="lg"
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
            className={cn(
              "transition-all",
              !nextStep && "opacity-50 cursor-not-allowed",
              nextStep && "bg-gradient-to-r from-primary to-primary/90"
            )}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;