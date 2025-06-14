
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, Clock, Pill, Calendar, CheckCircle } from "lucide-react";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { HealthAlert, MedicationReminder, FollowUpNotification } from "./types";

interface AlertsOverviewProps {
  alerts: HealthAlert[];
  medicationReminders: MedicationReminder[];
  followUpNotifications: FollowUpNotification[];
}

const AlertsOverview = ({ alerts, medicationReminders, followUpNotifications }: AlertsOverviewProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isPast(date)) return 'Overdue';
    return format(date, 'MMM dd');
  };

  const todaysMedications = medicationReminders.filter(med => {
    const nextDue = new Date(med.nextDue);
    return isToday(nextDue) && med.isActive;
  });

  const upcomingFollowUps = followUpNotifications.filter(notification => 
    !notification.isCompleted && 
    new Date(notification.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="space-y-6">
      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Health Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      <h4 className="font-medium">{alert.title}</h4>
                      {!alert.isRead && (
                        <Badge variant="secondary" className="text-xs">New</Badge>
                      )}
                    </div>
                    <p className="text-sm opacity-90">{alert.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {format(new Date(alert.timestamp), "MMM dd, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                  {alert.actionRequired && (
                    <Button size="sm" variant="outline">
                      Take Action
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Medications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Today's Medications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysMedications.map((medication) => {
                const nextDue = new Date(medication.nextDue);
                const isOverdue = isPast(nextDue);
                
                return (
                  <div key={medication.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">{medication.medicationName}</p>
                      <p className="text-sm text-gray-600">{medication.dosage}</p>
                      <p className="text-xs text-gray-500">
                        Due: {format(nextDue, "h:mm a")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isOverdue && (
                        <Badge variant="destructive" className="text-xs">
                          Overdue
                        </Badge>
                      )}
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Taken
                      </Button>
                    </div>
                  </div>
                );
              })}
              {todaysMedications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Pill className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No medications scheduled for today</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Follow-ups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Follow-ups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingFollowUps.slice(0, 4).map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <Badge className={getPriorityColor(notification.priority)}>
                        {notification.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{notification.description}</p>
                    <p className="text-xs text-gray-500">
                      Due: {getDateLabel(notification.dueDate)}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Schedule
                  </Button>
                </div>
              ))}
              {upcomingFollowUps.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No pending follow-ups</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlertsOverview;
