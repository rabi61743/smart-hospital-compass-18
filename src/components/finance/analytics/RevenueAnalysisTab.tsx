
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Building2, DollarSign } from "lucide-react";

const RevenueAnalysisTab = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departmentRevenue = [
    { department: 'Surgery', revenue: 8500000, percentage: 34, growth: 15.2, patients: 245 },
    { department: 'Cardiology', revenue: 6200000, percentage: 25, growth: 8.7, patients: 312 },
    { department: 'Emergency', revenue: 4800000, percentage: 19, growth: 22.1, patients: 567 },
    { department: 'Radiology', revenue: 3200000, percentage: 13, growth: 5.4, patients: 189 },
    { department: 'Laboratory', revenue: 2300000, percentage: 9, growth: 12.8, patients: 423 }
  ];

  const monthlyTrends = [
    { month: 'Jan', surgery: 7200000, cardiology: 5800000, emergency: 4200000, radiology: 2800000 },
    { month: 'Feb', surgery: 7800000, cardiology: 5900000, emergency: 4400000, radiology: 2900000 },
    { month: 'Mar', surgery: 8500000, cardiology: 6200000, emergency: 4800000, radiology: 3200000 }
  ];

  const pieColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const revenuePerPatient = departmentRevenue.map(dept => ({
    ...dept,
    revenuePerPatient: Math.round(dept.revenue / dept.patients)
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">Revenue Analysis by Department</h4>
          <p className="text-sm text-muted-foreground">Detailed revenue breakdown and performance metrics</p>
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="surgery">Surgery</SelectItem>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
            <SelectItem value="radiology">Radiology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Revenue Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Revenue Distribution</CardTitle>
            <CardDescription>Current quarter revenue breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentRevenue}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ department, percentage }) => `${department}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {departmentRevenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, 'Revenue']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trends</CardTitle>
            <CardDescription>Revenue trends by department over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(0)}L`} />
                <Tooltip 
                  formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, '']}
                />
                <Bar dataKey="surgery" stackId="a" fill="#3B82F6" name="Surgery" />
                <Bar dataKey="cardiology" stackId="a" fill="#10B981" name="Cardiology" />
                <Bar dataKey="emergency" stackId="a" fill="#F59E0B" name="Emergency" />
                <Bar dataKey="radiology" stackId="a" fill="#EF4444" name="Radiology" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance Details */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Metrics</CardTitle>
          <CardDescription>Detailed analysis of revenue performance by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {departmentRevenue
              .filter(dept => selectedDepartment === 'all' || dept.department.toLowerCase() === selectedDepartment)
              .map((dept, index) => (
              <div key={index} className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <div>
                      <h5 className="font-medium">{dept.department}</h5>
                      <p className="text-sm text-muted-foreground">{dept.patients} patients served</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">₹{(dept.revenue / 100000).toFixed(1)}L</div>
                    <Badge variant={dept.growth > 10 ? "default" : "secondary"}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {dept.growth}% growth
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Revenue Share</span>
                      <span>{dept.percentage}%</span>
                    </div>
                    <Progress value={dept.percentage} className="h-2" />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Revenue per Patient</div>
                    <div className="text-lg font-medium">₹{(dept.revenue / dept.patients).toLocaleString()}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Target Achievement</div>
                    <div className="text-lg font-medium text-green-600">
                      {Math.round((dept.revenue / (dept.revenue * 0.9)) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueAnalysisTab;
