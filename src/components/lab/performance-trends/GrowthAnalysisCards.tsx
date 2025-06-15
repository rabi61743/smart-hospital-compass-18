
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GrowthAnalysisCards = () => {
  const growthData = [
    { category: 'Imaging', growth: '+1.0%' },
    { category: 'Pathology', growth: '+1.2%' },
    { category: 'Blood Tests', growth: '+1.5%' },
    { category: 'Microbiology', growth: '+0.3%' }
  ];

  const performanceMetrics = [
    { label: 'Average Commission/Test', value: '₹82', percentage: 82 },
    { label: 'High-Value Tests Ratio', value: '34%', percentage: 34 },
    { label: 'Monthly Growth Rate', value: '12.5%', percentage: 75 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Month-over-Month Growth</CardTitle>
          <CardDescription>Commission growth rates by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {growthData.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{item.category}</span>
                <span className="text-green-600 font-bold">{item.growth}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <span className="text-sm">{metric.value}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-blue-600' : 
                      index === 1 ? 'bg-green-600' : 'bg-purple-600'
                    }`}
                    style={{ width: `${metric.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthAnalysisCards;
