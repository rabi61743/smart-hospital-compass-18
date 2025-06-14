import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import BillingHeader from "@/components/billing/BillingHeader";
import BillingStatsCards from "@/components/billing/BillingStatsCards";
import PatientBillingTab from "@/components/billing/PatientBillingTab";
import InsuranceClaimsTab from "@/components/billing/InsuranceClaimsTab";
import PaymentProcessingTab from "@/components/billing/PaymentProcessingTab";
import BillingReportsTab from "@/components/billing/BillingReportsTab";
import AccountsReceivableTab from "@/components/billing/AccountsReceivableTab";
import AccountsPayableTab from "@/components/billing/AccountsPayableTab";
import BudgetManagementTab from "@/components/billing/BudgetManagementTab";

const BillingDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <BillingHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BillingStatsCards />

        <Tabs defaultValue="patient-billing" className="space-y-6">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground">
              <TabsTrigger value="patient-billing" className="whitespace-nowrap">Patient Billing</TabsTrigger>
              <TabsTrigger value="insurance-claims" className="whitespace-nowrap">Insurance Claims</TabsTrigger>
              <TabsTrigger value="payment-processing" className="whitespace-nowrap">Payment Processing</TabsTrigger>
              <TabsTrigger value="accounts-receivable" className="whitespace-nowrap">Accounts Receivable</TabsTrigger>
              <TabsTrigger value="accounts-payable" className="whitespace-nowrap">Accounts Payable</TabsTrigger>
              <TabsTrigger value="budget-management" className="whitespace-nowrap">Budget Management</TabsTrigger>
              <TabsTrigger value="reports" className="whitespace-nowrap">Billing Reports</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

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

          <TabsContent value="accounts-payable">
            <AccountsPayableTab />
          </TabsContent>

          <TabsContent value="budget-management">
            <BudgetManagementTab />
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
