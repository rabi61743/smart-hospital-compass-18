
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HealthMetricsOverview from './health-metrics/HealthMetricsOverview';
import AddMetricForm from './health-metrics/AddMetricForm';
import HealthMetricsHistory from './health-metrics/HealthMetricsHistory';
import HealthMetricsCharts from './health-metrics/HealthMetricsCharts';

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

const HealthMetricsTracking = () => {
  // Mock health metrics data
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    {
      id: '1',
      type: 'blood_pressure',
      value: '120/80',
      systolic: 120,
      diastolic: 80,
      date: new Date('2024-01-28'),
      time: '09:30',
      notes: 'Morning reading'
    },
    {
      id: '2',
      type: 'weight',
      value: '68.5',
      date: new Date('2024-01-28'),
      time: '08:00',
      notes: 'After morning workout'
    },
    {
      id: '3',
      type: 'glucose',
      value: '95',
      date: new Date('2024-01-28'),
      time: '07:45',
      notes: 'Fasting glucose'
    },
    {
      id: '4',
      type: 'blood_pressure',
      value: '118/78',
      systolic: 118,
      diastolic: 78,
      date: new Date('2024-01-27'),
      time: '19:15',
      notes: 'Evening reading'
    },
    {
      id: '5',
      type: 'weight',
      value: '68.2',
      date: new Date('2024-01-27'),
      time: '08:00'
    }
  ]);

  const handleAddMetric = (newMetric: HealthMetric) => {
    setHealthMetrics(prev => [newMetric, ...prev]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 px-2 sm:px-4">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0 shadow-sm">
        <CardHeader className="pb-3 px-3 sm:px-6">
          <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">Health Metrics Dashboard</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Track and monitor your vital health measurements over time
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overview Cards */}
      <div className="w-full">
        <HealthMetricsOverview healthMetrics={healthMetrics} />
      </div>

      {/* Tabs Section */}
      <Card className="shadow-sm w-full">
        <CardContent className="p-2 sm:p-4">
          <Tabs defaultValue="overview" className="space-y-3 sm:space-y-4">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-4 bg-gray-50 min-w-max">
                <TabsTrigger value="overview" className="text-xs font-medium whitespace-nowrap px-2 py-1">Charts</TabsTrigger>
                <TabsTrigger value="add-metric" className="text-xs font-medium whitespace-nowrap px-2 py-1">Add Reading</TabsTrigger>
                <TabsTrigger value="history" className="text-xs font-medium whitespace-nowrap px-2 py-1">History</TabsTrigger>
                <TabsTrigger value="trends" className="text-xs font-medium whitespace-nowrap px-2 py-1">Trends</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
              <HealthMetricsCharts healthMetrics={healthMetrics} />
            </TabsContent>

            <TabsContent value="add-metric" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
              <AddMetricForm onAddMetric={handleAddMetric} />
            </TabsContent>

            <TabsContent value="history" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
              <HealthMetricsHistory healthMetrics={healthMetrics} />
            </TabsContent>

            <TabsContent value="trends" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
              <HealthMetricsCharts healthMetrics={healthMetrics} showTrends={true} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetricsTracking;
