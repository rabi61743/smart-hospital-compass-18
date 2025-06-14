
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const RevenueTrackingTab = () => {
  const monthlyRevenue = [
    { month: 'Jan', revenue: 3800000, target: 4000000 },
    { month: 'Feb', revenue: 4200000, target: 4000000 },
    { month: 'Mar', revenue: 3900000, target: 4000000 },
    { month: 'Apr', revenue: 4500000, target: 4500000 },
    { month: 'May', revenue: 4520000, target: 4500000 },
    { month: 'Jun', revenue: 4200000, target: 4500000 }
  ];

  const departmentRevenue = [
    { department: 'OPD', revenue: 1850000, percentage: 35 },
    { department: 'Surgery', revenue: 1480000, percentage: 28 },
    { department: 'Laboratory', revenue: 740000, percentage: 14 },
    { department: 'Pharmacy', revenue: 592000, percentage: 11 },
    { department: 'Emergency', revenue: 370000, percentage: 7 },
    { department: 'Others', revenue: 268000, percentage: 5 }
  ];

  const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#2563eb",
    },
    target: {
      label: "Target",
      color: "#dc2626",
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Revenue vs Target comparison for last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`₹${(value / 100000).toFixed(1)}L`, '']}
                  />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
                  <Bar dataKey="target" fill="var(--color-target)" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Department-wise Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Revenue</CardTitle>
            <CardDescription>Revenue distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[300px] flex items-center justify-center">
              <ChartContainer config={{}} className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentRevenue}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="revenue"
                      label={({department, percentage}) => `${department}: ${percentage}%`}
                    >
                      {departmentRevenue.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      formatter={(value) => [`₹${(value / 100000).toFixed(1)}L`, 'Revenue']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Revenue Details */}
      <Card>
        <CardHeader>
          <CardTitle>Department Revenue Breakdown</CardTitle>
          <CardDescription>Detailed revenue analysis by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {departmentRevenue.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{dept.department}</span>
                    <Badge variant="secondary">{dept.percentage}%</Badge>
                  </div>
                  <span className="text-lg font-semibold">₹{(dept.revenue / 100000).toFixed(1)}L</span>
                </div>
                <Progress value={dept.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Target: ₹{((dept.revenue * 1.1) / 100000).toFixed(1)}L</span>
                  <span>Achievement: {((dept.revenue / (dept.revenue * 1.1)) * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueTrackingTab;
