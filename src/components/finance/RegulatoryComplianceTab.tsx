
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegulatoryComplianceHeader from './regulatory/RegulatoryComplianceHeader';
import HIPAAComplianceTab from './regulatory/HIPAAComplianceTab';
import AuditReportsTab from './regulatory/AuditReportsTab';
import ComplianceMonitoringTab from './regulatory/ComplianceMonitoringTab';

const RegulatoryComplianceTab = () => {
  return (
    <div className="space-y-6">
      <RegulatoryComplianceHeader />

      <Tabs defaultValue="hipaa" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hipaa">HIPAA Compliance</TabsTrigger>
          <TabsTrigger value="audit-reports">Audit Reports</TabsTrigger>
          <TabsTrigger value="monitoring">Compliance Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="hipaa">
          <HIPAAComplianceTab />
        </TabsContent>

        <TabsContent value="audit-reports">
          <AuditReportsTab />
        </TabsContent>

        <TabsContent value="monitoring">
          <ComplianceMonitoringTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegulatoryComplianceTab;
