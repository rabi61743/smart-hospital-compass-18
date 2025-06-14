
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Mail, Users, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PayslipGenerator from './payslip/PayslipGenerator';
import PayslipDistribution from './payslip/PayslipDistribution';
import EmployeePortal from './payslip/EmployeePortal';
import PayslipTemplates from './payslip/PayslipTemplates';
import { Payslip, PayslipDistribution as PayslipDistributionType } from '@/types/payslip';
import { PayrollRun } from '@/types/payrollProcessing';

const PayslipGenerationTab = () => {
  const { toast } = useToast();
  const [generatedPayslips, setGeneratedPayslips] = useState<Payslip[]>([]);
  const [distributions, setDistributions] = useState<PayslipDistributionType[]>([]);

  // Mock payroll runs data
  const mockPayrollRuns: PayrollRun[] = [
    {
      id: 'PR-1703123456789',
      name: 'December 2024 Monthly Payroll',
      payPeriod: '2024-12-01 to 2024-12-31',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      payDate: '2024-12-31',
      frequency: 'monthly',
      status: 'calculated',
      totalEmployees: 45,
      totalGrossPay: 2850000,
      totalDeductions: 485000,
      totalNetPay: 2365000,
      createdAt: '2024-12-15T10:00:00Z',
    },
  ];

  const handlePayslipsGenerated = (payslips: Payslip[]) => {
    setGeneratedPayslips(prev => [...prev, ...payslips]);
    toast({
      title: "Success",
      description: `Generated ${payslips.length} payslips successfully`,
    });
  };

  const handleDistributionCreated = (distribution: PayslipDistributionType) => {
    setDistributions(prev => [...prev, distribution]);
    toast({
      title: "Success",
      description: "Payslip distribution initiated successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Generated Payslips</p>
              <p className="text-2xl font-bold">{generatedPayslips.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Sent This Month</p>
              <p className="text-2xl font-bold text-green-600">
                {generatedPayslips.filter(p => p.status === 'sent').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Viewed by Employees</p>
              <p className="text-2xl font-bold text-blue-600">
                {generatedPayslips.filter(p => p.status === 'viewed').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Downloads</p>
              <p className="text-2xl font-bold text-purple-600">
                {generatedPayslips.filter(p => p.status === 'downloaded').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generate
          </TabsTrigger>
          <TabsTrigger value="distribute" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Distribute
          </TabsTrigger>
          <TabsTrigger value="portal" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Employee Portal
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate">
          <PayslipGenerator 
            payrollRuns={mockPayrollRuns}
            onPayslipsGenerated={handlePayslipsGenerated}
          />
        </TabsContent>

        <TabsContent value="distribute">
          <PayslipDistribution 
            payslips={generatedPayslips}
            distributions={distributions}
            onDistributionCreated={handleDistributionCreated}
          />
        </TabsContent>

        <TabsContent value="portal">
          <EmployeePortal payslips={generatedPayslips} />
        </TabsContent>

        <TabsContent value="templates">
          <PayslipTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayslipGenerationTab;
