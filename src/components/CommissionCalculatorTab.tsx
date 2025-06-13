
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Plus, Trash2 } from "lucide-react";
import { CommissionRule } from "@/types/commission";
import { CommissionCalculator, Transaction, CommissionResult, createSampleTransactions } from "@/utils/commissionCalculator";

interface CommissionCalculatorTabProps {
  rules: CommissionRule[];
}

const CommissionCalculatorTab = ({ rules }: CommissionCalculatorTabProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [results, setResults] = useState<CommissionResult[]>([]);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    quantity: '1',
    category: '',
    type: 'doctor' as 'doctor' | 'agent' | 'department',
    description: ''
  });

  const addTransaction = () => {
    if (!newTransaction.amount || !newTransaction.category) return;

    const transaction: Transaction = {
      id: Date.now().toString(),
      amount: parseFloat(newTransaction.amount),
      quantity: parseInt(newTransaction.quantity),
      category: newTransaction.category,
      type: newTransaction.type,
      date: new Date(),
      description: newTransaction.description
    };

    setTransactions([...transactions, transaction]);
    setNewTransaction({
      amount: '',
      quantity: '1',
      category: '',
      type: 'doctor',
      description: ''
    });
  };

  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const calculateCommissions = () => {
    const calculator = new CommissionCalculator(rules);
    const calculationResults = calculator.calculateBatchCommissions(transactions);
    setResults(calculationResults);
  };

  const loadSampleData = () => {
    const sampleTransactions = createSampleTransactions();
    setTransactions(sampleTransactions);
  };

  const clearAll = () => {
    setTransactions([]);
    setResults([]);
  };

  const getTotalCommission = () => {
    return results.reduce((sum, result) => sum + result.totalCommission, 0);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Commission Calculator
          </CardTitle>
          <CardDescription>
            Add transactions and calculate commissions based on your active rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Transaction Form */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={newTransaction.quantity}
                onChange={(e) => setNewTransaction({...newTransaction, quantity: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                placeholder="e.g., consultation"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={newTransaction.type} onValueChange={(value: 'doctor' | 'agent' | 'department') => setNewTransaction({...newTransaction, type: value})}>
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
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Optional"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addTransaction} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={calculateCommissions} disabled={transactions.length === 0}>
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Commissions
            </Button>
            <Button variant="outline" onClick={loadSampleData}>
              Load Sample Data
            </Button>
            <Button variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          </div>

          {/* Transactions List */}
          {transactions.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Transactions ({transactions.length})</h3>
              <div className="space-y-2">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{transaction.type}</Badge>
                      <div>
                        <div className="font-medium">₹{transaction.amount}</div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.category} • {transaction.quantity} units
                        </div>
                      </div>
                      {transaction.description && (
                        <div className="text-sm text-muted-foreground">
                          {transaction.description}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeTransaction(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
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
      )}
    </div>
  );
};

export default CommissionCalculatorTab;
