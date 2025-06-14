
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, CreditCard, DollarSign, Smartphone, Banknote } from "lucide-react";

const PaymentProcessingTab = () => {
  const [payments] = useState([
    {
      id: '1',
      transactionId: 'TXN-2024-001',
      patientName: 'Rajesh Kumar',
      billNumber: 'BILL-2024-001',
      amount: 3500,
      paymentMethod: 'Credit Card',
      paymentGateway: 'Razorpay',
      transactionDate: '2024-01-15T10:30:00',
      status: 'completed',
      reference: 'pay_12345678'
    },
    {
      id: '2',
      transactionId: 'TXN-2024-002',
      patientName: 'Priya Sharma',
      billNumber: 'BILL-2024-002',
      amount: 15000,
      paymentMethod: 'UPI',
      paymentGateway: 'Paytm',
      transactionDate: '2024-01-16T14:15:00',
      status: 'pending',
      reference: 'upi_87654321'
    },
    {
      id: '3',
      transactionId: 'TXN-2024-003',
      patientName: 'Mohammed Ali',
      billNumber: 'BILL-2024-003',
      amount: 8500,
      paymentMethod: 'Cash',
      paymentGateway: 'Manual',
      transactionDate: '2024-01-17T09:45:00',
      status: 'completed',
      reference: 'cash_001'
    },
    {
      id: '4',
      transactionId: 'TXN-2024-004',
      patientName: 'Anita Desai',
      billNumber: 'BILL-2024-004',
      amount: 2500,
      paymentMethod: 'Debit Card',
      paymentGateway: 'Stripe',
      transactionDate: '2024-01-17T16:20:00',
      status: 'failed',
      reference: 'pi_declined123'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'credit card':
      case 'debit card':
        return <CreditCard className="h-4 w-4" />;
      case 'upi':
        return <Smartphone className="h-4 w-4" />;
      case 'cash':
        return <Banknote className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.billNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payment.paymentMethod.toLowerCase() === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Payment Processing</h3>
          <p className="text-sm text-muted-foreground">Monitor and manage payment transactions</p>
        </div>
        <Button>
          <DollarSign className="w-4 h-4 mr-2" />
          Process Payment
        </Button>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ₹{payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Completed Payments</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                ₹{payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                ₹{payments.filter(p => p.status === 'failed').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Failed Payments</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round((payments.filter(p => p.status === 'completed').length / payments.length) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Success Rate</p>
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
                  placeholder="Search transactions..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="credit card">Credit Card</SelectItem>
                <SelectItem value="debit card">Debit Card</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>All payment transactions and their processing status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Bill Number</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Gateway</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.transactionId}</TableCell>
                  <TableCell>{payment.patientName}</TableCell>
                  <TableCell>{payment.billNumber}</TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPaymentIcon(payment.paymentMethod)}
                      <span>{payment.paymentMethod}</span>
                    </div>
                  </TableCell>
                  <TableCell>{payment.paymentGateway}</TableCell>
                  <TableCell>
                    <div>
                      <div>{new Date(payment.transactionDate).toLocaleDateString()}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(payment.transactionDate).toLocaleTimeString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentProcessingTab;
