
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserManagementActions from './UserManagementActions';
import UserManagementFilters from './UserManagementFilters';
import UserTable from '../UserTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  lastLogin: string;
  permissions: string[];
  avatar: string;
}

interface UserManagementContainerProps {
  users: User[];
  searchTerm: string;
  filterRole: string;
  selectedUsers: number[];
  roles: string[];
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onSelectUser: (userId: number) => void;
  onSelectAll: () => void;
  onAddUser: () => void;
  onExportUsers: () => void;
  onImportExport: () => void;
}

const UserManagementContainer = ({
  users,
  searchTerm,
  filterRole,
  selectedUsers,
  roles,
  onSearchChange,
  onRoleFilterChange,
  onSelectUser,
  onSelectAll,
  onAddUser,
  onExportUsers,
  onImportExport
}: UserManagementContainerProps) => {
  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold text-gray-800">User Management</CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Manage user accounts, roles, and permissions across the system
            </CardDescription>
          </div>
          <UserManagementActions
            onAddUser={onAddUser}
            onExportUsers={onExportUsers}
            onImportExport={onImportExport}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <UserManagementFilters
          searchTerm={searchTerm}
          filterRole={filterRole}
          onSearchChange={onSearchChange}
          onRoleFilterChange={onRoleFilterChange}
          roles={roles}
        />

        <UserTable
          users={users}
          selectedUsers={selectedUsers}
          onSelectUser={onSelectUser}
          onSelectAll={onSelectAll}
        />
      </CardContent>
    </Card>
  );
};

export default UserManagementContainer;
