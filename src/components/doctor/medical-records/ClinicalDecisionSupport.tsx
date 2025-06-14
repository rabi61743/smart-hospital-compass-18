
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Search, 
  Book, 
  Stethoscope,
  Bell,
  CheckCircle,
  XCircle,
  Info,
  Pill,
  FileText,
  Clock
} from "lucide-react";

const ClinicalDecisionSupport = () => {
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [diagnosticSymptoms, setDiagnosticSymptoms] = useState('');

  const drugInteractions = [
    {
      drugs: ['Warfarin', 'Aspirin'],
      severity: 'High',
      description: 'Increased risk of bleeding when used together',
      recommendation: 'Monitor INR closely, consider alternative antiplatelet therapy'
    },
    {
      drugs: ['Metformin', 'Contrast Media'],
      severity: 'Moderate',
      description: 'Risk of lactic acidosis with contrast procedures',
      recommendation: 'Discontinue metformin 48 hours before contrast procedure'
    }
  ];

  const treatmentGuidelines = [
    {
      id: 'hypertension',
      condition: 'Hypertension',
      category: 'Cardiovascular',
      guideline: 'ACC/AHA 2017 Guidelines',
      summary: 'BP >130/80 requires lifestyle modifications and medication',
      lastUpdated: '2023-12-01'
    },
    {
      id: 'diabetes',
      condition: 'Type 2 Diabetes',
      category: 'Endocrine',
      guideline: 'ADA 2024 Standards',
      summary: 'HbA1c target <7% for most adults, individualize based on comorbidities',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'pneumonia',
      condition: 'Community-Acquired Pneumonia',
      category: 'Infectious Disease',
      guideline: 'IDSA/ATS Guidelines',
      summary: 'Risk stratification determines inpatient vs outpatient treatment',
      lastUpdated: '2023-10-20'
    }
  ];

  const diagnosticTools = [
    {
      name: 'CHADS2-VASc Calculator',
      description: 'Stroke risk assessment in atrial fibrillation',
      category: 'Cardiovascular'
    },
    {
      name: 'Wells Score',
      description: 'Pulmonary embolism probability assessment',
      category: 'Pulmonary'
    },
    {
      name: 'GRACE Score',
      description: 'Risk stratification in acute coronary syndrome',
      category: 'Cardiovascular'
    }
  ];

  const clinicalAlerts = [
    {
      id: 'alert1',
      type: 'Drug Allergy',
      severity: 'Critical',
      message: 'Patient has documented penicillin allergy',
      patient: 'Sarah Johnson',
      timestamp: '2024-01-30 14:30'
    },
    {
      id: 'alert2',
      type: 'Lab Follow-up',
      severity: 'Moderate',
      message: 'Elevated creatinine requires monitoring',
      patient: 'Michael Chen',
      timestamp: '2024-01-30 13:15'
    },
    {
      id: 'alert3',
      type: 'Medication Review',
      severity: 'Low',
      message: 'Annual medication review due',
      patient: 'Emily Davis',
      timestamp: '2024-01-30 12:00'
    }
  ];

  const medications = [
    'Warfarin', 'Aspirin', 'Metformin', 'Lisinopril', 'Atorvastatin',
    'Metoprolol', 'Amlodipine', 'Omeprazole', 'Levothyroxine', 'Furosemide'
  ];

  const addMedication = (medication: string) => {
    if (!selectedMedications.includes(medication)) {
      setSelectedMedications([...selectedMedications, medication]);
    }
  };

  const removeMedication = (medication: string) => {
    setSelectedMedications(selectedMedications.filter(med => med !== medication));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical': return <XCircle className="h-4 w-4" />;
      case 'High': return <AlertTriangle className="h-4 w-4" />;
      case 'Moderate': return <Info className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Stethoscope className="h-5 w-5 mr-2" />
            Clinical Decision Support
          </CardTitle>
          <CardDescription>
            Evidence-based tools to support clinical decision making
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="interactions" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="interactions">Drug Interactions</TabsTrigger>
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              <TabsTrigger value="diagnostic">Diagnostic Tools</TabsTrigger>
              <TabsTrigger value="alerts">Clinical Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="interactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Drug Interaction Checker</CardTitle>
                  <CardDescription>
                    Check for potential interactions between medications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Medications</Label>
                    <Select onValueChange={addMedication}>
                      <SelectTrigger>
                        <SelectValue placeholder="Add medication..." />
                      </SelectTrigger>
                      <SelectContent>
                        {medications.filter(med => !selectedMedications.includes(med)).map((medication) => (
                          <SelectItem key={medication} value={medication}>
                            {medication}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedMedications.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Medications</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedMedications.map((medication) => (
                          <Badge 
                            key={medication} 
                            variant="secondary" 
                            className="cursor-pointer"
                            onClick={() => removeMedication(medication)}
                          >
                            <Pill className="h-3 w-3 mr-1" />
                            {medication}
                            <XCircle className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMedications.length >= 2 && (
                    <div className="space-y-3">
                      <h4 className="font-medium">Potential Interactions</h4>
                      {drugInteractions
                        .filter(interaction => 
                          interaction.drugs.every(drug => selectedMedications.includes(drug))
                        )
                        .map((interaction, index) => (
                          <Card key={index} className="border-l-4 border-l-orange-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Badge className={getSeverityColor(interaction.severity)}>
                                      {getSeverityIcon(interaction.severity)}
                                      {interaction.severity} Risk
                                    </Badge>
                                  </div>
                                  <h5 className="font-medium mb-1">
                                    {interaction.drugs.join(' + ')}
                                  </h5>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {interaction.description}
                                  </p>
                                  <div className="bg-blue-50 p-3 rounded-md">
                                    <p className="text-sm font-medium text-blue-900">
                                      Recommendation:
                                    </p>
                                    <p className="text-sm text-blue-800">
                                      {interaction.recommendation}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      
                      {drugInteractions.filter(interaction => 
                        interaction.drugs.every(drug => selectedMedications.includes(drug))
                      ).length === 0 && (
                        <Card className="border-l-4 border-l-green-500">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <span className="text-green-800 font-medium">
                                No known interactions detected
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guidelines" className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search treatment guidelines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                    <SelectItem value="endocrine">Endocrine</SelectItem>
                    <SelectItem value="infectious">Infectious Disease</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4">
                {treatmentGuidelines
                  .filter(guideline => 
                    guideline.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    guideline.category.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((guideline) => (
                    <Card key={guideline.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{guideline.condition}</h3>
                              <Badge variant="outline">{guideline.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {guideline.guideline}
                            </p>
                            <p className="text-sm mb-3">{guideline.summary}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>Updated: {guideline.lastUpdated}</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Book className="h-4 w-4 mr-1" />
                            View Full
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="diagnostic" className="space-y-4">
              <div className="grid gap-4">
                {diagnosticTools.map((tool, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{tool.name}</h3>
                            <Badge variant="outline">{tool.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {tool.description}
                          </p>
                        </div>
                        <Button size="sm">
                          <Stethoscope className="h-4 w-4 mr-1" />
                          Use Tool
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Symptom-Based Diagnostic Assistant</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="symptoms">Enter Patient Symptoms</Label>
                      <Textarea
                        id="symptoms"
                        placeholder="Describe symptoms, duration, severity..."
                        value={diagnosticSymptoms}
                        onChange={(e) => setDiagnosticSymptoms(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <Button>
                      <Search className="h-4 w-4 mr-2" />
                      Get Diagnostic Suggestions
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Active Clinical Alerts</h3>
                <Badge variant="secondary">
                  {clinicalAlerts.length} Active
                </Badge>
              </div>

              <div className="space-y-3">
                {clinicalAlerts.map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getSeverityColor(alert.severity)}>
                              {getSeverityIcon(alert.severity)}
                              {alert.severity}
                            </Badge>
                            <Badge variant="outline">{alert.type}</Badge>
                          </div>
                          <h4 className="font-medium mb-1">{alert.message}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Patient: {alert.patient}</span>
                            <span>{alert.timestamp}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Bell className="h-4 w-4 mr-1" />
                            Snooze
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Acknowledge
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalDecisionSupport;
