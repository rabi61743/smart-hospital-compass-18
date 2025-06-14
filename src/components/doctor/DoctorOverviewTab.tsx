
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  Phone,
  Video,
  FileText,
  Users,
  ClipboardList
} from "lucide-react";

const DoctorOverviewTab = () => {
  const upcomingAppointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      time: "09:30 AM",
      type: "Follow-up",
      status: "confirmed",
      duration: "30 min",
      condition: "Hypertension"
    },
    {
      id: 2,
      patientName: "Michael Chen",
      time: "10:15 AM",
      type: "New Patient",
      status: "confirmed",
      duration: "45 min",
      condition: "Chest Pain"
    },
    {
      id: 3,
      patientName: "Emily Davis",
      time: "11:00 AM",
      type: "Consultation",
      status: "pending",
      duration: "30 min",
      condition: "Diabetes Check"
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      time: "02:00 PM",
      type: "Surgery Consult",
      status: "confirmed",
      duration: "60 min",
      condition: "Cardiac Surgery"
    }
  ];

  const pendingTasks = [
    { id: 1, task: "Review lab results for John Doe", priority: "high", time: "Due in 2 hours" },
    { id: 2, task: "Sign prescription for Maria Garcia", priority: "medium", time: "Due today" },
    { id: 3, task: "Complete discharge summary for Tom Wilson", priority: "low", time: "Due tomorrow" },
    { id: 4, task: "Call patient about test results", priority: "high", time: "Overdue" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Today's Schedule */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Today's Schedule
          </CardTitle>
          <CardDescription>Your appointments for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold">{appointment.patientName}</span>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <Badge variant="outline">{appointment.type}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {appointment.time} ({appointment.duration})
                    </span>
                    <span className="ml-5">{appointment.condition}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions & Pending Tasks */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Add New Patient
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Write Prescription
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ClipboardList className="h-4 w-4 mr-2" />
              View Lab Results
            </Button>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.slice(0, 4).map((task) => (
                <div key={task.id} className={`p-3 border rounded-lg ${getPriorityColor(task.priority)}`}>
                  <div className="font-medium text-sm">{task.task}</div>
                  <div className="text-xs mt-1 opacity-75">{task.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorOverviewTab;
