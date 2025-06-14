
import { CommissionRuleTemplate } from "@/types/commission";
import { commissionRuleTemplates } from "./commissionTemplates";
import { procedureCommissionTemplates } from "./procedureCommissionTemplates";

// Combine original templates with new procedure-specific templates
export const extendedCommissionTemplates: CommissionRuleTemplate[] = [
  ...commissionRuleTemplates,
  ...procedureCommissionTemplates
];

// Export categorized templates for easier navigation
export const templatesByCategory = {
  consultations: procedureCommissionTemplates.filter(t => 
    t.category.includes('consultation') || t.category.includes('checkup') || t.category.includes('exam')
  ),
  surgeries: procedureCommissionTemplates.filter(t => 
    t.category.includes('surgery')
  ),
  diagnostics: procedureCommissionTemplates.filter(t => 
    ['blood-test', 'x-ray', 'mri-scan', 'ct-scan', 'ultrasound', 'ecg', 'endoscopy'].includes(t.category)
  ),
  therapeutics: procedureCommissionTemplates.filter(t => 
    ['physiotherapy', 'chemotherapy', 'radiotherapy', 'dialysis'].includes(t.category)
  ),
  dental: procedureCommissionTemplates.filter(t => 
    t.category.includes('dental')
  ),
  pharmacy: procedureCommissionTemplates.filter(t => 
    t.category.includes('medicine') || t.category.includes('supplies')
  ),
  preventive: procedureCommissionTemplates.filter(t => 
    ['vaccination', 'health-screening'].includes(t.category)
  ),
  emergency: procedureCommissionTemplates.filter(t => 
    t.category.includes('emergency') || t.category.includes('ambulance')
  )
};
