
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Employee } from '@/types/salary';
import { SalaryCalculator } from '@/utils/salaryCalculations';

interface SalaryBreakdownCardProps {
  employee: Employee;
}

const SalaryBreakdownCard = ({ employee }: SalaryBreakdownCardProps) => {
  const allowances = SalaryCalculator.calculateBasicAllowances(employee.basicSalary);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Basic Salary Structure
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Basic Salary</span>
            <span className="font-bold">₹{employee.basicSalary.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">HRA (40%)</span>
            <span>₹{allowances.hra.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">DA (15%)</span>
            <span>₹{allowances.da.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Medical Allowance</span>
            <span>₹{allowances.medical.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Transport Allowance</span>
            <span>₹{allowances.transport.toLocaleString()}</span>
          </div>
          <hr />
          <div className="flex justify-between">
            <span className="font-medium">Base Total</span>
            <span className="font-bold text-blue-600">
              ₹{(employee.basicSalary + allowances.hra + allowances.da + allowances.medical + allowances.transport).toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Hourly Rate: ₹{employee.hourlyRate?.toLocaleString() || Math.round(employee.basicSalary / (30 * 8)).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryBreakdownCard;
