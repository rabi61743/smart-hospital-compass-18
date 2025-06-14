
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReceivablesStatsCards from "@/components/receivables/ReceivablesStatsCards";
import OutstandingPaymentsTab from "@/components/receivables/OutstandingPaymentsTab";
import PaymentTrackingTab from "@/components/receivables/PaymentTrackingTab";
import CollectionsTab from "@/components/receivables/CollectionsTab";
import ReceivablesReportsTab from "@/components/receivables/ReceivablesReportsTab";

const AccountsReceivableTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Accounts Receivable Management</h3>
        <p className="text-sm text-muted-foreground">Track outstanding payments, collections, and receivables reports</p>
      </div>

      <ReceivablesStatsCards />

      <Tabs defaultValue="outstanding-payments" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="outstanding-payments">Outstanding Payments</TabsTrigger>
          <TabsTrigger value="payment-tracking">Payment Tracking</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="reports">AR Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="outstanding-payments">
          <OutstandingPaymentsTab />
        </TabsContent>

        <TabsContent value="payment-tracking">
          <PaymentTrackingTab />
        </TabsContent>

        <TabsContent value="collections">
          <CollectionsTab />
        </TabsContent>

        <TabsContent value="reports">
          <ReceivablesReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountsReceivableTab;
