
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Eye, Users, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { mockPatients, mockTransactions, getPatientById, getTransactionsByPatient, getTotalRevenue } from "@/data/mockPatientData";

const PatientTransactionsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTransaction = selectedTransaction === '' || transaction.type === selectedTransaction;
    const matchesPatient = selectedPatient === '' || transaction.patientId === selectedPatient;
    
    return matchesSearch && matchesTransaction && matchesPatient;
  });

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
      completed: "default",
      pending: "secondary",
      cancelled: "destructive"
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const colors: { [key: string]: string } = {
      consultation: "bg-blue-100 text-blue-800",
      surgery: "bg-red-100 text-red-800",
      lab_test: "bg-purple-100 text-purple-800",
      pharmacy: "bg-green-100 text-green-800",
      referral: "bg-orange-100 text-orange-800"
    };
    
    return (
      <Badge className={colors[type] || "bg-gray-100 text-gray-800"}>
        {type.replace('_', ' ')}
      </Badge>
    );
  };

  const totalRevenue = getTotalRevenue();
  const completedTransactions = mockTransactions.filter(t => t.status === 'completed').length;
  const totalPatients = mockPatients.length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
            <p className="text-xs text-muted-foreground">Active patient records</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From completed transactions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTransactions}</div>
            <p className="text-xs text-muted-foreground">Successfully processed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTransactions.length}</div>
            <p className="text-xs text-muted-foreground">Total transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Patient Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Transactions</CardTitle>
          <CardDescription>
            Real patient data automatically integrated with commission calculations
          </CardDescription>
          
          {/* Filters */}
          <div className="flex gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients, doctors, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Select value={selectedTransaction} onValueChange={setSelectedTransaction}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Transaction Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="surgery">Surgery</SelectItem>
                <SelectItem value="lab_test">Lab Test</SelectItem>
                <SelectItem value="pharmacy">Pharmacy</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Patients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Patients</SelectItem>
                {mockPatients.map(patient => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.patientName}</TableCell>
                  <TableCell>{transaction.doctorName}</TableCell>
                  <TableCell>{transaction.department}</TableCell>
                  <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                  <TableCell className="max-w-xs truncate">{transaction.description}</TableCell>
                  <TableCell className="font-bold">₹{transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.insuranceCovered ? "default" : "secondary"}>
                      {transaction.insuranceCovered ? "Covered" : "Self-pay"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Transaction Details</DialogTitle>
                          <DialogDescription>
                            Complete information for transaction {transaction.id}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-sm text-gray-600">Patient Information</h4>
                              <div className="mt-1">
                                <p className="font-medium">{transaction.patientName}</p>
                                {(() => {
                                  const patient = getPatientById(transaction.patientId);
                                  return patient ? (
                                    <div className="text-sm text-gray-600 space-y-1">
                                      <p>Age: {patient.age} | Gender: {patient.gender}</p>
                                      <p>Phone: {patient.phoneNumber}</p>
                                      <p>Email: {patient.email}</p>
                                      <p>Address: {patient.address}</p>
                                      {patient.insuranceProvider && (
                                        <p>Insurance: {patient.insuranceProvider}</p>
                                      )}
                                    </div>
                                  ) : null;
                                })()}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-gray-600">Transaction Details</h4>
                              <div className="mt-1 space-y-1">
                                <p><strong>Doctor:</strong> {transaction.doctorName}</p>
                                <p><strong>Department:</strong> {transaction.department}</p>
                                <p><strong>Type:</strong> {transaction.type}</p>
                                <p><strong>Amount:</strong> ₹{transaction.amount.toLocaleString()}</p>
                                <p><strong>Date:</strong> {transaction.date.toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {transaction.status}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-gray-600">Description</h4>
                            <p className="mt-1 text-sm">{transaction.description}</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <h4 className="font-medium text-sm text-green-800">Commission Impact</h4>
                            <p className="text-sm text-green-700 mt-1">
                              {transaction.commissionCalculated 
                                ? "✓ Commission automatically calculated and applied"
                                : "⏳ Commission calculation pending"
                              }
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No transactions found matching your search criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientTransactionsTab;
