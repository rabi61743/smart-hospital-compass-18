
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, CheckCircle, Clock, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MedicationReminders from "./health-alerts/MedicationReminders";
import FollowUpNotifications from "./health-alerts/FollowUpNotifications";
import AlertsOverview from "./health-alerts/AlertsOverview";
import { MedicationReminder, FollowUpNotification, HealthAlert } from "./health-alerts/types";

const HealthAlerts = () => {
  const { toast } = useToast();

  // Mock data for medication reminders
  const [medicationReminders] = useState<MedicationReminder[]>([
    {
      id: 'med1',
      medicationName: 'Amlodipine',
      dosage: '5mg',
      frequency: 'Once daily',
      times: ['08:00'],
      startDate: '2024-01-15',
      isActive: true,
      lastTaken: '2024-12-16 08:15',
      nextDue: '2024-12-17 08:00',
      streak: 30,
      adherenceRate: 96
    },
    {
      id: 'med2',
      medicationName: 'Metoprolol',
      dosage: '25mg',
      frequency: 'Twice daily',
      times: ['08:00', '20:00'],
      startDate: '2024-01-15',
      isActive: true,
      lastTaken: '2024-12-16 20:10',
      nextDue: '2024-12-17 08:00',
      streak: 45,
      adherenceRate: 92
    }
  ]);

  // Mock data for follow-up notifications
  const [followUpNotifications] = useState<FollowUpNotification[]>([
    {
      id: 'follow1',
      type: 'appointment',
      title: 'Cardiology Follow-up',
      description: 'Schedule follow-up appointment with Dr. Sarah Johnson',
      dueDate: '2024-12-20',
      priority: 'high',
      doctorName: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      isCompleted: false,
      reminderSet: true
    },
    {
      id: 'follow2',
      type: 'test',
      title: 'Blood Pressure Check',
      description: 'Monitor blood pressure weekly as recommended',
      dueDate: '2024-12-18',
      priority: 'medium',
      isCompleted: false,
      reminderSet: true
    },
    {
      id: 'follow3',
      type: 'vaccination',
      title: 'Annual Flu Shot',
      description: 'Get annual influenza vaccination',
      dueDate: '2024-12-25',
      priority: 'medium',
      isCompleted: false,
      reminderSet: false
    }
  ]);

  // Mock data for health alerts
  const [healthAlerts] = useState<HealthAlert[]>([
    {
      id: 'alert1',
      type: 'medication',
      title: 'Missed Medication',
      message: 'You missed your evening Metoprolol dose yesterday',
      severity: 'warning',
      timestamp: '2024-12-16 21:00',
      isRead: false,
      actionRequired: true
    },
    {
      id: 'alert2',
      type: 'followup',
      title: 'Appointment Reminder',
      message: 'You have a cardiology appointment in 2 days',
      severity: 'info',
      timestamp: '2024-12-16 09:00',
      isRead: true,
      actionRequired: false
    }
  ]);

  const unreadAlertsCount = healthAlerts.filter(alert => !alert.isRead).length;
  const overdueMedications = medicationReminders.filter(med => 
    new Date(med.nextDue) < new Date() && med.isActive
  ).length;
  const pendingFollowUps = followUpNotifications.filter(notification => 
    !notification.isCompleted && new Date(notification.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">{unreadAlertsCount}</p>
              </div>
              <Bell className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue Medications</p>
                <p className="text-2xl font-bold">{overdueMedications}</p>
              </div>
              <Pill className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Follow-ups</p>
                <p className="text-2xl font-bold">{pendingFollowUps}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Adherence Rate</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Overview
            {unreadAlertsCount > 0 && (
              <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                {unreadAlertsCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Medications
            {overdueMedications > 0 && (
              <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                {overdueMedications}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="followups" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Follow-ups
            {pendingFollowUps > 0 && (
              <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                {pendingFollowUps}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AlertsOverview 
            alerts={healthAlerts}
            medicationReminders={medicationReminders}
            followUpNotifications={followUpNotifications}
          />
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          <MedicationReminders reminders={medicationReminders} />
        </TabsContent>

        <TabsContent value="followups" className="space-y-6">
          <FollowUpNotifications notifications={followUpNotifications} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Alert Preferences</h3>
                <p className="text-gray-600 mb-4">Configure your notification preferences and alert settings</p>
                <Button>Configure Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthAlerts;
