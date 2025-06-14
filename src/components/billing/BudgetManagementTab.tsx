
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BudgetStatsCards from "@/components/budget/BudgetStatsCards";
import DepartmentBudgetsTab from "@/components/budget/DepartmentBudgetsTab";
import VarianceAnalysisTab from "@/components/budget/VarianceAnalysisTab";
import BudgetForecastingTab from "@/components/budget/BudgetForecastingTab";
import BudgetReportsTab from "@/components/budget/BudgetReportsTab";
import CommissionCalculationsTab from "@/components/budget/CommissionCalculationsTab";

const BudgetManagementTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Budget Management</h3>
        <p className="text-sm text-muted-foreground">Monitor department budgets, analyze variances, and create forecasts</p>
      </div>

      <BudgetStatsCards />

      <Tabs defaultValue="department-budgets" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="department-budgets">Department Budgets</TabsTrigger>
          <TabsTrigger value="commission-calculations">Commission Calculations</TabsTrigger>
          <TabsTrigger value="variance-analysis">Variance Analysis</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="reports">Budget Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="department-budgets">
          <DepartmentBudgetsTab />
        </TabsContent>

        <TabsContent value="commission-calculations">
          <CommissionCalculationsTab />
        </TabsContent>

        <TabsContent value="variance-analysis">
          <VarianceAnalysisTab />
        </TabsContent>

        <TabsContent value="forecasting">
          <BudgetForecastingTab />
        </TabsContent>

        <TabsContent value="reports">
          <BudgetReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetManagementTab;
