
import { useState, useEffect } from 'react';
import { generatePDF, generateExcel } from '@/utils/reportGenerators';
import { toast } from 'sonner';

export interface ReportFilters {
  dateFrom?: Date;
  dateTo?: Date;
  department?: string;
  procedure?: string;
  reportType: string;
}

export interface ReportData {
  details: CommissionDetail[];
  procedureBreakdown: ProcedureBreakdown[];
  timeSeries: TimeSeriesData[];
  summary: ReportSummary;
}

export interface CommissionDetail {
  id: string;
  date: string;
  doctorName: string;
  department: string;
  procedureType: string;
  patientName: string;
  amount: number;
  commissionRate: number;
  commissionAmount: number;
  status: 'paid' | 'pending' | 'processing';
}

export interface ProcedureBreakdown {
  procedureType: string;
  count: number;
  totalAmount: number;
  totalCommission: number;
  averageCommission: number;
}

export interface TimeSeriesData {
  date: string;
  totalCommissions: number;
  consultations: number;
  surgeries: number;
  labTests: number;
}

export interface ReportSummary {
  totalCommissions: number;
  totalTransactions: number;
  averageCommission: number;
  topPerformer: string;
  periodGrowth: number;
}

// Mock data for demonstration
const mockReportData: ReportData = {
  details: [
    {
      id: '1',
      date: '2024-01-15',
      doctorName: 'Dr. Rajesh Kumar',
      department: 'Cardiology',
      procedureType: 'Consultation',
      patientName: 'John Doe',
      amount: 2500,
      commissionRate: 15,
      commissionAmount: 375,
      status: 'paid'
    },
    {
      id: '2',
      date: '2024-01-14',
      doctorName: 'Dr. Priya Sharma',
      department: 'Orthopedics',
      procedureType: 'Surgery',
      patientName: 'Jane Smith',
      amount: 50000,
      commissionRate: 12,
      commissionAmount: 6000,
      status: 'pending'
    }
  ],
  procedureBreakdown: [
    {
      procedureType: 'Consultation',
      count: 245,
      totalAmount: 612500,
      totalCommission: 91875,
      averageCommission: 375
    },
    {
      procedureType: 'Surgery',
      count: 45,
      totalAmount: 2250000,
      totalCommission: 270000,
      averageCommission: 6000
    },
    {
      procedureType: 'Lab Tests',
      count: 180,
      totalAmount: 216000,
      totalCommission: 32400,
      averageCommission: 180
    }
  ],
  timeSeries: [
    {
      date: '2024-01-01',
      totalCommissions: 125000,
      consultations: 85000,
      surgeries: 35000,
      labTests: 5000
    },
    {
      date: '2024-01-08',
      totalCommissions: 142000,
      consultations: 92000,
      surgeries: 42000,
      labTests: 8000
    }
  ],
  summary: {
    totalCommissions: 394275,
    totalTransactions: 470,
    averageCommission: 839,
    topPerformer: 'Dr. Rajesh Kumar',
    periodGrowth: 12.5
  }
};

export const useCommissionReports = () => {
  const [reportData, setReportData] = useState<ReportData>(mockReportData);
  const [summaryStats, setSummaryStats] = useState(mockReportData.summary);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<ReportFilters>({
    reportType: 'summary'
  });

  const applyFilters = async (filters: ReportFilters) => {
    setIsLoading(true);
    setCurrentFilters(filters);

    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would make an API call with the filters
      console.log('Applying filters:', filters);
      
      // For now, we'll use the mock data
      setReportData(mockReportData);
      setSummaryStats(mockReportData.summary);
      
      toast.success('Report generated successfully');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDFReport = async (filters: ReportFilters) => {
    try {
      await generatePDF(reportData, filters);
      toast.success('PDF report generated successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF report');
    }
  };

  const generateExcelReport = async (filters: ReportFilters) => {
    try {
      await generateExcel(reportData, filters);
      toast.success('Excel report generated successfully');
    } catch (error) {
      console.error('Error generating Excel:', error);
      toast.error('Failed to generate Excel report');
    }
  };

  return {
    reportData,
    summaryStats,
    isLoading,
    currentFilters,
    applyFilters,
    generatePDFReport,
    generateExcelReport
  };
};
