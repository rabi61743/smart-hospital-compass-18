
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="space-y-6">
      <HealthMetricsOverview healthMetrics={healthMetrics} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="add-metric">Add Reading</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <HealthMetricsCharts healthMetrics={healthMetrics} />
        </TabsContent>

        <TabsContent value="add-metric" className="space-y-4">
          <AddMetricForm onAddMetric={handleAddMetric} />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <HealthMetricsHistory healthMetrics={healthMetrics} />
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <HealthMetricsCharts healthMetrics={healthMetrics} showTrends={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMetricsTracking;
