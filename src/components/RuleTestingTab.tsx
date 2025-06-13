
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlayCircle, RefreshCw, Calculator } from "lucide-react";
import { CommissionRule } from "@/types/commission";
import { evaluateAdvancedConditions, calculateConditionalRate, EvaluationContext } from "@/utils/conditionEvaluator";

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
        let calculatedRate = { rateType: rule.rateType, rate: rule.rate };
        
        // Check basic conditions
        if (rule.minAmount && scenario.amount < rule.minAmount) matches = false;
        if (rule.maxAmount && scenario.amount > rule.maxAmount) matches = false;
        if (rule.category && rule.category.toLowerCase() !== scenario.category.toLowerCase()) matches = false;
        
        // Check advanced conditions if they exist
        if (matches && rule.advancedConditions && rule.advancedConditions.conditions.length > 0) {
          matches = evaluateAdvancedConditions(rule.advancedConditions, context);
          
          if (matches) {
            calculatedRate = calculateConditionalRate(
              rule.advancedConditions,
              context,
              { rateType: rule.rateType, rate: rule.rate }
            );
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

  const getMatchingRules = () => testResults.filter(result => result.matches);
  const getTotalCommission = () => getMatchingRules().reduce((sum, result) => sum + result.commission, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Rule Testing & Simulation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label>Transaction Amount</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={scenario.amount}
                  onChange={(e) => setScenario({ ...scenario, amount: parseFloat(e.target.value) || 0 })}
                  className="pl-8"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  ₹
                </span>
              </div>
            </div>

            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={scenario.quantity}
                onChange={(e) => setScenario({ ...scenario, quantity: parseInt(e.target.value) || 1 })}
              />
            </div>

            <div>
              <Label>Category</Label>
              <Input
                value={scenario.category}
                onChange={(e) => setScenario({ ...scenario, category: e.target.value })}
                placeholder="e.g., consultation, surgery"
              />
            </div>

            <div>
              <Label>Type</Label>
              <Select
                value={scenario.type}
                onValueChange={(value: 'doctor' | 'agent' | 'department') => 
                  setScenario({ ...scenario, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={runTest} disabled={isRunning} className="flex-1">
              <PlayCircle className="h-4 w-4 mr-2" />
              {isRunning ? 'Running Test...' : 'Run Test'}
            </Button>
            <Button onClick={resetScenario} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Total Rules Evaluated</div>
                <div className="text-2xl font-bold">{testResults.length}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Matching Rules</div>
                <div className="text-2xl font-bold text-green-600">{getMatchingRules().length}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Total Commission</div>
                <div className="text-2xl font-bold text-blue-600">₹{getTotalCommission().toFixed(2)}</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div
                  key={result.rule.id}
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
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RuleTestingTab;
