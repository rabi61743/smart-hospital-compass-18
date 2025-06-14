
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface HealthMetricsOverviewProps {
  healthMetrics: HealthMetric[];
}

const HealthMetricsOverview = ({ healthMetrics }: HealthMetricsOverviewProps) => {
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

  const getLatestMetrics = () => {
    const latest = {
      blood_pressure: healthMetrics.find(m => m.type === 'blood_pressure'),
      weight: healthMetrics.find(m => m.type === 'weight'),
      glucose: healthMetrics.find(m => m.type === 'glucose'),
      heart_rate: healthMetrics.find(m => m.type === 'heart_rate')
    };
    return latest;
  };

  const latestMetrics = getLatestMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Blood Pressure</p>
              <p className="text-2xl font-bold">{latestMetrics.blood_pressure?.value || 'N/A'}</p>
              <p className="text-xs text-muted-foreground">
                {latestMetrics.blood_pressure?.date.toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Heart className="h-8 w-8 text-red-600" />
              {latestMetrics.blood_pressure && getStatusBadge('blood_pressure', latestMetrics.blood_pressure.value)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="text-2xl font-bold">{latestMetrics.weight?.value || 'N/A'} kg</p>
              <p className="text-xs text-muted-foreground">
                {latestMetrics.weight?.date.toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Scale className="h-8 w-8 text-blue-600" />
              {latestMetrics.weight && getStatusBadge('weight', latestMetrics.weight.value)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Glucose</p>
              <p className="text-2xl font-bold">{latestMetrics.glucose?.value || 'N/A'} mg/dL</p>
              <p className="text-xs text-muted-foreground">
                {latestMetrics.glucose?.date.toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Droplets className="h-8 w-8 text-purple-600" />
              {latestMetrics.glucose && getStatusBadge('glucose', latestMetrics.glucose.value)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Heart Rate</p>
              <p className="text-2xl font-bold">{latestMetrics.heart_rate?.value || 'N/A'} bpm</p>
              <p className="text-xs text-muted-foreground">
                {latestMetrics.heart_rate?.date.toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Activity className="h-8 w-8 text-green-600" />
              <Badge className="bg-green-100 text-green-800">Normal</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetricsOverview;
