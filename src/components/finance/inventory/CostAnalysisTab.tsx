
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const CostAnalysisTab = () => {
  const monthlyTrends = [
    { month: 'Jan', pharmacy: 16.8, lab: 9.2, total: 26.0 },
    { month: 'Feb', pharmacy: 17.5, lab: 9.8, total: 27.3 },
    { month: 'Mar', pharmacy: 16.2, lab: 8.9, total: 25.1 },
    { month: 'Apr', pharmacy: 18.1, lab: 10.4, total: 28.5 },
    { month: 'May', pharmacy: 17.9, lab: 9.9, total: 27.8 },
    { month: 'Jun', pharmacy: 18.2, lab: 10.3, total: 28.5 }
  ];

  const categoryBreakdown = [
    { name: 'Pharmacy', value: 18.2, color: '#3b82f6' },
    { name: 'Lab Supplies', value: 10.3, color: '#8b5cf6' }
  ];

  const costAlerts = [
    {
      item: 'Insulin Glargine',
      type: 'Pharmacy',
      issue: 'Cost increase > 15%',
      impact: 'High',
      action: 'Review supplier pricing'
    },
    {
      item: 'X-Ray Film',
      type: 'Lab',
      issue: 'Usage spike detected',
      impact: 'Medium',
      action: 'Monitor consumption'
    },
    {
      item: 'ECG Electrodes',
      type: 'Lab',
      issue: 'Low stock, high cost',
      impact: 'Medium',
      action: 'Bulk purchase consideration'
    }
  ];

  const chartConfig = {
    pharmacy: { label: "Pharmacy", color: "#3b82f6" },
    lab: { label: "Lab", color: "#8b5cf6" },
    total: { label: "Total", color: "#10b981" }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Cost Efficiency</p>
              <p className="text-2xl font-bold text-green-600">92.5%</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.1% improvement
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Avg Cost Per Unit</p>
              <p className="text-2xl font-bold">₹45.20</p>
              <p className="text-xs text-orange-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +5.2% vs last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Cost Variance</p>
              <p className="text-2xl font-bold text-orange-600">+₹1.2L</p>
              <p className="text-xs text-orange-600">4.2% above budget</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600">{costAlerts.length}</p>
              <p className="text-xs text-red-600">Require attention</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Cost Trends</CardTitle>
            <CardDescription>Pharmacy vs Lab inventory costs over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${value}L`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`₹${value}L`, '']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pharmacy" 
                    stroke="var(--color-pharmacy)" 
                    strokeWidth={3}
                    name="Pharmacy"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lab" 
                    stroke="var(--color-lab)" 
                    strokeWidth={3}
                    name="Lab"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="var(--color-total)" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    name="Total"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Cost Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Distribution</CardTitle>
            <CardDescription>Current month inventory cost breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ChartContainer config={chartConfig} className="min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ₹${value}L`}
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value) => [`₹${value}L`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <div className="space-y-2">
                {categoryBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="font-medium">₹{item.value}L</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Cost Alerts & Recommendations
          </CardTitle>
          <CardDescription>Items requiring cost management attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costAlerts.map((alert, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{alert.item}</h4>
                      <Badge variant="outline">{alert.type}</Badge>
                      <Badge className={getImpactColor(alert.impact)}>
                        {alert.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.issue}</p>
                    <p className="text-sm font-medium text-blue-600">
                      Recommended Action: {alert.action}
                    </p>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostAnalysisTab;
