
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  Bell
} from "lucide-react";
import PatientManagement from "@/components/doctor/PatientManagement";
import AppointmentManagement from "@/components/doctor/appointment/AppointmentManagement";
import DoctorHeader from "@/components/doctor/DoctorHeader";
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

  const navigationItems = [
    { label: "Today's Schedule", href: "#", icon: Clock },
    { label: "Patient Records", href: "#", icon: FileText },
    { label: "Messages", href: "#", icon: MessageSquare },
    { label: "Notifications", href: "#", icon: Bell },
    { label: "Settings", href: "#", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex">
      {/* Left Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 shadow-lg z-10">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">Doctor Portal</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            {navigationItems.map((item, index) => (
              <Link key={index} to={item.href}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 text-left"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Quick Stats in Sidebar */}
        <div className="px-6 py-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Today's Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Appointments Today</span>
              <span className="text-sm font-medium">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Patients Seen</span>
              <span className="text-sm font-medium">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Reviews</span>
              <span className="text-sm font-medium text-orange-600">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Unread Messages</span>
              <span className="text-sm font-medium text-blue-600">5</span>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="px-6 py-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Status</h4>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-80">
        <DoctorHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DoctorWelcome />
          <DoctorStatsCards />

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-9">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

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
