
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp, UserCheck } from "lucide-react";

interface ReferralStatsCardsProps {
  totalStats: {
    totalReferrals: number;
    totalCommission: number;
    totalRevenue: number;
    averageConversion: number;
  };
}

const ReferralStatsCards = ({ totalStats }: ReferralStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Referrals</p>
              <p className="text-2xl font-bold">{totalStats.totalReferrals}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">Across all doctors</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Commission</p>
              <p className="text-2xl font-bold">₹{totalStats.totalCommission.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm text-green-600">+12% from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Referral Revenue</p>
              <p className="text-2xl font-bold">₹{totalStats.totalRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">From referred tests</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Conversion</p>
              <p className="text-2xl font-bold">{totalStats.averageConversion.toFixed(1)}%</p>
            </div>
            <UserCheck className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">Referral to completion</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralStatsCards;
