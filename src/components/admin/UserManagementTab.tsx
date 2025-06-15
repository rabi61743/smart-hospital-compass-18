
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import BulkUserOperationsBar from './BulkUserOperationsBar';
import BulkRoleAssignmentDialog from './BulkRoleAssignmentDialog';
import BulkUserImportExportDialog from './BulkUserImportExportDialog';
import UserStatsCards from './UserStatsCards';
import EnhancedAddUserDialog from './EnhancedAddUserDialog';
import UserManagementContainer from './user-management/UserManagementContainer';
import { generateUserCSV, downloadCSV, mockUsers, roles } from './user-management/userManagementHelpers';

const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isRoleAssignmentOpen, setIsRoleAssignmentOpen] = useState(false);
  const [isBulkImportExportOpen, setIsBulkImportExportOpen] = useState(false);
  const { toast } = useToast();

  const users = mockUsers;

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
      <UserStatsCards />

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

      <UserManagementContainer
        users={users}
        searchTerm={searchTerm}
        filterRole={filterRole}
        selectedUsers={selectedUsers}
        roles={roles}
        onSearchChange={setSearchTerm}
        onRoleFilterChange={setFilterRole}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        onAddUser={() => setIsAddUserOpen(true)}
        onExportUsers={handleExportAllUsers}
        onImportExport={() => setIsBulkImportExportOpen(true)}
      />

      <EnhancedAddUserDialog
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
      />

      <BulkRoleAssignmentDialog
        isOpen={isRoleAssignmentOpen}
        onClose={() => setIsRoleAssignmentOpen(false)}
        selectedCount={selectedUsers.length}
        onAssignRole={handleBulkAssignRole}
      />

      <BulkUserImportExportDialog
        isOpen={isBulkImportExportOpen}
        onClose={() => setIsBulkImportExportOpen(false)}
        users={users}
      />
    </div>
  );
};

export default UserManagementTab;
