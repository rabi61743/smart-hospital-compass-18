
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, Settings, Plus, Edit } from "lucide-react";
import ShiftPatternsTab from './ShiftPatternsTab';
import WorkSchedulesTab from './WorkSchedulesTab';
import FlexibleWorkingTab from './FlexibleWorkingTab';
import ScheduleCalendarTab from './ScheduleCalendarTab';

const ShiftScheduleManagement = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedWeek, setSelectedWeek] = useState('current');

  const scheduleStats = [
    {
      title: "Active Schedules",
      value: "45",
      total: "50",
      icon: <Calendar className="h-4 w-4" />,
      color: "text-blue-600"
    },
    {
      title: "Shift Patterns",
      value: "12",
      unit: "patterns",
      icon: <Clock className="h-4 w-4" />,
      color: "text-green-600"
    },
    {
      title: "Flexible Workers",
      value: "28",
      total: "124",
      icon: <Users className="h-4 w-4" />,
      color: "text-purple-600"
    },
    {
      title: "Schedule Conflicts",
      value: "3",
      unit: "issues",
      icon: <Settings className="h-4 w-4" />,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {scheduleStats.map((stat, index) => (
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

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
            <SelectItem value="general">General Medicine</SelectItem>
            <SelectItem value="laboratory">Laboratory</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedWeek} onValueChange={setSelectedWeek}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Week</SelectItem>
            <SelectItem value="next">Next Week</SelectItem>
            <SelectItem value="previous">Previous Week</SelectItem>
          </SelectContent>
        </Select>

        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Schedule
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Shift & Schedule Management
          </CardTitle>
          <CardDescription>Manage work schedules, shift patterns, and flexible working arrangements</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="schedules" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="schedules">Work Schedules</TabsTrigger>
              <TabsTrigger value="patterns">Shift Patterns</TabsTrigger>
              <TabsTrigger value="flexible">Flexible Working</TabsTrigger>
              <TabsTrigger value="calendar">Schedule Calendar</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="schedules">
              <WorkSchedulesTab department={selectedDepartment} week={selectedWeek} />
            </TabsContent>

            <TabsContent value="patterns">
              <ShiftPatternsTab />
            </TabsContent>

            <TabsContent value="flexible">
              <FlexibleWorkingTab />
            </TabsContent>

            <TabsContent value="calendar">
              <ScheduleCalendarTab department={selectedDepartment} week={selectedWeek} />
            </TabsContent>

            <TabsContent value="reports">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Schedule reports will be implemented here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShiftScheduleManagement;
