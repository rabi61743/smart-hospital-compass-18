
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Activity, Server, Database, TrendingUp } from "lucide-react";

const SystemMonitoringTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Monitoring
          </CardTitle>
          <CardDescription>
            Real-time system performance and health monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Server className="h-4 w-4" />
            <AlertDescription>
              System monitoring dashboard will be implemented here. This includes server health, 
              performance metrics, resource usage, and real-time alerts.
            </AlertDescription>
          </Alert>
          <div className="mt-4 flex gap-2">
            <Button variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              Live Monitoring
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Performance Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitoringTab;
