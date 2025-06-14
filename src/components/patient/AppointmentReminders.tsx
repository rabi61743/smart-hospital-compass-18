
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import NotificationSettings from './reminders/NotificationSettings';
import ScheduledReminders from './reminders/ScheduledReminders';
import { ReminderSettings, ScheduledReminder } from './reminders/types';

const AppointmentReminders = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<ReminderSettings>({
    smsEnabled: true,
    emailEnabled: true,
    timing: '24',
    phoneNumber: '+91 9876543210',
    email: 'john.doe@example.com'
  });

  const [scheduledReminders] = useState<ScheduledReminder[]>([
    {
      id: '1',
      appointmentId: 'apt1',
      doctorName: 'Dr. Sarah Johnson',
      appointmentDate: '2024-12-18',
      appointmentTime: '10:30 AM',
      reminderTime: '2024-12-17 10:30 AM',
      type: 'sms',
      status: 'scheduled'
    },
    {
      id: '2',
      appointmentId: 'apt1',
      doctorName: 'Dr. Sarah Johnson',
      appointmentDate: '2024-12-18',
      appointmentTime: '10:30 AM',
      reminderTime: '2024-12-17 10:30 AM',
      type: 'email',
      status: 'scheduled'
    },
    {
      id: '3',
      appointmentId: 'apt2',
      doctorName: 'Dr. Michael Chen',
      appointmentDate: '2024-12-20',
      appointmentTime: '2:15 PM',
      reminderTime: '2024-12-19 2:15 PM',
      type: 'sms',
      status: 'sent'
    }
  ]);

  const handleSettingChange = (key: keyof ReminderSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving reminder settings:', settings);
    toast({
      title: "Settings Saved",
      description: "Your reminder preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="settings">Reminder Settings</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reminders</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <NotificationSettings
            settings={settings}
            onSettingChange={handleSettingChange}
            onSaveSettings={handleSaveSettings}
          />
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <ScheduledReminders reminders={scheduledReminders} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentReminders;
