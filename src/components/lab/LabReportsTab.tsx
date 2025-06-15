
import React, { useState } from 'react';
import LabReportsHeader from './reports/LabReportsHeader';
import LabReportsTabs from './reports/LabReportsTabs';
import { useCommissionRules } from '@/hooks/useCommissionRules';

const LabReportsTab = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [comparisonType, setComparisonType] = useState('month-over-month');
  const [reportType, setReportType] = useState('summary');
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);
  const { activeRules } = useCommissionRules();

  const resetDateRange = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <LabReportsHeader
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        comparisonType={comparisonType}
        setComparisonType={setComparisonType}
        showCustomDateRange={showCustomDateRange}
        setShowCustomDateRange={setShowCustomDateRange}
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        resetDateRange={resetDateRange}
        reportType={reportType}
      />

      {/* Report Tabs */}
      <LabReportsTabs
        reportType={reportType}
        setReportType={setReportType}
        selectedCategory={selectedCategory}
        comparisonType={comparisonType}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </div>
  );
};

export default LabReportsTab;
