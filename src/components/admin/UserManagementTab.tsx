import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Shield, 
  Edit, 
  Trash, 
  Eye,
  Download,
  Activity,
  Clock,
  UserCheck,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BulkUserOperationsBar from './BulkUserOperationsBar';
import BulkRoleAssignmentDialog from './BulkRoleAssignmentDialog';

const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isRoleAssignmentOpen, setIsRoleAssignmentOpen] = useState(false);
  const { toast } = useToast();

  const users = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@hospital.com",
      role: "Doctor",
      department: "Cardiology",
      status: "Active",
      lastLogin: "2 hours ago",
      permissions: ["Patient Records", "Prescriptions", "Appointments"],
      avatar: "SW"
    },
    {
      id: 2,
      name: "John Anderson",
      email: "john.anderson@hospital.com",
      role: "Admin",
      department: "Administration",
      status: "Active",
      lastLogin: "30 minutes ago",
      permissions: ["Full Access"],
      avatar: "JA"
    },
    {
      id: 3,
      name: "Maria Garcia",
      email: "maria.garcia@hospital.com",
      role: "Nurse",
      department: "Emergency",
      status: "Active",
      lastLogin: "1 hour ago",
      permissions: ["Patient Care", "Medical Records"],
      avatar: "MG"
    },
    {
      id: 4,
      name: "David Chen",
      email: "david.chen@hospital.com",
      role: "Pharmacist",
      department: "Pharmacy",
      status: "Inactive",
      lastLogin: "3 days ago",
      permissions: ["Pharmacy", "Inventory"],
      avatar: "DC"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@hospital.com",
      role: "Finance",
      department: "Finance",
      status: "Active",
      lastLogin: "15 minutes ago",
      permissions: ["Billing", "Reports", "Commission"],
      avatar: "LT"
    }
  ];

  const roles = ["All", "Admin", "Doctor", "Nurse", "Pharmacist", "Finance", "Patient"];
  const departments = ["Administration", "Cardiology", "Emergency", "Pharmacy", "Finance", "Radiology"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Inactive': return 'bg-red-100 text-red-700 border-red-200';
      case 'Suspended': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-violet-100 text-violet-700 border-violet-200';
      case 'Doctor': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Nurse': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'Pharmacist': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Finance': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Activity className="h-3 w-3" />;
      case 'Inactive': return <Clock className="h-3 w-3" />;
      case 'Suspended': return <AlertCircle className="h-3 w-3" />;
      default: return <UserCheck className="h-3 w-3" />;
    }
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  const handleBulkActivate = () => {
    toast({
      title: "Users Activated",
      description: `${selectedUsers.length} users have been activated successfully.`,
    });
    setSelectedUsers([]);
  };

  const handleBulkDeactivate = () => {
    toast({
      title: "Users Deactivated",
      description: `${selectedUsers.length} users have been deactivated successfully.`,
    });
    setSelectedUsers([]);
  };

  const handleBulkDelete = () => {
    toast({
      title: "Users Deleted",
      description: `${selectedUsers.length} users have been deleted successfully.`,
      variant: "destructive",
    });
    setSelectedUsers([]);
  };

  const handleBulkExport = () => {
    toast({
      title: "Export Started",
      description: `Exporting data for ${selectedUsers.length} selected users.`,
    });
  };

  const handleBulkAssignRole = (role: string) => {
    toast({
      title: "Role Assigned",
      description: `${role} role has been assigned to ${selectedUsers.length} users.`,
    });
    setSelectedUsers([]);
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-blue-700">Total Users</CardTitle>
            <div className="p-2 bg-blue-200 rounded-lg">
              <Users className="h-5 w-5 text-blue-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800">1,247</div>
            <p className="text-sm text-blue-600 mt-1">+12 this week</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-emerald-700">Active Sessions</CardTitle>
            <div className="p-2 bg-emerald-200 rounded-lg">
              <Shield className="h-5 w-5 text-emerald-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-800">847</div>
            <p className="text-sm text-emerald-600 mt-1">Currently online</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-purple-700">New Registrations</CardTitle>
            <div className="p-2 bg-purple-200 rounded-lg">
              <UserPlus className="h-5 w-5 text-purple-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800">23</div>
            <p className="text-sm text-purple-600 mt-1">Last 7 days</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-amber-700">Pending Approvals</CardTitle>
            <div className="p-2 bg-amber-200 rounded-lg">
              <Filter className="h-5 w-5 text-amber-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-800">8</div>
            <p className="text-sm text-amber-600 mt-1">Require action</p>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Operations Bar */}
      {selectedUsers.length > 0 && (
        <BulkUserOperationsBar
          selectedCount={selectedUsers.length}
          totalCount={users.length}
          onSelectAll={handleSelectAll}
          onBulkActivate={handleBulkActivate}
          onBulkDeactivate={handleBulkDeactivate}
          onBulkDelete={handleBulkDelete}
          onBulkExport={handleBulkExport}
          onBulkAssignRole={() => setIsRoleAssignmentOpen(true)}
          onClearSelection={clearSelection}
        />
      )}

      {/* Enhanced User Management Controls */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">User Management</CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Manage user accounts, roles, and permissions across the system
              </CardDescription>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </Button>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New User
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md border-0 shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Add New User</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-5 pt-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
                      <Input placeholder="Enter full name" className="border-gray-300 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
                      <Input placeholder="Enter email address" type="email" className="border-gray-300 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Role</label>
                      <Select>
                        <SelectTrigger className="border-gray-300 focus:border-blue-500">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.slice(1).map(role => (
                            <SelectItem key={role} value={role.toLowerCase()}>{role}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Department</label>
                      <Select>
                        <SelectTrigger className="border-gray-300 focus:border-blue-500">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Create User</Button>
                      <Button variant="outline" onClick={() => setIsAddUserOpen(false)} className="flex-1 border-gray-300">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Enhanced Search and Filter Controls */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 h-11"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-48 border-gray-300 focus:border-blue-500 h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role} value={role.toLowerCase()}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Enhanced Users Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 w-12">
                    <Checkbox
                      checked={selectedUsers.length === users.length && users.length > 0}
                      onCheckedChange={handleSelectAll}
                      className="ml-2"
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">User</TableHead>
                  <TableHead className="font-semibold text-gray-700">Role</TableHead>
                  <TableHead className="font-semibold text-gray-700">Department</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Last Login</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'} ${selectedUsers.includes(user.id) ? 'bg-blue-50' : ''}`}>
                    <TableCell className="py-4">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleSelectUser(user.id)}
                        className="ml-2"
                      />
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getRoleColor(user.role)} border font-medium`}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700 font-medium">{user.department}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(user.status)} border font-medium flex items-center gap-1 w-fit`}>
                        {getStatusIcon(user.status)}
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 border-0 shadow-lg">
                          <DropdownMenuItem className="hover:bg-blue-50 focus:bg-blue-50">
                            <Eye className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="text-blue-600">View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-green-50 focus:bg-green-50">
                            <Edit className="h-4 w-4 mr-2 text-green-600" />
                            <span className="text-green-600">Edit User</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-purple-50 focus:bg-purple-50">
                            <Shield className="h-4 w-4 mr-2 text-purple-600" />
                            <span className="text-purple-600">Manage Permissions</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-red-50 focus:bg-red-50">
                            <Trash className="h-4 w-4 mr-2 text-red-600" />
                            <span className="text-red-600">Deactivate</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Role Assignment Dialog */}
      <BulkRoleAssignmentDialog
        isOpen={isRoleAssignmentOpen}
        onClose={() => setIsRoleAssignmentOpen(false)}
        selectedCount={selectedUsers.length}
        onAssignRole={handleBulkAssignRole}
      />
    </div>
  );
};

export default UserManagementTab;
