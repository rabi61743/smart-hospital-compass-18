
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Phone, 
  Mail,
  Calendar,
  Activity
} from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialization: string;
  department: string;
  status: string;
  employeeType: string;
  joinDate: string;
  licenseNumber: string;
  yearsExperience: number;
  avatar: string;
  lastLogin: string;
}

interface StaffTableProps {
  staffMembers: StaffMember[];
  onViewProfile: (staffId: string) => void;
}

const StaffTable = ({ staffMembers, onViewProfile }: StaffTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Doctor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Nurse': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Admin Staff': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Technician': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="font-semibold text-gray-700">Staff Member</TableHead>
            <TableHead className="font-semibold text-gray-700">Role & Department</TableHead>
            <TableHead className="font-semibold text-gray-700">Contact</TableHead>
            <TableHead className="font-semibold text-gray-700">Employment</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffMembers.map((staff, index) => (
            <TableRow key={staff.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
              <TableCell className="py-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white font-semibold">
                      {staff.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{staff.name}</div>
                    <div className="text-sm text-gray-500">ID: {staff.id}</div>
                    <div className="text-xs text-gray-400">License: {staff.licenseNumber}</div>
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <Badge className={`${getRoleColor(staff.role)} border font-medium`}>
                    {staff.role}
                  </Badge>
                  <div className="text-sm font-medium text-gray-700">{staff.department}</div>
                  <div className="text-xs text-gray-500">{staff.specialization}</div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">{staff.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">{staff.phone}</span>
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">Joined {staff.joinDate}</span>
                  </div>
                  <div className="text-sm text-gray-600">{staff.employeeType}</div>
                  <div className="text-xs text-gray-500">{staff.yearsExperience} years exp.</div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <Badge className={`${getStatusColor(staff.status)} border font-medium flex items-center gap-1 w-fit`}>
                    <Activity className="h-3 w-3" />
                    {staff.status}
                  </Badge>
                  <div className="text-xs text-gray-500">Last: {staff.lastLogin}</div>
                </div>
              </TableCell>
              
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 border-0 shadow-lg">
                    <DropdownMenuItem 
                      className="hover:bg-blue-50 focus:bg-blue-50"
                      onClick={() => onViewProfile(staff.id)}
                    >
                      <Eye className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-blue-600">View Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-green-50 focus:bg-green-50">
                      <Edit className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-green-600">Edit Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-purple-50 focus:bg-purple-50">
                      <Phone className="h-4 w-4 mr-2 text-purple-600" />
                      <span className="text-purple-600">Contact Staff</span>
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

export default StaffTable;
