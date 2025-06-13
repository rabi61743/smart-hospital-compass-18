
import { CommissionRule } from '@/types/commission';
import { evaluateAdvancedConditions, calculateConditionalRate, EvaluationContext } from './conditionEvaluator';

export interface Transaction {
  id: string;
  amount: number;
  quantity: number;
  category: string;
  type: 'doctor' | 'agent' | 'department';
  date: Date;
  description?: string;
  patientId?: string;
  serviceId?: string;
}

export interface CommissionCalculation {
  transactionId: string;
  ruleId: string;
  ruleName: string;
  amount: number;
  rate: number;
  rateType: 'percentage' | 'fixed' | 'tiered';
  commission: number;
  details: string;
}

export interface CommissionResult {
  transaction: Transaction;
  calculations: CommissionCalculation[];
  totalCommission: number;
  applicableRules: number;
}

export class CommissionCalculator {
  private rules: CommissionRule[];

  constructor(rules: CommissionRule[]) {
    this.rules = rules.filter(rule => rule.isActive);
  }

  calculateCommission(transaction: Transaction): CommissionResult {
    const calculations: CommissionCalculation[] = [];
    
    // Find applicable rules for this transaction
    const applicableRules = this.rules.filter(rule => 
      rule.type === transaction.type && this.isRuleApplicable(rule, transaction)
    );

    for (const rule of applicableRules) {
      const calculation = this.calculateRuleCommission(rule, transaction);
      if (calculation) {
        calculations.push(calculation);
      }
    }

    const totalCommission = calculations.reduce((sum, calc) => sum + calc.commission, 0);

    return {
      transaction,
      calculations,
      totalCommission,
      applicableRules: applicableRules.length
    };
  }

  calculateBatchCommissions(transactions: Transaction[]): CommissionResult[] {
    return transactions.map(transaction => this.calculateCommission(transaction));
  }

  private isRuleApplicable(rule: CommissionRule, transaction: Transaction): boolean {
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
  }

  private calculateRuleCommission(rule: CommissionRule, transaction: Transaction): CommissionCalculation | null {
    const context: EvaluationContext = {
      amount: transaction.amount,
      quantity: transaction.quantity,
      category: transaction.category,
      type: transaction.type,
      date: transaction.date
    };

    // Get the effective rate (considering conditional rates)
    let effectiveRate = { rateType: rule.rateType, rate: rule.rate };
    
    if (rule.advancedConditions && rule.advancedConditions.conditions.length > 0) {
      effectiveRate = calculateConditionalRate(
        rule.advancedConditions,
        context,
        { rateType: rule.rateType, rate: rule.rate }
      );
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
        commission = this.calculateTieredCommission(transaction.amount, effectiveRate.rate);
        details = `Tiered calculation on ₹${transaction.amount}`;
        break;
    }

    return {
      transactionId: transaction.id,
      ruleId: rule.id,
      ruleName: rule.name,
      amount: transaction.amount,
      rate: effectiveRate.rate,
      rateType: effectiveRate.rateType as 'percentage' | 'fixed' | 'tiered',
      commission: Math.round(commission * 100) / 100, // Round to 2 decimal places
      details
    };
  }

  private calculateTieredCommission(amount: number, baseRate: number): number {
    // Simple tiered structure - can be made more sophisticated
    if (amount <= 10000) {
      return (amount * baseRate) / 100;
    } else if (amount <= 50000) {
      return (10000 * baseRate) / 100 + ((amount - 10000) * (baseRate + 2)) / 100;
    } else {
      return (10000 * baseRate) / 100 + (40000 * (baseRate + 2)) / 100 + ((amount - 50000) * (baseRate + 5)) / 100;
    }
  }

  // Summary methods
  getTotalCommissionByRule(transactions: Transaction[]): Record<string, number> {
    const results = this.calculateBatchCommissions(transactions);
    const totals: Record<string, number> = {};

    results.forEach(result => {
      result.calculations.forEach(calc => {
        if (!totals[calc.ruleName]) {
          totals[calc.ruleName] = 0;
        }
        totals[calc.ruleName] += calc.commission;
      });
    });

    return totals;
  }

  getTotalCommissionByType(transactions: Transaction[]): Record<string, number> {
    const results = this.calculateBatchCommissions(transactions);
    const totals: Record<string, number> = {};

    results.forEach(result => {
      const type = result.transaction.type;
      if (!totals[type]) {
        totals[type] = 0;
      }
      totals[type] += result.totalCommission;
    });

    return totals;
  }
}

// Helper function to create sample transactions for testing
export const createSampleTransactions = (): Transaction[] => [
  {
    id: '1',
    amount: 5000,
    quantity: 1,
    category: 'consultation',
    type: 'doctor',
    date: new Date(),
    description: 'General consultation'
  },
  {
    id: '2',
    amount: 75000,
    quantity: 1,
    category: 'surgery',
    type: 'doctor',
    date: new Date(),
    description: 'Cardiac surgery'
  },
  {
    id: '3',
    amount: 15000,
    quantity: 1,
    category: 'referral',
    type: 'agent',
    date: new Date(),
    description: 'Patient referral'
  }
];
