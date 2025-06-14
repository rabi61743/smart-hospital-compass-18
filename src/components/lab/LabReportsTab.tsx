
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, FileText, BarChart3 } from "lucide-react";
import LabTestCategoryBreakdown from './LabTestCategoryBreakdown';
import LabCommissionSummary from './LabCommissionSummary';
import LabPerformanceTrends from './LabPerformanceTrends';
import LabReferralTracking from './LabReferralTracking';

const LabReportsTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleExportReport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting lab report in ${format} format for period:`, selectedPeriod);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Laboratory Commission Reports
          </CardTitle>
          <CardDescription>
            Detailed analysis and breakdowns of laboratory commission data by test categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="period-select">Period:</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger id="period-select" className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01">January 2024</SelectItem>
                  <SelectItem value="2023-12">December 2023</SelectItem>
                  <SelectItem value="2023-11">November 2023</SelectItem>
                  <SelectItem value="2023-10">October 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="category-select">Category:</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category-select" className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="blood-tests">Blood Tests</SelectItem>
                  <SelectItem value="imaging">Imaging</SelectItem>
                  <SelectItem value="pathology">Pathology</SelectItem>
                  <SelectItem value="microbiology">Microbiology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" onClick={() => handleExportReport('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={() => handleExportReport('excel')}>
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Tabs defaultValue="breakdown" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="breakdown">Category Breakdown</TabsTrigger>
          <TabsTrigger value="summary">Commission Summary</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="referrals">Referral Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown">
          <LabTestCategoryBreakdown 
            period={selectedPeriod} 
            selectedCategory={selectedCategory} 
          />
        </TabsContent>

        <TabsContent value="summary">
          <LabCommissionSummary 
            period={selectedPeriod} 
            selectedCategory={selectedCategory} 
          />
        </TabsContent>

        <TabsContent value="trends">
          <LabPerformanceTrends 
            period={selectedPeriod} 
            selectedCategory={selectedCategory} 
          />
        </TabsContent>

        <TabsContent value="referrals">
          <LabReferralTracking 
            period={selectedPeriod} 
            selectedCategory={selectedCategory} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LabReportsTab;
