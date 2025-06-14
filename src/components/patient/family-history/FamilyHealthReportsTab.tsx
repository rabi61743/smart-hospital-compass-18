
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const FamilyHealthReportsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Family Health Reports</CardTitle>
        <CardDescription>Generate and share family medical history reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Family Health Reports</h3>
          <p className="text-gray-600 mb-4">Generate comprehensive family medical history reports for healthcare providers</p>
          <div className="space-x-2">
            <Button>Generate PDF Report</Button>
            <Button variant="outline">Share with Doctor</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FamilyHealthReportsTab;
