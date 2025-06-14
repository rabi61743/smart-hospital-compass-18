
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, Download, Eye } from "lucide-react";
import { TaxCalculator } from '@/utils/taxCalculations';
import { useToast } from "@/hooks/use-toast";

const TaxCalculationsTab = () => {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState('2024-12');
  const [calculationType, setCalculationType] = useState('all');

  // Mock employee tax data
  const employeeTaxData = [
    {
      id: 'EMP001',
      name: 'Dr. Sarah Johnson',
      grossSalary: 150000,
      basicSalary: 90000,
      incomeTax: 8500,
      pf: 10800,
      esi: 0, // Above ESI threshold
      professionalTax: 200,
      totalTax: 19500,
      netSalary: 130500,
      taxRegime: 'new' as const
    },
    {
      id: 'EMP002',
      name: 'Nurse Mary Wilson',
      grossSalary: 55000,
      basicSalary: 35000,
      incomeTax: 1200,
      pf: 4200,
      esi: 412,
      professionalTax: 200,
      totalTax: 6012,
      netSalary: 48988,
      taxRegime: 'old' as const
    },
    {
      id: 'EMP003',
      name: 'Dr. Michael Chen',
      grossSalary: 125000,
      basicSalary: 75000,
      incomeTax: 6800,
      pf: 9000,
      esi: 0,
      professionalTax: 200,
      totalTax: 16000,
      netSalary: 109000,
      taxRegime: 'new' as const
    }
  ];

  const handleRecalculate = () => {
    toast({
      title: "Success",
      description: "Tax calculations updated for all employees",
    });
  };

  const getTaxRegimeBadge = (regime: string) => (
    <Badge variant={regime === 'new' ? 'default' : 'secondary'}>
      {regime === 'new' ? 'New Regime' : 'Old Regime'}
    </Badge>
  );

  const totalGrossSalary = employeeTaxData.reduce((sum, emp) => sum + emp.grossSalary, 0);
  const totalTax = employeeTaxData.reduce((sum, emp) => sum + emp.totalTax, 0);
  const totalNetSalary = employeeTaxData.reduce((sum, emp) => sum + emp.netSalary, 0);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Tax Calculations
          </CardTitle>
          <CardDescription>
            Calculate income tax, PF, ESI, and professional tax for all employees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
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
            
            <Select value={calculationType} onValueChange={setCalculationType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Taxes</SelectItem>
                <SelectItem value="income_tax">Income Tax Only</SelectItem>
                <SelectItem value="pf">PF Only</SelectItem>
                <SelectItem value="esi">ESI Only</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleRecalculate}>
              <Calculator className="h-4 w-4 mr-2" />
              Recalculate
            </Button>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Gross Salary</p>
                  <p className="text-2xl font-bold">₹{totalGrossSalary.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Tax Deductions</p>
                  <p className="text-2xl font-bold text-red-600">₹{totalTax.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Net Salary</p>
                  <p className="text-2xl font-bold text-green-600">₹{totalNetSalary.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Tax Calculation Details */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Tax Breakdown</CardTitle>
          <CardDescription>Detailed tax calculations for each employee</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Gross Salary</TableHead>
                <TableHead>Income Tax</TableHead>
                <TableHead>PF</TableHead>
                <TableHead>ESI</TableHead>
                <TableHead>Prof. Tax</TableHead>
                <TableHead>Total Tax</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead>Tax Regime</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeTaxData.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">{employee.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>₹{employee.grossSalary.toLocaleString()}</TableCell>
                  <TableCell className="text-red-600">₹{employee.incomeTax.toLocaleString()}</TableCell>
                  <TableCell className="text-red-600">₹{employee.pf.toLocaleString()}</TableCell>
                  <TableCell className="text-red-600">
                    {employee.esi > 0 ? `₹${employee.esi.toLocaleString()}` : 'N/A'}
                  </TableCell>
                  <TableCell className="text-red-600">₹{employee.professionalTax.toLocaleString()}</TableCell>
                  <TableCell className="font-medium text-red-600">₹{employee.totalTax.toLocaleString()}</TableCell>
                  <TableCell className="font-medium text-green-600">₹{employee.netSalary.toLocaleString()}</TableCell>
                  <TableCell>{getTaxRegimeBadge(employee.taxRegime)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        TDS
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

export default TaxCalculationsTab;
