
import { TabsContent } from "@/components/ui/tabs";
import AppointmentManagement from "./AppointmentManagement";
import AppointmentBooking from "./AppointmentBooking";
import PatientMedicalHistory from "./PatientMedicalHistory";
import LabResultsPortal from "./LabResultsPortal";
import PrescriptionManagement from "./PrescriptionManagement";
import PatientBillingSummary from "./PatientBillingSummary";
import HealthMetricsTracking from "./HealthMetricsTracking";

const PatientTabContent = () => {
  return (
    <>
      <TabsContent value="appointments" className="space-y-6">
        <AppointmentManagement />
      </TabsContent>

      <TabsContent value="book-appointment" className="space-y-6">
        <AppointmentBooking />
      </TabsContent>

      <TabsContent value="records" className="space-y-6">
        <PatientMedicalHistory />
      </TabsContent>

      <TabsContent value="reports" className="space-y-6">
        <LabResultsPortal />
      </TabsContent>

      <TabsContent value="prescriptions" className="space-y-6">
        <PrescriptionManagement />
      </TabsContent>

      <TabsContent value="billing" className="space-y-6">
        <PatientBillingSummary />
      </TabsContent>

      <TabsContent value="health-metrics" className="space-y-6">
        <HealthMetricsTracking />
      </TabsContent>
    </>
  );
};

export default PatientTabContent;
