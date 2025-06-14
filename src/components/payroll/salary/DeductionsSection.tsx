
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Deduction } from '@/types/salary';

interface DeductionsSectionProps {
  deductions: Deduction[];
  onDeductionsChange: (deductions: Deduction[]) => void;
  employeeId: string;
}

const DeductionsSection = ({ deductions, onDeductionsChange, employeeId }: DeductionsSectionProps) => {
  const [newDeduction, setNewDeduction] = useState({
    type: 'other' as const,
    amount: '',
    percentage: '',
    description: '',
    mandatory: false,
    usePercentage: false
  });

  const addDeduction = () => {
    if (!newDeduction.description || (!newDeduction.amount && !newDeduction.percentage)) return;

    const deduction: Deduction = {
      id: Date.now().toString(),
      employeeId,
      type: newDeduction.type,
      amount: newDeduction.usePercentage ? 0 : parseFloat(newDeduction.amount),
      percentage: newDeduction.usePercentage ? parseFloat(newDeduction.percentage) : undefined,
      description: newDeduction.description,
      mandatory: newDeduction.mandatory
    };

    onDeductionsChange([...deductions, deduction]);
    setNewDeduction({
      type: 'other',
      amount: '',
      percentage: '',
      description: '',
      mandatory: false,
      usePercentage: false
    });
  };

  const removeDeduction = (id: string) => {
    onDeductionsChange(deductions.filter(deduction => deduction.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Minus className="h-5 w-5" />
          Additional Deductions
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Standard deductions (Income Tax, PF, ESI, Professional Tax) are calculated automatically
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="deduction-type">Type</Label>
              <Select 
                value={newDeduction.type} 
                onValueChange={(value: any) => setNewDeduction(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loan">Loan Repayment</SelectItem>
                  <SelectItem value="advance">Salary Advance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deduction-description">Description</Label>
              <Input
                id="deduction-description"
                placeholder="Deduction description"
                value={newDeduction.description}
                onChange={(e) => setNewDeduction(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={newDeduction.usePercentage}
              onCheckedChange={(checked) => setNewDeduction(prev => ({ ...prev, usePercentage: checked }))}
            />
            <Label>Use percentage instead of fixed amount</Label>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {newDeduction.usePercentage ? (
              <div>
                <Label htmlFor="deduction-percentage">Percentage (%)</Label>
                <Input
                  id="deduction-percentage"
                  type="number"
                  placeholder="Percentage"
                  value={newDeduction.percentage}
                  onChange={(e) => setNewDeduction(prev => ({ ...prev, percentage: e.target.value }))}
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="deduction-amount">Amount (₹)</Label>
                <Input
                  id="deduction-amount"
                  type="number"
                  placeholder="Amount"
                  value={newDeduction.amount}
                  onChange={(e) => setNewDeduction(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>
            )}
            <div className="flex items-end">
              <Button onClick={addDeduction} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Deduction
              </Button>
            </div>
          </div>
        </div>

        {deductions.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Additional Deductions</h4>
            {deductions.map((deduction) => (
              <div key={deduction.id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <div className="flex gap-4">
                    <span className="text-sm font-medium">{deduction.type}</span>
                    <span className="text-sm font-bold text-red-600">
                      {deduction.percentage ? `${deduction.percentage}%` : `₹${deduction.amount.toLocaleString()}`}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{deduction.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeDeduction(deduction.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeductionsSection;
