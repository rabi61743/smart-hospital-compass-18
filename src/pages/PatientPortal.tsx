
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/layout/ContentSection";
import { Calendar, Heart, FileText, MessageSquare, Plus } from "lucide-react";
import PatientWelcomeSection from "@/components/patient/PatientWelcomeSection";
import PatientQuickActions from "@/components/patient/PatientQuickActions";
import PatientUpcomingAppointments from "@/components/patient/PatientUpcomingAppointments";
import PatientHealthMetrics from "@/components/patient/PatientHealthMetrics";
import PatientRecentVisits from "@/components/patient/PatientRecentVisits";
import PatientTabContent from "@/components/patient/PatientTabContent";

const PatientPortal = () => {
  const headerStats = [
    { label: "Upcoming Appointments", value: "3", change: "Next: Tomorrow 10:00 AM", icon: <Calendar className="h-5 w-5" /> },
    { label: "Health Score", value: "94%", change: "Excellent health status", icon: <Heart className="h-5 w-5" /> },
    { label: "Medical Records", value: "24", change: "Last updated: 2 days ago", icon: <FileText className="h-5 w-5" /> },
    { label: "Unread Messages", value: "2", change: "From Dr. Smith", icon: <MessageSquare className="h-5 w-5" /> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Portal"
        description="Your comprehensive healthcare management dashboard"
        badge="Patient Portal"
        badgeVariant="outline"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Patient Portal" }
        ]}
        stats={headerStats}
        actions={
          <>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PatientWelcomeSection />
        </div>
        <div className="space-y-6">
          <PatientQuickActions />
        </div>
      </div>

      <ContentSection variant="transparent">
        <Tabs defaultValue="overview" className="space-y-6">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex w-max gap-1 p-1 bg-white border rounded-lg">
              <TabsTrigger value="overview" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Overview</TabsTrigger>
              <TabsTrigger value="appointments" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Appointments</TabsTrigger>
              <TabsTrigger value="book-appointment" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Book Appointment</TabsTrigger>
              <TabsTrigger value="reminders" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Reminders</TabsTrigger>
              <TabsTrigger value="health-alerts" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Health Alerts</TabsTrigger>
              <TabsTrigger value="emergency-contacts" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Emergency Contacts</TabsTrigger>
              <TabsTrigger value="care-team" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Care Team</TabsTrigger>
              <TabsTrigger value="records" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Medical Records</TabsTrigger>
              <TabsTrigger value="reports" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Lab Reports</TabsTrigger>
              <TabsTrigger value="prescriptions" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Prescriptions</TabsTrigger>
              <TabsTrigger value="health-metrics" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Health Metrics</TabsTrigger>
              <TabsTrigger value="immunizations" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Immunizations</TabsTrigger>
              <TabsTrigger value="family-history" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Family History</TabsTrigger>
              <TabsTrigger value="messaging" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Messages</TabsTrigger>
              <TabsTrigger value="insurance" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Insurance</TabsTrigger>
              <TabsTrigger value="billing" className="text-xs px-4 py-2 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Billing</TabsTrigger>
              <TabsTrigger value="locations" className="text-xs px-4 py-2 whitespace-nowrap data-[state-active]:bg-blue-50 data-[state=active]:text-blue-700">Locations</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PatientUpcomingAppointments />
              <PatientHealthMetrics />
            </div>
            <PatientRecentVisits />
          </TabsContent>

          <PatientTabContent />
        </Tabs>
      </ContentSection>
    </div>
  );
};

export default PatientPortal;
