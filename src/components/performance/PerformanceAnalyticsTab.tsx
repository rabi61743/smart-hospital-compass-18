
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Award, Target, Star } from "lucide-react";

const PerformanceAnalyticsTab = () => {
  const performanceTrends = [
    { month: 'Jan', avgScore: 4.1, reviews: 25 },
    { month: 'Feb', avgScore: 4.2, reviews: 28 },
    { month: 'Mar', avgScore: 4.3, reviews: 30 },
    { month: 'Apr', avgScore: 4.2, reviews: 32 },
    { month: 'May', avgScore: 4.4, reviews: 29 },
    { month: 'Jun', avgScore: 4.5, reviews: 31 }
  ];

  const departmentPerformance = [
    { department: 'Cardiology', avgScore: 4.6, employees: 25, promotions: 3 },
    { department: 'Emergency', avgScore: 4.4, employees: 18, promotions: 2 },
    { department: 'Laboratory', avgScore: 4.3, employees: 12, promotions: 1 },
    { department: 'Pharmacy', avgScore: 4.2, employees: 8, promotions: 1 },
    { department: 'Administration', avgScore: 4.1, employees: 15, promotions: 2 }
  ];

  const performanceDistribution = [
    { range: '4.5-5.0', count: 28, percentage: 35.9 },
    { range: '4.0-4.4', count: 31, percentage: 39.7 },
    { range: '3.5-3.9', count: 15, percentage: 19.2 },
    { range: '3.0-3.4', count: 3, percentage: 3.8 },
    { range: 'Below 3.0', count: 1, percentage: 1.3 }
  ];

  const goalCompletionData = [
    { name: 'Completed', value: 65, color: '#10B981' },
    { name: 'In Progress', value: 28, color: '#3B82F6' },
    { name: 'At Risk', value: 7, color: '#EF4444' }
  ];

  const topPerformers = [
    { name: 'Dr. Sarah Wilson', department: 'Cardiology', score: 4.8, goals: 95 },
    { name: 'John Martinez', department: 'Laboratory', score: 4.7, goals: 100 },
    { name: 'Priya Sharma', department: 'Emergency', score: 4.6, goals: 85 },
    { name: 'Lisa Thompson', department: 'Pharmacy', score: 4.5, goals: 90 },
    { name: 'Michael Brown', department: 'Administration', score: 4.5, goals: 88 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Avg Performance</p>
              <p className="text-2xl font-bold text-purple-600">4.4/5.0</p>
              <p className="text-xs text-green-600">+0.2 from last quarter</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Goal Achievement</p>
              <p className="text-2xl font-bold text-blue-600">85%</p>
              <p className="text-xs text-green-600">+5% from last quarter</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">High Performers</p>
              <p className="text-2xl font-bold text-orange-600">36%</p>
              <p className="text-xs text-green-600">+3% from last quarter</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Promotion Rate</p>
              <p className="text-2xl font-bold text-green-600">12%</p>
              <p className="text-xs text-green-600">+2% from last year</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Monthly average performance scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[3.5, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="avgScore" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goal Completion Status</CardTitle>
            <CardDescription>Distribution of goal completion across organization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={goalCompletionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {goalCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Comparison</CardTitle>
          <CardDescription>Average performance scores and promotion rates by department</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis yAxisId="left" domain={[3.5, 5]} />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="avgScore" fill="#8884d8" name="Avg Score" />
              <Bar yAxisId="right" dataKey="promotions" fill="#82ca9d" name="Promotions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Distribution & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Score Distribution</CardTitle>
            <CardDescription>Distribution of employee performance ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceDistribution.map((range, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{range.range}</span>
                    <span className="text-sm text-muted-foreground">
                      {range.count} employees ({range.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${range.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Highest performing employees this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{performer.name}</div>
                      <div className="text-sm text-muted-foreground">{performer.department}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{performer.score}/5.0</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{performer.goals}% goals</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights & Recommendations</CardTitle>
          <CardDescription>AI-powered insights based on performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-green-600">Positive Trends</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm">Overall performance scores have improved by 5% this quarter</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm">Goal completion rate is at an all-time high of 85%</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm">Cardiology department shows exceptional performance consistency</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-orange-600">Areas for Improvement</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <p className="text-sm">Consider additional training for employees in 3.5-3.9 range</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <p className="text-sm">Focus on goal-setting workshops for underperforming departments</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <p className="text-sm">Implement mentorship programs to boost mid-level performers</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceAnalyticsTab;
