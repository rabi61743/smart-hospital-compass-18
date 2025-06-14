
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, FileText, BarChart3, TrendingUp, Calendar as CalendarIcon2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import LabTestCategoryBreakdown from './LabTestCategoryBreakdown';
import LabCommissionSummary from './LabCommissionSummary';
import LabPerformanceTrends from './LabPerformanceTrends';
import ComparativeAnalysisChart from './ComparativeAnalysisChart';
import { useCommissionRules } from '@/hooks/useCommissionRules';

const LabReportsTab = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [comparisonType, setComparisonType] = useState('month-over-month');
  const [reportType, setReportType] = useState('summary');
  const { activeRules } = useCommissionRules();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'blood-tests', label: 'Blood Tests' },
    { value: 'imaging', label: 'Imaging' },
    { value: 'pathology', label: 'Pathology' },
    { value: 'microbiology', label: 'Microbiology' },
    { value: 'biochemistry', label: 'Biochemistry' }
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
    link.download = `lab-commission-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
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
    link.download = `lab-commission-report-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateCSVContent = () => {
    return `Test Category,Tests Count,Revenue,Commission,Commission Rate
Blood Tests,245,"₹6,12,500","₹91,875",15%
Imaging,128,"₹12,80,000","₹1,28,000",10%
Pathology,89,"₹8,90,000","₹1,33,500",15%
Microbiology,156,"₹7,80,000","₹93,600",12%
Biochemistry,98,"₹4,90,000","₹58,800",12%`;
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Laboratory Commission Reports
          </CardTitle>
          <CardDescription>
            Comprehensive analysis and breakdowns of laboratory commission data with export capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Date From */}
            <div className="space-y-2">
              <Label>From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Date To */}
            <div className="space-y-2">
              <Label>To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <Label>Test Category</Label>
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
          </div>

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
              ) : (
                "Select date range for detailed analysis"
              )}
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
          <LabCommissionSummary 
            period={dateFrom && dateTo ? `${format(dateFrom, 'yyyy-MM-dd')}_${format(dateTo, 'yyyy-MM-dd')}` : 'current-month'}
            selectedCategory={selectedCategory}
            dateRange={{ from: dateFrom, to: dateTo }}
          />
        </TabsContent>

        <TabsContent value="breakdown">
          <LabTestCategoryBreakdown 
            period={dateFrom && dateTo ? `${format(dateFrom, 'yyyy-MM-dd')}_${format(dateTo, 'yyyy-MM-dd')}` : 'current-month'}
            selectedCategory={selectedCategory}
            dateRange={{ from: dateFrom, to: dateTo }}
          />
        </TabsContent>

        <TabsContent value="trends">
          <LabPerformanceTrends 
            period={dateFrom && dateTo ? `${format(dateFrom, 'yyyy-MM-dd')}_${format(dateTo, 'yyyy-MM-dd')}` : 'current-month'}
            selectedCategory={selectedCategory}
            dateRange={{ from: dateFrom, to: dateTo }}
          />
        </TabsContent>

        <TabsContent value="comparative">
          <ComparativeAnalysisChart
            comparisonType={comparisonType}
            selectedCategory={selectedCategory}
            dateRange={{ from: dateFrom, to: dateTo }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LabReportsTab;
