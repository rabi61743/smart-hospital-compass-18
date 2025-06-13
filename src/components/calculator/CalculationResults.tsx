
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CommissionResult } from "@/utils/commissionCalculator";

interface CalculationResultsProps {
  results: CommissionResult[];
}

const CalculationResults = ({ results }: CalculationResultsProps) => {
  if (results.length === 0) {
    return null;
  }

  const getTotalCommission = () => {
    return results.reduce((sum, result) => sum + result.totalCommission, 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Calculation Results</CardTitle>
        <CardDescription>
          Total Commission: ₹{getTotalCommission().toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.transaction.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium">₹{result.transaction.amount} - {result.transaction.category}</div>
                  <div className="text-sm text-muted-foreground">
                    {result.transaction.description || 'No description'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">₹{result.totalCommission.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">
                    {result.applicableRules} rule{result.applicableRules !== 1 ? 's' : ''} applied
                  </div>
                </div>
              </div>
              
              {result.calculations.length > 0 && (
                <div>
                  <Separator className="mb-3" />
                  <div className="space-y-2">
                    {result.calculations.map((calc, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium">{calc.ruleName}</span>
                          <span className="text-muted-foreground ml-2">({calc.details})</span>
                        </div>
                        <span className="font-medium">₹{calc.commission.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {result.calculations.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  No applicable commission rules found for this transaction.
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalculationResults;
