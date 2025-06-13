
import { Transaction } from '@/types/transaction';

// Helper function to create sample transactions for testing
export const createSampleTransactions = (): Transaction[] => [
  {
    id: '1',
    amount: 5000,
    quantity: 1,
    category: 'consultation',
    type: 'doctor',
    date: new Date(),
    description: 'General consultation'
  },
  {
    id: '2',
    amount: 75000,
    quantity: 1,
    category: 'surgery',
    type: 'doctor',
    date: new Date(),
    description: 'Cardiac surgery'
  },
  {
    id: '3',
    amount: 15000,
    quantity: 1,
    category: 'referral',
    type: 'agent',
    date: new Date(),
    description: 'Patient referral'
  }
];
