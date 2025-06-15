
import React from 'react';
import QuickDatePresets from './date-filter/QuickDatePresets';
import CustomDateSelectors from './date-filter/CustomDateSelectors';
import SelectedRangeDisplay from './date-filter/SelectedRangeDisplay';
import { handlePresetRange } from './date-filter/datePresetLogic';

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
  const handlePresetSelect = (preset: string) => {
    handlePresetRange(preset, onDateFromChange, onDateToChange);
  };

  return (
    <div className="space-y-4">
      {/* Quick Preset Buttons */}
      <QuickDatePresets onPresetSelect={handlePresetSelect} />

      {/* Custom Date Range Selectors */}
      <CustomDateSelectors
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={onDateFromChange}
        onDateToChange={onDateToChange}
      />

      {/* Selected Range Display and Reset */}
      <SelectedRangeDisplay
        dateFrom={dateFrom}
        dateTo={dateTo}
        onReset={onReset}
      />
    </div>
  );
};

export default CustomDateRangeFilter;
