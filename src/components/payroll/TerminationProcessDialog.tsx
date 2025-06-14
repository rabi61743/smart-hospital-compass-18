
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
import { UserMinus, AlertTriangle, FileText, Key } from "lucide-react";

interface TerminationProcessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string;
}

const TerminationProcessDialog = ({ open, onOpenChange, employeeId }: TerminationProcessDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    department: '',
    position: '',
    terminationType: '',
    terminationDate: '',
    lastWorkingDay: '',
    reason: '',
    noticePeriod: '',
    finalSettlement: '',
    checklist: {
      accessRevoked: false,
      equipmentReturned: false,
      clearanceObtained: false,
      knowledgeTransfer: false,
      finalPayment: false,
      experienceLetter: false,
      exitInterview: false,
      dataBackup: false
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
    console.log('Creating termination process:', formData);
    
    toast({
      title: "Success",
      description: "Termination process initiated successfully",
    });

    onOpenChange(false);
  };

  const checklistItems = [
    { key: 'accessRevoked', label: 'System Access Revoked (Email, HRIS, etc.)', icon: Key },
    { key: 'equipmentReturned', label: 'Equipment & Assets Returned', icon: FileText },
    { key: 'clearanceObtained', label: 'Department Clearances Obtained', icon: FileText },
    { key: 'knowledgeTransfer', label: 'Knowledge Transfer Completed', icon: UserMinus },
    { key: 'finalPayment', label: 'Final Settlement Processed', icon: FileText },
    { key: 'experienceLetter', label: 'Experience/Relieving Letter Issued', icon: FileText },
    { key: 'exitInterview', label: 'Exit Interview Conducted', icon: UserMinus },
    { key: 'dataBackup', label: 'Important Data Backed Up', icon: FileText }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserMinus className="h-5 w-5" />
            Employee Termination Process
          </DialogTitle>
          <DialogDescription>
            Initiate and manage employee offboarding process
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Termination Details
              </CardTitle>
              <CardDescription>Enter termination information and timeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeName">Employee Name *</Label>
                  <Input
                    id="employeeName"
                    value={formData.employeeName}
                    onChange={(e) => handleInputChange('employeeName', e.target.value)}
                    placeholder="Enter employee name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="employeeId">Employee ID *</Label>
                  <Input
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    placeholder="Enter employee ID"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
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
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="Enter position"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="terminationType">Termination Type *</Label>
                  <Select value={formData.terminationType} onValueChange={(value) => handleInputChange('terminationType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Resignation">Resignation</SelectItem>
                      <SelectItem value="Termination">Termination</SelectItem>
                      <SelectItem value="Retirement">Retirement</SelectItem>
                      <SelectItem value="Contract End">Contract End</SelectItem>
                      <SelectItem value="Mutual Consent">Mutual Consent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="noticePeriod">Notice Period (Days)</Label>
                  <Input
                    id="noticePeriod"
                    type="number"
                    value={formData.noticePeriod}
                    onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                    placeholder="Enter notice period"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="terminationDate">Termination Date *</Label>
                  <Input
                    id="terminationDate"
                    type="date"
                    value={formData.terminationDate}
                    onChange={(e) => handleInputChange('terminationDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastWorkingDay">Last Working Day *</Label>
                  <Input
                    id="lastWorkingDay"
                    type="date"
                    value={formData.lastWorkingDay}
                    onChange={(e) => handleInputChange('lastWorkingDay', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Reason for Termination</Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  placeholder="Enter reason for termination"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="finalSettlement">Final Settlement Amount (₹)</Label>
                <Input
                  id="finalSettlement"
                  type="number"
                  value={formData.finalSettlement}
                  onChange={(e) => handleInputChange('finalSettlement', e.target.value)}
                  placeholder="Enter final settlement amount"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offboarding Checklist</CardTitle>
              <CardDescription>Track completion of offboarding tasks</CardDescription>
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
                    <item.icon className="h-5 w-5 text-red-600" />
                    <Label htmlFor={item.key} className="flex-1 cursor-pointer">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-red-600 hover:bg-red-700">
              Initiate Termination Process
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TerminationProcessDialog;
