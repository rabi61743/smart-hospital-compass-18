
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayCircle, RefreshCw, Calculator } from "lucide-react";

interface TestScenario {
  amount: number;
  quantity: number;
  category: string;
  type: 'doctor' | 'agent' | 'department';
}

interface TestScenarioFormProps {
  scenario: TestScenario;
  onScenarioChange: (scenario: TestScenario) => void;
  onRunTest: () => void;
  onReset: () => void;
  isRunning: boolean;
}

const TestScenarioForm = ({ 
  scenario, 
  onScenarioChange, 
  onRunTest, 
  onReset, 
  isRunning 
}: TestScenarioFormProps) => {
  return (
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
                onChange={(e) => onScenarioChange({ ...scenario, amount: parseFloat(e.target.value) || 0 })}
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
              onChange={(e) => onScenarioChange({ ...scenario, quantity: parseInt(e.target.value) || 1 })}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Input
              value={scenario.category}
              onChange={(e) => onScenarioChange({ ...scenario, category: e.target.value })}
              placeholder="e.g., consultation, surgery"
            />
          </div>

          <div>
            <Label>Type</Label>
            <Select
              value={scenario.type}
              onValueChange={(value: 'doctor' | 'agent' | 'department') => 
                onScenarioChange({ ...scenario, type: value })
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
          <Button onClick={onRunTest} disabled={isRunning} className="flex-1">
            <PlayCircle className="h-4 w-4 mr-2" />
            {isRunning ? 'Running Test...' : 'Run Test'}
          </Button>
          <Button onClick={onReset} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestScenarioForm;
