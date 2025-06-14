
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, FlaskConical, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentManagement from "./AppointmentManagement";
import AppointmentBooking from "./AppointmentBooking";
import PatientBillingSummary from "./PatientBillingSummary";

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
        <Card>
          <CardHeader>
            <CardTitle>Medical Records</CardTitle>
            <CardDescription>Complete digital health history and documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Electronic Health Records</h3>
              <p className="text-gray-600 mb-4">Secure access to your complete medical history</p>
              <Link to="/patient-history">
                <Button>View Records</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reports" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Laboratory Reports</CardTitle>
            <CardDescription>Test results and diagnostic reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FlaskConical className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Digital Lab Reports</h3>
              <p className="text-gray-600 mb-4">Instant access to test results and imaging reports</p>
              <Link to="/lab-results">
                <Button>View Lab Results</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="billing" className="space-y-6">
        <PatientBillingSummary />
      </TabsContent>
    </>
  );
};

export default PatientTabContent;
