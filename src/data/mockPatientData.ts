
export interface MockPatient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  phoneNumber: string;
  email: string;
  address: string;
  insuranceProvider?: string;
  registrationDate: Date;
}

export interface MockTransaction {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  type: 'consultation' | 'surgery' | 'lab_test' | 'pharmacy' | 'referral';
  description: string;
  amount: number;
  quantity: number;
  date: Date;
  status: 'completed' | 'pending' | 'cancelled';
  insuranceCovered: boolean;
  commissionCalculated: boolean;
}

export const mockPatients: MockPatient[] = [
  {
    id: 'p1',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    phoneNumber: '+91 9876543210',
    email: 'rajesh.kumar@email.com',
    address: 'Mumbai, Maharashtra',
    insuranceProvider: 'ICICI Lombard',
    registrationDate: new Date('2024-01-15')
  },
  {
    id: 'p2',
    name: 'Priya Sharma',
    age: 32,
    gender: 'Female',
    phoneNumber: '+91 9876543211',
    email: 'priya.sharma@email.com',
    address: 'Delhi, NCR',
    insuranceProvider: 'HDFC ERGO',
    registrationDate: new Date('2024-01-20')
  },
  {
    id: 'p3',
    name: 'Amit Patel',
    age: 28,
    gender: 'Male',
    phoneNumber: '+91 9876543212',
    email: 'amit.patel@email.com',
    address: 'Bangalore, Karnataka',
    registrationDate: new Date('2024-02-01')
  },
  {
    id: 'p4',
    name: 'Sneha Gupta',
    age: 38,
    gender: 'Female',
    phoneNumber: '+91 9876543213',
    email: 'sneha.gupta@email.com',
    address: 'Chennai, Tamil Nadu',
    insuranceProvider: 'Star Health',
    registrationDate: new Date('2024-02-10')
  },
  {
    id: 'p5',
    name: 'Vikram Singh',
    age: 52,
    gender: 'Male',
    phoneNumber: '+91 9876543214',
    email: 'vikram.singh@email.com',
    address: 'Pune, Maharashtra',
    insuranceProvider: 'Bajaj Allianz',
    registrationDate: new Date('2024-01-25')
  }
];

