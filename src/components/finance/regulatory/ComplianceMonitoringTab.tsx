
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Shield, AlertTriangle, CheckCircle, Clock, TrendingUp, Bell } from "lucide-react";

const ComplianceMonitoringTab = () => {
  const [monitoringAlerts] = useState([
    {
      id: 'ALERT-001',
      type: 'Access Pattern',
      severity: 'medium',
      message: 'Unusual access pattern detected for financial records',
      timestamp: '2024-06-14 14:30:00',
      status: 'active',
      department: 'Finance'
    },
    {
      id: 'ALERT-002',
      type: 'Data Export',
      severity: 'low',
      message: 'Large data export performed outside business hours',
      timestamp: '2024-06-14 02:15:00',
      status: 'resolved',
      department: 'IT'
    },
    {
      id: 'ALERT-003',
      type: 'Failed Login',
      severity: 'high',
      message: 'Multiple failed login attempts to financial system',
      timestamp: '2024-06-13 16:45:00',
      status: 'investigating',
      department: 'Security'
    }
  ]);

  const [complianceMetrics] = useState([
    { month: 'Jan', score: 96, incidents: 2 },
    { month: 'Feb', score: 98, incidents: 1 },
    { month: 'Mar', score: 95, incidents: 3 },
    { month: 'Apr', score: 99, incidents: 0 },
    { month: 'May', score: 97, incidents: 1 },
    { month: 'Jun', score: 98, incidents: 1 }
  ]);

  const [regulatoryUpdates] = useState([
    {
      id: 'REG-001',
      title: 'HIPAA Security Rule Update',
      description: 'New guidelines for financial data encryption requirements',
      effectiveDate: '2024-07-01',
      impact: 'medium',
      action: 'Review current encryption protocols'
    },
    {
      id: 'REG-002',
      title: 'State Privacy Law Amendment',
      description: 'Updated patient consent requirements for financial data sharing',
      effectiveDate: '2024-08-15',
      impact: 'high',
      action: 'Update consent forms and processes'
    },
    {
      id: 'REG-003',
      title: 'Audit Trail Enhancement',
      description: 'Enhanced logging requirements for financial transactions',
      effectiveDate: '2024-09-01',
      impact: 'low',
      action: 'Upgrade logging infrastructure'
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
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
          <h3 className="text-lg font-semibold">Compliance Monitoring</h3>
          <p className="text-sm text-muted-foreground">Real-time monitoring of regulatory compliance</p>
        </div>
        <Button>
          <Bell className="h-4 w-4 mr-2" />
          Configure Alerts
        </Button>
      </div>

      {/* Real-time Monitoring Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {monitoringAlerts.filter(a => a.status === 'active').length}
            </div>
            <p className="text-xs text-orange-600">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <p className="text-xs text-green-600">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Incidents</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-blue-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <p className="text-xs text-green-600">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Score Trend</CardTitle>
            <CardDescription>Monthly compliance score over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={complianceMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[90, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Compliance Score']} />
                <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Incidents</CardTitle>
            <CardDescription>Monthly security incident count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}`, 'Incidents']} />
                <Bar dataKey="incidents" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Security & Compliance Alerts</CardTitle>
          <CardDescription>Real-time alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monitoringAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.id}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.department}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {new Date(alert.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Investigate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Regulatory Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Regulatory Updates</CardTitle>
          <CardDescription>Upcoming regulatory changes affecting compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regulatoryUpdates.map((update) => (
              <div key={update.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge className={getImpactColor(update.impact)}>
                      {update.impact.toUpperCase()} IMPACT
                    </Badge>
                    <span className="font-medium">{update.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{update.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Effective: {new Date(update.effectiveDate).toLocaleDateString()}</span>
                    <span>Action: {update.action}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceMonitoringTab;
