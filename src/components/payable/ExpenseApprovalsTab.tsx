
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, CheckCircle, XCircle, Eye, Receipt } from "lucide-react";

const ExpenseApprovalsTab = () => {
  const [expenseReports] = useState([
    {
      id: '1',
      reportNumber: 'EXP-2024-001',
      employee: 'Dr. Rajesh Kumar',
      department: 'Cardiology',
      submitDate: '2024-01-20',
      amount: 15000,
      category: 'Travel & Accommodation',
      description: 'Medical conference in Mumbai',
      receipts: 5,
      status: 'pending',
      urgency: 'medium'
    },
    {
      id: '2',
      reportNumber: 'EXP-2024-002',
      employee: 'Nurse Priya Sharma',
      department: 'Emergency',
      submitDate: '2024-01-18',
      amount: 3500,
      category: 'Training & Education',
      description: 'CPR certification course',
      receipts: 2,
      status: 'approved',
      urgency: 'low'
    },
    {
      id: '3',
      reportNumber: 'EXP-2024-003',
      employee: 'Lab Tech Mohammed Ali',
      department: 'Laboratory',
      submitDate: '2024-01-22',
      amount: 8500,
      category: 'Equipment & Supplies',
      description: 'Emergency lab equipment repair',
      receipts: 3,
      status: 'rejected',
      urgency: 'high'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredExpenses = expenseReports.filter(expense => {
    const matchesSearch = expense.reportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Expense Approvals</h3>
          <p className="text-sm text-muted-foreground">Review and approve employee expense reports</p>
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
                  placeholder="Search reports, employee, or department..."
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
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Expense Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Reports</CardTitle>
          <CardDescription>Review and approve employee expense submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report #</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Submit Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Receipts</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.reportNumber}</TableCell>
                  <TableCell>{expense.employee}</TableCell>
                  <TableCell>{expense.department}</TableCell>
                  <TableCell>{new Date(expense.submitDate).toLocaleDateString()}</TableCell>
                  <TableCell>₹{expense.amount.toLocaleString()}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={expense.description}>
                      {expense.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Receipt className="w-4 h-4 mr-1" />
                      {expense.receipts}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getUrgencyColor(expense.urgency)}>
                      {expense.urgency.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(expense.status)}>
                      {expense.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {expense.status === 'pending' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
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

export default ExpenseApprovalsTab;
