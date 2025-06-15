
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserFormData } from '../EnhancedAddUserDialog';

interface BasicInfoStepProps {
  formData: UserFormData;
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
  errors: Partial<UserFormData>;
}

const BasicInfoStep = ({ formData, setFormData, errors }: BasicInfoStepProps) => {
  const handleChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
            First Name *
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Enter first name"
            className={`mt-1 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
            Last Name *
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Enter last name"
            className={`mt-1 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Enter email address"
          className={`mt-1 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number *
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Enter phone number"
            className={`mt-1 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
            Date of Birth
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className="mt-1 border-gray-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700">
            Emergency Contact Name
          </Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => handleChange('emergencyContact', e.target.value)}
            placeholder="Emergency contact name"
            className="mt-1 border-gray-300"
          />
        </div>

        <div>
          <Label htmlFor="emergencyPhone" className="text-sm font-medium text-gray-700">
            Emergency Contact Phone
          </Label>
          <Input
            id="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={(e) => handleChange('emergencyPhone', e.target.value)}
            placeholder="Emergency contact phone"
            className="mt-1 border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
