
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserDialog = ({ isOpen, onClose }: AddUserDialogProps) => {
  const roles = ["Admin", "Doctor", "Nurse", "Pharmacist", "Finance", "Patient"];
  const departments = ["Administration", "Cardiology", "Emergency", "Pharmacy", "Finance", "Radiology"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New User</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
            <Input placeholder="Enter full name" className="border-gray-300 focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
            <Input placeholder="Enter email address" type="email" className="border-gray-300 focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Role</label>
            <Select>
              <SelectTrigger className="border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role} value={role.toLowerCase()}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Department</label>
            <Select>
              <SelectTrigger className="border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Create User</Button>
            <Button variant="outline" onClick={onClose} className="flex-1 border-gray-300">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
