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
        if (sys < 120 && dia < 80) return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Normal</Badge>;
        if (sys < 140 && dia < 90) return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Elevated</Badge>;
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">High</Badge>;
      case 'weight':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Stable</Badge>;
      case 'glucose':
        const glucose = Number(value);
        if (glucose < 100) return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Normal</Badge>;
        if (glucose < 126) return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pre-diabetic</Badge>;
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">High</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Normal</Badge>;
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
    <div className="w-full overflow-x-auto pb-2">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 min-w-max lg:min-w-0">
        <Card className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-red-500 min-w-[140px] lg:min-w-0">
          <CardContent className="p-2 sm:p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground">Blood Pressure</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{latestMetrics.blood_pressure?.value || 'N/A'}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {latestMetrics.blood_pressure?.date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                <div className="p-1 sm:p-2 bg-red-50 rounded-full">
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                </div>
                {latestMetrics.blood_pressure && (
                  <div className="scale-75 sm:scale-100 origin-top-right">
                    {getStatusBadge('blood_pressure', latestMetrics.blood_pressure.value)}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-blue-500 min-w-[140px] lg:min-w-0">
          <CardContent className="p-2 sm:p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground">Weight</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{latestMetrics.weight?.value || 'N/A'} <span className="text-sm text-muted-foreground">kg</span></p>
                <p className="text-xs text-muted-foreground truncate">
                  {latestMetrics.weight?.date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                <div className="p-1 sm:p-2 bg-blue-50 rounded-full">
                  <Scale className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                </div>
                {latestMetrics.weight && (
                  <div className="scale-75 sm:scale-100 origin-top-right">
                    {getStatusBadge('weight', latestMetrics.weight.value)}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-purple-500 min-w-[140px] lg:min-w-0">
          <CardContent className="p-2 sm:p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground">Glucose</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{latestMetrics.glucose?.value || 'N/A'} <span className="text-sm text-muted-foreground">mg/dL</span></p>
                <p className="text-xs text-muted-foreground truncate">
                  {latestMetrics.glucose?.date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                <div className="p-1 sm:p-2 bg-purple-50 rounded-full">
                  <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                </div>
                {latestMetrics.glucose && (
                  <div className="scale-75 sm:scale-100 origin-top-right">
                    {getStatusBadge('glucose', latestMetrics.glucose.value)}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-green-500 min-w-[140px] lg:min-w-0">
          <CardContent className="p-2 sm:p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground">Heart Rate</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{latestMetrics.heart_rate?.value || 'N/A'} <span className="text-sm text-muted-foreground">bpm</span></p>
                <p className="text-xs text-muted-foreground truncate">
                  {latestMetrics.heart_rate?.date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                <div className="p-1 sm:p-2 bg-green-50 rounded-full">
                  <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                </div>
                <div className="scale-75 sm:scale-100 origin-top-right">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Normal</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthMetricsOverview;
