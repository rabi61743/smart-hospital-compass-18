
import { CommissionRule } from '@/types/commission';
import { Transaction, CommissionCalculation } from '@/types/transaction';
import { evaluateAdvancedConditions, calculateConditionalRate, EvaluationContext } from '../conditionEvaluator';

export const isRuleApplicable = (rule: CommissionRule, transaction: Transaction): boolean => {
  // Check basic conditions
  if (rule.minAmount && transaction.amount < rule.minAmount) return false;
  if (rule.maxAmount && transaction.amount > rule.maxAmount) return false;
  if (rule.category && rule.category.toLowerCase() !== transaction.category.toLowerCase()) return false;

  // Check advanced conditions
  if (rule.advancedConditions && rule.advancedConditions.conditions.length > 0) {
    const context: EvaluationContext = {
      amount: transaction.amount,
      quantity: transaction.quantity,
      category: transaction.category,
      type: transaction.type,
      date: transaction.date
    };
    
    return evaluateAdvancedConditions(rule.advancedConditions, context);
  }

  return true;
};

export const calculateRuleCommission = (rule: CommissionRule, transaction: Transaction): CommissionCalculation | null => {
  const context: EvaluationContext = {
    amount: transaction.amount,
    quantity: transaction.quantity,
    category: transaction.category,
    type: transaction.type,
    date: transaction.date
  };

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

  let commission = 0;
  let details = '';

  switch (effectiveRate.rateType) {
    case 'percentage':
      commission = (transaction.amount * effectiveRate.rate) / 100;
      details = `${effectiveRate.rate}% of ₹${transaction.amount}`;
      break;
    
    case 'fixed':
      commission = effectiveRate.rate * transaction.quantity;
      details = `₹${effectiveRate.rate} × ${transaction.quantity} units`;
      break;
    
    case 'tiered':
      commission = calculateTieredCommission(transaction.amount, effectiveRate.rate);
      details = `Tiered calculation on ₹${transaction.amount}`;
      break;
  }

  return {
    transactionId: transaction.id,
    ruleId: rule.id,
    ruleName: rule.name,
    amount: transaction.amount,
    rate: effectiveRate.rate,
    rateType: effectiveRate.rateType,
    commission: Math.round(commission * 100) / 100, // Round to 2 decimal places
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
