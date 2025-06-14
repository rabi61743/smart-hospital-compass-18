
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfitLossStatement from './reporting/ProfitLossStatement';
import BalanceSheet from './reporting/BalanceSheet';
import CashFlowStatement from './reporting/CashFlowStatement';
import FinancialReportingHeader from './reporting/FinancialReportingHeader';

const FinancialReportingTab = () => {
  return (
    <div className="space-y-6">
      <FinancialReportingHeader />

      <Tabs defaultValue="profit-loss" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profit-loss">P&L Statement</TabsTrigger>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="profit-loss">
          <ProfitLossStatement />
        </TabsContent>

        <TabsContent value="balance-sheet">
          <BalanceSheet />
        </TabsContent>

        <TabsContent value="cash-flow">
          <CashFlowStatement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialReportingTab;
