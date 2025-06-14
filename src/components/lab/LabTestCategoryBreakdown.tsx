
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface LabTestCategoryBreakdownProps {
  period: string;
  selectedCategory: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const LabTestCategoryBreakdown = ({ period, selectedCategory }: LabTestCategoryBreakdownProps) => {
  // Mock data for demonstration
  const categoryData = [
    {
      category: 'Blood Tests',
      subCategories: [
        { name: 'Complete Blood Count', tests: 150, revenue: 45000, commission: 6750, rate: 15 },
        { name: 'Lipid Profile', tests: 95, revenue: 28500, commission: 4275, rate: 15 },
        { name: 'Liver Function', tests: 80, revenue: 24000, commission: 3600, rate: 15 },
        { name: 'Kidney Function', tests: 70, revenue: 21000, commission: 3150, rate: 15 }
      ],
      totalTests: 395,
      totalRevenue: 118500,
      totalCommission: 17775
    },
    {
      category: 'Imaging',
      subCategories: [
        { name: 'X-Ray', tests: 128, revenue: 38400, commission: 5760, rate: 15 },
        { name: 'CT Scan', tests: 24, revenue: 72000, commission: 10800, rate: 15 },
        { name: 'MRI', tests: 18, revenue: 54000, commission: 8100, rate: 15 },
        { name: 'Ultrasound', tests: 85, revenue: 25500, commission: 3825, rate: 15 }
      ],
      totalTests: 255,
      totalRevenue: 189900,
      totalCommission: 28485
    },
    {
      category: 'Pathology',
      subCategories: [
        { name: 'Biopsy Analysis', tests: 45, revenue: 67500, commission: 10125, rate: 15 },
        { name: 'Cytology', tests: 32, revenue: 16000, commission: 2400, rate: 15 },
        { name: 'Histopathology', tests: 28, revenue: 42000, commission: 6300, rate: 15 }
      ],
      totalTests: 105,
      totalRevenue: 125500,
      totalCommission: 18825
    },
    {
      category: 'Microbiology',
      subCategories: [
        { name: 'Culture & Sensitivity', tests: 65, revenue: 19500, commission: 2925, rate: 15 },
        { name: 'Viral Testing', tests: 40, revenue: 20000, commission: 3000, rate: 15 },
        { name: 'Bacterial Analysis', tests: 35, revenue: 14000, commission: 2100, rate: 15 }
      ],
      totalTests: 140,
      totalRevenue: 53500,
      totalCommission: 8025
    }
  ];

  const chartData = categoryData.map(cat => ({
    name: cat.category,
    tests: cat.totalTests,
    revenue: cat.totalRevenue,
    commission: cat.totalCommission
  }));

  const pieData = categoryData.map(cat => ({
    name: cat.category,
    value: cat.totalCommission
  }));

  const filteredData = selectedCategory === 'all' 
    ? categoryData 
    : categoryData.filter(cat => cat.category.toLowerCase().replace(' ', '-') === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Charts Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Commission by Category</CardTitle>
            <CardDescription>Total commission breakdown across test categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']} />
                <Bar dataKey="commission" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribution by Tests Count</CardTitle>
            <CardDescription>Number of tests performed by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Commission']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown Tables */}
      {filteredData.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {category.category}
              <Badge variant="outline">
                {category.totalTests} tests • ₹{category.totalCommission.toLocaleString()}
              </Badge>
            </CardTitle>
            <CardDescription>
              Detailed breakdown of {category.category.toLowerCase()} commission data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Type</TableHead>
                    <TableHead>Tests Count</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Commission Rate</TableHead>
                    <TableHead>Commission Amount</TableHead>
                    <TableHead>% of Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.subCategories.map((subCat) => {
                    const percentage = (subCat.commission / category.totalCommission) * 100;
                    return (
                      <TableRow key={subCat.name}>
                        <TableCell className="font-medium">{subCat.name}</TableCell>
                        <TableCell>{subCat.tests}</TableCell>
                        <TableCell>₹{subCat.revenue.toLocaleString()}</TableCell>
                        <TableCell>{subCat.rate}%</TableCell>
                        <TableCell className="font-bold text-green-600">
                          ₹{subCat.commission.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={percentage} className="w-16" />
                            <span className="text-sm text-muted-foreground">
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LabTestCategoryBreakdown;
