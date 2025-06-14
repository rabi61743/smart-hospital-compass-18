
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, Clock, Download } from "lucide-react";

const ComplianceTrackingTab = () => {
  const complianceMetrics = [
    {
      category: 'Data Protection',
      score: 98,
      status: 'compliant',
      issues: 0,
      lastCheck: '2024-06-14',
      description: 'GDPR and patient data privacy compliance'
    },
    {
      category: 'Financial Regulations',
      score: 95,
      status: 'compliant',
      issues: 1,
      lastCheck: '2024-06-13',
      description: 'Healthcare billing and financial regulations'
    },
    {
      category: 'Audit Requirements',
      score: 92,
      status: 'warning',
      issues: 3,
      lastCheck: '2024-06-12',
      description: 'Internal audit and documentation requirements'
    },
    {
      category: 'Tax Compliance',
      score: 100,
      status: 'compliant',
      issues: 0,
      lastCheck: '2024-06-14',
      description: 'GST and income tax compliance tracking'
    }
  ];

  const recentIssues = [
    {
      id: 'COMP-001',
      severity: 'medium',
      category: 'Audit Requirements',
      title: 'Missing documentation for commission payments',
      description: 'Some commission payments lack proper approval documentation',
      dueDate: '2024-06-20',
      assignee: 'Finance Team'
    },
    {
      id: 'COMP-002',
      severity: 'low',
      category: 'Financial Regulations',
      title: 'Delayed expense report submission',
      description: 'Monthly expense reports submitted 2 days late',
      dueDate: '2024-06-18',
      assignee: 'Dr. Rajesh Kumar'
    },
    {
      id: 'COMP-003',
      severity: 'medium',
      category: 'Audit Requirements',
      title: 'Incomplete transaction logs',
      description: 'Some refund transactions missing detailed reasoning',
      dueDate: '2024-06-22',
      assignee: 'IT Department'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">Compliance Tracking</h4>
          <p className="text-sm text-muted-foreground">Monitor regulatory compliance and audit requirements</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Compliance Report
        </Button>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {getStatusIcon(metric.status)}
                {metric.category}
              </CardTitle>
              <Badge className={getStatusColor(metric.status)}>
                {metric.status.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.score}%</span>
                  <span className="text-sm text-muted-foreground">
                    {metric.issues} issues
                  </span>
                </div>
                <Progress value={metric.score} className="w-full" />
                <p className="text-xs text-muted-foreground">{metric.description}</p>
                <div className="text-xs text-muted-foreground">
                  Last checked: {new Date(metric.lastCheck).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Issues</CardTitle>
          <CardDescription>Issues requiring attention to maintain compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(issue.severity)}>
                      {issue.severity.toUpperCase()}
                    </Badge>
                    <span className="font-medium">{issue.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{issue.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Category: {issue.category}</span>
                    <span>Due: {new Date(issue.dueDate).toLocaleDateString()}</span>
                    <span>Assignee: {issue.assignee}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common compliance management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Run Compliance Check</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <Download className="h-4 w-4" />
              <span className="text-sm">Generate Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Review Issues</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceTrackingTab;
