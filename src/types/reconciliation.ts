
export interface PaidCommission {
  id: string;
  doctorId: string;
  doctorName: string;
  department: string;
  period: string; // "2024-01" format
  paidAmount: number;
  paymentDate: Date;
  paymentMethod: 'bank_transfer' | 'cash' | 'check';
  referenceNumber: string;
  notes?: string;
}

export interface CalculatedCommission {
  id: string;
  doctorId: string;
  doctorName: string;
  department: string;
  period: string;
  calculatedAmount: number;
  transactionCount: number;
  lastCalculated: Date;
}

export interface CommissionDiscrepancy {
  id: string;
  doctorId: string;
  doctorName: string;
  department: string;
  period: string;
  calculatedAmount: number;
  paidAmount: number;
  discrepancyAmount: number;
  discrepancyPercentage: number;
  status: 'under_paid' | 'over_paid' | 'matched';
  severity: 'low' | 'medium' | 'high';
  lastUpdated: Date;
}

export interface ReconciliationSummary {
  totalCalculated: number;
  totalPaid: number;
  totalDiscrepancy: number;
  discrepancyCount: number;
  matchedCount: number;
  underPaidCount: number;
  overPaidCount: number;
}
