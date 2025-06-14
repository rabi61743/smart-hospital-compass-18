
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, Mail, MapPin, FileText, Plus, Download, Edit, Save } from "lucide-react";

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

  const handleAddEmergencyContact = () => {
    const newContact = {
      id: Date.now(),
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: ''
    };
    setEmployeeData(prev => ({
      ...prev,
      emergency: [...prev.emergency, newContact]
    }));
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
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={employeeData.personal.firstName}
                      onChange={(e) => setEmployeeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, firstName: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={employeeData.personal.lastName}
                      onChange={(e) => setEmployeeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, lastName: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={employeeData.personal.email}
                      onChange={(e) => setEmployeeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, email: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={employeeData.personal.phone}
                      onChange={(e) => setEmployeeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, phone: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={employeeData.personal.dateOfBirth}
                      onChange={(e) => setEmployeeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, dateOfBirth: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={employeeData.personal.gender}
                      onValueChange={(value) => setEmployeeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, gender: value }
                      }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Input
                      id="bloodGroup"
                      value={employeeData.personal.bloodGroup}
                      onChange={(e) => setEmployeeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, bloodGroup: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={employeeData.personal.address}
                    onChange={(e) => setEmployeeData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, address: e.target.value }
                    }))}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employment">
            <Card>
              <CardHeader>
                <CardTitle>Employment Information</CardTitle>
                <CardDescription>Job details and organizational information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Employee ID</Label>
                    <Input value={employeeData.employment.employeeId} disabled />
                  </div>
                  <div>
                    <Label>Joining Date</Label>
                    <Input value={employeeData.employment.joiningDate} disabled />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={employeeData.employment.department}
                      onValueChange={(value) => setEmployeeData(prev => ({
                        ...prev,
                        employment: { ...prev.employment, department: value }
                      }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="General Medicine">General Medicine</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                        <SelectItem value="Laboratory">Laboratory</SelectItem>
                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={employeeData.employment.position}
                      onChange={(e) => setEmployeeData(prev => ({
                        ...prev,
                        employment: { ...prev.employment, position: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employeeType">Employment Type</Label>
                    <Select
                      value={employeeData.employment.employeeType}
                      onValueChange={(value) => setEmployeeData(prev => ({
                        ...prev,
                        employment: { ...prev.employment, employeeType: value }
                      }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Intern">Intern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="workLocation">Work Location</Label>
                    <Input
                      id="workLocation"
                      value={employeeData.employment.workLocation}
                      onChange={(e) => setEmployeeData(prev => ({
                        ...prev,
                        employment: { ...prev.employment, workLocation: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reportingManager">Reporting Manager</Label>
                  <Input
                    id="reportingManager"
                    value={employeeData.employment.reportingManager}
                    onChange={(e) => setEmployeeData(prev => ({
                      ...prev,
                      employment: { ...prev.employment, reportingManager: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Emergency Contacts</CardTitle>
                    <CardDescription>Emergency contact information for the employee</CardDescription>
                  </div>
                  {isEditing && (
                    <Button onClick={handleAddEmergencyContact} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Contact
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {employeeData.emergency.map((contact, index) => (
                  <Card key={contact.id}>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={contact.name}
                            onChange={(e) => {
                              const newContacts = [...employeeData.emergency];
                              newContacts[index].name = e.target.value;
                              setEmployeeData(prev => ({ ...prev, emergency: newContacts }));
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label>Relationship</Label>
                          <Input
                            value={contact.relationship}
                            onChange={(e) => {
                              const newContacts = [...employeeData.emergency];
                              newContacts[index].relationship = e.target.value;
                              setEmployeeData(prev => ({ ...prev, emergency: newContacts }));
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={contact.phone}
                            onChange={(e) => {
                              const newContacts = [...employeeData.emergency];
                              newContacts[index].phone = e.target.value;
                              setEmployeeData(prev => ({ ...prev, emergency: newContacts }));
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={contact.email}
                            onChange={(e) => {
                              const newContacts = [...employeeData.emergency];
                              newContacts[index].email = e.target.value;
                              setEmployeeData(prev => ({ ...prev, emergency: newContacts }));
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Employee Documents</CardTitle>
                    <CardDescription>Uploaded documents and certifications</CardDescription>
                  </div>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employeeData.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.type} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={doc.status === 'Verified' ? 'default' : 'secondary'}>
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeProfileDialog;
