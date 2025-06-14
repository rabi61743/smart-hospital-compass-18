
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { User, Calendar, TrendingUp, Clock } from "lucide-react";

const LeaveBalancesTab = () => {
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchEmployee, setSearchEmployee] = useState('');

  const leaveBalances = [
    {
      id: 'EMP001',
      employee: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      annualLeave: { used: 15, available: 25, total: 40 },
      sickLeave: { used: 3, available: 12, total: 15 },
      personalLeave: { used: 2, available: 8, total: 10 },
      totalAccrued: 65,
      totalUsed: 20
    },
    {
      id: 'EMP002',
      employee: 'Nurse Mary Wilson',
      department: 'General Medicine',
      annualLeave: { used: 10, available: 20, total: 30 },
      sickLeave: { used: 5, available: 10, total: 15 },
      personalLeave: { used: 1, available: 7, total: 8 },
      totalAccrued: 53,
      totalUsed: 16
    },
    {
      id: 'EMP003',
      employee: 'Dr. Michael Chen',
      department: 'Emergency',
      annualLeave: { used: 20, available: 20, total: 40 },
      sickLeave: { used: 2, available: 13, total: 15 },
      personalLeave: { used: 0, available: 10, total: 10 },
      totalAccrued: 65,
      totalUsed: 22
    },
    {
      id: 'EMP004',
      employee: 'Lab Tech John Smith',
      department: 'Laboratory',
      annualLeave: { used: 8, available: 17, total: 25 },
      sickLeave: { used: 1, available: 14, total: 15 },
      personalLeave: { used: 3, available: 5, total: 8 },
      totalAccrued: 48,
      totalUsed: 12
    }
  ];

  const filteredBalances = leaveBalances.filter(balance => {
    const matchesDepartment = filterDepartment === 'all' || balance.department === filterDepartment;
    const matchesSearch = balance.employee.toLowerCase().includes(searchEmployee.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const getUsageColor = (used: number, total: number) => {
    const percentage = (used / total) * 100;
    if (percentage >= 80) return 'text-red-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-green-600';
  };

  const getProgressColor = (used: number, total: number) => {
    const percentage = (used / total) * 100;
    if (percentage >= 80) return 'bg-red-600';
    if (percentage >= 60) return 'bg-orange-600';
    return 'bg-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Accrued</p>
                <p className="text-2xl font-bold text-blue-600">1,245</p>
                <p className="text-xs text-muted-foreground">days this year</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Used</p>
                <p className="text-2xl font-bold text-orange-600">578</p>
                <p className="text-xs text-muted-foreground">days this year</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-green-600">667</p>
                <p className="text-xs text-muted-foreground">days remaining</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Utilization</p>
                <p className="text-2xl font-bold text-purple-600">46.4%</p>
                <p className="text-xs text-muted-foreground">average usage</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <User className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Cardiology">Cardiology</SelectItem>
            <SelectItem value="General Medicine">General Medicine</SelectItem>
            <SelectItem value="Emergency">Emergency</SelectItem>
            <SelectItem value="Laboratory">Laboratory</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search employee..."
          value={searchEmployee}
          onChange={(e) => setSearchEmployee(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Leave Balances Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Leave Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Annual Leave</TableHead>
                <TableHead>Sick Leave</TableHead>
                <TableHead>Personal Leave</TableHead>
                <TableHead>Total Usage</TableHead>
                <TableHead>Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBalances.map((balance) => (
                <TableRow key={balance.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{balance.employee}</p>
                        <p className="text-sm text-muted-foreground">{balance.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className={getUsageColor(balance.annualLeave.used, balance.annualLeave.total)}>
                          {balance.annualLeave.used}/{balance.annualLeave.total}
                        </span>
                        <span className="text-muted-foreground">
                          {balance.annualLeave.available} left
                        </span>
                      </div>
                      <Progress 
                        value={(balance.annualLeave.used / balance.annualLeave.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className={getUsageColor(balance.sickLeave.used, balance.sickLeave.total)}>
                          {balance.sickLeave.used}/{balance.sickLeave.total}
                        </span>
                        <span className="text-muted-foreground">
                          {balance.sickLeave.available} left
                        </span>
                      </div>
                      <Progress 
                        value={(balance.sickLeave.used / balance.sickLeave.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className={getUsageColor(balance.personalLeave.used, balance.personalLeave.total)}>
                          {balance.personalLeave.used}/{balance.personalLeave.total}
                        </span>
                        <span className="text-muted-foreground">
                          {balance.personalLeave.available} left
                        </span>
                      </div>
                      <Progress 
                        value={(balance.personalLeave.used / balance.personalLeave.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getUsageColor(balance.totalUsed, balance.totalAccrued)}>
                      {balance.totalUsed}/{balance.totalAccrued} days
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getUsageColor(balance.totalUsed, balance.totalAccrued)}`}>
                        {((balance.totalUsed / balance.totalAccrued) * 100).toFixed(1)}%
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(balance.totalUsed, balance.totalAccrued)}`}
                          style={{ width: `${(balance.totalUsed / balance.totalAccrued) * 100}%` }}
                        ></div>
                      </div>
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

export default LeaveBalancesTab;
