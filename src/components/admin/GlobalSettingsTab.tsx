
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Settings, Globe, Save } from "lucide-react";

const GlobalSettingsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Global Settings
          </CardTitle>
          <CardDescription>
            System-wide configuration and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Settings className="h-4 w-4" />
            <AlertDescription>
              Global settings panel will be implemented here. This includes branding, 
              localization, integrations, and system-wide preferences.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalSettingsTab;
