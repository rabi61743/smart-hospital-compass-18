
import { AdvancedConditions } from './conditions';
import { TieredCommissionConfig } from './tieredCommission';

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
  advancedConditions?: AdvancedConditions;
  tieredConfig?: TieredCommissionConfig; // New field for complex tiered configurations
}

export interface CommissionRuleTemplate {
  id: string;
  name: string;
  description: string;
  type: 'doctor' | 'agent' | 'department';
  rateType: 'percentage' | 'fixed' | 'tiered';
  rate: number;
  category: string;
  advancedConditions?: AdvancedConditions;
  tieredConfig?: TieredCommissionConfig;
}
