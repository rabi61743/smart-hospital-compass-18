
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Search, 
  Filter, 
  User, 
  Calendar,
  Heart,
  Activity,
  AlertTriangle,
  Download,
  Edit
} from "lucide-react";

const ElectronicHealthRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const patients = [
    {
      id: 'p1',
      name: 'Sarah Johnson',
      age: 45,
      mrn: 'MRN001234',
      lastVisit: '2024-01-30',
      conditions: ['Hypertension', 'Diabetes'],
      status: 'active',
      allergies: ['Penicillin']
    },
    {
      id: 'p2',
      name: 'Michael Chen',
      age: 32,
      mrn: 'MRN001235',
      lastVisit: '2024-01-28',
      conditions: [],
      status: 'stable',
      allergies: []
    },
    {
      id: 'p3',
      name: 'Emily Davis',
      age: 28,
      mrn: 'MRN001236',
      lastVisit: '2024-01-25',
      conditions: ['Asthma'],
      status: 'monitoring',
      allergies: ['Latex']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'stable': return 'bg-green-100 text-green-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Electronic Health Records
          </CardTitle>
          <CardDescription>Access and manage patient electronic health records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name or MRN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {patient.mrn} • Age {patient.age} • Last visit: {patient.lastVisit}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status.toUpperCase()}
                          </Badge>
                          {patient.conditions.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3 text-red-500" />
                              <span className="text-xs text-muted-foreground">
                                {patient.conditions.join(', ')}
                              </span>
                            </div>
                          )}
                          {patient.allergies.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <AlertTriangle className="h-3 w-3 text-orange-500" />
                              <span className="text-xs text-muted-foreground">
                                Allergies: {patient.allergies.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        View Record
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectronicHealthRecords;
