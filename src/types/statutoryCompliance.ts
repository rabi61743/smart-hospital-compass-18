
export interface StatutoryCompliance {
  id: string;
  complianceType: 'labor_law' | 'government_reporting' | 'form_filing' | 'audit_requirement';
  title: string;
  description: string;
  regulation: string;
  frequency: 'monthly' | 'quarterly' | 'annually' | 'one-time';
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
  documents: ComplianceDocument[];
  reminderDays: number;
  penaltyInfo?: string;
}

export interface ComplianceDocument {
  id: string;
  name: string;
  type: 'form' | 'certificate' | 'report' | 'declaration';
  templatePath?: string;
  generatedPath?: string;
  status: 'template' | 'generated' | 'filed' | 'acknowledged';
  filedAt?: string;
  acknowledgmentNumber?: string;
}

export interface GovernmentForm {
  id: string;
  formCode: string;
  formName: string;
  department: 'labour' | 'pf' | 'esi' | 'income_tax' | 'professional_tax';
  frequency: 'monthly' | 'quarterly' | 'annually';
  template: FormTemplate;
  autoGenerate: boolean;
  fields: FormField[];
}

export interface FormTemplate {
  id: string;
  name: string;
  version: string;
  fields: FormField[];
  validationRules: ValidationRule[];
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'currency';
  required: boolean;
  defaultValue?: string;
  options?: string[];
  validation?: string;
  dataSource?: 'payroll' | 'employee' | 'manual';
}

export interface ValidationRule {
  field: string;
  rule: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

export interface ComplianceAudit {
  id: string;
  auditType: 'internal' | 'government' | 'third_party';
  auditor: string;
  scheduledDate: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'follow_up_required';
  findings: AuditFinding[];
  compliance_score: number;
  recommendations: string[];
}

export interface AuditFinding {
  id: string;
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
  status: 'open' | 'in_progress' | 'resolved';
  dueDate: string;
}
