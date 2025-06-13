
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface PreviewSummaryStatsProps {
  rateDisplay: string;
  totalCommission: number;
  averageRate: number;
}

const PreviewSummaryStats = ({ rateDisplay, totalCommission, averageRate }: PreviewSummaryStatsProps) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">
            {rateDisplay}
          </div>
          <div className="text-xs text-muted-foreground">Rate</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">
            ₹{totalCommission.toFixed(0)}
          </div>
          <div className="text-xs text-muted-foreground">Total Commission</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-purple-600">
            {averageRate.toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">Effective Rate</div>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default PreviewSummaryStats;
