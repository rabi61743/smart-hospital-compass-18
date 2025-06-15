
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface QuickDatePresetsProps {
  onPresetSelect: (preset: string) => void;
}

const QuickDatePresets = ({ onPresetSelect }: QuickDatePresetsProps) => {
  const presets = [
    { key: 'today', label: 'Today' },
    { key: 'yesterday', label: 'Yesterday' },
    { key: 'last-7-days', label: 'Last 7 Days' },
    { key: 'last-30-days', label: 'Last 30 Days' },
    { key: 'this-month', label: 'This Month' },
    { key: 'last-month', label: 'Last Month' },
    { key: 'this-quarter', label: 'This Quarter' },
    { key: 'this-year', label: 'This Year' }
  ];

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Quick Date Ranges</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.key}
            variant="outline"
            size="sm"
            onClick={() => onPresetSelect(preset.key)}
            className="text-xs"
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickDatePresets;
