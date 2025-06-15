
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CommissionTrendsChartProps {
  data: Array<{
    month: string;
    bloodTests: number;
    imaging: number;
    pathology: number;
    microbiology: number;
    total: number;
  }>;
}

const CommissionTrendsChart = ({ data }: CommissionTrendsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Trends Over Time</CardTitle>
        <CardDescription>
          Monthly commission trends by test category showing growth patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#8884d8" 
              strokeWidth={3}
              name="Total Commission"
            />
            <Line 
              type="monotone" 
              dataKey="imaging" 
              stroke="#82ca9d" 
              strokeWidth={2}
              name="Imaging"
            />
            <Line 
              type="monotone" 
              dataKey="pathology" 
              stroke="#ffc658" 
              strokeWidth={2}
              name="Pathology"
            />
            <Line 
              type="monotone" 
              dataKey="bloodTests" 
              stroke="#ff7300" 
              strokeWidth={2}
              name="Blood Tests"
            />
            <Line 
              type="monotone" 
              dataKey="microbiology" 
              stroke="#00ff88" 
              strokeWidth={2}
              name="Microbiology"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CommissionTrendsChart;
