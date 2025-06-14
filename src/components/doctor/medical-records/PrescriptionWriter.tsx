
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Pill, 
  Plus, 
  Trash2, 
  User, 
  Calendar,
  Clock,
  AlertTriangle,
  Save,
  Send
} from "lucide-react";

const PrescriptionWriter = () => {
  const [patientName, setPatientName] = useState('');
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    }
  ]);

  const frequencies = [
    'Once daily', 'Twice daily', 'Three times daily', 'Four times daily',
    'Every 4 hours', 'Every 6 hours', 'Every 8 hours', 'As needed'
  ];

  const addMedication = () => {
    const newId = Math.max(...medications.map(m => m.id), 0) + 1;
    setMedications([...medications, {
      id: newId,
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    }]);
  };

  const removeMedication = (id: number) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const updateMedication = (id: number, field: string, value: string) => {
    setMedications(medications.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleSave = () => {
    console.log('Saving prescription:', { patientName, medications });
  };

  const handleSend = () => {
    console.log('Sending prescription:', { patientName, medications });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Pill className="h-5 w-5 mr-2" />
          Prescription Writer
        </CardTitle>
        <CardDescription>Create and manage patient prescriptions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Patient Selection */}
        <div className="space-y-2">
          <Label htmlFor="patient">Patient</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="patient"
              placeholder="Search and select patient..."
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Prescription Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Prescription Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="pl-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Badge className="bg-green-100 text-green-800">
              Draft
            </Badge>
          </div>
        </div>

        {/* Medications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Medications</h3>
            <Button onClick={addMedication} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </div>

          {medications.map((medication, index) => (
            <Card key={medication.id} className="border-dashed">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Medication {index + 1}</h4>
                  {medications.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeMedication(medication.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Medication Name</Label>
                    <Input
                      placeholder="e.g., Amoxicillin"
                      value={medication.name}
                      onChange={(e) => updateMedication(medication.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Dosage</Label>
                    <Input
                      placeholder="e.g., 500mg"
                      value={medication.dosage}
                      onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select 
                      value={medication.frequency}
                      onValueChange={(value) => updateMedication(medication.id, 'frequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencies.map((freq) => (
                          <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      placeholder="e.g., 7 days"
                      value={medication.duration}
                      onChange={(e) => updateMedication(medication.id, 'duration', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Label>Special Instructions</Label>
                  <Textarea
                    placeholder="Take with food, avoid alcohol, etc."
                    value={medication.instructions}
                    onChange={(e) => updateMedication(medication.id, 'instructions', e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex space-x-4 pt-4">
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleSend}>
            <Send className="h-4 w-4 mr-2" />
            Send to Pharmacy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionWriter;
