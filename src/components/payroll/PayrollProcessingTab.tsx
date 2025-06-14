
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Calculator, Download, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PayrollProcessingTab = () => {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState('2024-12');
  const [processingStatus, setProcessingStatus] = useState('pending');

  const payrollData = [
    {
      id: 'EMP001',
      name: 'Dr. Sarah Johnson',
      baseSalary: 120000,
      allowances: 15000,
      deductions: 18000,
      netSalary: 117000,
      status: 'calculated'
    },
    {
      id: 'EMP002',
      name: 'Nurse Mary Wilson',
      baseSalary: 45000,
      allowances: 5000,
      deductions: 7500,
      netSalary: 42500,
      status: 'calculated'
    },
    {
      id: 'EMP003',
      name: 'Dr. Michael Chen',
      baseSalary: 95000,
      allowances: 12000,
      deductions: 15200,
      netSalary: 91800,
      status: 'calculated'
    },
    {
      id: 'EMP004',
      name: 'Lab Tech John Smith',
      baseSalary: 38000,
      allowances: 3000,
      deductions: 6080,
      netSalary: 34920,
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'calculated': return 'bg-blue-100 text-blue-800';
      case 'processed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'calculated': return <Calculator className="h-4 w-4" />;
      case 'processed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleProcessPayroll = () => {
    setProcessingStatus('processing');
    
    // Simulate processing delay
    setTimeout(() => {
      setProcessingStatus('completed');
      toast({
        title: "Success",
        description: "Payroll processed successfully for all employees",
      });
    }, 3000);
  };

  const totalBaseSalary = payrollData.reduce((sum, emp) => sum + emp.baseSalary, 0);
  const totalAllowances = payrollData.reduce((sum, emp) => sum + emp.allowances, 0);
  const totalDeductions = payrollData.reduce((sum, emp) => sum + emp.deductions, 0);
  const totalNetSalary = payrollData.reduce((sum, emp) => sum + emp.netSalary, 0);

  return (
    <div className="space-y-6">
      {/* Processing Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Payroll Processing
          </CardTitle>
          <CardDescription>Calculate and process monthly payroll for all employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Payroll Period:</span>
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-12">December 2024</SelectItem>
                <SelectItem value="2024-11">November 2024</SelectItem>
                <SelectItem value="2024-10">October 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleProcessPayroll}
              disabled={processingStatus === 'processing'}
            >
              {processingStatus === 'processing' ? 'Processing...' : 'Process Payroll'}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Payslips
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Base Salary</p>
                  <p className="text-2xl font-bold">₹{totalBaseSalary.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Allowances</p>
                  <p className="text-2xl font-bold text-green-600">₹{totalAllowances.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Deductions</p>
                  <p className="text-2xl font-bold text-red-600">₹{totalDeductions.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Net Payroll</p>
                  <p className="text-2xl font-bold text-blue-600">₹{totalNetSalary.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Details</CardTitle>
          <CardDescription>Detailed breakdown of salary calculations for each employee</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Allowances</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollData.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">{employee.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>₹{employee.baseSalary.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600">+₹{employee.allowances.toLocaleString()}</TableCell>
                  <TableCell className="text-red-600">-₹{employee.deductions.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">₹{employee.netSalary.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(employee.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(employee.status)}
                        {employee.status}
                      </span>
                    </Badge>
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

export default PayrollProcessingTab;
