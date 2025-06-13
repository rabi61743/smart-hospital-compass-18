
import { ConditionRule, AdvancedConditions, ConditionOperator } from '@/types/conditions';

export interface EvaluationContext {
  amount?: number;
  quantity?: number;
  category?: string;
  type?: string;
  date?: Date;
}

export const evaluateCondition = (condition: ConditionRule, context: EvaluationContext): boolean => {
  const fieldValue = context[condition.field];
  const { operator, value, secondValue } = condition;

  if (fieldValue === undefined || fieldValue === null) {
    return false;
  }

  switch (operator) {
    case 'gt':
      return Number(fieldValue) > Number(value);
    case 'gte':
      return Number(fieldValue) >= Number(value);
    case 'lt':
      return Number(fieldValue) < Number(value);
    case 'lte':
      return Number(fieldValue) <= Number(value);
    case 'eq':
      return fieldValue === value;
    case 'neq':
      return fieldValue !== value;
    case 'between':
      const numValue = Number(fieldValue);
      return numValue >= Number(value) && numValue <= Number(secondValue);
    case 'in':
      return Array.isArray(value) && value.includes(fieldValue);
    default:
      return false;
  }
};

export const evaluateAdvancedConditions = (
  advancedConditions: AdvancedConditions,
  context: EvaluationContext
): boolean => {
  const { logic, conditions } = advancedConditions;
  
  if (conditions.length === 0) {
    return true;
  }

  const results = conditions.map(condition => evaluateCondition(condition, context));

  if (logic === 'AND') {
    return results.every(result => result);
  } else {
    return results.some(result => result);
  }
};

export const calculateConditionalRate = (
  advancedConditions: AdvancedConditions,
  context: EvaluationContext,
  defaultRate: { rateType: string; rate: number }
): { rateType: string; rate: number } => {
  // Find the first condition that matches and has a rate override
  for (const condition of advancedConditions.conditions) {
    if (evaluateCondition(condition, context) && condition.rateOverride) {
      return condition.rateOverride;
    }
  }
  
  return defaultRate;
};

export const getOperatorLabel = (operator: ConditionOperator): string => {
  const labels: Record<ConditionOperator, string> = {
    'gt': 'Greater than',
    'gte': 'Greater than or equal',
    'lt': 'Less than',
    'lte': 'Less than or equal',
    'eq': 'Equal to',
    'neq': 'Not equal to',
    'between': 'Between',
    'in': 'In list'
  };
  
  return labels[operator];
};

export const getFieldLabel = (field: string): string => {
  const labels: Record<string, string> = {
    'amount': 'Amount',
    'quantity': 'Quantity',
    'category': 'Category',
    'type': 'Type',
    'date': 'Date'
  };
  
  return labels[field] || field;
};
