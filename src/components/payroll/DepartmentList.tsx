
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DepartmentListRow from './DepartmentListRow';

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

interface DepartmentListProps {
  departments: Department[];
  onEdit: (department: Department) => void;
  onDelete: (departmentId: string) => void;
}

const DepartmentList = ({ departments, onEdit, onDelete }: DepartmentListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Department Info</TableHead>
          <TableHead>Cost Center</TableHead>
          <TableHead>Manager</TableHead>
          <TableHead>Employees</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {departments.map((department) => (
          <DepartmentListRow
            key={department.id}
            department={department}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default DepartmentList;
