
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import LaborLawComplianceTab from './compliance/LaborLawComplianceTab';
import GovernmentReportingTab from './compliance/GovernmentReportingTab';
import FormGenerationTab from './compliance/FormGenerationTab';
import ComplianceAuditTab from './compliance/ComplianceAuditTab';
import { StatutoryCompliance, ComplianceAudit } from '@/types/statutoryCompliance';

const StatutoryComplianceTab = () => {
  const [complianceItems] = useState<StatutoryCompliance[]>([
    {
      id: 'SC001',
      complianceType: 'labor_law',
      title: 'Form XI - Register of Overtime',
      description: 'Maintain overtime register as per Factories Act',
      regulation: 'Factories Act 1948 - Section 62',
      frequency: 'monthly',
      dueDate: '2025-01-31',
      status: 'pending',
      priority: 'high',
      documents: [],
      reminderDays: 7,
      penaltyInfo: 'Fine up to ₹10,000'
    },
    {
      id: 'SC002',
      complianceType: 'government_reporting',
      title: 'ESI Annual Return',
      description: 'Submit annual return to ESIC',
      regulation: 'ESI Act 1948',
      frequency: 'annually',
      dueDate: '2025-03-31',
      status: 'in_progress',
      priority: 'medium',
      documents: [],
      reminderDays: 30
    }
  ]);

  const [auditData] = useState<ComplianceAudit[]>([
    {
      id: 'CA001',
      auditType: 'internal',
      auditor: 'Internal Compliance Team',
      scheduledDate: '2025-02-15',
      status: 'scheduled',
      findings: [],
      compliance_score: 92,
      recommendations: []
    }
  ]);

  const pendingCompliance = complianceItems.filter(item => item.status === 'pending').length;
  const overdueCompliance = complianceItems.filter(item => item.status === 'overdue').length;
  const completedCompliance = complianceItems.filter(item => item.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Statutory Compliance
          </h3>
          <p className="text-sm text-muted-foreground">
            Labor law compliance, government reporting, and form generation
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingCompliance}</div>
            <p className="text-xs text-yellow-600">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueCompliance}</div>
            <p className="text-xs text-red-600">Immediate action needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedCompliance}</div>
            <p className="text-xs text-green-600">Up to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {auditData[0]?.compliance_score || 0}%
            </div>
            <p className="text-xs text-blue-600">Overall compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="labor-law" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="labor-law">Labor Law</TabsTrigger>
          <TabsTrigger value="reporting">Gov. Reporting</TabsTrigger>
          <TabsTrigger value="forms">Form Generation</TabsTrigger>
          <TabsTrigger value="audits">Compliance Audits</TabsTrigger>
        </TabsList>

        <TabsContent value="labor-law">
          <LaborLawComplianceTab complianceItems={complianceItems} />
        </TabsContent>

        <TabsContent value="reporting">
          <GovernmentReportingTab complianceItems={complianceItems} />
        </TabsContent>

        <TabsContent value="forms">
          <FormGenerationTab />
        </TabsContent>

        <TabsContent value="audits">
          <ComplianceAuditTab auditData={auditData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatutoryComplianceTab;
