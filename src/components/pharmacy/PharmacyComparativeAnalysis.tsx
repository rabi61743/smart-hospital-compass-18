
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PharmacyComparativeAnalysisProps {
  comparisonType: string;
  selectedCategory: string;
  dateRange?: { from?: Date; to?: Date };
}

const PharmacyComparativeAnalysis = ({ comparisonType, selectedCategory, dateRange }: PharmacyComparativeAnalysisProps) => {
  const comparisonData = {
    'month-over-month': [
      {
        category: 'Prescription Medicines',
        current: 136800,
        previous: 115000,
        growth: 18.9,
        salesCurrent: 456,
        salesPrevious: 392
      },
      {
        category: 'Medical Supplies',
        current: 80160,
        previous: 75000,
        growth: 6.9,
        salesCurrent: 167,
        salesPrevious: 158
      },
      {
        category: 'Surgical Items',
        current: 64080,
        previous: 58000,
        growth: 10.5,
        salesCurrent: 89,
        salesPrevious: 82
      },
      {
        category: 'OTC Medicines',
        current: 43350,
        previous: 41000,
        growth: 5.7,
        salesCurrent: 289,
        salesPrevious: 275
      },
      {
        category: 'Health Supplements',
        current: 42120,
        previous: 45000,
        growth: -6.4,
        salesCurrent: 234,
        salesPrevious: 248
      }
    ],
    'quarter-over-quarter': [
      {
        category: 'Prescription Medicines',
        current: 136800,
        previous: 95000,
        growth: 44.0,
        salesCurrent: 456,
        salesPrevious: 325
      },
      {
        category: 'Medical Supplies',
        current: 80160,
        previous: 65000,
        growth: 23.3,
        salesCurrent: 167,
        salesPrevious: 142
      },
      {
        category: 'Surgical Items',
        current: 64080,
        previous: 50000,
        growth: 28.2,
        salesCurrent: 89,
        salesPrevious: 72
      },
      {
        category: 'OTC Medicines',
        current: 43350,
        previous: 35000,
        growth: 23.9,
        salesCurrent: 289,
        salesPrevious: 245
      },
      {
        category: 'Health Supplements',
        current: 42120,
        previous: 40000,
        growth: 5.3,
        salesCurrent: 234,
        salesPrevious: 222
      }
    ],
    'year-over-year': [
      {
        category: 'Prescription Medicines',
        current: 136800,
        previous: 88000,
        growth: 55.5,
        salesCurrent: 456,
        salesPrevious: 298
      },
      {
        category: 'Medical Supplies',
        current: 80160,
        previous: 52000,
        growth: 54.2,
        salesCurrent: 167,
        salesPrevious: 115
      },
      {
        category: 'Surgical Items',
        current: 64080,
        previous: 38000,
        growth: 68.6,
        salesCurrent: 89,
        salesPrevious: 58
      },
      {
        category: 'OTC Medicines',
        current: 43350,
        previous: 31000,
        growth: 39.8,
        salesCurrent: 289,
        salesPrevious: 215
      },
      {
        category: 'Health Supplements',
        current: 42120,
        previous: 25000,
        growth: 68.5,
        salesCurrent: 234,
        salesPrevious: 152
      }
    ]
  };

  const currentData = comparisonData[comparisonType as keyof typeof comparisonData];
  
  const chartData = currentData.map(item => ({
    category: item.category.replace(' ', '\n'),
    current: item.current,
    previous: item.previous,
    growth: item.growth
  }));

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getPeriodLabel = () => {
    switch (comparisonType) {
      case 'month-over-month':
        return 'vs Previous Month';
      case 'quarter-over-quarter':
        return 'vs Previous Quarter';
      case 'year-over-year':
        return 'vs Previous Year';
      default:
        return 'vs Previous Period';
    }
  };

  return (
    <div className="space-y-6">
      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Comparison - {getPeriodLabel()}</CardTitle>
          <CardDescription>
            Compare current period commission performance with previous period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="category" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`₹${Number(value).toLocaleString()}`, name]}
              />
              <Legend />
              <Bar dataKey="previous" fill="#94a3b8" name="Previous Period" />
              <Bar dataKey="current" fill="#3b82f6" name="Current Period" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Performance Comparison</CardTitle>
          <CardDescription>
            Category-wise breakdown of commission and sales performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentData.map((item, index) => (
              <div key={item.category} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{item.category}</h3>
                  <div className="flex items-center space-x-2">
                    {getGrowthIcon(item.growth)}
                    <span className={`font-semibold ${getGrowthColor(item.growth)}`}>
                      {item.growth >= 0 ? '+' : ''}{item.growth.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <p className="text-lg font-semibold text-blue-600">
                      ₹{item.current.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Current Commission</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-lg font-semibold text-gray-600">
                      ₹{item.previous.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Previous Commission</p>
                  </div>

                  <div className="text-center p-3 bg-green-50 rounded">
                    <p className="text-lg font-semibold text-green-600">
                      {item.salesCurrent}
                    </p>
                    <p className="text-sm text-muted-foreground">Current Sales</p>
                  </div>

                  <div className="text-center p-3 bg-orange-50 rounded">
                    <p className="text-lg font-semibold text-orange-600">
                      ₹{Math.round((item.current - item.previous)).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Absolute Change</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Comparative Analysis Summary</CardTitle>
          <CardDescription>Key takeaways from the performance comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Best Performer
                </Badge>
              </h4>
              <p className="text-sm">
                <strong>{currentData.reduce((prev, current) => 
                  prev.growth > current.growth ? prev : current
                ).category}</strong> shows the highest growth at{' '}
                <span className="text-green-600 font-semibold">
                  +{currentData.reduce((prev, current) => 
                    prev.growth > current.growth ? prev : current
                  ).growth.toFixed(1)}%
                </span>
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Badge variant="outline" className="border-orange-300 text-orange-600">
                  Highest Revenue
                </Badge>
              </h4>
              <p className="text-sm">
                <strong>{currentData.reduce((prev, current) => 
                  prev.current > current.current ? prev : current
                ).category}</strong> generates the highest commission at{' '}
                <span className="font-semibold">
                  ₹{currentData.reduce((prev, current) => 
                    prev.current > current.current ? prev : current
                  ).current.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Badge variant="secondary">
                  Total Growth
                </Badge>
              </h4>
              <p className="text-sm">
                Overall commission increased by{' '}
                <span className="text-blue-600 font-semibold">
                  ₹{(currentData.reduce((sum, item) => sum + item.current, 0) - 
                      currentData.reduce((sum, item) => sum + item.previous, 0)).toLocaleString()}
                </span>{' '}
                this period
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyComparativeAnalysis;
