
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, CheckCircle, Clock, FileText } from "lucide-react";

interface NewHireWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewHireWorkflowDialog = ({ open, onOpenChange }: NewHireWorkflowDialogProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    position: '',
    startDate: '',
    reportingManager: '',
    workLocation: '',
    employmentType: '',
    salary: '',
    checklist: {
      documentCollection: false,
      systemAccounts: false,
      workstationSetup: false,
      orientationScheduled: false,
      mentorAssigned: false,
      trainingPlan: false,
      accessCards: false,
      uniformIssued: false
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleChecklistChange = (item: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      checklist: { ...prev.checklist, [item]: checked }
    }));
  };

  const handleSubmit = () => {
    console.log('Creating new hire workflow:', formData);
    
    toast({
      title: "Success",
      description: "New hire workflow initiated successfully",
    });

    onOpenChange(false);
    setCurrentStep(1);
    setFormData({
      employeeName: '',
      department: '',
      position: '',
      startDate: '',
      reportingManager: '',
      workLocation: '',
      employmentType: '',
      salary: '',
      checklist: {
        documentCollection: false,
        systemAccounts: false,
        workstationSetup: false,
        orientationScheduled: false,
        mentorAssigned: false,
        trainingPlan: false,
        accessCards: false,
        uniformIssued: false
      }
    });
  };

  const checklistItems = [
    { key: 'documentCollection', label: 'Document Collection (Aadhar, PAN, Certificates)', icon: FileText },
    { key: 'systemAccounts', label: 'System Accounts Creation (Email, HRIS, etc.)', icon: UserPlus },
    { key: 'workstationSetup', label: 'Workstation & Equipment Setup', icon: Clock },
    { key: 'orientationScheduled', label: 'Orientation Session Scheduled', icon: CheckCircle },
    { key: 'mentorAssigned', label: 'Mentor/Buddy Assigned', icon: UserPlus },
    { key: 'trainingPlan', label: 'Training Plan Created', icon: FileText },
    { key: 'accessCards', label: 'ID Card & Access Cards Issued', icon: CheckCircle },
    { key: 'uniformIssued', label: 'Uniform/Scrubs Issued (if applicable)', icon: Clock }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            New Hire Onboarding Workflow
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive onboarding plan for new employees
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Navigation */}
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span>Employee Details</span>
            </div>
            <div className={`h-px flex-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span>Onboarding Checklist</span>
            </div>
          </div>

          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Employee Information</CardTitle>
                <CardDescription>Enter the new hire's basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employeeName">Employee Name *</Label>
                    <Input
                      id="employeeName"
                      value={formData.employeeName}
                      onChange={(e) => handleInputChange('employeeName', e.target.value)}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="General Medicine">General Medicine</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                        <SelectItem value="Laboratory">Laboratory</SelectItem>
                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="Administration">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      placeholder="Enter position/title"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reportingManager">Reporting Manager</Label>
                    <Input
                      id="reportingManager"
                      value={formData.reportingManager}
                      onChange={(e) => handleInputChange('reportingManager', e.target.value)}
                      placeholder="Enter manager name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workLocation">Work Location</Label>
                    <Input
                      id="workLocation"
                      value={formData.workLocation}
                      onChange={(e) => handleInputChange('workLocation', e.target.value)}
                      placeholder="Enter work location"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Intern">Intern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="salary">Monthly Salary (₹)</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={formData.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      placeholder="Enter monthly salary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Checklist</CardTitle>
                <CardDescription>Define the onboarding tasks and requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {checklistItems.map((item) => (
                    <div key={item.key} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={item.key}
                        checked={formData.checklist[item.key as keyof typeof formData.checklist]}
                        onCheckedChange={(checked) => handleChecklistChange(item.key, checked as boolean)}
                      />
                      <item.icon className="h-5 w-5 text-blue-600" />
                      <Label htmlFor={item.key} className="flex-1 cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  Previous
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              {currentStep < 2 ? (
                <Button onClick={() => setCurrentStep(currentStep + 1)}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Create Workflow
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewHireWorkflowDialog;
