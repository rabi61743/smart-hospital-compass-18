
import React from 'react';
import CommissionTrendsChart from './performance-trends/CommissionTrendsChart';
import VolumeTrendsChart from './performance-trends/VolumeTrendsChart';
import GrowthAnalysisCards from './performance-trends/GrowthAnalysisCards';
import { getPerformanceTrendData, getVolumeTrendData } from './performance-trends/performanceTrendsData';

interface LabPerformanceTrendsProps {
  period: string;
  selectedCategory: string;
  dateRange?: { from?: Date; to?: Date };
}

const LabPerformanceTrends = ({ period, selectedCategory, dateRange }: LabPerformanceTrendsProps) => {
  const trendData = getPerformanceTrendData();
  const volumeTrendData = getVolumeTrendData();

  return (
    <div className="space-y-6">
      {/* Commission Trends */}
      <CommissionTrendsChart data={trendData} />

      {/* Volume Trends */}
      <VolumeTrendsChart data={volumeTrendData} />

      {/* Growth Analysis */}
      <GrowthAnalysisCards />
    </div>
  );
};

export default LabPerformanceTrends;
