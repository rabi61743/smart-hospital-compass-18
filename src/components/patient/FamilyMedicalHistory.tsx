
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Heart, AlertTriangle, Plus, Edit, Trash2, DNA, Shield } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age?: number;
  isDeceased: boolean;
  ageAtDeath?: number;
  causeOfDeath?: string;
  medicalConditions: string[];
  geneticFactors: string[];
  lifestyle: {
    smoking: boolean;
    alcohol: boolean;
    exercise: string;
  };
}

interface GeneticRisk {
  condition: string;
  riskLevel: 'low' | 'moderate' | 'high';
  inheritancePattern: string;
  recommendedScreening: string[];
  notes?: string;
}

const FamilyMedicalHistory = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Rajesh Kumar Sr.',
      relationship: 'Father',
      age: 68,
      isDeceased: false,
      medicalConditions: ['Hypertension', 'Diabetes Type 2'],
      geneticFactors: ['High cholesterol'],
      lifestyle: {
        smoking: true,
        alcohol: false,
        exercise: 'minimal'
      }
    },
    {
      id: '2',
      name: 'Sunita Kumar',
      relationship: 'Mother',
      age: 63,
      isDeceased: false,
      medicalConditions: ['Osteoporosis'],
      geneticFactors: ['Breast cancer gene'],
      lifestyle: {
        smoking: false,
        alcohol: false,
        exercise: 'regular'
      }
    },
    {
      id: '3',
      name: 'Ramesh Kumar',
      relationship: 'Paternal Grandfather',
      isDeceased: true,
      ageAtDeath: 72,
      causeOfDeath: 'Heart attack',
      medicalConditions: ['Coronary artery disease', 'Diabetes'],
      geneticFactors: ['Cardiovascular disease'],
      lifestyle: {
        smoking: true,
        alcohol: true,
        exercise: 'minimal'
      }
    }
  ]);

  const [geneticRisks, setGeneticRisks] = useState<GeneticRisk[]>([
    {
      condition: 'Cardiovascular Disease',
      riskLevel: 'moderate',
      inheritancePattern: 'Multifactorial',
      recommendedScreening: ['Annual ECG', 'Lipid profile every 6 months', 'Blood pressure monitoring'],
      notes: 'Family history of heart disease on paternal side'
    },
    {
      condition: 'Type 2 Diabetes',
      riskLevel: 'high',
      inheritancePattern: 'Multifactorial',
      recommendedScreening: ['HbA1c every 6 months', 'Glucose tolerance test annually'],
      notes: 'Both paternal grandfather and father have diabetes'
    },
    {
      condition: 'Breast Cancer',
      riskLevel: 'moderate',
      inheritancePattern: 'Autosomal dominant',
      recommendedScreening: ['Annual mammography from age 40', 'Genetic counseling'],
      notes: 'Maternal history - consider genetic testing'
    }
  ]);

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    name: '',
    relationship: '',
    isDeceased: false,
    medicalConditions: [],
    geneticFactors: [],
    lifestyle: {
      smoking: false,
      alcohol: false,
      exercise: 'moderate'
    }
  });

  const relationships = [
    'Father', 'Mother', 'Brother', 'Sister', 'Son', 'Daughter',
    'Paternal Grandfather', 'Paternal Grandmother', 'Maternal Grandfather', 'Maternal Grandmother',
    'Paternal Uncle', 'Paternal Aunt', 'Maternal Uncle', 'Maternal Aunt',
    'Cousin', 'Other'
  ];

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.relationship) {
      const member: FamilyMember = {
        id: Date.now().toString(),
        name: newMember.name,
        relationship: newMember.relationship,
        age: newMember.age,
        isDeceased: newMember.isDeceased || false,
        ageAtDeath: newMember.ageAtDeath,
        causeOfDeath: newMember.causeOfDeath,
        medicalConditions: newMember.medicalConditions || [],
        geneticFactors: newMember.geneticFactors || [],
        lifestyle: newMember.lifestyle || {
          smoking: false,
          alcohol: false,
          exercise: 'moderate'
        }
      };
      setFamilyMembers(prev => [...prev, member]);
      setNewMember({
        name: '',
        relationship: '',
        isDeceased: false,
        medicalConditions: [],
        geneticFactors: [],
        lifestyle: {
          smoking: false,
          alcohol: false,
          exercise: 'moderate'
        }
      });
      setIsAddingMember(false);
    }
  };

  const deleteMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Family Members</p>
                <p className="text-2xl font-bold">{familyMembers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Genetic Risks</p>
                <p className="text-2xl font-bold">{geneticRisks.length}</p>
              </div>
              <DNA className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Risk Conditions</p>
                <p className="text-2xl font-bold">
                  {geneticRisks.filter(r => r.riskLevel === 'high').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Screenings Due</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="family-tree" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="family-tree">Family Tree</TabsTrigger>
            <TabsTrigger value="genetic-risks">Genetic Risks</TabsTrigger>
            <TabsTrigger value="screening">Screening Schedule</TabsTrigger>
            <TabsTrigger value="reports">Health Reports</TabsTrigger>
          </TabsList>
          <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Family Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Family Member</DialogTitle>
                <DialogDescription>
                  Add a family member and their medical history to track genetic risks.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newMember.name || ''}
                    onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Family member name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select
                    value={newMember.relationship || ''}
                    onValueChange={(value) => setNewMember(prev => ({ ...prev, relationship: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {relationships.map(rel => (
                        <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newMember.age || ''}
                    onChange={(e) => setNewMember(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    placeholder="Current age"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deceased">Status</Label>
                  <Select
                    value={newMember.isDeceased ? 'deceased' : 'living'}
                    onValueChange={(value) => setNewMember(prev => ({ ...prev, isDeceased: value === 'deceased' }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="living">Living</SelectItem>
                      <SelectItem value="deceased">Deceased</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newMember.isDeceased && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="ageAtDeath">Age at Death</Label>
                      <Input
                        id="ageAtDeath"
                        type="number"
                        value={newMember.ageAtDeath || ''}
                        onChange={(e) => setNewMember(prev => ({ ...prev, ageAtDeath: parseInt(e.target.value) }))}
                        placeholder="Age at death"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="causeOfDeath">Cause of Death</Label>
                      <Input
                        id="causeOfDeath"
                        value={newMember.causeOfDeath || ''}
                        onChange={(e) => setNewMember(prev => ({ ...prev, causeOfDeath: e.target.value }))}
                        placeholder="Cause of death"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingMember(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMember}>Add Member</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="family-tree" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Family Medical Tree</CardTitle>
              <CardDescription>Track your family's medical history and conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Age/Status</TableHead>
                    <TableHead>Medical Conditions</TableHead>
                    <TableHead>Genetic Factors</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {familyMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.relationship}</TableCell>
                      <TableCell>
                        {member.isDeceased ? (
                          <span className="text-gray-500">
                            Deceased ({member.ageAtDeath})
                          </span>
                        ) : (
                          <span>{member.age} years</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.medicalConditions.map((condition, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.geneticFactors.map((factor, i) => (
                            <Badge key={i} className="bg-purple-100 text-purple-800 text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteMember(member.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="genetic-risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Genetic Risk Assessment</CardTitle>
              <CardDescription>Your genetic predispositions based on family history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geneticRisks.map((risk, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-red-500" />
                        <div>
                          <h3 className="font-semibold">{risk.condition}</h3>
                          <p className="text-sm text-muted-foreground">
                            Inheritance: {risk.inheritancePattern}
                          </p>
                        </div>
                      </div>
                      <Badge className={getRiskBadgeColor(risk.riskLevel)}>
                        {risk.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="font-medium mb-2">Recommended Screening</h4>
                      <div className="flex flex-wrap gap-2">
                        {risk.recommendedScreening.map((screening, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {screening}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {risk.notes && (
                      <div>
                        <h4 className="font-medium mb-1">Notes</h4>
                        <p className="text-sm text-muted-foreground">{risk.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="screening" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preventive Screening Schedule</CardTitle>
              <CardDescription>Recommended health screenings based on your genetic risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-medium text-red-700">High Priority Screenings</h3>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• HbA1c test - Due in 2 weeks</li>
                    <li>• Lipid profile - Due next month</li>
                  </ul>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <h3 className="font-medium text-yellow-700">Moderate Priority Screenings</h3>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Annual mammography - Due in 3 months</li>
                    <li>• ECG - Due in 6 months</li>
                  </ul>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-medium text-green-700">Regular Screenings</h3>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Annual physical exam - Up to date</li>
                    <li>• Blood pressure monitoring - Up to date</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Family Health Reports</CardTitle>
              <CardDescription>Generate and share family medical history reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Family Health Reports</h3>
                <p className="text-gray-600 mb-4">Generate comprehensive family medical history reports for healthcare providers</p>
                <div className="space-x-2">
                  <Button>Generate PDF Report</Button>
                  <Button variant="outline">Share with Doctor</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FamilyMedicalHistory;
