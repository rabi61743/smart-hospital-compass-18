
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, CheckCircle, Clock, AlertTriangle, Activity, Settings } from "lucide-react";

interface SystemModule {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  status: string;
  uptime: string;
  activeUsers: number;
  lastUpdate: string;
  version: string;
  criticalAlerts: number;
}

interface SystemModulesOverviewProps {
  modules: SystemModule[];
}

const SystemModulesOverview = ({ modules }: SystemModulesOverviewProps) => {
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

  return (
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
              {modules.map((module) => {
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
              {modules.map((module) => {
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
  );
};

export default SystemModulesOverview;
