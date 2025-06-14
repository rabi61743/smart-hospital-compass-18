
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, Award, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const PerformanceOverviewTab = () => {
  const recentReviews = [
    {
      id: 'REV001',
      employeeName: 'Dr. Sarah Wilson',
      position: 'Senior Cardiologist',
      reviewType: 'Annual Review',
      status: 'completed',
      score: 4.8,
      date: '2024-06-10',
      reviewer: 'Dr. Rajesh Kumar'
    },
    {
      id: 'REV002',
      employeeName: 'Priya Sharma',
      position: 'Nurse Manager',
      reviewType: 'Mid-Year Review',
      status: 'in_progress',
      score: null,
      date: '2024-06-12',
      reviewer: 'Ms. Rita Patel'
    },
    {
      id: 'REV003',
      employeeName: 'John Martinez',
      position: 'Lab Technician',
      reviewType: 'Probation Review',
      status: 'scheduled',
      score: null,
      date: '2024-06-15',
      reviewer: 'Dr. Michael Chen'
    }
  ];

  const upcomingActions = [
    {
      id: 'ACT001',
      type: 'review',
      title: 'Complete Q2 Performance Reviews',
      description: '15 employees pending quarterly review completion',
      dueDate: '2024-06-30',
      priority: 'high'
    },
    {
      id: 'ACT002',
      type: 'salary',
      title: 'Process Salary Revision Approvals',
      description: '8 salary increment proposals awaiting approval',
      dueDate: '2024-07-15',
      priority: 'medium'
    },
    {
      id: 'ACT003',
      type: 'promotion',
      title: 'Finalize Promotion Decisions',
      description: '5 employees under consideration for promotion',
      dueDate: '2024-07-30',
      priority: 'medium'
    }
  ];

  const departmentPerformance = [
    { name: 'Cardiology', avgScore: 4.6, employees: 25, trend: '+0.2' },
    { name: 'Emergency', avgScore: 4.4, employees: 18, trend: '+0.1' },
    { name: 'Laboratory', avgScore: 4.3, employees: 12, trend: '0.0' },
    { name: 'Pharmacy', avgScore: 4.2, employees: 8, trend: '-0.1' },
    { name: 'Administration', avgScore: 4.1, employees: 15, trend: '+0.3' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Performance Reviews</CardTitle>
          <CardDescription>Latest completed and ongoing performance evaluations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReviews.map((review) => (
              <div key={review.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Star className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">{review.employeeName}</div>
                    <div className="text-sm text-muted-foreground">{review.position}</div>
                    <div className="text-xs text-muted-foreground">
                      {review.reviewType} • Reviewer: {review.reviewer}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {review.score && (
                    <div className="text-right">
                      <div className="font-bold text-lg">{review.score}/5.0</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  )}
                  <Badge className={getStatusColor(review.status)}>
                    {review.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Actions</CardTitle>
          <CardDescription>Performance management tasks requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingActions.map((action) => (
              <div key={action.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  {action.type === 'review' && <Star className="h-5 w-5 text-purple-500 mt-0.5" />}
                  {action.type === 'salary' && <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />}
                  {action.type === 'promotion' && <Award className="h-5 w-5 text-orange-500 mt-0.5" />}
                  <div className="space-y-1">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">{action.description}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Due: {new Date(action.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(action.priority)}>
                    {action.priority}
                  </Badge>
                  <Button size="sm">
                    Take Action
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Overview</CardTitle>
          <CardDescription>Average performance scores by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentPerformance.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{dept.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {dept.employees} employees
                    </span>
                    <span className="font-bold">{dept.avgScore}/5.0</span>
                    <span className={`text-sm ${dept.trend.startsWith('+') ? 'text-green-600' : dept.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                      {dept.trend}
                    </span>
                  </div>
                </div>
                <Progress value={dept.avgScore * 20} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Review Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Pending Reviews
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule New Reviews
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Process Salary Revisions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                Review Promotions
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reports & Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <Star className="h-4 w-4 mr-2" />
                Performance Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Improvement Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceOverviewTab;
