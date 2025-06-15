
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Shield, 
  Edit, 
  Trash, 
  Eye,
  Activity,
  Clock,
  UserCheck,
  AlertCircle
} from "lucide-react";

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

interface UserTableProps {
  users: User[];
  selectedUsers: number[];
  onSelectUser: (userId: number) => void;
  onSelectAll: () => void;
}

const UserTable = ({ users, selectedUsers, onSelectUser, onSelectAll }: UserTableProps) => {
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

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="font-semibold text-gray-700 w-12">
              <Checkbox
                checked={selectedUsers.length === users.length && users.length > 0}
                onCheckedChange={onSelectAll}
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
                  onCheckedChange={() => onSelectUser(user.id)}
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
  );
};

export default UserTable;