export const mockTransactions: MockTransaction[] = [
  // Dr. Sarah Johnson - Cardiology
  {
    id: 't1',
    patientId: 'p1',
    patientName: 'Rajesh Kumar',
    doctorId: 'doc1',
    doctorName: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    type: 'consultation',
    description: 'Cardiac consultation and ECG',
    amount: 2500,
    quantity: 1,
    date: new Date('2024-01-28'),
    status: 'completed',
    insuranceCovered: true,
    commissionCalculated: true
  },
  {
    id: 't2',
    patientId: 'p5',
    patientName: 'Vikram Singh',
    doctorId: 'doc1',
    doctorName: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    type: 'surgery',
    description: 'Cardiac bypass surgery',
    amount: 150000,
    quantity: 1,
    date: new Date('2024-01-30'),
    status: 'completed',
    insuranceCovered: true,
    commissionCalculated: true
  },
  
  // Dr. Michael Chen - Neurology
  {
    id: 't3',
    patientId: 'p2',
    patientName: 'Priya Sharma',
    doctorId: 'doc2',
    doctorName: 'Dr. Michael Chen',
    department: 'Neurology',
    type: 'consultation',
    description: 'Neurological assessment',
    amount: 3000,
    quantity: 1,
    date: new Date('2024-01-25'),
    status: 'completed',
    insuranceCovered: false,
    commissionCalculated: true
  },
  {
    id: 't4',
    patientId: 'p4',
    patientName: 'Sneha Gupta',
    doctorId: 'doc2',
    doctorName: 'Dr. Michael Chen',
    department: 'Neurology',
    type: 'surgery',
    description: 'Brain tumor removal',
    amount: 250000,
    quantity: 1,
    date: new Date('2024-01-29'),
    status: 'completed',
    insuranceCovered: true,
    commissionCalculated: true
  },

  // Dr. Emily Davis - General Medicine
  {
    id: 't5',
    patientId: 'p3',
    patientName: 'Amit Patel',
    doctorId: 'doc3',
    doctorName: 'Dr. Emily Davis',
    department: 'General Medicine',
    type: 'consultation',
    description: 'General health checkup',
    amount: 1500,
    quantity: 1,
    date: new Date('2024-02-01'),
    status: 'completed',
    insuranceCovered: false,
    commissionCalculated: true
  },
  {
    id: 't6',
    patientId: 'p1',
    patientName: 'Rajesh Kumar',
    doctorId: 'doc3',
    doctorName: 'Dr. Emily Davis',
    department: 'General Medicine',
    type: 'consultation',
    description: 'Follow-up consultation',
    amount: 1200,
    quantity: 1,
    date: new Date('2024-02-03'),
    status: 'completed',
    insuranceCovered: true,
    commissionCalculated: true
  },

  // Dr. Robert Wilson - Orthopedics
  {
    id: 't7',
    patientId: 'p2',
    patientName: 'Priya Sharma',
    doctorId: 'doc4',
    doctorName: 'Dr. Robert Wilson',
    department: 'Orthopedics',
    type: 'consultation',
    description: 'Knee pain assessment',
    amount: 2000,
    quantity: 1,
    date: new Date('2024-01-26'),
    status: 'completed',
    insuranceCovered: true,
    commissionCalculated: true
  },
  {
    id: 't8',
    patientId: 'p3',
    patientName: 'Amit Patel',
    doctorId: 'doc4',
    doctorName: 'Dr. Robert Wilson',
    department: 'Orthopedics',
    type: 'surgery',
    description: 'ACL reconstruction surgery',
    amount: 85000,
    quantity: 1,
    date: new Date('2024-02-02'),
    status: 'completed',
    insuranceCovered: false,
    commissionCalculated: true
  },

  // Lab Tests
  {
    id: 't9',
    patientId: 'p1',
    patientName: 'Rajesh Kumar',
    doctorId: 'lab1',
    doctorName: 'Lab Department',
    department: 'Laboratory',
    type: 'lab_test',
    description: 'Complete Blood Count, Lipid Profile',
    amount: 1800,
    quantity: 2,
    date: new Date('2024-01-27'),
    status: 'completed',
    insuranceCovered: true,
    commissionCalculated: true
  },
  {
    id: 't10',
    patientId: 'p4',
    patientName: 'Sneha Gupta',
    doctorId: 'lab1',
    doctorName: 'Lab Department',
    department: 'Laboratory',
    type: 'lab_test',
    description: 'MRI Brain Scan',
    amount: 8500,
    quantity: 1,
    date: new Date('2024-01-28'),
    status: 'completed',
    insuranceCovered: true,
    commissionCalculated: true
  },

  // Pharmacy
  {
    id: 't11',
    patientId: 'p2',
    patientName: 'Priya Sharma',
    doctorId: 'pharmacy1',
    doctorName: 'Pharmacy Department',
    department: 'Pharmacy',
    type: 'pharmacy',
    description: 'Prescribed medications',
    amount: 3200,
    quantity: 1,
    date: new Date('2024-01-26'),
    status: 'completed',
    insuranceCovered: false,
    commissionCalculated: true
  },
  {
    id: 't12',
    patientId: 'p5',
    patientName: 'Vikram Singh',
    doctorId: 'pharmacy1',
    doctorName: 'Pharmacy Department',
    department: 'Pharmacy',
    type: 'pharmacy',
    description: 'Cardiac medications',
    amount: 5400,
    quantity: 1,
    date: new Date('2024-01-31'),
    status: 'completed',
    insuranceCovered: true,
    commissionCalculated: true
  }
];

// Function to get transactions by doctor
export const getTransactionsByDoctor = (doctorName: string): MockTransaction[] => {
  return mockTransactions.filter(t => t.doctorName === doctorName);
};

// Function to get transactions by patient
export const getTransactionsByPatient = (patientId: string): MockTransaction[] => {
  return mockTransactions.filter(t => t.patientId === patientId);
};

// Function to get transactions by date range
export const getTransactionsByDateRange = (startDate: Date, endDate: Date): MockTransaction[] => {
  return mockTransactions.filter(t => t.date >= startDate && t.date <= endDate);
};

// Function to calculate total revenue
export const getTotalRevenue = (): number => {
  return mockTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
};

// Function to get patient by ID
export const getPatientById = (patientId: string): MockPatient | undefined => {
  return mockPatients.find(p => p.id === patientId);
};
