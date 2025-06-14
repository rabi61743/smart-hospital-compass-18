
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionLogsTab from './audit/TransactionLogsTab';
import ComplianceTrackingTab from './audit/ComplianceTrackingTab';
import AuditReportsTab from './audit/AuditReportsTab';
import AuditTrailHeader from './audit/AuditTrailHeader';

const AuditTrailTab = () => {
  return (
    <div className="space-y-6">
      <AuditTrailHeader />

      <Tabs defaultValue="transaction-logs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transaction-logs">Transaction Logs</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Tracking</TabsTrigger>
          <TabsTrigger value="reports">Audit Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="transaction-logs">
          <TransactionLogsTab />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceTrackingTab />
        </TabsContent>

        <TabsContent value="reports">
          <AuditReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuditTrailTab;
