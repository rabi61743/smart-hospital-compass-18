
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, AlertTriangle, Package, TrendingUp, TrendingDown } from "lucide-react";

const PharmacyCostTrackingTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const pharmacyInventory = [
    {
      id: 'MED001',
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      currentStock: 450,
      unitCost: 2.5,
      totalCost: 1125,
      monthlyConsumption: 180,
      averageCost: 2.3,
      costVariance: 8.7,
      status: 'Normal'
    },
    {
      id: 'MED002',
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      currentStock: 25,
      unitCost: 8.0,
      totalCost: 200,
      monthlyConsumption: 95,
      averageCost: 7.5,
      costVariance: 6.7,
      status: 'Low Stock'
    },
    {
      id: 'MED003',
      name: 'Insulin Glargine',
      category: 'Diabetes',
      currentStock: 5,
      unitCost: 450.0,
      totalCost: 2250,
      monthlyConsumption: 12,
      averageCost: 420.0,
      costVariance: 7.1,
      status: 'Critical'
    },
    {
      id: 'MED004',
      name: 'Omeprazole 20mg',
      category: 'Gastric',
      currentStock: 180,
      unitCost: 12.0,
      totalCost: 2160,
      monthlyConsumption: 65,
      averageCost: 11.5,
      costVariance: 4.3,
      status: 'Normal'
    }
  ];

  const categories = ['all', 'Pain Relief', 'Antibiotics', 'Diabetes', 'Gastric'];

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

  const filteredInventory = pharmacyInventory.filter(item => {
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
                <p className="text-sm font-medium text-muted-foreground">Total Pharmacy Cost</p>
                <p className="text-2xl font-bold">₹{totalCost.toLocaleString()}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Cost Items</p>
                <p className="text-2xl font-bold">
                  {filteredInventory.filter(item => item.unitCost > 100).length}
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
                  {filteredInventory.filter(item => item.costVariance > 10).length}
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
          <CardTitle>Pharmacy Cost Tracking</CardTitle>
          <CardDescription>Monitor medicine costs and identify cost variations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medicines..."
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
                <TableHead>Medicine Details</TableHead>
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
                      <p className="text-sm">Monthly: {item.monthlyConsumption} units</p>
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

export default PharmacyCostTrackingTab;
