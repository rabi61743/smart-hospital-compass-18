
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { History, Download, Eye, Search, Filter } from "lucide-react";
import { PayrollRun } from '@/types/payrollProcessing';

const PayrollRunHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [frequencyFilter, setFrequencyFilter] = useState('all');

  // Mock historical data
  const historicalRuns: PayrollRun[] = [
    {
      id: 'PR-1703023456789',
      name: 'November 2024 Monthly Payroll',
      payPeriod: '2024-11-01 to 2024-11-30',
      startDate: '2024-11-01',
      endDate: '2024-11-30',
      payDate: '2024-11-30',
      frequency: 'monthly',
      status: 'completed',
      totalEmployees: 43,
      totalGrossPay: 2750000,
      totalDeductions: 468000,
      totalNetPay: 2282000,
      createdAt: '2024-11-15T10:00:00Z',
      processedAt: '2024-11-30T16:00:00Z',
      approvedBy: 'HR Director',
    },
    {
      id: 'PR-1702923456789',
      name: 'October 2024 Monthly Payroll',
      payPeriod: '2024-10-01 to 2024-10-31',
      startDate: '2024-10-01',
      endDate: '2024-10-31',
      payDate: '2024-10-31',
      frequency: 'monthly',
      status: 'completed',
      totalEmployees: 42,
      totalGrossPay: 2680000,
      totalDeductions: 456000,
      totalNetPay: 2224000,
      createdAt: '2024-10-15T10:00:00Z',
      processedAt: '2024-10-31T16:00:00Z',
      approvedBy: 'HR Director',
    },
    {
      id: 'PR-1703123456788',
      name: 'Week 49 2024 Weekly Payroll',
      payPeriod: '2024-12-02 to 2024-12-08',
      startDate: '2024-12-02',
      endDate: '2024-12-08',
      payDate: '2024-12-09',
      frequency: 'weekly',
      status: 'completed',
      totalEmployees: 12,
      totalGrossPay: 280000,
      totalDeductions: 47600,
      totalNetPay: 232400,
      createdAt: '2024-12-09T08:00:00Z',
      processedAt: '2024-12-09T14:00:00Z',
      approvedBy: 'Payroll Manager',
    },
  ];

  const getStatusColor = (status: PayrollRun['status']) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'processed': return 'bg-purple-100 text-purple-800';
      case 'approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRuns = historicalRuns.filter(run => {
    const matchesSearch = run.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         run.payPeriod.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || run.status === statusFilter;
    const matchesFrequency = frequencyFilter === 'all' || run.frequency === frequencyFilter;
    
    return matchesSearch && matchesStatus && matchesFrequency;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payroll runs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Frequencies</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Payroll Run History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payroll Run</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Total Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRuns.map((run) => (
                <TableRow key={run.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{run.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {run.frequency} • Processed: {run.processedAt ? new Date(run.processedAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{new Date(run.startDate).toLocaleDateString()}</p>
                      <p className="text-muted-foreground">to {new Date(run.endDate).toLocaleDateString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>{run.totalEmployees}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">₹{run.totalNetPay.toLocaleString()}</p>
                      <p className="text-muted-foreground">
                        Gross: ₹{run.totalGrossPay.toLocaleString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(run.status)}>
                      {run.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{run.approvedBy || 'N/A'}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Export
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

export default PayrollRunHistory;
