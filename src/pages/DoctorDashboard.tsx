
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const DoctorDashboard = () => {
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DoctorHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DoctorWelcome />
        <DoctorStatsCards />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
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
  );
};

export default DoctorDashboard;
