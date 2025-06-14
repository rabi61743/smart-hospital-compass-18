
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface GeneticRisk {
  condition: string;
  riskLevel: 'low' | 'moderate' | 'high';
  inheritancePattern: string;
  recommendedScreening: string[];
  notes?: string;
}

interface GeneticRisksTabProps {
  geneticRisks: GeneticRisk[];
}

const GeneticRisksTab = ({ geneticRisks }: GeneticRisksTabProps) => {
  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Genetic Risk Assessment</CardTitle>
        <CardDescription>Your genetic predispositions based on family history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {geneticRisks.map((risk, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <div>
                    <h3 className="font-semibold">{risk.condition}</h3>
                    <p className="text-sm text-muted-foreground">
                      Inheritance: {risk.inheritancePattern}
                    </p>
                  </div>
                </div>
                <Badge className={getRiskBadgeColor(risk.riskLevel)}>
                  {risk.riskLevel.toUpperCase()} RISK
                </Badge>
              </div>
              
              <div className="mb-3">
                <h4 className="font-medium mb-2">Recommended Screening</h4>
                <div className="flex flex-wrap gap-2">
                  {risk.recommendedScreening.map((screening, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {screening}
                    </Badge>
                  ))}
                </div>
              </div>

              {risk.notes && (
                <div>
                  <h4 className="font-medium mb-1">Notes</h4>
                  <p className="text-sm text-muted-foreground">{risk.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneticRisksTab;
