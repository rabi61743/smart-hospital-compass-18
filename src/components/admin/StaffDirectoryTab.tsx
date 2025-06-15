
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StaffFilters from './staff-directory/StaffFilters';
import StaffTable from './staff-directory/StaffTable';
import AddStaffDialog from './staff-directory/AddStaffDialog';
import StaffProfileDialog from './staff-directory/StaffProfileDialog';
import StaffStatsCards from './staff-directory/StaffStatsCards';

const StaffDirectoryTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const { toast } = useToast();

  const staffMembers = [
    {
      id: 'STF001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      phone: '+91 98765 43210',
      role: 'Doctor',
      specialization: 'Cardiology',
      department: 'Cardiology',
      status: 'Active',
      employeeType: 'Full-time',
      joinDate: '2020-03-15',
      licenseNumber: 'MED123456',
      yearsExperience: 12,
      avatar: 'SJ',
      lastLogin: '2 hours ago'
    },
    {
      id: 'STF002',
      name: 'Nurse Mary Wilson',
      email: 'mary.wilson@hospital.com',
      phone: '+91 98765 43211',
      role: 'Nurse',
      specialization: 'Critical Care',
      department: 'ICU',
      status: 'Active',
      employeeType: 'Full-time',
      joinDate: '2019-07-22',
      licenseNumber: 'NUR789012',
      yearsExperience: 8,
      avatar: 'MW',
      lastLogin: '1 hour ago'
    },
    {
      id: 'STF003',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@hospital.com',
      phone: '+91 98765 43212',
      role: 'Doctor',
      specialization: 'Emergency Medicine',
      department: 'Emergency',
      status: 'Active',
      employeeType: 'Full-time',
      joinDate: '2021-01-10',
      licenseNumber: 'MED345678',
      yearsExperience: 15,
      avatar: 'MC',
      lastLogin: '30 minutes ago'
    },
    {
      id: 'STF004',
      name: 'Admin Lisa Rodriguez',
      email: 'lisa.rodriguez@hospital.com',
      phone: '+91 98765 43213',
      role: 'Admin Staff',
      specialization: 'Hospital Administration',
      department: 'Administration',
      status: 'Active',
      employeeType: 'Full-time',
      joinDate: '2022-05-18',
      licenseNumber: 'ADM567890',
      yearsExperience: 6,
      avatar: 'LR',
      lastLogin: '45 minutes ago'
    },
    {
      id: 'STF005',
      name: 'Nurse David Kim',
      email: 'david.kim@hospital.com',
      phone: '+91 98765 43214',
      role: 'Nurse',
      specialization: 'Pediatrics',
      department: 'Pediatrics',
      status: 'On Leave',
      employeeType: 'Part-time',
      joinDate: '2023-02-14',
      licenseNumber: 'NUR123789',
      yearsExperience: 4,
      avatar: 'DK',
      lastLogin: '3 days ago'
    }
  ];

  const departments = ['all', 'Cardiology', 'ICU', 'Emergency', 'Administration', 'Pediatrics', 'Surgery', 'Pharmacy'];
  const roles = ['all', 'Doctor', 'Nurse', 'Admin Staff', 'Technician'];
  const statuses = ['all', 'Active', 'On Leave', 'Inactive'];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || staff.department === departmentFilter;
    const matchesRole = roleFilter === 'all' || staff.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || staff.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const handleViewProfile = (staffId: string) => {
    setSelectedStaffId(staffId);
    setIsProfileOpen(true);
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Staff directory data is being exported to CSV.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Staff Statistics */}
      <StaffStatsCards staffMembers={staffMembers} />

      {/* Main Staff Directory */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
                Staff Directory Management
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 text-base">
                Comprehensive management of hospital staff including doctors, nurses, and administrative personnel
              </CardDescription>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleExport} className="border-gray-300 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export Directory
              </Button>
              <Button onClick={() => setIsAddStaffOpen(true)} className="bg-blue-600 hover:bg-blue-700 shadow-md">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Staff Member
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Filters */}
          <StaffFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            departments={departments}
            roles={roles}
            statuses={statuses}
            totalCount={staffMembers.length}
            filteredCount={filteredStaff.length}
          />

          {/* Staff Table */}
          <StaffTable
            staffMembers={filteredStaff}
            onViewProfile={handleViewProfile}
          />
        </CardContent>
      </Card>

      {/* Add Staff Dialog */}
      <AddStaffDialog
        open={isAddStaffOpen}
        onOpenChange={setIsAddStaffOpen}
        departments={departments.slice(1)}
        roles={roles.slice(1)}
      />

      {/* Staff Profile Dialog */}
      <StaffProfileDialog
        open={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        staffId={selectedStaffId}
        staffData={staffMembers.find(s => s.id === selectedStaffId)}
      />
    </div>
  );
};

export default StaffDirectoryTab;
