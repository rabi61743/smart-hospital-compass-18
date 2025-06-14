
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Phone, User, Heart, Plus, Edit, Trash2 } from "lucide-react";

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  primaryPhone: string;
  secondaryPhone?: string;
  email?: string;
  address?: string;
  isPrimary: boolean;
}

interface MedicalInfo {
  bloodType: string;
  allergies: string[];
  medications: string[];
  medicalConditions: string[];
  emergencyInstructions: string;
  doctorName: string;
  doctorPhone: string;
  hospital: string;
  insuranceInfo: string;
}

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      relationship: 'Spouse',
      primaryPhone: '+91 98765 43210',
      secondaryPhone: '+91 98765 43211',
      email: 'sarah.johnson@email.com',
      address: '123 Main Street, Mumbai, Maharashtra',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Robert Johnson',
      relationship: 'Son',
      primaryPhone: '+91 98765 43212',
      email: 'robert.johnson@email.com',
      isPrimary: false
    }
  ]);

  const [medicalInfo] = useState<MedicalInfo>({
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish', 'Peanuts'],
    medications: ['Lisinopril 10mg daily', 'Metformin 500mg twice daily'],
    medicalConditions: ['Hypertension', 'Type 2 Diabetes'],
    emergencyInstructions: 'Patient has severe penicillin allergy. Always check medications before administration.',
    doctorName: 'Dr. Priya Sharma',
    doctorPhone: '+91 98765 12345',
    hospital: 'Apollo Hospital, Mumbai',
    insuranceInfo: 'Health Insurance Policy #12345678 - Star Health'
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 p-4">
      {/* Header */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-500">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl font-bold text-gray-900">
            <AlertTriangle className="h-6 w-6 mr-3 text-red-600" />
            Emergency Contacts & Medical Information
          </CardTitle>
          <CardDescription className="text-gray-600">
            Critical information for emergency situations - ensure this is always up to date
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="contacts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
          <TabsTrigger value="medical">Medical Emergency Info</TabsTrigger>
        </TabsList>

        {/* Emergency Contacts Tab */}
        <TabsContent value="contacts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Emergency Contacts</h3>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingContact(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingContact ? 'Edit Contact' : 'Add Emergency Contact'}
                  </DialogTitle>
                  <DialogDescription>
                    Provide contact information for emergency situations
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div>
                    <Label htmlFor="relationship">Relationship *</Label>
                    <Input id="relationship" placeholder="e.g., Spouse, Parent, Sibling" />
                  </div>
                  <div>
                    <Label htmlFor="primaryPhone">Primary Phone *</Label>
                    <Input id="primaryPhone" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <Label htmlFor="secondaryPhone">Secondary Phone</Label>
                    <Input id="secondaryPhone" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="contact@email.com" />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsEditDialogOpen(false)}>
                      {editingContact ? 'Update' : 'Add'} Contact
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {contacts.map((contact) => (
              <Card key={contact.id} className={`${contact.isPrimary ? 'border-red-200 bg-red-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-lg">{contact.name}</h4>
                        {contact.isPrimary && (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                            Primary Contact
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          <span>{contact.relationship}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{contact.primaryPhone}</span>
                          {contact.secondaryPhone && (
                            <span className="ml-2 text-gray-500">• {contact.secondaryPhone}</span>
                          )}
                        </div>
                        {contact.email && (
                          <div className="text-gray-500">{contact.email}</div>
                        )}
                        {contact.address && (
                          <div className="text-gray-500">{contact.address}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingContact(contact);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Medical Emergency Info Tab */}
        <TabsContent value="medical" className="space-y-4">
          <div className="grid gap-6">
            {/* Critical Medical Information */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <Heart className="h-5 w-5 mr-2" />
                  Critical Medical Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold text-red-700">Blood Type</Label>
                    <div className="text-2xl font-bold text-red-800">{medicalInfo.bloodType}</div>
                  </div>
                  <div>
                    <Label className="font-semibold text-red-700">Primary Doctor</Label>
                    <div className="font-medium">{medicalInfo.doctorName}</div>
                    <div className="text-sm text-gray-600">{medicalInfo.doctorPhone}</div>
                  </div>
                </div>
                
                <div>
                  <Label className="font-semibold text-red-700">Emergency Instructions</Label>
                  <div className="mt-1 p-3 bg-red-50 border border-red-200 rounded text-red-800">
                    {medicalInfo.emergencyInstructions}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-700">Known Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {medicalInfo.allergies.map((allergy, index) => (
                    <Badge key={index} className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Medications */}
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {medicalInfo.medications.map((medication, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {medication}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Medical Conditions */}
            <Card>
              <CardHeader>
                <CardTitle>Medical Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {medicalInfo.medicalConditions.map((condition, index) => (
                    <Badge key={index} variant="secondary">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Healthcare Providers */}
            <Card>
              <CardHeader>
                <CardTitle>Healthcare Providers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="font-medium">Preferred Hospital</Label>
                  <div>{medicalInfo.hospital}</div>
                </div>
                <div>
                  <Label className="font-medium">Insurance Information</Label>
                  <div>{medicalInfo.insuranceInfo}</div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full">
              Update Medical Information
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmergencyContacts;
