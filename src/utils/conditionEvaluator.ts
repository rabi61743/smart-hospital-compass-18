import { ConditionRule, AdvancedConditions, ConditionOperator } from '@/types/conditions';

export interface EvaluationContext {
  amount?: number;
  quantity?: number;
  category?: string;
  type?: string;
  date?: Date;
  time?: string; // "HH:MM" format
  dayOfWeek?: number; // 0-6, Sunday = 0
  hour?: number; // 0-23
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
    case 'time_between':
      return evaluateTimeBetween(context.time || '', value, secondValue);
    case 'day_of_week':
      return Array.isArray(value) && value.includes(context.dayOfWeek);
    case 'is_weekend':
      return context.dayOfWeek === 0 || context.dayOfWeek === 6;
    case 'is_peak_hour':
      return evaluatePeakHour(context.hour || 0);
    default:
      return false;
  }
};

const evaluateTimeBetween = (currentTime: string, startTime: string, endTime: string): boolean => {
  if (!currentTime || !startTime || !endTime) return false;
  
  const current = timeToMinutes(currentTime);
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  
  if (start <= end) {
    return current >= start && current <= end;
  } else {
    // Handle overnight time ranges (e.g., 22:00 to 06:00)
    return current >= start || current <= end;
  }
};

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const evaluatePeakHour = (hour: number): boolean => {
  // Define peak hours as 8-10 AM and 6-8 PM
  return (hour >= 8 && hour <= 10) || (hour >= 18 && hour <= 20);
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
    'in': 'In list',
    'time_between': 'Time between',
    'day_of_week': 'Day of week',
    'is_weekend': 'Is weekend',
    'is_peak_hour': 'Is peak hour'
  };
  
  return labels[operator];
};

export const getFieldLabel = (field: string): string => {
  const labels: Record<string, string> = {
    'amount': 'Amount',
    'quantity': 'Quantity',
    'category': 'Category',
    'type': 'Type',
    'date': 'Date',
    'time': 'Time',
    'day_of_week': 'Day of Week',
    'hour': 'Hour'
  };
  
  return labels[field] || field;
};

// New utility function to calculate time-based rate multiplier
export const calculateTimeBasedMultiplier = (
  timeBasedRates: any[],
  context: EvaluationContext
): number => {
  let multiplier = 1.0;
  
  for (const timeRate of timeBasedRates || []) {
    let matches = true;
    
    if (timeRate.conditions.startTime && timeRate.conditions.endTime) {
      matches = matches && evaluateTimeBetween(
        context.time || '',
        timeRate.conditions.startTime,
        timeRate.conditions.endTime
      );
    }
    
    if (timeRate.conditions.daysOfWeek) {
      matches = matches && timeRate.conditions.daysOfWeek.includes(context.dayOfWeek);
    }
    
    if (timeRate.conditions.isWeekend !== undefined) {
      const isWeekend = context.dayOfWeek === 0 || context.dayOfWeek === 6;
      matches = matches && (timeRate.conditions.isWeekend === isWeekend);
    }
    
    if (timeRate.conditions.isPeakHour !== undefined) {
      const isPeakHour = evaluatePeakHour(context.hour || 0);
      matches = matches && (timeRate.conditions.isPeakHour === isPeakHour);
    }
    
    if (matches) {
      multiplier = Math.max(multiplier, timeRate.rateMultiplier);
    }
  }
  
  return multiplier;
};
