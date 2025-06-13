
export interface CommissionRule {
  id: string;
  name: string;
  type: 'doctor' | 'agent' | 'department';
  rateType: 'percentage' | 'fixed' | 'tiered';
  rate: number;
  minAmount?: number;
  maxAmount?: number;
  conditions: string;
  isActive: boolean;
  category: string;
}

export interface CommissionRuleTemplate {
  id: string;
  name: string;
  description: string;
  type: 'doctor' | 'agent' | 'department';
  rateType: 'percentage' | 'fixed' | 'tiered';
  rate: number;
  category: string;
}
