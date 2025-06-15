
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Mail, Key, UserCheck, BookOpen, Star } from "lucide-react";
import { UserFormData } from '../EnhancedAddUserDialog';

interface UserOnboardingFlowProps {
  isOpen: boolean;
  user: UserFormData;
  onComplete: () => void;
}

const UserOnboardingFlow = ({ isOpen, user, onComplete }: UserOnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const onboardingSteps = [
    {
      id: 0,
      title: 'Account Created',
      description: 'User account has been successfully created',
      icon: UserCheck,
      action: 'Account setup complete',
      details: `Welcome ${user.firstName}! Your account has been created with ${user.role} privileges.`
    },
    {
      id: 1,
      title: 'Email Invitation',
      description: 'Sending welcome email with login instructions',
      icon: Mail,
      action: 'Sending email invitation',
      details: `Sending welcome email to ${user.email} with login credentials and getting started guide.`
    },
    {
      id: 2,
      title: 'Credentials Setup',
      description: 'Temporary password generated and security configured',
      icon: Key,
      action: 'Setting up credentials',
      details: 'Temporary password generated. User will be prompted to change password on first login.'
    },
    {
      id: 3,
      title: 'Training Resources',
      description: 'Assigning role-specific training materials',
      icon: BookOpen,
      action: 'Preparing training materials',
      details: `Assigning ${user.role}-specific training modules and documentation.`
    },
    {
      id: 4,
      title: 'Onboarding Complete',
      description: 'User is ready to start using the system',
      icon: Star,
      action: 'Onboarding finished',
      details: 'All setup steps completed. User can now access the system and begin work.'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          if (next <= onboardingSteps.length - 1) {
            setCompletedSteps(completed => [...completed, prev]);
            return next;
          } else {
            clearInterval(timer);
            return prev;
          }
        });
      }, 2000);

      return () => clearInterval(timer);
    }
  }, [isOpen, onboardingSteps.length]);

  const progress = ((completedSteps.length + (currentStep === onboardingSteps.length - 1 ? 1 : 0)) / onboardingSteps.length) * 100;
  const isComplete = currentStep === onboardingSteps.length - 1 && completedSteps.includes(currentStep - 1);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl border-0 shadow-2xl" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-green-600" />
            User Onboarding
          </DialogTitle>
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Setting up {user.firstName} {user.lastName}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        <div className="space-y-4 py-6">
          {onboardingSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = completedSteps.includes(index) || (isComplete && index === onboardingSteps.length - 1);
            const isPending = index > currentStep;

            return (
              <Card key={step.id} className={`transition-all duration-300 ${
                isActive ? 'border-blue-500 bg-blue-50' : 
                isCompleted ? 'border-green-500 bg-green-50' : 
                'border-gray-200'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isActive ? 'bg-blue-500 text-white' :
                      'bg-gray-200 text-gray-400'
                    }`}>
                      {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-700'}`}>
                          {step.title}
                        </h3>
                        {isActive && (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm text-blue-600">{step.action}</span>
                          </div>
                        )}
                        {isCompleted && (
                          <span className="text-sm text-green-600 font-medium">Completed</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                      <p className="text-gray-500 text-xs mt-2">{step.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button 
            onClick={onComplete}
            disabled={!isComplete}
            className={`${isComplete ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400'} transition-colors`}
          >
            {isComplete ? 'Complete Onboarding' : 'Setting up user...'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserOnboardingFlow;
