
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";
import { Employee } from '@/types/salary';

interface EmployeeSelectorProps {
  selectedEmployee: Employee | null;
  onEmployeeSelect: (employee: Employee) => void;
}

const EmployeeSelector = ({ selectedEmployee, onEmployeeSelect }: EmployeeSelectorProps) => {
  // Mock employee data - in real app this would come from API
  const employees: Employee[] = [
    {
      id: 'EMP001',
      name: 'Dr. Sarah Johnson',
      position: 'Senior Cardiologist',
      department: 'Cardiology',
      basicSalary: 120000,
      hourlyRate: 625
    },
    {
      id: 'EMP002',
      name: 'Nurse Mary Wilson',
      position: 'Head Nurse',
      department: 'General Medicine',
      basicSalary: 45000,
      hourlyRate: 234
    },
    {
      id: 'EMP003',
      name: 'Dr. Michael Chen',
      position: 'Emergency Physician',
      department: 'Emergency',
      basicSalary: 95000,
      hourlyRate: 495
    },
    {
      id: 'EMP004',
      name: 'John Smith',
      position: 'Lab Technician',
      department: 'Laboratory',
      basicSalary: 38000,
      hourlyRate: 198
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Select Employee
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select 
          value={selectedEmployee?.id || ''} 
          onValueChange={(value) => {
            const employee = employees.find(emp => emp.id === value);
            if (employee) onEmployeeSelect(employee);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose an employee" />
          </SelectTrigger>
          <SelectContent>
            {employees.map((employee) => (
              <SelectItem key={employee.id} value={employee.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{employee.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {employee.position} - {employee.department}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default EmployeeSelector;
