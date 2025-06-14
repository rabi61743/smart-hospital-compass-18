
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Building } from "lucide-react";

interface Department {
  name: string;
  description: string;
  costCenter: string;
  manager: string;
  employeeCount: number;
  budget: number;
  status: 'Active' | 'Inactive';
}

interface AddDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (department: Department) => void;
}

const AddDepartmentDialog = ({ open, onOpenChange, onAdd }: AddDepartmentDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Department>({
    name: '',
    description: '',
    costCenter: '',
    manager: '',
    employeeCount: 0,
    budget: 0,
    status: 'Active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.costCenter || !formData.manager) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onAdd(formData);
    setFormData({
      name: '',
      description: '',
      costCenter: '',
      manager: '',
      employeeCount: 0,
      budget: 0,
      status: 'Active'
    });
    onOpenChange(false);
    
    toast({
      title: "Success",
      description: "Department added successfully"
    });
  };

  const handleChange = (field: keyof Department, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Add New Department
          </DialogTitle>
          <DialogDescription>
            Create a new department with cost center assignment
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Department Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Cardiology"
                required
              />
            </div>
            <div>
              <Label htmlFor="costCenter">Cost Center *</Label>
              <Input
                id="costCenter"
                value={formData.costCenter}
                onChange={(e) => handleChange('costCenter', e.target.value)}
                placeholder="e.g., CC-CARD-001"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description of the department"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="manager">Department Manager *</Label>
              <Input
                id="manager"
                value={formData.manager}
                onChange={(e) => handleChange('manager', e.target.value)}
                placeholder="e.g., Dr. John Smith"
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'Active' | 'Inactive') => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employeeCount">Employee Count</Label>
              <Input
                id="employeeCount"
                type="number"
                value={formData.employeeCount}
                onChange={(e) => handleChange('employeeCount', parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="budget">Annual Budget (₹)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => handleChange('budget', parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Department
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDepartmentDialog;
