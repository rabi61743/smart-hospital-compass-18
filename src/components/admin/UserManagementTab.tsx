import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  UserPlus, 
  Search, 
  Download,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BulkUserOperationsBar from './BulkUserOperationsBar';
import BulkRoleAssignmentDialog from './BulkRoleAssignmentDialog';
import BulkUserImportExportDialog from './BulkUserImportExportDialog';
import UserStatsCards from './UserStatsCards';
import UserTable from './UserTable';
import EnhancedAddUserDialog from './EnhancedAddUserDialog';

const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isRoleAssignmentOpen, setIsRoleAssignmentOpen] = useState(false);
  const [isBulkImportExportOpen, setIsBulkImportExportOpen] = useState(false);
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

  const handleExportAllUsers = () => {
    const csvContent = generateUserCSV(users);
    downloadCSV(csvContent, `all-users-export-${new Date().toISOString().split('T')[0]}.csv`);
    
    toast({
      title: "Export Completed",
      description: `Successfully exported ${users.length} users to CSV.`,
    });
  };

  const generateUserCSV = (usersToExport: typeof users) => {
    const headers = ['Name', 'Email', 'Role', 'Department', 'Status', 'Last Login', 'Permissions'];
    const csvRows = [
      headers.join(','),
      ...usersToExport.map(user => [
        user.name,
        user.email,
        user.role,
        user.department,
        user.status,
        user.lastLogin,
        user.permissions.join(';')
      ].join(','))
    ];
    return csvRows.join('\n');
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBulkExport = () => {
    const selectedUsersData = users.filter(user => selectedUsers.includes(user.id));
    const csvContent = generateUserCSV(selectedUsersData);
    downloadCSV(csvContent, `selected-users-export-${new Date().toISOString().split('T')[0]}.csv`);
    
    toast({
      title: "Export Completed",
      description: `Successfully exported ${selectedUsers.length} selected users to CSV.`,
    });
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  const handleBulkAssignRole = (role: string) => {
    toast({
      title: "Role Assigned",
      description: `${role} role has been assigned to ${selectedUsers.length} users successfully.`,
    });
    setSelectedUsers([]);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Statistics Cards */}
      <UserStatsCards />

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

      {/* User Management Controls */}
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
              <Button 
                variant="outline" 
                onClick={() => setIsBulkImportExportOpen(true)}
                className="border-gray-300 hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import/Export
              </Button>
              <Button 
                variant="outline" 
                onClick={handleExportAllUsers}
                className="border-gray-300 hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </Button>
              <Button onClick={() => setIsAddUserOpen(true)} className="bg-blue-600 hover:bg-blue-700 shadow-md">
                <UserPlus className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Filter Controls */}
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

          {/* Users Table */}
          <UserTable
            users={users}
            selectedUsers={selectedUsers}
            onSelectUser={handleSelectUser}
            onSelectAll={handleSelectAll}
          />
        </CardContent>
      </Card>

      {/* Enhanced Add User Dialog */}
      <EnhancedAddUserDialog
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
      />

      {/* Bulk Role Assignment Dialog */}
      <BulkRoleAssignmentDialog
        isOpen={isRoleAssignmentOpen}
        onClose={() => setIsRoleAssignmentOpen(false)}
        selectedCount={selectedUsers.length}
        onAssignRole={handleBulkAssignRole}
      />

      {/* Bulk Import/Export Dialog */}
      <BulkUserImportExportDialog
        isOpen={isBulkImportExportOpen}
        onClose={() => setIsBulkImportExportOpen(false)}
        users={users}
      />
    </div>
  );
};

export default UserManagementTab;
