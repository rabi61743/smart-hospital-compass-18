
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface AssignModuleAdminDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  departments: any;
  departmentAccess: string[];
  currentDepartment: any;
  permissionTypes: Array<{
    key: string;
    label: string;
    description: string;
  }>;
}

const AssignModuleAdminDialog = ({
  isOpen,
  onOpenChange,
  departments,
  departmentAccess,
  currentDepartment,
  permissionTypes
}: AssignModuleAdminDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Assign Module Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Module Administrator</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userEmail">User Email</Label>
              <Input id="userEmail" placeholder="Enter user email" />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departmentAccess.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {departments[dept as keyof typeof departments]?.name || dept.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Select Modules</Label>
            <div className="mt-2 space-y-3 max-h-40 overflow-y-auto">
              {currentDepartment?.modules.map((module: any, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`module-${index}`} />
                  <Label htmlFor={`module-${index}`} className="flex items-center gap-2">
                    {module.name}
                    {module.critical && (
                      <Badge variant="destructive" className="text-xs">Critical</Badge>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Permissions</Label>
            <div className="mt-2 grid grid-cols-2 gap-3 max-h-40 overflow-y-auto">
              {permissionTypes.map((permission) => (
                <div key={permission.key} className="flex items-center space-x-2">
                  <Checkbox id={permission.key} />
                  <Label htmlFor={permission.key} className="text-sm">
                    {permission.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1">Assign Administrator</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignModuleAdminDialog;
