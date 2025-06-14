
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Save } from "lucide-react";

interface NewLeaveRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewLeaveRequestDialog = ({ open, onOpenChange }: NewLeaveRequestDialogProps) => {
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
    
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedLeaveType = leaveTypes.find(type => type.value === formData.leaveType);
  const requestedDays = calculateDays();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            New Leave Request
          </DialogTitle>
          <DialogDescription>
            Submit a new leave request for approval
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="leaveType">Leave Type *</Label>
              <Select value={formData.leaveType} onValueChange={(value) => handleInputChange('leaveType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  {leaveTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label} ({type.available} days available)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Leave Balance</Label>
              <div className="h-10 px-3 py-2 border rounded-md bg-muted flex items-center">
                {selectedLeaveType ? `${selectedLeaveType.available} days` : 'Select leave type'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                required
                min={formData.startDate}
              />
            </div>
          </div>

          {requestedDays > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Requested Days:</span>
                <span className="text-sm font-bold text-blue-600">{requestedDays} days</span>
              </div>
              {selectedLeaveType && (
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-muted-foreground">Remaining Balance:</span>
                  <span className="text-sm text-muted-foreground">
                    {selectedLeaveType.available - requestedDays} days
                  </span>
                </div>
              )}
            </div>
          )}

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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLeaveRequestDialog;
