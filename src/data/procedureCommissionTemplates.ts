
import { CommissionRuleTemplate } from "@/types/commission";

export const procedureCommissionTemplates: CommissionRuleTemplate[] = [
  // Consultation Templates
  {
    id: 'general-consultation-template',
    name: 'General Consultation Commission',
    description: 'Standard commission for general consultations',
    type: 'doctor',
    rateType: 'percentage',
    rate: 15,
    category: 'general-consultation'
  },
  {
    id: 'specialist-consultation-template',
    name: 'Specialist Consultation Commission',
    description: 'Higher commission for specialist consultations',
    type: 'doctor',
    rateType: 'percentage',
    rate: 20,
    category: 'specialist-consultation'
  },
  {
    id: 'emergency-consultation-template',
    name: 'Emergency Consultation Commission',
    description: 'Premium commission for emergency consultations',
    type: 'doctor',
    rateType: 'percentage',
    rate: 25,
    category: 'emergency-consultation'
  },
  
  // Surgery Templates
  {
    id: 'minor-surgery-template',
    name: 'Minor Surgery Commission',
    description: 'Commission for minor surgical procedures',
    type: 'doctor',
    rateType: 'percentage',
    rate: 18,
    category: 'minor-surgery'
  },
  {
    id: 'major-surgery-template',
    name: 'Major Surgery Commission',
    description: 'Higher commission for major surgical procedures',
    type: 'doctor',
    rateType: 'percentage',
    rate: 22,
    category: 'major-surgery'
  },
  {
    id: 'cardiac-surgery-template',
    name: 'Cardiac Surgery Commission',
    description: 'Premium commission for cardiac procedures',
    type: 'doctor',
    rateType: 'percentage',
    rate: 28,
    category: 'cardiac-surgery'
  },
  {
    id: 'neurological-surgery-template',
    name: 'Neurological Surgery Commission',
    description: 'Premium commission for neurological procedures',
    type: 'doctor',
    rateType: 'percentage',
    rate: 30,
    category: 'neurological-surgery'
  },
  
  // Diagnostic Templates
  {
    id: 'blood-test-template',
    name: 'Blood Test Commission',
    description: 'Fixed commission per blood test',
    type: 'department',
    rateType: 'fixed',
    rate: 50,
    category: 'blood-test'
  },
  {
    id: 'mri-scan-template',
    name: 'MRI Scan Commission',
    description: 'Percentage commission for MRI scans',
    type: 'department',
    rateType: 'percentage',
    rate: 12,
    category: 'mri-scan'
  },
  {
    id: 'ct-scan-template',
    name: 'CT Scan Commission',
    description: 'Percentage commission for CT scans',
    type: 'department',
    rateType: 'percentage',
    rate: 15,
    category: 'ct-scan'
  },
  
  // Therapeutic Templates
  {
    id: 'chemotherapy-template',
    name: 'Chemotherapy Commission',
    description: 'Commission for chemotherapy sessions',
    type: 'doctor',
    rateType: 'percentage',
    rate: 20,
    category: 'chemotherapy'
  },
  {
    id: 'physiotherapy-template',
    name: 'Physiotherapy Commission',
    description: 'Fixed commission per physiotherapy session',
    type: 'doctor',
    rateType: 'fixed',
    rate: 200,
    category: 'physiotherapy'
  },
  
  // Dental Templates
  {
    id: 'dental-cleaning-template',
    name: 'Dental Cleaning Commission',
    description: 'Fixed commission for dental cleaning',
    type: 'doctor',
    rateType: 'fixed',
    rate: 150,
    category: 'dental-cleaning'
  },
  {
    id: 'dental-implant-template',
    name: 'Dental Implant Commission',
    description: 'Percentage commission for dental implants',
    type: 'doctor',
    rateType: 'percentage',
    rate: 25,
    category: 'dental-implant'
  },
  
  // Eye Care Templates
  {
    id: 'cataract-surgery-template',
    name: 'Cataract Surgery Commission',
    description: 'Commission for cataract surgery procedures',
    type: 'doctor',
    rateType: 'percentage',
    rate: 22,
    category: 'cataract-surgery'
  },
  
  // Pharmacy Templates
  {
    id: 'prescription-medicine-template',
    name: 'Prescription Medicine Commission',
    description: 'Percentage commission on prescription sales',
    type: 'department',
    rateType: 'percentage',
    rate: 8,
    category: 'prescription-medicine'
  },
  {
    id: 'medical-supplies-template',
    name: 'Medical Supplies Commission',
    description: 'Commission on medical supplies sales',
    type: 'department',
    rateType: 'percentage',
    rate: 12,
    category: 'medical-supplies'
  },
  
  // Preventive Care Templates
  {
    id: 'vaccination-template',
    name: 'Vaccination Commission',
    description: 'Fixed commission per vaccination',
    type: 'doctor',
    rateType: 'fixed',
    rate: 75,
    category: 'vaccination'
  },
  {
    id: 'health-screening-template',
    name: 'Health Screening Commission',
    description: 'Commission for comprehensive health screenings',
    type: 'doctor',
    rateType: 'percentage',
    rate: 18,
    category: 'health-screening'
  }
];
