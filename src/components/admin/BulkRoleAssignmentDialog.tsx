
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Shield, Users } from "lucide-react";

interface BulkRoleAssignmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onAssignRole: (role: string) => void;
}

const BulkRoleAssignmentDialog = ({
  isOpen,
  onClose,
  selectedCount,
  onAssignRole
}: BulkRoleAssignmentDialogProps) => {
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    { value: 'admin', label: 'Admin', color: 'bg-violet-100 text-violet-700' },
    { value: 'doctor', label: 'Doctor', color: 'bg-blue-100 text-blue-700' },
    { value: 'nurse', label: 'Nurse', color: 'bg-teal-100 text-teal-700' },
    { value: 'pharmacist', label: 'Pharmacist', color: 'bg-purple-100 text-purple-700' },
    { value: 'finance', label: 'Finance', color: 'bg-orange-100 text-orange-700' },
    { value: 'patient', label: 'Patient', color: 'bg-gray-100 text-gray-700' }
  ];

  const handleAssign = () => {
    if (selectedRole) {
      onAssignRole(selectedRole);
      setSelectedRole('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Bulk Role Assignment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-700">
              Assigning role to <Badge variant="secondary">{selectedCount}</Badge> selected users
            </span>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Select New Role
            </label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="border-gray-300 focus:border-purple-500">
                <SelectValue placeholder="Choose a role to assign" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    <div className="flex items-center gap-2">
                      <Badge className={`${role.color} border font-medium`}>
                        {role.label}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleAssign} 
              disabled={!selectedRole}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Assign Role to {selectedCount} Users
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 border-gray-300"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkRoleAssignmentDialog;
