
import { TabsContent } from "@/components/ui/tabs";
import AppointmentManagement from "./AppointmentManagement";
import AppointmentBooking from "./AppointmentBooking";
import AppointmentReminders from "./AppointmentReminders";
import HealthAlerts from "./HealthAlerts";
import PatientMedicalHistory from "./PatientMedicalHistory";
import LabResultsPortal from "./LabResultsPortal";
import PrescriptionManagement from "./PrescriptionManagement";
import PatientBillingSummary from "./PatientBillingSummary";
import HealthMetricsTracking from "./HealthMetricsTracking";
import ImmunizationRecords from "./ImmunizationRecords";
import FamilyMedicalHistory from "./FamilyMedicalHistory";
import PatientMessaging from "./messaging/PatientMessaging";

const PatientTabContent = () => {
  return (
    <>
      <TabsContent value="appointments" className="space-y-6">
        <AppointmentManagement />
      </TabsContent>

      <TabsContent value="book-appointment" className="space-y-6">
        <AppointmentBooking />
      </TabsContent>

      <TabsContent value="reminders" className="space-y-6">
        <AppointmentReminders />
      </TabsContent>

      <TabsContent value="health-alerts" className="space-y-6">
        <HealthAlerts />
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

      <TabsContent value="immunizations" className="space-y-6">
        <ImmunizationRecords />
      </TabsContent>

      <TabsContent value="family-history" className="space-y-6">
        <FamilyMedicalHistory />
      </TabsContent>

      <TabsContent value="messaging" className="space-y-6">
        <PatientMessaging />
      </TabsContent>
    </>
  );
};

export default PatientTabContent;
