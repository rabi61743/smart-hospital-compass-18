
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, FileText, BarChart3, Filter } from "lucide-react";
import { format } from "date-fns";
import CustomDateRangeFilter from '../lab/CustomDateRangeFilter';
import PharmacyCommissionSummary from './PharmacyCommissionSummary';
import PharmacyCategoryBreakdown from './PharmacyCategoryBreakdown';
import PharmacyPerformanceTrends from './PharmacyPerformanceTrends';
import PharmacyComparativeAnalysis from './PharmacyComparativeAnalysis';

const PharmacyReportsTab = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [comparisonType, setComparisonType] = useState('month-over-month');
  const [reportType, setReportType] = useState('summary');
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'prescription', label: 'Prescription Medicines' },
    { value: 'otc', label: 'OTC Medicines' },
    { value: 'medical-supplies', label: 'Medical Supplies' },
    { value: 'health-supplements', label: 'Health Supplements' },
    { value: 'surgical-items', label: 'Surgical Items' }
  ];

  const comparisonTypes = [
    { value: 'month-over-month', label: 'Month-over-Month' },
    { value: 'quarter-over-quarter', label: 'Quarter-over-Quarter' },
    { value: 'year-over-year', label: 'Year-over-Year' }
  ];

  const handleExportPDF = () => {
    console.log('Exporting PDF report with filters:', {
      dateFrom,
      dateTo,
      selectedCategory,
      reportType
    });
    // Simulate PDF export
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,';
    link.download = `pharmacy-commission-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
    link.click();
  };

  const handleExportExcel = () => {
    console.log('Exporting Excel report with filters:', {
      dateFrom,
      dateTo,
      selectedCategory,
      reportType
    });
    // Simulate Excel export
    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pharmacy-commission-report-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateCSVContent = () => {
    return `Category,Sales Count,Revenue,Commission,Commission Rate
Prescription Medicines,456,"₹9,12,000","₹1,36,800",15%
OTC Medicines,289,"₹4,33,500","₹43,350",10%
Medical Supplies,167,"₹6,68,000","₹80,160",12%
Health Supplements,234,"₹3,51,000","₹42,120",12%
Surgical Items,89,"₹5,34,000","₹64,080",12%`;
  };

  const resetDateRange = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Pharmacy Commission Reports
          </CardTitle>
          <CardDescription>
            Comprehensive analysis and breakdowns of pharmacy commission data with export capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div className="space-y-2">
                <Label>Product Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
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

              {/* Comparison Type */}
              <div className="space-y-2">
                <Label>Comparison Type</Label>
                <Select value={comparisonType} onValueChange={setComparisonType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {comparisonTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Date Range Toggle */}
              <div className="space-y-2">
                <Label>Date Filter</Label>
                <Button
                  variant={showCustomDateRange ? "default" : "outline"}
                  onClick={() => setShowCustomDateRange(!showCustomDateRange)}
                  className="w-full"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Custom Date Range
                </Button>
              </div>
            </div>

            {/* Custom Date Range Filter */}
            {showCustomDateRange && (
              <div className="border rounded-lg p-4 bg-muted/20">
                <CustomDateRangeFilter
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                  onDateFromChange={setDateFrom}
                  onDateToChange={setDateTo}
                  onReset={resetDateRange}
                />
              </div>
            )}

            {/* Export Buttons and Date Display */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleExportPDF}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Export PDF
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleExportExcel}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Excel
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {dateFrom && dateTo ? (
                  `${format(dateFrom, "MMM dd")} - ${format(dateTo, "MMM dd, yyyy")}`
                ) : dateFrom ? (
                  `From ${format(dateFrom, "MMM dd, yyyy")}`
                ) : dateTo ? (
                  `Until ${format(dateTo, "MMM dd, yyyy")}`
                ) : (
                  "All time data"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="breakdown">Category Breakdown</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="comparative">Comparative Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <PharmacyCommissionSummary 
            period={dateFrom && dateTo ? `${format(dateFrom, 'yyyy-MM-dd')}_${format(dateTo, 'yyyy-MM-dd')}` : 'current-month'}
            selectedCategory={selectedCategory}
            dateRange={{ from: dateFrom, to: dateTo }}
          />
        </TabsContent>

        <TabsContent value="breakdown">
          <PharmacyCategoryBreakdown 
            period={dateFrom && dateTo ? `${format(dateFrom, 'yyyy-MM-dd')}_${format(dateTo, 'yyyy-MM-dd')}` : 'current-month'}
            selectedCategory={selectedCategory}
            dateRange={{ from: dateFrom, to: dateTo }}
          />
        </TabsContent>

        <TabsContent value="trends">
          <PharmacyPerformanceTrends 
            period={dateFrom && dateTo ? `${format(dateFrom, 'yyyy-MM-dd')}_${format(dateTo, 'yyyy-MM-dd')}` : 'current-month'}
            selectedCategory={selectedCategory}
            dateRange={{ from: dateFrom, to: dateTo }}
          />
        </TabsContent>

        <TabsContent value="comparative">
          <PharmacyComparativeAnalysis
            comparisonType={comparisonType}
            selectedCategory={selectedCategory}
            dateRange={{ from: dateFrom, to: dateTo }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PharmacyReportsTab;
