
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CommissionResult } from "@/utils/commissionCalculator";

interface PreviewSampleCalculationsProps {
  previewResults: CommissionResult[];
}

const PreviewSampleCalculations = ({ previewResults }: PreviewSampleCalculationsProps) => {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-medium text-muted-foreground">Sample Calculations</h4>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {previewResults.slice(0, 5).map((result) => (
          <div key={result.transaction.id} className="flex items-center justify-between text-xs p-2 bg-white/70 rounded">
            <div>
              <div className="font-medium">₹{result.transaction.amount.toLocaleString()}</div>
              <div className="text-muted-foreground">{result.transaction.description}</div>
            </div>
            <div className="text-right">
              {result.totalCommission > 0 ? (
                <>
                  <div className="font-medium text-green-600">
                    ₹{result.totalCommission.toFixed(0)}
                  </div>
                  <div className="text-muted-foreground">
                    ({((result.totalCommission / result.transaction.amount) * 100).toFixed(1)}%)
                  </div>
                </>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  Not Applicable
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewSampleCalculations;
