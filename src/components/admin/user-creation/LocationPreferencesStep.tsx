
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserFormData } from '../EnhancedAddUserDialog';

interface LocationPreferencesStepProps {
  formData: UserFormData;
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
  errors: Partial<UserFormData>;
}

const LocationPreferencesStep = ({ formData, setFormData, errors }: LocationPreferencesStepProps) => {
  const locations = [
    'Main Hospital - Downtown',
    'North Campus',
    'South Campus',
    'Outpatient Clinic - West',
    'Emergency Center - East',
    'Remote/Telemedicine'
  ];

  const workSchedules = [
    { value: 'full-time', label: 'Full-time (40 hours/week)' },
    { value: 'part-time', label: 'Part-time (20-30 hours/week)' },
    { value: 'contract', label: 'Contract' },
    { value: 'on-call', label: 'On-call' },
    { value: 'flexible', label: 'Flexible hours' }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'chinese', label: 'Chinese' }
  ];

  const notificationOptions = [
    'Email notifications',
    'SMS alerts',
    'Push notifications',
    'Appointment reminders',
    'System updates',
    'Emergency alerts'
  ];

  const handleNotificationToggle = (notification: string) => {
    setFormData(prev => ({
      ...prev,
      notificationPreferences: prev.notificationPreferences.includes(notification)
        ? prev.notificationPreferences.filter(n => n !== notification)
        : [...prev.notificationPreferences, notification]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium text-gray-700">Primary Work Location *</Label>
        <Select 
          value={formData.primaryLocation} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, primaryLocation: value }))}
        >
          <SelectTrigger className={`mt-1 ${errors.primaryLocation ? 'border-red-500' : 'border-gray-300'}`}>
            <SelectValue placeholder="Select primary location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map(location => (
              <SelectItem key={location} value={location.toLowerCase().replace(/\s+/g, '-')}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.primaryLocation && (
          <p className="text-red-500 text-xs mt-1">{errors.primaryLocation}</p>
        )}
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700">Work Schedule *</Label>
        <Select 
          value={formData.workSchedule} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, workSchedule: value }))}
        >
          <SelectTrigger className={`mt-1 ${errors.workSchedule ? 'border-red-500' : 'border-gray-300'}`}>
            <SelectValue placeholder="Select work schedule" />
          </SelectTrigger>
          <SelectContent>
            {workSchedules.map(schedule => (
              <SelectItem key={schedule.value} value={schedule.value}>
                {schedule.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.workSchedule && (
          <p className="text-red-500 text-xs mt-1">{errors.workSchedule}</p>
        )}
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700">Preferred Language</Label>
        <Select 
          value={formData.preferredLanguage} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, preferredLanguage: value }))}
        >
          <SelectTrigger className="mt-1 border-gray-300">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map(language => (
              <SelectItem key={language.value} value={language.value}>
                {language.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Notification Preferences
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {notificationOptions.map(notification => (
            <div key={notification} className="flex items-center space-x-2">
              <Checkbox
                id={notification}
                checked={formData.notificationPreferences.includes(notification)}
                onCheckedChange={() => handleNotificationToggle(notification)}
              />
              <Label htmlFor={notification} className="text-sm text-gray-700">
                {notification}
              </Label>
            </div>
          ))}
        </div>
        {formData.notificationPreferences.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-2">Selected preferences:</p>
            <div className="flex flex-wrap gap-1">
              {formData.notificationPreferences.map(pref => (
                <Badge key={pref} variant="secondary" className="text-xs">
                  {pref}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPreferencesStep;
