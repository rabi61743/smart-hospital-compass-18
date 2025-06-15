
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import LabCommissionSummary from '../LabCommissionSummary';
import LabTestCategoryBreakdown from '../LabTestCategoryBreakdown';
import LabPerformanceTrends from '../LabPerformanceTrends';
import ComparativeAnalysisChart from '../ComparativeAnalysisChart';

interface LabReportsTabsProps {
  reportType: string;
  setReportType: (value: string) => void;
  selectedCategory: string;
  comparisonType: string;
  dateFrom?: Date;
  dateTo?: Date;
}

const LabReportsTabs = ({
  reportType,
  setReportType,
  selectedCategory,
  comparisonType,
  dateFrom,
  dateTo
}: LabReportsTabsProps) => {
  const getPeriod = () => {
    return dateFrom && dateTo ? `${format(dateFrom, 'yyyy-MM-dd')}_${format(dateTo, 'yyyy-MM-dd')}` : 'current-month';
  };

  const getDateRange = () => {
    return { from: dateFrom, to: dateTo };
  };

  return (
    <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="breakdown">Category Breakdown</TabsTrigger>
        <TabsTrigger value="trends">Performance Trends</TabsTrigger>
        <TabsTrigger value="comparative">Comparative Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="summary">
        <LabCommissionSummary 
          period={getPeriod()}
          selectedCategory={selectedCategory}
          dateRange={getDateRange()}
        />
      </TabsContent>

      <TabsContent value="breakdown">
        <LabTestCategoryBreakdown 
          period={getPeriod()}
          selectedCategory={selectedCategory}
          dateRange={getDateRange()}
        />
      </TabsContent>

      <TabsContent value="trends">
        <LabPerformanceTrends 
          period={getPeriod()}
          selectedCategory={selectedCategory}
          dateRange={getDateRange()}
        />
      </TabsContent>

      <TabsContent value="comparative">
        <ComparativeAnalysisChart
          comparisonType={comparisonType}
          selectedCategory={selectedCategory}
          dateRange={getDateRange()}
        />
      </TabsContent>
    </Tabs>
  );
};

export default LabReportsTabs;
