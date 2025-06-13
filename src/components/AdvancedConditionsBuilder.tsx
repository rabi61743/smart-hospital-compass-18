
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { AdvancedConditions, ConditionRule } from '@/types/conditions';
import LogicTypeSelector from './conditions/LogicTypeSelector';
import ConditionDisplay from './conditions/ConditionDisplay';
import ConditionForm from './conditions/ConditionForm';

interface AdvancedConditionsBuilderProps {
  conditions: AdvancedConditions;
  onChange: (conditions: AdvancedConditions) => void;
}

const AdvancedConditionsBuilder = ({ conditions, onChange }: AdvancedConditionsBuilderProps) => {
  const handleLogicChange = (logic: 'AND' | 'OR') => {
    onChange({ ...conditions, logic });
  };

  const handleAddCondition = (condition: ConditionRule) => {
    onChange({
      ...conditions,
      conditions: [...conditions.conditions, condition],
    });
  };

  const handleRemoveCondition = (conditionId: string) => {
    onChange({
      ...conditions,
      conditions: conditions.conditions.filter(c => c.id !== conditionId),
    });
  };

  const handleUpdateConditionRateOverride = (conditionId: string, rateOverride: any) => {
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
        <LogicTypeSelector logic={conditions.logic} onChange={handleLogicChange} />
        
        <Separator />

        <ConditionDisplay
          conditions={conditions.conditions}
          onRemoveCondition={handleRemoveCondition}
          onUpdateConditionRateOverride={handleUpdateConditionRateOverride}
        />

        <Separator />

        <ConditionForm onAddCondition={handleAddCondition} />
      </CardContent>
    </Card>
  );
};

export default AdvancedConditionsBuilder;
