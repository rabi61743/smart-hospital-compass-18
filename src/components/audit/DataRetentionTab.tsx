
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Archive, Clock, Trash2, Shield, AlertTriangle, Calendar, Database } from "lucide-react";

const DataRetentionTab = () => {
  const [selectedPolicy, setSelectedPolicy] = useState('all');

  const retentionPolicies = [
    {
      id: 'RP001',
      name: 'Patient Medical Records',
      category: 'Healthcare',
      retentionPeriod: '7 years',
      autoArchive: true,
      autoDelete: false,
      dataTypes: ['Medical Records', 'Lab Results', 'Prescriptions'],
      recordsCount: 15847,
      complianceRequired: 'HIPAA, State Medical Records Law',
      status: 'active',
      lastReview: '2024-01-15'
    },
    {
      id: 'RP002',
      name: 'Financial Transaction Records',
      category: 'Financial',
      retentionPeriod: '10 years',
      autoArchive: true,
      autoDelete: false,
      dataTypes: ['Invoices', 'Payments', 'Tax Records'],
      recordsCount: 8934,
      complianceRequired: 'SOX, IRS Requirements',
      status: 'active',
      lastReview: '2024-02-01'
    },
    {
      id: 'RP003',
      name: 'Employee HR Records',
      category: 'Human Resources',
      retentionPeriod: '5 years after termination',
      autoArchive: true,
      autoDelete: true,
      dataTypes: ['Employment Contracts', 'Performance Reviews', 'Payroll'],
      recordsCount: 2456,
      complianceRequired: 'Labor Law, GDPR',
      status: 'active',
      lastReview: '2024-03-10'
    },
    {
      id: 'RP004',
      name: 'System Audit Logs',
      category: 'IT Security',
      retentionPeriod: '3 years',
      autoArchive: true,
      autoDelete: true,
      dataTypes: ['Access Logs', 'System Events', 'Security Logs'],
      recordsCount: 45678,
      complianceRequired: 'ISO 27001, SOC 2',
      status: 'active',
      lastReview: '2024-04-05'
    },
    {
      id: 'RP005',
      name: 'Insurance Claims',
      category: 'Insurance',
      retentionPeriod: '7 years',
      autoArchive: true,
      autoDelete: false,
      dataTypes: ['Claim Forms', 'Approvals', 'Denials'],
      recordsCount: 6789,
      complianceRequired: 'Insurance Regulations',
      status: 'under_review',
      lastReview: '2024-05-20'
    }
  ];

  const upcomingRetentions = [
    {
      id: 'UR001',
      description: 'Archive employee records from 2019',
      dueDate: '2024-07-15',
      recordsAffected: 145,
      action: 'Archive',
      policy: 'Employee HR Records'
    },
    {
      id: 'UR002',
      description: 'Delete system logs from 2021',
      dueDate: '2024-07-22',
      recordsAffected: 2678,
      action: 'Delete',
      policy: 'System Audit Logs'
    },
    {
      id: 'UR003',
      description: 'Archive financial records from 2014',
      dueDate: '2024-08-01',
      recordsAffected: 892,
      action: 'Archive',
      policy: 'Financial Transaction Records'
    },
    {
      id: 'UR004',
      description: 'Review insurance claims from 2017',
      dueDate: '2024-08-10',
      recordsAffected: 234,
      action: 'Review',
      policy: 'Insurance Claims'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Archive': return 'bg-blue-100 text-blue-800';
      case 'Delete': return 'bg-red-100 text-red-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPolicies = selectedPolicy === 'all' 
    ? retentionPolicies 
    : retentionPolicies.filter(policy => policy.id === selectedPolicy);

  return (
    <div className="space-y-6">
      {/* Retention Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Active Policies</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Archive className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Records Managed</p>
              <p className="text-2xl font-bold text-green-600">79.7K</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Pending Actions</p>
              <p className="text-2xl font-bold text-orange-600">4</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Compliance Rate</p>
              <p className="text-2xl font-bold text-purple-600">100%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policy Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <Select value={selectedPolicy} onValueChange={setSelectedPolicy}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select retention policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Policies</SelectItem>
                {retentionPolicies.map((policy) => (
                  <SelectItem key={policy.id} value={policy.id}>
                    {policy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>
              <Database className="h-4 w-4 mr-2" />
              Create New Policy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Retention Policies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Data Retention Policies</CardTitle>
          <CardDescription>Manage data lifecycle and compliance requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Retention Period</TableHead>
                <TableHead>Records Count</TableHead>
                <TableHead>Auto Actions</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{policy.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {policy.dataTypes.join(', ')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{policy.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {policy.retentionPeriod}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{policy.recordsCount.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {policy.autoArchive && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">Auto Archive</Badge>
                      )}
                      {policy.autoDelete && (
                        <Badge className="bg-red-100 text-red-800 text-xs">Auto Delete</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-muted-foreground max-w-xs">
                      {policy.complianceRequired}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(policy.status)}>
                      {policy.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upcoming Retention Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Retention Actions</CardTitle>
          <CardDescription>Scheduled data lifecycle events requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingRetentions.map((retention) => (
              <div key={retention.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {retention.action === 'Archive' && <Archive className="h-4 w-4 text-blue-600" />}
                    {retention.action === 'Delete' && <Trash2 className="h-4 w-4 text-red-600" />}
                    {retention.action === 'Review' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                  </div>
                  <div>
                    <div className="font-medium">{retention.description}</div>
                    <div className="text-sm text-muted-foreground">
                      Policy: {retention.policy} • {retention.recordsAffected} records affected
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{new Date(retention.dueDate).toLocaleDateString()}</span>
                    </div>
                    <Badge className={getActionColor(retention.action)}>
                      {retention.action}
                    </Badge>
                  </div>
                  <Button size="sm">
                    Execute Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Retention Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Lifecycle Distribution</CardTitle>
            <CardDescription>Current status of managed records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: 'Active Records', count: 52340, percentage: 65, color: 'bg-green-500' },
                { status: 'Archived Records', count: 23890, percentage: 30, color: 'bg-blue-500' },
                { status: 'Pending Review', count: 3470, percentage: 4, color: 'bg-yellow-500' },
                { status: 'Scheduled for Deletion', count: 800, percentage: 1, color: 'bg-red-500' }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{item.status}</span>
                    <span className="text-sm text-muted-foreground">{item.count.toLocaleString()}</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Monitoring</CardTitle>
            <CardDescription>Regulatory compliance status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { regulation: 'HIPAA', status: 'Compliant', score: 98, color: 'text-green-600' },
                { regulation: 'SOX', status: 'Compliant', score: 96, color: 'text-green-600' },
                { regulation: 'GDPR', status: 'Compliant', score: 94, color: 'text-green-600' },
                { regulation: 'ISO 27001', status: 'Under Review', score: 92, color: 'text-yellow-600' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{item.regulation}</div>
                    <div className={`text-sm ${item.color}`}>{item.status}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{item.score}%</div>
                    <div className="text-xs text-muted-foreground">Compliance Score</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataRetentionTab;
