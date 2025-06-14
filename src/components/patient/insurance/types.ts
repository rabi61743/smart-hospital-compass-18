
export interface InsuranceCard {
  id: string;
  insuranceProvider: string;
  policyNumber: string;
  groupNumber?: string;
  memberName: string;
  memberId: string;
  effectiveDate: string;
  expirationDate: string;
  copay?: number;
  deductible?: number;
  frontImageUrl?: string;
  backImageUrl?: string;
  isPrimary: boolean;
  status: 'active' | 'inactive' | 'pending';
}

export interface InsuranceClaim {
  id: string;
  claimNumber: string;
  serviceDate: string;
  submissionDate: string;
  provider: string;
  serviceDescription: string;
  totalAmount: number;
  insurancePaid: number;
  patientResponsibility: number;
  status: 'submitted' | 'processing' | 'approved' | 'denied' | 'paid';
  denialReason?: string;
  eobUrl?: string;
  notes?: string;
}

export interface InsurancePreAuth {
  id: string;
  authNumber: string;
  serviceType: string;
  requestDate: string;
  approvedDate?: string;
  expirationDate?: string;
  approvedAmount?: number;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  notes?: string;
}
