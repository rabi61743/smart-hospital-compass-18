
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Settings, 
  Activity,
  Stethoscope,
  Clock,
  Bell,
  Phone,
  Video,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  UserCheck,
  Heart,
  ClipboardList,
  Hospital,
  User
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PatientManagement from "@/components/doctor/PatientManagement";
import AppointmentManagement from "@/components/doctor/appointment/AppointmentManagement";
import DoctorWelcome from "@/components/doctor/DoctorWelcome";
import DoctorStatsCards from "@/components/doctor/DoctorStatsCards";
import DoctorOverviewTab from "@/components/doctor/DoctorOverviewTab";
import DoctorTasksTab from "@/components/doctor/DoctorTasksTab";
import DoctorReportsTab from "@/components/doctor/DoctorReportsTab";
import DoctorAnalyticsTab from "@/components/doctor/DoctorAnalyticsTab";
import MedicalRecordsTab from "@/components/doctor/medical-records/MedicalRecordsTab";
import CommunicationHub from "@/components/doctor/communication/CommunicationHub";
import IntegrationCapabilities from "@/components/doctor/IntegrationCapabilities";

const DoctorDashboard = () => {
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isAvailable, setIsAvailable] = useState(true);

  const navigationItems = [
    { label: "Today's Schedule", href: "#", icon: Clock, count: 18, color: "text-blue-600" },
    { label: "Patient Records", href: "#", icon: FileText, count: 247, color: "text-green-600" },
    { label: "Messages", href: "#", icon: MessageSquare, count: 5, color: "text-purple-600" },
    { label: "Emergency Calls", href: "#", icon: Phone, count: 2, color: "text-red-600" },
    { label: "Video Consults", href: "#", icon: Video, count: 3, color: "text-orange-600" },
    { label: "Lab Results", href: "#", icon: Activity, count: 12, color: "text-cyan-600" },
    { label: "Notifications", href: "#", icon: Bell, count: 8, color: "text-yellow-600" },
    { label: "Settings", href: "#", icon: Settings, count: null, color: "text-gray-600" }
  ];

  const urgentTasks = [
    { id: 1, task: "Critical lab results - John Doe", type: "urgent", icon: AlertTriangle },
    { id: 2, task: "Surgery prep - Room 204", type: "pending", icon: ClipboardList },
    { id: 3, task: "Discharge approval needed", type: "review", icon: CheckCircle2 }
  ];

  const todayMetrics = [
    { label: "Patients Seen", value: "8", total: "18", percentage: 44 },
    { label: "Appointments", value: "12", total: "18", percentage: 67 },
    { label: "Pending Reviews", value: "3", total: "15", percentage: 20 },
    { label: "Messages Replied", value: "15", total: "20", percentage: 75 }
  ];

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex">
      {/* Enhanced Left Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 shadow-xl z-10 overflow-y-auto">
        {/* Sidebar Header with Branding */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">MediFlow Doctor</span>
                <p className="text-sm text-gray-500">Dr. Smith - Cardiology</p>
              </div>
            </Link>
          </div>
          
          {/* User Profile & Status */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/api/placeholder/32/32" alt="Dr. Profile" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Dr. Smith</p>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs text-gray-600">{isAvailable ? 'Available' : 'Busy'}</span>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={toggleAvailability}
              className="h-7 text-xs"
            >
              Toggle
            </Button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Video className="h-4 w-4 mr-2" />
              Telemedicine
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <Link key={index} to={item.href}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between h-12 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <Badge variant={item.count > 0 ? "default" : "secondary"} className="text-xs">
                      {item.count}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
            Urgent Tasks
          </h4>
          <div className="space-y-2">
            {urgentTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-2 bg-red-50 rounded-lg border border-red-100">
                <task.icon className="h-4 w-4 text-red-600 flex-shrink-0" />
                <span className="text-sm text-red-800 font-medium truncate">{task.task}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Today's Progress */}
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
            Today's Progress
          </h4>
          <div className="space-y-3">
            {todayMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">{metric.label}</span>
                  <span className="text-xs font-medium">{metric.value}/{metric.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metric.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="p-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Today's Summary</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">18</div>
              <div className="text-xs text-blue-700">Appointments</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">8</div>
              <div className="text-xs text-green-700">Completed</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-600">3</div>
              <div className="text-xs text-orange-700">Reviews</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">5</div>
              <div className="text-xs text-purple-700">Messages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DoctorWelcome />
          <DoctorStatsCards />

          {/* Enhanced Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <div className="border-b border-gray-200">
              <TabsList className="grid w-full grid-cols-9 bg-transparent h-auto p-0">
                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="patients" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent">
                  Patients
                </TabsTrigger>
                <TabsTrigger value="appointments" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent">
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="medical-records" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent">
                  Records
                </TabsTrigger>
                <TabsTrigger value="communication" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent">
                  Communication
                </TabsTrigger>
                <TabsTrigger value="integrations" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent">
                  Integrations
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent">
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent">
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent">
                  Reports
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <DoctorOverviewTab />
            </TabsContent>

            <TabsContent value="patients" className="space-y-6">
              <PatientManagement />
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <AppointmentManagement />
            </TabsContent>

            <TabsContent value="medical-records" className="space-y-6">
              <MedicalRecordsTab />
            </TabsContent>

            <TabsContent value="communication" className="space-y-6">
              <CommunicationHub />
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <IntegrationCapabilities />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <DoctorAnalyticsTab />
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <DoctorTasksTab />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <DoctorReportsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
