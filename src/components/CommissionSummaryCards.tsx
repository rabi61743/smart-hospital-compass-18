
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface CommissionSummaryItem {
  type: string;
  amount: string;
  change: string;
  color: string;
}

interface CommissionSummaryCardsProps {
  summaryData: CommissionSummaryItem[];
}

const CommissionSummaryCards = ({ summaryData }: CommissionSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData.map((item, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {item.type}
            </CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{item.amount}</div>
            <p className={`text-xs font-medium ${item.color}`}>
              {item.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommissionSummaryCards;
