
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, DollarSign, Calendar, CheckCircle } from "lucide-react";

const VendorPaymentsTab = () => {
  const [vendorPayments] = useState([
    {
      id: '1',
      vendorName: 'MediSupply Corp.',
      invoiceNumber: 'MS-2024-001',
      invoiceDate: '2024-01-15',
      dueDate: '2024-02-15',
      amount: 125000,
      category: 'Medical Supplies',
      status: 'pending',
      daysUntilDue: 5
    },
    {
      id: '2',
      vendorName: 'PharmaTech Ltd.',
      invoiceNumber: 'PT-2024-078',
      invoiceDate: '2024-01-20',
      dueDate: '2024-02-20',
      amount: 87500,
      category: 'Pharmaceuticals',
      status: 'approved',
      daysUntilDue: 10
    },
    {
      id: '3',
      vendorName: 'LabEquipment Pro',
      invoiceNumber: 'LEP-2024-045',
      invoiceDate: '2024-01-10',
      dueDate: '2024-02-10',
      amount: 245000,
      category: 'Equipment',
      status: 'paid',
      daysUntilDue: 0
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPayments = vendorPayments.filter(payment => {
    const matchesSearch = payment.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Vendor Payments</h3>
          <p className="text-sm text-muted-foreground">Manage and process vendor invoice payments</p>
        </div>
        <Button>
          <DollarSign className="w-4 h-4 mr-2" />
          Process Payments
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
                  placeholder="Search vendors or invoices..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Invoices</CardTitle>
          <CardDescription>Track and manage vendor payment requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Invoice #</TableHead>
                <TableHead>Invoice Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="font-medium">{payment.vendorName}</div>
                  </TableCell>
                  <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                  <TableCell>{new Date(payment.invoiceDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {new Date(payment.dueDate).toLocaleDateString()}
                      {payment.daysUntilDue > 0 && payment.daysUntilDue <= 7 && (
                        <span className="ml-2 text-xs text-orange-600">
                          (Due in {payment.daysUntilDue} days)
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.category}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {payment.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          Approve
                        </Button>
                      )}
                      {payment.status === 'approved' && (
                        <Button size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Pay
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Calendar className="w-4 h-4" />
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

export default VendorPaymentsTab;
