
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Calendar, AlertCircle } from "lucide-react";

const TaxReportingTab = () => {
  const taxReports = [
    {
      name: "GSTR-1",
      description: "Outward supplies of taxable goods and services",
      period: "June 2024",
      dueDate: "2024-07-11",
      status: "pending",
      amount: "₹8.46L"
    },
    {
      name: "GSTR-3B",
      description: "Monthly return with summary of outward and inward supplies",
      period: "June 2024",
      dueDate: "2024-07-20",
      status: "draft",
      amount: "₹6.12L"
    },
    {
      name: "GSTR-2A",
      description: "Auto-drafted inward supplies based on GSTR-1 filed by suppliers",
      period: "June 2024",
      dueDate: "2024-07-12",
      status: "ready",
      amount: "₹2.34L"
    },
    {
      name: "Income Tax Return",
      description: "Annual income tax return filing",
      period: "FY 2023-24",
      dueDate: "2024-07-31",
      status: "in_progress",
      amount: "₹15.2L"
    }
  ];

  const monthlyTaxSummary = [
    { month: "January", gstCollected: 785000, itcClaimed: 234000, netLiability: 551000 },
    { month: "February", gstCollected: 820000, itcClaimed: 245000, netLiability: 575000 },
    { month: "March", gstCollected: 910000, itcClaimed: 267000, netLiability: 643000 },
    { month: "April", gstCollected: 875000, itcClaimed: 256000, netLiability: 619000 },
    { month: "May", gstCollected: 832000, itcClaimed: 241000, netLiability: 591000 },
    { month: "June", gstCollected: 846000, itcClaimed: 234000, netLiability: 612000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'filed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'ready': return <FileText className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tax Filing Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Filings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-red-600">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tax Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹6.12L</div>
            <p className="text-xs text-muted-foreground">Current quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94%</div>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tax Returns & Filings */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Returns & Filings</CardTitle>
          <CardDescription>Manage and track tax return filings and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taxReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {getStatusIcon(report.status)}
                  </div>
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">{report.description}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Period: {report.period} | Due: {report.dueDate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-medium">{report.amount}</div>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    {report.status === 'ready' ? 'File' : 'Download'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Tax Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Tax Summary</CardTitle>
          <CardDescription>GST collection and payment summary by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyTaxSummary.map((summary, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div className="font-medium">{summary.month}</div>
                <div>
                  <div className="text-sm text-muted-foreground">GST Collected</div>
                  <div className="font-medium">₹{(summary.gstCollected / 100000).toFixed(1)}L</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">ITC Claimed</div>
                  <div className="font-medium text-green-600">₹{(summary.itcClaimed / 100000).toFixed(1)}L</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Net Liability</div>
                  <div className="font-medium text-orange-600">₹{(summary.netLiability / 100000).toFixed(1)}L</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tax reporting tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>Generate GSTR-1</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Download className="h-6 w-6" />
              <span>Download GSTR-2A</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span>File GSTR-3B</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxReportingTab;
