
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, TrendingUp, PieChart, BarChart3 } from "lucide-react";

const FinancialReportsTab = () => {
  const reports = [
    {
      title: "Monthly Financial Summary",
      description: "Comprehensive monthly revenue, expenses, and profit analysis",
      type: "Summary",
      lastGenerated: "2024-06-15",
      status: "Ready",
      icon: FileText
    },
    {
      title: "Department-wise P&L",
      description: "Profit and loss breakdown by individual departments",
      type: "Detailed",
      lastGenerated: "2024-06-14",
      status: "Ready",
      icon: PieChart
    },
    {
      title: "Cash Flow Statement",
      description: "Monthly cash inflow and outflow analysis",
      type: "Cash Flow",
      lastGenerated: "2024-06-13",
      status: "Ready",
      icon: TrendingUp
    },
    {
      title: "Budget Variance Report",
      description: "Actual vs budgeted expenses and revenue comparison",
      type: "Analysis",
      lastGenerated: "2024-06-12",
      status: "Processing",
      icon: BarChart3
    },
    {
      title: "Quarterly Financial Report",
      description: "Comprehensive quarterly financial performance report",
      type: "Quarterly",
      lastGenerated: "2024-06-01",
      status: "Ready",
      icon: Calendar
    },
    {
      title: "Tax Preparation Report",
      description: "GST and income tax calculation summary",
      type: "Tax",
      lastGenerated: "2024-05-31",
      status: "Ready",
      icon: FileText
    }
  ];

  const quickStats = [
    { label: "Total Reports Generated", value: "127", period: "This Month" },
    { label: "Automated Reports", value: "89", period: "Active" },
    { label: "Custom Reports", value: "38", period: "Manual" },
    { label: "Report Accuracy", value: "99.8%", period: "Last 6 Months" }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Generate and manage financial reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>Generate Monthly Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <PieChart className="h-6 w-6" />
              <span>Department Analysis</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Custom Report Builder</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Download and manage generated financial reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report, index) => {
              const IconComponent = report.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Last generated: {report.lastGenerated}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={report.status === 'Ready' ? 'secondary' : 'outline'}
                      className={report.status === 'Ready' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {report.status}
                    </Badge>
                    {report.status === 'Ready' && (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Report Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Automated report generation schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <span className="font-medium">Daily Revenue Summary</span>
                <p className="text-sm text-muted-foreground">Generated every day at 11:59 PM</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <span className="font-medium">Weekly P&L Report</span>
                <p className="text-sm text-muted-foreground">Generated every Monday at 8:00 AM</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <div>
                <span className="font-medium">Monthly Financial Statement</span>
                <p className="text-sm text-muted-foreground">Generated on 1st of every month</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialReportsTab;
