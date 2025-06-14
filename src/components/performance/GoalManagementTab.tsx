
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, CheckCircle, Clock, Plus, Filter } from "lucide-react";

const GoalManagementTab = () => {
  const goals = [
    {
      id: 'GOAL001',
      employeeName: 'Dr. Sarah Wilson',
      goalTitle: 'Improve Patient Satisfaction Scores',
      description: 'Achieve 95% patient satisfaction rate in cardiology department',
      category: 'Patient Care',
      priority: 'high',
      status: 'in_progress',
      progress: 85,
      startDate: '2024-01-01',
      targetDate: '2024-12-31',
      milestones: [
        { name: 'Baseline Assessment', completed: true, dueDate: '2024-01-31' },
        { name: 'Training Completion', completed: true, dueDate: '2024-03-31' },
        { name: 'Mid-year Review', completed: false, dueDate: '2024-06-30' },
        { name: 'Final Assessment', completed: false, dueDate: '2024-12-15' }
      ]
    },
    {
      id: 'GOAL002',
      employeeName: 'John Martinez',
      goalTitle: 'Complete Advanced Lab Certification',
      description: 'Obtain advanced certification in molecular diagnostics',
      category: 'Professional Development',
      priority: 'medium',
      status: 'completed',
      progress: 100,
      startDate: '2024-01-15',
      targetDate: '2024-06-30',
      milestones: [
        { name: 'Course Enrollment', completed: true, dueDate: '2024-01-31' },
        { name: 'Module 1 Completion', completed: true, dueDate: '2024-03-15' },
        { name: 'Practical Assessment', completed: true, dueDate: '2024-05-15' },
        { name: 'Final Certification', completed: true, dueDate: '2024-06-30' }
      ]
    },
    {
      id: 'GOAL003',
      employeeName: 'Priya Sharma',
      goalTitle: 'Reduce Emergency Department Wait Times',
      description: 'Implement process improvements to reduce average wait time by 20%',
      category: 'Operational Excellence',
      priority: 'high',
      status: 'at_risk',
      progress: 45,
      startDate: '2024-02-01',
      targetDate: '2024-08-31',
      milestones: [
        { name: 'Current State Analysis', completed: true, dueDate: '2024-02-28' },
        { name: 'Process Redesign', completed: true, dueDate: '2024-04-30' },
        { name: 'Implementation Phase 1', completed: false, dueDate: '2024-06-30' },
        { name: 'Full Implementation', completed: false, dueDate: '2024-08-31' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'at_risk': return 'bg-red-100 text-red-800';
      case 'not_started': return 'bg-gray-100 text-gray-800';
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Patient Care': return 'bg-purple-100 text-purple-800';
      case 'Professional Development': return 'bg-blue-100 text-blue-800';
      case 'Operational Excellence': return 'bg-orange-100 text-orange-800';
      case 'Research': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Goal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Total Goals</p>
              <p className="text-2xl font-bold text-blue-600">{goals.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {goals.filter(g => g.status === 'completed').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">
                {goals.filter(g => g.status === 'in_progress').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Clock className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">At Risk</p>
              <p className="text-2xl font-bold text-red-600">
                {goals.filter(g => g.status === 'at_risk').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter Goals
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Set New Goal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Goals List */}
      <div className="space-y-6">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{goal.goalTitle}</CardTitle>
                  <CardDescription>{goal.description}</CardDescription>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{goal.employeeName}</span>
                    <Badge className={getCategoryColor(goal.category)}>
                      {goal.category}
                    </Badge>
                    <Badge className={getPriorityColor(goal.priority)}>
                      {goal.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <Badge className={getStatusColor(goal.status)}>
                  {goal.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                {/* Timeline */}
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Start: {new Date(goal.startDate).toLocaleDateString()}</span>
                  <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                </div>

                {/* Milestones */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Milestones</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {goal.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          {milestone.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                          )}
                          <span className={`text-sm ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {milestone.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(milestone.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">
                    Update Progress
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalManagementTab;
