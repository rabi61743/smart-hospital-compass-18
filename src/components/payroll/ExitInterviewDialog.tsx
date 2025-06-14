
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Star, FileText } from "lucide-react";

interface ExitInterviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string;
}

const ExitInterviewDialog = ({ open, onOpenChange, employeeId }: ExitInterviewDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    employeeName: 'Lab Tech Amit Singh',
    department: 'Laboratory',
    position: 'Lab Technician',
    lastWorkingDay: '2024-02-15',
    reasonForLeaving: '',
    jobSatisfaction: '',
    workEnvironment: '',
    managementSupport: '',
    careerDevelopment: '',
    compensation: '',
    workLifeBalance: '',
    wouldRecommend: '',
    positiveAspects: '',
    improvementSuggestions: '',
    additionalComments: '',
    interviewDate: '',
    conductedBy: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting exit interview:', formData);
    
    toast({
      title: "Success",
      description: "Exit interview completed and saved successfully",
    });

    onOpenChange(false);
  };

  const ratingQuestions = [
    { key: 'jobSatisfaction', label: 'Overall Job Satisfaction' },
    { key: 'workEnvironment', label: 'Work Environment' },
    { key: 'managementSupport', label: 'Management Support' },
    { key: 'careerDevelopment', label: 'Career Development Opportunities' },
    { key: 'compensation', label: 'Compensation & Benefits' },
    { key: 'workLifeBalance', label: 'Work-Life Balance' }
  ];

  const RatingComponent = ({ question, value, onChange }: { question: string, value: string, onChange: (value: string) => void }) => (
    <div className="space-y-2">
      <Label>{question}</Label>
      <RadioGroup value={value} onValueChange={onChange} className="flex space-x-4">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div key={rating} className="flex items-center space-x-2">
            <RadioGroupItem value={rating.toString()} id={`${question}-${rating}`} />
            <Label htmlFor={`${question}-${rating}`} className="cursor-pointer">
              {rating}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <p className="text-sm text-muted-foreground">1 = Very Poor, 5 = Excellent</p>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Exit Interview
          </DialogTitle>
          <DialogDescription>
            Conduct exit interview to gather valuable feedback
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Employee Name</Label>
                  <Input value={formData.employeeName} disabled />
                </div>
                <div>
                  <Label>Department</Label>
                  <Input value={formData.department} disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Position</Label>
                  <Input value={formData.position} disabled />
                </div>
                <div>
                  <Label>Last Working Day</Label>
                  <Input value={formData.lastWorkingDay} disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interviewDate">Interview Date *</Label>
                  <Input
                    id="interviewDate"
                    type="date"
                    value={formData.interviewDate}
                    onChange={(e) => handleInputChange('interviewDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="conductedBy">Conducted By *</Label>
                  <Input
                    id="conductedBy"
                    value={formData.conductedBy}
                    onChange={(e) => handleInputChange('conductedBy', e.target.value)}
                    placeholder="Enter interviewer name"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reason for Leaving</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="reasonForLeaving">Primary reason for leaving *</Label>
                <Select value={formData.reasonForLeaving} onValueChange={(value) => handleInputChange('reasonForLeaving', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Better Opportunity">Better Opportunity</SelectItem>
                    <SelectItem value="Higher Compensation">Higher Compensation</SelectItem>
                    <SelectItem value="Career Growth">Career Growth</SelectItem>
                    <SelectItem value="Work-Life Balance">Work-Life Balance</SelectItem>
                    <SelectItem value="Relocation">Relocation</SelectItem>
                    <SelectItem value="Personal Reasons">Personal Reasons</SelectItem>
                    <SelectItem value="Job Dissatisfaction">Job Dissatisfaction</SelectItem>
                    <SelectItem value="Management Issues">Management Issues</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Experience Ratings
              </CardTitle>
              <CardDescription>Rate your experience on a scale of 1-5</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {ratingQuestions.map((question) => (
                <RatingComponent
                  key={question.key}
                  question={question.label}
                  value={formData[question.key as keyof typeof formData] as string}
                  onChange={(value) => handleInputChange(question.key, value)}
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="wouldRecommend">Would you recommend this organization as a good place to work?</Label>
                <RadioGroup 
                  value={formData.wouldRecommend} 
                  onValueChange={(value) => handleInputChange('wouldRecommend', value)}
                  className="flex space-x-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="recommend-yes" />
                    <Label htmlFor="recommend-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="recommend-no" />
                    <Label htmlFor="recommend-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="recommend-maybe" />
                    <Label htmlFor="recommend-maybe">Maybe</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="positiveAspects">What did you like most about working here?</Label>
                <Textarea
                  id="positiveAspects"
                  value={formData.positiveAspects}
                  onChange={(e) => handleInputChange('positiveAspects', e.target.value)}
                  placeholder="Share positive aspects of your experience"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="improvementSuggestions">What could the organization improve?</Label>
                <Textarea
                  id="improvementSuggestions"
                  value={formData.improvementSuggestions}
                  onChange={(e) => handleInputChange('improvementSuggestions', e.target.value)}
                  placeholder="Suggest areas for improvement"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="additionalComments">Any additional comments or feedback?</Label>
                <Textarea
                  id="additionalComments"
                  value={formData.additionalComments}
                  onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                  placeholder="Share any other thoughts or feedback"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <FileText className="h-4 w-4 mr-2" />
              Save Interview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitInterviewDialog;
