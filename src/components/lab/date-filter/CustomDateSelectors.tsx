
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CustomDateSelectorsProps {
  dateFrom?: Date;
  dateTo?: Date;
  onDateFromChange: (date?: Date) => void;
  onDateToChange: (date?: Date) => void;
}

const CustomDateSelectors = ({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange
}: CustomDateSelectorsProps) => {
  return (
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
  );
};

export default CustomDateSelectors;
