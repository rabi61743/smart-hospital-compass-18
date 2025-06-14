
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Download, Calendar } from "lucide-react";

const TransactionLogsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const transactionLogs = [
    {
      id: 'TXN-001',
      timestamp: '2024-06-14 14:30:25',
      type: 'Payment',
      user: 'Dr. Rajesh Kumar',
      action: 'Commission Payment',
      amount: '₹15,000',
      status: 'completed',
      ipAddress: '192.168.1.10',
      details: 'Monthly commission payment processed'
    },
    {
      id: 'TXN-002',
      timestamp: '2024-06-14 13:45:12',
      type: 'Billing',
      user: 'Priya Sharma',
      action: 'Invoice Generation',
      amount: '₹5,500',
      status: 'completed',
      ipAddress: '192.168.1.15',
      details: 'Patient invoice INV-2024-156 created'
    },
    {
      id: 'TXN-003',
      timestamp: '2024-06-14 12:20:08',
      type: 'Refund',
      user: 'System',
      action: 'Automatic Refund',
      amount: '₹2,100',
      status: 'failed',
      ipAddress: '10.0.0.1',
      details: 'Payment gateway timeout during refund'
    },
    {
      id: 'TXN-004',
      timestamp: '2024-06-14 11:15:33',
      type: 'Transfer',
      user: 'Mohammed Ali',
      action: 'Department Transfer',
      amount: '₹25,000',
      status: 'pending',
      ipAddress: '192.168.1.20',
      details: 'Budget transfer to Cardiology department'
    },
    {
      id: 'TXN-005',
      timestamp: '2024-06-14 10:30:45',
      type: 'Commission',
      user: 'Dr. Sarah Wilson',
      action: 'Commission Calculation',
      amount: '₹8,750',
      status: 'completed',
      ipAddress: '192.168.1.25',
      details: 'Surgery commission calculated and approved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Payment': return 'bg-blue-100 text-blue-800';
      case 'Billing': return 'bg-purple-100 text-purple-800';
      case 'Refund': return 'bg-orange-100 text-orange-800';
      case 'Transfer': return 'bg-teal-100 text-teal-800';
      case 'Commission': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = transactionLogs.filter(log => {
    const matchesSearch = log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">Transaction Logs</h4>
          <p className="text-sm text-muted-foreground">Detailed log of all financial transactions</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
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
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Complete audit trail of financial transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell className="font-mono text-sm">
                    <div>{log.timestamp.split(' ')[0]}</div>
                    <div className="text-xs text-muted-foreground">{log.timestamp.split(' ')[1]}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(log.type)}>
                      {log.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="font-medium">{log.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(log.status)}>
                      {log.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
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

export default TransactionLogsTab;
