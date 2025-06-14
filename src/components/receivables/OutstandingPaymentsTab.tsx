
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Phone, Mail, AlertTriangle } from "lucide-react";

const OutstandingPaymentsTab = () => {
  const [outstandingPayments] = useState([
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      patientId: 'P001',
      invoiceNumber: 'INV-2023-445',
      issueDate: '2023-11-15',
      dueDate: '2023-12-15',
      amount: 25000,
      daysOverdue: 45,
      lastContact: '2024-01-10',
      status: 'overdue',
      priority: 'high'
    },
    {
      id: '2',
      patientName: 'Priya Sharma',
      patientId: 'P002',
      invoiceNumber: 'INV-2024-012',
      issueDate: '2024-01-05',
      dueDate: '2024-02-05',
      amount: 15000,
      daysOverdue: 10,
      lastContact: '2024-01-20',
      status: 'overdue',
      priority: 'medium'
    },
    {
      id: '3',
      patientName: 'Mohammed Ali',
      patientId: 'P003',
      invoiceNumber: 'INV-2024-025',
      issueDate: '2024-01-20',
      dueDate: '2024-02-20',
      amount: 8500,
      daysOverdue: 0,
      lastContact: null,
      status: 'pending',
      priority: 'low'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPayments = outstandingPayments.filter(payment => {
    const matchesSearch = payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Outstanding Payments</h3>
          <p className="text-sm text-muted-foreground">Track and manage overdue patient accounts</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients or invoices..."
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
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Outstanding Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Outstanding Accounts</CardTitle>
          <CardDescription>Accounts with pending or overdue payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Invoice #</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.patientName}</div>
                      <div className="text-sm text-muted-foreground">{payment.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                  <TableCell>{new Date(payment.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    {payment.daysOverdue > 0 ? (
                      <span className="text-red-600 font-medium flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {payment.daysOverdue} days
                      </span>
                    ) : (
                      <span className="text-green-600">On time</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(payment.priority)}>
                      {payment.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
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

export default OutstandingPaymentsTab;
