
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, FileText, Table as TableIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useCommissionReports } from '@/hooks/useCommissionReports';
import ReportSummaryCards from './reports/ReportSummaryCards';
import CommissionBreakdownTable from './reports/CommissionBreakdownTable';
import ProcedureBreakdownChart from './reports/ProcedureBreakdownChart';
import TimeSeriesChart from './reports/TimeSeriesChart';

const CommissionReportsTab = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedProcedure, setSelectedProcedure] = useState('all');
  const [reportType, setReportType] = useState('summary');

  const {
    reportData,
    summaryStats,
    isLoading,
    generatePDFReport,
    generateExcelReport,
    applyFilters
  } = useCommissionReports();

  const handleApplyFilters = () => {
    applyFilters({
      dateFrom,
      dateTo,
      department: selectedDepartment === 'all' ? undefined : selectedDepartment,
      procedure: selectedProcedure === 'all' ? undefined : selectedProcedure,
      reportType
    });
  };

  const handlePDFExport = async () => {
    await generatePDFReport({
      dateFrom,
      dateTo,
      department: selectedDepartment === 'all' ? undefined : selectedDepartment,
      procedure: selectedProcedure === 'all' ? undefined : selectedProcedure,
      reportType
    });
  };

  const handleExcelExport = async () => {
    await generateExcelReport({
      dateFrom,
      dateTo,
      department: selectedDepartment === 'all' ? undefined : selectedDepartment,
      procedure: selectedProcedure === 'all' ? undefined : selectedProcedure,
      reportType
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Commission Reports
          </CardTitle>
          <CardDescription>
            Generate detailed commission reports with various filters and export options
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
                    {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
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
                    {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Department Filter */}
            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="general">General Medicine</SelectItem>
                  <SelectItem value="laboratory">Laboratory</SelectItem>
                  <SelectItem value="pharmacy">Pharmacy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Report Type */}
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary Report</SelectItem>
                  <SelectItem value="detailed">Detailed Breakdown</SelectItem>
                  <SelectItem value="procedure">By Procedure Type</SelectItem>
                  <SelectItem value="doctor">By Doctor</SelectItem>
                  <SelectItem value="time">Time Series Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button onClick={handleApplyFilters} className="mr-2">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePDFExport}>
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" onClick={handleExcelExport}>
                <TableIcon className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Summary */}
      <ReportSummaryCards summaryStats={summaryStats} />

      {/* Charts and Visualizations */}
      {reportType === 'procedure' && (
        <ProcedureBreakdownChart data={reportData.procedureBreakdown} />
      )}

      {reportType === 'time' && (
        <TimeSeriesChart data={reportData.timeSeries} />
      )}

      {/* Detailed Table */}
      <CommissionBreakdownTable 
        data={reportData.details} 
        reportType={reportType}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CommissionReportsTab;
