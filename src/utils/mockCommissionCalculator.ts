import { mockTransactions, MockTransaction } from '@/data/mockPatientData';

export interface CalculatedCommission {
  doctorId: string;
  doctorName: string;
  department: string;
  consultations: number;
  surgeries: number;
  labTests: number;
  pharmacyOrders: number;
  totalRevenue: number;
  commissionAmount: number;
  commissionRate: string;
  period: string;
  transactions: MockTransaction[];
}

// Commission rates by department with proper typing
interface DoctorCommissionRates {
  consultation: number;
  surgery: number;
  base: number;
}

interface LabCommissionRates {
  test: number;
  base: number;
}

interface PharmacyCommissionRates {
  sale: number;
  base: number;
}

const COMMISSION_RATES = {
  'Cardiology': { consultation: 15, surgery: 18, base: 15 } as DoctorCommissionRates,
  'Neurology': { consultation: 12, surgery: 15, base: 12 } as DoctorCommissionRates,
  'General Medicine': { consultation: 10, surgery: 12, base: 10 } as DoctorCommissionRates,
  'Orthopedics': { consultation: 15, surgery: 20, base: 18 } as DoctorCommissionRates,
  'Laboratory': { test: 15, base: 15 } as LabCommissionRates,
  'Pharmacy': { sale: 10, base: 10 } as PharmacyCommissionRates
};

export const calculateDoctorCommissions = (period: string = '2024-01'): CalculatedCommission[] => {
  // Group transactions by doctor
  const doctorGroups: { [key: string]: MockTransaction[] } = {};
  
  mockTransactions
    .filter(t => t.status === 'completed' && t.commissionCalculated)
    .forEach(transaction => {
      if (!doctorGroups[transaction.doctorName]) {
        doctorGroups[transaction.doctorName] = [];
      }
      doctorGroups[transaction.doctorName].push(transaction);
    });

  return Object.entries(doctorGroups).map(([doctorName, transactions]) => {
    const firstTransaction = transactions[0];
    const department = firstTransaction.department;
    
    // Count different types of services
    const consultations = transactions.filter(t => t.type === 'consultation').length;
    const surgeries = transactions.filter(t => t.type === 'surgery').length;
    const labTests = transactions.filter(t => t.type === 'lab_test').length;
    const pharmacyOrders = transactions.filter(t => t.type === 'pharmacy').length;
    
    // Calculate total revenue
    const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate commission based on department and service type
    let commissionAmount = 0;
    let effectiveRate = 0;
    
    if (department === 'Laboratory') {
      const rates = COMMISSION_RATES.Laboratory;
      commissionAmount = totalRevenue * (rates.test / 100);
      effectiveRate = rates.test;
    } else if (department === 'Pharmacy') {
      const rates = COMMISSION_RATES.Pharmacy;
      commissionAmount = totalRevenue * (rates.sale / 100);
      effectiveRate = rates.sale;
    } else {
      // For doctors - calculate based on service mix
      const rates = COMMISSION_RATES[department as keyof typeof COMMISSION_RATES] as DoctorCommissionRates || COMMISSION_RATES['General Medicine'];
      
      transactions.forEach(t => {
        if (t.type === 'consultation') {
          commissionAmount += t.amount * (rates.consultation / 100);
        } else if (t.type === 'surgery') {
          commissionAmount += t.amount * (rates.surgery / 100);
        }
      });
      
      effectiveRate = rates.base;
    }
    
    return {
      doctorId: firstTransaction.doctorId,
      doctorName,
      department,
      consultations,
      surgeries,
      labTests,
      pharmacyOrders,
      totalRevenue,
      commissionAmount: Math.round(commissionAmount),
      commissionRate: `${effectiveRate}%`,
      period,
      transactions
    };
  });
};

export const getCommissionSummary = () => {
  const commissions = calculateDoctorCommissions();
  
  const doctorCommissions = commissions.filter(c => 
    !['Laboratory', 'Pharmacy'].includes(c.department)
  );
  const labCommissions = commissions.filter(c => c.department === 'Laboratory');
  const pharmacyCommissions = commissions.filter(c => c.department === 'Pharmacy');
  
  const totalDoctorCommission = doctorCommissions.reduce((sum, c) => sum + c.commissionAmount, 0);
  const totalLabCommission = labCommissions.reduce((sum, c) => sum + c.commissionAmount, 0);
  const totalPharmacyCommission = pharmacyCommissions.reduce((sum, c) => sum + c.commissionAmount, 0);
  
  return [
    { 
      type: "Doctor Commissions", 
      amount: `₹${totalDoctorCommission.toLocaleString()}`, 
      change: "+18%", 
      color: "text-green-600" 
    },
    { 
      type: "Agent Commissions", 
      amount: "₹78,900", 
      change: "+12%", 
      color: "text-blue-600" 
    },
    { 
      type: "Lab Commissions", 
      amount: `₹${totalLabCommission.toLocaleString()}`, 
      change: "+8%", 
      color: "text-purple-600" 
    },
    { 
      type: "Pharmacy Commissions", 
      amount: `₹${totalPharmacyCommission.toLocaleString()}`, 
      change: "+15%", 
      color: "text-orange-600" 
    }
  ];
};

export const getRecentTransactions = (limit: number = 10): MockTransaction[] => {
  return mockTransactions
    .filter(t => t.status === 'completed')
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
};
