
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Clock, Shield } from "lucide-react";

interface StaffMember {
  id: string;
  role: string;
  status: string;
  employeeType: string;
}

interface StaffStatsCardsProps {
  staffMembers: StaffMember[];
}

const StaffStatsCards = ({ staffMembers }: StaffStatsCardsProps) => {
  const totalStaff = staffMembers.length;
  const activeStaff = staffMembers.filter(s => s.status === 'Active').length;
  const doctors = staffMembers.filter(s => s.role === 'Doctor').length;
  const nurses = staffMembers.filter(s => s.role === 'Nurse').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">Total Staff</CardTitle>
          <Users className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-800">{totalStaff}</div>
          <p className="text-xs text-blue-600 mt-1">All employees</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Active Staff</CardTitle>
          <UserCheck className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-800">{activeStaff}</div>
          <p className="text-xs text-green-600 mt-1">Currently working</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">Doctors</CardTitle>
          <Shield className="h-5 w-5 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-800">{doctors}</div>
          <p className="text-xs text-purple-600 mt-1">Medical professionals</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-teal-700">Nurses</CardTitle>
          <Clock className="h-5 w-5 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-teal-800">{nurses}</div>
          <p className="text-xs text-teal-600 mt-1">Nursing staff</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffStatsCards;
