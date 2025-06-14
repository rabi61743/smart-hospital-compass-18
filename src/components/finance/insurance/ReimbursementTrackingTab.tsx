
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { DollarSign, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const ReimbursementTrackingTab = () => {
  const [reimbursements] = useState([
    {
      id: '1',
      claimNumber: 'CLM2024001',
      patientName: 'Rajesh Kumar',
      insuranceProvider: 'Star Health',
      approvedAmount: 38000,
      reimbursedAmount: 38000,
      reimbursementDate: '2024-06-15',
      processingDays: 5,
      status: 'completed'
    },
    {
      id: '2',
      claimNumber: 'CLM2024004',
      patientName: 'Sunil Patel',
      insuranceProvider: 'New India Assurance',
      approvedAmount: 22000,
      reimbursedAmount: 18000,
      reimbursementDate: '2024-06-14',
      processingDays: 8,
      status: 'partial'
    },
    {
      id: '3',
      claimNumber: 'CLM2024005',
      patientName: 'Maya Singh',
      insuranceProvider: 'Oriental Insurance',
      approvedAmount: 15000,
      reimbursedAmount: 0,
      processingDays: 12,
      status: 'pending'
    }
  ]);

  const monthlyReimbursements = [
    { month: 'Jan', amount: 125000, claims: 45 },
    { month: 'Feb', amount: 138000, claims: 52 },
    { month: 'Mar', amount: 142000, claims: 48 },
    { month: 'Apr', amount: 156000, claims: 58 },
    { month: 'May', amount: 149000, claims: 55 },
    { month: 'Jun', amount: 167000, claims: 62 }
  ];

  const processingTimes = [
    { provider: 'Star Health', avgDays: 5.2, volume: 125 },
    { provider: 'HDFC ERGO', avgDays: 7.1, volume: 98 },
    { provider: 'ICICI Lombard', avgDays: 6.8, volume: 87 },
    { provider: 'New India', avgDays: 9.3, volume: 76 },
    { provider: 'Oriental', avgDays: 11.2, volume: 54 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-orange-100 text-orange-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'partial': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Reimbursement Tracking</h3>
          <p className="text-sm text-muted-foreground">Track reimbursement status and processing times</p>
        </div>
      </div>

      {/* Reimbursement Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reimbursed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹28.7L</div>
            <p className="text-xs text-green-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2 days</div>
            <p className="text-xs text-blue-600">2 days faster than last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reimbursement Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <Progress value={92} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹5.5L</div>
            <p className="text-xs text-orange-600">Awaiting reimbursement</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Reimbursement Trends</CardTitle>
            <CardDescription>Reimbursement amounts over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyReimbursements}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']} />
                <Line type="monotone" dataKey="amount" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Times by Provider</CardTitle>
            <CardDescription>Average processing days by insurance provider</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processingTimes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="provider" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} days`, 'Avg Processing Time']} />
                <Bar dataKey="avgDays" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Reimbursement Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reimbursements</CardTitle>
          <CardDescription>Track the status of recent reimbursement requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim Number</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Insurance Provider</TableHead>
                <TableHead>Approved Amount</TableHead>
                <TableHead>Reimbursed Amount</TableHead>
                <TableHead>Processing Days</TableHead>
                <TableHead>Reimbursement Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reimbursements.map((reimbursement) => (
                <TableRow key={reimbursement.id}>
                  <TableCell className="font-medium">{reimbursement.claimNumber}</TableCell>
                  <TableCell>{reimbursement.patientName}</TableCell>
                  <TableCell>{reimbursement.insuranceProvider}</TableCell>
                  <TableCell>₹{reimbursement.approvedAmount.toLocaleString()}</TableCell>
                  <TableCell>₹{reimbursement.reimbursedAmount.toLocaleString()}</TableCell>
                  <TableCell>{reimbursement.processingDays} days</TableCell>
                  <TableCell>
                    {reimbursement.reimbursementDate ? 
                      new Date(reimbursement.reimbursementDate).toLocaleDateString() : 
                      '-'
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(reimbursement.status)}
                      <Badge className={getStatusColor(reimbursement.status)}>
                        {reimbursement.status.toUpperCase()}
                      </Badge>
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

export default ReimbursementTrackingTab;
