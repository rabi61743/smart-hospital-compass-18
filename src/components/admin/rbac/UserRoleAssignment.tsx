
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, UserCheck, Plus, Edit, Shield, Users, AlertTriangle } from "lucide-react";

interface UserRoleAssignmentProps {
  currentUserRole: string;
  departmentAccess: string[];
}

const UserRoleAssignment = ({ currentUserRole, departmentAccess }: UserRoleAssignmentProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isAssignRoleOpen, setIsAssignRoleOpen] = useState(false);

  const users = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@hospital.com",
      department: "medical",
      currentRoles: ["Medical Staff", "Module Administrator"],
      status: "active",
      lastLogin: "2 hours ago"
    },
    {
      id: 2,
      name: "John Anderson",
      email: "john.anderson@hospital.com",
      department: "hr",
      currentRoles: ["Department Administrator"],
      status: "active",
      lastLogin: "30 minutes ago"
    },
    {
      id: 3,
      name: "Maria Garcia",
      email: "maria.garcia@hospital.com",
      department: "medical",
      currentRoles: ["Medical Staff"],
      status: "active",
      lastLogin: "1 hour ago"
    },
    {
      id: 4,
      name: "David Chen",
      email: "david.chen@hospital.com",
      department: "pharmacy",
      currentRoles: ["Medical Staff"],
      status: "inactive",
      lastLogin: "3 days ago"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@hospital.com",
      department: "finance",
      currentRoles: ["Finance Staff", "Module Administrator"],
      status: "active",
      lastLogin: "15 minutes ago"
    }
  ];

  const availableRoles = [
    "Super Administrator",
    "Department Administrator", 
    "Module Administrator",
    "Medical Staff",
    "Finance Staff",
    "Pharmacy Staff",
    "HR Staff"
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Administrator': return 'bg-red-100 text-red-800';
      case 'Department Administrator': return 'bg-blue-100 text-blue-800';
      case 'Module Administrator': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.currentRoles.some(role => 
      role.toLowerCase().includes(filterRole.toLowerCase())
    );
    const matchesDepartment = currentUserRole === "super-admin" || 
                             departmentAccess.includes(user.department);
    return matchesSearch && matchesRole && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Assignment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredUsers.length}</div>
            <p className="text-xs text-muted-foreground">In your scope</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredUsers.filter(u => u.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Multiple Roles</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredUsers.filter(u => u.currentRoles.length > 1).length}
            </div>
            <p className="text-xs text-muted-foreground">Users with multiple roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Role changes pending</p>
          </CardContent>
        </Card>
      </div>

      {/* User Role Assignment */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>User Role Assignment</CardTitle>
              <CardDescription>
                Assign and manage user roles across the system
              </CardDescription>
            </div>
            <Dialog open={isAssignRoleOpen} onOpenChange={setIsAssignRoleOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Assign Role
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Assign Role to User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Select User</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose user" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredUsers.map(user => (
                          <SelectItem key={user.id} value={user.id.toString()}>
                            {user.name} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Assign Roles</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {availableRoles.map((role) => (
                        <div key={role} className="flex items-center space-x-2">
                          <Checkbox id={role} />
                          <label htmlFor={role} className="text-sm">
                            {role}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Assign Roles</Button>
                    <Button variant="outline" onClick={() => setIsAssignRoleOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
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
                {availableRoles.map(role => (
                  <SelectItem key={role} value={role.toLowerCase()}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Current Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
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
                    <Badge variant="outline">
                      {user.department.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.currentRoles.map((role, index) => (
                        <Badge key={index} className={getRoleColor(role)}>
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Roles
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

export default UserRoleAssignment;
