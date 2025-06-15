
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ComparativeAnalysisChartsProps {
  data: Array<{
    period: string;
    current: number;
    previous: number;
    growth: number;
  }>;
  comparisonType: string;
}

const ComparativeAnalysisCharts = ({ data, comparisonType }: ComparativeAnalysisChartsProps) => {
  const formatPeriodLabel = () => {
    switch (comparisonType) {
      case 'month-over-month': return 'Monthly';
      case 'quarter-over-quarter': return 'Quarterly';
      case 'year-over-year': return 'Annual';
      default: return 'Period';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>{formatPeriodLabel()} Revenue Comparison</CardTitle>
          <CardDescription>
            Current vs previous period commission revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                labelStyle={{ color: '#000' }}
              />
              <Legend />
              <Bar dataKey="current" fill="#8884d8" name="Current Period" />
              <Bar dataKey="previous" fill="#82ca9d" name="Previous Period" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Growth Trend */}
      <Card>
        <CardHeader>
          <CardTitle>{formatPeriodLabel()} Growth Trend</CardTitle>
          <CardDescription>
            Period-over-period growth percentage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Growth']}
                labelStyle={{ color: '#000' }}
              />
              <Line 
                type="monotone" 
                dataKey="growth" 
                stroke="#ff7300" 
                strokeWidth={3}
                dot={{ fill: '#ff7300', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparativeAnalysisCharts;
