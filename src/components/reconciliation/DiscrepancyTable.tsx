
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Eye } from "lucide-react";
import { CommissionDiscrepancy } from '@/types/reconciliation';

interface DiscrepancyTableProps {
  discrepancies: CommissionDiscrepancy[];
}

const DiscrepancyTable = ({ discrepancies }: DiscrepancyTableProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'matched':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'under_paid':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'over_paid':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      matched: "default",
      under_paid: "destructive",
      over_paid: "secondary"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: "default",
      medium: "secondary",
      high: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[severity as keyof typeof variants] || "default"}>
        {severity}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Calculated</TableHead>
            <TableHead className="text-right">Paid</TableHead>
            <TableHead className="text-right">Discrepancy</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Severity</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discrepancies.map((discrepancy) => (
            <TableRow key={discrepancy.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(discrepancy.status)}
                  <div>
                    <div className="font-medium">{discrepancy.doctorName}</div>
                    <div className="text-sm text-muted-foreground">{discrepancy.doctorId}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{discrepancy.department}</TableCell>
              <TableCell className="text-right font-medium">
                ₹{discrepancy.calculatedAmount.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                ₹{discrepancy.paidAmount.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col items-end">
                  <span className={`font-medium ${
                    discrepancy.discrepancyAmount > 0 ? 'text-red-600' : 
                    discrepancy.discrepancyAmount < 0 ? 'text-blue-600' : 'text-green-600'
                  }`}>
                    ₹{Math.abs(discrepancy.discrepancyAmount).toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {discrepancy.discrepancyPercentage.toFixed(1)}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {getStatusBadge(discrepancy.status)}
              </TableCell>
              <TableCell className="text-center">
                {getSeverityBadge(discrepancy.severity)}
              </TableCell>
              <TableCell className="text-center">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DiscrepancyTable;
