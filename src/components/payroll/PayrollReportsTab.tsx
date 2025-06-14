
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Calendar, BarChart3 } from "lucide-react";

const PayrollReportsTab = () => {
  const payrollHistory = [
    {
      period: 'December 2024',
      totalEmployees: 124,
      totalPayroll: 4520000,
      status: 'Completed',
      processedDate: '2024-12-31'
    },
    {
      period: 'November 2024',
      totalEmployees: 121,
      totalPayroll: 4385000,
      status: 'Completed',
      processedDate: '2024-11-30'
    },
    {
      period: 'October 2024',
      totalEmployees: 118,
      totalPayroll: 4248000,
      status: 'Completed',
      processedDate: '2024-10-31'
    }
  ];

  const reportTypes = [
    {
      title: 'Monthly Payroll Summary',
      description: 'Complete summary of monthly payroll with department breakdown',
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      title: 'Employee Payslips',
      description: 'Individual payslips for all employees',
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: 'Tax Deduction Report',
      description: 'Detailed report of all tax deductions and contributions',
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: 'Department-wise Analysis',
      description: 'Payroll breakdown by department and cost centers',
      icon: <BarChart3 className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Reports
          </CardTitle>
          <CardDescription>Generate and download various payroll reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        {report.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Report Period:</span>
            <Select defaultValue="current-month">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="current-quarter">Current Quarter</SelectItem>
                <SelectItem value="current-year">Current Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payroll History */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll History</CardTitle>
          <CardDescription>Historical record of processed payrolls</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Total Payroll</TableHead>
                <TableHead>Processed Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollHistory.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{record.period}</TableCell>
                  <TableCell>{record.totalEmployees}</TableCell>
                  <TableCell>₹{record.totalPayroll.toLocaleString()}</TableCell>
                  <TableCell>{new Date(record.processedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {record.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollReportsTab;
