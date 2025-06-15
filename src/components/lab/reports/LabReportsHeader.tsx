
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { format } from "date-fns";
import LabReportsFilters from './LabReportsFilters';
import LabReportsExportUtils from './LabReportsExportUtils';
import CustomDateRangeFilter from '../CustomDateRangeFilter';

interface LabReportsHeaderProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  comparisonType: string;
  setComparisonType: (value: string) => void;
  showCustomDateRange: boolean;
  setShowCustomDateRange: (value: boolean) => void;
  dateFrom?: Date;
  dateTo?: Date;
  setDateFrom: (date?: Date) => void;
  setDateTo: (date?: Date) => void;
  resetDateRange: () => void;
  reportType: string;
}

const LabReportsHeader = ({
  selectedCategory,
  setSelectedCategory,
  comparisonType,
  setComparisonType,
  showCustomDateRange,
  setShowCustomDateRange,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  resetDateRange,
  reportType
}: LabReportsHeaderProps) => {
  return (
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
        <div className="space-y-4">
          {/* Basic Filters */}
          <LabReportsFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            comparisonType={comparisonType}
            setComparisonType={setComparisonType}
            showCustomDateRange={showCustomDateRange}
            setShowCustomDateRange={setShowCustomDateRange}
          />

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
            <LabReportsExportUtils
              dateFrom={dateFrom}
              dateTo={dateTo}
              selectedCategory={selectedCategory}
              reportType={reportType}
            />
            
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
  );
};

export default LabReportsHeader;
