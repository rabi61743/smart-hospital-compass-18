
import React from 'react';
import ComparativeAnalysisSummary from './comparative-analysis/ComparativeAnalysisSummary';
import ComparativeAnalysisCharts from './comparative-analysis/ComparativeAnalysisCharts';
import ComparativeAnalysisTable from './comparative-analysis/ComparativeAnalysisTable';
import { getComparativeData } from './comparative-analysis/comparativeAnalysisData';

interface ComparativeAnalysisChartProps {
  comparisonType: string;
  selectedCategory: string;
  dateRange: { from?: Date; to?: Date };
}

const ComparativeAnalysisChart = ({ comparisonType, selectedCategory, dateRange }: ComparativeAnalysisChartProps) => {
  const data = getComparativeData(comparisonType);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <ComparativeAnalysisSummary data={data} />

      {/* Comparative Charts */}
      <ComparativeAnalysisCharts data={data} comparisonType={comparisonType} />

      {/* Growth Analysis Table */}
      <ComparativeAnalysisTable data={data} comparisonType={comparisonType} />
    </div>
  );
};

export default ComparativeAnalysisChart;
