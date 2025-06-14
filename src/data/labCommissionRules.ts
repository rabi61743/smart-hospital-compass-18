
import { CommissionRule } from "@/types/commission";

export const labCommissionRules: CommissionRule[] = [
  {
    id: 'lab-blood-test-standard',
    name: 'Blood Test Standard Commission',
    type: 'doctor',
    rateType: 'percentage',
    rate: 12,
    conditions: 'Standard commission for blood test referrals',
    isActive: true,
    category: 'blood-tests',
    minAmount: 100,
    maxAmount: 2000
  },
  {
    id: 'lab-imaging-mri-premium',
    name: 'MRI & Advanced Imaging Premium',
    type: 'doctor',
    rateType: 'percentage',
    rate: 18,
    conditions: 'Higher commission for expensive imaging procedures',
    isActive: true,
    category: 'imaging',
    minAmount: 3000,
    advancedConditions: {
      logic: 'OR',
      conditions: [
        {
          id: 'mri-high-value',
          field: 'amount',
          operator: 'gt',
          value: 8000,
          rateOverride: {
            rateType: 'percentage',
            rate: 22
          }
        }
      ]
    }
  },
  {
    id: 'lab-imaging-xray-standard',
    name: 'X-Ray & Basic Imaging',
    type: 'doctor',
    rateType: 'fixed',
    rate: 75,
    conditions: 'Fixed commission for basic imaging procedures',
    isActive: true,
    category: 'imaging',
    maxAmount: 1000
  },
  {
    id: 'lab-pathology-biopsy',
    name: 'Pathology & Biopsy Analysis',
    type: 'doctor',
    rateType: 'percentage',
    rate: 15,
    conditions: 'Commission for pathology and tissue analysis',
    isActive: true,
    category: 'pathology',
    minAmount: 500
  },
  {
    id: 'lab-microbiology-culture',
    name: 'Microbiology Culture Tests',
    type: 'doctor',
    rateType: 'percentage',
    rate: 10,
    conditions: 'Commission for bacterial culture and sensitivity tests',
    isActive: true,
    category: 'microbiology',
    minAmount: 200,
    maxAmount: 1500
  },
  {
    id: 'lab-volume-bonus',
    name: 'High Volume Lab Referral Bonus',
    type: 'doctor',
    rateType: 'tiered',
    rate: 5,
    conditions: 'Volume-based bonus for doctors referring multiple tests',
    isActive: true,
    category: 'all',
    advancedConditions: {
      logic: 'AND',
      conditions: [
        {
          id: 'high-volume-tier-1',
          field: 'quantity',
          operator: 'gt',
          value: 10,
          rateOverride: {
            rateType: 'percentage',
            rate: 8
          }
        },
        {
          id: 'high-volume-tier-2',
          field: 'quantity',
          operator: 'gt',
          value: 20,
          rateOverride: {
            rateType: 'percentage',
            rate: 12
          }
        }
      ]
    }
  }
];
