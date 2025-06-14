
export type ConditionOperator = 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq' | 'between' | 'in' | 'time_between' | 'day_of_week' | 'is_weekend' | 'is_peak_hour';

export interface ConditionRule {
  id: string;
  field: 'amount' | 'quantity' | 'category' | 'type' | 'date' | 'time' | 'day_of_week' | 'hour';
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

// New time-based configuration types
export interface TimeBasedRate {
  id: string;
  name: string;
  rateMultiplier: number; // e.g., 1.5 for 50% increase
  conditions: {
    startTime?: string; // "09:00"
    endTime?: string; // "18:00"
    daysOfWeek?: number[]; // [1,2,3,4,5] for weekdays, [0,6] for weekends
    isWeekend?: boolean;
    isPeakHour?: boolean;
  };
}
