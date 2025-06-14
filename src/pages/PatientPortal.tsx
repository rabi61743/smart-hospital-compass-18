import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import PatientPortalHeader from "@/components/patient/PatientPortalHeader";
import PatientWelcomeSection from "@/components/patient/PatientWelcomeSection";
import PatientQuickActions from "@/components/patient/PatientQuickActions";
import PatientUpcomingAppointments from "@/components/patient/PatientUpcomingAppointments";
import PatientHealthMetrics from "@/components/patient/PatientHealthMetrics";
import PatientRecentVisits from "@/components/patient/PatientRecentVisits";
import PatientTabContent from "@/components/patient/PatientTabContent";

const PatientPortal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <PatientPortalHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PatientWelcomeSection />
        <PatientQuickActions />

        <Tabs defaultValue="overview" className="space-y-6">
          <ScrollArea className="w-full">
            <TabsList className="flex w-max gap-1 p-1">
              <TabsTrigger value="overview" className="text-xs px-3 py-2 whitespace-nowrap">Overview</TabsTrigger>
              <TabsTrigger value="appointments" className="text-xs px-3 py-2 whitespace-nowrap">Appointments</TabsTrigger>
              <TabsTrigger value="book-appointment" className="text-xs px-3 py-2 whitespace-nowrap">Book Appointment</TabsTrigger>
              <TabsTrigger value="reminders" className="text-xs px-3 py-2 whitespace-nowrap">Reminders</TabsTrigger>
              <TabsTrigger value="records" className="text-xs px-3 py-2 whitespace-nowrap">Medical Records</TabsTrigger>
              <TabsTrigger value="reports" className="text-xs px-3 py-2 whitespace-nowrap">Lab Reports</TabsTrigger>
              <TabsTrigger value="prescriptions" className="text-xs px-3 py-2 whitespace-nowrap">Prescriptions</TabsTrigger>
              <TabsTrigger value="health-metrics" className="text-xs px-3 py-2 whitespace-nowrap">Health Metrics</TabsTrigger>
              <TabsTrigger value="immunizations" className="text-xs px-3 py-2 whitespace-nowrap">Immunizations</TabsTrigger>
              <TabsTrigger value="family-history" className="text-xs px-3 py-2 whitespace-nowrap">Family History</TabsTrigger>
              <TabsTrigger value="messaging" className="text-xs px-3 py-2 whitespace-nowrap">Messages</TabsTrigger>
              <TabsTrigger value="billing" className="text-xs px-3 py-2 whitespace-nowrap">Billing</TabsTrigger>
            </TabsList>
          </ScrollArea>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PatientUpcomingAppointments />
              <PatientHealthMetrics />
            </div>
            <PatientRecentVisits />
          </TabsContent>

          <PatientTabContent />
        </Tabs>
      </div>
    </div>
  );
};

export default PatientPortal;
