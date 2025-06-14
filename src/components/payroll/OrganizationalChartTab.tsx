
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Users, Building } from "lucide-react";
import OrganizationalChart from './OrganizationalChart';

interface Position {
  id: string;
  title: string;
  department: string;
  description: string;
  level: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Manager' | 'Director' | 'VP' | 'C-Level';
  reportsTo: string;
  minSalary: number;
  maxSalary: number;
  responsibilities: string[];
  requirements: string[];
  employeeCount: number;
  status: 'Active' | 'Inactive';
}

const OrganizationalChartTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'hierarchy' | 'department'>('hierarchy');

  // Sample positions data (this would come from the same source as PositionManagementTab)
  const positions: Position[] = [
    {
      id: 'POS001',
      title: 'Senior Cardiologist',
      department: 'Cardiology',
      description: 'Lead cardiologist responsible for complex cardiac procedures',
      level: 'Senior',
      reportsTo: 'Department Head - Cardiology',
      minSalary: 150000,
      maxSalary: 200000,
      responsibilities: ['Perform cardiac procedures', 'Lead cardiac team', 'Patient consultations'],
      requirements: ['MD in Cardiology', '10+ years experience', 'Board certification'],
      employeeCount: 3,
      status: 'Active'
    },
    {
      id: 'POS002',
      title: 'Head Nurse',
      department: 'General Medicine',
      description: 'Senior nursing position overseeing patient care coordination',
      level: 'Lead',
      reportsTo: 'Department Manager - General Medicine',
      minSalary: 55000,
      maxSalary: 70000,
      responsibilities: ['Supervise nursing staff', 'Patient care coordination', 'Staff scheduling'],
      requirements: ['BSN degree', '5+ years nursing experience', 'Leadership experience'],
      employeeCount: 2,
      status: 'Active'
    },
    {
      id: 'POS003',
      title: 'Emergency Physician',
      department: 'Emergency',
      description: 'Emergency room physician handling critical care cases',
      level: 'Senior',
      reportsTo: 'Emergency Department Director',
      minSalary: 120000,
      maxSalary: 160000,
      responsibilities: ['Emergency patient care', 'Trauma response', 'Critical decision making'],
      requirements: ['MD in Emergency Medicine', 'Emergency medicine residency', 'ACLS certification'],
      employeeCount: 4,
      status: 'Active'
    },
    {
      id: 'POS004',
      title: 'Lab Technician',
      department: 'Laboratory',
      description: 'Medical laboratory technician for diagnostic testing',
      level: 'Mid',
      reportsTo: 'Laboratory Supervisor',
      minSalary: 35000,
      maxSalary: 45000,
      responsibilities: ['Conduct lab tests', 'Equipment maintenance', 'Quality control'],
      requirements: ['Associates degree in Medical Technology', '2+ years lab experience', 'Certification'],
      employeeCount: 5,
      status: 'Active'
    },
    {
      id: 'POS005',
      title: 'Pharmacist',
      department: 'Pharmacy',
      description: 'Licensed pharmacist for medication dispensing and consultation',
      level: 'Senior',
      reportsTo: 'Pharmacy Manager',
      minSalary: 80000,
      maxSalary: 100000,
      responsibilities: ['Medication dispensing', 'Patient counseling', 'Drug interaction checks'],
      requirements: ['PharmD degree', 'State pharmacy license', '3+ years experience'],
      employeeCount: 2,
      status: 'Active'
    }
  ];

  const departments = ['Cardiology', 'General Medicine', 'Emergency', 'Laboratory', 'Pharmacy'];

  const filteredPositions = useMemo(() => {
    return positions.filter(position => {
      const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           position.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           position.reportsTo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || position.department === selectedDepartment;
      return matchesSearch && matchesDepartment && position.status === 'Active';
    });
  }, [positions, searchTerm, selectedDepartment]);

  const handleExportChart = () => {
    // This would implement chart export functionality
    console.log('Exporting organizational chart...');
  };

  const totalPositions = filteredPositions.length;
  const totalEmployees = filteredPositions.reduce((sum, pos) => sum + pos.employeeCount, 0);
  const uniqueDepartments = new Set(filteredPositions.map(pos => pos.department)).size;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Organizational Chart
              </CardTitle>
              <CardDescription>Visual representation of reporting hierarchy and organizational structure</CardDescription>
            </div>
            <Button onClick={handleExportChart} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Chart
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search positions, departments, or managers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={viewMode} onValueChange={(value: 'hierarchy' | 'department') => setViewMode(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hierarchy">Hierarchy View</SelectItem>
                <SelectItem value="department">Department View</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Positions</p>
                  <p className="text-2xl font-bold text-blue-900">{totalPositions}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Employees</p>
                  <p className="text-2xl font-bold text-green-900">{totalEmployees}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Departments</p>
                  <p className="text-2xl font-bold text-purple-900">{uniqueDepartments}</p>
                </div>
                <Building className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Organizational Chart */}
          <OrganizationalChart 
            positions={filteredPositions}
            viewMode={viewMode}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationalChartTab;
