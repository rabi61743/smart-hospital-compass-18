
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Target, Calendar, AlertCircle } from "lucide-react";

const CommissionForecastProjections = () => {
  const forecastData = [
    {
      month: 'May 2024',
      projected: 88000,
      confidence: 'high',
      factors: ['New doctor joining', 'Seasonal increase'],
      budgetImpact: '+3.5%'
    },
    {
      month: 'June 2024',
      projected: 82000,
      confidence: 'medium',
      factors: ['Summer vacation period', 'Reduced surgeries'],
      budgetImpact: '-3.5%'
    },
    {
      month: 'July 2024',
      projected: 79000,
      confidence: 'medium',
      factors: ['Continued vacation period', 'Equipment maintenance'],
      budgetImpact: '-7.1%'
    },
    {
      month: 'August 2024',
      projected: 91000,
      confidence: 'high',
      factors: ['Return from vacation', 'New department opening'],
      budgetImpact: '+7.1%'
    }
  ];

  const yearlyProjection = {
    currentYear: {
      budgeted: 1020000,
      projected: 1055000,
      variance: 35000,
      variancePercent: 3.4
    },
    nextYear: {
      budgeted: 1100000,
      projected: 1125000,
      variance: 25000,
      variancePercent: 2.3
    }
  };

  const scenarioAnalysis = [
    {
      scenario: 'Conservative',
      probability: '70%',
      yearlyTotal: 980000,
      description: 'Lower patient volume, economic downturn',
      budgetAdjustment: '-4.0%'
    },
    {
      scenario: 'Expected',
      probability: '60%',
      yearlyTotal: 1055000,
      description: 'Current trends continue, normal growth',
      budgetAdjustment: '+3.4%'
    },
    {
      scenario: 'Optimistic',
      probability: '25%',
      yearlyTotal: 1150000,
      description: 'New services, increased patient volume',
      budgetAdjustment: '+12.7%'
    }
  ];

  const getConfidenceBadge = (confidence: string) => {
    const variants = {
      high: "default",
      medium: "secondary",
      low: "outline"
    } as const;
    
    return <Badge variant={variants[confidence as keyof typeof variants]}>{confidence} confidence</Badge>;
  };

  const getScenarioBadge = (scenario: string) => {
    const variants = {
      Conservative: "outline",
      Expected: "default",
      Optimistic: "secondary"
    } as const;
    
    return <Badge variant={variants[scenario as keyof typeof variants]}>{scenario}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Commission Forecast Projections</h3>
          <p className="text-sm text-muted-foreground">
            Predictive analysis for commission budget planning
          </p>
        </div>
        <Select defaultValue="monthly">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly View</SelectItem>
            <SelectItem value="quarterly">Quarterly View</SelectItem>
            <SelectItem value="yearly">Yearly View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Monthly Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Monthly Forecast (Next 4 Months)
          </CardTitle>
          <CardDescription>
            Projected commission expenses with influencing factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forecastData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{item.month}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.factors.join(', ')}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Projected</div>
                    <div className="font-medium">₹{item.projected.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Budget Impact</div>
                    <div className={`font-medium ${item.budgetImpact.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                      {item.budgetImpact}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Confidence</div>
                    {getConfidenceBadge(item.confidence)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Yearly Projections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Current Year Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Original Budget:</span>
                <span className="font-medium">₹{yearlyProjection.currentYear.budgeted.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Projected Total:</span>
                <span className="font-medium">₹{yearlyProjection.currentYear.projected.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm text-muted-foreground">Variance:</span>
                <span className="font-medium text-red-600">
                  +₹{yearlyProjection.currentYear.variance.toLocaleString()} ({yearlyProjection.currentYear.variancePercent}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Next Year Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Proposed Budget:</span>
                <span className="font-medium">₹{yearlyProjection.nextYear.budgeted.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Projected Total:</span>
                <span className="font-medium">₹{yearlyProjection.nextYear.projected.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm text-muted-foreground">Expected Variance:</span>
                <span className="font-medium text-red-600">
                  +₹{yearlyProjection.nextYear.variance.toLocaleString()} ({yearlyProjection.nextYear.variancePercent}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Scenario Analysis
          </CardTitle>
          <CardDescription>
            Different projection scenarios based on varying market conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scenarioAnalysis.map((scenario, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      {getScenarioBadge(scenario.scenario)}
                      <span className="text-sm text-muted-foreground">({scenario.probability} probability)</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {scenario.description}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Yearly Total</div>
                    <div className="font-medium">₹{scenario.yearlyTotal.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Budget Adjustment</div>
                    <div className={`font-medium ${scenario.budgetAdjustment.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                      {scenario.budgetAdjustment}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionForecastProjections;
