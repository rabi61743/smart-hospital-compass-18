
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

interface LabPerformanceTrendsProps {
  period: string;
  selectedCategory: string;
}

const LabPerformanceTrends = ({ period, selectedCategory }: LabPerformanceTrendsProps) => {
  // Mock trend data
  const trendData = [
    {
      month: 'Aug 2023',
      bloodTests: 14500,
      imaging: 22000,
      pathology: 15800,
      microbiology: 6200,
      total: 58500
    },
    {
      month: 'Sep 2023',
      bloodTests: 15200,
      imaging: 24500,
      pathology: 16900,
      microbiology: 6800,
      total: 63400
    },
    {
      month: 'Oct 2023',
      bloodTests: 16800,
      imaging: 26200,
      pathology: 17500,
      microbiology: 7300,
      total: 67800
    },
    {
      month: 'Nov 2023',
      bloodTests: 17100,
      imaging: 27800,
      pathology: 18200,
      microbiology: 7800,
      total: 70900
    },
    {
      month: 'Dec 2023',
      bloodTests: 17500,
      imaging: 28200,
      pathology: 18600,
      microbiology: 8000,
      total: 72300
    },
    {
      month: 'Jan 2024',
      bloodTests: 17775,
      imaging: 28485,
      pathology: 18825,
      microbiology: 8025,
      total: 73110
    }
  ];

  const volumeTrendData = [
    { month: 'Aug 2023', bloodTests: 380, imaging: 220, pathology: 95, microbiology: 125 },
    { month: 'Sep 2023', bloodTests: 390, imaging: 235, pathology: 98, microbiology: 130 },
    { month: 'Oct 2023', bloodTests: 395, imaging: 248, pathology: 102, microbiology: 135 },
    { month: 'Nov 2023', bloodTests: 385, imaging: 252, pathology: 105, microbiology: 138 },
    { month: 'Dec 2023', bloodTests: 392, imaging: 254, pathology: 104, microbiology: 140 },
    { month: 'Jan 2024', bloodTests: 395, imaging: 255, pathology: 105, microbiology: 140 }
  ];

  return (
    <div className="space-y-6">
      {/* Commission Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Trends Over Time</CardTitle>
          <CardDescription>
            Monthly commission trends by test category showing growth patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#8884d8" 
                strokeWidth={3}
                name="Total Commission"
              />
              <Line 
                type="monotone" 
                dataKey="imaging" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Imaging"
              />
              <Line 
                type="monotone" 
                dataKey="pathology" 
                stroke="#ffc658" 
                strokeWidth={2}
                name="Pathology"
              />
              <Line 
                type="monotone" 
                dataKey="bloodTests" 
                stroke="#ff7300" 
                strokeWidth={2}
                name="Blood Tests"
              />
              <Line 
                type="monotone" 
                dataKey="microbiology" 
                stroke="#00ff88" 
                strokeWidth={2}
                name="Microbiology"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Volume Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Test Volume Trends</CardTitle>
          <CardDescription>
            Number of tests performed monthly by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={volumeTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="bloodTests" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8"
                name="Blood Tests"
              />
              <Area 
                type="monotone" 
                dataKey="imaging" 
                stackId="1" 
                stroke="#82ca9d" 
                fill="#82ca9d"
                name="Imaging"
              />
              <Area 
                type="monotone" 
                dataKey="pathology" 
                stackId="1" 
                stroke="#ffc658" 
                fill="#ffc658"
                name="Pathology"
              />
              <Area 
                type="monotone" 
                dataKey="microbiology" 
                stackId="1" 
                stroke="#ff7300" 
                fill="#ff7300"
                name="Microbiology"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Growth Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Month-over-Month Growth</CardTitle>
            <CardDescription>Commission growth rates by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Imaging</span>
                <span className="text-green-600 font-bold">+1.0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Pathology</span>
                <span className="text-green-600 font-bold">+1.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Blood Tests</span>
                <span className="text-green-600 font-bold">+1.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Microbiology</span>
                <span className="text-green-600 font-bold">+0.3%</span>
              </div>
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
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Average Commission/Test</span>
                  <span className="text-sm">₹82</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">High-Value Tests Ratio</span>
                  <span className="text-sm">34%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Monthly Growth Rate</span>
                  <span className="text-sm">12.5%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LabPerformanceTrends;
