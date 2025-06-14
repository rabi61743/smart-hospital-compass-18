
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from "@/components/ui/badge";

interface PharmacyCategoryBreakdownProps {
  period: string;
  selectedCategory: string;
  dateRange?: { from?: Date; to?: Date };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const PharmacyCategoryBreakdown = ({ period, selectedCategory, dateRange }: PharmacyCategoryBreakdownProps) => {
  const categoryData = [
    {
      category: 'Prescription Medicines',
      sales: 456,
      revenue: 912000,
      commission: 136800,
      commissionRate: 15,
      avgSaleValue: 2000,
      topProducts: ['Diabetes Medications', 'Cardiac Drugs', 'Antibiotics']
    },
    {
      category: 'OTC Medicines',
      sales: 289,
      revenue: 433500,
      commission: 43350,
      commissionRate: 10,
      avgSaleValue: 1500,
      topProducts: ['Pain Relievers', 'Cold & Flu', 'Vitamins']
    },
    {
      category: 'Medical Supplies',
      sales: 167,
      revenue: 668000,
      commission: 80160,
      commissionRate: 12,
      avgSaleValue: 4000,
      topProducts: ['Syringes', 'Bandages', 'Thermometers']
    },
    {
      category: 'Health Supplements',
      sales: 234,
      revenue: 351000,
      commission: 42120,
      commissionRate: 12,
      avgSaleValue: 1500,
      topProducts: ['Protein Powder', 'Omega-3', 'Multivitamins']
    },
    {
      category: 'Surgical Items',
      sales: 89,
      revenue: 534000,
      commission: 64080,
      commissionRate: 12,
      avgSaleValue: 6000,
      topProducts: ['Surgical Gloves', 'Scalpels', 'Sutures']
    }
  ];

  const chartData = categoryData.map(item => ({
    name: item.category.replace(' ', '\n'),
    commission: item.commission,
    sales: item.sales,
    revenue: item.revenue
  }));

  return (
    <div className="space-y-6">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Commission by Category</CardTitle>
            <CardDescription>Total commission amounts by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Commission']}
                />
                <Bar dataKey="commission" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Distribution</CardTitle>
            <CardDescription>Number of sales by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, sales }) => `${name}: ${sales}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Category Analysis</CardTitle>
          <CardDescription>
            Comprehensive breakdown of pharmacy commission data by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categoryData.map((category, index) => (
              <div key={category.category} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <h3 className="text-lg font-semibold">{category.category}</h3>
                    <Badge variant="outline">{category.commissionRate}% Commission</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ₹{category.commission.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Commission</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <p className="text-lg font-semibold">{category.sales}</p>
                    <p className="text-sm text-muted-foreground">Sales Count</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <p className="text-lg font-semibold">₹{category.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <p className="text-lg font-semibold">₹{category.avgSaleValue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Avg Sale Value</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <p className="text-lg font-semibold">{category.commissionRate}%</p>
                    <p className="text-sm text-muted-foreground">Commission Rate</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Top Performing Products:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.topProducts.map((product, productIndex) => (
                      <Badge key={productIndex} variant="secondary">
                        {product}
                      </Badge>
                    ))}
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

export default PharmacyCategoryBreakdown;
