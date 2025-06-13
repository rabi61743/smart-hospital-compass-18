
import React, { useState } from 'react';
import { CommissionRule } from "@/types/commission";
import { evaluateAdvancedConditions, calculateConditionalRate, EvaluationContext } from "@/utils/conditionEvaluator";
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

  const runTest = () => {
    setIsRunning(true);
    
    const context: EvaluationContext = {
      amount: scenario.amount,
      quantity: scenario.quantity,
      category: scenario.category,
      type: scenario.type
    };

    const results: TestResult[] = rules
      .filter(rule => rule.isActive && rule.type === scenario.type)
      .map(rule => {
        let matches = true;
        let calculatedRate: { rateType: 'fixed' | 'percentage' | 'tiered'; rate: number } = { 
          rateType: rule.rateType, 
          rate: rule.rate 
        };
        
        // Check basic conditions
        if (rule.minAmount && scenario.amount < rule.minAmount) matches = false;
        if (rule.maxAmount && scenario.amount > rule.maxAmount) matches = false;
        if (rule.category && rule.category.toLowerCase() !== scenario.category.toLowerCase()) matches = false;
        
        // Check advanced conditions if they exist
        if (matches && rule.advancedConditions && rule.advancedConditions.conditions.length > 0) {
          matches = evaluateAdvancedConditions(rule.advancedConditions, context);
          
          if (matches) {
            const conditionalRate = calculateConditionalRate(
              rule.advancedConditions,
              context,
              { rateType: rule.rateType, rate: rule.rate }
            );
            
            calculatedRate = {
              rateType: conditionalRate.rateType as 'fixed' | 'percentage' | 'tiered',
              rate: conditionalRate.rate
            };
          }
        }
        
        // Calculate commission
        let commission = 0;
        if (matches) {
          if (calculatedRate.rateType === 'percentage') {
            commission = (scenario.amount * calculatedRate.rate) / 100;
          } else if (calculatedRate.rateType === 'fixed') {
            commission = calculatedRate.rate * scenario.quantity;
          }
        }
        
        return {
          rule,
          matches,
          calculatedRate,
          commission
        };
      });

    setTestResults(results);
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
    </div>
  );
};

export default RuleTestingTab;
