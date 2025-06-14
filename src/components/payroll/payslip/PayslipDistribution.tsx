
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Send, Eye, Download, Users } from "lucide-react";
import { Payslip, PayslipDistribution as PayslipDistributionType } from '@/types/payslip';
import { PayslipGenerator as PayslipGeneratorUtil } from '@/utils/payslipGeneration';

interface PayslipDistributionProps {
  payslips: Payslip[];
  distributions: PayslipDistributionType[];
  onDistributionCreated: (distribution: PayslipDistributionType) => void;
}

const PayslipDistribution = ({ payslips, distributions, onDistributionCreated }: PayslipDistributionProps) => {
  const [selectedPayslips, setSelectedPayslips] = useState<string[]>([]);
  const [distributionMethod, setDistributionMethod] = useState<'email' | 'portal' | 'both'>('email');
  const [isDistributing, setIsDistributing] = useState(false);

  const handleSelectPayslip = (payslipId: string, checked: boolean) => {
    setSelectedPayslips(prev => 
      checked 
        ? [...prev, payslipId]
        : prev.filter(id => id !== payslipId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedPayslips(checked ? payslips.map(p => p.id) : []);
  };

  const handleDistribute = async () => {
    if (selectedPayslips.length === 0) return;

    setIsDistributing(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const selectedPayslipObjects = payslips.filter(p => selectedPayslips.includes(p.id));
    const distribution = PayslipGeneratorUtil.createDistribution(
      selectedPayslipObjects[0]?.payrollRunId || '',
      selectedPayslipObjects,
      distributionMethod
    );

    onDistributionCreated(distribution);
    setSelectedPayslips([]);
    setIsDistributing(false);
  };

  const getStatusColor = (status: Payslip['status']) => {
    switch (status) {
      case 'generated': return 'bg-blue-100 text-blue-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'viewed': return 'bg-purple-100 text-purple-800';
      case 'downloaded': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEmailStatusColor = (status: Payslip['emailStatus']) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-emerald-100 text-emerald-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Distribution Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Distribute Payslips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Select value={distributionMethod} onValueChange={(value: any) => setDistributionMethod(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Only</SelectItem>
                  <SelectItem value="portal">Portal Only</SelectItem>
                  <SelectItem value="both">Email + Portal</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleDistribute}
                disabled={selectedPayslips.length === 0 || isDistributing}
                className="min-w-32"
              >
                {isDistributing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Distributing...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Distribute ({selectedPayslips.length})
                  </>
                )}
              </Button>
            </div>

            {selectedPayslips.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm">
                  {selectedPayslips.length} payslip(s) selected for distribution via {distributionMethod}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payslips Table */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Payslips</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedPayslips.length === payslips.length && payslips.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email Status</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payslips.map((payslip) => (
                <TableRow key={payslip.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedPayslips.includes(payslip.id)}
                      onCheckedChange={(checked) => handleSelectPayslip(payslip.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{payslip.employee.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {payslip.employee.department} • {payslip.employee.position}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{payslip.payPeriod}</p>
                      <p className="text-muted-foreground">Pay Date: {payslip.payDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">₹{payslip.salaryBreakdown.netSalary.toLocaleString()}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payslip.status)}>
                      {payslip.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getEmailStatusColor(payslip.emailStatus)}>
                      {payslip.emailStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{new Date(payslip.generatedAt).toLocaleDateString()}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Distribution History */}
      {distributions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Distribution History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {distributions.map((distribution) => (
                <div key={distribution.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      Distribution via {distribution.distributionMethod}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {distribution.summary.total} payslips • {distribution.summary.sent} sent • {distribution.summary.failed} failed
                    </p>
                  </div>
                  <Badge className={distribution.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {distribution.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PayslipDistribution;
