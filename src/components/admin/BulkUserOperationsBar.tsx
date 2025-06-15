
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckSquare, X, Trash2, UserCheck, UserX, Shield, Download } from "lucide-react";

interface BulkUserOperationsBarProps {
  selectedCount: number;
  totalCount?: number;
  onSelectAll: () => void;
  onBulkActivate: () => void;
  onBulkDeactivate: () => void;
  onBulkDelete: () => void;
  onBulkExport: () => void;
  onBulkAssignRole: () => void;
  onClearSelection: () => void;
}

const BulkUserOperationsBar = ({
  selectedCount,
  totalCount = 0,
  onSelectAll,
  onBulkActivate,
  onBulkDeactivate,
  onBulkDelete,
  onBulkExport,
  onBulkAssignRole,
  onClearSelection
}: BulkUserOperationsBarProps) => {
  const isAllSelected = totalCount > 0 && selectedCount === totalCount;

  return (
    <Card className="p-4 bg-blue-50 border-blue-200 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-semibold">
            {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            className="text-blue-600 border-blue-300 hover:bg-blue-100"
          >
            <CheckSquare className="h-4 w-4 mr-2" />
            {isAllSelected ? 'Deselect All' : 'Select All'}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkActivate}
            className="text-green-600 border-green-300 hover:bg-green-50"
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Activate ({selectedCount})
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkDeactivate}
            className="text-orange-600 border-orange-300 hover:bg-orange-50"
          >
            <UserX className="h-4 w-4 mr-2" />
            Deactivate ({selectedCount})
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onBulkAssignRole}
            className="text-purple-600 border-purple-300 hover:bg-purple-50"
          >
            <Shield className="h-4 w-4 mr-2" />
            Assign Role
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onBulkExport}
            className="text-blue-600 border-blue-300 hover:bg-blue-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export ({selectedCount})
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete ({selectedCount})
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Bulk Delete</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {selectedCount} user{selectedCount !== 1 ? 's' : ''}? 
                  This action cannot be undone and will permanently remove the selected users from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onBulkDelete} className="bg-red-600 hover:bg-red-700">
                  Delete {selectedCount} User{selectedCount !== 1 ? 's' : ''}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-gray-600 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BulkUserOperationsBar;
