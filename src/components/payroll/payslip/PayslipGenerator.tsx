
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Eye, Play } from "lucide-react";
import { PayrollRun } from '@/types/payrollProcessing';
import { Payslip } from '@/types/payslip';
import { PayslipGenerator as PayslipGeneratorUtil } from '@/utils/payslipGeneration';

interface PayslipGeneratorProps {
  payrollRuns: PayrollRun[];
  onPayslipsGenerated: (payslips: Payslip[]) => void;
}

const PayslipGenerator = ({ payrollRuns, onPayslipsGenerated }: PayslipGeneratorProps) => {
  const [selectedPayrollRun, setSelectedPayrollRun] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePayslips = async () => {
    if (!selectedPayrollRun) return;

    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const selectedRun = payrollRuns.find(run => run.id === selectedPayrollRun);
    if (selectedRun) {
      // Mock payroll entries for demonstration
      const mockPayrollEntries = Array.from({ length: selectedRun.totalEmployees }, (_, index) => ({
        id: `PE-${selectedRun.id}-EMP-${index + 1}`,
        payrollRunId: selectedRun.id,
        employeeId: `EMP-${index + 1}`,
        employee: {
          id: `EMP-${index + 1}`,
          name: `Employee ${index + 1}`,
          position: 'Staff',
          department: 'General',
          basicSalary: 50000,
        },
        salaryBreakdown: {
          basicPay: 50000,
          hra: 20000,
          da: 7500,
          medicalAllowance: 1250,
          transportAllowance: 1600,
          overtimePay: 0,
          bonuses: [],
          commissions: [],
          grossSalary: 80350,
          incomeTax: 8035,
          pf: 9642,
          esi: 602,
          otherDeductions: [],
          totalDeductions: 18479,
          netSalary: 61871,
        },
        status: 'calculated' as const,
        corrections: [],
        calculatedAt: new Date().toISOString(),
      }));

      const template = PayslipGeneratorUtil.getDefaultTemplate();
      const payslips = PayslipGeneratorUtil.generateBulkPayslips(mockPayrollEntries, template);
      
      onPayslipsGenerated(payslips);
    }

    setIsGenerating(false);
  };

  const getStatusColor = (status: PayrollRun['status']) => {
    switch (status) {
      case 'calculated': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'processed': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Payslips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Select value={selectedPayrollRun} onValueChange={setSelectedPayrollRun}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payroll run to generate payslips" />
                  </SelectTrigger>
                  <SelectContent>
                    {payrollRuns.map((run) => (
                      <SelectItem key={run.id} value={run.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{run.name}</span>
                          <Badge className={`ml-2 ${getStatusColor(run.status)}`}>
                            {run.status}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleGeneratePayslips}
                disabled={!selectedPayrollRun || isGenerating}
                className="min-w-32"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Generate Payslips
                  </>
                )}
              </Button>
            </div>

            {selectedPayrollRun && (
              <div className="p-4 bg-blue-50 rounded-lg">
                {(() => {
                  const selectedRun = payrollRuns.find(run => run.id === selectedPayrollRun);
                  return selectedRun ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Pay Period</p>
                        <p className="text-muted-foreground">{selectedRun.payPeriod}</p>
                      </div>
                      <div>
                        <p className="font-medium">Employees</p>
                        <p className="text-muted-foreground">{selectedRun.totalEmployees}</p>
                      </div>
                      <div>
                        <p className="font-medium">Total Net Pay</p>
                        <p className="text-muted-foreground">₹{selectedRun.totalNetPay.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Pay Date</p>
                        <p className="text-muted-foreground">{new Date(selectedRun.payDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Available Payroll Runs */}
      <Card>
        <CardHeader>
          <CardTitle>Available Payroll Runs</CardTitle>
        </CardHeader>
        <CardContent>
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
                        Pay Date: {new Date(run.payDate).toLocaleDateString()}
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
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
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

export default PayslipGenerator;
