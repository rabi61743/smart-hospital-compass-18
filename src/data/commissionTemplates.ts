
import { CommissionRuleTemplate } from "@/types/commission";

export const commissionRuleTemplates: CommissionRuleTemplate[] = [
  {
    id: 'doctor-consultation',
    name: 'Doctor Consultation',
    description: 'Standard percentage-based commission for consultations',
    type: 'doctor',
    rateType: 'percentage',
    rate: 15,
    category: 'consultation'
  },
  {
    id: 'doctor-surgery',
    name: 'Surgery Commission',
    description: 'Higher percentage for surgical procedures',
    type: 'doctor',
    rateType: 'percentage',
    rate: 18,
    category: 'surgery'
  },
  {
    id: 'agent-referral',
    name: 'Referral Agent',
    description: 'Fixed amount per successful referral',
    type: 'agent',
    rateType: 'fixed',
    rate: 850,
    category: 'referral'
  },
  {
    id: 'lab-percentage',
    name: 'Lab Commission',
    description: 'Percentage-based lab test commission',
    type: 'department',
    rateType: 'percentage',
    rate: 15,
    category: 'laboratory'
  },
  {
    id: 'pharmacy-tiered',
    name: 'Pharmacy Tiered',
    description: 'Tiered commission based on sales volume',
    type: 'department',
    rateType: 'tiered',
    rate: 10,
    category: 'pharmacy'
  }
];
