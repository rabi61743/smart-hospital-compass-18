
export interface HospitalBranch {
  id: string;
  name: string;
  code: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    fax?: string;
  };
  isActive: boolean;
  timezone: string;
  currency: string;
  commissionSettings: {
    defaultRateMultiplier: number;
    enableLocationSpecificRules: boolean;
    inheritFromMain: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface LocationSpecificCommissionRule {
  id: string;
  baseRuleId: string;
  locationId: string;
  locationName: string;
  rateOverride?: number;
  rateMultiplier?: number;
  minAmountOverride?: number;
  maxAmountOverride?: number;
  isActive: boolean;
  effectiveFrom: Date;
  effectiveTo?: Date;
  notes?: string;
}

export interface MultiLocationCommissionSummary {
  locationId: string;
  locationName: string;
  totalCalculated: number;
  totalPaid: number;
  totalDiscrepancy: number;
  commissionCount: number;
  topPerformers: Array<{
    name: string;
    amount: number;
    type: 'doctor' | 'agent' | 'department';
  }>;
}
