
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InventoryCostHeader from './inventory/InventoryCostHeader';
import PharmacyCostTrackingTab from './inventory/PharmacyCostTrackingTab';
import LabCostTrackingTab from './inventory/LabCostTrackingTab';
import CostAnalysisTab from './inventory/CostAnalysisTab';

const InventoryCostTab = () => {
  return (
    <div className="space-y-6">
      <InventoryCostHeader />

      <Tabs defaultValue="pharmacy" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pharmacy">Pharmacy Costs</TabsTrigger>
          <TabsTrigger value="lab">Lab Costs</TabsTrigger>
          <TabsTrigger value="analysis">Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="pharmacy">
          <PharmacyCostTrackingTab />
        </TabsContent>

        <TabsContent value="lab">
          <LabCostTrackingTab />
        </TabsContent>

        <TabsContent value="analysis">
          <CostAnalysisTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryCostTab;
