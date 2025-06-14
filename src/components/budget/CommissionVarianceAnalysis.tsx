
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";

const CommissionVarianceAnalysis = () => {
  const varianceData = [
    {
      period: 'January 2024',
      budgeted: 85000,
      actual: 78000,
      variance: -7000,
      variancePercent: -8.2,
      reason: 'Lower consultation volume',
      impact: 'low'
    },
    {
      period: 'February 2024',
      budgeted: 85000,
      actual: 92000,
      variance: 7000,
      variancePercent: 8.2,
      reason: 'Higher surgery commissions',
      impact: 'medium'
    },
    {
      period: 'March 2024',
      budgeted: 85000,
      actual: 81000,
      variance: -4000,
      variancePercent: -4.7,
      reason: 'Planned maintenance downtime',
      impact: 'low'
    },
    {
      period: 'April 2024',
      budgeted: 85000,
      actual: 95000,
      variance: 10000,
      variancePercent: 11.8,
      reason: 'New specialist joining',
      impact: 'high'
    }
  ];

  const departmentVariance = [
    {
      department: 'Cardiology',
      budgetedQuarterly: 60000,
      actualQuarterly: 55000,
      variance: -5000,
      variancePercent: -8.3,
      trend: 'improving'
    },
    {
      department: 'Surgery',
      budgetedQuarterly: 54000,
      actualQuarterly: 62000,
      variance: 8000,
      variancePercent: 14.8,
      trend: 'increasing'
    },
    {
      department: 'Emergency',
      budgetedQuarterly: 45000,
      actualQuarterly: 43000,
      variance: -2000,
      variancePercent: -4.4,
      trend: 'stable'
    }
  ];

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-red-600';
    if (variance < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const getVarianceIcon = (variance: number) => {
    if (variance > 0) return <TrendingUp className="h-4 w-4 text-red-600" />;
    if (variance < 0) return <TrendingDown className="h-4 w-4 text-green-600" />;
    return <AlertTriangle className="h-4 w-4 text-gray-600" />;
  };

  const getImpactBadge = (impact: string) => {
    const variants = {
      low: "default",
      medium: "secondary",
      high: "destructive"
    } as const;
    
    return <Badge variant={variants[impact as keyof typeof variants]}>{impact}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Commission Variance Analysis</CardTitle>
          <CardDescription>
            Compare budgeted vs actual commission payments with variance analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {varianceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getVarianceIcon(item.variance)}
                  <div>
                    <div className="font-medium">{item.period}</div>
                    <div className="text-sm text-muted-foreground">{item.reason}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Budgeted</div>
                    <div className="font-medium">₹{item.budgeted.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Actual</div>
                    <div className="font-medium">₹{item.actual.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Variance</div>
                    <div className={`font-medium ${getVarianceColor(item.variance)}`}>
                      {item.variance > 0 ? '+' : ''}₹{Math.abs(item.variance).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Impact</div>
                    {getImpactBadge(item.impact)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Department-wise Quarterly Variance</CardTitle>
          <CardDescription>
            Quarterly variance analysis by department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentVariance.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{dept.department}</div>
                  <div className="text-sm text-muted-foreground">
                    Trend: <span className="capitalize">{dept.trend}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Budgeted (Q1)</div>
                    <div className="font-medium">₹{dept.budgetedQuarterly.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Actual (Q1)</div>
                    <div className="font-medium">₹{dept.actualQuarterly.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Variance</div>
                    <div className={`font-medium ${getVarianceColor(dept.variance)}`}>
                      {dept.variancePercent > 0 ? '+' : ''}{dept.variancePercent}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Variance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Avg Monthly Variance:</span>
                <span className="font-medium text-green-600">-₹1,750</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Best Month:</span>
                <span className="font-medium">January (-8.2%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Worst Month:</span>
                <span className="font-medium">April (+11.8%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Surgery commissions consistently over budget</div>
              <div>• Cardiology showing improvement trend</div>
              <div>• Emergency department variance is stable</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Next Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Review surgery commission rates</div>
              <div>• Investigate cardiology improvement</div>
              <div>• Plan for seasonal variations</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommissionVarianceAnalysis;
