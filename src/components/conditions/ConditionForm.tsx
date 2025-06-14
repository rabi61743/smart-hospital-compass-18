
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { ConditionRule, ConditionOperator } from '@/types/conditions';

interface ConditionFormProps {
  onAddCondition: (condition: ConditionRule) => void;
}

const ConditionForm = ({ onAddCondition }: ConditionFormProps) => {
  const [newCondition, setNewCondition] = useState<Partial<ConditionRule>>({
    field: 'amount',
    operator: 'gt',
    value: '',
  });

  const handleAddCondition = () => {
    if (!newCondition.field || !newCondition.operator || newCondition.value === '') {
      return;
    }

    const condition: ConditionRule = {
      id: Date.now().toString(),
      field: newCondition.field as any,
      operator: newCondition.operator as ConditionOperator,
      value: newCondition.value,
      secondValue: newCondition.secondValue,
      rateOverride: newCondition.rateOverride,
    };

    onAddCondition(condition);

    setNewCondition({
      field: 'amount',
      operator: 'gt',
      value: '',
    });
  };

  return (
    <div className="space-y-3">
      <Label>Add New Condition</Label>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div>
          <Label className="text-xs">Field</Label>
          <Select
            value={newCondition.field || 'amount'}
            onValueChange={(value) => setNewCondition({ ...newCondition, field: value as any })}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="quantity">Quantity</SelectItem>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs">Operator</Label>
          <Select
            value={newCondition.operator || 'gt'}
            onValueChange={(value) => setNewCondition({ ...newCondition, operator: value as ConditionOperator })}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gt">Greater than</SelectItem>
              <SelectItem value="gte">Greater than or equal</SelectItem>
              <SelectItem value="lt">Less than</SelectItem>
              <SelectItem value="lte">Less than or equal</SelectItem>
              <SelectItem value="eq">Equal to</SelectItem>
              <SelectItem value="neq">Not equal to</SelectItem>
              <SelectItem value="between">Between</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs">Value</Label>
          <Input
            className="h-8"
            value={newCondition.value}
            onChange={(e) => setNewCondition({ ...newCondition, value: e.target.value })}
            placeholder="Enter value"
          />
        </div>

        {newCondition.operator === 'between' && (
          <div>
            <Label className="text-xs">Second Value</Label>
            <Input
              className="h-8"
              value={newCondition.secondValue || ''}
              onChange={(e) => setNewCondition({ ...newCondition, secondValue: e.target.value })}
              placeholder="End value"
            />
          </div>
        )}
      </div>
      
      <Button onClick={handleAddCondition} size="sm" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Condition
      </Button>
    </div>
  );
};

export default ConditionForm;
