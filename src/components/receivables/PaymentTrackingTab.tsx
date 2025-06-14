
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, TrendingUp, Calendar } from "lucide-react";

const PaymentTrackingTab = () => {
  const [paymentTracking] = useState([
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      patientId: 'P001',
      invoiceNumber: 'INV-2024-001',
      originalAmount: 3500,
      paidAmount: 1500,
      remainingAmount: 2000,
      lastPaymentDate: '2024-01-15',
      lastPaymentAmount: 1500,
      paymentMethod: 'Credit Card',
      status: 'partial'
    },
    {
      id: '2',
      patientName: 'Priya Sharma',
      patientId: 'P002',
      invoiceNumber: 'INV-2024-002',
      originalAmount: 4500,
      paidAmount: 4500,
      remainingAmount: 0,
      lastPaymentDate: '2024-01-18',
      lastPaymentAmount: 4500,
      paymentMethod: 'Bank Transfer',
      status: 'paid'
    },
    {
      id: '3',
      patientName: 'Mohammed Ali',
      patientId: 'P003',
      invoiceNumber: 'INV-2024-003',
      originalAmount: 8500,
      paidAmount: 0,
      remainingAmount: 8500,
      lastPaymentDate: null,
      lastPaymentAmount: 0,
      paymentMethod: null,
      status: 'unpaid'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-orange-100 text-orange-800';
      case 'unpaid': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTracking = paymentTracking.filter(tracking => {
    const matchesSearch = tracking.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tracking.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tracking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Payment Tracking</h3>
          <p className="text-sm text-muted-foreground">Monitor payment progress and history</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tracked</p>
                <p className="text-2xl font-bold">₹16.5L</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collected</p>
                <p className="text-2xl font-bold text-green-600">₹6.0L</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold text-orange-600">₹10.5L</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collection Rate</p>
                <p className="text-2xl font-bold text-blue-600">36.4%</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payment Tracking Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Progress</CardTitle>
          <CardDescription>Track payment status and collection progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Invoice #</TableHead>
                <TableHead>Original Amount</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTracking.map((tracking) => (
                <TableRow key={tracking.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{tracking.patientName}</div>
                      <div className="text-sm text-muted-foreground">{tracking.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{tracking.invoiceNumber}</TableCell>
                  <TableCell>₹{tracking.originalAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600">₹{tracking.paidAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-orange-600">₹{tracking.remainingAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    {tracking.lastPaymentDate ? (
                      <div>
                        <div className="text-sm">{new Date(tracking.lastPaymentDate).toLocaleDateString()}</div>
                        <div className="text-xs text-muted-foreground">₹{tracking.lastPaymentAmount.toLocaleString()}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No payments</span>
                    )}
                  </TableCell>
                  <TableCell>{tracking.paymentMethod || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(tracking.status)}>
                      {tracking.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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

export default PaymentTrackingTab;
