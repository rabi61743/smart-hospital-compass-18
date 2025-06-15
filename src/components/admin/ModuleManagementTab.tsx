
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Database, 
  Settings, 
  Activity, 
  Users, 
  Stethoscope,
  Pill,
  DollarSign,
  FileText,
  Shield
} from "lucide-react";

const ModuleManagementTab = () => {
  const modules = [
    {
      name: "Patient Management",
      description: "Comprehensive patient records and care management",
      icon: <Users className="h-6 w-6" />,
      status: "active",
      version: "v2.1.3",
      usage: 85,
      users: 342,
      uptime: 99.9,
      dependencies: ["User Management", "Security"]
    },
    {
      name: "Doctor Portal",
      description: "Medical staff interface and tools",
      icon: <Stethoscope className="h-6 w-6" />,
      status: "active",
      version: "v1.8.7",
      usage: 78,
      users: 89,
      uptime: 99.8,
      dependencies: ["Patient Management", "Pharmacy"]
    },
    {
      name: "Pharmacy System",
      description: "Drug inventory and prescription management",
      icon: <Pill className="h-6 w-6" />,
      status: "maintenance",
      version: "v1.5.2",
      usage: 65,
      users: 45,
      uptime: 95.2,
      dependencies: ["Inventory", "Doctor Portal"]
    },
    {
      name: "Finance Dashboard",
      description: "Financial operations and reporting",
      icon: <DollarSign className="h-6 w-6" />,
      status: "active",
      version: "v2.0.1",
      usage: 70,
      users: 23,
      uptime: 99.7,
      dependencies: ["Billing", "Commission Tracking"]
    },
    {
      name: "Commission Tracking",
      description: "Real-time commission calculations",
      icon: <Activity className="h-6 w-6" />,
      status: "active",
      version: "v1.9.5",
      usage: 92,
      users: 67,
      uptime: 99.9,
      dependencies: ["Finance Dashboard", "User Management"]
    },
    {
      name: "Audit & Compliance",
      description: "Security auditing and regulatory compliance",
      icon: <Shield className="h-6 w-6" />,
      status: "disabled",
      version: "v1.3.0",
      usage: 0,
      users: 0,
      uptime: 0,
      dependencies: ["User Management", "Database"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'disabled': return 'bg-red-100 text-red-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99) return 'text-green-600';
    if (uptime >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Module Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
            <Server className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">System modules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Load</CardTitle>
            <Database className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Updates Available</CardTitle>
            <Settings className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Pending updates</p>
          </CardContent>
        </Card>
      </div>

      {/* Module Management */}
      <Card>
        <CardHeader>
          <CardTitle>Module Management</CardTitle>
          <CardDescription>
            Monitor and control all system modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modules.map((module, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-lg ${
                      module.status === 'active' ? 'bg-blue-100 text-blue-600' :
                      module.status === 'maintenance' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {module.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{module.name}</h3>
                        <Badge className={getStatusColor(module.status)}>
                          {module.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {module.version}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{module.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Usage:</span>
                          <div className="mt-1">
                            <Progress value={module.usage} className="h-2" />
                            <span className="text-xs text-muted-foreground">{module.usage}%</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-muted-foreground">Active Users:</span>
                          <div className="font-medium">{module.users}</div>
                        </div>
                        
                        <div>
                          <span className="text-muted-foreground">Uptime:</span>
                          <div className={`font-medium ${getUptimeColor(module.uptime)}`}>
                            {module.uptime}%
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-muted-foreground">Dependencies:</span>
                          <div className="text-xs mt-1">
                            {module.dependencies.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Switch 
                      checked={module.status === 'active' || module.status === 'maintenance'} 
                      disabled={module.status === 'maintenance'}
                    />
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      Logs
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Module Dependencies */}
      <Card>
        <CardHeader>
          <CardTitle>Module Dependencies</CardTitle>
          <CardDescription>
            Understand module relationships and dependencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Module dependency visualization would be displayed here</p>
            <Button variant="outline" className="mt-4">
              View Dependency Graph
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleManagementTab;
