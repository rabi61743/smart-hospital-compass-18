import { CommissionRule } from '@/types/commission';
import { Transaction, CommissionCalculation } from '@/types/transaction';
import { evaluateAdvancedConditions, calculateConditionalRate, calculateTimeBasedMultiplier, EvaluationContext } from '../conditionEvaluator';
import { TieredCommissionCalculator } from './tieredCommissionCalculator';

export const isRuleApplicable = (rule: CommissionRule, transaction: Transaction): boolean => {
  // Check basic conditions
  if (rule.minAmount && transaction.amount < rule.minAmount) return false;
  if (rule.maxAmount && transaction.amount > rule.maxAmount) return false;
  if (rule.category && rule.category.toLowerCase() !== transaction.category.toLowerCase()) return false;

  // Check advanced conditions
  if (rule.advancedConditions && rule.advancedConditions.conditions.length > 0) {
    const context = createEvaluationContext(transaction);
    return evaluateAdvancedConditions(rule.advancedConditions, context);
  }

  return true;
};

const createEvaluationContext = (transaction: Transaction): EvaluationContext => {
  const date = transaction.date;
  return {
    amount: transaction.amount,
    quantity: transaction.quantity,
    category: transaction.category,
    type: transaction.type,
    date: date,
    time: date.toTimeString().slice(0, 5), // "HH:MM" format
    dayOfWeek: date.getDay(),
    hour: date.getHours()
  };
};

export const calculateRuleCommission = (rule: CommissionRule, transaction: Transaction): CommissionCalculation | null => {
  const context = createEvaluationContext(transaction);

  // Get the effective rate (considering conditional rates)
  let effectiveRate = { rateType: rule.rateType as 'percentage' | 'fixed' | 'tiered', rate: rule.rate };
  
  if (rule.advancedConditions && rule.advancedConditions.conditions.length > 0) {
    const conditionalRate = calculateConditionalRate(
      rule.advancedConditions,
      context,
      { rateType: rule.rateType, rate: rule.rate }
    );
    effectiveRate = { 
      rateType: conditionalRate.rateType as 'percentage' | 'fixed' | 'tiered', 
      rate: conditionalRate.rate 
    };
  }

  // Calculate time-based multiplier
  const timeMultiplier = calculateTimeBasedMultiplier(rule.timeBasedRates || [], context);

  let commission = 0;
  let details = '';

  switch (effectiveRate.rateType) {
    case 'percentage':
      commission = (transaction.amount * effectiveRate.rate * timeMultiplier) / 100;
      details = `${effectiveRate.rate}% of ₹${transaction.amount}`;
      if (timeMultiplier !== 1) {
        details += ` × ${timeMultiplier} (time-based)`;
      }
      break;
    
    case 'fixed':
      commission = effectiveRate.rate * transaction.quantity * timeMultiplier;
      details = `₹${effectiveRate.rate} × ${transaction.quantity} units`;
      if (timeMultiplier !== 1) {
        details += ` × ${timeMultiplier} (time-based)`;
      }
      break;
    
    case 'tiered':
      if (rule.tieredConfig) {
        const tieredResult = TieredCommissionCalculator.calculateTieredCommission(
          transaction.amount,
          rule.tieredConfig
        );
        commission = tieredResult.totalCommission * timeMultiplier;
        details = `Tiered calculation (${tieredResult.effectiveRate}% effective rate) on ₹${transaction.amount}`;
        if (timeMultiplier !== 1) {
          details += ` × ${timeMultiplier} (time-based)`;
        }
      } else {
        commission = calculateTieredCommission(transaction.amount, effectiveRate.rate) * timeMultiplier;
        details = `Simple tiered calculation on ₹${transaction.amount}`;
        if (timeMultiplier !== 1) {
          details += ` × ${timeMultiplier} (time-based)`;
        }
      }
      break;
  }

  return {
    transactionId: transaction.id,
    ruleId: rule.id,
    ruleName: rule.name,
    amount: transaction.amount,
    rate: effectiveRate.rate,
    rateType: effectiveRate.rateType,
    commission: Math.round(commission * 100) / 100,
    details
  };
};

export const calculateTieredCommission = (amount: number, baseRate: number): number => {
  // Simple tiered structure - can be made more sophisticated
  if (amount <= 10000) {
    return (amount * baseRate) / 100;
  } else if (amount <= 50000) {
    return (10000 * baseRate) / 100 + ((amount - 10000) * (baseRate + 2)) / 100;
  } else {
    return (10000 * baseRate) / 100 + (40000 * (baseRate + 2)) / 100 + ((amount - 50000) * (baseRate + 5)) / 100;
  }
};

export const getTieredCommissionBreakdown = (rule: CommissionRule, transaction: Transaction) => {
  if (rule.rateType === 'tiered' && rule.tieredConfig) {
    return TieredCommissionCalculator.calculateTieredCommission(
      transaction.amount,
      rule.tieredConfig
    );
  }
  return null;
};
