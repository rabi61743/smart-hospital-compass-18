
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Shield, MapPin, Bell, Phone, Mail } from "lucide-react";
import { UserFormData } from '../EnhancedAddUserDialog';

interface ReviewConfirmStepProps {
  formData: UserFormData;
}

const ReviewConfirmStep = ({ formData }: ReviewConfirmStepProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-blue-600" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Full Name</p>
              <p className="text-gray-900">{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Date of Birth</p>
              <p className="text-gray-900">{formData.dateOfBirth || 'Not provided'}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-gray-900">{formData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="text-gray-900">{formData.phone}</p>
              </div>
            </div>
          </div>
          {formData.emergencyContact && (
            <div>
              <p className="text-sm font-medium text-gray-600">Emergency Contact</p>
              <p className="text-gray-900">{formData.emergencyContact} - {formData.emergencyPhone}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-purple-600" />
            Role & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Role</p>
              <Badge className="bg-purple-100 text-purple-700">{formData.role}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Department</p>
              <p className="text-gray-900 capitalize">{formData.department}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Job Title</p>
              <p className="text-gray-900">{formData.jobTitle}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Reporting Manager</p>
              <p className="text-gray-900">{formData.reportingManager || 'Not assigned'}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Permissions</p>
            <div className="flex flex-wrap gap-1">
              {formData.permissions.map(permission => (
                <Badge key={permission} variant="secondary" className="text-xs">
                  {permission}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-green-600" />
            Location & Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Primary Location</p>
              <p className="text-gray-900 capitalize">{formData.primaryLocation.replace(/-/g, ' ')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Work Schedule</p>
              <p className="text-gray-900 capitalize">{formData.workSchedule.replace(/-/g, ' ')}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Preferred Language</p>
            <p className="text-gray-900 capitalize">{formData.preferredLanguage}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-orange-600" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.notificationPreferences.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {formData.notificationPreferences.map(pref => (
                <Badge key={pref} variant="outline" className="text-xs">
                  {pref}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No notification preferences selected</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewConfirmStep;
