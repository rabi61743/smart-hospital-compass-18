
import React, { useState } from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash2, DollarSign } from "lucide-react";
import EditCostCenterDialog from './EditCostCenterDialog';

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

interface CostCenterListRowProps {
  costCenter: CostCenter;
  onEdit: (costCenter: CostCenter) => void;
  onDelete: (costCenterId: string) => void;
}

const CostCenterListRow = ({ costCenter, onEdit, onDelete }: CostCenterListRowProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const budgetUtilization = costCenter.budgetAllocated > 0 
    ? (costCenter.budgetUsed / costCenter.budgetAllocated) * 100 
    : 0;

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'bg-red-500';
    if (utilization >= 75) return 'bg-orange-500';
    if (utilization >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleEdit = (updatedCostCenter: CostCenter) => {
    onEdit(updatedCostCenter);
    setShowEditDialog(false);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">{costCenter.name}</p>
              <p className="text-sm text-muted-foreground">{costCenter.code}</p>
              <p className="text-xs text-muted-foreground">{costCenter.description}</p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <p className="font-medium">{costCenter.department}</p>
        </TableCell>
        <TableCell>
          <p className="text-sm">{costCenter.manager}</p>
        </TableCell>
        <TableCell>
          <p className="font-medium">₹{costCenter.budgetAllocated.toLocaleString()}</p>
        </TableCell>
        <TableCell>
          <p className="font-medium">₹{costCenter.budgetUsed.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Last period: ₹{costCenter.lastPeriodSpend.toLocaleString()}</p>
        </TableCell>
        <TableCell>
          <p className={`font-medium ${costCenter.budgetRemaining < 0 ? 'text-red-600' : ''}`}>
            ₹{costCenter.budgetRemaining.toLocaleString()}
          </p>
        </TableCell>
        <TableCell>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>{budgetUtilization.toFixed(1)}%</span>
              {budgetUtilization > 100 && (
                <span className="text-red-600 font-medium">Over Budget</span>
              )}
            </div>
            <Progress 
              value={Math.min(budgetUtilization, 100)} 
              className="h-2"
              style={{
                background: budgetUtilization > 100 ? '#fee2e2' : undefined
              }}
            />
          </div>
        </TableCell>
        <TableCell>
          <Badge className={getStatusColor(costCenter.status)}>
            {costCenter.status}
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
              onClick={() => onDelete(costCenter.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <EditCostCenterDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        costCenter={costCenter}
        onEdit={handleEdit}
      />
    </>
  );
};

export default CostCenterListRow;
