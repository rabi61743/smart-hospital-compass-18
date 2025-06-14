
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import TaxCalculationsTab from './tax/TaxCalculationsTab';
import TaxFilingTab from './tax/TaxFilingTab';
import TaxReportsTab from './tax/TaxReportsTab';
import TaxComplianceTab from './tax/TaxComplianceTab';
import TaxConfigurationTab from './tax/TaxConfigurationTab';
import { TaxFiling, TaxCompliance } from '@/types/taxManagement';

const TaxManagementTab = () => {
  const [taxFilings] = useState<TaxFiling[]>([
    {
      id: 'TF001',
      filingType: 'tds',
      period: '2024-12',
      dueDate: '2025-01-07',
      status: 'pending',
      amount: 125000
    },
    {
      id: 'TF002',
      filingType: 'pf',
      period: '2024-12',
      dueDate: '2025-01-15',
      status: 'pending',
      amount: 89000
    }
  ]);

  const [complianceItems] = useState<TaxCompliance[]>([
    {
      id: 'TC001',
      complianceType: 'Form 16 Generation',
      description: 'Generate and distribute Form 16 for all employees',
      dueDate: '2025-01-31',
      status: 'pending',
      priority: 'high'
    }
  ]);

  const pendingFilings = taxFilings.filter(filing => filing.status === 'pending').length;
  const pendingCompliance = complianceItems.filter(item => item.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Tax Management Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Tax Management
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage income tax, PF, ESI, and professional tax calculations and compliance
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tax This Month</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4.25L</div>
            <p className="text-xs text-muted-foreground">All taxes combined</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Filings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingFilings}</div>
            <p className="text-xs text-orange-600">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Tasks</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingCompliance}</div>
            <p className="text-xs text-blue-600">Active tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">95%</div>
            <p className="text-xs text-green-600">Excellent compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="calculations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="calculations">Tax Calculations</TabsTrigger>
          <TabsTrigger value="filing">Tax Filing</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="calculations">
          <TaxCalculationsTab />
        </TabsContent>

        <TabsContent value="filing">
          <TaxFilingTab filings={taxFilings} />
        </TabsContent>

        <TabsContent value="reports">
          <TaxReportsTab />
        </TabsContent>

        <TabsContent value="compliance">
          <TaxComplianceTab complianceItems={complianceItems} />
        </TabsContent>

        <TabsContent value="configuration">
          <TaxConfigurationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxManagementTab;
