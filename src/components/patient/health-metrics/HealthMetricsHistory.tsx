
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Heart, Scale, Droplets } from "lucide-react";

interface HealthMetric {
  id: string;
  type: 'blood_pressure' | 'weight' | 'glucose' | 'heart_rate';
  value: string;
  systolic?: number;
  diastolic?: number;
  date: Date;
  time: string;
  notes?: string;
}

interface HealthMetricsHistoryProps {
  healthMetrics: HealthMetric[];
}

const HealthMetricsHistory = ({ healthMetrics }: HealthMetricsHistoryProps) => {
  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'blood_pressure': return <Heart className="w-5 h-5" />;
      case 'weight': return <Scale className="w-5 h-5" />;
      case 'glucose': return <Droplets className="w-5 h-5" />;
      case 'heart_rate': return <Activity className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getMetricColor = (type: string) => {
    switch (type) {
      case 'blood_pressure': return 'text-red-600';
      case 'weight': return 'text-blue-600';
      case 'glucose': return 'text-purple-600';
      case 'heart_rate': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (type: string, value: string) => {
    switch (type) {
      case 'blood_pressure':
        const [sys, dia] = value.split('/').map(Number);
        if (sys < 120 && dia < 80) return <Badge className="bg-green-100 text-green-800">Normal</Badge>;
        if (sys < 140 && dia < 90) return <Badge className="bg-yellow-100 text-yellow-800">Elevated</Badge>;
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'weight':
        return <Badge className="bg-blue-100 text-blue-800">Stable</Badge>;
      case 'glucose':
        const glucose = Number(value);
        if (glucose < 100) return <Badge className="bg-green-100 text-green-800">Normal</Badge>;
        if (glucose < 126) return <Badge className="bg-yellow-100 text-yellow-800">Pre-diabetic</Badge>;
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Normal</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics History</CardTitle>
        <CardDescription>Your recorded health measurements</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {healthMetrics.map((metric) => (
              <TableRow key={metric.id}>
                <TableCell>{metric.date.toLocaleDateString()}</TableCell>
                <TableCell>{metric.time}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className={getMetricColor(metric.type)}>
                      {getMetricIcon(metric.type)}
                    </span>
                    <span className="capitalize">{metric.type.replace('_', ' ')}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {metric.value} {metric.type === 'weight' ? 'kg' : metric.type === 'glucose' ? 'mg/dL' : metric.type === 'heart_rate' ? 'bpm' : 'mmHg'}
                </TableCell>
                <TableCell>{getStatusBadge(metric.type, metric.value)}</TableCell>
                <TableCell>{metric.notes || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HealthMetricsHistory;
