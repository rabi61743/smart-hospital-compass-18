
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface UserManagementFiltersProps {
  searchTerm: string;
  filterRole: string;
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  roles: string[];
}

const UserManagementFilters = ({
  searchTerm,
  filterRole,
  onSearchChange,
  onRoleFilterChange,
  roles
}: UserManagementFiltersProps) => {
  return (
    <div className="flex gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 border-gray-300 focus:border-blue-500 h-11"
        />
      </div>
      <Select value={filterRole} onValueChange={onRoleFilterChange}>
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
  );
};

export default UserManagementFilters;
