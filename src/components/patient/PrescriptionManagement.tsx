
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pill, Calendar, Clock, AlertTriangle, Plus, RefreshCw, FileText, Phone } from "lucide-react";
import { format, addDays } from "date-fns";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  prescribedDate: Date;
  quantity: number;
  remainingQuantity: number;
  refillsRemaining: number;
  lastRefill?: Date;
  nextRefillDue?: Date;
  status: 'active' | 'discontinued' | 'pending_refill';
  instructions: string;
  sideEffects?: string[];
}

interface RefillRequest {
  id: string;
  medicationId: string;
  medicationName: string;
  requestDate: Date;
  status: 'pending' | 'approved' | 'ready' | 'completed' | 'denied';
  pharmacy: string;
  notes?: string;
  estimatedReady?: Date;
}

const PrescriptionManagement = () => {
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [refillRequestOpen, setRefillRequestOpen] = useState(false);
  const [selectedMedicationForRefill, setSelectedMedicationForRefill] = useState<string>('');

  // Mock data for current medications
  const currentMedications: Medication[] = [
    {
      id: 'med1',
      name: 'Amlodipine',
      dosage: '5mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Johnson',
      prescribedDate: new Date('2024-01-15'),
      quantity: 30,
      remainingQuantity: 8,
      refillsRemaining: 2,
      lastRefill: new Date('2024-01-15'),
      nextRefillDue: new Date('2024-02-14'),
      status: 'active',
      instructions: 'Take with food in the morning',
      sideEffects: ['Ankle swelling', 'Dizziness']
    },
    {
      id: 'med2',
      name: 'Metoprolol',
      dosage: '25mg',
      frequency: 'Twice daily',
      prescribedBy: 'Dr. Sarah Johnson',
      prescribedDate: new Date('2024-01-15'),
      quantity: 60,
      remainingQuantity: 15,
      refillsRemaining: 1,
      lastRefill: new Date('2024-01-15'),
      nextRefillDue: new Date('2024-02-14'),
      status: 'active',
      instructions: 'Take with meals',
      sideEffects: ['Fatigue', 'Cold hands']
    },
    {
      id: 'med3',
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Emily Davis',
      prescribedDate: new Date('2023-12-10'),
      quantity: 90,
      remainingQuantity: 45,
      refillsRemaining: 3,
      status: 'active',
      instructions: 'Take with largest meal of the day'
    }
  ];

  // Mock data for refill requests
  const refillRequests: RefillRequest[] = [
    {
      id: 'ref1',
      medicationId: 'med1',
      medicationName: 'Amlodipine 5mg',
      requestDate: new Date('2024-01-28'),
      status: 'ready',
      pharmacy: 'MediPlus Pharmacy',
      estimatedReady: new Date('2024-01-30'),
      notes: 'Ready for pickup'
    },
    {
      id: 'ref2',
      medicationId: 'med2',
      medicationName: 'Metoprolol 25mg',
      requestDate: new Date('2024-01-25'),
      status: 'pending',
      pharmacy: 'Health First Pharmacy',
      notes: 'Awaiting doctor approval'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending_refill': return 'bg-yellow-100 text-yellow-800';
      case 'discontinued': return 'bg-red-100 text-red-800';
      case 'ready': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'denied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMedicationAlert = (medication: Medication) => {
    const daysUntilRefill = medication.nextRefillDue 
      ? Math.ceil((medication.nextRefillDue.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      : null;
    
    if (medication.remainingQuantity <= 5) {
      return { type: 'urgent', message: 'Low supply - refill needed soon' };
    }
    if (daysUntilRefill && daysUntilRefill <= 3) {
      return { type: 'warning', message: 'Refill due soon' };
    }
    return null;
  };

  const handleRefillRequest = () => {
    // Handle refill request logic here
    console.log('Refill request submitted for medication:', selectedMedicationForRefill);
    setRefillRequestOpen(false);
    setSelectedMedicationForRefill('');
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Medications</p>
                <p className="text-2xl font-bold">{currentMedications.filter(m => m.status === 'active').length}</p>
              </div>
              <Pill className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Refills Due</p>
                <p className="text-2xl font-bold">
                  {currentMedications.filter(m => {
                    const daysUntilRefill = m.nextRefillDue 
                      ? Math.ceil((m.nextRefillDue.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                      : null;
                    return daysUntilRefill && daysUntilRefill <= 7;
                  }).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Refills</p>
                <p className="text-2xl font-bold">
                  {refillRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready for Pickup</p>
                <p className="text-2xl font-bold">
                  {refillRequests.filter(r => r.status === 'ready').length}
                </p>
              </div>
              <RefreshCw className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="current">Current Medications</TabsTrigger>
            <TabsTrigger value="refills">Refill Requests</TabsTrigger>
            <TabsTrigger value="history">Prescription History</TabsTrigger>
          </TabsList>
          <Dialog open={refillRequestOpen} onOpenChange={setRefillRequestOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Request Refill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Medication Refill</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Medication</label>
                  <Select value={selectedMedicationForRefill} onValueChange={setSelectedMedicationForRefill}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose medication" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentMedications.map((med) => (
                        <SelectItem key={med.id} value={med.id}>
                          {med.name} {med.dosage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Preferred Pharmacy</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pharmacy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mediplux">MediPlus Pharmacy</SelectItem>
                      <SelectItem value="healthfirst">Health First Pharmacy</SelectItem>
                      <SelectItem value="careplus">Care Plus Pharmacy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Additional Notes</label>
                  <Textarea placeholder="Any special instructions or notes..." />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleRefillRequest} className="flex-1">
                    Submit Request
                  </Button>
                  <Button variant="outline" onClick={() => setRefillRequestOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="current" className="space-y-4">
          {currentMedications.map((medication) => {
            const alert = getMedicationAlert(medication);
            return (
              <Card key={medication.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Pill className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">{medication.name}</h3>
                        <Badge className={getStatusColor(medication.status)}>
                          {medication.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        {alert && (
                          <Badge variant={alert.type === 'urgent' ? 'destructive' : 'secondary'}>
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {alert.message}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Dosage & Frequency</p>
                          <p className="font-medium">{medication.dosage} - {medication.frequency}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Prescribed by</p>
                          <p className="font-medium">{medication.prescribedBy}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Remaining</p>
                          <p className="font-medium">{medication.remainingQuantity} of {medication.quantity}</p>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-800">
                          <strong>Instructions:</strong> {medication.instructions}
                        </p>
                      </div>

                      {medication.nextRefillDue && (
                        <div className="mt-2 flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          Next refill due: {format(medication.nextRefillDue, "PPP")}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedMedication(medication)}>
                            <FileText className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Medication Details</DialogTitle>
                          </DialogHeader>
                          {selectedMedication && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Medication</label>
                                  <p>{selectedMedication.name} {selectedMedication.dosage}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Frequency</label>
                                  <p>{selectedMedication.frequency}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Prescribed Date</label>
                                  <p>{format(selectedMedication.prescribedDate, "PPP")}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Refills Remaining</label>
                                  <p>{selectedMedication.refillsRemaining}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Instructions</label>
                                <p className="text-sm">{selectedMedication.instructions}</p>
                              </div>
                              {selectedMedication.sideEffects && (
                                <div>
                                  <label className="text-sm font-medium">Possible Side Effects</label>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {selectedMedication.sideEffects.map((effect, i) => (
                                      <Badge key={i} variant="outline" className="text-xs">
                                        {effect}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" onClick={() => {
                        setSelectedMedicationForRefill(medication.id);
                        setRefillRequestOpen(true);
                      }}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Request Refill
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="refills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Refill Requests</CardTitle>
              <CardDescription>Track your medication refill requests and status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Pharmacy</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Est. Ready</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {refillRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.medicationName}</TableCell>
                      <TableCell>{format(request.requestDate, "PPP")}</TableCell>
                      <TableCell>{request.pharmacy}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.estimatedReady ? format(request.estimatedReady, "PPP") : 'TBD'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {request.status === 'ready' && (
                            <Button size="sm" variant="outline">
                              <Phone className="h-3 w-3 mr-1" />
                              Call Pharmacy
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            Track
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

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prescription History</CardTitle>
              <CardDescription>Complete history of your prescriptions and medications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Prescription History</h3>
                <p className="text-gray-600 mb-4">Access your complete medication and prescription history</p>
                <Button>View Full History</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrescriptionManagement;
