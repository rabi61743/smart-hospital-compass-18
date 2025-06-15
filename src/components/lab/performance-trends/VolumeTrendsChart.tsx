
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface VolumeTrendsChartProps {
  data: Array<{
    month: string;
    bloodTests: number;
    imaging: number;
    pathology: number;
    microbiology: number;
  }>;
}

const VolumeTrendsChart = ({ data }: VolumeTrendsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Volume Trends</CardTitle>
        <CardDescription>
          Number of tests performed monthly by category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="bloodTests" 
              stackId="1" 
              stroke="#8884d8" 
              fill="#8884d8"
              name="Blood Tests"
            />
            <Area 
              type="monotone" 
              dataKey="imaging" 
              stackId="1" 
              stroke="#82ca9d" 
              fill="#82ca9d"
              name="Imaging"
            />
            <Area 
              type="monotone" 
              dataKey="pathology" 
              stackId="1" 
              stroke="#ffc658" 
              fill="#ffc658"
              name="Pathology"
            />
            <Area 
              type="monotone" 
              dataKey="microbiology" 
              stackId="1" 
              stroke="#ff7300" 
              fill="#ff7300"
              name="Microbiology"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default VolumeTrendsChart;
