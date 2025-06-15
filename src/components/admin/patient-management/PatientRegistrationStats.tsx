
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Clock, AlertCircle } from "lucide-react";

interface PatientRegistration {
  id: string;
  status: string;
  onboardingProgress: number;
  registrationType: string;
}

interface PatientRegistrationStatsProps {
  registrations: PatientRegistration[];
}

const PatientRegistrationStats = ({ registrations }: PatientRegistrationStatsProps) => {
  const totalRegistrations = registrations.length;
  const completedRegistrations = registrations.filter(r => r.status === 'completed').length;
  const pendingRegistrations = registrations.filter(r => r.status === 'pending').length;
  const inProgressRegistrations = registrations.filter(r => r.status === 'in-progress').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">Total Registrations</CardTitle>
          <Users className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-800">{totalRegistrations}</div>
          <p className="text-xs text-blue-600 mt-1">All patient accounts</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Completed</CardTitle>
          <UserCheck className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-800">{completedRegistrations}</div>
          <p className="text-xs text-green-600 mt-1">Fully onboarded</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-yellow-700">In Progress</CardTitle>
          <Clock className="h-5 w-5 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-800">{inProgressRegistrations}</div>
          <p className="text-xs text-yellow-600 mt-1">Currently onboarding</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-700">Pending</CardTitle>
          <AlertCircle className="h-5 w-5 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-800">{pendingRegistrations}</div>
          <p className="text-xs text-red-600 mt-1">Requires attention</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientRegistrationStats;
