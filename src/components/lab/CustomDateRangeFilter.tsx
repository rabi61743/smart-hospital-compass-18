
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CustomDateRangeFilterProps {
  dateFrom?: Date;
  dateTo?: Date;
  onDateFromChange: (date?: Date) => void;
  onDateToChange: (date?: Date) => void;
  onReset: () => void;
}

const CustomDateRangeFilter = ({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onReset,
}: CustomDateRangeFilterProps) => {
  const handlePresetRange = (preset: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (preset) {
      case 'today':
        onDateFromChange(today);
        onDateToChange(today);
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        onDateFromChange(yesterday);
        onDateToChange(yesterday);
        break;
      case 'last-7-days':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        onDateFromChange(weekAgo);
        onDateToChange(today);
        break;
      case 'last-30-days':
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);
        onDateFromChange(monthAgo);
        onDateToChange(today);
        break;
      case 'this-month':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        onDateFromChange(monthStart);
        onDateToChange(today);
        break;
      case 'last-month':
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        onDateFromChange(lastMonthStart);
        onDateToChange(lastMonthEnd);
        break;
      case 'this-quarter':
        const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
        onDateFromChange(quarterStart);
        onDateToChange(today);
        break;
      case 'this-year':
        const yearStart = new Date(now.getFullYear(), 0, 1);
        onDateFromChange(yearStart);
        onDateToChange(today);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-4">
      {/* Quick Preset Buttons */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Quick Date Ranges</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetRange('today')}
            className="text-xs"
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetRange('yesterday')}
            className="text-xs"
          >
            Yesterday
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetRange('last-7-days')}
            className="text-xs"
          >
            Last 7 Days
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetRange('last-30-days')}
            className="text-xs"
          >
            Last 30 Days
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetRange('this-month')}
            className="text-xs"
          >
            This Month
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetRange('last-month')}
            className="text-xs"
          >
            Last Month
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetRange('this-quarter')}
            className="text-xs"
          >
            This Quarter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetRange('this-year')}
            className="text-xs"
          >
            This Year
          </Button>
        </div>
      </div>

      {/* Custom Date Range Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* From Date */}
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
                {dateFrom ? format(dateFrom, "PPP") : "Select start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={onDateFromChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* To Date */}
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
                {dateTo ? format(dateTo, "PPP") : "Select end date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateTo}
                onSelect={onDateToChange}
                initialFocus
                className="pointer-events-auto"
                disabled={(date) => dateFrom ? date < dateFrom : false}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Selected Range Display and Reset */}
      {(dateFrom || dateTo) && (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="text-sm">
            <span className="font-medium">Selected Range: </span>
            {dateFrom && dateTo ? (
              `${format(dateFrom, "MMM dd, yyyy")} - ${format(dateTo, "MMM dd, yyyy")}`
            ) : dateFrom ? (
              `From ${format(dateFrom, "MMM dd, yyyy")}`
            ) : dateTo ? (
              `Until ${format(dateTo, "MMM dd, yyyy")}`
            ) : (
              "No range selected"
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onReset}>
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomDateRangeFilter;
