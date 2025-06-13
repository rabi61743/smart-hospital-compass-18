
export interface Transaction {
  id: string;
  amount: number;
  quantity: number;
  category: string;
  type: 'doctor' | 'agent' | 'department';
  date: Date;
  description?: string;
  patientId?: string;
  serviceId?: string;
}

export interface CommissionCalculation {
  transactionId: string;
  ruleId: string;
  ruleName: string;
  amount: number;
  rate: number;
  rateType: 'percentage' | 'fixed' | 'tiered';
  commission: number;
  details: string;
}

export interface CommissionResult {
  transaction: Transaction;
  calculations: CommissionCalculation[];
  totalCommission: number;
  applicableRules: number;
}
