
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, UserPlus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientManagementHeaderProps {
  onExport: () => void;
  onRegisterPatient: () => void;
}

const PatientManagementHeader = ({ onExport, onRegisterPatient }: PatientManagementHeaderProps) => {
  const { toast } = useToast();

  const handleExport = () => {
    // Generate sample patient data for export
    const patientData = [
      ['Name', 'Email', 'Phone', 'Registration Type', 'Status', 'Date Registered'],
      ['Rajesh Kumar', 'rajesh.kumar@email.com', '+91 98765 43210', 'Walk-in', 'Completed', '2024-01-15'],
      ['Priya Sharma', 'priya.sharma@email.com', '+91 98765 43211', 'Online', 'In-progress', '2024-01-16'],
      ['Mohammed Ali', 'mohammed.ali@email.com', '+91 98765 43212', 'Referral', 'Pending', '2024-01-17'],
      ['Sunita Patel', 'sunita.patel@email.com', '+91 98765 43213', 'Emergency', 'Completed', '2024-01-18']
    ];

    const csvContent = patientData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `patient-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Completed",
      description: "Patient registration data has been exported successfully.",
    });

    onExport();
  };

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
          <Button variant="outline" onClick={handleExport} className="border-gray-300 hover:bg-gray-50">
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
