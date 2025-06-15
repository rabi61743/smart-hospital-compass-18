
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PerformanceMetricsProps {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

const PerformanceMetrics = ({ cpuUsage, memoryUsage, diskUsage }: PerformanceMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">CPU Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{cpuUsage}%</div>
          <Progress value={cpuUsage} className="mb-2" />
          <p className="text-xs text-muted-foreground">Normal operating range</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Memory Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{memoryUsage}%</div>
          <Progress value={memoryUsage} className="mb-2" />
          <p className="text-xs text-muted-foreground">Within acceptable limits</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Disk Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{diskUsage}%</div>
          <Progress value={diskUsage} className="mb-2" />
          <p className="text-xs text-muted-foreground">Optimal storage levels</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
