
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Settings, Phone, Mail, Clock } from "lucide-react";
import { ReminderSettings } from './types';

interface NotificationSettingsProps {
  settings: ReminderSettings;
  onSettingChange: (key: keyof ReminderSettings, value: any) => void;
  onSaveSettings: () => void;
}

const NotificationSettings = ({ settings, onSettingChange, onSaveSettings }: NotificationSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SMS Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-green-600" />
              <Label htmlFor="sms-enabled" className="text-base font-medium">
                SMS Notifications
              </Label>
            </div>
            <Switch
              id="sms-enabled"
              checked={settings.smsEnabled}
              onCheckedChange={(checked) => onSettingChange('smsEnabled', checked)}
            />
          </div>
          {settings.smsEnabled && (
            <div className="ml-7 space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={settings.phoneNumber}
                onChange={(e) => onSettingChange('phoneNumber', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          )}
        </div>

        {/* Email Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <Label htmlFor="email-enabled" className="text-base font-medium">
                Email Notifications
              </Label>
            </div>
            <Switch
              id="email-enabled"
              checked={settings.emailEnabled}
              onCheckedChange={(checked) => onSettingChange('emailEnabled', checked)}
            />
          </div>
          {settings.emailEnabled && (
            <div className="ml-7 space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => onSettingChange('email', e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          )}
        </div>

        {/* Timing Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <Label className="text-base font-medium">Reminder Timing</Label>
          </div>
          <div className="ml-7 space-y-2">
            <Label htmlFor="timing">Send reminder before appointment</Label>
            <Select value={settings.timing} onValueChange={(value) => onSettingChange('timing', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select timing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 hour before</SelectItem>
                <SelectItem value="4">4 hours before</SelectItem>
                <SelectItem value="24">24 hours before</SelectItem>
                <SelectItem value="48">48 hours before</SelectItem>
                <SelectItem value="72">72 hours before</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={onSaveSettings} className="flex-1">
            Save Settings
          </Button>
          <Button variant="outline">Test Notifications</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
