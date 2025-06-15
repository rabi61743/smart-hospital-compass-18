
import React from 'react';
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface SelectedRangeDisplayProps {
  dateFrom?: Date;
  dateTo?: Date;
  onReset: () => void;
}

const SelectedRangeDisplay = ({ dateFrom, dateTo, onReset }: SelectedRangeDisplayProps) => {
  if (!dateFrom && !dateTo) {
    return null;
  }

  const getDisplayText = () => {
    if (dateFrom && dateTo) {
      return `${format(dateFrom, "MMM dd, yyyy")} - ${format(dateTo, "MMM dd, yyyy")}`;
    } else if (dateFrom) {
      return `From ${format(dateFrom, "MMM dd, yyyy")}`;
    } else if (dateTo) {
      return `Until ${format(dateTo, "MMM dd, yyyy")}`;
    }
    return "No range selected";
  };

  return (
    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
      <div className="text-sm">
        <span className="font-medium">Selected Range: </span>
        {getDisplayText()}
      </div>
      <Button variant="ghost" size="sm" onClick={onReset}>
        Clear
      </Button>
    </div>
  );
};

export default SelectedRangeDisplay;
