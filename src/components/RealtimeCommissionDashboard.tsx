
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

interface DoctorCommissionTrend {
  date: string;
  doctor: string;
  amount: number;
  consultations: number;
  surgeries: number;
}

interface DashboardStats {
  totalCommission: number;
  totalConsultations: number;
  totalSurgeries: number;
  averageCommission: number;
  trend: number;
}

const RealtimeCommissionDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [data, setData] = useState<DoctorCommissionTrend[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Simulate real-time data updates
  useEffect(() => {
    const generateMockData = () => {
      const doctors = ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Davis', 'Dr. Robert Wilson'];
      const mockData: DoctorCommissionTrend[] = [];
      
      const days = selectedPeriod === 'daily' ? 7 : 12; // 7 days or 12 weeks
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        if (selectedPeriod === 'daily') {
          date.setDate(date.getDate() - i);
        } else {
          date.setDate(date.getDate() - (i * 7));
        }
        
        doctors.forEach(doctor => {
          const consultations = Math.floor(Math.random() * 20) + 5;
          const surgeries = Math.floor(Math.random() * 8) + 1;
          const baseRate = doctor === 'Dr. Robert Wilson' ? 18 : 
                          doctor === 'Dr. Sarah Johnson' ? 15 : 
                          doctor === 'Dr. Michael Chen' ? 12 : 10;
          
          const amount = (consultations * 500 * baseRate / 100) + (surgeries * 5000 * baseRate / 100);
          
          mockData.push({
            date: selectedPeriod === 'daily' ? 
              date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) :
              `Week ${Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 7)) + 1}`,
            doctor,
            amount: Math.round(amount),
            consultations,
            surgeries
          });
        });
      }
      
      return mockData;
    };

    const updateData = () => {
      const newData = generateMockData();
      setData(newData);
      
      // Calculate stats
      const filteredData = selectedDoctor === 'all' ? newData : newData.filter(d => d.doctor === selectedDoctor);
      const totalCommission = filteredData.reduce((sum, d) => sum + d.amount, 0);
      const totalConsultations = filteredData.reduce((sum, d) => sum + d.consultations, 0);
      const totalSurgeries = filteredData.reduce((sum, d) => sum + d.surgeries, 0);
      const averageCommission = Math.round(totalCommission / filteredData.length);
      
      // Calculate trend (comparing first half vs second half)
      const midPoint = Math.floor(filteredData.length / 2);
      const firstHalf = filteredData.slice(0, midPoint);
      const secondHalf = filteredData.slice(midPoint);
      const firstHalfAvg = firstHalf.reduce((sum, d) => sum + d.amount, 0) / firstHalf.length;
      const secondHalfAvg = secondHalf.reduce((sum, d) => sum + d.amount, 0) / secondHalf.length;
      const trend = Math.round(((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100);
      
      setStats({
        totalCommission,
        totalConsultations,
        totalSurgeries,
        averageCommission,
        trend
      });
    };

    updateData();
    const interval = setInterval(updateData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [selectedPeriod, selectedDoctor]);

  const chartConfig = {
    amount: {
      label: "Commission Amount",
      color: "hsl(var(--chart-1))",
    },
    consultations: {
      label: "Consultations",
      color: "hsl(var(--chart-2))",
    },
    surgeries: {
      label: "Surgeries",
      color: "hsl(var(--chart-3))",
    },
  };

  const aggregatedData = data.reduce((acc, curr) => {
    const existing = acc.find(item => item.date === curr.date);
    if (existing) {
      existing.amount += curr.amount;
      existing.consultations += curr.consultations;
      existing.surgeries += curr.surgeries;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, [] as DoctorCommissionTrend[]);

  const doctorTotals = data.reduce((acc, curr) => {
    if (!acc[curr.doctor]) {
      acc[curr.doctor] = { doctor: curr.doctor, amount: 0, consultations: 0, surgeries: 0 };
    }
    acc[curr.doctor].amount += curr.amount;
    acc[curr.doctor].consultations += curr.consultations;
    acc[curr.doctor].surgeries += curr.surgeries;
    return acc;
  }, {} as Record<string, any>);

  const pieData = Object.values(doctorTotals).map((doctor: any) => ({
    name: doctor.doctor.split(' ').slice(-1)[0], // Last name only
    value: doctor.amount,
    fullName: doctor.doctor
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Real-time Commission Dashboard</h2>
          <p className="text-gray-600">Live tracking of doctor commission trends</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Doctors</SelectItem>
              <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
              <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
              <SelectItem value="Dr. Emily Davis">Dr. Emily Davis</SelectItem>
              <SelectItem value="Dr. Robert Wilson">Dr. Robert Wilson</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalCommission.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.trend > 0 ? '+' : ''}{stats.trend}% from last period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultations</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalConsultations}</div>
              <p className="text-xs text-muted-foreground">Total appointments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Surgeries</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSurgeries}</div>
              <p className="text-xs text-muted-foreground">Total procedures</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Commission</CardTitle>
              {stats.trend > 0 ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.averageCommission.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Per time period</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Commission Trends</TabsTrigger>
          <TabsTrigger value="activity">Activity Breakdown</TabsTrigger>
          <TabsTrigger value="distribution">Commission Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Commission Trends Over Time</CardTitle>
              <CardDescription>
                {selectedPeriod === 'daily' ? 'Daily' : 'Weekly'} commission trends 
                {selectedDoctor !== 'all' ? ` for ${selectedDoctor}` : ' for all doctors'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={selectedDoctor === 'all' ? aggregatedData : data.filter(d => d.doctor === selectedDoctor)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="amount" stroke="var(--color-amount)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Breakdown</CardTitle>
              <CardDescription>Consultations and surgeries over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={selectedDoctor === 'all' ? aggregatedData : data.filter(d => d.doctor === selectedDoctor)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="consultations" fill="var(--color-consultations)" />
                    <Bar dataKey="surgeries" fill="var(--color-surgeries)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Commission Distribution</CardTitle>
              <CardDescription>Commission breakdown by doctor</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-2 border rounded shadow">
                              <p className="font-medium">{data.fullName}</p>
                              <p className="text-sm">₹{data.value.toLocaleString()}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealtimeCommissionDashboard;
