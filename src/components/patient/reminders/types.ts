
export interface ReminderSettings {
  smsEnabled: boolean;
  emailEnabled: boolean;
  timing: string;
  phoneNumber: string;
  email: string;
}

export interface ScheduledReminder {
  id: string;
  appointmentId: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  reminderTime: string;
  type: 'sms' | 'email';
  status: 'scheduled' | 'sent' | 'failed';
}
