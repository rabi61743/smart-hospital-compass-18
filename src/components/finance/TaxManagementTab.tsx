
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaxManagementHeader from './tax/TaxManagementHeader';
import TaxCalculationsTab from './tax/TaxCalculationsTab';
import TaxReportingTab from './tax/TaxReportingTab';
import TaxComplianceTab from './tax/TaxComplianceTab';

const TaxManagementTab = () => {
  return (
    <div className="space-y-6">
      <TaxManagementHeader />

      <Tabs defaultValue="calculations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculations">GST/VAT Calculations</TabsTrigger>
          <TabsTrigger value="reporting">Tax Reporting</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="calculations">
          <TaxCalculationsTab />
        </TabsContent>

        <TabsContent value="reporting">
          <TaxReportingTab />
        </TabsContent>

        <TabsContent value="compliance">
          <TaxComplianceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxManagementTab;
