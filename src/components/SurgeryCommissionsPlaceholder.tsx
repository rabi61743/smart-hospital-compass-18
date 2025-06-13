
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const SurgeryCommissionsPlaceholder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Surgery Commission Tracking</CardTitle>
        <CardDescription>Track procedure-based commissions and revenue splits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Surgery Commission Calculator</h3>
          <p className="text-gray-600 mb-4">Configure and track commissions for surgical procedures</p>
          <Button>Configure Surgery Rules</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurgeryCommissionsPlaceholder;
