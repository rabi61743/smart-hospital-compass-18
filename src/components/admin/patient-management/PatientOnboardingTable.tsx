
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
  User
} from "lucide-react";

interface PatientRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  registrationDate: string;
  status: string;
  registrationType: string;
  onboardingProgress: number;
  assignedStaff?: string;
  insuranceProvider?: string;
  emergencyContact: string;
  bloodGroup?: string;
  lastActivity: string;
}

interface PatientOnboardingTableProps {
  registrations: PatientRegistration[];
}

const PatientOnboardingTable = ({ registrations }: PatientOnboardingTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'incomplete': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'walk-in': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'online': return 'bg-green-100 text-green-800 border-green-200';
      case 'referral': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="font-semibold text-gray-700">Patient</TableHead>
            <TableHead className="font-semibold text-gray-700">Registration</TableHead>
            <TableHead className="font-semibold text-gray-700">Contact</TableHead>
            <TableHead className="font-semibold text-gray-700">Onboarding Progress</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map((patient, index) => (
            <TableRow key={patient.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
              <TableCell className="py-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white font-semibold">
                      {getInitials(patient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{patient.name}</div>
                    <div className="text-sm text-gray-500">ID: {patient.id}</div>
                    {patient.bloodGroup && (
                      <div className="text-xs text-gray-400">Blood: {patient.bloodGroup}</div>
                    )}
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <Badge className={`${getTypeColor(patient.registrationType)} border font-medium`}>
                    {patient.registrationType}
                  </Badge>
                  <div className="text-sm text-gray-600">Registered: {patient.registrationDate}</div>
                  {patient.assignedStaff && (
                    <div className="text-xs text-gray-500">Staff: {patient.assignedStaff}</div>
                  )}
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">{patient.phone}</span>
                  </div>
                  <div className="text-xs text-gray-500">Emergency: {patient.emergencyContact}</div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{patient.onboardingProgress}%</span>
                  </div>
                  <Progress value={patient.onboardingProgress} className="h-2" />
                  <div className="text-xs text-gray-500">Last activity: {patient.lastActivity}</div>
                </div>
              </TableCell>
              
              <TableCell>
                <Badge className={`${getStatusColor(patient.status)} border font-medium flex items-center gap-1 w-fit`}>
                  <User className="h-3 w-3" />
                  {patient.status}
                </Badge>
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
                      <span className="text-blue-600">View Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-green-50 focus:bg-green-50">
                      <Edit className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-green-600">Edit Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-purple-50 focus:bg-purple-50">
                      <Phone className="h-4 w-4 mr-2 text-purple-600" />
                      <span className="text-purple-600">Contact Patient</span>
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

export default PatientOnboardingTable;
