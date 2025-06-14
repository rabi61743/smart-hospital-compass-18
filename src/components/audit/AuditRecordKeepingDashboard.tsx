
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Database, Clock, Download, Archive } from "lucide-react";
import AuditTrailsTab from './AuditTrailsTab';
import DocumentManagementTab from './DocumentManagementTab';
import DataRetentionTab from './DataRetentionTab';
import ComplianceOverviewTab from './ComplianceOverviewTab';

const AuditRecordKeepingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for overview stats
  const auditStats = {
    totalRecords: 15847,
    documentsStored: 3245,
    complianceScore: 96,
    retentionPolicies: 12,
    recentAudits: 8,
    dataBreaches: 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="h-8 w-8 text-blue-600" />
                Audit & Record Keeping
              </h1>
              <p className="text-gray-600 mt-1">
                Comprehensive audit trails, document management, and data retention system
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <Shield className="h-4 w-4 mr-2" />
                Run Audit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold text-blue-600">
                  {auditStats.totalRecords.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold text-green-600">
                  {auditStats.documentsStored.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Compliance</p>
                <p className="text-2xl font-bold text-purple-600">
                  {auditStats.complianceScore}%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Archive className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Retention Policies</p>
                <p className="text-2xl font-bold text-orange-600">
                  {auditStats.retentionPolicies}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Clock className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Recent Audits</p>
                <p className="text-2xl font-bold text-teal-600">
                  {auditStats.recentAudits}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Shield className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Data Breaches</p>
                <p className="text-2xl font-bold text-green-600">
                  {auditStats.dataBreaches}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Compliance Overview</TabsTrigger>
            <TabsTrigger value="audit-trails">Audit Trails</TabsTrigger>
            <TabsTrigger value="documents">Document Management</TabsTrigger>
            <TabsTrigger value="retention">Data Retention</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ComplianceOverviewTab />
          </TabsContent>

          <TabsContent value="audit-trails">
            <AuditTrailsTab />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentManagementTab />
          </TabsContent>

          <TabsContent value="retention">
            <DataRetentionTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuditRecordKeepingDashboard;
