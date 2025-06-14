
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

interface PharmacyPerformanceTrendsProps {
  period: string;
  selectedCategory: string;
  dateRange?: { from?: Date; to?: Date };
}

const PharmacyPerformanceTrends = ({ period, selectedCategory, dateRange }: PharmacyPerformanceTrendsProps) => {
  const trendData = [
    {
      month: 'Jan',
      totalCommission: 285000,
      prescriptionMeds: 95000,
      otcMeds: 35000,
      medicalSupplies: 65000,
      healthSupplements: 40000,
      surgicalItems: 50000,
      salesVolume: 980
    },
    {
      month: 'Feb',
      totalCommission: 312000,
      prescriptionMeds: 105000,
      otcMeds: 38000,
      medicalSupplies: 70000,
      healthSupplements: 43000,
      surgicalItems: 56000,
      salesVolume: 1050
    },
    {
      month: 'Mar',
      totalCommission: 334000,
      prescriptionMeds: 115000,
      otcMeds: 41000,
      medicalSupplies: 75000,
      healthSupplements: 45000,
      surgicalItems: 58000,
      salesVolume: 1120
    },
    {
      month: 'Apr',
      totalCommission: 298000,
      prescriptionMeds: 98000,
      otcMeds: 37000,
      medicalSupplies: 68000,
      healthSupplements: 42000,
      surgicalItems: 53000,
      salesVolume: 995
    },
    {
      month: 'May',
      totalCommission: 356000,
      prescriptionMeds: 125000,
      otcMeds: 45000,
      medicalSupplies: 82000,
      healthSupplements: 48000,
      surgicalItems: 56000,
      salesVolume: 1180
    },
    {
      month: 'Jun',
      totalCommission: 366510,
      prescriptionMeds: 136800,
      otcMeds: 43350,
      medicalSupplies: 80160,
      healthSupplements: 42120,
      surgicalItems: 64080,
      salesVolume: 1235
    }
  ];

  const performanceMetrics = [
    {
      metric: 'Commission Growth Rate',
      currentMonth: '+18.3%',
      lastMonth: '+12.1%',
      trend: 'up',
      description: 'Month-over-month commission growth'
    },
    {
      metric: 'Sales Volume Growth',
      currentMonth: '+15.7%',
      lastMonth: '+8.9%',
      trend: 'up',
      description: 'Monthly sales count increase'
    },
    {
      metric: 'Average Commission/Sale',
      currentMonth: '₹297',
      lastMonth: '₹285',
      trend: 'up',
      description: 'Commission per transaction'
    },
    {
      metric: 'High-Value Sales (>₹5000)',
      currentMonth: '23%',
      lastMonth: '19%',
      trend: 'up',
      description: 'Percentage of high-value transactions'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{metric.metric}</p>
                <p className="text-2xl font-bold">{metric.currentMonth}</p>
                <p className="text-xs text-muted-foreground">
                  Previous: {metric.lastMonth}
                </p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Commission Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Trends by Category</CardTitle>
          <CardDescription>Monthly commission performance across different product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`₹${Number(value).toLocaleString()}`, name]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="prescriptionMeds" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Prescription Medicines"
              />
              <Line 
                type="monotone" 
                dataKey="medicalSupplies" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Medical Supplies"
              />
              <Line 
                type="monotone" 
                dataKey="surgicalItems" 
                stroke="#ffc658" 
                strokeWidth={2}
                name="Surgical Items"
              />
              <Line 
                type="monotone" 
                dataKey="otcMeds" 
                stroke="#ff7300" 
                strokeWidth={2}
                name="OTC Medicines"
              />
              <Line 
                type="monotone" 
                dataKey="healthSupplements" 
                stroke="#0088fe" 
                strokeWidth={2}
                name="Health Supplements"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sales Volume & Commission Correlation */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Volume vs Commission Correlation</CardTitle>
          <CardDescription>Relationship between sales volume and commission earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'Sales Volume') return [value, name];
                  return [`₹${Number(value).toLocaleString()}`, name];
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="totalCommission"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
                name="Total Commission"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="salesVolume"
                stroke="#ff7300"
                strokeWidth={3}
                name="Sales Volume"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key trends and observations from pharmacy commission data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-green-600 mb-2">📈 Growth Drivers</h4>
                <ul className="text-sm space-y-1">
                  <li>• Prescription medicines showing 23% growth</li>
                  <li>• Surgical items demand increased 18%</li>
                  <li>• High-value transactions up by 4%</li>
                  <li>• Customer retention improved by 12%</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-orange-600 mb-2">⚠️ Areas for Improvement</h4>
                <ul className="text-sm space-y-1">
                  <li>• Health supplements growth slowing</li>
                  <li>• OTC medicines seasonal fluctuation</li>
                  <li>• Medical supplies inventory optimization needed</li>
                  <li>• Cross-selling opportunities untapped</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyPerformanceTrends;
