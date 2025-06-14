
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Eye, Download, RefreshCw } from "lucide-react";

const InsuranceClaimsTab = () => {
  const [claims] = useState([
    {
      id: '1',
      claimNumber: 'CLM-2024-001',
      patientName: 'Rajesh Kumar',
      insuranceProvider: 'Star Health',
      policyNumber: 'SH123456789',
      claimAmount: 45000,
      approvedAmount: 38000,
      submissionDate: '2024-01-10',
      approvalDate: '2024-01-18',
      status: 'approved',
      treatmentType: 'Surgery'
    },
    {
      id: '2',
      claimNumber: 'CLM-2024-002',
      patientName: 'Priya Sharma',
      insuranceProvider: 'HDFC ERGO',
      policyNumber: 'HE987654321',
      claimAmount: 25000,
      approvedAmount: 0,
      submissionDate: '2024-01-15',
      approvalDate: null,
      status: 'pending',
      treatmentType: 'Medical Treatment'
    },
    {
      id: '3',
      claimNumber: 'CLM-2024-003',
      patientName: 'Anita Desai',
      insuranceProvider: 'ICICI Lombard',
      policyNumber: 'IL456789123',
      claimAmount: 15000,
      approvedAmount: 0,
      submissionDate: '2024-01-12',
      approvalDate: null,
      status: 'rejected',
      treatmentType: 'Consultation',
      rejectionReason: 'Pre-existing condition'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.insuranceProvider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Insurance Claims</h3>
          <p className="text-sm text-muted-foreground">Track and manage insurance claims</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Claim
        </Button>
      </div>

      {/* Claims Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                ₹{claims.reduce((sum, claim) => sum + claim.claimAmount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Claims</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ₹{claims.filter(c => c.status === 'approved').reduce((sum, claim) => sum + claim.approvedAmount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Approved Amount</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {claims.filter(c => c.status === 'pending').length}
              </p>
              <p className="text-sm text-muted-foreground">Pending Claims</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((claims.filter(c => c.status === 'approved').length / claims.length) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Approval Rate</p>
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
                  placeholder="Search claims..."
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
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Claims Table */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Claims</CardTitle>
          <CardDescription>All insurance claims and their processing status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim Number</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Insurance Provider</TableHead>
                <TableHead>Treatment Type</TableHead>
                <TableHead>Claim Amount</TableHead>
                <TableHead>Approved Amount</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.claimNumber}</TableCell>
                  <TableCell>{claim.patientName}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{claim.insuranceProvider}</div>
                      <div className="text-sm text-muted-foreground">{claim.policyNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>{claim.treatmentType}</TableCell>
                  <TableCell>₹{claim.claimAmount.toLocaleString()}</TableCell>
                  <TableCell>₹{claim.approvedAmount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(claim.submissionDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(claim.status)}>
                      {claim.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
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

export default InsuranceClaimsTab;
