
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Calendar, 
  Stethoscope,
  AlertTriangle
} from "lucide-react";

const DoctorStatsCards = () => {
  const todayStats = [
    { label: "Today's Patients", value: "24", change: "+3 from yesterday", icon: <Users className="h-5 w-5" /> },
    { label: "Appointments", value: "18", change: "2 pending", icon: <Calendar className="h-5 w-5" /> },
    { label: "Urgent Cases", value: "3", change: "Requires attention", icon: <AlertTriangle className="h-5 w-5" /> },
    { label: "Consultations", value: "12", change: "6 completed", icon: <Stethoscope className="h-5 w-5" /> }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {todayStats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.label}
            </CardTitle>
            <div className="text-blue-600">
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-500 font-medium">
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DoctorStatsCards;
