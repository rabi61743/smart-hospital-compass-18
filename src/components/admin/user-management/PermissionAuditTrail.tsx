
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, User, Shield, Filter, Download, Search } from "lucide-react";

interface AuditEntry {
  id: number;
  timestamp: string;
  userId: number;
  userName: string;
  action: 'granted' | 'revoked' | 'modified';
  permission: string;
  previousValue?: string;
  newValue?: string;
  performedBy: string;
  reason?: string;
}

interface PermissionAuditTrailProps {
  userId?: number;
}

const PermissionAuditTrail = ({ userId }: PermissionAuditTrailProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [dateRange, setDateRange] = useState('7d');

  const auditEntries: AuditEntry[] = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30:00',
      userId: 1,
      userName: 'Dr. Sarah Wilson',
      action: 'granted',
      permission: 'patients.medical',
      newValue: 'Medical Records Access',
      performedBy: 'John Anderson',
      reason: 'Department transfer to Cardiology'
    },
    {
      id: 2,
      timestamp: '2024-01-15 10:15:00',
      userId: 1,
      userName: 'Dr. Sarah Wilson',
      action: 'revoked',
      permission: 'system.admin',
      previousValue: 'System Administration',
      performedBy: 'System Admin',
      reason: 'Role change from Admin to Doctor'
    },
    {
      id: 3,
      timestamp: '2024-01-14 16:45:00',
      userId: 2,
      userName: 'Maria Garcia',
      action: 'granted',
      permission: 'billing.process',
      newValue: 'Process Payments',
      performedBy: 'Finance Manager',
      reason: 'Additional responsibilities assigned'
    },
    {
      id: 4,
      timestamp: '2024-01-14 09:20:00',
      userId: 3,
      userName: 'David Chen',
      action: 'modified',
      permission: 'finance.commission',
      previousValue: 'Read Only',
      newValue: 'Full Access',
      performedBy: 'Department Head',
      reason: 'Promotion to Senior Pharmacist'
    }
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'granted': return 'bg-green-100 text-green-800';
      case 'revoked': return 'bg-red-100 text-red-800';
      case 'modified': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEntries = auditEntries.filter(entry => {
    const matchesSearch = entry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.permission.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.performedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || entry.action === filterAction;
    const matchesUser = !userId || entry.userId === userId;
    return matchesSearch && matchesAction && matchesUser;
  });

  return (
    <div className="space-y-6">
      {/* Audit Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Changes</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredEntries.length}</div>
            <p className="text-xs text-muted-foreground">In selected period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permissions Granted</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredEntries.filter(e => e.action === 'granted').length}
            </div>
            <p className="text-xs text-muted-foreground">New permissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permissions Revoked</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredEntries.filter(e => e.action === 'revoked').length}
            </div>
            <p className="text-xs text-muted-foreground">Removed permissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modified</CardTitle>
            <User className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredEntries.filter(e => e.action === 'modified').length}
            </div>
            <p className="text-xs text-muted-foreground">Permission changes</p>
          </CardContent>
        </Card>
      </div>

      {/* Audit Trail */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Permission Audit Trail</CardTitle>
              <CardDescription>
                Track all permission changes and modifications
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search audit trail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="granted">Granted</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
                <SelectItem value="modified">Modified</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last Day</SelectItem>
                <SelectItem value="7d">Last Week</SelectItem>
                <SelectItem value="30d">Last Month</SelectItem>
                <SelectItem value="90d">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Audit Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Permission</TableHead>
                <TableHead>Changes</TableHead>
                <TableHead>Performed By</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-sm text-muted-foreground">
                    {entry.timestamp}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{entry.userName}</div>
                    <div className="text-sm text-muted-foreground">ID: {entry.userId}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getActionColor(entry.action)}>
                      {entry.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {entry.permission}
                    </code>
                  </TableCell>
                  <TableCell>
                    {entry.action === 'granted' && (
                      <span className="text-green-600">+ {entry.newValue}</span>
                    )}
                    {entry.action === 'revoked' && (
                      <span className="text-red-600">- {entry.previousValue}</span>
                    )}
                    {entry.action === 'modified' && (
                      <div className="text-sm">
                        <span className="text-red-600">- {entry.previousValue}</span>
                        <br />
                        <span className="text-green-600">+ {entry.newValue}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{entry.performedBy}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {entry.reason || 'No reason provided'}
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

export default PermissionAuditTrail;
