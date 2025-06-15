
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Shield, Filter } from "lucide-react";

const UserStatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-blue-700">Total Users</CardTitle>
          <div className="p-2 bg-blue-200 rounded-lg">
            <Users className="h-5 w-5 text-blue-700" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-800">1,247</div>
          <p className="text-sm text-blue-600 mt-1">+12 this week</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-emerald-700">Active Sessions</CardTitle>
          <div className="p-2 bg-emerald-200 rounded-lg">
            <Shield className="h-5 w-5 text-emerald-700" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-800">847</div>
          <p className="text-sm text-emerald-600 mt-1">Currently online</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-purple-700">New Registrations</CardTitle>
          <div className="p-2 bg-purple-200 rounded-lg">
            <UserPlus className="h-5 w-5 text-purple-700" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-800">23</div>
          <p className="text-sm text-purple-600 mt-1">Last 7 days</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-amber-700">Pending Approvals</CardTitle>
          <div className="p-2 bg-amber-200 rounded-lg">
            <Filter className="h-5 w-5 text-amber-700" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-800">8</div>
          <p className="text-sm text-amber-600 mt-1">Require action</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatsCards;
