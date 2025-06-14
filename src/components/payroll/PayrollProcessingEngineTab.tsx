
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Settings, History, Users, Calculator, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PayrollRunCreator from './payroll-engine/PayrollRunCreator';
import PayrollRunManager from './payroll-engine/PayrollRunManager';
import PayrollCorrections from './payroll-engine/PayrollCorrections';
import PayrollBatchProcessor from './payroll-engine/PayrollBatchProcessor';
import PayrollRunHistory from './payroll-engine/PayrollRunHistory';
import { PayrollRun } from '@/types/payrollProcessing';

const PayrollProcessingEngineTab = () => {
  const { toast } = useToast();
  const [activePayrollRuns, setActivePayrollRuns] = useState<PayrollRun[]>([
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
    {
      id: 'PR-1703123456790',
      name: 'Week 50 2024 Weekly Payroll',
      payPeriod: '2024-12-09 to 2024-12-15',
      startDate: '2024-12-09',
      endDate: '2024-12-15',
      payDate: '2024-12-16',
      frequency: 'weekly',
      status: 'draft',
      totalEmployees: 12,
      totalGrossPay: 285000,
      totalDeductions: 48500,
      totalNetPay: 236500,
      createdAt: '2024-12-16T08:00:00Z',
    }
  ]);

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

  const getStatusIcon = (status: PayrollRun['status']) => {
    switch (status) {
      case 'draft': return <Settings className="h-4 w-4" />;
      case 'calculating': return <Calculator className="h-4 w-4" />;
      case 'calculated': return <AlertTriangle className="h-4 w-4" />;
      case 'approved': return <Users className="h-4 w-4" />;
      case 'processed': return <Play className="h-4 w-4" />;
      case 'completed': return <History className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Active Runs</p>
              <p className="text-2xl font-bold">{activePayrollRuns.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-2xl font-bold">
                {activePayrollRuns.reduce((sum, run) => sum + run.totalEmployees, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Pending Approval</p>
              <p className="text-2xl font-bold text-yellow-600">
                {activePayrollRuns.filter(run => run.status === 'calculated').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Monthly Net Pay</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{activePayrollRuns
                  .filter(run => run.frequency === 'monthly')
                  .reduce((sum, run) => sum + run.totalNetPay, 0)
                  .toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Payroll Runs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Active Payroll Runs
          </CardTitle>
          <CardDescription>
            Current payroll runs in progress or pending approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activePayrollRuns.map((run) => (
              <div key={run.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(run.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(run.status)}
                      {run.status}
                    </span>
                  </Badge>
                  <div>
                    <h4 className="font-medium">{run.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {run.payPeriod} • {run.totalEmployees} employees • Pay Date: {new Date(run.payDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{run.totalNetPay.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Net Pay</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="create" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="create">Create Run</TabsTrigger>
          <TabsTrigger value="manage">Manage Runs</TabsTrigger>
          <TabsTrigger value="corrections">Corrections</TabsTrigger>
          <TabsTrigger value="batch">Batch Processing</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <PayrollRunCreator 
            onRunCreated={(newRun) => {
              setActivePayrollRuns(prev => [...prev, newRun]);
              toast({
                title: "Success",
                description: "Payroll run created successfully",
              });
            }}
          />
        </TabsContent>

        <TabsContent value="manage">
          <PayrollRunManager 
            payrollRuns={activePayrollRuns}
            onRunUpdated={(updatedRun) => {
              setActivePayrollRuns(prev => 
                prev.map(run => run.id === updatedRun.id ? updatedRun : run)
              );
              toast({
                title: "Success",
                description: "Payroll run updated successfully",
              });
            }}
          />
        </TabsContent>

        <TabsContent value="corrections">
          <PayrollCorrections 
            payrollRuns={activePayrollRuns}
            onCorrectionApplied={() => {
              toast({
                title: "Success",
                description: "Correction applied successfully",
              });
            }}
          />
        </TabsContent>

        <TabsContent value="batch">
          <PayrollBatchProcessor 
            payrollRuns={activePayrollRuns}
            onBatchProcessed={() => {
              toast({
                title: "Success",
                description: "Batch processing completed",
              });
            }}
          />
        </TabsContent>

        <TabsContent value="history">
          <PayrollRunHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollProcessingEngineTab;
