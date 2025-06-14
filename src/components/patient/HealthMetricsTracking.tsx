
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Activity, Heart, Scale, Droplets, Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [selectedMetric, setSelectedMetric] = useState('blood_pressure');
  const [newMetric, setNewMetric] = useState({
    systolic: '',
    diastolic: '',
    weight: '',
    glucose: '',
    heartRate: '',
    notes: ''
  });

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

  const handleAddMetric = () => {
    if (selectedMetric === 'blood_pressure' && (!newMetric.systolic || !newMetric.diastolic)) {
      toast({
        title: "Missing values",
        description: "Please enter both systolic and diastolic values.",
        variant: "destructive"
      });
      return;
    }

    let value = '';
    let systolic, diastolic;

    switch (selectedMetric) {
      case 'blood_pressure':
        value = `${newMetric.systolic}/${newMetric.diastolic}`;
        systolic = Number(newMetric.systolic);
        diastolic = Number(newMetric.diastolic);
        break;
      case 'weight':
        value = newMetric.weight;
        break;
      case 'glucose':
        value = newMetric.glucose;
        break;
      case 'heart_rate':
        value = newMetric.heartRate;
        break;
    }

    if (!value) {
      toast({
        title: "Missing value",
        description: "Please enter a value for the selected metric.",
        variant: "destructive"
      });
      return;
    }

    const newHealthMetric: HealthMetric = {
      id: Date.now().toString(),
      type: selectedMetric as any,
      value,
      systolic,
      diastolic,
      date: new Date(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      notes: newMetric.notes
    };

    setHealthMetrics(prev => [newHealthMetric, ...prev]);
    setNewMetric({
      systolic: '',
      diastolic: '',
      weight: '',
      glucose: '',
      heartRate: '',
      notes: ''
    });

    toast({
      title: "Metric added",
      description: "Your health metric has been recorded successfully."
    });
  };

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
    <div className="space-y-6">
      {/* Overview Cards */}
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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="add-metric">Add Reading</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="add-metric" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Health Reading</CardTitle>
              <CardDescription>Record your latest health measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metric-type">Metric Type</Label>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blood_pressure">Blood Pressure</SelectItem>
                    <SelectItem value="weight">Weight</SelectItem>
                    <SelectItem value="glucose">Blood Glucose</SelectItem>
                    <SelectItem value="heart_rate">Heart Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedMetric === 'blood_pressure' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="systolic">Systolic (mmHg)</Label>
                    <Input
                      id="systolic"
                      type="number"
                      placeholder="120"
                      value={newMetric.systolic}
                      onChange={(e) => setNewMetric(prev => ({ ...prev, systolic: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                    <Input
                      id="diastolic"
                      type="number"
                      placeholder="80"
                      value={newMetric.diastolic}
                      onChange={(e) => setNewMetric(prev => ({ ...prev, diastolic: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {selectedMetric === 'weight' && (
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="68.5"
                    value={newMetric.weight}
                    onChange={(e) => setNewMetric(prev => ({ ...prev, weight: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              )}

              {selectedMetric === 'glucose' && (
                <div>
                  <Label htmlFor="glucose">Blood Glucose (mg/dL)</Label>
                  <Input
                    id="glucose"
                    type="number"
                    placeholder="95"
                    value={newMetric.glucose}
                    onChange={(e) => setNewMetric(prev => ({ ...prev, glucose: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              )}

              {selectedMetric === 'heart_rate' && (
                <div>
                  <Label htmlFor="heart-rate">Heart Rate (bpm)</Label>
                  <Input
                    id="heart-rate"
                    type="number"
                    placeholder="72"
                    value={newMetric.heartRate}
                    onChange={(e) => setNewMetric(prev => ({ ...prev, heartRate: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  id="notes"
                  placeholder="Add any notes about this reading..."
                  value={newMetric.notes}
                  onChange={(e) => setNewMetric(prev => ({ ...prev, notes: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <Button onClick={handleAddMetric} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Reading
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMetricsTracking;
