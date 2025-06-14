
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertCircle, CheckCircle, Edit } from "lucide-react";

const CommissionBudgetAllocation = () => {
  const allocationData = [
    {
      category: 'Doctor Consultations',
      budgetAllocated: 300000,
      utilized: 275000,
      percentage: 91.7,
      status: 'on-track',
      monthlyTarget: 25000
    },
    {
      category: 'Surgery Commissions',
      budgetAllocated: 250000,
      utilized: 180000,
      percentage: 72.0,
      status: 'under-utilized',
      monthlyTarget: 20833
    },
    {
      category: 'Diagnostic Referrals',
      budgetAllocated: 150000,
      utilized: 140000,
      percentage: 93.3,
      status: 'at-risk',
      monthlyTarget: 12500
    },
    {
      category: 'Agent Referrals',
      budgetAllocated: 100000,
      utilized: 85000,
      percentage: 85.0,
      status: 'on-track',
      monthlyTarget: 8333
    },
    {
      category: 'Laboratory Tests',
      budgetAllocated: 75000,
      utilized: 68000,
      percentage: 90.7,
      status: 'on-track',
      monthlyTarget: 6250
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600';
      case 'at-risk': return 'text-yellow-600';
      case 'under-utilized': return 'text-blue-600';
      case 'over-budget': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'at-risk': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'under-utilized': return <TrendingUp className="h-4 w-4 text-blue-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Commission Budget Allocation Overview</CardTitle>
          <CardDescription>
            Monitor budget allocation and utilization across different commission categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {allocationData.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <div className="font-medium">{item.category}</div>
                      <div className="text-sm text-muted-foreground">
                        Monthly Target: ₹{item.monthlyTarget.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ₹{item.utilized.toLocaleString()} / ₹{item.budgetAllocated.toLocaleString()}
                    </div>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Utilization</span>
                    <span className={getStatusColor(item.status)}>{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Adjust Allocation
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Allocation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Allocated:</span>
                <span className="font-medium">₹8,75,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Utilized:</span>
                <span className="font-medium">₹7,48,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Remaining:</span>
                <span className="font-medium text-green-600">₹1,27,000</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm text-muted-foreground">Overall Utilization:</span>
                <span className="font-medium">85.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <span>Diagnostic Referrals approaching budget limit</span>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                <span>Surgery Commissions under-utilized - consider reallocation</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Doctor Consultations performing well</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommissionBudgetAllocation;
