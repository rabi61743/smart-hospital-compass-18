
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CommissionRule } from "@/types/commission";
import TestSummaryStats from './TestSummaryStats';
import TestResultCard from './TestResultCard';

interface TestResult {
  rule: CommissionRule;
  matches: boolean;
  calculatedRate: { rateType: 'fixed' | 'percentage' | 'tiered'; rate: number };
  commission: number;
}

interface TestResultsProps {
  testResults: TestResult[];
}

const TestResults = ({ testResults }: TestResultsProps) => {
  const getMatchingRules = () => testResults.filter(result => result.matches);
  const getTotalCommission = () => getMatchingRules().reduce((sum, result) => sum + result.commission, 0);

  if (testResults.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TestSummaryStats 
          totalRules={testResults.length}
          matchingRules={getMatchingRules().length}
          totalCommission={getTotalCommission()}
        />

        <Separator />

        <div className="space-y-3">
          {testResults.map((result) => (
            <TestResultCard key={result.rule.id} result={result} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestResults;
