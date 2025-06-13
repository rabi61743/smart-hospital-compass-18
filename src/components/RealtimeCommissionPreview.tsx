
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { CommissionCalculator, Transaction, createSampleTransactions } from "@/utils/commissionCalculator";
import { CommissionRule } from "@/types/commission";
import PreviewSummaryStats from "./preview/PreviewSummaryStats";
import PreviewSampleCalculations from "./preview/PreviewSampleCalculations";
import PreviewRateInsights from "./preview/PreviewRateInsights";

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
        <PreviewSummaryStats
          rateDisplay={getRateDisplay()}
          totalCommission={totalCommission}
          averageRate={averageRate}
        />

        <PreviewSampleCalculations previewResults={previewResults} />

        <PreviewRateInsights
          rateType={ruleData.rateType}
          rate={ruleData.rate}
        />
      </CardContent>
    </Card>
  );
};

export default RealtimeCommissionPreview;
