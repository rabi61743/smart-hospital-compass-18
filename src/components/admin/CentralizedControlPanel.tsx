
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Monitor, 
  Users, 
  Database, 
  Shield, 
  Activity, 
  Server,
  Heart,
  UserCheck,
  Stethoscope,
  Pill,
  TestTube,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  RefreshCw,
  Power,
  Wifi,
  HardDrive
} from "lucide-react";

const CentralizedControlPanel = () => {
  const systemModules = [
    {
      id: 'patient-management',
      name: 'Patient Management',
      icon: Users,
      status: 'active',
      uptime: '99.9%',
      activeUsers: 342,
      lastUpdate: '2 minutes ago',
      version: 'v2.1.4',
      criticalAlerts: 0
    },
    {
      id: 'doctor-portal',
      name: 'Doctor Portal',
      icon: Stethoscope,
      status: 'active',
      uptime: '99.8%',
      activeUsers: 89,
      lastUpdate: '5 minutes ago',
      version: 'v2.0.8',
      criticalAlerts: 0
    },
    {
      id: 'pharmacy-system',
      name: 'Pharmacy System',
      icon: Pill,
      status: 'active',
      uptime: '99.5%',
      activeUsers: 45,
      lastUpdate: '1 minute ago',
      version: 'v1.9.2',
      criticalAlerts: 1
    },
    {
      id: 'laboratory-system',
      name: 'Laboratory System',
      icon: TestTube,
      status: 'active',
      uptime: '99.7%',
      activeUsers: 67,
      lastUpdate: '3 minutes ago',
      version: 'v2.2.1',
      criticalAlerts: 0
    },
    {
      id: 'billing-finance',
      name: 'Billing & Finance',
      icon: DollarSign,
      status: 'active',
      uptime: '99.9%',
      activeUsers: 23,
      lastUpdate: '1 minute ago',
      version: 'v3.0.1',
      criticalAlerts: 0
    },
    {
      id: 'payroll-hr',
      name: 'Payroll & HR',
      icon: UserCheck,
      status: 'maintenance',
      uptime: '95.2%',
      activeUsers: 156,
      lastUpdate: '30 minutes ago',
      version: 'v1.8.5',
      criticalAlerts: 2
    }
  ];

  const systemMetrics = {
    totalUsers: 1247,
    activeUsers: 847,
    systemUptime: 99.8,
    dataStorage: 78,
    networkLatency: 45,
    cpuUsage: 34,
    memoryUsage: 67,
    diskUsage: 45
  };

  const criticalAlerts = [
    { 
      id: 1, 
      module: 'Pharmacy System', 
      message: 'High medication inventory threshold reached', 
      severity: 'warning',
      time: '5 minutes ago'
    },
    { 
      id: 2, 
      module: 'Payroll System', 
      message: 'Maintenance window scheduled for tonight', 
      severity: 'info',
      time: '1 hour ago'
    },
    { 
      id: 3, 
      module: 'Network Infrastructure', 
      message: 'Elevated response times detected', 
      severity: 'warning',
      time: '15 minutes ago'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'maintenance': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Centralized Control Panel
              </CardTitle>
              <CardDescription>
                Real-time overview and control of all hospital management systems
              </CardDescription>
            </div>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh All
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertTriangle className="h-5 w-5" />
              Critical Alerts ({criticalAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalAlerts.map((alert) => (
                <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{alert.module}:</span> {alert.message}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{alert.time}</span>
                      <Badge variant="outline">{alert.severity}</Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemMetrics.systemUptime}%</div>
            <Progress value={systemMetrics.systemUptime} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Last 30 days average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              of {systemMetrics.totalUsers} total users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.dataStorage}%</div>
            <Progress value={systemMetrics.dataStorage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Storage utilization</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Latency</CardTitle>
            <Wifi className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.networkLatency}ms</div>
            <p className="text-xs text-muted-foreground">Average response time</p>
          </CardContent>
        </Card>
      </div>

      {/* System Modules Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Modules Overview
          </CardTitle>
          <CardDescription>
            Status and performance of all hospital management modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grid-view" className="space-y-4">
            <TabsList>
              <TabsTrigger value="grid-view">Grid View</TabsTrigger>
              <TabsTrigger value="detailed-view">Detailed View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid-view">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemModules.map((module) => {
                  const IconComponent = module.icon;
                  return (
                    <Card key={module.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                            <h3 className="font-medium">{module.name}</h3>
                          </div>
                          {getStatusIcon(module.status)}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Uptime:</span>
                            <span className="font-medium">{module.uptime}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Active Users:</span>
                            <span className="font-medium">{module.activeUsers}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Version:</span>
                            <span className="font-medium">{module.version}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <Badge className={getStatusColor(module.status)}>
                            {module.status.toUpperCase()}
                          </Badge>
                          {module.criticalAlerts > 0 && (
                            <Badge variant="destructive">
                              {module.criticalAlerts} Alert{module.criticalAlerts > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="detailed-view">
              <div className="space-y-4">
                {systemModules.map((module) => {
                  const IconComponent = module.icon;
                  return (
                    <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="font-medium">{module.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {module.activeUsers} active users • Last updated {module.lastUpdate}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{module.uptime} uptime</div>
                          <div className="text-xs text-muted-foreground">{module.version}</div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(module.status)}>
                            {module.status}
                          </Badge>
                          {module.criticalAlerts > 0 && (
                            <Badge variant="destructive">
                              {module.criticalAlerts}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Activity className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Power className="h-5 w-5" />
            System Control & Quick Actions
          </CardTitle>
          <CardDescription>
            Perform critical system operations and maintenance tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-xs">User Management</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Database className="h-6 w-6 mb-2" />
              <span className="text-xs">Backup Systems</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              <span className="text-xs">Security Scan</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Monitor className="h-6 w-6 mb-2" />
              <span className="text-xs">System Monitor</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              <span className="text-xs">Global Settings</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Heart className="h-6 w-6 mb-2" />
              <span className="text-xs">Health Check</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{systemMetrics.cpuUsage}%</div>
            <Progress value={systemMetrics.cpuUsage} className="mb-2" />
            <p className="text-xs text-muted-foreground">Normal operating range</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{systemMetrics.memoryUsage}%</div>
            <Progress value={systemMetrics.memoryUsage} className="mb-2" />
            <p className="text-xs text-muted-foreground">Within acceptable limits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Disk Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{systemMetrics.diskUsage}%</div>
            <Progress value={systemMetrics.diskUsage} className="mb-2" />
            <p className="text-xs text-muted-foreground">Optimal storage levels</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CentralizedControlPanel;
