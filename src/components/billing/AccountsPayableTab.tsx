
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PayableStatsCards from "@/components/payable/PayableStatsCards";
import VendorPaymentsTab from "@/components/payable/VendorPaymentsTab";
import PurchaseOrdersTab from "@/components/payable/PurchaseOrdersTab";
import ExpenseApprovalsTab from "@/components/payable/ExpenseApprovalsTab";
import PayableReportsTab from "@/components/payable/PayableReportsTab";

const AccountsPayableTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Accounts Payable Management</h3>
        <p className="text-sm text-muted-foreground">Manage vendor payments, purchase orders, and expense approvals</p>
      </div>

      <PayableStatsCards />

      <Tabs defaultValue="vendor-payments" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vendor-payments">Vendor Payments</TabsTrigger>
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="expense-approvals">Expense Approvals</TabsTrigger>
          <TabsTrigger value="reports">AP Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="vendor-payments">
          <VendorPaymentsTab />
        </TabsContent>

        <TabsContent value="purchase-orders">
          <PurchaseOrdersTab />
        </TabsContent>

        <TabsContent value="expense-approvals">
          <ExpenseApprovalsTab />
        </TabsContent>

        <TabsContent value="reports">
          <PayableReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountsPayableTab;
