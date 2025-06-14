
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Activity } from "lucide-react";
import LabReportsTab from './lab/LabReportsTab';

interface LabCommission {
  test: string;
  count: number;
  revenue: string;
  commission: string;
  rate: string;
}

interface LabCommissionsTableProps {
  labCommissions: LabCommission[];
}

const LabCommissionsTable = ({ labCommissions }: LabCommissionsTableProps) => {
  const totalRevenue = labCommissions.reduce((sum, lab) => {
    return sum + parseFloat(lab.revenue.replace(/[₹,]/g, ''));
  }, 0);

  const totalCommission = labCommissions.reduce((sum, lab) => {
    return sum + parseFloat(lab.commission.replace(/[₹,]/g, ''));
  }, 0);

  const totalTests = labCommissions.reduce((sum, lab) => sum + lab.count, 0);

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Commission Overview</TabsTrigger>
        <TabsTrigger value="dynamic">Dynamic Calculator</TabsTrigger>
        <TabsTrigger value="reports">Detailed Reports</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tests</p>
                  <p className="text-2xl font-bold">{totalTests}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Across all categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">From lab services</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Commission</p>
                  <p className="text-2xl font-bold text-green-600">₹{totalCommission.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {((totalCommission / totalRevenue) * 100).toFixed(1)}% of revenue
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Laboratory Commission Tracking</CardTitle>
            <CardDescription>Track commissions from lab tests and diagnostic procedures</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Type</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Commission Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {labCommissions.map((lab, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{lab.test}</TableCell>
                    <TableCell>{lab.count}</TableCell>
                    <TableCell>{lab.revenue}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{lab.rate}</Badge>
                    </TableCell>
                    <TableCell className="font-bold text-green-600">{lab.commission}</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="dynamic">
        <Card>
          <CardHeader>
            <CardTitle>Dynamic Commission Calculator</CardTitle>
            <CardDescription>
              Real-time commission calculation based on actual lab test transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LabReportsTab />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reports">
        <LabReportsTab />
      </TabsContent>
    </Tabs>
  );
};

export default LabCommissionsTable;
