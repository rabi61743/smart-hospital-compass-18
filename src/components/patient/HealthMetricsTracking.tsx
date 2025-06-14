
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
    <div className="space-y-8">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900">Health Metrics Dashboard</CardTitle>
          <CardDescription className="text-base text-gray-600">
            Track and monitor your vital health measurements over time
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overview Cards */}
      <HealthMetricsOverview healthMetrics={healthMetrics} />

      {/* Tabs Section */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-50">
              <TabsTrigger value="overview" className="text-sm font-medium">Charts</TabsTrigger>
              <TabsTrigger value="add-metric" className="text-sm font-medium">Add Reading</TabsTrigger>
              <TabsTrigger value="history" className="text-sm font-medium">History</TabsTrigger>
              <TabsTrigger value="trends" className="text-sm font-medium">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <HealthMetricsCharts healthMetrics={healthMetrics} />
            </TabsContent>

            <TabsContent value="add-metric" className="space-y-6 mt-6">
              <AddMetricForm onAddMetric={handleAddMetric} />
            </TabsContent>

            <TabsContent value="history" className="space-y-6 mt-6">
              <HealthMetricsHistory healthMetrics={healthMetrics} />
            </TabsContent>

            <TabsContent value="trends" className="space-y-6 mt-6">
              <HealthMetricsCharts healthMetrics={healthMetrics} showTrends={true} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetricsTracking;
