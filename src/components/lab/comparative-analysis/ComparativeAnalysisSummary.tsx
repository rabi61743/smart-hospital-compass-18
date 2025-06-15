
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface ComparativeAnalysisSummaryProps {
  data: Array<{
    period: string;
    current: number;
    previous: number;
    growth: number;
  }>;
}

const ComparativeAnalysisSummary = ({ data }: ComparativeAnalysisSummaryProps) => {
  const latestGrowth = data[data.length - 1]?.growth || 0;

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (growth < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Latest Growth</p>
              <p className={`text-2xl font-bold ${getGrowthColor(latestGrowth)}`}>
                {latestGrowth > 0 ? '+' : ''}{latestGrowth.toFixed(1)}%
              </p>
            </div>
            {getGrowthIcon(latestGrowth)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Growth</p>
              <p className="text-2xl font-bold">
                {(data.reduce((sum, item) => sum + item.growth, 0) / data.length).toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Positive Periods</p>
              <p className="text-2xl font-bold">
                {data.filter(item => item.growth > 0).length}/{data.length}
              </p>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600">
              {((data.filter(item => item.growth > 0).length / data.length) * 100).toFixed(0)}%
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparativeAnalysisSummary;
