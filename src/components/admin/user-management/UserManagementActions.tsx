
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus, Download, Upload } from "lucide-react";

interface UserManagementActionsProps {
  onAddUser: () => void;
  onExportUsers: () => void;
  onImportExport: () => void;
}

const UserManagementActions = ({
  onAddUser,
  onExportUsers,
  onImportExport
}: UserManagementActionsProps) => {
  return (
    <div className="flex gap-3">
      <Button 
        variant="outline" 
        onClick={onImportExport}
        className="border-gray-300 hover:bg-gray-50"
      >
        <Upload className="h-4 w-4 mr-2" />
        Import/Export
      </Button>
      <Button 
        variant="outline" 
        onClick={onExportUsers}
        className="border-gray-300 hover:bg-gray-50"
      >
        <Download className="h-4 w-4 mr-2" />
        Export Users
      </Button>
      <Button onClick={onAddUser} className="bg-blue-600 hover:bg-blue-700 shadow-md">
        <UserPlus className="h-4 w-4 mr-2" />
        Add New User
      </Button>
    </div>
  );
};

export default UserManagementActions;
