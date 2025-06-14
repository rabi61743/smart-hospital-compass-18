
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Download, Calendar, User, Activity } from "lucide-react";

const AuditTrailsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');

  const auditTrails = [
    {
      id: 'AT001',
      timestamp: '2024-06-14 15:30:25',
      user: 'Dr. Rajesh Kumar',
      action: 'Patient Record Access',
      resource: 'Patient ID: P12345',
      ipAddress: '192.168.1.15',
      userAgent: 'Chrome 125.0.0.0',
      status: 'success',
      details: 'Viewed patient medical history'
    },
    {
      id: 'AT002',
      timestamp: '2024-06-14 14:45:12',
      user: 'Finance Manager',
      action: 'Financial Report Export',
      resource: 'Monthly Revenue Report',
      ipAddress: '192.168.1.20',
      userAgent: 'Firefox 127.0',
      status: 'success',
      details: 'Exported financial data for audit'
    },
    {
      id: 'AT003',
      timestamp: '2024-06-14 13:20:08',
      user: 'System Admin',
      action: 'User Permission Change',
      resource: 'User: priya.sharma@hospital.com',
      ipAddress: '10.0.0.1',
      userAgent: 'Chrome 125.0.0.0',
      status: 'success',
      details: 'Updated user role from Nurse to Senior Nurse'
    },
    {
      id: 'AT004',
      timestamp: '2024-06-14 12:15:33',
      user: 'Unknown User',
      action: 'Failed Login Attempt',
      resource: 'Login System',
      ipAddress: '203.0.113.1',
      userAgent: 'Chrome 124.0.0.0',
      status: 'failed',
      details: 'Multiple failed login attempts detected'
    },
    {
      id: 'AT005',
      timestamp: '2024-06-14 11:30:45',
      user: 'Dr. Sarah Wilson',
      action: 'Prescription Created',
      resource: 'Prescription ID: RX789',
      ipAddress: '192.168.1.25',
      userAgent: 'Safari 17.0',
      status: 'success',
      details: 'Created prescription for patient P67890'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes('Failed') || action.includes('Error')) return 'bg-red-100 text-red-800';
    if (action.includes('Export') || action.includes('Download')) return 'bg-blue-100 text-blue-800';
    if (action.includes('Create') || action.includes('Add')) return 'bg-green-100 text-green-800';
    if (action.includes('Update') || action.includes('Change')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-purple-100 text-purple-800';
  };

  const filteredTrails = auditTrails.filter(trail => {
    const matchesSearch = trail.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trail.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trail.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || trail.action.toLowerCase().includes(actionFilter.toLowerCase());
    const matchesUser = userFilter === 'all' || trail.user === userFilter;
    return matchesSearch && matchesAction && matchesUser;
  });

  return (
    <div className="space-y-6">
      {/* Audit Trail Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Total Events</p>
              <p className="text-2xl font-bold text-blue-600">2,847</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-green-600">156</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Today's Events</p>
              <p className="text-2xl font-bold text-purple-600">89</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Eye className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Failed Attempts</p>
              <p className="text-2xl font-bold text-red-600">12</p>
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
                  placeholder="Search audit trails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="access">Access Events</SelectItem>
                <SelectItem value="create">Create Events</SelectItem>
                <SelectItem value="update">Update Events</SelectItem>
                <SelectItem value="delete">Delete Events</SelectItem>
                <SelectItem value="failed">Failed Events</SelectItem>
              </SelectContent>
            </Select>
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-48">
                <User className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="Dr. Rajesh Kumar">Dr. Rajesh Kumar</SelectItem>
                <SelectItem value="Finance Manager">Finance Manager</SelectItem>
                <SelectItem value="System Admin">System Admin</SelectItem>
                <SelectItem value="Dr. Sarah Wilson">Dr. Sarah Wilson</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Trails Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail Log</CardTitle>
          <CardDescription>Detailed log of all system activities and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrails.map((trail) => (
                <TableRow key={trail.id}>
                  <TableCell className="font-mono text-sm">
                    <div>{trail.timestamp.split(' ')[0]}</div>
                    <div className="text-xs text-muted-foreground">{trail.timestamp.split(' ')[1]}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {trail.user}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getActionColor(trail.action)}>
                      {trail.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{trail.resource}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(trail.status)}>
                      {trail.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{trail.ipAddress}</TableCell>
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

export default AuditTrailsTab;
