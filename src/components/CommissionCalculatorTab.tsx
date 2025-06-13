
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { CommissionRule } from "@/types/commission";
import { CommissionCalculator, Transaction, CommissionResult, createSampleTransactions } from "@/utils/commissionCalculator";
import TransactionForm from "./calculator/TransactionForm";
import TransactionsList from "./calculator/TransactionsList";
import CalculationResults from "./calculator/CalculationResults";

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
          <TransactionForm
            newTransaction={newTransaction}
            onTransactionChange={setNewTransaction}
            onAddTransaction={addTransaction}
          />

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

          <TransactionsList
            transactions={transactions}
            onRemoveTransaction={removeTransaction}
          />
        </CardContent>
      </Card>

      <CalculationResults results={results} />
    </div>
  );
};

export default CommissionCalculatorTab;
