
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Dna, AlertTriangle, Shield } from "lucide-react";

interface FamilyHistorySummaryProps {
  familyMembersCount: number;
  geneticRisksCount: number;
  highRiskCount: number;
}

const FamilyHistorySummary = ({ 
  familyMembersCount, 
  geneticRisksCount, 
  highRiskCount 
}: FamilyHistorySummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Family Members</p>
              <p className="text-2xl font-bold">{familyMembersCount}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Genetic Risks</p>
              <p className="text-2xl font-bold">{geneticRisksCount}</p>
            </div>
            <Dna className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Risk Conditions</p>
              <p className="text-2xl font-bold">{highRiskCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Screenings Due</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <Shield className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyHistorySummary;
