import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield, 
  Users, 
  Clock, 
  File, 
  Search, 
  Filter,
  UserCheck,
  AlertTriangle,
  Settings
} from "lucide-react";
import UserPermissionManager from './user-management/UserPermissionManager';
import PermissionAuditTrail from './user-management/PermissionAuditTrail';
import PermissionTemplates from './user-management/PermissionTemplates';

const UserPermissionManagementTab = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [userPermissions, setUserPermissions] = useState<string[]>([]);

  const users = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@hospital.com",
      role: "Doctor",
      department: "Cardiology",
      status: "Active",
      permissionCount: 8,
      lastPermissionChange: "2 days ago",
      criticalPermissions: 3
    },
    {
      id: 2,
      name: "John Anderson",
      email: "john.anderson@hospital.com",
      role: "Admin",
      department: "Administration",
      status: "Active",
      permissionCount: 15,
      lastPermissionChange: "1 week ago",
      criticalPermissions: 5
    },
    {
      id: 3,
      name: "Maria Garcia",
      email: "maria.garcia@hospital.com",
      role: "Nurse",
      department: "Emergency",
      status: "Active",
      permissionCount: 6,
      lastPermissionChange: "3 days ago",
      criticalPermissions: 2
    },
    {
      id: 4,
      name: "David Chen",
      email: "david.chen@hospital.com",
      role: "Pharmacist",
      department: "Pharmacy",
      status: "Active",
      permissionCount: 5,
      lastPermissionChange: "1 day ago",
      criticalPermissions: 1
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@hospital.com",
      role: "Finance",
      department: "Finance",
      status: "Active",
      permissionCount: 10,
      lastPermissionChange: "5 days ago",
      criticalPermissions: 4
    }
  ];

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    // Load user permissions - in a real app, this would be an API call
    const mockPermissions = [
      'patients.view',
      'patients.edit',
      'patients.medical',
      'billing.view',
      'reports.view'
    ];
    setUserPermissions(mockPermissions);
  };

  const handlePermissionsChange = (permissions: string[]) => {
    setUserPermissions(permissions);
    // In a real app, you would save these permissions to the backend
    console.log('Permissions updated:', permissions);
  };

  const handleApplyTemplate = (permissions: string[]) => {
    setUserPermissions(permissions);
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Permission Management Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">With permissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Permissions</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.reduce((sum, user) => sum + user.permissionCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total assigned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Access</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.reduce((sum, user) => sum + user.criticalPermissions, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Critical permissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Changes</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Permission Management Interface */}
      <Card>
        <CardHeader>
          <CardTitle>User Permission Management</CardTitle>
          <CardDescription>
            Comprehensive permission management for individual users and system-wide oversight
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user-permissions" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="user-permissions" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                User Permissions
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <File className="h-4 w-4" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="audit-trail" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Audit Trail
              </TabsTrigger>
              <TabsTrigger value="bulk-operations" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Bulk Operations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user-permissions" className="space-y-6">
              {/* User Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select User</CardTitle>
                  <CardDescription>Choose a user to manage their permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Search and Filter */}
                  <div className="flex gap-4 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={filterRole} onValueChange={setFilterRole}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="nurse">Nurse</SelectItem>
                        <SelectItem value="pharmacist">Pharmacist</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* User Table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Permissions</TableHead>
                        <TableHead>Critical</TableHead>
                        <TableHead>Last Change</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.role}</Badge>
                          </TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800">
                              {user.permissionCount}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-orange-100 text-orange-800">
                              {user.criticalPermissions}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {user.lastPermissionChange}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserSelect(user.id)}
                            >
                              Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* User Permission Manager */}
              {selectedUserId && (
                <UserPermissionManager
                  userId={selectedUserId}
                  userPermissions={userPermissions}
                  onPermissionsChange={handlePermissionsChange}
                  userRole={users.find(u => u.id === selectedUserId)?.role}
                />
              )}
            </TabsContent>

            <TabsContent value="templates">
              <PermissionTemplates onApplyTemplate={handleApplyTemplate} />
            </TabsContent>

            <TabsContent value="audit-trail">
              <PermissionAuditTrail userId={selectedUserId} />
            </TabsContent>

            <TabsContent value="bulk-operations">
              <Card>
                <CardHeader>
                  <CardTitle>Bulk Permission Operations</CardTitle>
                  <CardDescription>
                    Perform permission changes across multiple users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Bulk operations functionality will be implemented here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPermissionManagementTab;
