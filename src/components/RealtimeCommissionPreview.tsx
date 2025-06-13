
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, TrendingUp, DollarSign } from "lucide-react";
import { CommissionCalculator, Transaction, createSampleTransactions } from "@/utils/commissionCalculator";
import { CommissionRule } from "@/types/commission";

interface RealtimeCommissionPreviewProps {
  ruleData: {
    name: string;
    type: 'doctor' | 'agent' | 'department';
    rateType: 'percentage' | 'fixed' | 'tiered';
    rate: number;
    minAmount?: number;
    maxAmount?: number;
    category: string;
    conditions: string;
  };
}

const RealtimeCommissionPreview = ({ ruleData }: RealtimeCommissionPreviewProps) => {
  // Create a temporary rule for preview
  const previewRule: CommissionRule = useMemo(() => ({
    id: 'preview-rule',
    name: ruleData.name || 'Preview Rule',
    type: ruleData.type,
    rateType: ruleData.rateType,
    rate: ruleData.rate || 0,
    minAmount: ruleData.minAmount,
    maxAmount: ruleData.maxAmount,
    category: ruleData.category || 'general',
    conditions: ruleData.conditions || 'Preview conditions',
    isActive: true
  }), [ruleData]);

  // Generate sample transactions based on rule type and category
  const sampleTransactions: Transaction[] = useMemo(() => {
    const baseTransactions = createSampleTransactions();
    return baseTransactions
      .filter(t => t.type === ruleData.type)
      .map(t => ({
        ...t,
        category: ruleData.category || t.category
      }))
      .concat([
        // Add specific test amounts
        {
          id: 'test-1',
          amount: 5000,
          quantity: 1,
          category: ruleData.category || 'test',
          type: ruleData.type,
          date: new Date(),
          description: 'Small amount test'
        },
        {
          id: 'test-2',
          amount: 25000,
          quantity: 2,
          category: ruleData.category || 'test',
          type: ruleData.type,
          date: new Date(),
          description: 'Medium amount test'
        },
        {
          id: 'test-3',
          amount: 100000,
          quantity: 1,
          category: ruleData.category || 'test',
          type: ruleData.type,
          date: new Date(),
          description: 'Large amount test'
        }
      ]);
  }, [ruleData.type, ruleData.category]);

  const calculator = useMemo(() => new CommissionCalculator([previewRule]), [previewRule]);

  const previewResults = useMemo(() => {
    return sampleTransactions.map(transaction => calculator.calculateCommission(transaction));
  }, [calculator, sampleTransactions]);

  const totalCommission = useMemo(() => {
    return previewResults.reduce((sum, result) => sum + result.totalCommission, 0);
  }, [previewResults]);

  const averageRate = useMemo(() => {
    const validResults = previewResults.filter(r => r.totalCommission > 0);
    if (validResults.length === 0) return 0;
    
    const totalAmount = validResults.reduce((sum, r) => sum + r.transaction.amount, 0);
    return totalAmount > 0 ? (totalCommission / totalAmount) * 100 : 0;
  }, [previewResults, totalCommission]);

  const getRateDisplay = () => {
    switch (ruleData.rateType) {
      case 'percentage':
        return `${ruleData.rate}%`;
      case 'fixed':
        return `₹${ruleData.rate}`;
      case 'tiered':
        return `${ruleData.rate}% (Base)`;
      default:
        return '0%';
    }
  };

  if (!ruleData.rate || ruleData.rate === 0) {
    return (
      <Card className="bg-muted/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Commission Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Enter a rate value to see commission preview
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Calculator className="h-4 w-4 text-blue-600" />
          Real-time Commission Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">
              {getRateDisplay()}
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

        {/* Sample Calculations */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground">Sample Calculations</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {previewResults.slice(0, 5).map((result, index) => (
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

        {/* Rate Insights */}
        {ruleData.rateType === 'percentage' && ruleData.rate > 20 && (
          <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
            <TrendingUp className="h-3 w-3 text-yellow-600" />
            <span className="text-yellow-700">High percentage rate - consider impact on profitability</span>
          </div>
        )}

        {ruleData.rateType === 'fixed' && ruleData.rate > 10000 && (
          <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
            <DollarSign className="h-3 w-3 text-blue-600" />
            <span className="text-blue-700">High fixed rate - ensure alignment with transaction values</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealtimeCommissionPreview;
