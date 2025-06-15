
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Users, HardDrive, Wifi } from "lucide-react";

interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  systemUptime: number;
  dataStorage: number;
  networkLatency: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

interface SystemMetricsGridProps {
  metrics: SystemMetrics;
}

const SystemMetricsGrid = ({ metrics }: SystemMetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
          <Activity className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{metrics.systemUptime}%</div>
          <Progress value={metrics.systemUptime} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">Last 30 days average</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeUsers}</div>
          <p className="text-xs text-muted-foreground">
            of {metrics.totalUsers} total users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Data Storage</CardTitle>
          <HardDrive className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.dataStorage}%</div>
          <Progress value={metrics.dataStorage} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">Storage utilization</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Network Latency</CardTitle>
          <Wifi className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.networkLatency}ms</div>
          <p className="text-xs text-muted-foreground">Average response time</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMetricsGrid;
