
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  Heart, 
  Bell, 
  Settings, 
  Stethoscope,
  Clock,
  FileText,
  AlertTriangle,
  TrendingUp,
  Phone,
  Video,
  MessageSquare,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);

  const todayStats = [
    { label: "Today's Patients", value: "24", change: "+3 from yesterday", icon: <Users className="h-5 w-5" /> },
    { label: "Appointments", value: "18", change: "2 pending", icon: <Calendar className="h-5 w-5" /> },
    { label: "Urgent Cases", value: "3", change: "Requires attention", icon: <AlertTriangle className="h-5 w-5" /> },
    { label: "Consultations", value: "12", change: "6 completed", icon: <Stethoscope className="h-5 w-5" /> }
  ];

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

  const recentPatients = [
    {
      id: 1,
      name: "Alice Brown",
      age: 45,
      lastVisit: "2 days ago",
      condition: "Recovered",
      urgency: "low"
    },
    {
      id: 2,
      name: "David Miller",
      age: 62,
      lastVisit: "1 week ago",
      condition: "Monitoring",
      urgency: "medium"
    },
    {
      id: 3,
      name: "Lisa Anderson",
      age: 38,
      lastVisit: "3 days ago",
      condition: "Critical",
      urgency: "high"
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Stethoscope className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">MediFlow Doctor</span>
              </Link>
              <Badge variant="secondary">Doctor Portal</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Telemedicine
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/api/placeholder/32/32" alt="Dr. Profile" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Good Morning, Dr. Smith</h1>
          <p className="text-gray-600">You have 18 appointments today and 3 urgent cases requiring attention.</p>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {todayStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.label}
                </CardTitle>
                <div className="text-blue-600">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 font-medium">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Management</CardTitle>
                <CardDescription>Manage your daily appointments and scheduling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Appointment Management</h3>
                  <p className="text-gray-600 mb-4">Schedule, reschedule, and manage patient appointments</p>
                  <Button>Manage Appointments</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>Access patient records and medical history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPatients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{patient.name}</div>
                          <div className="text-sm text-gray-600">Age: {patient.age} • Last visit: {patient.lastVisit}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getUrgencyColor(patient.urgency)}>
                          {patient.condition}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          View Records
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Management</CardTitle>
                <CardDescription>Manage your daily tasks and reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className={`p-4 border rounded-lg ${getPriorityColor(task.priority)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{task.task}</div>
                          <div className="text-sm opacity-75 mt-1">{task.time}</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Complete</Button>
                          <Button size="sm" variant="outline">Defer</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Reports & Analytics</CardTitle>
                <CardDescription>View patient reports and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Patients Treated</h4>
                    <p className="text-3xl font-bold text-blue-600">156</p>
                    <p className="text-sm text-blue-700">This Month</p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Success Rate</h4>
                    <p className="text-3xl font-bold text-green-600">94%</p>
                    <p className="text-sm text-green-700">Patient Outcomes</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Avg. Consultation</h4>
                    <p className="text-3xl font-bold text-purple-600">28min</p>
                    <p className="text-sm text-purple-700">Per Patient</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;
