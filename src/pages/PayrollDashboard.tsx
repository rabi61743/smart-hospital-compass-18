
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/layout/ContentSection";
import { Plus, Download, Users, Building, Briefcase } from "lucide-react";
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
  const headerStats = [
    { label: "Total Employees", value: "248", change: "+12 this month", icon: <Users className="h-5 w-5" /> },
    { label: "Departments", value: "15", change: "Active departments", icon: <Building className="h-5 w-5" /> },
    { label: "Positions", value: "42", change: "Open positions: 8", icon: <Briefcase className="h-5 w-5" /> },
    { label: "Monthly Payroll", value: "₹45.2L", change: "+5.2% from last month", icon: <Users className="h-5 w-5" /> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll Management"
        description="Comprehensive payroll and HR management system"
        badge="HR Module"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Payroll Management" }
        ]}
        stats={headerStats}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </>
        }
      />

      <ContentSection variant="transparent">
        <Tabs defaultValue="employees" className="space-y-6">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="inline-flex w-max min-w-full bg-white border rounded-lg p-1">
              <TabsTrigger value="employees" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Employee Management</TabsTrigger>
              <TabsTrigger value="departments" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Department Management</TabsTrigger>
              <TabsTrigger value="positions" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Position Management</TabsTrigger>
              <TabsTrigger value="cost-centers" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Cost Centers</TabsTrigger>
              <TabsTrigger value="org-chart" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Organizational Chart</TabsTrigger>
              <TabsTrigger value="onboarding" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Onboarding/Offboarding</TabsTrigger>
              <TabsTrigger value="time-tracking" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Time & Attendance</TabsTrigger>
              <TabsTrigger value="leave-management" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Leave Management</TabsTrigger>
              <TabsTrigger value="processing" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Payroll Processing</TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Reports & History</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Settings</TabsTrigger>
              <TabsTrigger value="salary-calculator" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Salary Calculator</TabsTrigger>
              <TabsTrigger value="processing-engine" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Payroll Processing Engine</TabsTrigger>
              <TabsTrigger value="payslip-generation" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Payslip Generation</TabsTrigger>
              <TabsTrigger value="tax-management" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Tax Management</TabsTrigger>
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
      </ContentSection>
    </div>
  );
};

export default PayrollDashboard;
