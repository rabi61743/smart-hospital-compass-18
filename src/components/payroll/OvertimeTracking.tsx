
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const OvertimeTracking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  const overtimeRequests = [
    {
      id: 'OT001',
      employee: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      date: '2024-01-15',
      regularHours: 8,
      overtimeHours: 3,
      reason: 'Emergency surgery',
      status: 'Approved',
      approvedBy: 'Dr. Rajesh Kumar',
      rate: 1.5
    },
    {
      id: 'OT002',
      employee: 'Nurse Mary Wilson',
      department: 'General Medicine',
      date: '2024-01-14',
      regularHours: 8,
      overtimeHours: 2.5,
      reason: 'Staff shortage coverage',
      status: 'Pending',
      approvedBy: null,
      rate: 1.5
    },
    {
      id: 'OT003',
      employee: 'Dr. Michael Chen',
      department: 'Emergency',
      date: '2024-01-13',
      regularHours: 8,
      overtimeHours: 4,
      reason: 'Multiple emergency cases',
      status: 'Approved',
      approvedBy: 'Dr. Lisa Park',
      rate: 2.0
    },
    {
      id: 'OT004',
      employee: 'Lab Tech John Smith',
      department: 'Laboratory',
      date: '2024-01-12',
      regularHours: 8,
      overtimeHours: 1.5,
      reason: 'Urgent test processing',
      status: 'Rejected',
      approvedBy: 'Dr. Rajesh Kumar',
      rate: 1.5
    }
  ];

  const overtimeStats = [
    {
      title: 'Total Overtime Hours',
      value: '156.5',
      unit: 'hours',
      icon: <Clock className="h-4 w-4" />,
      color: 'text-blue-600'
    },
    {
      title: 'Pending Approvals',
      value: '23',
      unit: 'requests',
      icon: <AlertTriangle className="h-4 w-4" />,
      color: 'text-orange-600'
    },
    {
      title: 'Approved This Month',
      value: '89',
      unit: 'requests',
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'text-green-600'
    },
    {
      title: 'Overtime Cost',
      value: '₹2,34,500',
      unit: '',
      icon: <TrendingUp className="h-4 w-4" />,
      color: 'text-purple-600'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Pending': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'Rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateOvertimePay = (hours: number, rate: number, basePay: number = 1000) => {
    return hours * rate * basePay;
  };

  return (
    <div className="space-y-6">
      {/* Overtime Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overtimeStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline gap-1">
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    {stat.unit && <span className="text-sm text-muted-foreground">{stat.unit}</span>}
                  </div>
                </div>
                <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overtime Requests */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Overtime Requests
              </CardTitle>
              <CardDescription>Review and manage overtime requests and approvals</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="current-quarter">Current Quarter</SelectItem>
                </SelectContent>
              </Select>
              <Button>Bulk Approve</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Regular Hours</TableHead>
                <TableHead>Overtime Hours</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Estimated Pay</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overtimeRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{request.employee}</p>
                      <p className="text-sm text-muted-foreground">{request.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
                  <TableCell>{request.regularHours}h</TableCell>
                  <TableCell className="font-medium text-blue-600">{request.overtimeHours}h</TableCell>
                  <TableCell>{request.rate}x</TableCell>
                  <TableCell>
                    ₹{calculateOvertimePay(request.overtimeHours, request.rate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-32">
                      <p className="text-sm truncate" title={request.reason}>{request.reason}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        {request.status}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.status === 'Pending' && (
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Overtime Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Overtime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Emergency', 'Cardiology', 'General Medicine', 'Laboratory'].map((dept, index) => {
                const hours = [45.5, 32.0, 28.5, 15.2][index];
                const maxHours = 50;
                return (
                  <div key={dept}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{dept}</span>
                      <span className="text-sm text-muted-foreground">{hours}h</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(hours / maxHours) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overtime Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">This Month</span>
                <span className="font-medium text-blue-600">156.5h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Last Month</span>
                <span className="font-medium">142.8h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average/Month</span>
                <span className="font-medium">138.2h</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-600">↗ 9.6% increase</span>
                  <span className="text-sm text-muted-foreground">vs last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OvertimeTracking;
