
export interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  serviceDate: string;
  provider: string;
  services: InvoiceService[];
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  paymentMethod?: string;
  insuranceClaimed?: boolean;
  notes?: string;
}

export interface InvoiceService {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  cptCode?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'bank_account';
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  nickname?: string;
}

export interface PaymentTransaction {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  notes?: string;
}
