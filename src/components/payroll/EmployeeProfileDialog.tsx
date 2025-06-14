
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Edit, Save } from "lucide-react";
import PersonalDetailsTab from './PersonalDetailsTab';
import EmploymentDetailsTab from './EmploymentDetailsTab';
import EmergencyContactsTab from './EmergencyContactsTab';
import DocumentsTab from './DocumentsTab';

interface EmployeeProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string;
}

const EmployeeProfileDialog = ({ open, onOpenChange, employeeId }: EmployeeProfileDialogProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock employee data - in real app, this would come from API
  const [employeeData, setEmployeeData] = useState({
    personal: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@hospital.com',
      phone: '+91 98765 43210',
      dateOfBirth: '1985-03-15',
      gender: 'Female',
      maritalStatus: 'Married',
      nationality: 'Indian',
      bloodGroup: 'O+',
      address: '123 Medical District, Mumbai, Maharashtra 400001'
    },
    employment: {
      employeeId: 'EMP001',
      department: 'Cardiology',
      position: 'Senior Cardiologist',
      joiningDate: '2020-03-15',
      employeeType: 'Full-time',
      workLocation: 'Main Hospital',
      reportingManager: 'Dr. Rajesh Kumar',
      salary: 120000
    },
    emergency: [
      {
        id: 1,
        name: 'John Johnson',
        relationship: 'Spouse',
        phone: '+91 98765 43211',
        email: 'john.johnson@email.com',
        address: '123 Medical District, Mumbai, Maharashtra 400001'
      },
      {
        id: 2,
        name: 'Mary Wilson',
        relationship: 'Mother',
        phone: '+91 98765 43212',
        email: 'mary.wilson@email.com',
        address: '456 Family Street, Mumbai, Maharashtra 400002'
      }
    ],
    documents: [
      { id: 1, name: 'Aadhar Card', type: 'ID Proof', uploadDate: '2024-01-15', status: 'Verified' },
      { id: 2, name: 'PAN Card', type: 'Tax Document', uploadDate: '2024-01-15', status: 'Verified' },
      { id: 3, name: 'Medical Degree', type: 'Educational', uploadDate: '2024-01-15', status: 'Verified' },
      { id: 4, name: 'Experience Certificate', type: 'Professional', uploadDate: '2024-01-15', status: 'Pending' }
    ]
  });

  const handleSave = () => {
    // Save employee data
    console.log('Saving employee data:', employeeData);
    toast({
      title: "Success",
      description: "Employee information updated successfully",
    });
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Employee Profile - {employeeData.personal.firstName} {employeeData.personal.lastName}
              </DialogTitle>
              <DialogDescription>
                View and manage comprehensive employee information
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="employment">Employment Info</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalDetailsTab
              personalData={employeeData.personal}
              onPersonalDataChange={(data) => setEmployeeData(prev => ({ ...prev, personal: data }))}
              isEditing={isEditing}
            />
          </TabsContent>

          <TabsContent value="employment">
            <EmploymentDetailsTab
              employmentData={employeeData.employment}
              onEmploymentDataChange={(data) => setEmployeeData(prev => ({ ...prev, employment: data }))}
              isEditing={isEditing}
            />
          </TabsContent>

          <TabsContent value="emergency">
            <EmergencyContactsTab
              emergencyContacts={employeeData.emergency}
              onEmergencyContactsChange={(contacts) => setEmployeeData(prev => ({ ...prev, emergency: contacts }))}
              isEditing={isEditing}
            />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab
              documents={employeeData.documents}
              isEditing={isEditing}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeProfileDialog;
