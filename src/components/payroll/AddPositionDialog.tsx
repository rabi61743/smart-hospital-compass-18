
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Plus, Minus } from "lucide-react";

interface Position {
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

interface AddPositionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (position: Position) => void;
}

const AddPositionDialog = ({ open, onOpenChange, onAdd }: AddPositionDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Position>({
    title: '',
    department: '',
    description: '',
    level: 'Mid',
    reportsTo: '',
    minSalary: 0,
    maxSalary: 0,
    responsibilities: [''],
    requirements: [''],
    employeeCount: 0,
    status: 'Active'
  });

  const departments = ['Cardiology', 'General Medicine', 'Emergency', 'Laboratory', 'Pharmacy'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.department || !formData.reportsTo) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const filteredResponsibilities = formData.responsibilities.filter(r => r.trim() !== '');
    const filteredRequirements = formData.requirements.filter(r => r.trim() !== '');

    onAdd({
      ...formData,
      responsibilities: filteredResponsibilities,
      requirements: filteredRequirements
    });

    setFormData({
      title: '',
      department: '',
      description: '',
      level: 'Mid',
      reportsTo: '',
      minSalary: 0,
      maxSalary: 0,
      responsibilities: [''],
      requirements: [''],
      employeeCount: 0,
      status: 'Active'
    });
    onOpenChange(false);
    
    toast({
      title: "Success",
      description: "Position added successfully"
    });
  };

  const handleChange = (field: keyof Position, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addResponsibility = () => {
    setFormData(prev => ({
      ...prev,
      responsibilities: [...prev.responsibilities, '']
    }));
  };

  const removeResponsibility = (index: number) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }));
  };

  const updateResponsibility = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.map((item, i) => i === index ? value : item)
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((item, i) => i === index ? value : item)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Add New Position
          </DialogTitle>
          <DialogDescription>
            Create a new job position with reporting relationships and requirements
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Position Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Senior Cardiologist"
                required
              />
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => handleChange('department', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Position Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description of the position"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="level">Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value: Position['level']) => handleChange('level', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entry">Entry</SelectItem>
                  <SelectItem value="Mid">Mid</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Director">Director</SelectItem>
                  <SelectItem value="VP">VP</SelectItem>
                  <SelectItem value="C-Level">C-Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reportsTo">Reports To *</Label>
              <Input
                id="reportsTo"
                value={formData.reportsTo}
                onChange={(e) => handleChange('reportsTo', e.target.value)}
                placeholder="e.g., Department Head"
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

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="minSalary">Min Salary (₹)</Label>
              <Input
                id="minSalary"
                type="number"
                value={formData.minSalary}
                onChange={(e) => handleChange('minSalary', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="maxSalary">Max Salary (₹)</Label>
              <Input
                id="maxSalary"
                type="number"
                value={formData.maxSalary}
                onChange={(e) => handleChange('maxSalary', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="employeeCount">Current Employees</Label>
              <Input
                id="employeeCount"
                type="number"
                value={formData.employeeCount}
                onChange={(e) => handleChange('employeeCount', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Key Responsibilities</Label>
              <Button type="button" variant="outline" size="sm" onClick={addResponsibility}>
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {formData.responsibilities.map((responsibility, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={responsibility}
                    onChange={(e) => updateResponsibility(index, e.target.value)}
                    placeholder="Enter responsibility"
                  />
                  {formData.responsibilities.length > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeResponsibility(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Requirements</Label>
              <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={requirement}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder="Enter requirement"
                  />
                  {formData.requirements.length > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeRequirement(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Position
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPositionDialog;
