
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CostCenterListRow from './CostCenterListRow';

interface CostCenter {
  id: string;
  code: string;
  name: string;
  description: string;
  department: string;
  manager: string;
  budgetAllocated: number;
  budgetUsed: number;
  budgetRemaining: number;
  lastPeriodSpend: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  createdDate: string;
  fiscalYear: string;
}

interface CostCenterListProps {
  costCenters: CostCenter[];
  onEdit: (costCenter: CostCenter) => void;
  onDelete: (costCenterId: string) => void;
}

const CostCenterList = ({ costCenters, onEdit, onDelete }: CostCenterListProps) => {
  if (costCenters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No cost centers found matching your criteria</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cost Center Details</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Manager</TableHead>
          <TableHead>Budget Allocated</TableHead>
          <TableHead>Budget Used</TableHead>
          <TableHead>Budget Remaining</TableHead>
          <TableHead>Utilization</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {costCenters.map((costCenter) => (
          <CostCenterListRow
            key={costCenter.id}
            costCenter={costCenter}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default CostCenterList;
