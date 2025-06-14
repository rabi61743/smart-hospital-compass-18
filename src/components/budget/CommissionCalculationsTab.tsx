
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Users, Building2, DollarSign, Download } from "lucide-react";
import CommissionBudgetAllocation from './CommissionBudgetAllocation';
import CommissionVarianceAnalysis from './CommissionVarianceAnalysis';
import CommissionForecastProjections from './CommissionForecastProjections';

const CommissionCalculationsTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const commissionSummary = {
    totalBudgetAllocated: 850000,
    totalCalculated: 720000,
    totalPaid: 680000,
    pendingPayments: 40000,
    variancePercentage: -15.3,
    forecastedTotal: 950000
  };

  const departmentBreakdown = [
    {
      department: 'Cardiology',
      budgetAllocated: 200000,
      calculated: 185000,
      paid: 175000,
      variance: -7.5,
      doctors: 8
    },
    {
      department: 'Surgery',
      budgetAllocated: 180000,
      calculated: 165000,
      paid: 160000,
      variance: -8.3,
      doctors: 6
    },
    {
      department: 'Emergency',
      budgetAllocated: 150000,
      calculated: 140000,
      paid: 135000,
      variance: -6.7,
      doctors: 10
    },
    {
      department: 'Radiology',
      budgetAllocated: 120000,
      calculated: 110000,
      paid: 105000,
      variance: -8.3,
      doctors: 4
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Commission Calculations Integration
          </h3>
          <p className="text-sm text-muted-foreground">
            Integrate commission calculations with budget planning and tracking
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="current-quarter">Current Quarter</SelectItem>
              <SelectItem value="current-year">Current Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Commission Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Allocated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{commissionSummary.totalBudgetAllocated.toLocaleString()}</div>
            <p className="text-xs text-blue-600">for commission payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calculated Commission</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{commissionSummary.totalCalculated.toLocaleString()}</div>
            <p className="text-xs text-green-600">based on transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Commission</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{commissionSummary.totalPaid.toLocaleString()}</div>
            <p className="text-xs text-orange-600">₹{commissionSummary.pendingPayments.toLocaleString()} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Variance</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{Math.abs(commissionSummary.variancePercentage)}%</div>
            <p className="text-xs text-green-600">under budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Commission Budget by Department</CardTitle>
              <CardDescription>Budget allocation vs actual commission calculations</CardDescription>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="surgery">Surgery</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="radiology">Radiology</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentBreakdown
              .filter(dept => selectedDepartment === 'all' || dept.department.toLowerCase() === selectedDepartment)
              .map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{dept.department}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {dept.doctors} doctors
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Budget</div>
                    <div className="font-medium">₹{dept.budgetAllocated.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Calculated</div>
                    <div className="font-medium">₹{dept.calculated.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Paid</div>
                    <div className="font-medium">₹{dept.paid.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Variance</div>
                    <Badge variant={dept.variance < 0 ? "default" : "destructive"}>
                      {dept.variance > 0 ? '+' : ''}{dept.variance}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="allocation" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="allocation">Budget Allocation</TabsTrigger>
          <TabsTrigger value="variance">Variance Analysis</TabsTrigger>
          <TabsTrigger value="forecast">Forecast Projections</TabsTrigger>
        </TabsList>

        <TabsContent value="allocation">
          <CommissionBudgetAllocation />
        </TabsContent>

        <TabsContent value="variance">
          <CommissionVarianceAnalysis />
        </TabsContent>

        <TabsContent value="forecast">
          <CommissionForecastProjections />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommissionCalculationsTab;
