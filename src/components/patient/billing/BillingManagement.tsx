
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText, DollarSign, Plus, Download } from "lucide-react";
import InvoicesTab from "./InvoicesTab";
import PaymentMethodsTab from "./PaymentMethodsTab";
import PaymentHistoryTab from "./PaymentHistoryTab";
import BillingSummaryCards from "./BillingSummaryCards";

const BillingManagement = () => {
  return (
    <div className="space-y-6">
      <BillingSummaryCards />

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <InvoicesTab />
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-4">
          <PaymentMethodsTab />
        </TabsContent>

        <TabsContent value="payment-history" className="space-y-4">
          <PaymentHistoryTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingManagement;
