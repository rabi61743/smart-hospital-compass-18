
import { TieredCommissionConfig, TieredRate, TieredCalculationResult } from '@/types/tieredCommission';

export class TieredCommissionCalculator {
  
  static calculateTieredCommission(
    amount: number,
    config: TieredCommissionConfig
  ): TieredCalculationResult {
    const { tiers, cumulativeCalculation, baseAmount = 0 } = config;
    
    // Sort tiers by minimum amount
    const sortedTiers = [...tiers].sort((a, b) => a.minAmount - b.minAmount);
    
    let totalCommission = 0;
    let remainingAmount = Math.max(0, amount - baseAmount);
    const tierBreakdown: TieredCalculationResult['tierBreakdown'] = [];

    if (cumulativeCalculation) {
      // Cumulative calculation: each tier applies to its range
      for (const tier of sortedTiers) {
        if (remainingAmount <= 0) break;
        
        const tierMinAmount = Math.max(0, tier.minAmount - baseAmount);
        const tierMaxAmount = tier.maxAmount ? tier.maxAmount - baseAmount : Infinity;
        
        if (amount - baseAmount > tierMinAmount) {
          const amountInTier = Math.min(
            remainingAmount - Math.max(0, tierMinAmount - (amount - baseAmount - remainingAmount)),
            tierMaxAmount - tierMinAmount
          );
          
          if (amountInTier > 0) {
            const tierCommission = this.calculateTierCommission(amountInTier, tier);
            totalCommission += tierCommission;
            
            tierBreakdown.push({
              tierId: tier.id,
              tierDescription: tier.description || `₹${tier.minAmount.toLocaleString()}${tier.maxAmount ? ` - ₹${tier.maxAmount.toLocaleString()}` : '+'}`,
              amountInTier,
              rate: tier.rate,
              rateType: tier.rateType,
              commission: tierCommission
            });
          }
        }
      }
    } else {
      // Bracket system: find the applicable tier for the total amount
      const applicableTier = this.findApplicableTier(amount, sortedTiers);
      
      if (applicableTier) {
        const tierCommission = this.calculateTierCommission(remainingAmount, applicableTier);
        totalCommission = tierCommission;
        
        tierBreakdown.push({
          tierId: applicableTier.id,
          tierDescription: applicableTier.description || `₹${applicableTier.minAmount.toLocaleString()}${applicableTier.maxAmount ? ` - ₹${applicableTier.maxAmount.toLocaleString()}` : '+'}`,
          amountInTier: remainingAmount,
          rate: applicableTier.rate,
          rateType: applicableTier.rateType,
          commission: tierCommission
        });
      }
    }

    const effectiveRate = amount > 0 ? (totalCommission / amount) * 100 : 0;

    return {
      totalCommission: Math.round(totalCommission * 100) / 100,
      tierBreakdown,
      effectiveRate: Math.round(effectiveRate * 100) / 100
    };
  }

  private static calculateTierCommission(amount: number, tier: TieredRate): number {
    switch (tier.rateType) {
      case 'percentage':
        return (amount * tier.rate) / 100;
      case 'fixed':
        return tier.rate;
      default:
        return 0;
    }
  }

  private static findApplicableTier(amount: number, sortedTiers: TieredRate[]): TieredRate | null {
    for (let i = sortedTiers.length - 1; i >= 0; i--) {
      const tier = sortedTiers[i];
      if (amount >= tier.minAmount && (!tier.maxAmount || amount <= tier.maxAmount)) {
        return tier;
      }
    }
    return null;
  }

  // Predefined tiered commission configurations
  static getDefaultConfigurations(): TieredCommissionConfig[] {
    return [
      {
        id: 'standard-medical',
        name: 'Standard Medical Services',
        cumulativeCalculation: true,
        tiers: [
          {
            id: 'tier-1',
            minAmount: 0,
            maxAmount: 10000,
            rate: 5,
            rateType: 'percentage',
            description: 'Basic tier (₹0 - ₹10,000)'
          },
          {
            id: 'tier-2',
            minAmount: 10001,
            maxAmount: 50000,
            rate: 8,
            rateType: 'percentage',
            description: 'Standard tier (₹10,001 - ₹50,000)'
          },
          {
            id: 'tier-3',
            minAmount: 50001,
            rate: 12,
            rateType: 'percentage',
            description: 'Premium tier (₹50,001+)'
          }
        ]
      },
      {
        id: 'high-value-surgery',
        name: 'High-Value Surgery Commission',
        cumulativeCalculation: false,
        baseAmount: 10000,
        tiers: [
          {
            id: 'surgery-tier-1',
            minAmount: 10000,
            maxAmount: 100000,
            rate: 15,
            rateType: 'percentage',
            description: 'Standard surgery (₹10,000 - ₹1,00,000)'
          },
          {
            id: 'surgery-tier-2',
            minAmount: 100001,
            maxAmount: 500000,
            rate: 20,
            rateType: 'percentage',
            description: 'Complex surgery (₹1,00,001 - ₹5,00,000)'
          },
          {
            id: 'surgery-tier-3',
            minAmount: 500001,
            rate: 25,
            rateType: 'percentage',
            description: 'Premium surgery (₹5,00,001+)'
          }
        ]
      },
      {
        id: 'agent-referral-volume',
        name: 'Agent Referral Volume-Based',
        cumulativeCalculation: true,
        tiers: [
          {
            id: 'referral-tier-1',
            minAmount: 0,
            maxAmount: 25000,
            rate: 1000,
            rateType: 'fixed',
            description: 'Low value referrals (₹0 - ₹25,000)'
          },
          {
            id: 'referral-tier-2',
            minAmount: 25001,
            maxAmount: 100000,
            rate: 3,
            rateType: 'percentage',
            description: 'Medium value referrals (₹25,001 - ₹1,00,000)'
          },
          {
            id: 'referral-tier-3',
            minAmount: 100001,
            rate: 5,
            rateType: 'percentage',
            description: 'High value referrals (₹1,00,001+)'
          }
        ]
      }
    ];
  }
}
