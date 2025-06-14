
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, AlertTriangle, TestTube, TrendingUp, TrendingDown } from "lucide-react";

const LabCostTrackingTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const labInventory = [
    {
      id: 'LAB001',
      name: 'CBC Test Kit',
      category: 'Hematology',
      currentStock: 150,
      unitCost: 25.0,
      totalCost: 3750,
      monthlyUsage: 200,
      averageCost: 23.5,
      costVariance: 6.4,
      status: 'Normal'
    },
    {
      id: 'LAB002',
      name: 'Blood Glucose Strips',
      category: 'Biochemistry',
      currentStock: 80,
      unitCost: 15.0,
      totalCost: 1200,
      monthlyUsage: 180,
      averageCost: 14.2,
      costVariance: 5.6,
      status: 'Low Stock'
    },
    {
      id: 'LAB003',
      name: 'X-Ray Film',
      category: 'Radiology',
      currentStock: 45,
      unitCost: 120.0,
      totalCost: 5400,
      monthlyUsage: 60,
      averageCost: 115.0,
      costVariance: 4.3,
      status: 'Normal'
    },
    {
      id: 'LAB004',
      name: 'ECG Electrodes',
      category: 'Cardiology',
      currentStock: 20,
      unitCost: 8.5,
      totalCost: 170,
      monthlyUsage: 85,
      averageCost: 8.0,
      costVariance: 6.25,
      status: 'Critical'
    },
    {
      id: 'LAB005',
      name: 'Ultrasound Gel',
      category: 'Imaging',
      currentStock: 30,
      unitCost: 45.0,
      totalCost: 1350,
      monthlyUsage: 25,
      averageCost: 42.0,
      costVariance: 7.1,
      status: 'Normal'
    }
  ];

  const categories = ['all', 'Hematology', 'Biochemistry', 'Radiology', 'Cardiology', 'Imaging'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 10) return 'text-red-600';
    if (variance > 5) return 'text-orange-600';
    return 'text-green-600';
  };

  const filteredInventory = labInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const totalCost = filteredInventory.reduce((sum, item) => sum + item.totalCost, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Lab Cost</p>
                <p className="text-2xl font-bold">₹{totalCost.toLocaleString()}</p>
              </div>
              <TestTube className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Cost Items</p>
                <p className="text-2xl font-bold">
                  {filteredInventory.filter(item => item.unitCost > 50).length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cost Alerts</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredInventory.filter(item => item.costVariance > 7).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Laboratory Cost Tracking</CardTitle>
          <CardDescription>Monitor lab supplies costs and usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search lab supplies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.slice(1).map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cost Tracking Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supply Details</TableHead>
                <TableHead>Stock & Cost</TableHead>
                <TableHead>Usage Pattern</TableHead>
                <TableHead>Cost Analysis</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.id}</p>
                      <Badge variant="outline" className="mt-1">{item.category}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.currentStock} units</p>
                      <p className="text-sm text-muted-foreground">Unit: ₹{item.unitCost}</p>
                      <p className="text-sm font-medium">Total: ₹{item.totalCost.toLocaleString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">Monthly: {item.monthlyUsage} units</p>
                      <p className="text-sm text-muted-foreground">
                        Avg Cost: ₹{item.averageCost}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className={`text-sm font-medium ${getVarianceColor(item.costVariance)}`}>
                        {item.costVariance > 0 ? '+' : ''}{item.costVariance.toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground">vs avg cost</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabCostTrackingTab;
