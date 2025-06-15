
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, 
  Globe, 
  Clock, 
  Database, 
  Mail, 
  Shield,
  Save,
  RotateCcw
} from "lucide-react";

const SystemConfigurationTab = () => {
  const configSections = [
    {
      title: "General Settings",
      icon: <Settings className="h-5 w-5" />,
      settings: [
        { name: "Hospital Name", type: "text", value: "MediFlow General Hospital", description: "Official hospital name" },
        { name: "Hospital Code", type: "text", value: "MFH001", description: "Unique hospital identifier" },
        { name: "Contact Email", type: "email", value: "admin@mediflow.com", description: "Main contact email" },
        { name: "Contact Phone", type: "text", value: "+1 (555) 123-4567", description: "Main contact number" },
        { name: "Address", type: "textarea", value: "123 Healthcare Ave, Medical City, MC 12345", description: "Hospital address" }
      ]
    },
    {
      title: "System Preferences",
      icon: <Globe className="h-5 w-5" />,
      settings: [
        { name: "Default Language", type: "select", value: "english", options: ["English", "Spanish", "French"], description: "System default language" },
        { name: "Date Format", type: "select", value: "mm/dd/yyyy", options: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"], description: "Date display format" },
        { name: "Currency", type: "select", value: "usd", options: ["USD", "EUR", "GBP", "INR"], description: "Default currency" },
        { name: "Timezone", type: "select", value: "est", options: ["EST", "PST", "GMT", "IST"], description: "System timezone" }
      ]
    },
    {
      title: "Security Settings",
      icon: <Shield className="h-5 w-5" />,
      settings: [
        { name: "Enable Two-Factor Authentication", type: "switch", value: true, description: "Require 2FA for admin users" },
        { name: "Session Timeout", type: "select", value: "30", options: ["15 minutes", "30 minutes", "1 hour", "2 hours"], description: "Auto logout time" },
        { name: "Password Complexity", type: "switch", value: true, description: "Enforce strong passwords" },
        { name: "Login Attempt Limit", type: "number", value: "5", description: "Max failed login attempts" },
        { name: "Audit Logging", type: "switch", value: true, description: "Enable comprehensive audit logs" }
      ]
    },
    {
      title: "Notification Settings",
      icon: <Mail className="h-5 w-5" />,
      settings: [
        { name: "Email Notifications", type: "switch", value: true, description: "Enable email notifications" },
        { name: "SMS Notifications", type: "switch", value: true, description: "Enable SMS notifications" },
        { name: "WhatsApp Integration", type: "switch", value: false, description: "Enable WhatsApp messaging" },
        { name: "Push Notifications", type: "switch", value: true, description: "Enable push notifications" },
        { name: "Emergency Alerts", type: "switch", value: true, description: "Enable emergency alert system" }
      ]
    },
    {
      title: "Data Management",
      icon: <Database className="h-5 w-5" />,
      settings: [
        { name: "Auto Backup", type: "switch", value: true, description: "Enable automatic backups" },
        { name: "Backup Frequency", type: "select", value: "daily", options: ["Hourly", "Daily", "Weekly"], description: "Backup schedule" },
        { name: "Data Retention", type: "select", value: "7years", options: ["5 years", "7 years", "10 years", "Indefinite"], description: "Data retention period" },
        { name: "Archive Old Data", type: "switch", value: true, description: "Auto-archive old records" },
        { name: "Data Encryption", type: "switch", value: true, description: "Encrypt sensitive data" }
      ]
    }
  ];

  const renderField = (setting: any) => {
    switch (setting.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <Input 
            type={setting.type} 
            defaultValue={setting.value} 
            className="max-w-md"
          />
        );
      case 'textarea':
        return (
          <Textarea 
            defaultValue={setting.value} 
            className="max-w-md"
            rows={3}
          />
        );
      case 'select':
        return (
          <Select defaultValue={setting.value}>
            <SelectTrigger className="max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {setting.options?.map((option: string, index: number) => (
                <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '')}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'switch':
        return <Switch defaultChecked={setting.value} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">System Configuration</h2>
          <p className="text-muted-foreground">
            Configure global system settings and preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Configuration Sections */}
      {configSections.map((section, sectionIndex) => (
        <Card key={sectionIndex}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {section.icon}
              {section.title}
            </CardTitle>
            <CardDescription>
              Configure {section.title.toLowerCase()} for the hospital system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {section.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <div>
                    <Label className="text-sm font-medium">{setting.name}</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {setting.description}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    {renderField(setting)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Operating Hours Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Operating Hours
          </CardTitle>
          <CardDescription>
            Configure hospital operating hours and emergency availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="grid grid-cols-4 gap-4 items-center">
                <Label className="font-medium">{day}</Label>
                <Select defaultValue="08:00">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {`${i.toString().padStart(2, '0')}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select defaultValue="17:00">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {`${i.toString().padStart(2, '0')}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Switch defaultChecked={day !== 'Sunday'} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemConfigurationTab;
