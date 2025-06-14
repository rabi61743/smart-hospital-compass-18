
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface TransactionFormProps {
  newTransaction: {
    amount: string;
    quantity: string;
    category: string;
    type: 'doctor' | 'agent' | 'department';
    description: string;
  };
  onTransactionChange: (transaction: any) => void;
  onAddTransaction: () => void;
}

const TransactionForm = ({ newTransaction, onTransactionChange, onAddTransaction }: TransactionFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 bg-gray-50 rounded-lg">
      <div>
        <Label htmlFor="amount">Amount *</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={(e) => onTransactionChange({...newTransaction, amount: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          value={newTransaction.quantity}
          onChange={(e) => onTransactionChange({...newTransaction, quantity: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="category">Category *</Label>
        <Input
          id="category"
          placeholder="e.g., consultation"
          value={newTransaction.category}
          onChange={(e) => onTransactionChange({...newTransaction, category: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Select 
          value={newTransaction.type || 'doctor'} 
          onValueChange={(value: 'doctor' | 'agent' | 'department') => onTransactionChange({...newTransaction, type: value})}
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
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Optional"
          value={newTransaction.description}
          onChange={(e) => onTransactionChange({...newTransaction, description: e.target.value})}
        />
      </div>
      <div className="flex items-end">
        <Button onClick={onAddTransaction} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default TransactionForm;
