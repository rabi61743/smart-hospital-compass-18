
import { CommissionRule } from '@/types/commission';
import { Transaction, CommissionResult } from '@/types/transaction';
import { isRuleApplicable, calculateRuleCommission } from './commissionCalculations';

export class CommissionCalculator {
  private rules: CommissionRule[];

  constructor(rules: CommissionRule[]) {
    this.rules = rules.filter(rule => rule.isActive);
  }

  calculateCommission(transaction: Transaction): CommissionResult {
    const calculations = [];
    
    // Find applicable rules for this transaction
    const applicableRules = this.rules.filter(rule => 
      rule.type === transaction.type && isRuleApplicable(rule, transaction)
    );

    for (const rule of applicableRules) {
      const calculation = calculateRuleCommission(rule, transaction);
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
