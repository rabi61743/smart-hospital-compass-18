
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";

const ExpenseMonitoringTab = () => {
  const monthlyExpenses = [
    { month: 'Jan', operational: 1200000, staff: 1800000, equipment: 500000, utilities: 300000 },
    { month: 'Feb', operational: 1150000, staff: 1850000, equipment: 600000, utilities: 320000 },
    { month: 'Mar', operational: 1300000, staff: 1900000, equipment: 450000, utilities: 310000 },
    { month: 'Apr', operational: 1250000, staff: 1950000, equipment: 700000, utilities: 330000 },
    { month: 'May', operational: 1400000, staff: 2000000, equipment: 550000, utilities: 340000 },
    { month: 'Jun', operational: 1350000, staff: 2050000, equipment: 650000, utilities: 350000 }
  ];

  const expenseCategories = [
    { category: 'Staff Salaries', amount: 2050000, budget: 2200000, variance: -6.8 },
    { category: 'Medical Supplies', amount: 850000, budget: 800000, variance: 6.3 },
    { category: 'Equipment', amount: 650000, budget: 700000, variance: -7.1 },
    { category: 'Utilities', amount: 350000, budget: 320000, variance: 9.4 },
    { category: 'Maintenance', amount: 280000, budget: 300000, variance: -6.7 },
    { category: 'Insurance', amount: 180000, budget: 200000, variance: -10.0 }
  ];

  const chartConfig = {
    operational: { label: "Operational", color: "#8884d8" },
    staff: { label: "Staff", color: "#82ca9d" },
    equipment: { label: "Equipment", color: "#ffc658" },
    utilities: { label: "Utilities", color: "#ff7300" }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expense Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expense Trends</CardTitle>
            <CardDescription>Expense breakdown by category over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(0)}L`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, '']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="operational" 
                    stackId="1" 
                    stroke="var(--color-operational)" 
                    fill="var(--color-operational)" 
                    name="Operational"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="staff" 
                    stackId="1" 
                    stroke="var(--color-staff)" 
                    fill="var(--color-staff)"
                    name="Staff" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="equipment" 
                    stackId="1" 
                    stroke="var(--color-equipment)" 
                    fill="var(--color-equipment)"
                    name="Equipment" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="utilities" 
                    stackId="1" 
                    stroke="var(--color-utilities)" 
                    fill="var(--color-utilities)"
                    name="Utilities" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Budget vs Actual */}
        <Card>
          <CardHeader>
            <CardTitle>Budget vs Actual Expenses</CardTitle>
            <CardDescription>Current month budget variance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {expenseCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">₹{(category.amount / 100000).toFixed(1)}L</span>
                      <Badge 
                        variant={category.variance > 0 ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {category.variance > 0 ? '+' : ''}{category.variance.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={(category.amount / category.budget) * 100} 
                    className="h-2" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Budget: ₹{(category.budget / 100000).toFixed(1)}L</span>
                    <span>
                      {category.variance > 0 ? 'Over' : 'Under'} by ₹{(Math.abs(category.amount - category.budget) / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹43.5L</div>
            <p className="text-xs text-green-600">-2.3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Largest Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹20.5L</div>
            <p className="text-xs text-muted-foreground">Staff Salaries</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.2%</div>
            <p className="text-xs text-blue-600">Within budget limits</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cost per Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,247</div>
            <p className="text-xs text-orange-600">+5.2% increase</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseMonitoringTab;
