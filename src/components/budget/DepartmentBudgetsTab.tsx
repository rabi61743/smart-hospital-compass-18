
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Edit, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DepartmentBudgetsTab = () => {
  const [departmentBudgets] = useState([
    {
      id: '1',
      department: 'Cardiology',
      allocatedBudget: 1500000,
      spentAmount: 1245000,
      remainingBudget: 255000,
      utilizationRate: 83,
      status: 'on-track',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      department: 'Emergency',
      allocatedBudget: 2000000,
      spentAmount: 2150000,
      remainingBudget: -150000,
      utilizationRate: 107.5,
      status: 'over-budget',
      lastUpdated: '2024-01-14'
    },
    {
      id: '3',
      department: 'Surgery',
      allocatedBudget: 1800000,
      spentAmount: 1350000,
      remainingBudget: 450000,
      utilizationRate: 75,
      status: 'under-utilized',
      lastUpdated: '2024-01-13'
    },
    {
      id: '4',
      department: 'Radiology',
      allocatedBudget: 1200000,
      spentAmount: 1180000,
      remainingBudget: 20000,
      utilizationRate: 98.3,
      status: 'at-risk',
      lastUpdated: '2024-01-12'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'over-budget': return 'bg-red-100 text-red-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'under-utilized': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationColor = (rate: number) => {
    if (rate > 100) return 'text-red-600';
    if (rate > 90) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredBudgets = departmentBudgets.filter(budget => {
    const matchesSearch = budget.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || budget.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Department Budgets</h3>
          <p className="text-sm text-muted-foreground">Monitor and manage budget allocations across departments</p>
        </div>
        <Button>
          <DollarSign className="w-4 h-4 mr-2" />
          Adjust Budgets
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
                  placeholder="Search departments..."
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
                <SelectItem value="on-track">On Track</SelectItem>
                <SelectItem value="over-budget">Over Budget</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
                <SelectItem value="under-utilized">Under Utilized</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Department Budgets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview by Department</CardTitle>
          <CardDescription>Current budget allocations and utilization rates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Allocated Budget</TableHead>
                <TableHead>Spent Amount</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBudgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell>
                    <div className="font-medium">{budget.department}</div>
                  </TableCell>
                  <TableCell>₹{budget.allocatedBudget.toLocaleString()}</TableCell>
                  <TableCell>₹{budget.spentAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={budget.remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}>
                      ₹{Math.abs(budget.remainingBudget).toLocaleString()}
                      {budget.remainingBudget < 0 && ' (Over)'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className={`text-sm font-medium ${getUtilizationColor(budget.utilizationRate)}`}>
                        {budget.utilizationRate}%
                      </div>
                      <Progress 
                        value={Math.min(budget.utilizationRate, 100)} 
                        className="w-16"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(budget.status)}>
                      {budget.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      {budget.status === 'over-budget' && (
                        <Button variant="outline" size="sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Review
                        </Button>
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

export default DepartmentBudgetsTab;
