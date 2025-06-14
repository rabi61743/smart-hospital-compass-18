
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InsuranceIntegrationHeader from './insurance/InsuranceIntegrationHeader';
import ClaimsProcessingTab from './insurance/ClaimsProcessingTab';
import ReimbursementTrackingTab from './insurance/ReimbursementTrackingTab';
import InsuranceProvidersTab from './insurance/InsuranceProvidersTab';

const InsuranceIntegrationTab = () => {
  return (
    <div className="space-y-6">
      <InsuranceIntegrationHeader />

      <Tabs defaultValue="claims" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="claims">Claims Processing</TabsTrigger>
          <TabsTrigger value="reimbursement">Reimbursement Tracking</TabsTrigger>
          <TabsTrigger value="providers">Insurance Providers</TabsTrigger>
        </TabsList>

        <TabsContent value="claims">
          <ClaimsProcessingTab />
        </TabsContent>

        <TabsContent value="reimbursement">
          <ReimbursementTrackingTab />
        </TabsContent>

        <TabsContent value="providers">
          <InsuranceProvidersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsuranceIntegrationTab;
