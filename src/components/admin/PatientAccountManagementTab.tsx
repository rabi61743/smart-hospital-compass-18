
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import PatientRegistrationStats from './patient-management/PatientRegistrationStats';
import PatientOnboardingTable from './patient-management/PatientOnboardingTable';
import PatientRegistrationDialog from './patient-management/PatientRegistrationDialog';
import PatientSearchFilters from './patient-management/PatientSearchFilters';
import PatientResultsSummary from './patient-management/PatientResultsSummary';
import PatientManagementHeader from './patient-management/PatientManagementHeader';

const PatientAccountManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [registrationTypeFilter, setRegistrationTypeFilter] = useState('all');
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock patient registration data
  const patientRegistrations = [
    {
      id: 'PAT001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+91 98765 43210',
      dateOfBirth: '1978-03-15',
      registrationDate: '2024-01-15',
      status: 'completed',
      registrationType: 'walk-in',
      onboardingProgress: 100,
      assignedStaff: 'Dr. Smith',
      insuranceProvider: 'HDFC ERGO',
      emergencyContact: 'John Johnson (+91 98765 43211)',
      bloodGroup: 'A+',
      lastActivity: '2 days ago'
    },
    {
      id: 'PAT002',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+91 98765 43212',
      dateOfBirth: '1985-07-22',
      registrationDate: '2024-01-16',
      status: 'in-progress',
      registrationType: 'online',
      onboardingProgress: 75,
      assignedStaff: 'Nurse Mary',
      emergencyContact: 'Lisa Chen (+91 98765 43213)',
      bloodGroup: 'O+',
      lastActivity: '1 hour ago'
    },
    {
      id: 'PAT003',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+91 98765 43214',
      dateOfBirth: '1992-11-08',
      registrationDate: '2024-01-17',
      status: 'pending',
      registrationType: 'referral',
      onboardingProgress: 25,
      emergencyContact: 'Robert Davis (+91 98765 43215)',
      bloodGroup: 'B+',
      lastActivity: '30 minutes ago'
    },
    {
      id: 'PAT004',
      name: 'Robert Wilson',
      email: 'robert.wilson@email.com',
      phone: '+91 98765 43216',
      dateOfBirth: '1960-04-12',
      registrationDate: '2024-01-18',
      status: 'incomplete',
      registrationType: 'emergency',
      onboardingProgress: 50,
      assignedStaff: 'Dr. Brown',
      emergencyContact: 'Margaret Wilson (+91 98765 43217)',
      bloodGroup: 'AB-',
      lastActivity: '5 hours ago'
    }
  ];

  const filteredRegistrations = patientRegistrations.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    const matchesType = registrationTypeFilter === 'all' || patient.registrationType === registrationTypeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Patient registration data is being exported to CSV.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Patient Registration Statistics */}
      <PatientRegistrationStats registrations={patientRegistrations} />

      {/* Main Patient Account Management */}
      <Card className="border-0 shadow-xl">
        <PatientManagementHeader
          onExport={handleExport}
          onRegisterPatient={() => setIsRegistrationDialogOpen(true)}
        />
        <CardContent className="p-6">
          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <PatientSearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              registrationTypeFilter={registrationTypeFilter}
              setRegistrationTypeFilter={setRegistrationTypeFilter}
            />

            {/* Results Summary */}
            <PatientResultsSummary
              filteredCount={filteredRegistrations.length}
              totalCount={patientRegistrations.length}
              statusFilter={statusFilter}
              registrationTypeFilter={registrationTypeFilter}
              searchTerm={searchTerm}
            />
          </div>

          {/* Patient Onboarding Table */}
          <PatientOnboardingTable registrations={filteredRegistrations} />
        </CardContent>
      </Card>

      {/* Patient Registration Dialog */}
      <PatientRegistrationDialog
        open={isRegistrationDialogOpen}
        onOpenChange={setIsRegistrationDialogOpen}
      />
    </div>
  );
};

export default PatientAccountManagementTab;
