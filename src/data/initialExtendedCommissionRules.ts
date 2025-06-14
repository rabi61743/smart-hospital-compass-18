
import { CommissionRule } from "@/types/commission";

export const initialExtendedCommissionRules: CommissionRule[] = [
  // General Consultation Rules
  {
    id: 'general-consultation-rule',
    name: 'General Consultation Standard',
    type: 'doctor',
    rateType: 'percentage',
    rate: 15,
    conditions: 'Standard commission for general consultations',
    isActive: true,
    category: 'general-consultation'
  },
  {
    id: 'specialist-consultation-rule',
    name: 'Specialist Consultation Premium',
    type: 'doctor',
    rateType: 'percentage',
    rate: 20,
    conditions: 'Higher rate for specialist consultations',
    isActive: true,
    category: 'specialist-consultation'
  },
  
  // Surgery Rules with Tiered Pricing
  {
    id: 'cardiac-surgery-rule',
    name: 'Cardiac Surgery Premium',
    type: 'doctor',
    rateType: 'tiered',
    rate: 25,
    minAmount: 50000,
    conditions: 'Tiered commission for cardiac procedures',
    isActive: true,
    category: 'cardiac-surgery',
    advancedConditions: {
      logic: 'AND',
      conditions: [
        {
          id: 'cardiac-tier-1',
          field: 'amount',
          operator: 'between',
          value: 50000,
          secondValue: 200000,
          rateOverride: {
            rateType: 'percentage',
            rate: 25
          }
        },
        {
          id: 'cardiac-tier-2',
          field: 'amount',
          operator: 'gt',
          value: 200000,
          rateOverride: {
            rateType: 'percentage',
            rate: 30
          }
        }
      ]
    }
  },
  
  // Diagnostic Rules
  {
    id: 'mri-scan-rule',
    name: 'MRI Scan Commission',
    type: 'department',
    rateType: 'percentage',
    rate: 12,
    conditions: 'Commission for MRI scanning services',
    isActive: true,
    category: 'mri-scan'
  },
  {
    id: 'blood-test-rule',
    name: 'Blood Test Fixed Rate',
    type: 'department',
    rateType: 'fixed',
    rate: 50,
    conditions: 'Fixed commission per blood test',
    isActive: true,
    category: 'blood-test'
  },
  
  // Dental Rules
  {
    id: 'dental-implant-rule',
    name: 'Dental Implant Premium',
    type: 'doctor',
    rateType: 'percentage',
    rate: 25,
    minAmount: 15000,
    conditions: 'Premium rate for dental implant procedures',
    isActive: true,
    category: 'dental-implant'
  },
  
  // Pharmacy Rules
  {
    id: 'prescription-medicine-rule',
    name: 'Prescription Medicine Sales',
    type: 'department',
    rateType: 'percentage',
    rate: 8,
    conditions: 'Commission on prescription medication sales',
    isActive: true,
    category: 'prescription-medicine'
  },
  
  // Therapeutic Rules
  {
    id: 'chemotherapy-rule',
    name: 'Chemotherapy Treatment',
    type: 'doctor',
    rateType: 'percentage',
    rate: 20,
    minAmount: 5000,
    conditions: 'Commission for chemotherapy administration',
    isActive: true,
    category: 'chemotherapy'
  },
  
  // Preventive Care Rules
  {
    id: 'vaccination-rule',
    name: 'Vaccination Service',
    type: 'doctor',
    rateType: 'fixed',
    rate: 75,
    conditions: 'Fixed commission per vaccination administered',
    isActive: true,
    category: 'vaccination'
  },
  
  // Emergency Rules
  {
    id: 'emergency-consultation-rule',
    name: 'Emergency Consultation Premium',
    type: 'doctor',
    rateType: 'percentage',
    rate: 25,
    conditions: 'Premium rate for emergency consultations',
    isActive: true,
    category: 'emergency-consultation'
  }
];
