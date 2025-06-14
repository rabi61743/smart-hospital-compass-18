
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PharmacyHeader from "@/components/pharmacy/PharmacyHeader";
import PharmacyInventoryTab from "@/components/pharmacy/PharmacyInventoryTab";
import PharmacyPOSTab from "@/components/pharmacy/PharmacyPOSTab";
import PharmacyReportsTab from "@/components/pharmacy/PharmacyReportsTab";
import PharmacyOrderManagement from "@/components/pharmacy/PharmacyOrderManagement";
import PharmacyStatsCards from "@/components/pharmacy/PharmacyStatsCards";

const PharmacyDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <PharmacyHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PharmacyStatsCards />

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="pos">Point of Sale</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <PharmacyInventoryTab />
          </TabsContent>

          <TabsContent value="pos">
            <PharmacyPOSTab />
          </TabsContent>

          <TabsContent value="orders">
            <PharmacyOrderManagement />
          </TabsContent>

          <TabsContent value="reports">
            <PharmacyReportsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
