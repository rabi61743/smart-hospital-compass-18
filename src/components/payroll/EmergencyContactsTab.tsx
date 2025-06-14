
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface EmergencyContact {
  id: number;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
}

interface EmergencyContactsTabProps {
  emergencyContacts: EmergencyContact[];
  onEmergencyContactsChange: (contacts: EmergencyContact[]) => void;
  isEditing: boolean;
}

const EmergencyContactsTab = ({ emergencyContacts, onEmergencyContactsChange, isEditing }: EmergencyContactsTabProps) => {
  const handleAddEmergencyContact = () => {
    const newContact = {
      id: Date.now(),
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: ''
    };
    onEmergencyContactsChange([...emergencyContacts, newContact]);
  };

  const handleContactChange = (index: number, field: keyof EmergencyContact, value: string | number) => {
    const newContacts = [...emergencyContacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    onEmergencyContactsChange(newContacts);
  };

  return (
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
        {emergencyContacts.map((contact, index) => (
          <Card key={contact.id}>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={contact.name}
                    onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>Relationship</Label>
                  <Input
                    value={contact.relationship}
                    onChange={(e) => handleContactChange(index, 'relationship', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={contact.phone}
                    onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={contact.email}
                    onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default EmergencyContactsTab;
