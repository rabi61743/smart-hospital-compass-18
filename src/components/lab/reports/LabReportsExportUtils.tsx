
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { format } from "date-fns";

interface LabReportsExportUtilsProps {
  dateFrom?: Date;
  dateTo?: Date;
  selectedCategory: string;
  reportType: string;
}

const LabReportsExportUtils = ({ dateFrom, dateTo, selectedCategory, reportType }: LabReportsExportUtilsProps) => {
  const handleExportPDF = () => {
    console.log('Exporting PDF report with filters:', {
      dateFrom,
      dateTo,
      selectedCategory,
      reportType
    });
    // Simulate PDF export
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,';
    link.download = `lab-commission-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
    link.click();
  };

  const handleExportExcel = () => {
    console.log('Exporting Excel report with filters:', {
      dateFrom,
      dateTo,
      selectedCategory,
      reportType
    });
    // Simulate Excel export
    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lab-commission-report-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateCSVContent = () => {
    return `Test Category,Tests Count,Revenue,Commission,Commission Rate
Blood Tests,245,"₹6,12,500","₹91,875",15%
Imaging,128,"₹12,80,000","₹1,28,000",10%
Pathology,89,"₹8,90,000","₹1,33,500",15%
Microbiology,156,"₹7,80,000","₹93,600",12%
Biochemistry,98,"₹4,90,000","₹58,800",12%`;
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        onClick={handleExportPDF}
        className="flex items-center gap-2"
      >
        <FileText className="h-4 w-4" />
        Export PDF
      </Button>
      <Button 
        variant="outline" 
        onClick={handleExportExcel}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export Excel
      </Button>
    </div>
  );
};

export default LabReportsExportUtils;
