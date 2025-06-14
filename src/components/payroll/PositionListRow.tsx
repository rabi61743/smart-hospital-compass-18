
import React, { useState } from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Users, Briefcase } from "lucide-react";
import EditPositionDialog from './EditPositionDialog';

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

interface PositionListRowProps {
  position: Position;
  onEdit: (position: Position) => void;
  onDelete: (positionId: string) => void;
}

const PositionListRow = ({ position, onEdit, onDelete }: PositionListRowProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Entry': return 'bg-blue-100 text-blue-800';
      case 'Mid': return 'bg-yellow-100 text-yellow-800';
      case 'Senior': return 'bg-orange-100 text-orange-800';
      case 'Lead': return 'bg-purple-100 text-purple-800';
      case 'Manager': return 'bg-indigo-100 text-indigo-800';
      case 'Director': return 'bg-pink-100 text-pink-800';
      case 'VP': return 'bg-red-100 text-red-800';
      case 'C-Level': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (updatedPosition: Position) => {
    onEdit(updatedPosition);
    setShowEditDialog(false);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Briefcase className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">{position.title}</p>
              <p className="text-sm text-muted-foreground">{position.description}</p>
              <p className="text-xs text-muted-foreground">ID: {position.id}</p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <p className="font-medium">{position.department}</p>
        </TableCell>
        <TableCell>
          <Badge className={getLevelColor(position.level)}>
            {position.level}
          </Badge>
        </TableCell>
        <TableCell>
          <p className="text-sm">{position.reportsTo}</p>
        </TableCell>
        <TableCell>
          <p className="font-medium">₹{position.minSalary.toLocaleString()} - ₹{position.maxSalary.toLocaleString()}</p>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{position.employeeCount}</span>
          </div>
        </TableCell>
        <TableCell>
          <Badge className={getStatusColor(position.status)}>
            {position.status}
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
              onClick={() => onDelete(position.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <EditPositionDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        position={position}
        onEdit={handleEdit}
      />
    </>
  );
};

export default PositionListRow;
