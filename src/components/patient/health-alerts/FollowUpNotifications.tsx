
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, TestTube, Syringe, CheckCircle, Bell } from "lucide-react";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { FollowUpNotification } from "./types";

interface FollowUpNotificationsProps {
  notifications: FollowUpNotification[];
}

const FollowUpNotifications = ({ notifications }: FollowUpNotificationsProps) => {
  const { toast } = useToast();

  const handleMarkCompleted = (notificationId: string) => {
    console.log('Marking follow-up as completed:', notificationId);
    toast({
      title: "Follow-up Completed",
      description: "The follow-up has been marked as completed.",
    });
  };

  const handleScheduleAppointment = (notificationId: string) => {
    console.log('Scheduling appointment for:', notificationId);
    toast({
      title: "Redirecting to Booking",
      description: "Taking you to the appointment booking page.",
    });
  };

  const handleSetReminder = (notificationId: string) => {
    console.log('Setting reminder for:', notificationId);
    toast({
      title: "Reminder Set",
      description: "You'll be reminded about this follow-up.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="h-5 w-5" />;
      case 'test': return <TestTube className="h-5 w-5" />;
      case 'checkup': return <User className="h-5 w-5" />;
      case 'vaccination': return <Syringe className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
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
    return format(date, 'MMM dd, yyyy');
  };

  const getDateStatus = (dateString: string) => {
    const date = new Date(dateString);
    if (isPast(date)) return 'overdue';
    if (isToday(date)) return 'today';
    if (isTomorrow(date)) return 'tomorrow';
    return 'upcoming';
  };

  // Group notifications by status
  const overdueNotifications = notifications.filter(n => !n.isCompleted && isPast(new Date(n.dueDate)));
  const todayNotifications = notifications.filter(n => !n.isCompleted && isToday(new Date(n.dueDate)));
  const upcomingNotifications = notifications.filter(n => !n.isCompleted && !isPast(new Date(n.dueDate)) && !isToday(new Date(n.dueDate)));
  const completedNotifications = notifications.filter(n => n.isCompleted);

  const renderNotificationCard = (notification: FollowUpNotification) => {
    const dateStatus = getDateStatus(notification.dueDate);
    
    return (
      <Card key={notification.id} className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {getTypeIcon(notification.type)}
                <h3 className="text-lg font-semibold">{notification.title}</h3>
                <Badge className={getPriorityColor(notification.priority)}>
                  {notification.priority}
                </Badge>
                {dateStatus === 'overdue' && (
                  <Badge variant="destructive">Overdue</Badge>
                )}
                {dateStatus === 'today' && (
                  <Badge className="bg-blue-100 text-blue-800">Due Today</Badge>
                )}
              </div>
              
              <p className="text-gray-600 mb-3">{notification.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Due Date</p>
                  <p className="font-medium">{getDateLabel(notification.dueDate)}</p>
                </div>
                {notification.doctorName && (
                  <div>
                    <p className="text-muted-foreground">Doctor</p>
                    <p className="font-medium">{notification.doctorName}</p>
                  </div>
                )}
                {notification.department && (
                  <div>
                    <p className="text-muted-foreground">Department</p>
                    <p className="font-medium">{notification.department}</p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground">Reminder</p>
                  <p className="font-medium">{notification.reminderSet ? 'Set' : 'Not set'}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {!notification.isCompleted && (
                <>
                  {notification.type === 'appointment' && (
                    <Button size="sm" onClick={() => handleScheduleAppointment(notification.id)}>
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleMarkCompleted(notification.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark Done
                  </Button>
                  
                  {!notification.reminderSet && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSetReminder(notification.id)}
                    >
                      <Bell className="h-4 w-4 mr-1" />
                      Set Reminder
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Overdue */}
      {overdueNotifications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Overdue ({overdueNotifications.length})
          </h3>
          <div className="space-y-4">
            {overdueNotifications.map(renderNotificationCard)}
          </div>
        </div>
      )}

      {/* Due Today */}
      {todayNotifications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Due Today ({todayNotifications.length})
          </h3>
          <div className="space-y-4">
            {todayNotifications.map(renderNotificationCard)}
          </div>
        </div>
      )}

      {/* Upcoming */}
      {upcomingNotifications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming ({upcomingNotifications.length})
          </h3>
          <div className="space-y-4">
            {upcomingNotifications.map(renderNotificationCard)}
          </div>
        </div>
      )}

      {/* Completed */}
      {completedNotifications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Completed ({completedNotifications.length})
          </h3>
          <div className="space-y-4">
            {completedNotifications.slice(0, 3).map(renderNotificationCard)}
          </div>
        </div>
      )}

      {/* Empty State */}
      {notifications.filter(n => !n.isCompleted).length === 0 && (
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h3>
              <p className="text-gray-600">You have no pending follow-up notifications.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FollowUpNotifications;
