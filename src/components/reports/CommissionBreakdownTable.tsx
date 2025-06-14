
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CommissionDetail } from '@/hooks/useCommissionReports';

interface CommissionBreakdownTableProps {
  data: CommissionDetail[];
  reportType: string;
  isLoading: boolean;
}

const CommissionBreakdownTable = ({ data, reportType, isLoading }: CommissionBreakdownTableProps) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      paid: "default",
      pending: "secondary",
      processing: "outline"
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status}</Badge>;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-48">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Generating report...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Details</CardTitle>
        <CardDescription>
          Detailed breakdown of commission transactions for the selected period
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No data available for the selected filters.</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Procedure</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((detail) => (
                  <TableRow key={detail.id}>
                    <TableCell>{detail.date}</TableCell>
                    <TableCell className="font-medium">{detail.doctorName}</TableCell>
                    <TableCell>{detail.department}</TableCell>
                    <TableCell>{detail.procedureType}</TableCell>
                    <TableCell>{detail.patientName}</TableCell>
                    <TableCell>₹{detail.amount.toLocaleString()}</TableCell>
                    <TableCell>{detail.commissionRate}%</TableCell>
                    <TableCell className="font-bold text-green-600">
                      ₹{detail.commissionAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(detail.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommissionBreakdownTable;
