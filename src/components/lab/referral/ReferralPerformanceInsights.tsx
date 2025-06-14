
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ReferralPerformanceInsights = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Referral Performance Insights</CardTitle>
        <CardDescription>Key findings from referral commission analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-green-600">Top Performers</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Highest Commission: Dr. Michael Chen</span>
                <Badge className="bg-green-100 text-green-800">₹12,800</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Best Conversion: Dr. Michael Chen</span>
                <Badge className="bg-blue-100 text-blue-800">93.8%</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Most Referrals: Dr. Sarah Johnson</span>
                <Badge className="bg-purple-100 text-purple-800">45 total</Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600">Growth Opportunities</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Cardiology shows highest commission rates (10%)</p>
              <p>• MRI and CT scans are most frequently referred</p>
              <p>• Average conversion rate of 89.6% is excellent</p>
              <p>• Consider incentivizing high-value test referrals</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralPerformanceInsights;
