
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PositionListRow from './PositionListRow';

interface Position {
  id: string;
  title: string;
  department: string;
  description: string;
  level: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Manager' | 'Director' | 'VP' | 'C-Level';
  reportsTo: string;
  minSalary: number;
  maxSalary: number;
  responsibilities: string[];
  requirements: string[];
  employeeCount: number;
  status: 'Active' | 'Inactive';
}

interface PositionListProps {
  positions: Position[];
  onEdit: (position: Position) => void;
  onDelete: (positionId: string) => void;
}

const PositionList = ({ positions, onEdit, onDelete }: PositionListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Position Details</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Reports To</TableHead>
          <TableHead>Salary Range</TableHead>
          <TableHead>Employees</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map((position) => (
          <PositionListRow
            key={position.id}
            position={position}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default PositionList;
