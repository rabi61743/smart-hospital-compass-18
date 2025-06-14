
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Download, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const VarianceAnalysisTab = () => {
  const varianceData = [
    { department: 'Cardiology', budgeted: 1500000, actual: 1245000, variance: -255000, variancePercent: -17 },
    { department: 'Emergency', budgeted: 2000000, actual: 2150000, variance: 150000, variancePercent: 7.5 },
    { department: 'Surgery', budgeted: 1800000, actual: 1350000, variance: -450000, variancePercent: -25 },
    { department: 'Radiology', budgeted: 1200000, actual: 1180000, variance: -20000, variancePercent: -1.7 }
  ];

  const monthlyVariance = [
    { month: 'Jan', planned: 650000, actual: 680000, variance: 30000 },
    { month: 'Feb', planned: 720000, actual: 710000, variance: -10000 },
    { month: 'Mar', planned: 680000, actual: 720000, variance: 40000 },
    { month: 'Apr', planned: 750000, actual: 780000, variance: 30000 },
    { month: 'May', planned: 800000, actual: 795000, variance: -5000 },
    { month: 'Jun', planned: 720000, actual: 740000, variance: 20000 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Variance Analysis</h3>
          <p className="text-sm text-muted-foreground">Analyze budget vs actual spending patterns</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="this-month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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

      {/* Variance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Variance</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-₹95K</div>
            <p className="text-xs text-red-600">1.4% over budget</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorable Variance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹725K</div>
            <p className="text-xs text-green-600">under budget savings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unfavorable Variance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹820K</div>
            <p className="text-xs text-red-600">over budget spending</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Variance Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.3%</div>
            <p className="text-xs text-green-600">prediction accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Variance Analysis</CardTitle>
            <CardDescription>Budget vs actual spending by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={varianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `₹${(value as number).toLocaleString()}`,
                    name === 'budgeted' ? 'Budgeted' : 'Actual'
                  ]}
                />
                <Bar dataKey="budgeted" fill="#3B82F6" name="budgeted" />
                <Bar dataKey="actual" fill="#10B981" name="actual" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Variance Trend</CardTitle>
            <CardDescription>Budget variance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyVariance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${(value as number).toLocaleString()}`, 'Variance']}
                />
                <Line 
                  type="monotone" 
                  dataKey="variance" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  dot={{ fill: '#EF4444' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Variance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Variance Report</CardTitle>
          <CardDescription>Department-wise budget variance breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Department</th>
                  <th className="text-right p-2">Budgeted Amount</th>
                  <th className="text-right p-2">Actual Amount</th>
                  <th className="text-right p-2">Variance (₹)</th>
                  <th className="text-right p-2">Variance (%)</th>
                  <th className="text-center p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {varianceData.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{row.department}</td>
                    <td className="p-2 text-right">₹{row.budgeted.toLocaleString()}</td>
                    <td className="p-2 text-right">₹{row.actual.toLocaleString()}</td>
                    <td className={`p-2 text-right ${row.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {row.variance > 0 ? '+' : ''}₹{Math.abs(row.variance).toLocaleString()}
                    </td>
                    <td className={`p-2 text-right ${row.variancePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {row.variancePercent > 0 ? '+' : ''}{row.variancePercent}%
                    </td>
                    <td className="p-2 text-center">
                      {row.variance > 0 ? (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Over Budget</span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Under Budget</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VarianceAnalysisTab;
