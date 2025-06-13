
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Transaction } from "@/utils/commissionCalculator";

interface TransactionsListProps {
  transactions: Transaction[];
  onRemoveTransaction: (id: string) => void;
}

const TransactionsList = ({ transactions, onRemoveTransaction }: TransactionsListProps) => {
  if (transactions.length === 0) {
    return null;
  }

  return (
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
              onClick={() => onRemoveTransaction(transaction.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
