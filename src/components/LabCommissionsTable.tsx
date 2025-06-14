
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import DynamicLabCommissionCalculator from "./lab/DynamicLabCommissionCalculator";
import LabReferralTracking from "./lab/LabReferralTracking";
import CommissionRateManagement from "./lab/CommissionRateManagement";
import TechnicianCommissionTracking from "./lab/TechnicianCommissionTracking";
import LabReportsTab from "./lab/LabReportsTab";
import { labCommissionRules } from "@/data/labCommissionRules";
import { initialCommissionRules } from "@/data/initialCommissionRules";

const LabCommissionsTable = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Combine lab-specific rules with general rules
  const allRules = [...labCommissionRules, ...initialCommissionRules];

  const periods = [
    { value: "current-month", label: "Current Month" },
    { value: "last-month", label: "Last Month" },
    { value: "last-3-months", label: "Last 3 Months" },
    { value: "current-year", label: "Current Year" }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "blood-tests", label: "Blood Tests" },
    { value: "imaging", label: "Imaging" },
    { value: "microbiology", label: "Microbiology" },
    { value: "pathology", label: "Pathology" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Lab Commission Management
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-normal">Period:</span>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {periods.map(period => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-normal">Category:</span>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Badge variant="outline">{allRules.length} rules active</Badge>
            </div>
          </CardTitle>
          <CardDescription>
            Comprehensive lab commission tracking, rate management, and detailed reporting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="calculator">Commission Calculator</TabsTrigger>
              <TabsTrigger value="technicians">Technician Tracking</TabsTrigger>
              <TabsTrigger value="rate-management">Rate Management</TabsTrigger>
              <TabsTrigger value="referral-tracking">Referral Tracking</TabsTrigger>
              <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator">
              <DynamicLabCommissionCalculator
                rules={allRules}
                period={selectedPeriod}
                selectedCategory={selectedCategory}
              />
            </TabsContent>

            <TabsContent value="technicians">
              <TechnicianCommissionTracking
                period={selectedPeriod}
                selectedCategory={selectedCategory}
              />
            </TabsContent>

            <TabsContent value="rate-management">
              <CommissionRateManagement />
            </TabsContent>

            <TabsContent value="referral-tracking">
              <LabReferralTracking
                period={selectedPeriod}
                selectedCategory={selectedCategory}
              />
            </TabsContent>

            <TabsContent value="reports">
              <LabReportsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabCommissionsTable;
