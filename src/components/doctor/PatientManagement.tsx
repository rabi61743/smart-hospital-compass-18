
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  AlertTriangle, 
  Heart,
  Calendar,
  Download
} from "lucide-react";
import PatientProfileCard from "./PatientProfileCard";

// Mock patient data
const mockPatients = [
  {
    id: 'p1',
    name: 'Sarah Johnson',
    age: 45,
    gender: 'Female' as const,
    phone: '+91 9876543210',
    email: 'sarah.johnson@email.com',
    address: 'Mumbai, Maharashtra',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Shellfish'],
    chronicConditions: ['Hypertension', 'Diabetes Type 2'],
    lastVisit: new Date('2024-01-25'),
    nextAppointment: new Date('2024-02-15'),
    emergencyContact: {
      name: 'John Johnson',
      phone: '+91 9876543211',
      relation: 'Spouse'
    },
    insuranceProvider: 'HDFC ERGO',
    status: 'monitoring' as const
  },
  {
    id: 'p2',
    name: 'Michael Chen',
    age: 32,
    gender: 'Male' as const,
    phone: '+91 9876543212',
    email: 'michael.chen@email.com',
    address: 'Delhi, NCR',
    bloodType: 'O-',
    allergies: [],
    chronicConditions: [],
    lastVisit: new Date('2024-01-28'),
    emergencyContact: {
      name: 'Lisa Chen',
      phone: '+91 9876543213',
      relation: 'Wife'
    },
    status: 'stable' as const
  },
  {
    id: 'p3',
    name: 'Emily Davis',
    age: 28,
    gender: 'Female' as const,
    phone: '+91 9876543214',
    email: 'emily.davis@email.com',
    address: 'Bangalore, Karnataka',
    bloodType: 'B+',
    allergies: ['Latex'],
    chronicConditions: ['Asthma'],
    lastVisit: new Date('2024-01-30'),
    nextAppointment: new Date('2024-02-10'),
    emergencyContact: {
      name: 'Robert Davis',
      phone: '+91 9876543215',
      relation: 'Father'
    },
    insuranceProvider: 'Star Health',
    status: 'active' as const
  },
  {
    id: 'p4',
    name: 'Robert Wilson',
    age: 67,
    gender: 'Male' as const,
    phone: '+91 9876543216',
    email: 'robert.wilson@email.com',
    address: 'Chennai, Tamil Nadu',
    bloodType: 'AB+',
    allergies: ['Aspirin'],
    chronicConditions: ['Heart Disease', 'High Cholesterol'],
    lastVisit: new Date('2024-01-29'),
    emergencyContact: {
      name: 'Margaret Wilson',
      phone: '+91 9876543217',
      relation: 'Wife'
    },
    status: 'critical' as const
  }
];

const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredPatients = mockPatients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.phone.includes(searchTerm);
      const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'age': return a.age - b.age;
        case 'lastVisit': return b.lastVisit.getTime() - a.lastVisit.getTime();
        default: return 0;
      }
    });

  const handleViewDetails = (patientId: string) => {
    console.log('View details for patient:', patientId);
    // Implementation for viewing patient details
  };

  const handleScheduleAppointment = (patientId: string) => {
    console.log('Schedule appointment for patient:', patientId);
    // Implementation for scheduling appointment
  };

  const getStatusStats = () => {
    return {
      total: mockPatients.length,
      active: mockPatients.filter(p => p.status === 'active').length,
      critical: mockPatients.filter(p => p.status === 'critical').length,
      monitoring: mockPatients.filter(p => p.status === 'monitoring').length,
      stable: mockPatients.filter(p => p.status === 'stable').length,
    };
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Patients</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
              </div>
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monitoring</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.monitoring}</p>
              </div>
              <Heart className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Stable</p>
                <p className="text-2xl font-bold text-green-600">{stats.stable}</p>
              </div>
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="list">Patient List</TabsTrigger>
            <TabsTrigger value="calendar">Appointments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </div>

        <TabsContent value="list" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patients by name, email, or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="monitoring">Monitoring</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="age">Age</SelectItem>
                    <SelectItem value="lastVisit">Last Visit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Patient List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPatients.map((patient) => (
              <PatientProfileCard
                key={patient.id}
                patient={patient}
                onViewDetails={handleViewDetails}
                onScheduleAppointment={handleScheduleAppointment}
              />
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Start by adding your first patient'
                  }
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Patient
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Appointments</CardTitle>
              <CardDescription>Manage patient appointments and scheduling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Appointment Calendar</h3>
                <p className="text-gray-600 mb-4">View and manage patient appointments</p>
                <Button>View Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Reports</CardTitle>
              <CardDescription>Generate reports and analytics for patient care</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Download className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Patient Reports</h3>
                <p className="text-gray-600 mb-4">Generate comprehensive patient reports</p>
                <Button>Generate Reports</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientManagement;
