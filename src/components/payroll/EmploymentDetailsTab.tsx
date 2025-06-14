
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmploymentDetails {
  employeeId: string;
  department: string;
  position: string;
  joiningDate: string;
  employeeType: string;
  workLocation: string;
  reportingManager: string;
  salary: number;
}

interface EmploymentDetailsTabProps {
  employmentData: EmploymentDetails;
  onEmploymentDataChange: (data: EmploymentDetails) => void;
  isEditing: boolean;
}

const EmploymentDetailsTab = ({ employmentData, onEmploymentDataChange, isEditing }: EmploymentDetailsTabProps) => {
  const handleFieldChange = (field: keyof EmploymentDetails, value: string | number) => {
    onEmploymentDataChange({
      ...employmentData,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment Information</CardTitle>
        <CardDescription>Job details and organizational information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Employee ID</Label>
            <Input value={employmentData.employeeId} disabled />
          </div>
          <div>
            <Label>Joining Date</Label>
            <Input value={employmentData.joiningDate} disabled />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="department">Department</Label>
            <Select
              value={employmentData.department}
              onValueChange={(value) => handleFieldChange('department', value)}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cardiology">Cardiology</SelectItem>
                <SelectItem value="General Medicine">General Medicine</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
                <SelectItem value="Laboratory">Laboratory</SelectItem>
                <SelectItem value="Pharmacy">Pharmacy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={employmentData.position}
              onChange={(e) => handleFieldChange('position', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="employeeType">Employment Type</Label>
            <Select
              value={employmentData.employeeType}
              onValueChange={(value) => handleFieldChange('employeeType', value)}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue />
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
            <Label htmlFor="workLocation">Work Location</Label>
            <Input
              id="workLocation"
              value={employmentData.workLocation}
              onChange={(e) => handleFieldChange('workLocation', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="reportingManager">Reporting Manager</Label>
          <Input
            id="reportingManager"
            value={employmentData.reportingManager}
            onChange={(e) => handleFieldChange('reportingManager', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmploymentDetailsTab;
