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
  HardDrive,
  Receipt,
  TrendingUp,
  FileText,
  Calendar,
  Clipboard,
  Printer,
  MessageSquare,
  Bell,
  Search,
  BarChart3,
  UserPlus,
  Building,
  Headphones
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

  const quickAccessModules = [
    {
      name: 'Patient Management',
      description: 'Manage patient records and appointments',
      icon: Users,
      path: '/patient-portal',
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      category: 'Clinical'
    },
    {
      name: 'Doctor Portal',
      description: 'Medical staff interface and tools',
      icon: Stethoscope,
      path: '/doctor-dashboard',
      color: 'bg-green-100 text-green-700 hover:bg-green-200',
      category: 'Clinical'
    },
    {
      name: 'Pharmacy System',
      description: 'Drug inventory and prescriptions',
      icon: Pill,
      path: '/pharmacy-dashboard',
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      category: 'Clinical'
    },
    {
      name: 'Laboratory',
      description: 'Lab tests and results management',
      icon: TestTube,
      path: '/lab-results',
      color: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
      category: 'Clinical'
    },
    {
      name: 'Finance & Billing',
      description: 'Financial operations and billing',
      icon: DollarSign,
      path: '/finance-dashboard',
      color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
      category: 'Financial'
    },
    {
      name: 'Commission Tracking',
      description: 'Track and manage commissions',
      icon: TrendingUp,
      path: '/commission-tracking',
      color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
      category: 'Financial'
    },
    {
      name: 'Payroll & HR',
      description: 'Employee management and payroll',
      icon: UserCheck,
      path: '/payroll-dashboard',
      color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
      category: 'Operations'
    },
    {
      name: 'Performance Tracking',
      description: 'Monitor staff performance',
      icon: BarChart3,
      path: '/performance-dashboard',
      color: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
      category: 'Operations'
    },
    {
      name: 'Audit & Compliance',
      description: 'Security and regulatory compliance',
      icon: Shield,
      path: '/audit-dashboard',
      color: 'bg-red-100 text-red-700 hover:bg-red-200',
      category: 'Operations'
    },
    {
      name: 'Patient Registration',
      description: 'Register new patients',
      icon: UserPlus,
      path: '/patient-registration',
      color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
      category: 'Clinical'
    },
    {
      name: 'Prescription Management',
      description: 'Manage prescriptions and medications',
      icon: Clipboard,
      path: '/prescription-management',
      color: 'bg-teal-100 text-teal-700 hover:bg-teal-200',
      category: 'Clinical'
    },
    {
      name: 'Patient History',
      description: 'View patient medical history',
      icon: FileText,
      path: '/patient-history',
      color: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
      category: 'Clinical'
    }
  ];

  const systemTools = [
    {
      name: 'User Management',
      description: 'Manage system users and permissions',
      icon: Users,
      action: () => alert('Opening User Management...'),
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    },
    {
      name: 'Backup Systems',
      description: 'Database backup and recovery',
      icon: Database,
      action: () => alert('Initiating system backup...'),
      color: 'bg-green-100 text-green-700 hover:bg-green-200'
    },
    {
      name: 'Security Scan',
      description: 'Run comprehensive security audit',
      icon: Shield,
      action: () => alert('Starting security scan...'),
      color: 'bg-red-100 text-red-700 hover:bg-red-200'
    },
    {
      name: 'System Monitor',
      description: 'Real-time system performance',
      icon: Monitor,
      action: () => alert('Opening system monitor...'),
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    },
    {
      name: 'Global Settings',
      description: 'Configure system-wide settings',
      icon: Settings,
      action: () => alert('Opening global settings...'),
      color: 'bg-orange-100 text-orange-700 hover:bg-orange-200'
    },
    {
      name: 'Health Check',
      description: 'Comprehensive system health check',
      icon: Heart,
      action: () => alert('Running health check...'),
      color: 'bg-pink-100 text-pink-700 hover:bg-pink-200'
    },
    {
      name: 'Reports Generator',
      description: 'Generate system reports',
      icon: FileText,
      action: () => alert('Opening reports generator...'),
      color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
    },
    {
      name: 'Notification Center',
      description: 'Manage system notifications',
      icon: Bell,
      action: () => alert('Opening notification center...'),
      color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
    },
    {
      name: 'System Search',
      description: 'Search across all modules',
      icon: Search,
      action: () => alert('Opening system search...'),
      color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
    },
    {
      name: 'Support Center',
      description: 'Get help and documentation',
      icon: Headphones,
      action: () => alert('Opening support center...'),
      color: 'bg-teal-100 text-teal-700 hover:bg-teal-200'
    }
  ];

  const handleModuleAccess = (path: string) => {
    window.open(path, '_blank');
  };

  const groupedModules = quickAccessModules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, typeof quickAccessModules>);

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

      {/* Quick Access to All Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Power className="h-5 w-5" />
            Quick Access to All Modules
          </CardTitle>
          <CardDescription>
            Direct access to all hospital management modules and systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="modules" className="space-y-4">
            <TabsList>
              <TabsTrigger value="modules">Hospital Modules</TabsTrigger>
              <TabsTrigger value="tools">System Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="modules">
              <div className="space-y-6">
                {Object.entries(groupedModules).map(([category, modules]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {modules.map((module) => {
                        const IconComponent = module.icon;
                        return (
                          <Button
                            key={module.name}
                            variant="outline"
                            className={`h-24 flex-col p-4 transition-all duration-200 ${module.color} border-2 hover:shadow-md`}
                            onClick={() => handleModuleAccess(module.path)}
                          >
                            <IconComponent className="h-6 w-6 mb-2" />
                            <span className="text-sm font-medium text-center leading-tight">{module.name}</span>
                            <span className="text-xs text-center opacity-75 mt-1">{module.description}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {systemTools.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <Button
                      key={tool.name}
                      variant="outline"
                      className={`h-24 flex-col p-4 transition-all duration-200 ${tool.color} border-2 hover:shadow-md`}
                      onClick={tool.action}
                    >
                      <IconComponent className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium text-center leading-tight">{tool.name}</span>
                      <span className="text-xs text-center opacity-75 mt-1">{tool.description}</span>
                    </Button>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

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
