
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, CheckCircle, AlertTriangle } from "lucide-react";
import { ReconciliationSummary } from '@/types/reconciliation';

interface ReconciliationSummaryCardsProps {
  summary: ReconciliationSummary;
}

const ReconciliationSummaryCards = ({ summary }: ReconciliationSummaryCardsProps) => {
  const discrepancyPercentage = summary.totalCalculated > 0 
    ? ((summary.totalCalculated - summary.totalPaid) / summary.totalCalculated) * 100 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Calculated</CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{summary.totalCalculated.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Expected commission amount</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
          <TrendingDown className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{summary.totalPaid.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Actually paid amount</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Discrepancy</CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{summary.totalDiscrepancy.toLocaleString()}</div>
          <div className="flex items-center gap-2">
            <Badge variant={Math.abs(discrepancyPercentage) > 5 ? "destructive" : "secondary"}>
              {discrepancyPercentage.toFixed(1)}%
            </Badge>
            <p className="text-xs text-muted-foreground">variance</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reconciliation Status</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm">Matched:</span>
              <Badge variant="default">{summary.matchedCount}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Under-paid:</span>
              <Badge variant="destructive">{summary.underPaidCount}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Over-paid:</span>
              <Badge variant="secondary">{summary.overPaidCount}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReconciliationSummaryCards;
