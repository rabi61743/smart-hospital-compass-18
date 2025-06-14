
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'paid';

export interface CommissionApproval {
  id: string;
  doctorId: string;
  doctorName: string;
  department: string;
  period: string; // e.g., "2024-01" for January 2024
  totalCommission: number;
  consultations: number;
  surgeries: number;
  status: ApprovalStatus;
  submittedDate: Date;
  reviewedDate?: Date;
  reviewedBy?: string;
  notes?: string;
  breakdown: {
    consultationCommission: number;
    surgeryCommission: number;
    bonusCommission?: number;
  };
}

export interface ApprovalAction {
  approvalId: string;
  action: 'approve' | 'reject';
  notes?: string;
  reviewerName: string;
}
