
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Edit, Plus, TrendingUp, DollarSign, CheckCircle, Clock } from "lucide-react";

const SalaryRevisionsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const salaryRevisions = [
    {
      id: 'SAL001',
      employeeName: 'Dr. Sarah Wilson',
      employeeId: 'EMP001',
      position: 'Senior Cardiologist',
      department: 'Cardiology',
      currentSalary: 120000,
      proposedSalary: 135000,
      increaseAmount: 15000,
      increasePercentage: 12.5,
      revisionType: 'Performance Increment',
      effectiveDate: '2024-07-01',
      requestDate: '2024-06-01',
      status: 'approved',
      approvedBy: 'Dr. Rajesh Kumar',
      reason: 'Exceptional performance in Q1-Q2, led successful cardiac surgery program'
    },
    {
      id: 'SAL002',
      employeeName: 'Priya Sharma',
      employeeId: 'EMP002',
      position: 'Nurse Manager',
      department: 'Emergency',
      currentSalary: 85000,
      proposedSalary: 92000,
      increaseAmount: 7000,
      increasePercentage: 8.2,
      revisionType: 'Annual Increment',
      effectiveDate: '2024-07-01',
      requestDate: '2024-05-15',
      status: 'pending_approval',
      approvedBy: null,
      reason: 'Annual performance review - meets expectations'
    },
    {
      id: 'SAL003',
      employeeName: 'John Martinez',
      employeeId: 'EMP003',
      position: 'Lab Technician',
      department: 'Laboratory',
      currentSalary: 45000,
      proposedSalary: 50000,
      increaseAmount: 5000,
      increasePercentage: 11.1,
      revisionType: 'Promotion Increment',
      effectiveDate: '2024-08-01',
      requestDate: '2024-06-10',
      status: 'under_review',
      approvedBy: null,
      reason: 'Promotion to Senior Lab Technician'
    },
    {
      id: 'SAL004',
      employeeName: 'Lisa Thompson',
      employeeId: 'EMP004',
      position: 'Pharmacist',
      department: 'Pharmacy',
      currentSalary: 75000,
      proposedSalary: 78000,
      increaseAmount: 3000,
      increasePercentage: 4.0,
      revisionType: 'Market Adjustment',
      effectiveDate: '2024-07-15',
      requestDate: '2024-05-20',
      status: 'rejected',
      approvedBy: 'Dr. Amanda Rodriguez',
      reason: 'Market adjustment due to industry standards'
    },
    {
      id: 'SAL005',
      employeeName: 'Michael Brown',
      employeeId: 'EMP005',
      position: 'Finance Manager',
      department: 'Administration',
      currentSalary: 95000,
      proposedSalary: 105000,
      increaseAmount: 10000,
      increasePercentage: 10.5,
      revisionType: 'Performance Increment',
      effectiveDate: '2024-07-01',
      requestDate: '2024-06-05',
      status: 'approved',
      approvedBy: 'Ms. Jennifer Davis',
      reason: 'Outstanding budget management and cost optimization initiatives'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRevisionTypeColor = (type: string) => {
    switch (type) {
      case 'Performance Increment': return 'bg-purple-100 text-purple-800';
      case 'Annual Increment': return 'bg-blue-100 text-blue-800';
      case 'Promotion Increment': return 'bg-orange-100 text-orange-800';
      case 'Market Adjustment': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRevisions = salaryRevisions.filter(revision => {
    const matchesSearch = revision.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         revision.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         revision.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || revision.status === statusFilter;
    const matchesType = typeFilter === 'all' || revision.revisionType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalProposedIncrease = salaryRevisions
    .filter(r => r.status === 'approved' || r.status === 'pending_approval')
    .reduce((sum, r) => sum + r.increaseAmount, 0);

  return (
    <div className="space-y-6">
      {/* Revision Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {salaryRevisions.filter(r => r.status === 'approved').length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {salaryRevisions.filter(r => r.status === 'pending_approval').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Under Review</p>
              <p className="text-2xl font-bold text-blue-600">
                {salaryRevisions.filter(r => r.status === 'under_review').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Total Impact</p>
              <p className="text-2xl font-bold text-purple-600">
                ₹{totalProposedIncrease.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search salary revisions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending_approval">Pending Approval</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Performance Increment">Performance Increment</SelectItem>
                  <SelectItem value="Annual Increment">Annual Increment</SelectItem>
                  <SelectItem value="Promotion Increment">Promotion Increment</SelectItem>
                  <SelectItem value="Market Adjustment">Market Adjustment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Revision
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Salary Revisions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Revisions</CardTitle>
          <CardDescription>Manage and track salary increment proposals and approvals</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Current Salary</TableHead>
                <TableHead>Proposed Salary</TableHead>
                <TableHead>Increase</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRevisions.map((revision) => (
                <TableRow key={revision.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{revision.employeeName}</div>
                      <div className="text-sm text-muted-foreground">
                        {revision.position} • {revision.department}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">₹{revision.currentSalary.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">₹{revision.proposedSalary.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-green-600">
                        +₹{revision.increaseAmount.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {revision.increasePercentage}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRevisionTypeColor(revision.revisionType)}>
                      {revision.revisionType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(revision.status)}>
                      {revision.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(revision.effectiveDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {(revision.status === 'pending_approval' || revision.status === 'under_review') && (
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
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

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Revision Summary</CardTitle>
          <CardDescription>Financial impact of approved and pending salary revisions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                ₹{salaryRevisions.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.increaseAmount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Approved Increases</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600">
                ₹{salaryRevisions.filter(r => r.status === 'pending_approval').reduce((sum, r) => sum + r.increaseAmount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Pending Approvals</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {((salaryRevisions.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.increaseAmount, 0) / salaryRevisions.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.currentSalary, 0)) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Average Increase</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryRevisionsTab;
