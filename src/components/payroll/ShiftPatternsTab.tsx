
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Edit, Copy, Trash2, Plus } from "lucide-react";

const ShiftPatternsTab = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const shiftPatterns = [
    {
      id: 'SP001',
      name: '4-Day Work Week',
      type: 'Fixed',
      schedule: 'Mon-Thu 9:00-18:00',
      totalHours: 36,
      employees: 15,
      status: 'Active'
    },
    {
      id: 'SP002',
      name: 'Rotating 12-Hour',
      type: 'Rotating',
      schedule: '2 days on, 2 days off',
      totalHours: 48,
      employees: 24,
      status: 'Active'
    },
    {
      id: 'SP003',
      name: 'Flexible Hours',
      type: 'Flexible',
      schedule: 'Core: 10:00-15:00',
      totalHours: 40,
      employees: 32,
      status: 'Active'
    },
    {
      id: 'SP004',
      name: 'Night Shift Pattern',
      type: 'Fixed',
      schedule: 'Mon-Fri 22:00-06:00',
      totalHours: 40,
      employees: 8,
      status: 'Active'
    },
    {
      id: 'SP005',
      name: 'Weekend Coverage',
      type: 'Weekend',
      schedule: 'Sat-Sun 8:00-20:00',
      totalHours: 24,
      employees: 12,
      status: 'Draft'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Fixed': return 'bg-blue-100 text-blue-800';
      case 'Rotating': return 'bg-purple-100 text-purple-800';
      case 'Flexible': return 'bg-green-100 text-green-800';
      case 'Weekend': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Shift Patterns</h3>
          <p className="text-sm text-muted-foreground">Create and manage different shift patterns</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Pattern
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pattern Details</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Weekly Hours</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shiftPatterns.map((pattern) => (
                <TableRow key={pattern.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{pattern.name}</p>
                        <p className="text-sm text-muted-foreground">{pattern.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(pattern.type)} variant="outline">
                      {pattern.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{pattern.schedule}</TableCell>
                  <TableCell className="font-semibold">{pattern.totalHours}h</TableCell>
                  <TableCell>{pattern.employees} assigned</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(pattern.status)}>
                      {pattern.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pattern Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Standard 9-5</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Schedule:</strong> Mon-Fri 9:00-17:00</p>
              <p><strong>Hours:</strong> 40 hours/week</p>
              <p><strong>Break:</strong> 1 hour lunch</p>
            </div>
            <Button variant="outline" size="sm" className="mt-3">
              Use Template
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Continental Shift</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Schedule:</strong> 2 days, 2 nights, 4 off</p>
              <p><strong>Hours:</strong> 48 hours/week</p>
              <p><strong>Pattern:</strong> 8-week rotation</p>
            </div>
            <Button variant="outline" size="sm" className="mt-3">
              Use Template
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Compressed Work Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Schedule:</strong> Mon-Thu 8:00-18:00</p>
              <p><strong>Hours:</strong> 40 hours/week</p>
              <p><strong>Break:</strong> 1 hour lunch</p>
            </div>
            <Button variant="outline" size="sm" className="mt-3">
              Use Template
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShiftPatternsTab;
