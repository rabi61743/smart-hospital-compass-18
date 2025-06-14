
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import { useCommissionReconciliation } from '@/hooks/useCommissionReconciliation';
import ReconciliationSummaryCards from './reconciliation/ReconciliationSummaryCards';
import DiscrepancyTable from './reconciliation/DiscrepancyTable';

const CommissionReconciliationTab = () => {
  const {
    discrepancies,
    summary,
    selectedPeriod,
    setSelectedPeriod
  } = useCommissionReconciliation();

  const handleExportReport = () => {
    // This would typically generate and download a reconciliation report
    console.log('Exporting reconciliation report for period:', selectedPeriod);
  };

  const handleRefreshData = () => {
    // This would typically refresh the data from the backend
    console.log('Refreshing reconciliation data for period:', selectedPeriod);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Commission Reconciliation
          </CardTitle>
          <CardDescription>
            Compare calculated commissions against paid amounts to identify discrepancies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="period-select">Period:</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger id="period-select" className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01">January 2024</SelectItem>
                  <SelectItem value="2023-12">December 2023</SelectItem>
                  <SelectItem value="2023-11">November 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" onClick={handleRefreshData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={handleExportReport}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <ReconciliationSummaryCards summary={summary} />

      {/* Discrepancies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Discrepancies</CardTitle>
          <CardDescription>
            Detailed breakdown of differences between calculated and paid commissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {discrepancies.length > 0 ? (
            <DiscrepancyTable discrepancies={discrepancies} />
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Perfect Match!</h3>
              <p className="text-muted-foreground">
                All calculated commissions match the paid amounts for {selectedPeriod}.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionReconciliationTab;
