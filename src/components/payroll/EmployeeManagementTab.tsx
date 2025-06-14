import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, UserPlus, Eye } from "lucide-react";
import AddEmployeeDialog from "./AddEmployeeDialog";
import EmployeeProfileDialog from "./EmployeeProfileDialog";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          <div className="flex gap-4 items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.slice(1).map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Details</TableHead>
                <TableHead>Department & Position</TableHead>
                <TableHead>Employment Info</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">{employee.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{employee.department}</p>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">Joined: {new Date(employee.joinDate).toLocaleDateString()}</p>
                      <Badge variant="outline" className="mt-1">{employee.employeeType}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">₹{employee.salary.toLocaleString()}/month</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewProfile(employee.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
