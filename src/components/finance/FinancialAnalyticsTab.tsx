
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialAnalyticsHeader from './analytics/FinancialAnalyticsHeader';
import RevenueAnalysisTab from './analytics/RevenueAnalysisTab';
import CostCenterAnalysisTab from './analytics/CostCenterAnalysisTab';
import TrendAnalysisTab from './analytics/TrendAnalysisTab';

const FinancialAnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <FinancialAnalyticsHeader />

      <Tabs defaultValue="revenue-analysis" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="revenue-analysis">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="cost-center">Cost Center Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue-analysis">
          <RevenueAnalysisTab />
        </TabsContent>

        <TabsContent value="cost-center">
          <CostCenterAnalysisTab />
        </TabsContent>

        <TabsContent value="trends">
          <TrendAnalysisTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialAnalyticsTab;
