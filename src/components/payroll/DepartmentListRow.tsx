
import React, { useState } from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Users, Building } from "lucide-react";
import EditDepartmentDialog from './EditDepartmentDialog';

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

interface DepartmentListRowProps {
  department: Department;
  onEdit: (department: Department) => void;
  onDelete: (departmentId: string) => void;
}

const DepartmentListRow = ({ department, onEdit, onDelete }: DepartmentListRowProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (updatedDepartment: Department) => {
    onEdit(updatedDepartment);
    setShowEditDialog(false);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">{department.name}</p>
              <p className="text-sm text-muted-foreground">{department.description}</p>
              <p className="text-xs text-muted-foreground">ID: {department.id}</p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <p className="font-medium">{department.costCenter}</p>
        </TableCell>
        <TableCell>
          <p className="font-medium">{department.manager}</p>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{department.employeeCount}</span>
          </div>
        </TableCell>
        <TableCell>
          <p className="font-medium">₹{department.budget.toLocaleString()}</p>
        </TableCell>
        <TableCell>
          <Badge className={getStatusColor(department.status)}>
            {department.status}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowEditDialog(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDelete(department.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <EditDepartmentDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        department={department}
        onEdit={handleEdit}
      />
    </>
  );
};

export default DepartmentListRow;
