
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  bloodGroup: string;
  address: string;
}

interface PersonalDetailsTabProps {
  personalData: PersonalDetails;
  onPersonalDataChange: (data: PersonalDetails) => void;
  isEditing: boolean;
}

const PersonalDetailsTab = ({ personalData, onPersonalDataChange, isEditing }: PersonalDetailsTabProps) => {
  const handleFieldChange = (field: keyof PersonalDetails, value: string) => {
    onPersonalDataChange({
      ...personalData,
      [field]: value
    });
  };

  return (
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
              value={personalData.firstName}
              onChange={(e) => handleFieldChange('firstName', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={personalData.lastName}
              onChange={(e) => handleFieldChange('lastName', e.target.value)}
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
              value={personalData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={personalData.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
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
              value={personalData.dateOfBirth}
              onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={personalData.gender}
              onValueChange={(value) => handleFieldChange('gender', value)}
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
              value={personalData.bloodGroup}
              onChange={(e) => handleFieldChange('bloodGroup', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={personalData.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
            disabled={!isEditing}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalDetailsTab;
