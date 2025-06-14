
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, Calendar, FileText, TrendingUp } from "lucide-react";

const BillingReportsTab = () => {
  const [dateRange, setDateRange] = useState('last-30-days');

  const revenueData = [
    { month: 'Jan', revenue: 285000, collections: 245000, outstanding: 40000 },
    { month: 'Feb', revenue: 320000, collections: 280000, outstanding: 80000 },
    { month: 'Mar', revenue: 295000, collections: 310000, outstanding: 65000 },
    { month: 'Apr', revenue: 340000, collections: 295000, outstanding: 110000 },
    { month: 'May', revenue: 380000, collections: 350000, outstanding: 140000 },
    { month: 'Jun', revenue: 420000, collections: 385000, outstanding: 175000 }
  ];

  const paymentMethodData = [
    { method: 'Credit Card', amount: 450000, percentage: 35 },
    { method: 'Cash', amount: 350000, percentage: 27 },
    { method: 'UPI', amount: 280000, percentage: 22 },
    { method: 'Debit Card', amount: 180000, percentage: 14 },
    { method: 'Insurance', amount: 25000, percentage: 2 }
  ];

  const insuranceData = [
    { provider: 'Star Health', claims: 45, approved: 38, amount: 1250000 },
    { provider: 'HDFC ERGO', claims: 32, approved: 28, amount: 950000 },
    { provider: 'ICICI Lombard', claims: 28, approved: 22, amount: 780000 },
    { provider: 'Bajaj Allianz', claims: 15, approved: 12, amount: 420000 },
    { provider: 'Others', claims: 18, approved: 14, amount: 380000 }
  ];

  const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const chartConfig = {
    revenue: { label: "Revenue", color: "#2563eb" },
    collections: { label: "Collections", color: "#16a34a" },
    outstanding: { label: "Outstanding", color: "#dc2626" }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Billing Reports</h3>
          <p className="text-sm text-muted-foreground">Financial reports and analytics</p>
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

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₹42.0L</div>
            <p className="text-xs text-green-600">+18.5% vs last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹38.5L</div>
            <p className="text-xs text-blue-600">91.7% collection rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹17.5L</div>
            <p className="text-xs text-red-600">+25% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Insurance Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">₹37.8L</div>
            <p className="text-xs text-green-600">82% approval rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Collections */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Collections</CardTitle>
            <CardDescription>Monthly revenue and collection trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(0)}L`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, '']}
                  />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
                  <Bar dataKey="collections" fill="var(--color-collections)" name="Collections" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Payment Methods Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of payment methods used</CardDescription>
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
      </div>

      {/* Insurance Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Performance</CardTitle>
          <CardDescription>Claims processing and approval rates by insurance provider</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insuranceData.map((insurance, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{insurance.provider}</h4>
                  <p className="text-sm text-muted-foreground">
                    {insurance.approved}/{insurance.claims} claims approved
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{(insurance.amount / 100000).toFixed(1)}L</p>
                  <p className="text-sm text-green-600">
                    {Math.round((insurance.approved / insurance.claims) * 100)}% approval rate
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingReportsTab;
