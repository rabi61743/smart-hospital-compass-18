
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import FinanceHeader from "@/components/finance/FinanceHeader";
import FinanceStatsCards from "@/components/finance/FinanceStatsCards";
import RevenueTrackingTab from "@/components/finance/RevenueTrackingTab";
import ExpenseMonitoringTab from "@/components/finance/ExpenseMonitoringTab";
import ProfitLossTab from "@/components/finance/ProfitLossTab";
import FinancialReportsTab from "@/components/finance/FinancialReportsTab";
import FinancialReportingTab from "@/components/finance/FinancialReportingTab";
import FinancialAnalyticsTab from "@/components/finance/FinancialAnalyticsTab";
import AuditTrailTab from "@/components/finance/AuditTrailTab";
import TaxManagementTab from "@/components/finance/TaxManagementTab";

const FinanceDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <FinanceHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FinanceStatsCards />

        <Tabs defaultValue="revenue" className="space-y-6">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="revenue">Revenue Tracking</TabsTrigger>
              <TabsTrigger value="expenses">Expense Monitoring</TabsTrigger>
              <TabsTrigger value="profitloss">Profit & Loss</TabsTrigger>
              <TabsTrigger value="analytics">Financial Analytics</TabsTrigger>
              <TabsTrigger value="reporting">Financial Reporting</TabsTrigger>
              <TabsTrigger value="reports">Report Library</TabsTrigger>
              <TabsTrigger value="tax">Tax Management</TabsTrigger>
              <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <TabsContent value="revenue">
            <RevenueTrackingTab />
          </TabsContent>

          <TabsContent value="expenses">
            <ExpenseMonitoringTab />
          </TabsContent>

          <TabsContent value="profitloss">
            <ProfitLossTab />
          </TabsContent>

          <TabsContent value="analytics">
            <FinancialAnalyticsTab />
          </TabsContent>

          <TabsContent value="reporting">
            <FinancialReportingTab />
          </TabsContent>

          <TabsContent value="reports">
            <FinancialReportsTab />
          </TabsContent>

          <TabsContent value="tax">
            <TaxManagementTab />
          </TabsContent>

          <TabsContent value="audit">
            <AuditTrailTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinanceDashboard;
