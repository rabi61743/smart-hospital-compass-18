import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, Clock } from "lucide-react";
import { TimeBasedRate } from "@/types/conditions";

interface TimeBasedRatesBuilderProps {
  timeBasedRates: TimeBasedRate[];
  onChange: (rates: TimeBasedRate[]) => void;
}

const TimeBasedRatesBuilder = ({ timeBasedRates, onChange }: TimeBasedRatesBuilderProps) => {
  const [newRate, setNewRate] = useState<Partial<TimeBasedRate>>({
    name: '',
    rateMultiplier: 1.5,
    conditions: {}
  });

  const daysOfWeek = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  const handleAddRate = () => {
    if (!newRate.name || !newRate.rateMultiplier) return;

    const rate: TimeBasedRate = {
      id: Date.now().toString(),
      name: newRate.name,
      rateMultiplier: newRate.rateMultiplier,
      conditions: newRate.conditions || {}
    };

    onChange([...timeBasedRates, rate]);
    setNewRate({
      name: '',
      rateMultiplier: 1.5,
      conditions: {}
    });
  };

  const handleRemoveRate = (id: string) => {
    onChange(timeBasedRates.filter(rate => rate.id !== id));
  };

  const handleDayToggle = (day: number, checked: boolean) => {
    const currentDays = newRate.conditions?.daysOfWeek || [];
    const updatedDays = checked 
      ? [...currentDays, day]
      : currentDays.filter(d => d !== day);
    
    setNewRate({
      ...newRate,
      conditions: {
        ...newRate.conditions,
        daysOfWeek: updatedDays
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-4 w-4" />
        <Label className="text-base font-medium">Time-Based Rate Modifiers</Label>
      </div>

      {/* Existing time-based rates */}
      {timeBasedRates.map((rate) => (
        <Card key={rate.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h4 className="font-medium">{rate.name}</h4>
              <p className="text-sm text-muted-foreground">
                Multiplier: {rate.rateMultiplier}x
              </p>
              <div className="text-xs text-muted-foreground">
                {rate.conditions.startTime && rate.conditions.endTime && (
                  <div>Time: {rate.conditions.startTime} - {rate.conditions.endTime}</div>
                )}
                {rate.conditions.daysOfWeek && (
                  <div>Days: {rate.conditions.daysOfWeek.map(d => daysOfWeek[d].label).join(', ')}</div>
                )}
                {rate.conditions.isWeekend && <div>Weekends only</div>}
                {rate.conditions.isPeakHour && <div>Peak hours only</div>}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveRate(rate.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}

      {/* Add new time-based rate */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Add Time-Based Rate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Rate Name</Label>
              <Input
                value={newRate.name || ''}
                onChange={(e) => setNewRate({ ...newRate, name: e.target.value })}
                placeholder="e.g., Weekend Premium"
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs">Rate Multiplier</Label>
              <Input
                type="number"
                step="0.1"
                min="0.1"
                value={newRate.rateMultiplier || ''}
                onChange={(e) => setNewRate({ ...newRate, rateMultiplier: parseFloat(e.target.value) })}
                placeholder="1.5"
                className="h-8"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Start Time</Label>
              <Input
                type="time"
                value={newRate.conditions?.startTime || ''}
                onChange={(e) => setNewRate({
                  ...newRate,
                  conditions: { ...newRate.conditions, startTime: e.target.value }
                })}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs">End Time</Label>
              <Input
                type="time"
                value={newRate.conditions?.endTime || ''}
                onChange={(e) => setNewRate({
                  ...newRate,
                  conditions: { ...newRate.conditions, endTime: e.target.value }
                })}
                className="h-8"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Days of Week</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {daysOfWeek.map((day) => (
                <div key={day.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`day-${day.value}`}
                    checked={newRate.conditions?.daysOfWeek?.includes(day.value) || false}
                    onCheckedChange={(checked) => handleDayToggle(day.value, checked as boolean)}
                  />
                  <Label htmlFor={`day-${day.value}`} className="text-xs">
                    {day.label.slice(0, 3)}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="weekend-only"
                checked={newRate.conditions?.isWeekend || false}
                onCheckedChange={(checked) => setNewRate({
                  ...newRate,
                  conditions: { ...newRate.conditions, isWeekend: checked as boolean }
                })}
              />
              <Label htmlFor="weekend-only" className="text-xs">Weekend Only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="peak-hours"
                checked={newRate.conditions?.isPeakHour || false}
                onCheckedChange={(checked) => setNewRate({
                  ...newRate,
                  conditions: { ...newRate.conditions, isPeakHour: checked as boolean }
                })}
              />
              <Label htmlFor="peak-hours" className="text-xs">Peak Hours (8-10AM, 6-8PM)</Label>
            </div>
          </div>

          <Button onClick={handleAddRate} size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Time-Based Rate
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeBasedRatesBuilder;
