
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft, ArrowRight, User, Shield, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BasicInfoStep from './user-creation/BasicInfoStep';
import RolePermissionsStep from './user-creation/RolePermissionsStep';
import LocationPreferencesStep from './user-creation/LocationPreferencesStep';
import ReviewConfirmStep from './user-creation/ReviewConfirmStep';
import UserOnboardingFlow from './user-creation/UserOnboardingFlow';

interface EnhancedAddUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UserFormData {
  // Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Role & Permissions
  role: string;
  department: string;
  jobTitle: string;
  reportingManager: string;
  permissions: string[];
  
  // Location & Preferences
  primaryLocation: string;
  workSchedule: string;
  preferredLanguage: string;
  notificationPreferences: string[];
  
  // Additional
  emergencyContact: string;
  emergencyPhone: string;
}

const EnhancedAddUserDialog = ({ isOpen, onClose }: EnhancedAddUserDialogProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [createdUser, setCreatedUser] = useState<UserFormData | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    role: '',
    department: '',
    jobTitle: '',
    reportingManager: '',
    permissions: [],
    primaryLocation: '',
    workSchedule: '',
    preferredLanguage: 'english',
    notificationPreferences: [],
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const steps = [
    { id: 1, title: 'Basic Information', icon: User, description: 'Personal details and contact info' },
    { id: 2, title: 'Role & Permissions', icon: Shield, description: 'Job role and access permissions' },
    { id: 3, title: 'Location & Preferences', icon: MapPin, description: 'Work location and preferences' },
    { id: 4, title: 'Review & Confirm', icon: CheckCircle, description: 'Review all information' }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<UserFormData> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        break;
      case 2:
        if (!formData.role) newErrors.role = 'Role is required';
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
        break;
      case 3:
        if (!formData.primaryLocation) newErrors.primaryLocation = 'Primary location is required';
        if (!formData.workSchedule) newErrors.workSchedule = 'Work schedule is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setCreatedUser(formData);
        setShowOnboarding(true);
        
        toast({
          title: "User Created Successfully!",
          description: `${formData.firstName} ${formData.lastName} has been added to the system.`,
        });
      } catch (error) {
        toast({
          title: "Error Creating User",
          description: "Please try again or contact support.",
          variant: "destructive",
        });
      }
    }
  };

  const resetDialog = () => {
    setCurrentStep(1);
    setFormData({
      firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
      role: '', department: '', jobTitle: '', reportingManager: '', permissions: [],
      primaryLocation: '', workSchedule: '', preferredLanguage: 'english', notificationPreferences: [],
      emergencyContact: '', emergencyPhone: ''
    });
    setErrors({});
    setShowOnboarding(false);
    setCreatedUser(null);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep formData={formData} setFormData={setFormData} errors={errors} />;
      case 2:
        return <RolePermissionsStep formData={formData} setFormData={setFormData} errors={errors} />;
      case 3:
        return <LocationPreferencesStep formData={formData} setFormData={setFormData} errors={errors} />;
      case 4:
        return <ReviewConfirmStep formData={formData} />;
      default:
        return null;
    }
  };

  if (showOnboarding && createdUser) {
    return (
      <UserOnboardingFlow
        isOpen={isOpen}
        user={createdUser}
        onComplete={resetDialog}
      />
    );
  }

  const progress = (currentStep / steps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={resetDialog}>
      <DialogContent className="max-w-2xl border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <User className="h-6 w-6 text-blue-600" />
            Create New User
          </DialogTitle>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mt-6">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isCompleted ? 'bg-green-500 border-green-500 text-white' :
                    isActive ? 'bg-blue-500 border-blue-500 text-white' :
                    'bg-gray-100 border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogHeader>

        {/* Step Content */}
        <div className="py-6">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-3">
            <Button variant="outline" onClick={resetDialog}>
              Cancel
            </Button>
            
            {currentStep < steps.length ? (
              <Button onClick={handleNext} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Create User
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedAddUserDialog;
