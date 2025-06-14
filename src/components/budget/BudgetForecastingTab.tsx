
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, Calculator, Target, Calendar } from "lucide-react";

const BudgetForecastingTab = () => {
  const [forecastPeriod, setForecastPeriod] = useState('next-quarter');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const forecastData = [
    { month: 'Jul', actual: 740000, projected: 750000, optimistic: 780000, pessimistic: 720000 },
    { month: 'Aug', actual: null, projected: 780000, optimistic: 810000, pessimistic: 750000 },
    { month: 'Sep', actual: null, projected: 820000, optimistic: 850000, pessimistic: 790000 },
    { month: 'Oct', actual: null, projected: 760000, optimistic: 790000, pessimistic: 730000 },
    { month: 'Nov', actual: null, projected: 800000, optimistic: 830000, pessimistic: 770000 },
    { month: 'Dec', actual: null, projected: 850000, optimistic: 880000, pessimistic: 820000 }
  ];

  const departmentForecasts = [
    { department: 'Cardiology', currentBudget: 1500000, projectedSpend: 1680000, confidence: 85 },
    { department: 'Emergency', currentBudget: 2000000, projectedSpend: 2200000, confidence: 78 },
    { department: 'Surgery', currentBudget: 1800000, projectedSpend: 1950000, confidence: 92 },
    { department: 'Radiology', currentBudget: 1200000, projectedSpend: 1150000, confidence: 88 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Budget Forecasting</h3>
          <p className="text-sm text-muted-foreground">Predict future budget requirements and spending patterns</p>
        </div>
        <div className="flex gap-2">
          <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next-quarter">Next Quarter</SelectItem>
              <SelectItem value="next-6-months">Next 6 Months</SelectItem>
              <SelectItem value="next-year">Next Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Calculator className="w-4 h-4 mr-2" />
            Generate Forecast
          </Button>
        </div>
      </div>

      {/* Forecast Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projected Total Spend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹94.8L</div>
            <p className="text-xs text-blue-600">next 6 months</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Requirement</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹102L</div>
            <p className="text-xs text-orange-600">recommended allocation</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forecast Accuracy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">89.2%</div>
            <p className="text-xs text-green-600">historical accuracy</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Gap</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹7.2L</div>
            <p className="text-xs text-red-600">additional funding needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Parameters */}
      <Card>
        <CardHeader>
          <CardTitle>Forecast Parameters</CardTitle>
          <CardDescription>Adjust parameters to customize forecasting models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="growth-rate">Growth Rate (%)</Label>
              <Input id="growth-rate" type="number" defaultValue="5.2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inflation">Inflation Factor (%)</Label>
              <Input id="inflation" type="number" defaultValue="3.8" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seasonal">Seasonal Adjustment</Label>
              <Select defaultValue="moderate">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Forecast Visualization</CardTitle>
          <CardDescription>Projected spending with confidence intervals</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `₹${(value as number).toLocaleString()}`,
                  name === 'projected' ? 'Projected' : 
                  name === 'optimistic' ? 'Optimistic' : 
                  name === 'pessimistic' ? 'Pessimistic' : 'Actual'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="pessimistic" 
                stackId="1"
                stroke="#EF4444" 
                fill="#FEE2E2"
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="optimistic" 
                stackId="2"
                stroke="#10B981" 
                fill="#D1FAE5"
                fillOpacity={0.3}
              />
              <Line 
                type="monotone" 
                dataKey="projected" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#6B7280" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#6B7280', strokeWidth: 2, r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Department Forecasts */}
      <Card>
        <CardHeader>
          <CardTitle>Department Budget Forecasts</CardTitle>
          <CardDescription>Projected budget requirements by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Department</th>
                  <th className="text-right p-2">Current Budget</th>
                  <th className="text-right p-2">Projected Spend</th>
                  <th className="text-right p-2">Variance</th>
                  <th className="text-center p-2">Confidence</th>
                  <th className="text-center p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {departmentForecasts.map((forecast, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{forecast.department}</td>
                    <td className="p-2 text-right">₹{forecast.currentBudget.toLocaleString()}</td>
                    <td className="p-2 text-right">₹{forecast.projectedSpend.toLocaleString()}</td>
                    <td className={`p-2 text-right ${
                      forecast.projectedSpend > forecast.currentBudget ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {forecast.projectedSpend > forecast.currentBudget ? '+' : ''}
                      ₹{Math.abs(forecast.projectedSpend - forecast.currentBudget).toLocaleString()}
                    </td>
                    <td className="p-2 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        forecast.confidence > 85 ? 'bg-green-100 text-green-800' :
                        forecast.confidence > 75 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {forecast.confidence}%
                      </span>
                    </td>
                    <td className="p-2 text-center">
                      <Button variant="outline" size="sm">
                        Adjust
                      </Button>
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

export default BudgetForecastingTab;
