
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Clock, 
  Heart,
  Activity,
  Award,
  AlertTriangle,
  CheckCircle,
  Download,
  Calendar
} from "lucide-react";

const DoctorAnalyticsTab = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Mock data for patient outcomes
  const patientOutcomes = [
    { period: 'Jan', successful: 85, complications: 8, readmissions: 7 },
    { period: 'Feb', successful: 88, complications: 6, readmissions: 6 },
    { period: 'Mar', successful: 92, complications: 4, readmissions: 4 },
    { period: 'Apr', successful: 90, complications: 5, readmissions: 5 },
    { period: 'May', successful: 94, complications: 3, readmissions: 3 },
    { period: 'Jun', successful: 96, complications: 2, readmissions: 2 }
  ];

  // Mock performance metrics
  const performanceData = [
    { metric: 'Patient Satisfaction', value: 4.8, target: 4.5, trend: 'up' },
    { metric: 'Average Consultation Time', value: 28, target: 30, trend: 'up' },
    { metric: 'Treatment Success Rate', value: 94, target: 90, trend: 'up' },
    { metric: 'Follow-up Compliance', value: 87, target: 85, trend: 'up' },
    { metric: 'Diagnostic Accuracy', value: 96, target: 95, trend: 'stable' },
    { metric: 'Referral Appropriateness', value: 92, target: 90, trend: 'up' }
  ];

  // Mock revenue data
  const revenueData = [
    { month: 'Jan', consultations: 125000, procedures: 245000, total: 370000 },
    { month: 'Feb', consultations: 135000, procedures: 268000, total: 403000 },
    { month: 'Mar', consultations: 142000, procedures: 289000, total: 431000 },
    { month: 'Apr', consultations: 138000, procedures: 275000, total: 413000 },
    { month: 'May', consultations: 155000, procedures: 315000, total: 470000 },
    { month: 'Jun', consultations: 162000, procedures: 342000, total: 504000 }
  ];

  // Mock quality indicators
  const qualityIndicators = [
    { name: 'Medication Errors', value: 0.2, benchmark: 0.5, status: 'excellent' },
    { name: 'Hospital Acquired Infections', value: 1.1, benchmark: 2.0, status: 'good' },
    { name: 'Readmission Rate', value: 8.5, benchmark: 10.0, status: 'good' },
    { name: 'Patient Falls', value: 2.1, benchmark: 3.0, status: 'good' },
    { name: 'Adverse Events', value: 1.8, benchmark: 2.5, status: 'good' },
    { name: 'Clinical Guidelines Adherence', value: 96.8, benchmark: 95.0, status: 'excellent' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Analytics & Reporting Dashboard
          </CardTitle>
          <CardDescription>
            Comprehensive analytics for patient outcomes, performance metrics, and quality indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Patients Treated</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">96%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+2% improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹5.04L</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+18% growth</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Consultation</p>
                <p className="text-2xl font-bold">28min</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">2min faster</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="outcomes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="outcomes">Patient Outcomes</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Reports</TabsTrigger>
          <TabsTrigger value="quality">Quality Indicators</TabsTrigger>
        </TabsList>

        <TabsContent value="outcomes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Outcomes Trend</CardTitle>
                <CardDescription>Monthly tracking of treatment success and complications</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={patientOutcomes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="successful" stackId="1" stroke="#8884d8" fill="#8884d8" name="Successful" />
                    <Area type="monotone" dataKey="complications" stackId="1" stroke="#ff7300" fill="#ff7300" name="Complications" />
                    <Area type="monotone" dataKey="readmissions" stackId="1" stroke="#ffc658" fill="#ffc658" name="Readmissions" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outcome Distribution</CardTitle>
                <CardDescription>Current month outcome breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Successful', value: 96, fill: '#8884d8' },
                        { name: 'Complications', value: 2, fill: '#ff7300' },
                        { name: 'Readmissions', value: 2, fill: '#ffc658' }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {patientOutcomes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Outcome Metrics</CardTitle>
              <CardDescription>Critical patient outcome indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-green-900 mb-1">Mortality Rate</h4>
                  <p className="text-2xl font-bold text-green-600">0.8%</p>
                  <p className="text-sm text-green-700">Below benchmark (1.2%)</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-blue-900 mb-1">Recovery Time</h4>
                  <p className="text-2xl font-bold text-blue-600">5.2 days</p>
                  <p className="text-sm text-blue-700">1.8 days faster than avg</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-medium text-purple-900 mb-1">Patient Satisfaction</h4>
                  <p className="text-2xl font-bold text-purple-600">4.8/5</p>
                  <p className="text-sm text-purple-700">Above target (4.5)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics Overview</CardTitle>
              <CardDescription>Key performance indicators and targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((metric) => (
                  <div key={metric.metric} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getTrendIcon(metric.trend)}
                      <div>
                        <h4 className="font-medium">{metric.metric}</h4>
                        <p className="text-sm text-muted-foreground">
                          Target: {metric.metric.includes('Time') ? `${metric.target} min` : 
                                  metric.metric.includes('Satisfaction') ? `${metric.target}/5` : `${metric.target}%`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {metric.metric.includes('Time') ? `${metric.value} min` : 
                         metric.metric.includes('Satisfaction') ? `${metric.value}/5` : `${metric.value}%`}
                      </p>
                      <div className="w-24 mt-2">
                        <Progress 
                          value={metric.metric.includes('Satisfaction') ? (metric.value / 5) * 100 : 
                                 metric.metric.includes('Time') ? Math.max(0, 100 - ((metric.value / metric.target) * 100)) :
                                 (metric.value / metric.target) * 100} 
                          className="h-2" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue breakdown by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']} />
                  <Legend />
                  <Bar dataKey="consultations" fill="#8884d8" name="Consultations" />
                  <Bar dataKey="procedures" fill="#82ca9d" name="Procedures" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Revenue per Patient</p>
                  <p className="text-2xl font-bold">₹4,042</p>
                  <p className="text-sm text-green-600">+8% from last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
                  <p className="text-2xl font-bold">94.2%</p>
                  <p className="text-sm text-green-600">Above target (90%)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Outstanding Amount</p>
                  <p className="text-2xl font-bold">₹28,450</p>
                  <p className="text-sm text-red-600">5.8% of total revenue</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quality Indicators</CardTitle>
              <CardDescription>Key quality metrics and benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {qualityIndicators.map((indicator) => (
                  <div key={indicator.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{indicator.name}</h4>
                      <Badge className={getStatusColor(indicator.status)}>
                        {indicator.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold">
                          {indicator.name.includes('Adherence') ? `${indicator.value}%` : 
                           indicator.name.includes('Rate') ? `${indicator.value}%` : `${indicator.value}%`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Benchmark: {indicator.name.includes('Adherence') ? `${indicator.benchmark}%` : 
                                     indicator.name.includes('Rate') ? `${indicator.benchmark}%` : `${indicator.benchmark}%`}
                        </p>
                      </div>
                      {indicator.status === 'excellent' ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : indicator.status === 'good' ? (
                        <Activity className="h-6 w-6 text-blue-600" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 text-yellow-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorAnalyticsTab;
