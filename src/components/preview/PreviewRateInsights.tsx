
import React from 'react';
import { TrendingUp, DollarSign } from "lucide-react";

interface PreviewRateInsightsProps {
  rateType: 'percentage' | 'fixed' | 'tiered';
  rate: number;
}

const PreviewRateInsights = ({ rateType, rate }: PreviewRateInsightsProps) => {
  return (
    <>
      {rateType === 'percentage' && rate > 20 && (
        <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
          <TrendingUp className="h-3 w-3 text-yellow-600" />
          <span className="text-yellow-700">High percentage rate - consider impact on profitability</span>
        </div>
      )}

      {rateType === 'fixed' && rate > 10000 && (
        <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
          <DollarSign className="h-3 w-3 text-blue-600" />
          <span className="text-blue-700">High fixed rate - ensure alignment with transaction values</span>
        </div>
      )}
    </>
  );
};

export default PreviewRateInsights;
