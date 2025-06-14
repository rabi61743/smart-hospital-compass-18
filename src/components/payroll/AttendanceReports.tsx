
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Calendar, TrendingUp, BarChart3 } from "lucide-react";

const AttendanceReports = () => {
  const [selectedReport, setSelectedReport] = useState('monthly-summary');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  const reportTypes = [
    {
      id: 'monthly-summary',
      title: 'Monthly Attendance Summary',
      description: 'Complete overview of monthly attendance patterns',
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      id: 'daily-attendance',
      title: 'Daily Attendance Report',
      description: 'Detailed daily attendance records',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      id: 'overtime-analysis',
      title: 'Overtime Analysis',
      description: 'Overtime trends and cost analysis',
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: 'punctuality-report',
      title: 'Punctuality Report',
      description: 'Late arrivals and early departures analysis',
      icon: <FileText className="h-5 w-5" />
    }
  ];

  const monthlyData = [
    {
      employee: 'Dr. Sarah Johnson',
      totalDays: 22,
      presentDays: 21,
      absentDays: 1,
      lateArrivals: 2,
      overtimeHours: 12.5,
      attendanceRate: 95.5
    },
    {
      employee: 'Nurse Mary Wilson',
      totalDays: 22,
      presentDays: 20,
      absentDays: 2,
      lateArrivals: 5,
      overtimeHours: 8.0,
      attendanceRate: 90.9
    },
    {
      employee: 'Dr. Michael Chen',
      totalDays: 22,
      presentDays: 22,
      absentDays: 0,
      lateArrivals: 0,
      overtimeHours: 24.5,
      attendanceRate: 100
    },
    {
      employee: 'Lab Tech John Smith',
      totalDays: 22,
      presentDays: 19,
      absentDays: 3,
      lateArrivals: 3,
      overtimeHours: 2.5,
      attendanceRate: 86.4
    }
  ];

  const departmentStats = [
    { department: 'Cardiology', attendance: 94.2, employees: 25 },
    { department: 'Emergency', attendance: 96.8, employees: 30 },
    { department: 'General Medicine', attendance: 92.1, employees: 35 },
    { department: 'Laboratory', attendance: 89.5, employees: 15 },
    { department: 'Pharmacy', attendance: 91.3, employees: 12 }
  ];

  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return 'text-green-600';
    if (rate >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (rate: number) => {
    if (rate >= 95) return 'bg-green-500';
    if (rate >= 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Attendance Reports
          </CardTitle>
          <CardDescription>Generate and view comprehensive attendance reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((report) => (
                  <SelectItem key={report.id} value={report.id}>
                    {report.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="current-quarter">Current Quarter</SelectItem>
                <SelectItem value="current-year">Current Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Report Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report) => (
              <Card 
                key={report.id} 
                className={`cursor-pointer transition-colors ${
                  selectedReport === report.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedReport(report.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      {report.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Attendance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Department Attendance Overview</CardTitle>
          <CardDescription>Attendance rates by department for the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.department} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{dept.department}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getAttendanceColor(dept.attendance)}`}>
                        {dept.attendance}%
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({dept.employees} employees)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(dept.attendance)}`}
                      style={{ width: `${dept.attendance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Monthly Report */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Attendance Details</CardTitle>
          <CardDescription>Individual employee attendance breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Total Days</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Absent</TableHead>
                <TableHead>Late Arrivals</TableHead>
                <TableHead>Overtime Hours</TableHead>
                <TableHead>Attendance Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{record.employee}</TableCell>
                  <TableCell>{record.totalDays}</TableCell>
                  <TableCell className="text-green-600">{record.presentDays}</TableCell>
                  <TableCell className="text-red-600">{record.absentDays}</TableCell>
                  <TableCell className="text-orange-600">{record.lateArrivals}</TableCell>
                  <TableCell>{record.overtimeHours}h</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getAttendanceColor(record.attendanceRate)}`}>
                        {record.attendanceRate}%
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(record.attendanceRate)}`}
                          style={{ width: `${record.attendanceRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Average Attendance</p>
              <p className="text-2xl font-bold text-green-600">93.2%</p>
              <p className="text-xs text-muted-foreground mt-1">+2.1% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Overtime</p>
              <p className="text-2xl font-bold text-blue-600">156.5h</p>
              <p className="text-xs text-muted-foreground mt-1">₹2,34,500 cost</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Punctuality Rate</p>
              <p className="text-2xl font-bold text-orange-600">87.4%</p>
              <p className="text-xs text-muted-foreground mt-1">-1.3% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceReports;
