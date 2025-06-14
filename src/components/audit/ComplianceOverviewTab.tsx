
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, Clock, TrendingUp, FileText } from "lucide-react";

const ComplianceOverviewTab = () => {
  const complianceMetrics = [
    {
      category: 'Data Protection',
      score: 98,
      status: 'excellent',
      issues: 0,
      trend: '+2%',
      lastAudit: '2024-06-10',
      regulations: ['GDPR', 'HIPAA', 'CCPA']
    },
    {
      category: 'Financial Compliance',
      score: 96,
      status: 'excellent',
      issues: 1,
      trend: '+1%',
      lastAudit: '2024-06-08',
      regulations: ['SOX', 'PCI DSS']
    },
    {
      category: 'Healthcare Regulations',
      score: 94,
      status: 'good',
      issues: 2,
      trend: '0%',
      lastAudit: '2024-06-05',
      regulations: ['HIPAA', 'HITECH', 'FDA']
    },
    {
      category: 'IT Security Standards',
      score: 92,
      status: 'good',
      issues: 3,
      trend: '+3%',
      lastAudit: '2024-06-03',
      regulations: ['ISO 27001', 'SOC 2', 'NIST']
    }
  ];

  const recentAudits = [
    {
      id: 'AUD001',
      title: 'HIPAA Compliance Audit',
      auditor: 'External Auditor Inc.',
      date: '2024-06-10',
      status: 'completed',
      score: 98,
      findings: 2,
      recommendations: 3
    },
    {
      id: 'AUD002',
      title: 'Financial Controls Review',
      auditor: 'Internal Audit Team',
      date: '2024-06-08',
      status: 'completed',
      score: 96,
      findings: 1,
      recommendations: 2
    },
    {
      id: 'AUD003',
      title: 'IT Security Assessment',
      auditor: 'CyberSec Solutions',
      date: '2024-06-03',
      status: 'in_progress',
      score: 92,
      findings: 3,
      recommendations: 5
    },
    {
      id: 'AUD004',
      title: 'Data Retention Policy Review',
      auditor: 'Internal Audit Team',
      date: '2024-05-28',
      status: 'scheduled',
      score: null,
      findings: null,
      recommendations: null
    }
  ];

  const complianceAlerts = [
    {
      id: 'ALERT001',
      severity: 'medium',
      title: 'Upcoming GDPR Data Subject Request Deadline',
      description: 'Response due for data subject access request within 5 days',
      dueDate: '2024-06-20',
      category: 'Data Protection'
    },
    {
      id: 'ALERT002',
      severity: 'low',
      title: 'Annual SOX Compliance Review Due',
      description: 'Schedule annual Sarbanes-Oxley compliance review for Q3',
      dueDate: '2024-07-31',
      category: 'Financial Compliance'
    },
    {
      id: 'ALERT003',
      severity: 'high',
      title: 'Security Incident Response Plan Update',
      description: 'Security incident response procedures need updating per ISO 27001',
      dueDate: '2024-06-25',
      category: 'IT Security'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'needs_improvement': return 'bg-yellow-100 text-yellow-800';
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

  const getAuditStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Compliance Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Overall Compliance Dashboard
          </CardTitle>
          <CardDescription>Comprehensive view of organizational compliance status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {complianceMetrics.map((metric, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{metric.category}</span>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{metric.score}%</span>
                  <span className="text-sm text-green-600">{metric.trend}</span>
                </div>
                <Progress value={metric.score} className="h-2" />
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Issues: {metric.issues}</div>
                  <div>Last audit: {new Date(metric.lastAudit).toLocaleDateString()}</div>
                  <div>Standards: {metric.regulations.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Alerts & Actions Required</CardTitle>
          <CardDescription>Items requiring immediate or upcoming attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                    alert.severity === 'high' ? 'text-red-500' :
                    alert.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                  }`} />
                  <div className="space-y-1">
                    <div className="font-medium">{alert.title}</div>
                    <div className="text-sm text-muted-foreground">{alert.description}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Category: {alert.category}</span>
                      <span>•</span>
                      <span>Due: {new Date(alert.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
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

      {/* Recent Audits */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Audits & Assessments</CardTitle>
          <CardDescription>Latest compliance audits and their outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAudits.map((audit) => (
              <div key={audit.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{audit.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Conducted by {audit.auditor} on {new Date(audit.date).toLocaleDateString()}
                    </div>
                    {audit.findings !== null && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {audit.findings} findings • {audit.recommendations} recommendations
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {audit.score && (
                    <div className="text-right">
                      <div className="font-bold text-lg">{audit.score}%</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  )}
                  <Badge className={getAuditStatusColor(audit.status)}>
                    {audit.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Report
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Trends & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Trends</CardTitle>
            <CardDescription>Performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: 'June 2024', score: 96, change: '+2%' },
                { month: 'May 2024', score: 94, change: '+1%' },
                { month: 'April 2024', score: 93, change: '+3%' },
                { month: 'March 2024', score: 90, change: '0%' },
                { month: 'February 2024', score: 90, change: '+1%' },
                { month: 'January 2024', score: 89, change: '+2%' }
              ].map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{trend.month}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{trend.score}%</span>
                    <span className={`text-sm ${trend.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {trend.change}
                    </span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common compliance management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-16 flex flex-col gap-1">
                <Shield className="h-4 w-4" />
                <span className="text-xs">Run Full Audit</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-1">
                <FileText className="h-4 w-4" />
                <span className="text-xs">Generate Report</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-1">
                <CheckCircle className="h-4 w-4" />
                <span className="text-xs">Review Actions</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs">Schedule Audit</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplianceOverviewTab;
