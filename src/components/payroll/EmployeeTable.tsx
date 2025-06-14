
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EmployeeTableRow from './EmployeeTableRow';

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  status: string;
  employeeType: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  onViewProfile: (employeeId: string) => void;
}

const EmployeeTable = ({ employees, onViewProfile }: EmployeeTableProps) => {
  return (
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
        {employees.map((employee) => (
          <EmployeeTableRow
            key={employee.id}
            employee={employee}
            onViewProfile={onViewProfile}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
