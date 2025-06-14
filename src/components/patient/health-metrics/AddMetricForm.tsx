
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HealthMetric {
  id: string;
  type: 'blood_pressure' | 'weight' | 'glucose' | 'heart_rate';
  value: string;
  systolic?: number;
  diastolic?: number;
  date: Date;
  time: string;
  notes?: string;
}

interface AddMetricFormProps {
  onAddMetric: (metric: HealthMetric) => void;
}

const AddMetricForm = ({ onAddMetric }: AddMetricFormProps) => {
  const { toast } = useToast();
  const [selectedMetric, setSelectedMetric] = useState('blood_pressure');
  const [newMetric, setNewMetric] = useState({
    systolic: '',
    diastolic: '',
    weight: '',
    glucose: '',
    heartRate: '',
    notes: ''
  });

  const handleAddMetric = () => {
    if (selectedMetric === 'blood_pressure' && (!newMetric.systolic || !newMetric.diastolic)) {
      toast({
        title: "Missing values",
        description: "Please enter both systolic and diastolic values.",
        variant: "destructive"
      });
      return;
    }

    let value = '';
    let systolic, diastolic;

    switch (selectedMetric) {
      case 'blood_pressure':
        value = `${newMetric.systolic}/${newMetric.diastolic}`;
        systolic = Number(newMetric.systolic);
        diastolic = Number(newMetric.diastolic);
        break;
      case 'weight':
        value = newMetric.weight;
        break;
      case 'glucose':
        value = newMetric.glucose;
        break;
      case 'heart_rate':
        value = newMetric.heartRate;
        break;
    }

    if (!value) {
      toast({
        title: "Missing value",
        description: "Please enter a value for the selected metric.",
        variant: "destructive"
      });
      return;
    }

    const newHealthMetric: HealthMetric = {
      id: Date.now().toString(),
      type: selectedMetric as any,
      value,
      systolic,
      diastolic,
      date: new Date(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      notes: newMetric.notes
    };

    onAddMetric(newHealthMetric);
    setNewMetric({
      systolic: '',
      diastolic: '',
      weight: '',
      glucose: '',
      heartRate: '',
      notes: ''
    });

    toast({
      title: "Metric added",
      description: "Your health metric has been recorded successfully."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Health Reading</CardTitle>
        <CardDescription>Record your latest health measurements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="metric-type">Metric Type</Label>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blood_pressure">Blood Pressure</SelectItem>
              <SelectItem value="weight">Weight</SelectItem>
              <SelectItem value="glucose">Blood Glucose</SelectItem>
              <SelectItem value="heart_rate">Heart Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedMetric === 'blood_pressure' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="systolic">Systolic (mmHg)</Label>
              <Input
                id="systolic"
                type="number"
                placeholder="120"
                value={newMetric.systolic}
                onChange={(e) => setNewMetric(prev => ({ ...prev, systolic: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
              <Input
                id="diastolic"
                type="number"
                placeholder="80"
                value={newMetric.diastolic}
                onChange={(e) => setNewMetric(prev => ({ ...prev, diastolic: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>
        )}

        {selectedMetric === 'weight' && (
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="68.5"
              value={newMetric.weight}
              onChange={(e) => setNewMetric(prev => ({ ...prev, weight: e.target.value }))}
              className="mt-1"
            />
          </div>
        )}

        {selectedMetric === 'glucose' && (
          <div>
            <Label htmlFor="glucose">Blood Glucose (mg/dL)</Label>
            <Input
              id="glucose"
              type="number"
              placeholder="95"
              value={newMetric.glucose}
              onChange={(e) => setNewMetric(prev => ({ ...prev, glucose: e.target.value }))}
              className="mt-1"
            />
          </div>
        )}

        {selectedMetric === 'heart_rate' && (
          <div>
            <Label htmlFor="heart-rate">Heart Rate (bpm)</Label>
            <Input
              id="heart-rate"
              type="number"
              placeholder="72"
              value={newMetric.heartRate}
              onChange={(e) => setNewMetric(prev => ({ ...prev, heartRate: e.target.value }))}
              className="mt-1"
            />
          </div>
        )}

        <div>
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Input
            id="notes"
            placeholder="Add any notes about this reading..."
            value={newMetric.notes}
            onChange={(e) => setNewMetric(prev => ({ ...prev, notes: e.target.value }))}
            className="mt-1"
          />
        </div>

        <Button onClick={handleAddMetric} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Reading
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddMetricForm;
