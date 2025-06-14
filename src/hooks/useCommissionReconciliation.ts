
import { useState, useMemo } from 'react';
import { PaidCommission, CalculatedCommission, CommissionDiscrepancy, ReconciliationSummary } from '@/types/reconciliation';

// Mock data for demonstration
const mockCalculatedCommissions: CalculatedCommission[] = [
  {
    id: '1',
    doctorId: 'doc1',
    doctorName: 'Dr. Smith',
    department: 'Cardiology',
    period: '2024-01',
    calculatedAmount: 45000,
    transactionCount: 28,
    lastCalculated: new Date('2024-01-31')
  },
  {
    id: '2',
    doctorId: 'doc2',
    doctorName: 'Dr. Johnson',
    department: 'Surgery',
    period: '2024-01',
    calculatedAmount: 75000,
    transactionCount: 15,
    lastCalculated: new Date('2024-01-31')
  },
  {
    id: '3',
    doctorId: 'doc3',
    doctorName: 'Dr. Davis',
    department: 'Pediatrics',
    period: '2024-01',
    calculatedAmount: 32000,
    transactionCount: 42,
    lastCalculated: new Date('2024-01-31')
  }
];

const mockPaidCommissions: PaidCommission[] = [
  {
    id: '1',
    doctorId: 'doc1',
    doctorName: 'Dr. Smith',
    department: 'Cardiology',
    period: '2024-01',
    paidAmount: 43000,
    paymentDate: new Date('2024-02-05'),
    paymentMethod: 'bank_transfer',
    referenceNumber: 'TXN001',
    notes: 'Regular monthly payment'
  },
  {
    id: '2',
    doctorId: 'doc2',
    doctorName: 'Dr. Johnson',
    department: 'Surgery',
    period: '2024-01',
    paidAmount: 75000,
    paymentDate: new Date('2024-02-03'),
    paymentMethod: 'bank_transfer',
    referenceNumber: 'TXN002'
  },
  {
    id: '3',
    doctorId: 'doc3',
    doctorName: 'Dr. Davis',
    department: 'Pediatrics',
    period: '2024-01',
    paidAmount: 35000,
    paymentDate: new Date('2024-02-04'),
    paymentMethod: 'check',
    referenceNumber: 'CHK001',
    notes: 'Bonus included for exceeding targets'
  }
];

export const useCommissionReconciliation = () => {
  const [calculatedCommissions] = useState<CalculatedCommission[]>(mockCalculatedCommissions);
  const [paidCommissions] = useState<PaidCommission[]>(mockPaidCommissions);
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01');

  const discrepancies = useMemo((): CommissionDiscrepancy[] => {
    const result: CommissionDiscrepancy[] = [];

    calculatedCommissions
      .filter(calc => calc.period === selectedPeriod)
      .forEach(calc => {
        const paid = paidCommissions.find(
          p => p.doctorId === calc.doctorId && p.period === calc.period
        );

        const paidAmount = paid?.paidAmount || 0;
        const discrepancyAmount = calc.calculatedAmount - paidAmount;
        const discrepancyPercentage = calc.calculatedAmount > 0 
          ? (discrepancyAmount / calc.calculatedAmount) * 100 
          : 0;

        let status: 'under_paid' | 'over_paid' | 'matched' = 'matched';
        if (discrepancyAmount > 0) status = 'under_paid';
        else if (discrepancyAmount < 0) status = 'over_paid';

        let severity: 'low' | 'medium' | 'high' = 'low';
        const absPercentage = Math.abs(discrepancyPercentage);
        if (absPercentage > 10) severity = 'high';
        else if (absPercentage > 5) severity = 'medium';

        result.push({
          id: `disc-${calc.id}`,
          doctorId: calc.doctorId,
          doctorName: calc.doctorName,
          department: calc.department,
          period: calc.period,
          calculatedAmount: calc.calculatedAmount,
          paidAmount,
          discrepancyAmount,
          discrepancyPercentage,
          status,
          severity,
          lastUpdated: new Date()
        });
      });

    return result.sort((a, b) => Math.abs(b.discrepancyAmount) - Math.abs(a.discrepancyAmount));
  }, [calculatedCommissions, paidCommissions, selectedPeriod]);

  const summary = useMemo((): ReconciliationSummary => {
    const periodDiscrepancies = discrepancies.filter(d => d.period === selectedPeriod);
    
    return {
      totalCalculated: periodDiscrepancies.reduce((sum, d) => sum + d.calculatedAmount, 0),
      totalPaid: periodDiscrepancies.reduce((sum, d) => sum + d.paidAmount, 0),
      totalDiscrepancy: periodDiscrepancies.reduce((sum, d) => sum + Math.abs(d.discrepancyAmount), 0),
      discrepancyCount: periodDiscrepancies.filter(d => d.status !== 'matched').length,
      matchedCount: periodDiscrepancies.filter(d => d.status === 'matched').length,
      underPaidCount: periodDiscrepancies.filter(d => d.status === 'under_paid').length,
      overPaidCount: periodDiscrepancies.filter(d => d.status === 'over_paid').length
    };
  }, [discrepancies, selectedPeriod]);

  return {
    calculatedCommissions: calculatedCommissions.filter(c => c.period === selectedPeriod),
    paidCommissions: paidCommissions.filter(p => p.period === selectedPeriod),
    discrepancies: discrepancies.filter(d => d.period === selectedPeriod),
    summary,
    selectedPeriod,
    setSelectedPeriod
  };
};
