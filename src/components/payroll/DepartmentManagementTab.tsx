
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DepartmentList from "./DepartmentList";
import AddDepartmentDialog from "./AddDepartmentDialog";

interface Department {
  id: string;
  name: string;
  description: string;
  costCenter: string;
  manager: string;
  employeeCount: number;
  budget: number;
  status: 'Active' | 'Inactive';
}

const DepartmentManagementTab = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 'DEPT001',
      name: 'Cardiology',
      description: 'Heart and cardiovascular care department',
      costCenter: 'CC-CARD-001',
      manager: 'Dr. Rajesh Kumar',
      employeeCount: 25,
      budget: 500000,
      status: 'Active'
    },
    {
      id: 'DEPT002',
      name: 'General Medicine',
      description: 'General medical care and consultation',
      costCenter: 'CC-GMED-002',
      manager: 'Dr. Priya Sharma',
      employeeCount: 18,
      budget: 350000,
      status: 'Active'
    },
    {
      id: 'DEPT003',
      name: 'Emergency',
      description: 'Emergency and critical care services',
      costCenter: 'CC-EMER-003',
      manager: 'Dr. Michael Chen',
      employeeCount: 30,
      budget: 600000,
      status: 'Active'
    },
    {
      id: 'DEPT004',
      name: 'Laboratory',
      description: 'Medical testing and diagnostics',
      costCenter: 'CC-LAB-004',
      manager: 'Dr. Sarah Johnson',
      employeeCount: 12,
      budget: 250000,
      status: 'Active'
    },
    {
      id: 'DEPT005',
      name: 'Pharmacy',
      description: 'Medication dispensing and consultation',
      costCenter: 'CC-PHAR-005',
      manager: 'John Smith',
      employeeCount: 8,
      budget: 180000,
      status: 'Active'
    }
  ]);

  const handleAddDepartment = (newDepartment: Omit<Department, 'id'>) => {
    const department: Department = {
      ...newDepartment,
      id: `DEPT${String(departments.length + 1).padStart(3, '0')}`
    };
    setDepartments([...departments, department]);
  };

  const handleEditDepartment = (updatedDepartment: Department) => {
    setDepartments(departments.map(dept => 
      dept.id === updatedDepartment.id ? updatedDepartment : dept
    ));
  };

  const handleDeleteDepartment = (departmentId: string) => {
    setDepartments(departments.filter(dept => dept.id !== departmentId));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Department Management</CardTitle>
              <CardDescription>Manage departments, cost centers, and organizational structure</CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DepartmentList
            departments={departments}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
          />
        </CardContent>
      </Card>

      <AddDepartmentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddDepartment}
      />
    </div>
  );
};

export default DepartmentManagementTab;
