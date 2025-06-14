
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import LeaveTypeSelector from './LeaveTypeSelector';
import LeaveDateRangeSelector from './LeaveDateRangeSelector';
import LeaveRequestSummary from './LeaveRequestSummary';

interface LeaveRequestFormProps {
  onClose: () => void;
}

const LeaveRequestForm = ({ onClose }: LeaveRequestFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const leaveTypes = [
    { value: 'annual', label: 'Annual Leave', available: 25 },
    { value: 'sick', label: 'Sick Leave', available: 12 },
    { value: 'personal', label: 'Personal Leave', available: 8 },
    { value: 'maternity', label: 'Maternity Leave', available: 180 },
    { value: 'emergency', label: 'Emergency Leave', available: 5 }
  ];

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const days = calculateDays();
    const selectedLeaveType = leaveTypes.find(type => type.value === formData.leaveType);
    
    if (selectedLeaveType && days > selectedLeaveType.available) {
      toast({
        title: "Insufficient Balance",
        description: `You only have ${selectedLeaveType.available} days available for ${selectedLeaveType.label}`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Leave Request Submitted",
      description: `Your ${selectedLeaveType?.label} request for ${days} days has been submitted for approval`,
    });

    // Reset form
    setFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      emergencyContact: '',
      emergencyPhone: ''
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedLeaveType = leaveTypes.find(type => type.value === formData.leaveType);
  const requestedDays = calculateDays();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LeaveTypeSelector
        value={formData.leaveType}
        onChange={(value) => handleInputChange('leaveType', value)}
        leaveTypes={leaveTypes}
      />

      <LeaveDateRangeSelector
        startDate={formData.startDate}
        endDate={formData.endDate}
        onStartDateChange={(date) => handleInputChange('startDate', date)}
        onEndDateChange={(date) => handleInputChange('endDate', date)}
      />

      <LeaveRequestSummary
        requestedDays={requestedDays}
        selectedLeaveType={selectedLeaveType}
      />

      <div>
        <Label htmlFor="reason">Reason for Leave *</Label>
        <Textarea
          id="reason"
          value={formData.reason}
          onChange={(e) => handleInputChange('reason', e.target.value)}
          placeholder="Please provide a brief reason for your leave request..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            placeholder="Contact person name"
          />
        </div>

        <div>
          <Label htmlFor="emergencyPhone">Emergency Phone</Label>
          <Input
            id="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
            placeholder="Contact phone number"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          Submit Request
        </Button>
      </div>
    </form>
  );
};

export default LeaveRequestForm;
