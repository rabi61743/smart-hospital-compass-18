
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Upload, Download, Calendar, Building, CheckCircle } from "lucide-react";
import { StatutoryCompliance } from '@/types/statutoryCompliance';

interface GovernmentReportingTabProps {
  complianceItems: StatutoryCompliance[];
}

const GovernmentReportingTab = ({ complianceItems }: GovernmentReportingTabProps) => {
  const reportingItems = complianceItems.filter(item => item.complianceType === 'government_reporting');

  const getStatusColor = (status: StatutoryCompliance['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock government reports data
  const governmentReports = [
    {
      id: 'GR001',
      department: 'ESIC',
      reportType: 'Monthly Contribution',
      period: '2024-12',
      dueDate: '2025-01-15',
      status: 'pending',
      amount: 89000
    },
    {
      id: 'GR002',
      department: 'EPFO',
      reportType: 'Monthly Return',
      period: '2024-12',
      dueDate: '2025-01-15',
      status: 'completed',
      amount: 125000
    },
    {
      id: 'GR003',
      department: 'Labour Department',
      reportType: 'Annual Return',
      period: '2024',
      dueDate: '2025-01-31',
      status: 'pending',
      amount: 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Government Reports Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">EPFO Reports</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">ESIC Reports</p>
              <p className="text-2xl font-bold text-green-600">1</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Labour Dept.</p>
              <p className="text-2xl font-bold text-purple-600">1</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Government Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Government Reporting Requirements
          </CardTitle>
          <CardDescription>
            Mandatory reports and returns to government departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Report Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {governmentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{report.department}</span>
                    </div>
                  </TableCell>
                  <TableCell>{report.reportType}</TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(report.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {report.amount > 0 ? `₹${report.amount.toLocaleString()}` : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {report.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          <Upload className="h-3 w-3 mr-1" />
                          Submit
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Filing Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Government Filing Calendar</CardTitle>
          <CardDescription>Monthly and annual filing schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Monthly Filings</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">EPFO Return</span>
                  <span className="text-sm text-muted-foreground">15th of next month</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">ESIC Return</span>
                  <span className="text-sm text-muted-foreground">15th of next month</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">PT Challan</span>
                  <span className="text-sm text-muted-foreground">15th of next month</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Annual Filings</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Labour License</span>
                  <span className="text-sm text-muted-foreground">31st March</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Factory License</span>
                  <span className="text-sm text-muted-foreground">31st March</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Annual Return</span>
                  <span className="text-sm text-muted-foreground">30th April</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reporting Actions</CardTitle>
          <CardDescription>Generate and submit government reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>EPFO Return</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Upload className="h-6 w-6" />
              <span>ESIC Challan</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Download className="h-6 w-6" />
              <span>PT Return</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Building className="h-6 w-6" />
              <span>Annual Return</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernmentReportingTab;
