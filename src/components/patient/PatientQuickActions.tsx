
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, Users, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";

const PatientQuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="text-center">
          <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <CardTitle className="text-lg">Book Appointment</CardTitle>
        </CardHeader>
      </Card>
      <Link to="/patient-history">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <CardTitle className="text-lg">View Medical History</CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <Link to="/lab-results">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <FlaskConical className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Lab Results</CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <Link to="/prescription-management">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Prescriptions</CardTitle>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};

export default PatientQuickActions;
