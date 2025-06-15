
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, UserPlus, Users } from "lucide-react";

interface PatientManagementHeaderProps {
  onExport: () => void;
  onRegisterPatient: () => void;
}

const PatientManagementHeader = ({ onExport, onRegisterPatient }: PatientManagementHeaderProps) => {
  return (
    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
      <div className="flex justify-between items-center">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            Patient Account Management
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2 text-base">
            Manage patient registrations, onboarding process, and account setup
          </CardDescription>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onExport} className="border-gray-300 hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={onRegisterPatient} className="bg-green-600 hover:bg-green-700 shadow-md">
            <UserPlus className="h-4 w-4 mr-2" />
            Register Patient
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default PatientManagementHeader;
