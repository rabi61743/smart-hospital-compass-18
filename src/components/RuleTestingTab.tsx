
import React, { useState } from 'react';
import { CommissionRule } from "@/types/commission";
import { CommissionCalculator, Transaction, CommissionResult } from "@/utils/commissionCalculator";
import TestScenarioForm from './rule-testing/TestScenarioForm';
import TestResults from './rule-testing/TestResults';

interface RuleTestingTabProps {
  rules: CommissionRule[];
}

interface TestScenario {
  amount: number;
  quantity: number;
  category: string;
  type: 'doctor' | 'agent' | 'department';
}

interface TestResult {
  rule: CommissionRule;
  matches: boolean;
  calculatedRate: { rateType: 'fixed' | 'percentage' | 'tiered'; rate: number };
  commission: number;
}

const RuleTestingTab = ({ rules }: RuleTestingTabProps) => {
  const [scenario, setScenario] = useState<TestScenario>({
    amount: 10000,
    quantity: 1,
    category: 'consultation',
    type: 'doctor'
  });
  
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [detailedResult, setDetailedResult] = useState<CommissionResult | null>(null);

  const runTest = () => {
    setIsRunning(true);
    
    // Create a transaction from the scenario
    const transaction: Transaction = {
      id: 'test-transaction',
      amount: scenario.amount,
      quantity: scenario.quantity,
      category: scenario.category,
      type: scenario.type,
      date: new Date(),
      description: 'Test transaction'
    };

    // Use the commission calculator
    const calculator = new CommissionCalculator(rules);
    const result = calculator.calculateCommission(transaction);
    setDetailedResult(result);

    // Convert to the format expected by TestResults component
    const testResults: TestResult[] = rules
      .filter(rule => rule.isActive && rule.type === scenario.type)
      .map(rule => {
        const calculation = result.calculations.find(calc => calc.ruleId === rule.id);
        
        return {
          rule,
          matches: !!calculation,
          calculatedRate: calculation ? {
            rateType: calculation.rateType,
            rate: calculation.rate
          } : {
            rateType: rule.rateType as 'fixed' | 'percentage' | 'tiered',
            rate: rule.rate
          },
          commission: calculation ? calculation.commission : 0
        };
      });

    setTestResults(testResults);
    setIsRunning(false);
  };

  const resetScenario = () => {
    setScenario({
      amount: 10000,
      quantity: 1,
      category: 'consultation',
      type: 'doctor'
    });
    setTestResults([]);
    setDetailedResult(null);
  };

  return (
    <div className="space-y-6">
      <TestScenarioForm 
        scenario={scenario}
        onScenarioChange={setScenario}
        onRunTest={runTest}
        onReset={resetScenario}
        isRunning={isRunning}
      />
      
      <TestResults testResults={testResults} />
      
      {detailedResult && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Detailed Calculation Result</h3>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Transaction:</strong> ₹{detailedResult.transaction.amount} | 
              {detailedResult.transaction.quantity} units | 
              {detailedResult.transaction.category}
            </div>
            <div>
              <strong>Total Commission:</strong> ₹{detailedResult.totalCommission}
            </div>
            <div>
              <strong>Applicable Rules:</strong> {detailedResult.applicableRules}
            </div>
            {detailedResult.calculations.length > 0 && (
              <div>
                <strong>Calculations:</strong>
                <ul className="ml-4 mt-1 space-y-1">
                  {detailedResult.calculations.map((calc, index) => (
                    <li key={index}>
                      {calc.ruleName}: ₹{calc.commission} ({calc.details})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RuleTestingTab;
