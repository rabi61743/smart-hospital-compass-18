import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Info } from "lucide-react";
import { AdvancedConditions, ConditionRule, ConditionOperator } from '@/types/conditions';
import { getOperatorLabel, getFieldLabel } from '@/utils/conditionEvaluator';

interface AdvancedConditionsBuilderProps {
  conditions: AdvancedConditions;
  onChange: (conditions: AdvancedConditions) => void;
}

const AdvancedConditionsBuilder = ({ conditions, onChange }: AdvancedConditionsBuilderProps) => {
  const [newCondition, setNewCondition] = useState<Partial<ConditionRule>>({
    field: 'amount',
    operator: 'gt',
    value: '',
  });

  const addCondition = () => {
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

    onChange({
      ...conditions,
      conditions: [...conditions.conditions, condition],
    });

    setNewCondition({
      field: 'amount',
      operator: 'gt',
      value: '',
    });
  };

  const removeCondition = (conditionId: string) => {
    onChange({
      ...conditions,
      conditions: conditions.conditions.filter(c => c.id !== conditionId),
    });
  };

  const updateConditionRateOverride = (conditionId: string, rateOverride: any) => {
    onChange({
      ...conditions,
      conditions: conditions.conditions.map(c =>
        c.id === conditionId ? { ...c, rateOverride } : c
      ),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Advanced Conditional Logic
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Logic Type */}
        <div>
          <Label>Condition Logic</Label>
          <RadioGroup
            value={conditions.logic}
            onValueChange={(value: 'AND' | 'OR') => onChange({ ...conditions, logic: value })}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="AND" id="and" />
              <Label htmlFor="and">AND (All conditions must be true)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="OR" id="or" />
              <Label htmlFor="or">OR (Any condition can be true)</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Existing Conditions */}
        {conditions.conditions.length > 0 && (
          <div className="space-y-3">
            <Label>Current Conditions</Label>
            {conditions.conditions.map((condition, index) => (
              <div key={condition.id} className="border rounded-lg p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">{getFieldLabel(condition.field)}</Badge>
                    <Badge variant="outline">{getOperatorLabel(condition.operator)}</Badge>
                    <Badge variant="outline">{condition.value}</Badge>
                    {condition.secondValue && (
                      <>
                        <span className="text-sm text-muted-foreground">and</span>
                        <Badge variant="outline">{condition.secondValue}</Badge>
                      </>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCondition(condition.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Rate Override */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs">Override Rate Type</Label>
                    <Select
                      value={condition.rateOverride?.rateType || ''}
                      onValueChange={(value) => {
                        const override = condition.rateOverride || { rateType: value as any, rate: 0 };
                        updateConditionRateOverride(condition.id, { ...override, rateType: value });
                      }}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="No override" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No override</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="tiered">Tiered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {condition.rateOverride?.rateType && (
                    <div>
                      <Label className="text-xs">Override Rate</Label>
                      <Input
                        type="number"
                        step="0.01"
                        className="h-8"
                        value={condition.rateOverride?.rate || ''}
                        onChange={(e) => {
                          const override = condition.rateOverride || { rateType: 'percentage', rate: 0 };
                          updateConditionRateOverride(condition.id, {
                            ...override,
                            rate: parseFloat(e.target.value) || 0
                          });
                        }}
                        placeholder="Rate value"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Separator />

        {/* Add New Condition */}
        <div className="space-y-3">
          <Label>Add New Condition</Label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div>
              <Label className="text-xs">Field</Label>
              <Select
                value={newCondition.field}
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
                value={newCondition.operator}
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
          
          <Button onClick={addCondition} size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Condition
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedConditionsBuilder;
