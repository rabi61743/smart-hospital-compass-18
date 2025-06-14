
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Calendar, Eye, Plus } from "lucide-react";

const AuditReportsTab = () => {
  const auditReports = [
    {
      id: 'RPT-2024-001',
      name: 'Monthly Financial Audit',
      type: 'Financial',
      period: 'May 2024',
      status: 'completed',
      generatedDate: '2024-06-01',
      generatedBy: 'System',
      size: '2.3 MB',
      findings: 'No significant issues found'
    },
    {
      id: 'RPT-2024-002',
      name: 'Commission Compliance Review',
      type: 'Compliance',
      period: 'Q2 2024',
      status: 'in-progress',
      generatedDate: '2024-06-10',
      generatedBy: 'Audit Team',
      size: '1.8 MB',
      findings: 'Minor documentation gaps identified'
    },
    {
      id: 'RPT-2024-003',
      name: 'Transaction Security Audit',
      type: 'Security',
      period: 'June 2024',
      status: 'scheduled',
      generatedDate: '2024-06-15',
      generatedBy: 'IT Security',
      size: '-',
      findings: 'Pending completion'
    },
    {
      id: 'RPT-2024-004',
      name: 'Regulatory Compliance Report',
      type: 'Regulatory',
      period: 'Q1 2024',
      status: 'completed',
      generatedDate: '2024-04-05',
      generatedBy: 'Compliance Officer',
      size: '4.1 MB',
      findings: 'Full compliance achieved'
    }
  ];

  const reportTemplates = [
    {
      name: 'Financial Transaction Audit',
      description: 'Comprehensive review of all financial transactions',
      frequency: 'Monthly',
      scope: 'All Departments'
    },
    {
      name: 'Commission Payment Audit',
      description: 'Detailed analysis of commission calculations and payments',
      frequency: 'Quarterly',
      scope: 'Commission System'
    },
    {
      name: 'Compliance Status Report',
      description: 'Overall compliance status across all regulations',
      frequency: 'Monthly',
      scope: 'Organization-wide'
    },
    {
      name: 'Security Audit Report',
      description: 'Security assessment of financial systems and data',
      frequency: 'Quarterly',
      scope: 'IT Systems'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Financial': return 'bg-blue-100 text-blue-800';
      case 'Compliance': return 'bg-purple-100 text-purple-800';
      case 'Security': return 'bg-red-100 text-red-800';
      case 'Regulatory': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">Audit Reports</h4>
          <p className="text-sm text-muted-foreground">Generate and manage audit reports</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Audit Reports</CardTitle>
          <CardDescription>Generated audit reports and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(report.type)}>
                      {report.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(report.generatedDate).toLocaleDateString()}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
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

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Pre-configured audit report templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {template.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Frequency: {template.frequency}</span>
                    <span>Scope: {template.scope}</span>
                  </div>
                  <Button size="sm" className="w-full">
                    <Calendar className="h-3 w-3 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-sm text-muted-foreground">Reports Generated</p>
              <p className="text-xs text-muted-foreground">This quarter</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">96.5%</p>
              <p className="text-sm text-muted-foreground">Compliance Rate</p>
              <p className="text-xs text-muted-foreground">Average score</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">8</p>
              <p className="text-sm text-muted-foreground">Open Issues</p>
              <p className="text-xs text-muted-foreground">Requiring action</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditReportsTab;
