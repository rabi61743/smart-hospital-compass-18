
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Download, 
  Search, 
  Filter,
  Users,
  UserCheck,
  Clock,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PatientRegistrationStats from './patient-management/PatientRegistrationStats';
import PatientOnboardingTable from './patient-management/PatientOnboardingTable';
import PatientRegistrationDialog from './patient-management/PatientRegistrationDialog';

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

  const statuses = ['all', 'completed', 'in-progress', 'pending', 'incomplete'];
  const registrationTypes = ['all', 'walk-in', 'online', 'referral', 'emergency'];

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
              <Button onClick={() => setIsRegistrationDialogOpen(true)} className="bg-green-600 hover:bg-green-700 shadow-md">
                <UserPlus className="h-4 w-4 mr-2" />
                Register Patient
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or patient ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-green-500 h-11"
                />
              </div>
              
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48 border-gray-300 focus:border-green-500 h-11">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={registrationTypeFilter} onValueChange={setRegistrationTypeFilter}>
                  <SelectTrigger className="w-48 border-gray-300 focus:border-green-500 h-11">
                    <SelectValue placeholder="Registration Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {registrationTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="px-3 py-1">
                  {filteredRegistrations.length} of {patientRegistrations.length} registrations
                </Badge>
                {(statusFilter !== 'all' || registrationTypeFilter !== 'all' || searchTerm) && (
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">
                    Filters Active
                  </Badge>
                )}
              </div>
            </div>
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
