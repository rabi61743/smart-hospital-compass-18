
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Building, TrendingDown, TrendingUp, Eye } from "lucide-react";

const CostCenterAnalysisTab = () => {
  const [selectedCostCenter, setSelectedCostCenter] = useState('all');

  const costCenters = [
    {
      id: 'CC001',
      name: 'Surgery Operations',
      department: 'Surgery',
      budgetAllocated: 2500000,
      actualSpent: 2150000,
      variance: -350000,
      variancePercent: -14,
      efficiency: 86,
      status: 'efficient'
    },
    {
      id: 'CC002',
      name: 'Emergency Services',
      department: 'Emergency',
      budgetAllocated: 1800000,
      actualSpent: 1950000,
      variance: 150000,
      variancePercent: 8.3,
      efficiency: 92,
      status: 'over-budget'
    },
    {
      id: 'CC003',
      name: 'Cardiology Unit',
      department: 'Cardiology',
      budgetAllocated: 1600000,
      actualSpent: 1420000,
      variance: -180000,
      variancePercent: -11.3,
      efficiency: 89,
      status: 'efficient'
    },
    {
      id: 'CC004',
      name: 'Diagnostic Imaging',
      department: 'Radiology',
      budgetAllocated: 1200000,
      actualSpent: 1180000,
      variance: -20000,
      variancePercent: -1.7,
      efficiency: 98,
      status: 'on-target'
    }
  ];

  const costTrends = [
    { month: 'Jan', personnel: 45, equipment: 25, supplies: 15, utilities: 8, maintenance: 7 },
    { month: 'Feb', personnel: 44, equipment: 26, supplies: 16, utilities: 8, maintenance: 6 },
    { month: 'Mar', personnel: 46, equipment: 24, supplies: 15, utilities: 9, maintenance: 6 }
  ];

  const departmentCosts = [
    { department: 'Surgery', personnel: 1200000, equipment: 650000, supplies: 420000, total: 2270000 },
    { department: 'Emergency', personnel: 980000, equipment: 485000, supplies: 385000, total: 1850000 },
    { department: 'Cardiology', personnel: 850000, equipment: 380000, supplies: 290000, total: 1520000 },
    { department: 'Radiology', personnel: 620000, equipment: 425000, supplies: 185000, total: 1230000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'efficient': return 'bg-green-100 text-green-800';
      case 'over-budget': return 'bg-red-100 text-red-800';
      case 'on-target': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVarianceIcon = (variance: number) => {
    return variance < 0 ? 
      <TrendingDown className="h-4 w-4 text-green-600" /> : 
      <TrendingUp className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">Cost Center Analysis</h4>
          <p className="text-sm text-muted-foreground">Monitor cost centers, budget utilization, and efficiency metrics</p>
        </div>
        <Select value={selectedCostCenter} onValueChange={setSelectedCostCenter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by cost center" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cost Centers</SelectItem>
            <SelectItem value="surgery">Surgery Operations</SelectItem>
            <SelectItem value="emergency">Emergency Services</SelectItem>
            <SelectItem value="cardiology">Cardiology Unit</SelectItem>
            <SelectItem value="radiology">Diagnostic Imaging</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cost Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Distribution by Department</CardTitle>
            <CardDescription>Personnel, equipment, and supplies breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentCosts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(0)}L`} />
                <Tooltip 
                  formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, '']}
                />
                <Bar dataKey="personnel" stackId="a" fill="#3B82F6" name="Personnel" />
                <Bar dataKey="equipment" stackId="a" fill="#10B981" name="Equipment" />
                <Bar dataKey="supplies" stackId="a" fill="#F59E0B" name="Supplies" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Structure Trends</CardTitle>
            <CardDescription>Monthly cost composition changes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Line type="monotone" dataKey="personnel" stroke="#3B82F6" strokeWidth={2} name="Personnel" />
                <Line type="monotone" dataKey="equipment" stroke="#10B981" strokeWidth={2} name="Equipment" />
                <Line type="monotone" dataKey="supplies" stroke="#F59E0B" strokeWidth={2} name="Supplies" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cost Center Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Center Performance</CardTitle>
          <CardDescription>Detailed analysis of cost center efficiency and budget utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cost Center</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Budget Allocated</TableHead>
                <TableHead>Actual Spent</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costCenters
                .filter(cc => selectedCostCenter === 'all' || cc.name.toLowerCase().includes(selectedCostCenter))
                .map((costCenter) => (
                <TableRow key={costCenter.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="font-medium">{costCenter.name}</div>
                        <div className="text-xs text-muted-foreground">{costCenter.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{costCenter.department}</TableCell>
                  <TableCell>₹{costCenter.budgetAllocated.toLocaleString()}</TableCell>
                  <TableCell>₹{costCenter.actualSpent.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getVarianceIcon(costCenter.variance)}
                      <span className={costCenter.variance < 0 ? 'text-green-600' : 'text-red-600'}>
                        {costCenter.variance > 0 ? '+' : ''}₹{Math.abs(costCenter.variance).toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{costCenter.efficiency}%</div>
                      <div className="text-xs text-muted-foreground">efficiency</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(costCenter.status)}>
                      {costCenter.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
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

export default CostCenterAnalysisTab;
