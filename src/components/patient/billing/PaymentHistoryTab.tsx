
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Receipt, MapPin } from "lucide-react";
import { PaymentTransaction } from "./types";
import { usePatientLocations } from "@/hooks/usePatientLocations";

interface PaymentHistoryTabProps {
  locationFilter: string;
}

const PaymentHistoryTab = ({ locationFilter }: PaymentHistoryTabProps) => {
  const { getLocationById } = usePatientLocations();
  
  // Enhanced mock data with location information
  const [transactions] = useState<(PaymentTransaction & { locationId?: string })[]>([
    {
      id: '1',
      invoiceId: 'INV-2024-002',
      locationId: 'downtown-branch',
      amount: 2950,
      paymentDate: '2024-01-21',
      paymentMethod: 'Visa •••• 4242',
      transactionId: 'txn_1234567890',
      status: 'completed'
    },
    {
      id: '2',
      invoiceId: 'INV-2023-045',
      locationId: 'main-hospital',
      amount: 1500,
      paymentDate: '2023-12-15',
      paymentMethod: 'Mastercard •••• 1234',
      transactionId: 'txn_0987654321',
      status: 'completed'
    },
    {
      id: '3',
      invoiceId: 'INV-2023-044',
      locationId: 'suburban-clinic',
      amount: 750,
      paymentDate: '2023-12-10',
      paymentMethod: 'Visa •••• 4242',
      transactionId: 'txn_1122334455',
      status: 'refunded',
      notes: 'Duplicate charge refunded'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || transaction.locationId === locationFilter;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Payment History</h3>
          <p className="text-sm text-muted-foreground">View all your payment transactions</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Payments
        </Button>
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payment History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            All your payment transactions and receipts
            {locationFilter !== 'all' && (
              <span className="block mt-1 text-blue-600">
                <MapPin className="inline h-3 w-3 mr-1" />
                Filtered by: {getLocationById(locationFilter)?.name}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => {
                const location = getLocationById(transaction.locationId || '');
                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.transactionId}</TableCell>
                    <TableCell>{transaction.invoiceId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{location?.code || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(transaction.paymentDate).toLocaleDateString()}</TableCell>
                    <TableCell>₹{transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Receipt className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ₹{filteredTransactions
                  .filter(t => t.status === 'completed')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Paid</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {filteredTransactions.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-sm text-muted-foreground">Completed Payments</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                ₹{filteredTransactions
                  .filter(t => t.status === 'refunded')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Refunded</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentHistoryTab;
