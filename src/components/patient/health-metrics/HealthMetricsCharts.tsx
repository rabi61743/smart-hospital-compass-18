
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Heart, Scale, Droplets, TrendingUp, TrendingDown, Minus } from "lucide-react";

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

interface HealthMetricsChartsProps {
  healthMetrics: HealthMetric[];
  showTrends?: boolean;
}

const HealthMetricsCharts = ({ healthMetrics, showTrends = false }: HealthMetricsChartsProps) => {
  const getChartData = (type: string) => {
    return healthMetrics
      .filter(metric => metric.type === type)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map(metric => ({
        date: metric.date.toLocaleDateString(),
        value: type === 'blood_pressure' ? metric.systolic : Number(metric.value),
        diastolic: type === 'blood_pressure' ? metric.diastolic : undefined
      }));
  };

  if (showTrends) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Glucose Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ value: { label: "Glucose (mg/dL)", color: "#8b5cf6" } }} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData('glucose')}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-red-600" />
                  <span className="font-medium">Blood Pressure</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">Avg: 119/79</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    Improving
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Scale className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Weight</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">68.4 kg</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Minus className="w-4 h-4 mr-1" />
                    Stable
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Droplets className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Glucose</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">95 mg/dL</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    Good control
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Blood Pressure Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ systolic: { label: "Systolic", color: "#ef4444" }, diastolic: { label: "Diastolic", color: "#3b82f6" } }} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData('blood_pressure')}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="value" stroke="#ef4444" name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" name="Diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weight Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ value: { label: "Weight (kg)", color: "#3b82f6" } }} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData('weight')}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetricsCharts;
