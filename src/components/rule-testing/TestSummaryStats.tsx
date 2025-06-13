
import React from 'react';

interface TestSummaryStatsProps {
  totalRules: number;
  matchingRules: number;
  totalCommission: number;
}

const TestSummaryStats = ({ totalRules, matchingRules, totalCommission }: TestSummaryStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-primary/10 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground">Total Rules Evaluated</div>
        <div className="text-2xl font-bold">{totalRules}</div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground">Matching Rules</div>
        <div className="text-2xl font-bold text-green-600">{matchingRules}</div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground">Total Commission</div>
        <div className="text-2xl font-bold text-blue-600">₹{totalCommission.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default TestSummaryStats;
