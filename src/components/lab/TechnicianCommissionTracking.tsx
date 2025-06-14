
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, TrendingUp, Calculator, Search } from "lucide-react";

interface TechnicianCommission {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  testsCompleted: number;
  qualityScore: number;
  baseCommission: number;
  bonusCommission: number;
  totalCommission: number;
  commissionRate: number;
  shift: 'Morning' | 'Evening' | 'Night';
  isActive: boolean;
}

interface TechnicianCommissionTrackingProps {
  period: string;
  selectedCategory: string;
}

const TechnicianCommissionTracking = ({ period, selectedCategory }: TechnicianCommissionTrackingProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedShift, setSelectedShift] = useState('all');

  // Mock data for lab technicians
  const [technicians] = useState<TechnicianCommission[]>([
    {
      id: 'tech-001',
      name: 'Dr. Sarah Chen',
      employeeId: 'LAB001',
      department: 'Blood Tests',
      testsCompleted: 245,
      qualityScore: 98.5,
      baseCommission: 12250,
      bonusCommission: 2450,
      totalCommission: 14700,
      commissionRate: 5,
      shift: 'Morning',
      isActive: true
    },
    {
      id: 'tech-002',
      name: 'Michael Rodriguez',
      employeeId: 'LAB002',
      department: 'Imaging',
      testsCompleted: 128,
      qualityScore: 96.2,
      baseCommission: 8960,
      bonusCommission: 1280,
      totalCommission: 10240,
      commissionRate: 7,
      shift: 'Evening',
      isActive: true
    },
    {
      id: 'tech-003',
      name: 'Dr. Priya Sharma',
      employeeId: 'LAB003',
      department: 'Pathology',
      testsCompleted: 89,
      qualityScore: 99.1,
      baseCommission: 8010,
      bonusCommission: 1780,
      totalCommission: 9790,
      commissionRate: 9,
      shift: 'Morning',
      isActive: true
    },
    {
      id: 'tech-004',
      name: 'Ahmed Hassan',
      employeeId: 'LAB004',
      department: 'Microbiology',
      testsCompleted: 156,
      qualityScore: 94.8,
      baseCommission: 7800,
      bonusCommission: 1560,
      totalCommission: 9360,
      commissionRate: 5,
      shift: 'Night',
      isActive: true
    },
    {
      id: 'tech-005',
      name: 'Lisa Thompson',
      employeeId: 'LAB005',
      department: 'Blood Tests',
      testsCompleted: 198,
      qualityScore: 97.3,
      baseCommission: 9900,
      bonusCommission: 1980,
      totalCommission: 11880,
      commissionRate: 5,
      shift: 'Evening',
      isActive: true
    },
    {
      id: 'tech-006',
      name: 'Dr. James Park',
      employeeId: 'LAB006',
      department: 'Imaging',
      testsCompleted: 67,
      qualityScore: 92.4,
      baseCommission: 4690,
      bonusCommission: 670,
      totalCommission: 5360,
      commissionRate: 7,
      shift: 'Night',
      isActive: false
    }
  ]);

  const departments = ['all', 'Blood Tests', 'Imaging', 'Pathology', 'Microbiology'];
  const shifts = ['all', 'Morning', 'Evening', 'Night'];

  // Filter technicians based on search and filters
  const filteredTechnicians = technicians.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tech.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || tech.department === selectedDepartment;
    const matchesShift = selectedShift === 'all' || tech.shift === selectedShift;
    
    return matchesSearch && matchesDepartment && matchesShift;
  });

  // Calculate summary stats
  const totalCommission = filteredTechnicians.reduce((sum, tech) => sum + tech.totalCommission, 0);
  const totalTests = filteredTechnicians.reduce((sum, tech) => sum + tech.testsCompleted, 0);
  const avgQualityScore = filteredTechnicians.length > 0 
    ? filteredTechnicians.reduce((sum, tech) => sum + tech.qualityScore, 0) / filteredTechnicians.length 
    : 0;

  const getQualityBadgeVariant = (score: number) => {
    if (score >= 98) return 'default';
    if (score >= 95) return 'secondary';
    return 'outline';
  };

  const getShiftBadgeColor = (shift: string) => {
    switch (shift) {
      case 'Morning': return 'bg-blue-100 text-blue-800';
      case 'Evening': return 'bg-orange-100 text-orange-800';
      case 'Night': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Technicians</p>
                <p className="text-2xl font-bold">{filteredTechnicians.filter(t => t.isActive).length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Commission</p>
                <p className="text-2xl font-bold">₹{totalCommission.toLocaleString()}</p>
              </div>
              <Calculator className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tests Completed</p>
                <p className="text-2xl font-bold">{totalTests.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Quality Score</p>
                <p className="text-2xl font-bold">{avgQualityScore.toFixed(1)}%</p>
              </div>
              <Badge variant={getQualityBadgeVariant(avgQualityScore)} className="h-8 px-2">
                Quality
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Lab Technician Commission Tracking</CardTitle>
          <CardDescription>
            Individual performance and commission tracking for laboratory staff
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="department-filter">Department:</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger id="department-filter" className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="shift-filter">Shift:</Label>
              <Select value={selectedShift} onValueChange={setSelectedShift}>
                <SelectTrigger id="shift-filter" className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {shifts.map(shift => (
                    <SelectItem key={shift} value={shift}>
                      {shift === 'all' ? 'All Shifts' : shift}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Badge variant="outline" className="ml-auto">
              {filteredTechnicians.length} technician{filteredTechnicians.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {/* Technicians Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Technician</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Tests Completed</TableHead>
                  <TableHead>Quality Score</TableHead>
                  <TableHead>Base Commission</TableHead>
                  <TableHead>Bonus</TableHead>
                  <TableHead>Total Commission</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTechnicians.map((technician) => (
                  <TableRow key={technician.id}>
                    <TableCell>
                      <div className="font-medium">{technician.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {technician.commissionRate}% commission rate
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {technician.employeeId}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{technician.department}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getShiftBadgeColor(technician.shift)}>
                        {technician.shift}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {technician.testsCompleted}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{technician.qualityScore}%</span>
                        <Badge variant={getQualityBadgeVariant(technician.qualityScore)} className="text-xs">
                          {technician.qualityScore >= 98 ? 'Excellent' : 
                           technician.qualityScore >= 95 ? 'Good' : 'Average'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ₹{technician.baseCommission.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-green-600 font-medium">
                      +₹{technician.bonusCommission.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-bold">
                      ₹{technician.totalCommission.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={technician.isActive ? "default" : "secondary"}>
                        {technician.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTechnicians.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No technicians found matching the current filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicianCommissionTracking;
