
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

  // Available positions based on departments
  const positionsByDepartment = {
    'Cardiology': ['Senior Cardiologist', 'Cardiologist', 'Cardiac Nurse', 'Cardiac Technician'],
    'General Medicine': ['Head Nurse', 'Staff Nurse', 'General Physician', 'Medical Assistant'],
    'Emergency': ['Emergency Physician', 'Emergency Nurse', 'Trauma Specialist', 'Emergency Technician'],
    'Laboratory': ['Lab Technician', 'Laboratory Supervisor', 'Pathologist', 'Lab Assistant'],
    'Pharmacy': ['Pharmacist', 'Pharmacy Manager', 'Pharmacy Technician', 'Pharmacy Assistant']
  };

  const availablePositions = employmentData.department ? 
    positionsByDepartment[employmentData.department as keyof typeof positionsByDepartment] || [] : 
    [];

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
              onValueChange={(value) => {
                handleFieldChange('department', value);
                // Reset position when department changes
                handleFieldChange('position', '');
              }}
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
            <Select
              value={employmentData.position}
              onValueChange={(value) => handleFieldChange('position', value)}
              disabled={!isEditing || !employmentData.department}
            >
              <SelectTrigger>
                <SelectValue placeholder={!employmentData.department ? "Select department first" : "Select position"} />
              </SelectTrigger>
              <SelectContent>
                {availablePositions.map(position => (
                  <SelectItem key={position} value={position}>{position}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
