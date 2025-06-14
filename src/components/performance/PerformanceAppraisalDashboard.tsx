
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star, Users, Calendar, Award, DollarSign } from "lucide-react";
import PerformanceOverviewTab from './PerformanceOverviewTab';
import PerformanceReviewsTab from './PerformanceReviewsTab';
import SalaryRevisionsTab from './SalaryRevisionsTab';
import PromotionTrackingTab from './PromotionTrackingTab';
import GoalManagementTab from './GoalManagementTab';
import PerformanceAnalyticsTab from './PerformanceAnalyticsTab';

const PerformanceAppraisalDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for performance stats
  const performanceStats = {
    totalEmployees: 156,
    reviewsCompleted: 134,
    reviewsPending: 22,
    avgPerformanceScore: 4.2,
    promotionsThisYear: 18,
    salaryRevisionsPlanned: 45,
    highPerformers: 28,
    improvementPlans: 12
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                Performance & Appraisal
              </h1>
              <p className="text-gray-600 mt-1">
                Comprehensive performance management, reviews, and career development system
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Reviews
              </Button>
              <Button>
                <Star className="h-4 w-4 mr-2" />
                Start Review Cycle
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold text-blue-600">
                  {performanceStats.totalEmployees}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Reviews Done</p>
                <p className="text-2xl font-bold text-green-600">
                  {performanceStats.reviewsCompleted}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {performanceStats.reviewsPending}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-2xl font-bold text-purple-600">
                  {performanceStats.avgPerformanceScore}/5
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Promotions</p>
                <p className="text-2xl font-bold text-orange-600">
                  {performanceStats.promotionsThisYear}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <DollarSign className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Salary Revisions</p>
                <p className="text-2xl font-bold text-teal-600">
                  {performanceStats.salaryRevisionsPlanned}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Star className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">High Performers</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {performanceStats.highPerformers}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Improvement Plans</p>
                <p className="text-2xl font-bold text-red-600">
                  {performanceStats.improvementPlans}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Performance Reviews</TabsTrigger>
            <TabsTrigger value="salary-revisions">Salary Revisions</TabsTrigger>
            <TabsTrigger value="promotions">Promotion Tracking</TabsTrigger>
            <TabsTrigger value="goals">Goal Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PerformanceOverviewTab />
          </TabsContent>

          <TabsContent value="reviews">
            <PerformanceReviewsTab />
          </TabsContent>

          <TabsContent value="salary-revisions">
            <SalaryRevisionsTab />
          </TabsContent>

          <TabsContent value="promotions">
            <PromotionTrackingTab />
          </TabsContent>

          <TabsContent value="goals">
            <GoalManagementTab />
          </TabsContent>

          <TabsContent value="analytics">
            <PerformanceAnalyticsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerformanceAppraisalDashboard;
