
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinanceHeader from "@/components/finance/FinanceHeader";
import FinanceStatsCards from "@/components/finance/FinanceStatsCards";
import RevenueTrackingTab from "@/components/finance/RevenueTrackingTab";
import ExpenseMonitoringTab from "@/components/finance/ExpenseMonitoringTab";
import ProfitLossTab from "@/components/finance/ProfitLossTab";
import FinancialReportsTab from "@/components/finance/FinancialReportsTab";

const FinanceDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <FinanceHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FinanceStatsCards />

        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">Revenue Tracking</TabsTrigger>
            <TabsTrigger value="expenses">Expense Monitoring</TabsTrigger>
            <TabsTrigger value="profitloss">Profit & Loss</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <RevenueTrackingTab />
          </TabsContent>

          <TabsContent value="expenses">
            <ExpenseMonitoringTab />
          </TabsContent>

          <TabsContent value="profitloss">
            <ProfitLossTab />
          </TabsContent>

          <TabsContent value="reports">
            <FinancialReportsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinanceDashboard;
