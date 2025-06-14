
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, Phone, Clock, CheckCircle } from "lucide-react";
import { ScheduledReminder } from './types';

interface ScheduledRemindersProps {
  reminders: ScheduledReminder[];
}

const ScheduledReminders = ({ reminders }: ScheduledRemindersProps) => {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Scheduled Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reminders.map((reminder) => (
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
  );
};

export default ScheduledReminders;
