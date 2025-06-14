import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, Calendar, User, TrendingUp } from "lucide-react";
import { ComplianceAudit } from '@/types/statutoryCompliance';

interface ComplianceAuditTabProps {
  auditData: ComplianceAudit[];
}

const ComplianceAuditTab = ({ auditData }: ComplianceAuditTabProps) => {
  const getStatusColor = (status: ComplianceAudit['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'follow_up_required': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAuditTypeColor = (type: ComplianceAudit['auditType']) => {
    switch (type) {
      case 'internal': return 'bg-blue-100 text-blue-800';
      case 'government': return 'bg-red-100 text-red-800';
      case 'third_party': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock audit findings data with all severity types
  const recentFindings = [
    {
      id: 'AF001',
      category: 'Documentation',
      severity: 'critical' as const,
      description: 'Overtime register missing for November 2024',
      status: 'in_progress' as const,
      dueDate: '2025-01-15'
    },
    {
      id: 'AF002',
      category: 'ESI Compliance',
      severity: 'low' as const,
      description: 'Minor discrepancy in ESI calculation',
      status: 'resolved' as const,
      dueDate: '2024-12-31'
    },
    {
      id: 'AF003',
      category: 'PF Compliance',
      severity: 'high' as const,
      description: 'PF contribution calculation error',
      status: 'open' as const,
      dueDate: '2025-01-20'
    },
    {
      id: 'AF004',
      category: 'Tax Filing',
      severity: 'medium' as const,
      description: 'Late submission of monthly return',
      status: 'in_progress' as const,
      dueDate: '2025-01-10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Audit Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Compliance Score</p>
              <p className="text-2xl font-bold text-green-600">
                {auditData[0]?.compliance_score || 0}%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Scheduled Audits</p>
              <p className="text-2xl font-bold text-blue-600">
                {auditData.filter(a => a.status === 'scheduled').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Open Findings</p>
              <p className="text-2xl font-bold text-orange-600">
                {recentFindings.filter(f => f.status !== 'resolved').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Improvement</p>
              <p className="text-2xl font-bold text-purple-600">+5%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Score Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Compliance Score Breakdown
          </CardTitle>
          <CardDescription>Overall compliance performance across different areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { area: 'Labor Law Compliance', score: 95, color: 'bg-green-500' },
              { area: 'Tax Compliance', score: 92, color: 'bg-blue-500' },
              { area: 'Documentation', score: 88, color: 'bg-yellow-500' },
              { area: 'Reporting Timeliness', score: 94, color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.area}</span>
                  <span className="text-sm text-muted-foreground">{item.score}%</span>
                </div>
                <Progress value={item.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Schedule & History</CardTitle>
          <CardDescription>Planned and completed compliance audits</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Audit Type</TableHead>
                <TableHead>Auditor</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Compliance Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditData.map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell>
                    <Badge className={getAuditTypeColor(audit.auditType)}>
                      {audit.auditType.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {audit.auditor}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(audit.scheduledDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(audit.status)}>
                      {audit.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{audit.compliance_score}%</span>
                      <Progress value={audit.compliance_score} className="w-16 h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {audit.status === 'scheduled' && (
                        <Button variant="outline" size="sm">
                          Reschedule
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

      {/* Recent Findings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Audit Findings</CardTitle>
          <CardDescription>Issues identified and remediation status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFindings.map((finding) => (
              <div key={finding.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`h-4 w-4 ${
                    finding.severity === 'critical' ? 'text-red-500' :
                    finding.severity === 'high' ? 'text-red-500' :
                    finding.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium">{finding.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Category: {finding.category} • Due: {new Date(finding.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={
                    finding.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    finding.severity === 'high' ? 'bg-red-100 text-red-800' :
                    finding.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }>
                    {finding.severity}
                  </Badge>
                  <Badge className={
                    finding.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }>
                    {finding.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Audit Actions</CardTitle>
          <CardDescription>Common audit and compliance tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Shield className="h-6 w-6" />
              <span>Schedule Audit</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <CheckCircle className="h-6 w-6" />
              <span>Self Assessment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <AlertTriangle className="h-6 w-6" />
              <span>View Findings</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Compliance Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceAuditTab;
