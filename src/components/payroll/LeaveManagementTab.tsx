
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, CheckCircle, Users } from "lucide-react";
import LeaveRequestsTab from './LeaveRequestsTab';
import LeaveApprovalsTab from './LeaveApprovalsTab';
import LeaveBalancesTab from './LeaveBalancesTab';
import LeaveCalendarTab from './LeaveCalendarTab';
import LeavePoliciesTab from './LeavePoliciesTab';

const LeaveManagementTab = () => {
  const leaveStats = [
    {
      title: "Pending Requests",
      value: "23",
      total: "45",
      icon: <Clock className="h-4 w-4" />,
      color: "text-orange-600"
    },
    {
      title: "Approved This Month",
      value: "67",
      unit: "requests",
      icon: <CheckCircle className="h-4 w-4" />,
      color: "text-green-600"
    },
    {
      title: "Out Today",
      value: "12",
      total: "124",
      icon: <Users className="h-4 w-4" />,
      color: "text-blue-600"
    },
    {
      title: "Accrued This Year",
      value: "1,245",
      unit: "days",
      icon: <Calendar className="h-4 w-4" />,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {leaveStats.map((stat, index) => (
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

      {/* Main Content Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Leave Management System
          </CardTitle>
          <CardDescription>Manage employee leave requests, approvals, and tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="requests" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="requests">Leave Requests</TabsTrigger>
              <TabsTrigger value="approvals">Approvals</TabsTrigger>
              <TabsTrigger value="balances">Balances</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
            </TabsList>

            <TabsContent value="requests">
              <LeaveRequestsTab />
            </TabsContent>

            <TabsContent value="approvals">
              <LeaveApprovalsTab />
            </TabsContent>

            <TabsContent value="balances">
              <LeaveBalancesTab />
            </TabsContent>

            <TabsContent value="calendar">
              <LeaveCalendarTab />
            </TabsContent>

            <TabsContent value="policies">
              <LeavePoliciesTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveManagementTab;
