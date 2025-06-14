
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RefreshCw, TrendingUp, FileText, Users } from "lucide-react";
import { CommissionCalculator, Transaction, CommissionResult } from "@/utils/commissionCalculator";
import { CommissionRule } from "@/types/commission";

interface LabTestTransaction {
  id: string;
  testId: string;
  testName: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  testCategory: string;
  amount: number;
  quantity: number;
  testDate: Date;
  completionDate?: Date;
  status: 'pending' | 'completed' | 'cancelled';
  referredBy?: string;
  labTechnician?: string;
}

interface DynamicLabCommissionCalculatorProps {
  rules: CommissionRule[];
  period: string;
  selectedCategory: string;
}

const DynamicLabCommissionCalculator = ({ rules, period, selectedCategory }: DynamicLabCommissionCalculatorProps) => {
  const [labTransactions, setLabTransactions] = useState<LabTestTransaction[]>([]);
  const [commissionResults, setCommissionResults] = useState<CommissionResult[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('completed');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock lab test transaction data
  const generateMockLabTransactions = (): LabTestTransaction[] => {
    const testTypes = [
      { name: 'Complete Blood Count (CBC)', category: 'blood-tests', baseAmount: 450 },
      { name: 'Liver Function Test', category: 'blood-tests', baseAmount: 650 },
      { name: 'Thyroid Profile', category: 'blood-tests', baseAmount: 850 },
      { name: 'Chest X-Ray', category: 'imaging', baseAmount: 300 },
      { name: 'MRI Brain', category: 'imaging', baseAmount: 8500 },
      { name: 'CT Scan Abdomen', category: 'imaging', baseAmount: 4500 },
      { name: 'Urine Culture', category: 'microbiology', baseAmount: 350 },
      { name: 'Blood Culture', category: 'microbiology', baseAmount: 750 },
      { name: 'Pap Smear', category: 'pathology', baseAmount: 450 },
      { name: 'Biopsy Analysis', category: 'pathology', baseAmount: 2500 }
    ];

    const doctors = [
      { id: 'DOC001', name: 'Dr. Sarah Johnson', department: 'Internal Medicine' },
      { id: 'DOC002', name: 'Dr. Michael Chen', department: 'Cardiology' },
      { id: 'DOC003', name: 'Dr. Emily Rodriguez', department: 'Neurology' },
      { id: 'DOC004', name: 'Dr. James Wilson', department: 'Orthopedics' },
      { id: 'DOC005', name: 'Dr. Lisa Thompson', department: 'Gastroenterology' }
    ];

    const transactions: LabTestTransaction[] = [];
    const startDate = new Date(2024, 0, 1); // January 1, 2024
    const endDate = new Date();

    for (let i = 0; i < 50; i++) {
      const test = testTypes[Math.floor(Math.random() * testTypes.length)];
      const doctor = doctors[Math.floor(Math.random() * doctors.length)];
      const testDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
      const completionDate = new Date(testDate.getTime() + Math.random() * 24 * 60 * 60 * 1000 * 3); // 0-3 days later
      
      transactions.push({
        id: `LAB${String(i + 1).padStart(3, '0')}`,
        testId: `TEST${String(i + 1).padStart(3, '0')}`,
        testName: test.name,
        patientId: `PAT${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        patientName: `Patient ${i + 1}`,
        doctorId: doctor.id,
        doctorName: doctor.name,
        department: doctor.department,
        testCategory: test.category,
        amount: test.baseAmount + Math.floor(Math.random() * 500), // Add some variation
        quantity: 1,
        testDate,
        completionDate: Math.random() > 0.1 ? completionDate : undefined, // 90% completion rate
        status: Math.random() > 0.1 ? 'completed' : (Math.random() > 0.5 ? 'pending' : 'cancelled'),
        referredBy: Math.random() > 0.3 ? doctor.name : undefined,
        labTechnician: `Tech ${Math.floor(Math.random() * 10) + 1}`
      });
    }

    return transactions.sort((a, b) => b.testDate.getTime() - a.testDate.getTime());
  };

  useEffect(() => {
    // Load mock data
    const mockTransactions = generateMockLabTransactions();
    setLabTransactions(mockTransactions);
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        calculateCommissions();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh, labTransactions, rules]);

  const calculateCommissions = async () => {
    setIsCalculating(true);
    
    try {
      // Filter transactions based on criteria
      const filteredTransactions = labTransactions.filter(transaction => {
        if (filterStatus !== 'all' && transaction.status !== filterStatus) return false;
        if (selectedCategory !== 'all' && transaction.testCategory !== selectedCategory) return false;
        return true;
      });

      // Convert lab transactions to commission calculator format
      const commissionTransactions: Transaction[] = filteredTransactions.map(labTx => ({
        id: labTx.id,
        amount: labTx.amount,
        quantity: labTx.quantity,
        category: labTx.testCategory,
        type: 'doctor' as const,
        date: labTx.completionDate || labTx.testDate,
        description: `${labTx.testName} - ${labTx.patientName}`
      }));

      // Calculate commissions using existing calculator
      const calculator = new CommissionCalculator(rules);
      const results = calculator.calculateBatchCommissions(commissionTransactions);
      
      setCommissionResults(results);
    } catch (error) {
      console.error('Error calculating lab commissions:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    calculateCommissions();
  }, [labTransactions, rules, filterStatus, selectedCategory]);

  const totalCommission = commissionResults.reduce((sum, result) => sum + result.totalCommission, 0);
  const totalRevenue = commissionResults.reduce((sum, result) => sum + result.transaction.amount, 0);
  const completedTests = labTransactions.filter(tx => tx.status === 'completed').length;
  const pendingTests = labTransactions.filter(tx => tx.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Dynamic Lab Commission Calculator
          </CardTitle>
          <CardDescription>
            Real-time commission calculation based on actual lab test transactions for {period}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={calculateCommissions} 
                disabled={isCalculating}
                variant="outline"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isCalculating ? 'animate-spin' : ''}`} />
                {isCalculating ? 'Calculating...' : 'Refresh Calculations'}
              </Button>
              
              <Button
                onClick={() => setAutoRefresh(!autoRefresh)}
                variant={autoRefresh ? "default" : "outline"}
              >
                Auto Refresh {autoRefresh ? 'ON' : 'OFF'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Commission</p>
                <p className="text-2xl font-bold text-green-600">₹{totalCommission.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">From {commissionResults.length} transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {((totalCommission / totalRevenue) * 100).toFixed(1)}% commission rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Tests</p>
                <p className="text-2xl font-bold text-green-600">{completedTests}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">{pendingTests} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Commission</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{commissionResults.length > 0 ? (totalCommission / commissionResults.length).toFixed(0) : '0'}
                </p>
              </div>
              <Calculator className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Calculation Results</CardTitle>
          <CardDescription>
            Detailed breakdown of commission calculations for each lab test transaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissionResults.slice(0, 20).map((result) => {
                  const labTx = labTransactions.find(tx => tx.id === result.transaction.id);
                  return (
                    <TableRow key={result.transaction.id}>
                      <TableCell className="font-medium">{result.transaction.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{labTx?.testName || 'Unknown Test'}</div>
                          <div className="text-sm text-muted-foreground">{labTx?.patientName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{labTx?.doctorName}</div>
                          <div className="text-sm text-muted-foreground">{labTx?.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{result.transaction.category}</Badge>
                      </TableCell>
                      <TableCell>₹{result.transaction.amount.toLocaleString()}</TableCell>
                      <TableCell className="font-bold text-green-600">
                        ₹{result.totalCommission.toFixed(0)}
                      </TableCell>
                      <TableCell>
                        {result.calculations.length > 0 ? (
                          <div className="space-y-1">
                            {result.calculations.map((calc, idx) => (
                              <div key={idx} className="text-sm">
                                {calc.rateType === 'percentage' ? `${calc.rate}%` : `₹${calc.rate}`}
                                <div className="text-xs text-muted-foreground">{calc.ruleName}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Badge variant="secondary">No Rule</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            labTx?.status === 'completed' ? 'default' :
                            labTx?.status === 'pending' ? 'secondary' : 'destructive'
                          }
                        >
                          {labTx?.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {commissionResults.length > 20 && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Showing 20 of {commissionResults.length} results
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicLabCommissionCalculator;
