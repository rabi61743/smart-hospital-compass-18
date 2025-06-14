
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface ComparativeAnalysisChartProps {
  comparisonType: string;
  selectedCategory: string;
  dateRange: { from?: Date; to?: Date };
}

const ComparativeAnalysisChart = ({ comparisonType, selectedCategory, dateRange }: ComparativeAnalysisChartProps) => {
  // Mock comparative data based on comparison type
  const getComparativeData = () => {
    switch (comparisonType) {
      case 'month-over-month':
        return [
          { period: 'Oct 2023', current: 125000, previous: 118000, growth: 5.9 },
          { period: 'Nov 2023', current: 142000, previous: 125000, growth: 13.6 },
          { period: 'Dec 2023', current: 168000, previous: 142000, growth: 18.3 },
          { period: 'Jan 2024', current: 155000, previous: 168000, growth: -7.7 },
          { period: 'Feb 2024', current: 178000, previous: 155000, growth: 14.8 },
          { period: 'Mar 2024', current: 195000, previous: 178000, growth: 9.6 }
        ];
      case 'quarter-over-quarter':
        return [
          { period: 'Q1 2023', current: 425000, previous: 380000, growth: 11.8 },
          { period: 'Q2 2023', current: 468000, previous: 425000, growth: 10.1 },
          { period: 'Q3 2023', current: 512000, previous: 468000, growth: 9.4 },
          { period: 'Q4 2023', current: 485000, previous: 512000, growth: -5.3 },
          { period: 'Q1 2024', current: 528000, previous: 485000, growth: 8.9 }
        ];
      case 'year-over-year':
        return [
          { period: '2020', current: 1450000, previous: 1280000, growth: 13.3 },
          { period: '2021', current: 1680000, previous: 1450000, growth: 15.9 },
          { period: '2022', current: 1920000, previous: 1680000, growth: 14.3 },
          { period: '2023', current: 2150000, previous: 1920000, growth: 12.0 },
          { period: '2024', current: 2380000, previous: 2150000, growth: 10.7 }
        ];
      default:
        return [];
    }
  };

  const data = getComparativeData();
  const latestGrowth = data[data.length - 1]?.growth || 0;

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (growth < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const formatPeriodLabel = () => {
    switch (comparisonType) {
      case 'month-over-month': return 'Monthly';
      case 'quarter-over-quarter': return 'Quarterly';
      case 'year-over-year': return 'Annual';
      default: return 'Period';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Latest Growth</p>
                <p className={`text-2xl font-bold ${getGrowthColor(latestGrowth)}`}>
                  {latestGrowth > 0 ? '+' : ''}{latestGrowth.toFixed(1)}%
                </p>
              </div>
              {getGrowthIcon(latestGrowth)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Growth</p>
                <p className="text-2xl font-bold">
                  {(data.reduce((sum, item) => sum + item.growth, 0) / data.length).toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Positive Periods</p>
                <p className="text-2xl font-bold">
                  {data.filter(item => item.growth > 0).length}/{data.length}
                </p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {((data.filter(item => item.growth > 0).length / data.length) * 100).toFixed(0)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparative Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>{formatPeriodLabel()} Revenue Comparison</CardTitle>
            <CardDescription>
              Current vs previous period commission revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                  labelStyle={{ color: '#000' }}
                />
                <Legend />
                <Bar dataKey="current" fill="#8884d8" name="Current Period" />
                <Bar dataKey="previous" fill="#82ca9d" name="Previous Period" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Growth Trend */}
        <Card>
          <CardHeader>
            <CardTitle>{formatPeriodLabel()} Growth Trend</CardTitle>
            <CardDescription>
              Period-over-period growth percentage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Growth']}
                  labelStyle={{ color: '#000' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="growth" 
                  stroke="#ff7300" 
                  strokeWidth={3}
                  dot={{ fill: '#ff7300', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Growth Analysis Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Growth Analysis</CardTitle>
          <CardDescription>
            {formatPeriodLabel()} commission growth breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Period</th>
                  <th className="text-right p-2">Current Revenue</th>
                  <th className="text-right p-2">Previous Revenue</th>
                  <th className="text-right p-2">Difference</th>
                  <th className="text-right p-2">Growth %</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{item.period}</td>
                    <td className="p-2 text-right">₹{item.current.toLocaleString()}</td>
                    <td className="p-2 text-right">₹{item.previous.toLocaleString()}</td>
                    <td className={`p-2 text-right font-medium ${item.current - item.previous >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.current - item.previous >= 0 ? '+' : ''}₹{(item.current - item.previous).toLocaleString()}
                    </td>
                    <td className={`p-2 text-right font-bold ${getGrowthColor(item.growth)}`}>
                      {item.growth > 0 ? '+' : ''}{item.growth.toFixed(1)}%
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

export default ComparativeAnalysisChart;
