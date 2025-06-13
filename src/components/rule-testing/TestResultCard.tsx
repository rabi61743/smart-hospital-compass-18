
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CommissionRule } from "@/types/commission";

interface TestResult {
  rule: CommissionRule;
  matches: boolean;
  calculatedRate: { rateType: 'fixed' | 'percentage' | 'tiered'; rate: number };
  commission: number;
}

interface TestResultCardProps {
  result: TestResult;
}

const TestResultCard = ({ result }: TestResultCardProps) => {
  return (
    <div
      className={`border rounded-lg p-4 ${
        result.matches ? 'border-green-200 bg-green-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{result.rule.name}</h4>
          <Badge variant={result.matches ? 'default' : 'secondary'}>
            {result.matches ? 'Match' : 'No Match'}
          </Badge>
        </div>
        {result.matches && (
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Commission</div>
            <div className="font-bold text-green-600">₹{result.commission.toFixed(2)}</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Type:</span> {result.rule.type}
        </div>
        <div>
          <span className="text-muted-foreground">Category:</span> {result.rule.category}
        </div>
        <div>
          <span className="text-muted-foreground">Rate:</span>{' '}
          {result.calculatedRate.rateType === 'percentage' 
            ? `${result.calculatedRate.rate}%` 
            : `₹${result.calculatedRate.rate}`
          }
        </div>
      </div>

      {result.rule.conditions && (
        <div className="mt-2 text-xs text-muted-foreground">
          {result.rule.conditions}
        </div>
      )}
    </div>
  );
};

export default TestResultCard;
