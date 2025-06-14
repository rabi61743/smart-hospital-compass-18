
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Plus, Trash2 } from "lucide-react";
import { OvertimeRecord } from '@/types/salary';

interface OvertimeSectionProps {
  overtimeRecords: OvertimeRecord[];
  onOvertimeRecordsChange: (records: OvertimeRecord[]) => void;
  employeeId: string;
}

const OvertimeSection = ({ overtimeRecords, onOvertimeRecordsChange, employeeId }: OvertimeSectionProps) => {
  const [newOvertime, setNewOvertime] = useState({
    date: '',
    hours: '',
    rate: '1.5'
  });

  const addOvertimeRecord = () => {
    if (!newOvertime.date || !newOvertime.hours) return;

    const record: OvertimeRecord = {
      id: Date.now().toString(),
      employeeId,
      date: newOvertime.date,
      hours: parseFloat(newOvertime.hours),
      rate: parseFloat(newOvertime.rate),
      approved: true
    };

    onOvertimeRecordsChange([...overtimeRecords, record]);
    setNewOvertime({ date: '', hours: '', rate: '1.5' });
  };

  const removeOvertimeRecord = (id: string) => {
    onOvertimeRecordsChange(overtimeRecords.filter(record => record.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Overtime Records
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div>
            <Label htmlFor="overtime-date">Date</Label>
            <Input
              id="overtime-date"
              type="date"
              value={newOvertime.date}
              onChange={(e) => setNewOvertime(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="overtime-hours">Hours</Label>
            <Input
              id="overtime-hours"
              type="number"
              placeholder="Hours"
              value={newOvertime.hours}
              onChange={(e) => setNewOvertime(prev => ({ ...prev, hours: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="overtime-rate">Rate</Label>
            <Select 
              value={newOvertime.rate} 
              onValueChange={(value) => setNewOvertime(prev => ({ ...prev, rate: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1.5">1.5x (Regular OT)</SelectItem>
                <SelectItem value="2.0">2.0x (Holiday/Sunday)</SelectItem>
                <SelectItem value="2.5">2.5x (Festival)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button onClick={addOvertimeRecord} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {overtimeRecords.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Overtime Records</h4>
            {overtimeRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex gap-4">
                  <span className="text-sm">{new Date(record.date).toLocaleDateString()}</span>
                  <span className="text-sm font-medium">{record.hours}h</span>
                  <span className="text-sm">{record.rate}x rate</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeOvertimeRecord(record.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OvertimeSection;
