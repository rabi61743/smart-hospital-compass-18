
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const PatientRecentVisits = () => {
  const recentVisits = [
    {
      id: 1,
      doctor: "Dr. Emily Davis",
      department: "General Medicine",
      date: "Dec 10, 2024",
      diagnosis: "Routine Checkup",
      status: "Completed"
    },
    {
      id: 2,
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      date: "Nov 28, 2024",
      diagnosis: "Hypertension Follow-up",
      status: "Reports Available"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Visits</CardTitle>
        <CardDescription>Your medical history and past consultations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentVisits.map((visit) => (
            <div key={visit.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{visit.doctor}</p>
                <p className="text-sm text-gray-600">{visit.department}</p>
                <p className="text-sm text-gray-600">{visit.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{visit.diagnosis}</p>
                <Badge variant={visit.status === "Completed" ? "default" : "secondary"}>
                  {visit.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <Link to="/patient-history">
          <Button className="w-full mt-4" variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Complete Medical History
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PatientRecentVisits;
