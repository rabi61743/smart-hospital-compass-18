
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import AddEmployeeDialog from "./AddEmployeeDialog";
import EmployeeProfileDialog from "./EmployeeProfileDialog";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeTable from "./EmployeeTable";

const EmployeeManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  const employees = [
    {
      id: 'EMP001',
      name: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      position: 'Senior Cardiologist',
      salary: 120000,
      joinDate: '2020-03-15',
      status: 'Active',
      employeeType: 'Full-time'
    },
    {
      id: 'EMP002',
      name: 'Nurse Mary Wilson',
      department: 'General Medicine',
      position: 'Head Nurse',
      salary: 45000,
      joinDate: '2019-07-22',
      status: 'Active',
      employeeType: 'Full-time'
    },
    {
      id: 'EMP003',
      name: 'Dr. Michael Chen',
      department: 'Emergency',
      position: 'Emergency Physician',
      salary: 95000,
      joinDate: '2021-01-10',
      status: 'Active',
      employeeType: 'Full-time'
    },
    {
      id: 'EMP004',
      name: 'Lab Tech John Smith',
      department: 'Laboratory',
      position: 'Senior Lab Technician',
      salary: 38000,
      joinDate: '2022-05-18',
      status: 'Active',
      employeeType: 'Part-time'
    }
  ];

  const departments = ['all', 'Cardiology', 'General Medicine', 'Emergency', 'Laboratory', 'Pharmacy'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  const handleViewProfile = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setShowProfileDialog(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Employee Management</CardTitle>
              <CardDescription>Manage employee information, salaries, and employment details</CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <EmployeeFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            departments={departments}
          />

          <EmployeeTable
            employees={filteredEmployees}
            onViewProfile={handleViewProfile}
          />
        </CardContent>
      </Card>

      <AddEmployeeDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog} 
      />

      <EmployeeProfileDialog
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        employeeId={selectedEmployeeId}
      />
    </div>
  );
};

export default EmployeeManagementTab;
