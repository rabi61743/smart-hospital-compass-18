import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, FileText, Pill, Activity, Download, Search, Filter } from "lucide-react";
import { mockTransactions, getTransactionsByPatient } from "@/data/mockPatientData";
import MedicalDocumentUpload from "./MedicalDocumentUpload";

interface MedicalRecord {
  id: string;
  date: Date;
  type: 'consultation' | 'surgery' | 'lab_test' | 'pharmacy' | 'emergency';
  doctor: string;
  department: string;
  diagnosis: string;
  treatment: string;
  medications: string[];
  notes: string;
  documents: string[];
  followUp?: Date;
}

const PatientMedicalHistory = ({ patientId = 'p1' }: { patientId?: string }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Mock medical history data
  const medicalHistory: MedicalRecord[] = [
    {
      id: 'rec1',
      date: new Date('2024-01-28'),
      type: 'consultation',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      diagnosis: 'Hypertension monitoring',
      treatment: 'Blood pressure medication adjustment',
      medications: ['Amlodipine 5mg', 'Metoprolol 25mg'],
      notes: 'Patient responding well to treatment. Continue current medication.',
      documents: ['ECG Report', 'Blood Test Results'],
      followUp: new Date('2024-02-28')
    },
    {
      id: 'rec2',
      date: new Date('2024-01-15'),
      type: 'lab_test',
      doctor: 'Lab Department',
      department: 'Laboratory',
      diagnosis: 'Routine blood work',
      treatment: 'Comprehensive metabolic panel',
      medications: [],
      notes: 'All values within normal range except slightly elevated cholesterol.',
      documents: ['Lab Report - Complete Blood Count', 'Lab Report - Lipid Profile']
    },
    {
      id: 'rec3',
      date: new Date('2023-12-10'),
      type: 'surgery',
      doctor: 'Dr. Michael Chen',
      department: 'General Surgery',
      diagnosis: 'Appendicitis',
      treatment: 'Laparoscopic appendectomy',
      medications: ['Cefazolin', 'Morphine', 'Ondansetron'],
      notes: 'Successful laparoscopic procedure. No complications. Recovery as expected.',
      documents: ['Surgery Report', 'Anesthesia Record', 'Post-op X-ray']
    }
  ];

  const patientTransactions = getTransactionsByPatient(patientId);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <Activity className="w-4 h-4" />;
      case 'surgery': return <Activity className="w-4 h-4" />;
      case 'lab_test': return <FileText className="w-4 h-4" />;
      case 'pharmacy': return <Pill className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'surgery': return 'bg-red-100 text-red-800';
      case 'lab_test': return 'bg-green-100 text-green-800';
      case 'pharmacy': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredHistory = medicalHistory.filter(record => {
    const matchesSearch = record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || record.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Visits</p>
                <p className="text-2xl font-bold">{medicalHistory.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Consultations</p>
                <p className="text-2xl font-bold">
                  {medicalHistory.filter(r => r.type === 'consultation').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lab Tests</p>
                <p className="text-2xl font-bold">
                  {medicalHistory.filter(r => r.type === 'lab_test').length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Surgeries</p>
                <p className="text-2xl font-bold">
                  {medicalHistory.filter(r => r.type === 'surgery').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="timeline">Medical Timeline</TabsTrigger>
            <TabsTrigger value="transactions">Financial History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export History
          </Button>
        </div>

        <TabsContent value="timeline" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search medical records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="consultation">Consultations</SelectItem>
                    <SelectItem value="surgery">Surgeries</SelectItem>
                    <SelectItem value="lab_test">Lab Tests</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-48">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="last30">Last 30 Days</SelectItem>
                    <SelectItem value="last90">Last 3 Months</SelectItem>
                    <SelectItem value="last365">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Medical Timeline */}
          <div className="space-y-4">
            {filteredHistory.map((record, index) => (
              <Card key={record.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(record.type)}
                      <div>
                        <h3 className="font-semibold">{record.diagnosis}</h3>
                        <p className="text-sm text-muted-foreground">
                          {record.date.toLocaleDateString()} • {record.doctor} • {record.department}
                        </p>
                      </div>
                    </div>
                    <Badge className={getTypeBadgeColor(record.type)}>
                      {record.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Treatment</h4>
                      <p className="text-sm text-muted-foreground">{record.treatment}</p>
                    </div>
                    {record.medications.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Medications</h4>
                        <div className="flex flex-wrap gap-1">
                          {record.medications.map((med, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {med}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {record.notes && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Notes</h4>
                      <p className="text-sm text-muted-foreground">{record.notes}</p>
                    </div>
                  )}

                  {record.documents.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Documents</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.documents.map((doc, i) => (
                          <Button key={i} variant="outline" size="sm">
                            <FileText className="w-3 h-3 mr-1" />
                            {doc}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {record.followUp && (
                    <div className="flex items-center text-sm text-blue-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      Follow-up scheduled for {record.followUp.toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial History</CardTitle>
              <CardDescription>Your medical transaction and billing history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.doctorName}</TableCell>
                      <TableCell>₹{transaction.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.insuranceCovered ? "default" : "secondary"}>
                          {transaction.insuranceCovered ? "Covered" : "Self Pay"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <MedicalDocumentUpload />
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>Your current prescription and medication history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Medication Management</h3>
                <p className="text-gray-600 mb-4">Track your medications and prescriptions</p>
                <Button>View Medications</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientMedicalHistory;
