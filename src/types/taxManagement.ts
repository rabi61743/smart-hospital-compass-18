
export interface TaxConfiguration {
  id: string;
  taxType: 'income_tax' | 'pf' | 'esi' | 'professional_tax';
  rate: number;
  minThreshold?: number;
  maxThreshold?: number;
  isPercentage: boolean;
  isActive: boolean;
  effectiveFrom: string;
  effectiveTo?: string;
}

export interface EmployeeTaxDetails {
  employeeId: string;
  panNumber: string;
  pfNumber?: string;
  esiNumber?: string;
  taxRegime: 'old' | 'new';
  exemptions: TaxExemption[];
  investments: TaxInvestment[];
}

export interface TaxExemption {
  id: string;
  section: string;
  description: string;
  amount: number;
  documentPath?: string;
  approved: boolean;
}

export interface TaxInvestment {
  id: string;
  investmentType: string;
  section: string;
  amount: number;
  documentPath?: string;
  approved: boolean;
}

export interface TaxCalculationResult {
  employeeId: string;
  payrollPeriod: string;
  grossSalary: number;
  taxableIncome: number;
  incomeTax: number;
  pf: number;
  esi: number;
  professionalTax: number;
  totalTax: number;
  netSalary: number;
  calculatedAt: string;
}

export interface TaxFiling {
  id: string;
  filingType: 'tds' | 'pf' | 'esi' | 'professional_tax';
  period: string;
  dueDate: string;
  status: 'pending' | 'filed' | 'acknowledged' | 'overdue';
  amount: number;
  filedAt?: string;
  acknowledgmentNumber?: string;
}

export interface TaxReport {
  id: string;
  reportType: 'form16' | 'form12ba' | 'tds_certificate' | 'pf_statement';
  employeeId?: string;
  period: string;
  generatedAt: string;
  documentPath: string;
}

export interface TaxCompliance {
  id: string;
  complianceType: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
}
