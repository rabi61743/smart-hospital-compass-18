
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PayrollHeader from "@/components/payroll/PayrollHeader";
import PayrollStatsCards from "@/components/payroll/PayrollStatsCards";
import EmployeeManagementTab from "@/components/payroll/EmployeeManagementTab";
import PayrollProcessingTab from "@/components/payroll/PayrollProcessingTab";
import PayrollReportsTab from "@/components/payroll/PayrollReportsTab";
import PayrollSettingsTab from "@/components/payroll/PayrollSettingsTab";

const PayrollDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <PayrollHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PayrollStatsCards />

        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="employees">Employee Management</TabsTrigger>
            <TabsTrigger value="processing">Payroll Processing</TabsTrigger>
            <TabsTrigger value="reports">Reports & History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="employees">
            <EmployeeManagementTab />
          </TabsContent>

          <TabsContent value="processing">
            <PayrollProcessingTab />
          </TabsContent>

          <TabsContent value="reports">
            <PayrollReportsTab />
          </TabsContent>

          <TabsContent value="settings">
            <PayrollSettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PayrollDashboard;
