
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Calendar } from "lucide-react";
import { PayrollRun } from '@/types/payrollProcessing';
import { PayrollProcessor } from '@/utils/payrollProcessing';

interface PayrollRunCreatorProps {
  onRunCreated: (run: PayrollRun) => void;
}

const PayrollRunCreator = ({ onRunCreated }: PayrollRunCreatorProps) => {
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'monthly' as const,
    startDate: '',
    endDate: '',
    payDate: '',
    includeDepartments: [] as string[],
    autoCalculate: true,
  });

  const departments = ['Cardiology', 'General Medicine', 'Emergency', 'Laboratory', 'Pharmacy'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRun = PayrollProcessor.createPayrollRun(
      formData.name,
      formData.frequency,
      formData.startDate,
      formData.endDate,
      formData.payDate
    );

    onRunCreated(newRun);
    
    // Reset form
    setFormData({
      name: '',
      frequency: 'monthly',
      startDate: '',
      endDate: '',
      payDate: '',
      includeDepartments: [],
      autoCalculate: true,
    });
  };

  const handleDepartmentChange = (department: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      includeDepartments: checked 
        ? [...prev.includeDepartments, department]
        : prev.includeDepartments.filter(d => d !== department)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Payroll Run
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="run-name">Payroll Run Name</Label>
              <Input
                id="run-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., December 2024 Monthly Payroll"
                required
              />
            </div>
            <div>
              <Label htmlFor="frequency">Pay Frequency</Label>
              <Select 
                value={formData.frequency} 
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, frequency: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="start-date">Pay Period Start</Label>
              <Input
                id="start-date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="end-date">Pay Period End</Label>
              <Input
                id="end-date"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="pay-date">Pay Date</Label>
              <Input
                id="pay-date"
                type="date"
                value={formData.payDate}
                onChange={(e) => setFormData(prev => ({ ...prev, payDate: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Include Departments</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {departments.map((department) => (
                <div key={department} className="flex items-center space-x-2">
                  <Checkbox
                    id={department}
                    checked={formData.includeDepartments.includes(department)}
                    onCheckedChange={(checked) => 
                      handleDepartmentChange(department, checked as boolean)
                    }
                  />
                  <Label htmlFor={department} className="text-sm">
                    {department}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Leave unchecked to include all departments
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="auto-calculate"
              checked={formData.autoCalculate}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, autoCalculate: checked as boolean }))
              }
            />
            <Label htmlFor="auto-calculate">
              Auto-calculate salaries after creating run
            </Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Create Payroll Run
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PayrollRunCreator;
