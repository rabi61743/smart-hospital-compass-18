
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, Calendar, TrendingUp } from "lucide-react";

const ReceivablesReportsTab = () => {
  const [dateRange, setDateRange] = useState('last-30-days');

  const agingData = [
    { period: '0-30 days', amount: 425000, count: 156 },
    { period: '31-60 days', amount: 285000, count: 89 },
    { period: '61-90 days', amount: 185000, count: 45 },
    { period: '91-120 days', amount: 125000, count: 28 },
    { period: '120+ days', amount: 85000, count: 18 }
  ];

  const collectionTrendData = [
    { month: 'Jul', collected: 180000, outstanding: 420000 },
    { month: 'Aug', collected: 195000, outstanding: 385000 },
    { month: 'Sep', collected: 210000, outstanding: 345000 },
    { month: 'Oct', collected: 185000, outstanding: 380000 },
    { month: 'Nov', collected: 225000, outstanding: 320000 },
    { month: 'Dec', collected: 240000, outstanding: 285000 }
  ];

  const paymentMethodData = [
    { method: 'Bank Transfer', amount: 450000, percentage: 42 },
    { method: 'Credit Card', amount: 320000, percentage: 30 },
    { method: 'Cash', amount: 200000, percentage: 19 },
    { method: 'Check', amount: 95000, percentage: 9 }
  ];

  const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const chartConfig = {
    collected: { label: "Collected", color: "#16a34a" },
    outstanding: { label: "Outstanding", color: "#dc2626" },
    amount: { label: "Amount", color: "#2563eb" }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Accounts Receivable Reports</h3>
          <p className="text-sm text-muted-foreground">Financial reports and analytics for receivables</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-3-months">Last 3 months</SelectItem>
              <SelectItem value="last-6-months">Last 6 months</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total AR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹11.05L</div>
            <p className="text-xs text-red-600">+8.5% vs last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹2.4L</div>
            <p className="text-xs text-green-600">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">91.2%</div>
            <p className="text-xs text-blue-600">+2.1% improvement</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Days Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">28 days</div>
            <p className="text-xs text-green-600">-3 days improvement</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aging Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Aging Analysis</CardTitle>
            <CardDescription>Outstanding amounts by aging period</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(0)}L`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, 'Amount']}
                  />
                  <Bar dataKey="amount" fill="var(--color-amount)" name="Outstanding Amount" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Collection Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Collection Trends</CardTitle>
            <CardDescription>Monthly collection vs outstanding trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={collectionTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(0)}L`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, '']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="collected" 
                    stroke="var(--color-collected)" 
                    strokeWidth={2}
                    name="Collected"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="outstanding" 
                    stroke="var(--color-outstanding)" 
                    strokeWidth={2}
                    name="Outstanding"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods & Detailed Aging */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of collection methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[300px] flex items-center justify-center">
              <ChartContainer config={{}} className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="amount"
                      label={({method, percentage}) => `${method}: ${percentage}%`}
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, 'Amount']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Aging Report</CardTitle>
            <CardDescription>Breakdown by aging buckets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agingData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.period}</h4>
                    <p className="text-sm text-muted-foreground">{item.count} accounts</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{(item.amount / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-muted-foreground">
                      {((item.amount / 1105000) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReceivablesReportsTab;
