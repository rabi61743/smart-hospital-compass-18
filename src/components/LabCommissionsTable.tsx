
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  return (
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {labCommissions.map((lab, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{lab.test}</TableCell>
                <TableCell>{lab.count}</TableCell>
                <TableCell>{lab.revenue}</TableCell>
                <TableCell>{lab.rate}</TableCell>
                <TableCell className="font-bold text-green-600">{lab.commission}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LabCommissionsTable;
