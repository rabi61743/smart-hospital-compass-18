
import { Employee, SalaryBreakdown } from './salary';

export interface PayrollRun {
  id: string;
  name: string;
  payPeriod: string;
  startDate: string;
  endDate: string;
  payDate: string;
  frequency: 'weekly' | 'bi-weekly' | 'monthly';
  status: 'draft' | 'calculating' | 'calculated' | 'approved' | 'processed' | 'completed';
  totalEmployees: number;
  totalGrossPay: number;
  totalDeductions: number;
  totalNetPay: number;
  createdAt: string;
  processedAt?: string;
  approvedBy?: string;
}

export interface PayrollEntry {
  id: string;
  payrollRunId: string;
  employeeId: string;
  employee: Employee;
  salaryBreakdown: SalaryBreakdown;
  status: 'pending' | 'calculated' | 'approved' | 'processed' | 'error';
  corrections: PayrollCorrection[];
  notes?: string;
  calculatedAt?: string;
  processedAt?: string;
}

export interface PayrollCorrection {
  id: string;
  payrollEntryId: string;
  type: 'adjustment' | 'bonus' | 'deduction' | 'overtime' | 'manual';
  description: string;
  amount: number;
  reason: string;
  appliedBy: string;
  appliedAt: string;
  approved: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export interface BulkProcessingOptions {
  includeDepartments: string[];
  excludeEmployees: string[];
  autoApprove: boolean;
  sendNotifications: boolean;
  generatePayslips: boolean;
}

export interface PayrollBatch {
  id: string;
  payrollRunId: string;
  entries: PayrollEntry[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  errors: string[];
}
