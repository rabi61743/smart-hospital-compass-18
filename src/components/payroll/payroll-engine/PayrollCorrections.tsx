
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Plus, CheckCircle, X } from "lucide-react";
import { PayrollRun, PayrollCorrection } from '@/types/payrollProcessing';

interface PayrollCorrectionsProps {
  payrollRuns: PayrollRun[];
  onCorrectionApplied: () => void;
}

const PayrollCorrections = ({ payrollRuns, onCorrectionApplied }: PayrollCorrectionsProps) => {
  const [selectedRun, setSelectedRun] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [correctionForm, setCorrectionForm] = useState({
    type: 'adjustment' as const,
    amount: '',
    description: '',
    reason: '',
  });

  // Mock employee data for selected run
  const employees = [
    { id: 'EMP001', name: 'Dr. Sarah Johnson' },
    { id: 'EMP002', name: 'Nurse Mary Wilson' },
    { id: 'EMP003', name: 'Dr. Michael Chen' },
  ];

  // Mock corrections data
  const [corrections, setCorrections] = useState<PayrollCorrection[]>([
    {
      id: 'PC-1',
      payrollEntryId: 'PE-001',
      type: 'bonus',
      description: 'Year-end performance bonus',
      amount: 5000,
      reason: 'Exceptional performance in Q4',
      appliedBy: 'HR Manager',
      appliedAt: '2024-12-16T10:00:00Z',
      approved: false,
    },
    {
      id: 'PC-2',
      payrollEntryId: 'PE-002',
      type: 'deduction',
      description: 'Late arrival penalty',
      amount: -500,
      reason: 'Multiple late arrivals in December',
      appliedBy: 'Department Head',
      appliedAt: '2024-12-16T11:00:00Z',
      approved: true,
      approvedBy: 'HR Director',
      approvedAt: '2024-12-16T14:00:00Z',
    },
  ]);

  const handleSubmitCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCorrection: PayrollCorrection = {
      id: `PC-${Date.now()}`,
      payrollEntryId: `PE-${selectedEmployee}`,
      type: correctionForm.type,
      description: correctionForm.description,
      amount: parseFloat(correctionForm.amount),
      reason: correctionForm.reason,
      appliedBy: 'Current User',
      appliedAt: new Date().toISOString(),
      approved: false,
    };

    setCorrections(prev => [...prev, newCorrection]);
    onCorrectionApplied();
    
    // Reset form
    setCorrectionForm({
      type: 'adjustment',
      amount: '',
      description: '',
      reason: '',
    });
    setSelectedEmployee('');
  };

  const handleApproveCorrection = (correctionId: string) => {
    setCorrections(prev => 
      prev.map(correction => 
        correction.id === correctionId 
          ? { 
              ...correction, 
              approved: true, 
              approvedBy: 'Current User',
              approvedAt: new Date().toISOString() 
            }
          : correction
      )
    );
    onCorrectionApplied();
  };

  const handleRejectCorrection = (correctionId: string) => {
    setCorrections(prev => prev.filter(correction => correction.id !== correctionId));
    onCorrectionApplied();
  };

  const getTypeColor = (type: PayrollCorrection['type']) => {
    switch (type) {
      case 'bonus': return 'bg-green-100 text-green-800';
      case 'deduction': return 'bg-red-100 text-red-800';
      case 'adjustment': return 'bg-blue-100 text-blue-800';
      case 'overtime': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Correction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Payroll Correction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitCorrection} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="payroll-run">Payroll Run</Label>
                <Select value={selectedRun} onValueChange={setSelectedRun}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payroll run" />
                  </SelectTrigger>
                  <SelectContent>
                    {payrollRuns.map((run) => (
                      <SelectItem key={run.id} value={run.id}>
                        {run.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="employee">Employee</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="correction-type">Correction Type</Label>
                <Select 
                  value={correctionForm.type} 
                  onValueChange={(value: any) => 
                    setCorrectionForm(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adjustment">Adjustment</SelectItem>
                    <SelectItem value="bonus">Bonus</SelectItem>
                    <SelectItem value="deduction">Deduction</SelectItem>
                    <SelectItem value="overtime">Overtime</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={correctionForm.amount}
                  onChange={(e) => 
                    setCorrectionForm(prev => ({ ...prev, amount: e.target.value }))
                  }
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={correctionForm.description}
                  onChange={(e) => 
                    setCorrectionForm(prev => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Brief description"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="reason">Reason for Correction</Label>
              <Textarea
                id="reason"
                value={correctionForm.reason}
                onChange={(e) => 
                  setCorrectionForm(prev => ({ ...prev, reason: e.target.value }))
                }
                placeholder="Detailed reason for this correction"
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={!selectedRun || !selectedEmployee}
              className="w-full"
            >
              Add Correction
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Pending Corrections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Pending Corrections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Applied By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {corrections.map((correction) => (
                <TableRow key={correction.id}>
                  <TableCell>
                    <div className="font-medium">Employee #{correction.payrollEntryId.split('-')[1]}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(correction.type)}>
                      {correction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={correction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ₹{Math.abs(correction.amount).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{correction.description}</p>
                      <p className="text-sm text-muted-foreground">{correction.reason}</p>
                    </div>
                  </TableCell>
                  <TableCell>{correction.appliedBy}</TableCell>
                  <TableCell>
                    {correction.approved ? (
                      <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {!correction.approved && (
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApproveCorrection(correction.id)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRejectCorrection(correction.id)}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollCorrections;
