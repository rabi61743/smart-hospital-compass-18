
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LeaveRulesCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Accrual Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Annual Leave</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Accrues 2.5 days per month</li>
              <li>• Maximum 40 days per year</li>
              <li>• Up to 10 days can be carried over</li>
              <li>• Pro-rated for new employees</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Sick Leave</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Accrues 1.25 days per month</li>
              <li>• Maximum 15 days per year</li>
              <li>• Up to 5 days can be carried over</li>
              <li>• No medical certificate required for 1-2 days</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leave Restrictions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Blackout Periods</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• December 20-31 (Holiday season)</li>
              <li>• First week of January</li>
              <li>• Department-specific busy periods</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Notice Requirements</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 2 weeks notice for 5+ consecutive days</li>
              <li>• 1 week notice for 2-4 days</li>
              <li>• Same day for emergency leave</li>
              <li>• Manager approval required for all leave</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveRulesCards;
