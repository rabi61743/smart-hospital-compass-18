
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeaveType {
  value: string;
  label: string;
  available: number;
}

interface LeaveTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  leaveTypes: LeaveType[];
}

const LeaveTypeSelector = ({ value, onChange, leaveTypes }: LeaveTypeSelectorProps) => {
  const selectedLeaveType = leaveTypes.find(type => type.value === value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="leaveType">Leave Type *</Label>
        <Select value={value} onValueChange={onChange}>
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
  );
};

export default LeaveTypeSelector;
