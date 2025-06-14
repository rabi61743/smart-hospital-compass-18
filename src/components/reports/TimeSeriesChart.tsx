
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TimeSeriesData } from '@/hooks/useCommissionReports';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
}

const TimeSeriesChart = ({ data }: TimeSeriesChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Trends Over Time</CardTitle>
        <CardDescription>Track commission performance across different service categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [`₹${Number(value).toLocaleString()}`, name]}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="totalCommissions" 
              stroke="#8884d8" 
              strokeWidth={2}
              name="Total Commissions"
            />
            <Line 
              type="monotone" 
              dataKey="consultations" 
              stroke="#82ca9d" 
              strokeWidth={2}
              name="Consultations"
            />
            <Line 
              type="monotone" 
              dataKey="surgeries" 
              stroke="#ffc658" 
              strokeWidth={2}
              name="Surgeries"
            />
            <Line 
              type="monotone" 
              dataKey="labTests" 
              stroke="#ff7300" 
              strokeWidth={2}
              name="Lab Tests"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TimeSeriesChart;
