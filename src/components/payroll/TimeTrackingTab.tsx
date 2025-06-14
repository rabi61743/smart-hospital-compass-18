
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calendar, TrendingUp, Users } from "lucide-react";
import ClockInOutCard from './ClockInOutCard';
import AttendanceOverview from './AttendanceOverview';
import ShiftManagement from './ShiftManagement';
import OvertimeTracking from './OvertimeTracking';
import AttendanceReports from './AttendanceReports';

const TimeTrackingTab = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeTrackingStats = [
    {
      title: "Present Today",
      value: "89",
      total: "124",
      icon: <Users className="h-4 w-4" />,
      color: "text-green-600"
    },
    {
      title: "Late Arrivals",
      value: "12",
      total: "89",
      icon: <Clock className="h-4 w-4" />,
      color: "text-orange-600"
    },
    {
      title: "Overtime Hours",
      value: "156.5",
      unit: "hrs",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "text-blue-600"
    },
    {
      title: "Pending Approvals",
      value: "23",
      unit: "requests",
      icon: <Calendar className="h-4 w-4" />,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {timeTrackingStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline gap-1">
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    {stat.total && <span className="text-sm text-muted-foreground">/{stat.total}</span>}
                    {stat.unit && <span className="text-sm text-muted-foreground">{stat.unit}</span>}
                  </div>
                </div>
                <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Clock In/Out Section */}
      <ClockInOutCard currentTime={currentTime} />

      {/* Main Content Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Tracking & Attendance Management
          </CardTitle>
          <CardDescription>Manage employee attendance, shifts, and overtime</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="shifts">Shift Management</TabsTrigger>
              <TabsTrigger value="overtime">Overtime</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <AttendanceOverview />
            </TabsContent>

            <TabsContent value="shifts">
              <ShiftManagement />
            </TabsContent>

            <TabsContent value="overtime">
              <OvertimeTracking />
            </TabsContent>

            <TabsContent value="reports">
              <AttendanceReports />
            </TabsContent>

            <TabsContent value="settings">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Time tracking settings will be implemented here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTrackingTab;
