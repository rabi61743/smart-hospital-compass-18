
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReceivablesHeader from "@/components/receivables/ReceivablesHeader";
import ReceivablesStatsCards from "@/components/receivables/ReceivablesStatsCards";
import OutstandingPaymentsTab from "@/components/receivables/OutstandingPaymentsTab";
import PaymentTrackingTab from "@/components/receivables/PaymentTrackingTab";
import CollectionsTab from "@/components/receivables/CollectionsTab";
import ReceivablesReportsTab from "@/components/receivables/ReceivablesReportsTab";

const AccountsReceivable = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <ReceivablesHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReceivablesStatsCards />

        <Tabs defaultValue="outstanding-payments" className="space-y-6">
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
    </div>
  );
};

export default AccountsReceivable;
