
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Calculator, Play, Download, Eye, AlertTriangle } from "lucide-react";
import { PayrollRun } from '@/types/payrollProcessing';

interface PayrollRunManagerProps {
  payrollRuns: PayrollRun[];
  onRunUpdated: (run: PayrollRun) => void;
}

const PayrollRunManager = ({ payrollRuns, onRunUpdated }: PayrollRunManagerProps) => {
  const [selectedRun, setSelectedRun] = useState<string>('');

  const handleStatusChange = (run: PayrollRun, newStatus: PayrollRun['status']) => {
    const updatedRun = {
      ...run,
      status: newStatus,
      processedAt: newStatus === 'processed' ? new Date().toISOString() : run.processedAt,
    };
    onRunUpdated(updatedRun);
  };

  const getStatusColor = (status: PayrollRun['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'calculating': return 'bg-blue-100 text-blue-800';
      case 'calculated': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'processed': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextActions = (status: PayrollRun['status']) => {
    switch (status) {
      case 'draft': return ['calculating'];
      case 'calculating': return ['calculated'];
      case 'calculated': return ['approved'];
      case 'approved': return ['processed'];
      case 'processed': return ['completed'];
      default: return [];
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payroll Run Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Select value={selectedRun} onValueChange={setSelectedRun}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select a payroll run" />
                </SelectTrigger>
                <SelectContent>
                  {payrollRuns.map((run) => (
                    <SelectItem key={run.id} value={run.id}>
                      {run.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedRun && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              )}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payroll Run</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Total Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollRuns.map((run) => (
                  <TableRow key={run.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{run.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {run.frequency} • Pay Date: {new Date(run.payDate).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{new Date(run.startDate).toLocaleDateString()}</p>
                        <p className="text-muted-foreground">to {new Date(run.endDate).toLocaleDateString()}</p>
                      </div>
                    </TableCell>
                    <TableCell>{run.totalEmployees}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">₹{run.totalNetPay.toLocaleString()}</p>
                        <p className="text-muted-foreground">
                          Gross: ₹{run.totalGrossPay.toLocaleString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(run.status)}>
                        {run.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {getNextActions(run.status).map((nextStatus) => (
                          <Button
                            key={nextStatus}
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(run, nextStatus as PayrollRun['status'])}
                          >
                            {nextStatus === 'calculating' && <Calculator className="h-3 w-3 mr-1" />}
                            {nextStatus === 'calculated' && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {nextStatus === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {nextStatus === 'processed' && <Play className="h-3 w-3 mr-1" />}
                            {nextStatus}
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollRunManager;
