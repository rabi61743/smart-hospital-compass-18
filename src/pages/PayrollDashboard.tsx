
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PayrollHeader from "@/components/payroll/PayrollHeader";
import PayrollStatsCards from "@/components/payroll/PayrollStatsCards";
import EmployeeManagementTab from "@/components/payroll/EmployeeManagementTab";
import DepartmentManagementTab from "@/components/payroll/DepartmentManagementTab";
import PositionManagementTab from "@/components/payroll/PositionManagementTab";
import CostCenterManagementTab from "@/components/payroll/CostCenterManagementTab";
import OrganizationalChartTab from "@/components/payroll/OrganizationalChartTab";
import OnboardingOffboardingTab from "@/components/payroll/OnboardingOffboardingTab";
import PayrollProcessingTab from "@/components/payroll/PayrollProcessingTab";
import PayrollReportsTab from "@/components/payroll/PayrollReportsTab";
import PayrollSettingsTab from "@/components/payroll/PayrollSettingsTab";
import TimeTrackingTab from "@/components/payroll/TimeTrackingTab";
import LeaveManagementTab from "@/components/payroll/LeaveManagementTab";
import SalaryCalculatorTab from "@/components/payroll/SalaryCalculatorTab";
import PayrollProcessingEngineTab from "@/components/payroll/PayrollProcessingEngineTab";
import PayslipGenerationTab from "@/components/payroll/PayslipGenerationTab";
import TaxManagementTab from "@/components/payroll/TaxManagementTab";

const PayrollDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <PayrollStatsCards />

      <Tabs defaultValue="employees" className="space-y-6">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex w-max min-w-full">
            <TabsTrigger value="employees">Employee Management</TabsTrigger>
            <TabsTrigger value="departments">Department Management</TabsTrigger>
            <TabsTrigger value="positions">Position Management</TabsTrigger>
            <TabsTrigger value="cost-centers">Cost Centers</TabsTrigger>
            <TabsTrigger value="org-chart">Organizational Chart</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding/Offboarding</TabsTrigger>
            <TabsTrigger value="time-tracking">Time & Attendance</TabsTrigger>
            <TabsTrigger value="leave-management">Leave Management</TabsTrigger>
            <TabsTrigger value="processing">Payroll Processing</TabsTrigger>
            <TabsTrigger value="reports">Reports & History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="salary-calculator">Salary Calculator</TabsTrigger>
            <TabsTrigger value="processing-engine">Payroll Processing Engine</TabsTrigger>
            <TabsTrigger value="payslip-generation">Payslip Generation</TabsTrigger>
            <TabsTrigger value="tax-management">Tax Management</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="employees">
          <EmployeeManagementTab />
        </TabsContent>

        <TabsContent value="departments">
          <DepartmentManagementTab />
        </TabsContent>

        <TabsContent value="positions">
          <PositionManagementTab />
        </TabsContent>

        <TabsContent value="cost-centers">
          <CostCenterManagementTab />
        </TabsContent>

        <TabsContent value="org-chart">
          <OrganizationalChartTab />
        </TabsContent>

        <TabsContent value="onboarding">
          <OnboardingOffboardingTab />
        </TabsContent>

        <TabsContent value="time-tracking">
          <TimeTrackingTab />
        </TabsContent>

        <TabsContent value="leave-management">
          <LeaveManagementTab />
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

        <TabsContent value="salary-calculator">
          <SalaryCalculatorTab />
        </TabsContent>

        <TabsContent value="processing-engine">
          <PayrollProcessingEngineTab />
        </TabsContent>

        <TabsContent value="payslip-generation">
          <PayslipGenerationTab />
        </TabsContent>

        <TabsContent value="tax-management">
          <TaxManagementTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollDashboard;
