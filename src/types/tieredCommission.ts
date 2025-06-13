
export interface TieredRate {
  id: string;
  minAmount: number;
  maxAmount?: number;
  rate: number;
  rateType: 'percentage' | 'fixed';
  description?: string;
}

export interface TieredCommissionConfig {
  id: string;
  name: string;
  tiers: TieredRate[];
  cumulativeCalculation: boolean; // Whether to apply rates cumulatively or use bracket system
  baseAmount?: number; // Optional base amount that doesn't earn commission
}

export interface TieredCalculationResult {
  totalCommission: number;
  tierBreakdown: {
    tierId: string;
    tierDescription: string;
    amountInTier: number;
    rate: number;
    rateType: 'percentage' | 'fixed';
    commission: number;
  }[];
  effectiveRate: number; // Overall effective rate as percentage
}
