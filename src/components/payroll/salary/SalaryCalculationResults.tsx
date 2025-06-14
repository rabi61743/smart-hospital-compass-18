
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { SalaryBreakdown, Employee } from '@/types/salary';

interface SalaryCalculationResultsProps {
  result: SalaryBreakdown;
  employee: Employee | null;
}

const SalaryCalculationResults = ({ result, employee }: SalaryCalculationResultsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Salary Calculation Results
        </CardTitle>
        {employee && (
          <p className="text-sm text-muted-foreground">
            Calculation for {employee.name}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Earnings Section */}
        <div className="space-y-2">
          <h4 className="font-medium text-green-700">Earnings</h4>
          <div className="space-y-1 pl-4">
            <div className="flex justify-between text-sm">
              <span>Basic Pay</span>
              <span>₹{result.basicPay.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>HRA</span>
              <span>₹{result.hra.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>DA</span>
              <span>₹{result.da.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Medical Allowance</span>
              <span>₹{result.medicalAllowance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Transport Allowance</span>
              <span>₹{result.transportAllowance.toLocaleString()}</span>
            </div>
            {result.overtimePay > 0 && (
              <div className="flex justify-between text-sm">
                <span>Overtime Pay</span>
                <span>₹{result.overtimePay.toLocaleString()}</span>
              </div>
            )}
            {result.bonuses.length > 0 && (
              <div className="flex justify-between text-sm">
                <span>Bonuses ({result.bonuses.length})</span>
                <span>₹{result.bonuses.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}</span>
              </div>
            )}
            {result.commissions.length > 0 && (
              <div className="flex justify-between text-sm">
                <span>Commissions ({result.commissions.length})</span>
                <span>₹{result.commissions.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between font-medium pt-2 border-t">
            <span>Gross Salary</span>
            <span className="text-green-600">₹{result.grossSalary.toLocaleString()}</span>
          </div>
        </div>

        {/* Deductions Section */}
        <div className="space-y-2">
          <h4 className="font-medium text-red-700">Deductions</h4>
          <div className="space-y-1 pl-4">
            <div className="flex justify-between text-sm">
              <span>Income Tax (10%)</span>
              <span>₹{result.incomeTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Provident Fund (12%)</span>
              <span>₹{result.pf.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>ESI (0.75%)</span>
              <span>₹{result.esi.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Professional Tax</span>
              <span>₹200</span>
            </div>
            {result.otherDeductions.length > 0 && (
              <div className="flex justify-between text-sm">
                <span>Other Deductions ({result.otherDeductions.length})</span>
                <span>
                  ₹{result.otherDeductions.reduce((sum, d) => {
                    return sum + (d.percentage ? (result.grossSalary * d.percentage / 100) : d.amount);
                  }, 0).toLocaleString()}
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-between font-medium pt-2 border-t">
            <span>Total Deductions</span>
            <span className="text-red-600">₹{result.totalDeductions.toLocaleString()}</span>
          </div>
        </div>

        {/* Net Salary */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Net Salary</span>
            <Badge className="bg-blue-600 text-white text-lg px-3 py-1">
              ₹{result.netSalary.toLocaleString()}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Amount to be paid after all deductions
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
            <Download className="h-4 w-4" />
            Download Payslip
          </button>
          <button className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
            Process Payment
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryCalculationResults;
