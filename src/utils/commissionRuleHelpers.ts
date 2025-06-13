
import { AdvancedConditions, ConditionRule } from "@/types/conditions";
import { CommissionRuleFormData } from "@/schemas/commissionValidation";

// Helper function to ensure AdvancedConditions has required properties with proper ConditionRule objects
export const normalizeAdvancedConditions = (conditions?: Partial<AdvancedConditions>): AdvancedConditions | undefined => {
  if (!conditions) return undefined;
  
  const normalizedConditions: ConditionRule[] = (conditions.conditions || []).map((condition, index) => {
    const conditionRule: ConditionRule = {
      id: condition.id || `condition-${Date.now()}-${index}`,
      field: condition.field || 'amount',
      operator: condition.operator || 'gt',
      value: condition.value || '',
      secondValue: condition.secondValue,
    };

    // Only add rateOverride if it has the required properties
    if (condition.rateOverride && condition.rateOverride.rateType && typeof condition.rateOverride.rate === 'number') {
      conditionRule.rateOverride = {
        rateType: condition.rateOverride.rateType,
        rate: condition.rateOverride.rate
      };
    }

    return conditionRule;
  });
  
  return {
    logic: conditions.logic || 'AND',
    conditions: normalizedConditions
  };
};

// Helper function to normalize form data before processing
export const normalizeFormAdvancedConditions = (formData: CommissionRuleFormData): AdvancedConditions | undefined => {
  if (!formData.advancedConditions) return undefined;
  
  const conditions = formData.advancedConditions.conditions || [];
  const normalizedConditions: ConditionRule[] = conditions.map((condition: any, index) => {
    const conditionRule: ConditionRule = {
      id: condition.id || `condition-${Date.now()}-${index}`,
      field: condition.field || 'amount',
      operator: condition.operator || 'gt',
      value: condition.value || '',
      secondValue: condition.secondValue,
    };

    // Only add rateOverride if it has the required properties
    if (condition.rateOverride && condition.rateOverride.rateType && typeof condition.rateOverride.rate === 'number') {
      conditionRule.rateOverride = {
        rateType: condition.rateOverride.rateType,
        rate: condition.rateOverride.rate
      };
    }

    return conditionRule;
  });
  
  return {
    logic: formData.advancedConditions.logic || 'AND',
    conditions: normalizedConditions
  };
};
