
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { ConditionRule } from '@/types/conditions';
import { getOperatorLabel, getFieldLabel } from '@/utils/conditionEvaluator';

interface ConditionDisplayProps {
  conditions: ConditionRule[];
  onRemoveCondition: (conditionId: string) => void;
  onUpdateConditionRateOverride: (conditionId: string, rateOverride: any) => void;
}

const ConditionDisplay = ({ 
  conditions, 
  onRemoveCondition, 
  onUpdateConditionRateOverride 
}: ConditionDisplayProps) => {
  if (conditions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <Label>Current Conditions</Label>
      {conditions.map((condition) => (
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
              onClick={() => onRemoveCondition(condition.id)}
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
                  onUpdateConditionRateOverride(condition.id, { ...override, rateType: value });
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
                    onUpdateConditionRateOverride(condition.id, {
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
  );
};

export default ConditionDisplay;
