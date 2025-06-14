
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Bar } from "recharts";

const ProfitLossTab = () => {
  const profitLossData = [
    { month: 'Jan', revenue: 3800000, expenses: 2850000, profit: 950000, margin: 25.0 },
    { month: 'Feb', revenue: 4200000, expenses: 2920000, profit: 1280000, margin: 30.5 },
    { month: 'Mar', revenue: 3900000, expenses: 2960000, profit: 940000, margin: 24.1 },
    { month: 'Apr', revenue: 4500000, expenses: 3230000, profit: 1270000, margin: 28.2 },
    { month: 'May', revenue: 4520000, expenses: 3290000, profit: 1230000, margin: 27.2 },
    { month: 'Jun', revenue: 4700000, expenses: 3350000, profit: 1350000, margin: 28.7 }
  ];

  const quarterlyData = [
    { quarter: 'Q1 2024', revenue: 11900000, expenses: 8730000, profit: 3170000, margin: 26.6 },
    { quarter: 'Q2 2024', revenue: 13720000, expenses: 9870000, profit: 3850000, margin: 28.0 },
    { quarter: 'Q3 2024', revenue: 12800000, expenses: 9200000, profit: 3600000, margin: 28.1 },
    { quarter: 'Q4 2024', revenue: 14200000, expenses: 10100000, profit: 4100000, margin: 28.9 }
  ];

  const chartConfig = {
    revenue: { label: "Revenue", color: "#2563eb" },
    expenses: { label: "Expenses", color: "#dc2626" },
    profit: { label: "Profit", color: "#16a34a" },
    margin: { label: "Margin %", color: "#9333ea" }
  };

  return (
    <div className="space-y-6">
      {/* P&L Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₹47.0L</div>
            <p className="text-xs text-green-600">+12.5% vs last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹33.5L</div>
            <p className="text-xs text-green-600">-2.1% vs last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹13.5L</div>
            <p className="text-xs text-green-600">+28.7% margin</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">EBITDA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">₹15.2L</div>
            <p className="text-xs text-blue-600">32.3% of revenue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly P&L Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Profit & Loss Trend</CardTitle>
            <CardDescription>Revenue, expenses, and profit over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={profitLossData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [
                      name === 'margin' ? `${value}%` : `₹${(value / 100000).toFixed(1)}L`,
                      name === 'margin' ? 'Profit Margin' : name
                    ]}
                  />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
                  <Bar dataKey="expenses" fill="var(--color-expenses)" name="Expenses" />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="var(--color-profit)" 
                    strokeWidth={3}
                    name="Profit"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Profit Margin Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Profit Margin Analysis</CardTitle>
            <CardDescription>Monthly profit margin percentage trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitLossData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    domain={[20, 35]} 
                    tickFormatter={(value) => `${value}%`} 
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`${value}%`, 'Profit Margin']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="margin" 
                    stroke="var(--color-margin)" 
                    strokeWidth={4}
                    dot={{ fill: 'var(--color-margin)', strokeWidth: 2, r: 6 }}
                    name="Profit Margin"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* P&L Statement */}
      <Card>
        <CardHeader>
          <CardTitle>Profit & Loss Statement</CardTitle>
          <CardDescription>Current month detailed P&L breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Revenue Section */}
            <div className="border-b pb-4">
              <h4 className="font-semibold text-lg mb-3">Revenue</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>OPD Revenue</span>
                  <span className="font-medium">₹18.5L</span>
                </div>
                <div className="flex justify-between">
                  <span>Surgery Revenue</span>
                  <span className="font-medium">₹14.8L</span>
                </div>
                <div className="flex justify-between">
                  <span>Laboratory Revenue</span>
                  <span className="font-medium">₹7.4L</span>
                </div>
                <div className="flex justify-between">
                  <span>Pharmacy Revenue</span>
                  <span className="font-medium">₹5.9L</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total Revenue</span>
                  <span>₹47.0L</span>
                </div>
              </div>
            </div>

            {/* Expenses Section */}
            <div className="border-b pb-4">
              <h4 className="font-semibold text-lg mb-3">Expenses</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Staff Salaries</span>
                  <span className="font-medium">₹20.5L</span>
                </div>
                <div className="flex justify-between">
                  <span>Medical Supplies</span>
                  <span className="font-medium">₹8.5L</span>
                </div>
                <div className="flex justify-between">
                  <span>Equipment & Maintenance</span>
                  <span className="font-medium">₹2.8L</span>
                </div>
                <div className="flex justify-between">
                  <span>Utilities & Overhead</span>
                  <span className="font-medium">₹1.7L</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total Expenses</span>
                  <span>₹33.5L</span>
                </div>
              </div>
            </div>

            {/* Profit Section */}
            <div>
              <div className="flex justify-between text-xl font-bold text-green-600">
                <span>Net Profit</span>
                <span>₹13.5L</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Profit Margin</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  28.7%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitLossTab;
