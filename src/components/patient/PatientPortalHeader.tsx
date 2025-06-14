
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hospital, Bell, Settings, FileText, UserPlus, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";

const PatientPortalHeader = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Hospital className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MediFlow HMS</span>
            </Link>
            <Badge variant="secondary">Patient Portal</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/patient-history">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Medical History
              </Button>
            </Link>
            <Link to="/lab-results">
              <Button variant="outline" size="sm">
                <FlaskConical className="h-4 w-4 mr-2" />
                Lab Results
              </Button>
            </Link>
            <Link to="/patient-registration">
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Register
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PatientPortalHeader;
