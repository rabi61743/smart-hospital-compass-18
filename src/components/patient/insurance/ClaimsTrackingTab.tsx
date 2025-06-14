
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Filter, Download, Eye } from "lucide-react";
import { InsuranceClaim } from "./types";

const ClaimsTrackingTab = () => {
  const [claims] = useState<InsuranceClaim[]>([
    {
      id: '1',
      claimNumber: 'CLM2024001',
      serviceDate: '2024-01-15',
      submissionDate: '2024-01-16',
      provider: 'City General Hospital',
      serviceDescription: 'Annual Physical Exam',
      totalAmount: 5000,
      insurancePaid: 4000,
      patientResponsibility: 1000,
      status: 'paid'
    },
    {
      id: '2',
      claimNumber: 'CLM2024002',
      serviceDate: '2024-01-20',
      submissionDate: '2024-01-21',
      provider: 'Dr. Sarah Johnson - Cardiology',
      serviceDescription: 'Cardiac Consultation',
      totalAmount: 3000,
      insurancePaid: 2400,
      patientResponsibility: 600,
      status: 'processing'
    },
    {
      id: '3',
      claimNumber: 'CLM2024003',
      serviceDate: '2024-01-25',
      submissionDate: '2024-01-26',
      provider: 'Metro Lab Services',
      serviceDescription: 'Blood Test Panel',
      totalAmount: 1500,
      insurancePaid: 0,
      patientResponsibility: 1500,
      status: 'denied',
      denialReason: 'Service not covered under current plan'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'denied': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.serviceDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Claims Tracking</h3>
          <p className="text-sm text-muted-foreground">Track the status of your insurance claims</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Claims
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
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="denied">Denied</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Claims Table */}
      <Card>
        <CardHeader>
          <CardTitle>Claims History</CardTitle>
          <CardDescription>View and track all your insurance claims</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim Number</TableHead>
                <TableHead>Service Date</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Insurance Paid</TableHead>
                <TableHead>Your Responsibility</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.claimNumber}</TableCell>
                  <TableCell>{new Date(claim.serviceDate).toLocaleDateString()}</TableCell>
                  <TableCell>{claim.provider}</TableCell>
                  <TableCell>{claim.serviceDescription}</TableCell>
                  <TableCell>₹{claim.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>₹{claim.insurancePaid.toLocaleString()}</TableCell>
                  <TableCell>₹{claim.patientResponsibility.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(claim.status)}>
                      {claim.status.toUpperCase()}
                    </Badge>
                  </TableCell>
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

      {/* Claims Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                ₹{claims.reduce((sum, claim) => sum + claim.totalAmount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Claimed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ₹{claims.reduce((sum, claim) => sum + claim.insurancePaid, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Insurance Paid</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                ₹{claims.reduce((sum, claim) => sum + claim.patientResponsibility, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Your Responsibility</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {claims.filter(claim => claim.status === 'processing').length}
              </p>
              <p className="text-sm text-muted-foreground">Pending Claims</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClaimsTrackingTab;
