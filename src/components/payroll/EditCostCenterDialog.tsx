
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DollarSign } from "lucide-react";

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

interface EditCostCenterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  costCenter: CostCenter;
  onEdit: (costCenter: CostCenter) => void;
}

const EditCostCenterDialog = ({ open, onOpenChange, costCenter, onEdit }: EditCostCenterDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CostCenter>(costCenter);

  useEffect(() => {
    setFormData(costCenter);
  }, [costCenter]);

  const departments = ['Cardiology', 'General Medicine', 'Emergency', 'Laboratory', 'Pharmacy'];
  const currentYear = new Date().getFullYear();
  const fiscalYears = [currentYear - 1, currentYear, currentYear + 1].map(year => year.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.name || !formData.department || !formData.manager) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedCostCenter = {
      ...formData,
      budgetRemaining: formData.budgetAllocated - formData.budgetUsed
    };

    onEdit(updatedCostCenter);
    toast({
      title: "Success",
      description: "Cost center updated successfully"
    });
  };

  const handleChange = (field: keyof CostCenter, value: string | number) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'budgetAllocated' || field === 'budgetUsed') {
        updated.budgetRemaining = updated.budgetAllocated - updated.budgetUsed;
      }
      return updated;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Edit Cost Center
          </DialogTitle>
          <DialogDescription>
            Update cost center information and budget allocation
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="code">Cost Center Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleChange('code', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Cost Center Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
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
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => handleChange('department', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="manager">Manager *</Label>
              <Input
                id="manager"
                value={formData.manager}
                onChange={(e) => handleChange('manager', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="budgetAllocated">Budget Allocated (₹)</Label>
              <Input
                id="budgetAllocated"
                type="number"
                value={formData.budgetAllocated}
                onChange={(e) => handleChange('budgetAllocated', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="budgetUsed">Budget Used (₹)</Label>
              <Input
                id="budgetUsed"
                type="number"
                value={formData.budgetUsed}
                onChange={(e) => handleChange('budgetUsed', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="budgetRemaining">Budget Remaining (₹)</Label>
              <Input
                id="budgetRemaining"
                type="number"
                value={formData.budgetRemaining}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fiscalYear">Fiscal Year</Label>
              <Select
                value={formData.fiscalYear}
                onValueChange={(value) => handleChange('fiscalYear', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fiscalYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'Active' | 'Inactive' | 'Suspended') => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="lastPeriodSpend">Last Period Spend (₹)</Label>
              <Input
                id="lastPeriodSpend"
                type="number"
                value={formData.lastPeriodSpend}
                onChange={(e) => handleChange('lastPeriodSpend', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Update Cost Center
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCostCenterDialog;
