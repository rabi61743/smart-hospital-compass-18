
import { CommissionRule } from "@/types/commission";

export const initialCommissionRules: CommissionRule[] = [
  {
    id: '1',
    name: 'Standard Doctor Consultation',
    type: 'doctor',
    rateType: 'percentage',
    rate: 15,
    conditions: 'Per consultation completed',
    isActive: true,
    category: 'consultation'
  },
  {
    id: '2',
    name: 'Surgery Commission',
    type: 'doctor',
    rateType: 'percentage',
    rate: 18,
    minAmount: 5000,
    conditions: 'Major surgical procedures',
    isActive: true,
    category: 'surgery',
    advancedConditions: {
      logic: 'AND',
      conditions: [
        {
          id: '1',
          field: 'amount',
          operator: 'gt',
          value: 50000,
          rateOverride: {
            rateType: 'percentage',
            rate: 25
          }
        }
      ]
    }
  },
  {
    id: '3',
    name: 'Referral Agent Standard',
    type: 'agent',
    rateType: 'fixed',
    rate: 850,
    conditions: 'Per successful patient referral',
    isActive: true,
    category: 'referral',
    advancedConditions: {
      logic: 'OR',
      conditions: [
        {
          id: '1',
          field: 'amount',
          operator: 'between',
          value: 10000,
          secondValue: 50000,
          rateOverride: {
            rateType: 'fixed',
            rate: 1200
          }
        },
        {
          id: '2',
          field: 'amount',
          operator: 'gt',
          value: 50000,
          rateOverride: {
            rateType: 'percentage',
            rate: 3
          }
        }
      ]
    }
  }
];
