
export interface MedicationReminder {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  isActive: boolean;
  lastTaken?: string;
  nextDue: string;
  streak: number;
  adherenceRate: number;
}

export interface FollowUpNotification {
  id: string;
  type: 'appointment' | 'test' | 'checkup' | 'vaccination';
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  doctorName?: string;
  department?: string;
  isCompleted: boolean;
  reminderSet: boolean;
}

export interface HealthAlert {
  id: string;
  type: 'medication' | 'followup' | 'vitals' | 'lab';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
}
