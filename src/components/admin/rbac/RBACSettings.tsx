
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Settings, 
  Shield, 
  Clock, 
  AlertTriangle, 
  Database, 
  Lock,
  RefreshCw,
  Download,
  Upload
} from "lucide-react";

interface RBACSettingsProps {
  currentUserRole: string;
}

const RBACSettings = ({ currentUserRole }: RBACSettingsProps) => {
  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Configure security policies and access controls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Enforce Role Hierarchy</Label>
              <div className="text-sm text-muted-foreground">
                Ensure higher-level roles inherit lower-level permissions
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Require Role Approval</Label>
              <div className="text-sm text-muted-foreground">
                All role changes require administrator approval
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Multi-Factor Authentication</Label>
              <div className="text-sm text-muted-foreground">
                Require MFA for sensitive role assignments
              </div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Audit All Role Changes</Label>
              <div className="text-sm text-muted-foreground">
                Log all role and permission modifications
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Session Management
          </CardTitle>
          <CardDescription>
            Configure session timeouts and concurrent access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Select defaultValue="60">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="480">8 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Max Concurrent Sessions</Label>
              <Select defaultValue="3">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 session</SelectItem>
                  <SelectItem value="2">2 sessions</SelectItem>
                  <SelectItem value="3">3 sessions</SelectItem>
                  <SelectItem value="5">5 sessions</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Force Re-authentication</Label>
              <div className="text-sm text-muted-foreground">
                Require password confirmation for sensitive actions
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Role Inheritance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Role Inheritance
          </CardTitle>
          <CardDescription>
            Configure how roles inherit permissions from parent roles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">Super Administrator</div>
                <div className="text-sm text-muted-foreground">Inherits: All permissions</div>
              </div>
              <Lock className="h-4 w-4 text-red-500" />
            </div>

            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">Department Administrator</div>
                <div className="text-sm text-muted-foreground">Inherits: Module Administrator permissions</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">Module Administrator</div>
                <div className="text-sm text-muted-foreground">Inherits: Basic user permissions</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">Medical Staff</div>
                <div className="text-sm text-muted-foreground">Inherits: Patient portal permissions</div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Maintenance
          </CardTitle>
          <CardDescription>
            Backup, restore, and maintain RBAC configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <RefreshCw className="h-6 w-6 mb-2" />
              Refresh Permissions
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              Export Configuration
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Upload className="h-6 w-6 mb-2" />
              Import Configuration
            </Button>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              System maintenance actions can affect all users. Ensure you have proper backups before making changes.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Permission Restrictions */}
      {currentUserRole !== "super-admin" && (
        <Alert className="border-orange-200 bg-orange-50">
          <Lock className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Some RBAC settings are restricted to Super Administrators. Contact your system administrator for full access.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default RBACSettings;
