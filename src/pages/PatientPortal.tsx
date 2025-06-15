
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PatientWelcomeSection from "@/components/patient/PatientWelcomeSection";
import PatientQuickActions from "@/components/patient/PatientQuickActions";
import PatientUpcomingAppointments from "@/components/patient/PatientUpcomingAppointments";
import PatientHealthMetrics from "@/components/patient/PatientHealthMetrics";
import PatientRecentVisits from "@/components/patient/PatientRecentVisits";
import PatientTabContent from "@/components/patient/PatientTabContent";

const PatientPortal = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Portal</h1>
          <p className="text-gray-600 mt-1">
            Your comprehensive healthcare management dashboard
          </p>
        </div>
      </div>

      <PatientWelcomeSection />
      <PatientQuickActions />

      <Tabs defaultValue="overview" className="space-y-6">
        <ScrollArea className="w-full">
          <TabsList className="inline-flex w-max gap-1 p-1">
            <TabsTrigger value="overview" className="text-xs px-3 py-2 whitespace-nowrap">Overview</TabsTrigger>
            <TabsTrigger value="appointments" className="text-xs px-3 py-2 whitespace-nowrap">Appointments</TabsTrigger>
            <TabsTrigger value="book-appointment" className="text-xs px-3 py-2 whitespace-nowrap">Book Appointment</TabsTrigger>
            <TabsTrigger value="reminders" className="text-xs px-3 py-2 whitespace-nowrap">Reminders</TabsTrigger>
            <TabsTrigger value="health-alerts" className="text-xs px-3 py-2 whitespace-nowrap">Health Alerts</TabsTrigger>
            <TabsTrigger value="emergency-contacts" className="text-xs px-3 py-2 whitespace-nowrap">Emergency Contacts</TabsTrigger>
            <TabsTrigger value="care-team" className="text-xs px-3 py-2 whitespace-nowrap">Care Team</TabsTrigger>
            <TabsTrigger value="records" className="text-xs px-3 py-2 whitespace-nowrap">Medical Records</TabsTrigger>
            <TabsTrigger value="reports" className="text-xs px-3 py-2 whitespace-nowrap">Lab Reports</TabsTrigger>
            <TabsTrigger value="prescriptions" className="text-xs px-3 py-2 whitespace-nowrap">Prescriptions</TabsTrigger>
            <TabsTrigger value="health-metrics" className="text-xs px-3 py-2 whitespace-nowrap">Health Metrics</TabsTrigger>
            <TabsTrigger value="immunizations" className="text-xs px-3 py-2 whitespace-nowrap">Immunizations</TabsTrigger>
            <TabsTrigger value="family-history" className="text-xs px-3 py-2 whitespace-nowrap">Family History</TabsTrigger>
            <TabsTrigger value="messaging" className="text-xs px-3 py-2 whitespace-nowrap">Messages</TabsTrigger>
            <TabsTrigger value="insurance" className="text-xs px-3 py-2 whitespace-nowrap">Insurance</TabsTrigger>
            <TabsTrigger value="billing" className="text-xs px-3 py-2 whitespace-nowrap">Billing</TabsTrigger>
            <TabsTrigger value="locations" className="text-xs px-3 py-2 whitespace-nowrap">Locations</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="overview" className="space-y-6">
          <PatientUpcomingAppointments />
          <PatientHealthMetrics />
          <PatientRecentVisits />
        </TabsContent>

        <PatientTabContent />
      </Tabs>
    </div>
  );
};

export default PatientPortal;
