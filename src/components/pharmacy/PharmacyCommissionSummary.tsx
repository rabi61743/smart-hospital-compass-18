
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

interface PharmacyCommissionSummaryProps {
  period: string;
  selectedCategory: string;
  dateRange?: { from?: Date; to?: Date };
}

const PharmacyCommissionSummary = ({ period, selectedCategory, dateRange }: PharmacyCommissionSummaryProps) => {
  // Mock summary data
  const summaryData = {
    totalCommission: 366510,
    totalSales: 1235,
    averageCommissionPerSale: 297,
    topPerformingCategory: 'Prescription Medicines',
    monthlyGrowth: 18.3,
    categoryBreakdown: [
      { name: 'Prescription Medicines', commission: 136800, percentage: 37.3, trend: 'up' },
      { name: 'Surgical Items', commission: 64080, percentage: 17.5, trend: 'up' },
      { name: 'Medical Supplies', commission: 80160, percentage: 21.9, trend: 'stable' },
      { name: 'OTC Medicines', commission: 43350, percentage: 11.8, trend: 'up' },
      { name: 'Health Supplements', commission: 42120, percentage: 11.5, trend: 'down' }
    ]
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Commission</p>
                <p className="text-2xl font-bold">₹{summaryData.totalCommission.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+{summaryData.monthlyGrowth}% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">{summaryData.totalSales}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Commission/Sale</p>
                <p className="text-2xl font-bold">₹{summaryData.averageCommissionPerSale}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Per sale average</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Top Category</p>
                <p className="text-xl font-bold">{summaryData.topPerformingCategory}</p>
              </div>
              <Badge variant="default" className="bg-orange-100 text-orange-800">
                Best
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Highest commission earner</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance Overview</CardTitle>
          <CardDescription>
            Commission breakdown and trends by product category for {period}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summaryData.categoryBreakdown.map((category) => (
              <div key={category.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(category.trend)}
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <Badge variant="secondary">{category.percentage}%</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-green-600">
                    ₹{category.commission.toLocaleString()}
                  </span>
                  <span className={`text-sm ${getTrendColor(category.trend)}`}>
                    {category.trend === 'up' && '+'}
                    {category.trend === 'down' && '-'}
                    {category.trend !== 'stable' && Math.floor(Math.random() * 10 + 5)}
                    {category.trend !== 'stable' && '%'}
                    {category.trend === 'stable' && 'Stable'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>Important findings from the pharmacy commission analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Badge variant="default" className="mt-1">1</Badge>
              <p className="text-sm">
                <strong>Prescription medicines</strong> generate the highest commission at 37.3% of total pharmacy revenue, 
                driven primarily by specialized chronic disease medications.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Badge variant="default" className="mt-1">2</Badge>
              <p className="text-sm">
                <strong>Surgical items</strong> show strong growth with high-value surgical instruments 
                being the top performer in terms of commission per sale.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Badge variant="default" className="mt-1">3</Badge>
              <p className="text-sm">
                <strong>OTC medicines</strong> maintain steady volume and could benefit from promoting 
                higher-margin wellness and preventive care products.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Badge variant="default" className="mt-1">4</Badge>
              <p className="text-sm">
                <strong>Health supplements</strong> represent growth opportunity with increasing demand 
                for immunity boosters and nutritional supplements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyCommissionSummary;
