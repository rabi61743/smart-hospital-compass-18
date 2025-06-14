
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, FileText, TrendingUp, DollarSign, Target } from "lucide-react";

const BudgetReportsTab = () => {
  const budgetUtilization = [
    { month: 'Jan', planned: 650000, actual: 680000, utilized: 104.6 },
    { month: 'Feb', planned: 720000, actual: 710000, utilized: 98.6 },
    { month: 'Mar', planned: 680000, actual: 720000, utilized: 105.9 },
    { month: 'Apr', planned: 750000, actual: 780000, utilized: 104.0 },
    { month: 'May', planned: 800000, actual: 795000, utilized: 99.4 },
    { month: 'Jun', planned: 720000, actual: 740000, utilized: 102.8 }
  ];

  const budgetAllocation = [
    { name: 'Personnel', value: 45, amount: 3825000, color: '#3B82F6' },
    { name: 'Equipment', value: 25, amount: 2125000, color: '#10B981' },
    { name: 'Supplies', value: 15, amount: 1275000, color: '#F59E0B' },
    { name: 'Utilities', value: 8, amount: 680000, color: '#EF4444' },
    { name: 'Maintenance', value: 7, amount: 595000, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Budget Reports</h3>
          <p className="text-sm text-muted-foreground">Comprehensive budget analysis and reporting</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="this-month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Compliance</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-xs text-green-600">departments on track</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost per Patient</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4,850</div>
            <p className="text-xs text-blue-600">average this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.7%</div>
            <p className="text-xs text-green-600">resource utilization</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Achieved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12.8L</div>
            <p className="text-xs text-green-600">year to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Budget Utilization</CardTitle>
            <CardDescription>Planned vs actual spending trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetUtilization}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'utilized' ? `${value}%` : `₹${(value as number).toLocaleString()}`,
                    name === 'planned' ? 'Planned' : name === 'actual' ? 'Actual' : 'Utilization %'
                  ]}
                />
                <Bar dataKey="planned" fill="#93C5FD" name="planned" />
                <Bar dataKey="actual" fill="#3B82F6" name="actual" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Allocation by Category</CardTitle>
            <CardDescription>Distribution of annual budget allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {budgetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`₹${budgetAllocation.find(item => item.name === name)?.amount.toLocaleString()}`, 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Budget Reports</CardTitle>
          <CardDescription>Generate common budget reports and analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              Budget Summary
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <TrendingUp className="w-6 h-6 mb-2" />
              Variance Report
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <DollarSign className="w-6 h-6 mb-2" />
              Department Analysis
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Target className="w-6 h-6 mb-2" />
              Performance Metrics
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              Forecast Report
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <TrendingUp className="w-6 h-6 mb-2" />
              Cost Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Budget Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Performance Summary</CardTitle>
          <CardDescription>Key budget metrics and performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Metric</th>
                  <th className="text-right p-2">Current Period</th>
                  <th className="text-right p-2">Previous Period</th>
                  <th className="text-right p-2">Change</th>
                  <th className="text-center p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Total Budget Utilization</td>
                  <td className="p-2 text-right">87.3%</td>
                  <td className="p-2 text-right">84.7%</td>
                  <td className="p-2 text-right text-green-600">+2.6%</td>
                  <td className="p-2 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Good</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Cost per Patient</td>
                  <td className="p-2 text-right">₹4,850</td>
                  <td className="p-2 text-right">₹4,920</td>
                  <td className="p-2 text-right text-green-600">-₹70</td>
                  <td className="p-2 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Improved</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Budget Variance</td>
                  <td className="p-2 text-right">2.3%</td>
                  <td className="p-2 text-right">3.8%</td>
                  <td className="p-2 text-right text-green-600">-1.5%</td>
                  <td className="p-2 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Better</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetReportsTab;
