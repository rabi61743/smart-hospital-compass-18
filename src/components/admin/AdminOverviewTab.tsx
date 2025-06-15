
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Server, 
  Users, 
  Shield, 
  Database, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  TrendingUp,
  Settings
} from "lucide-react";

const AdminOverviewTab = () => {
  const systemModules = [
    { name: "Patient Management", status: "active", uptime: "99.9%", users: 342 },
    { name: "Doctor Portal", status: "active", uptime: "99.8%", users: 89 },
    { name: "Pharmacy System", status: "active", uptime: "99.5%", users: 45 },
    { name: "Finance Dashboard", status: "active", uptime: "99.7%", users: 23 },
    { name: "Payroll System", status: "maintenance", uptime: "95.2%", users: 156 },
    { name: "Commission Tracking", status: "active", uptime: "99.9%", users: 67 }
  ];

  const recentActivities = [
    { action: "New user registered", user: "Dr. Sarah Wilson", time: "2 minutes ago", type: "user" },
    { action: "Module updated", module: "Pharmacy System", time: "15 minutes ago", type: "system" },
    { action: "Security scan completed", result: "Clean", time: "1 hour ago", type: "security" },
    { action: "Backup completed", size: "2.3GB", time: "2 hours ago", type: "backup" },
    { action: "Permission modified", user: "Admin User", time: "3 hours ago", type: "permission" }
  ];

  const criticalAlerts = [
    { message: "Pharmacy system maintenance scheduled for tonight", type: "warning", priority: "medium" },
    { message: "User login attempts exceeded threshold", type: "security", priority: "high" },
    { message: "Disk space usage above 80%", type: "system", priority: "medium" }
  ];

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Critical Alerts
        </h3>
        {criticalAlerts.map((alert, index) => (
          <Alert key={index} className={`border-l-4 ${
            alert.priority === 'high' ? 'border-l-red-500' : 'border-l-orange-500'
          }`}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="flex justify-between items-center">
              <span>{alert.message}</span>
              <Badge variant={alert.priority === 'high' ? 'destructive' : 'default'}>
                {alert.priority}
              </Badge>
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.8%</div>
            <Progress value={99.8} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">A+</div>
            <p className="text-xs text-muted-foreground">
              Excellent security posture
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Usage</CardTitle>
            <Database className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Storage capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Modules Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            System Modules Status
          </CardTitle>
          <CardDescription>
            Real-time status of all hospital management modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemModules.map((module, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    module.status === 'active' ? 'bg-green-500' : 
                    module.status === 'maintenance' ? 'bg-orange-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <div className="font-medium">{module.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {module.users} active users
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={module.status === 'active' ? 'default' : 'secondary'}>
                    {module.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">
                    {module.uptime} uptime
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent System Activities
          </CardTitle>
          <CardDescription>
            Latest administrative actions and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'security' ? 'bg-red-500' :
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'system' ? 'bg-green-500' :
                  'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">
                    {activity.user || activity.module || activity.result || activity.size}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Add User
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              Security Scan
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Database className="h-6 w-6 mb-2" />
              Backup Now
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <TrendingUp className="h-6 w-6 mb-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverviewTab;
