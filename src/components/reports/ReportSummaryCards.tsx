
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Users, Calendar } from "lucide-react";
import { ReportSummary } from '@/hooks/useCommissionReports';

interface ReportSummaryCardsProps {
  summaryStats: ReportSummary;
}

const ReportSummaryCards = ({ summaryStats }: ReportSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{summaryStats.totalCommissions.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {summaryStats.periodGrowth > 0 ? '+' : ''}{summaryStats.periodGrowth}% from last period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summaryStats.totalTransactions}</div>
          <p className="text-xs text-muted-foreground">
            Across all departments
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Commission</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{summaryStats.averageCommission.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Per transaction
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-truncate">{summaryStats.topPerformer}</div>
          <p className="text-xs text-muted-foreground">
            Highest earner this period
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportSummaryCards;
