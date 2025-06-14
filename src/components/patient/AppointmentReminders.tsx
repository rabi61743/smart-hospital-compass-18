
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Mail, Phone, Settings, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReminderSettings {
  smsEnabled: boolean;
  emailEnabled: boolean;
  timing: string;
  phoneNumber: string;
  email: string;
}

interface ScheduledReminder {
  id: string;
  appointmentId: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  reminderTime: string;
  type: 'sms' | 'email';
  status: 'scheduled' | 'sent' | 'failed';
}

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'sent': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <Bell className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="settings">Reminder Settings</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reminders</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* SMS Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-green-600" />
                    <Label htmlFor="sms-enabled" className="text-base font-medium">
                      SMS Notifications
                    </Label>
                  </div>
                  <Switch
                    id="sms-enabled"
                    checked={settings.smsEnabled}
                    onCheckedChange={(checked) => handleSettingChange('smsEnabled', checked)}
                  />
                </div>
                {settings.smsEnabled && (
                  <div className="ml-7 space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={settings.phoneNumber}
                      onChange={(e) => handleSettingChange('phoneNumber', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                )}
              </div>

              {/* Email Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <Label htmlFor="email-enabled" className="text-base font-medium">
                      Email Notifications
                    </Label>
                  </div>
                  <Switch
                    id="email-enabled"
                    checked={settings.emailEnabled}
                    onCheckedChange={(checked) => handleSettingChange('emailEnabled', checked)}
                  />
                </div>
                {settings.emailEnabled && (
                  <div className="ml-7 space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleSettingChange('email', e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>
                )}
              </div>

              {/* Timing Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <Label className="text-base font-medium">Reminder Timing</Label>
                </div>
                <div className="ml-7 space-y-2">
                  <Label htmlFor="timing">Send reminder before appointment</Label>
                  <Select value={settings.timing} onValueChange={(value) => handleSettingChange('timing', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour before</SelectItem>
                      <SelectItem value="4">4 hours before</SelectItem>
                      <SelectItem value="24">24 hours before</SelectItem>
                      <SelectItem value="48">48 hours before</SelectItem>
                      <SelectItem value="72">72 hours before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveSettings} className="flex-1">
                  Save Settings
                </Button>
                <Button variant="outline">Test Notifications</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Scheduled Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReminders.map((reminder) => (
                  <div key={reminder.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{reminder.doctorName}</h4>
                        <p className="text-sm text-gray-600">
                          {reminder.appointmentDate} at {reminder.appointmentTime}
                        </p>
                        <p className="text-sm text-gray-500">
                          Reminder: {reminder.reminderTime}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {reminder.type === 'sms' ? <Phone className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                          {reminder.type.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(reminder.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(reminder.status)}
                            {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
                          </div>
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentReminders;
