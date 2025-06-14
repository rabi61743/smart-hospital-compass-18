
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Eye, Plus, AlertTriangle } from "lucide-react";

const AuditReportsTab = () => {
  const [auditReports] = useState([
    {
      id: 'AUDIT-2024-001',
      title: 'HIPAA Financial Data Audit',
      type: 'HIPAA Compliance',
      period: 'Q2 2024',
      status: 'completed',
      createdDate: '2024-06-01',
      completedDate: '2024-06-05',
      auditor: 'Internal Audit Team',
      findings: 2,
      recommendations: 3,
      severity: 'low'
    },
    {
      id: 'AUDIT-2024-002',
      title: 'Financial Controls Assessment',
      type: 'Internal Controls',
      period: 'May 2024',
      status: 'completed',
      createdDate: '2024-05-15',
      completedDate: '2024-05-30',
      auditor: 'External Auditor',
      findings: 0,
      recommendations: 1,
      severity: 'none'
    },
    {
      id: 'AUDIT-2024-003',
      title: 'Commission Payment Audit',
      type: 'Process Audit',
      period: 'Q1 2024',
      status: 'in-progress',
      createdDate: '2024-06-10',
      completedDate: null,
      auditor: 'Compliance Officer',
      findings: 1,
      recommendations: 0,
      severity: 'medium'
    },
    {
      id: 'AUDIT-2024-004',
      title: 'Data Privacy Impact Assessment',
      type: 'Privacy Audit',
      period: 'June 2024',
      status: 'scheduled',
      createdDate: '2024-06-15',
      completedDate: null,
      auditor: 'Privacy Officer',
      findings: 0,
      recommendations: 0,
      severity: 'none'
    }
  ]);

  const [complianceMetrics] = useState([
    {
      category: 'HIPAA Compliance',
      score: 98,
      trend: 'up',
      lastAudit: '2024-06-05'
    },
    {
      category: 'Financial Controls',
      score: 100,
      trend: 'stable',
      lastAudit: '2024-05-30'
    },
    {
      category: 'Data Security',
      score: 95,
      trend: 'up',
      lastAudit: '2024-06-01'
    },
    {
      category: 'Process Compliance',
      score: 92,
      trend: 'down',
      lastAudit: '2024-05-15'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'none': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Regulatory Audit Reports</h3>
          <p className="text-sm text-muted-foreground">Comprehensive audit reports and compliance assessments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Audit
        </Button>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {complianceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.category}</span>
                  <Badge variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'destructive' : 'secondary'}>
                    {metric.trend}
                  </Badge>
                </div>
                <div className="text-2xl font-bold">{metric.score}%</div>
                <div className="text-xs text-muted-foreground">
                  Last audit: {new Date(metric.lastAudit).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Audit Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Reports</CardTitle>
          <CardDescription>Track audit progress and findings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Audit ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Auditor</TableHead>
                <TableHead>Findings</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.auditor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{report.findings}</span>
                      {report.findings > 0 && (
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(report.severity)}>
                      {report.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {report.status === 'completed' && (
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common audit and compliance tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <FileText className="h-4 w-4" />
              <span className="text-sm">Generate HIPAA Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Schedule Audit</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <Download className="h-4 w-4" />
              <span className="text-sm">Export Compliance Data</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Review Findings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditReportsTab;
