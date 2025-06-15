
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ComparativeAnalysisTableProps {
  data: Array<{
    period: string;
    current: number;
    previous: number;
    growth: number;
  }>;
  comparisonType: string;
}

const ComparativeAnalysisTable = ({ data, comparisonType }: ComparativeAnalysisTableProps) => {
  const formatPeriodLabel = () => {
    switch (comparisonType) {
      case 'month-over-month': return 'Monthly';
      case 'quarter-over-quarter': return 'Quarterly';
      case 'year-over-year': return 'Annual';
      default: return 'Period';
    }
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Growth Analysis</CardTitle>
        <CardDescription>
          {formatPeriodLabel()} commission growth breakdown
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Period</th>
                <th className="text-right p-2">Current Revenue</th>
                <th className="text-right p-2">Previous Revenue</th>
                <th className="text-right p-2">Difference</th>
                <th className="text-right p-2">Growth %</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">{item.period}</td>
                  <td className="p-2 text-right">₹{item.current.toLocaleString()}</td>
                  <td className="p-2 text-right">₹{item.previous.toLocaleString()}</td>
                  <td className={`p-2 text-right font-medium ${item.current - item.previous >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.current - item.previous >= 0 ? '+' : ''}₹{(item.current - item.previous).toLocaleString()}
                  </td>
                  <td className={`p-2 text-right font-bold ${getGrowthColor(item.growth)}`}>
                    {item.growth > 0 ? '+' : ''}{item.growth.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparativeAnalysisTable;
