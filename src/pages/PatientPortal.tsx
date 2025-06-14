
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
          <TabsList className="grid w-full grid-cols-10">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="book-appointment">Book Appointment</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="reports">Lab Reports</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="health-metrics">Health Metrics</TabsTrigger>
            <TabsTrigger value="immunizations">Immunizations</TabsTrigger>
            <TabsTrigger value="family-history">Family History</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

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
