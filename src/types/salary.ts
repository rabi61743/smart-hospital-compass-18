
export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  basicSalary: number;
  hourlyRate?: number;
}

export interface OvertimeRecord {
  id: string;
  employeeId: string;
  date: string;
  hours: number;
  rate: number; // multiplier (1.5x, 2x etc)
  approved: boolean;
}

export interface Bonus {
  id: string;
  employeeId: string;
  type: 'performance' | 'annual' | 'festival' | 'other';
  amount: number;
  description: string;
  date: string;
}

export interface Commission {
  id: string;
  employeeId: string;
  amount: number;
  percentage?: number;
  salesAmount?: number;
  description: string;
  date: string;
}

export interface Deduction {
  id: string;
  employeeId: string;
  type: 'tax' | 'pf' | 'esi' | 'loan' | 'advance' | 'other';
  amount: number;
  percentage?: number;
  description: string;
  mandatory: boolean;
}

export interface SalaryCalculation {
  employeeId: string;
  basicPay: number;
  overtimePay: number;
  bonuses: number;
  commissions: number;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  payPeriod: string;
}

export interface SalaryBreakdown {
  basicPay: number;
  hra: number;
  da: number;
  medicalAllowance: number;
  transportAllowance: number;
  overtimePay: number;
  bonuses: Bonus[];
  commissions: Commission[];
  grossSalary: number;
  incomeTax: number;
  pf: number;
  esi: number;
  otherDeductions: Deduction[];
  totalDeductions: number;
  netSalary: number;
}
