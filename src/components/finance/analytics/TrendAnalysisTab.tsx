
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from "recharts";
import { TrendingUp, TrendingDown, Calendar, Download } from "lucide-react";

const TrendAnalysisTab = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');

  const trendData = [
    {
      period: 'Q1 2023',
      revenue: 21500000,
      expenses: 18200000,
      profit: 3300000,
      margin: 15.3,
      patients: 1250
    },
    {
      period: 'Q2 2023',
      revenue: 23200000,
      expenses: 19100000,
      profit: 4100000,
      margin: 17.7,
      patients: 1380
    },
    {
      period: 'Q3 2023',
      revenue: 24100000,
      expenses: 19800000,
      profit: 4300000,
      margin: 17.8,
      patients: 1420
    },
    {
      period: 'Q4 2023',
      revenue: 24800000,
      expenses: 20200000,
      profit: 4600000,
      margin: 18.5,
      patients: 1485
    }
  ];

  const departmentTrends = [
    {
      month: 'Jan',
      surgery: 7200000,
      cardiology: 5800000,
      emergency: 4200000,
      radiology: 2800000,
      laboratory: 2100000
    },
    {
      month: 'Feb',
      surgery: 7800000,
      cardiology: 5900000,
      emergency: 4400000,
      radiology: 2900000,
      laboratory: 2200000
    },
    {
      month: 'Mar',
      surgery: 8500000,
      cardiology: 6200000,
      emergency: 4800000,
      radiology: 3200000,
      laboratory: 2300000
    }
  ];

  const kpiTrends = [
    {
      metric: 'Revenue Growth',
      currentValue: 12.5,
      previousValue: 8.7,
      trend: 'up',
      unit: '%'
    },
    {
      metric: 'Profit Margin',
      currentValue: 18.5,
      previousValue: 17.8,
      trend: 'up',
      unit: '%'
    },
    {
      metric: 'Cost per Patient',
      currentValue: 13600,
      previousValue: 14200,
      trend: 'down',
      unit: '₹'
    },
    {
      metric: 'Patient Volume',
      currentValue: 1485,
      previousValue: 1420,
      trend: 'up',
      unit: ''
    }
  ];

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">Financial Trend Analysis</h4>
          <p className="text-sm text-muted-foreground">Track financial performance trends and forecasts</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="profit">Profit</SelectItem>
              <SelectItem value="margin">Margin</SelectItem>
              <SelectItem value="patients">Patients</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiTrends.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.metric}</CardTitle>
              {getTrendIcon(kpi.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpi.unit === '₹' ? '₹' : ''}{kpi.currentValue.toLocaleString()}{kpi.unit !== '₹' && kpi.unit !== '' ? kpi.unit : ''}
              </div>
              <p className={`text-xs ${getTrendColor(kpi.trend)}`}>
                {kpi.trend === 'up' ? '+' : ''}{((kpi.currentValue - kpi.previousValue) / kpi.previousValue * 100).toFixed(1)}% from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Performance Trends</CardTitle>
          <CardDescription>Revenue, expenses, and profit trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis yAxisId="left" tickFormatter={(value) => `₹${(Number(value) / 1000000).toFixed(0)}M`} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'margin') return [`${value}%`, 'Profit Margin'];
                  return [`₹${(Number(value) / 1000000).toFixed(1)}M`, name.charAt(0).toUpperCase() + name.slice(1)];
                }}
              />
              <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="revenue" />
              <Bar yAxisId="left" dataKey="expenses" fill="#EF4444" name="expenses" />
              <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#10B981" strokeWidth={3} name="margin" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Department Revenue Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Department Revenue Trends</CardTitle>
          <CardDescription>Monthly revenue trends by department</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={departmentTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(0)}L`} />
              <Tooltip 
                formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, '']}
              />
              <Area type="monotone" dataKey="surgery" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="Surgery" />
              <Area type="monotone" dataKey="cardiology" stackId="1" stroke="#10B981" fill="#10B981" name="Cardiology" />
              <Area type="monotone" dataKey="emergency" stackId="1" stroke="#F59E0B" fill="#F59E0B" name="Emergency" />
              <Area type="monotone" dataKey="radiology" stackId="1" stroke="#EF4444" fill="#EF4444" name="Radiology" />
              <Area type="monotone" dataKey="laboratory" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" name="Laboratory" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Forecast Section */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Forecasts</CardTitle>
          <CardDescription>Projected financial performance based on current trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Next Quarter Revenue</div>
              <div className="text-2xl font-bold text-blue-600">₹26.2Cr</div>
              <Badge variant="secondary" className="mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.6% growth
              </Badge>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Projected Profit</div>
              <div className="text-2xl font-bold text-green-600">₹4.8Cr</div>
              <Badge variant="secondary" className="mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +4.3% growth
              </Badge>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Expected Margin</div>
              <div className="text-2xl font-bold text-purple-600">18.3%</div>
              <Badge variant="secondary" className="mt-2">
                <Calendar className="h-3 w-3 mr-1" />
                Q1 2024
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysisTab;
