
import { Employee, SalaryBreakdown } from './salary';

export interface Payslip {
  id: string;
  employeeId: string;
  employee: Employee;
  payPeriod: string;
  payDate: string;
  salaryBreakdown: SalaryBreakdown;
  payrollRunId: string;
  status: 'draft' | 'generated' | 'sent' | 'viewed' | 'downloaded';
  generatedAt: string;
  sentAt?: string;
  viewedAt?: string;
  downloadedAt?: string;
  emailStatus: 'pending' | 'sent' | 'delivered' | 'failed';
  notes?: string;
}

export interface PayslipTemplate {
  id: string;
  name: string;
  companyLogo?: string;
  headerColor: string;
  fontFamily: string;
  includeSignature: boolean;
  customFields: PayslipCustomField[];
  footerText?: string;
  isDefault: boolean;
}

export interface PayslipCustomField {
  id: string;
  label: string;
  value: string;
  position: 'header' | 'body' | 'footer';
  isVisible: boolean;
}

export interface PayslipDistribution {
  id: string;
  payrollRunId: string;
  payslipIds: string[];
  distributionMethod: 'email' | 'portal' | 'both';
  scheduledAt?: string;
  completedAt?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  summary: {
    total: number;
    sent: number;
    failed: number;
    pending: number;
  };
}

export interface EmployeePortalAccess {
  employeeId: string;
  accessToken: string;
  lastLoginAt?: string;
  payslipsViewed: string[];
  notificationPreferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    portalNotifications: boolean;
  };
}
