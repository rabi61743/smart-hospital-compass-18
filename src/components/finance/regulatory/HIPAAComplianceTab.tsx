
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Lock, Eye, FileText, AlertTriangle, CheckCircle, Download } from "lucide-react";

const HIPAAComplianceTab = () => {
  const [complianceAreas] = useState([
    {
      area: 'Data Encryption',
      status: 'compliant',
      score: 100,
      description: 'All financial data encrypted at rest and in transit',
      lastChecked: '2024-06-14',
      requirements: 'AES-256 encryption implemented'
    },
    {
      area: 'Access Controls',
      status: 'compliant',
      score: 98,
      description: 'Role-based access control for financial data',
      lastChecked: '2024-06-13',
      requirements: 'Multi-factor authentication enabled'
    },
    {
      area: 'Audit Logging',
      status: 'warning',
      score: 85,
      description: 'Financial transaction logging and monitoring',
      lastChecked: '2024-06-12',
      requirements: 'Some logs missing detailed user information'
    },
    {
      area: 'Data Backup',
      status: 'compliant',
      score: 95,
      description: 'Secure backup of financial records',
      lastChecked: '2024-06-14',
      requirements: 'Daily encrypted backups to secure location'
    },
    {
      area: 'Privacy Policies',
      status: 'compliant',
      score: 92,
      description: 'Patient financial data privacy policies',
      lastChecked: '2024-06-10',
      requirements: 'Updated privacy notices and consent forms'
    }
  ]);

  const [dataAccessLogs] = useState([
    {
      id: 'LOG-001',
      timestamp: '2024-06-14 10:30:00',
      user: 'Dr. Sarah Johnson',
      action: 'Viewed Patient Billing',
      patientId: 'P-12345',
      dataType: 'Financial Records',
      ipAddress: '192.168.1.100',
      status: 'authorized'
    },
    {
      id: 'LOG-002',
      timestamp: '2024-06-14 10:15:00',
      user: 'Finance Admin',
      action: 'Exported Commission Report',
      patientId: 'Multiple',
      dataType: 'Commission Data',
      ipAddress: '192.168.1.50',
      status: 'authorized'
    },
    {
      id: 'LOG-003',
      timestamp: '2024-06-14 09:45:00',
      user: 'Dr. Mike Chen',
      action: 'Updated Payment Info',
      patientId: 'P-67890',
      dataType: 'Payment Records',
      ipAddress: '192.168.1.75',
      status: 'authorized'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">HIPAA Financial Data Protection</h3>
          <p className="text-sm text-muted-foreground">Monitor HIPAA compliance for financial data handling</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate HIPAA Report
        </Button>
      </div>

      {/* Compliance Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {complianceAreas.map((area, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {getStatusIcon(area.status)}
                {area.area}
              </CardTitle>
              <Badge className={getStatusColor(area.status)}>
                {area.status.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{area.score}%</span>
                  <span className="text-sm text-muted-foreground">
                    Score
                  </span>
                </div>
                <Progress value={area.score} className="w-full" />
                <p className="text-sm text-muted-foreground">{area.description}</p>
                <div className="text-xs text-muted-foreground">
                  <div>Last checked: {new Date(area.lastChecked).toLocaleDateString()}</div>
                  <div className="mt-1">{area.requirements}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Access Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Financial Data Access Logs
          </CardTitle>
          <CardDescription>Monitor access to patient financial information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Patient ID</TableHead>
                <TableHead>Data Type</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataAccessLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.patientId}</TableCell>
                  <TableCell>{log.dataType}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      {log.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Privacy Safeguards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Privacy Safeguards
          </CardTitle>
          <CardDescription>HIPAA privacy protection measures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-medium">Data Minimization</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Only necessary financial data is collected and stored
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-green-600" />
                <span className="font-medium">Secure Transmission</span>
              </div>
              <p className="text-sm text-muted-foreground">
                All data transfers use TLS 1.3 encryption
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-green-600" />
                <span className="font-medium">Access Monitoring</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Real-time monitoring of data access patterns
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HIPAAComplianceTab;
