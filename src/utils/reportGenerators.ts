
import { ReportData, ReportFilters } from '@/hooks/useCommissionReports';

export const generatePDF = async (data: ReportData, filters: ReportFilters) => {
  // Create PDF content
  const pdfContent = createPDFContent(data, filters);
  
  // In a real implementation, you would use a library like jsPDF or react-pdf
  // For now, we'll simulate the PDF generation
  console.log('Generating PDF with content:', pdfContent);
  
  // Simulate PDF generation
  const blob = new Blob([JSON.stringify(pdfContent, null, 2)], { 
    type: 'application/pdf' 
  });
  
  // Download the file
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `commission-report-${new Date().toISOString().split('T')[0]}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateExcel = async (data: ReportData, filters: ReportFilters) => {
  // Create Excel content
  const excelData = createExcelData(data, filters);
  
  // Convert to CSV format for simplicity (in real implementation, use xlsx library)
  const csvContent = convertToCSV(excelData);
  
  // Download the file
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `commission-report-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const createPDFContent = (data: ReportData, filters: ReportFilters) => {
  const reportTitle = getReportTitle(filters.reportType);
  const dateRange = filters.dateFrom && filters.dateTo 
    ? `${filters.dateFrom.toDateString()} - ${filters.dateTo.toDateString()}`
    : 'All Time';

  return {
    title: reportTitle,
    dateRange,
    filters: {
      department: filters.department || 'All Departments',
      procedure: filters.procedure || 'All Procedures'
    },
    summary: data.summary,
    details: data.details,
    procedureBreakdown: data.procedureBreakdown,
    generatedAt: new Date().toISOString()
  };
};

const createExcelData = (data: ReportData, filters: ReportFilters) => {
  const headers = [
    'Date',
    'Doctor Name',
    'Department',
    'Procedure Type',
    'Patient Name',
    'Amount',
    'Commission Rate (%)',
    'Commission Amount',
    'Status'
  ];

  const rows = data.details.map(detail => [
    detail.date,
    detail.doctorName,
    detail.department,
    detail.procedureType,
    detail.patientName,
    detail.amount.toString(),
    detail.commissionRate.toString(),
    detail.commissionAmount.toString(),
    detail.status
  ]);

  return [headers, ...rows];
};

const convertToCSV = (data: string[][]) => {
  return data.map(row => 
    row.map(cell => `"${cell}"`).join(',')
  ).join('\n');
};

const getReportTitle = (reportType: string) => {
  const titles = {
    summary: 'Commission Summary Report',
    detailed: 'Detailed Commission Report',
    procedure: 'Commission Report by Procedure Type',
    doctor: 'Commission Report by Doctor',
    time: 'Time Series Commission Analysis'
  };
  
  return titles[reportType as keyof typeof titles] || 'Commission Report';
};
