
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

interface LabReportsFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  comparisonType: string;
  setComparisonType: (value: string) => void;
  showCustomDateRange: boolean;
  setShowCustomDateRange: (value: boolean) => void;
}

const LabReportsFilters = ({
  selectedCategory,
  setSelectedCategory,
  comparisonType,
  setComparisonType,
  showCustomDateRange,
  setShowCustomDateRange
}: LabReportsFiltersProps) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
  );
};

export default LabReportsFilters;
