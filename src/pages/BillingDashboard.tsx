
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BillingHeader from "@/components/billing/BillingHeader";
import BillingStatsCards from "@/components/billing/BillingStatsCards";
import PatientBillingTab from "@/components/billing/PatientBillingTab";
import InsuranceClaimsTab from "@/components/billing/InsuranceClaimsTab";
import PaymentProcessingTab from "@/components/billing/PaymentProcessingTab";
import BillingReportsTab from "@/components/billing/BillingReportsTab";
import AccountsReceivableTab from "@/components/billing/AccountsReceivableTab";

const BillingDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <BillingHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BillingStatsCards />

        <Tabs defaultValue="patient-billing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="patient-billing">Patient Billing</TabsTrigger>
            <TabsTrigger value="insurance-claims">Insurance Claims</TabsTrigger>
            <TabsTrigger value="payment-processing">Payment Processing</TabsTrigger>
            <TabsTrigger value="accounts-receivable">Accounts Receivable</TabsTrigger>
            <TabsTrigger value="reports">Billing Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="patient-billing">
            <PatientBillingTab />
          </TabsContent>

          <TabsContent value="insurance-claims">
            <InsuranceClaimsTab />
          </TabsContent>

          <TabsContent value="payment-processing">
            <PaymentProcessingTab />
          </TabsContent>

          <TabsContent value="accounts-receivable">
            <AccountsReceivableTab />
          </TabsContent>

          <TabsContent value="reports">
            <BillingReportsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BillingDashboard;
