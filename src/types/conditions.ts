
export type ConditionOperator = 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq' | 'between' | 'in';

export interface ConditionRule {
  id: string;
  field: 'amount' | 'quantity' | 'category' | 'type' | 'date';
  operator: ConditionOperator;
  value: any;
  secondValue?: any; // For 'between' operator
  rateOverride?: {
    rateType: 'percentage' | 'fixed' | 'tiered';
    rate: number;
  };
}

export interface AdvancedConditions {
  logic: 'AND' | 'OR';
  conditions: ConditionRule[];
}

export interface ConditionalRate {
  id: string;
  name: string;
  conditions: AdvancedConditions;
  defaultRate: {
    rateType: 'percentage' | 'fixed' | 'tiered';
    rate: number;
  };
}
