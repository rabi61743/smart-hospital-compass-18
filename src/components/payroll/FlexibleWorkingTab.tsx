
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { User, Home, Building, Clock, Calendar, Settings } from "lucide-react";

const FlexibleWorkingTab = () => {
  const [showPendingOnly, setShowPendingOnly] = useState(false);

  const flexibleArrangements = [
    {
      employee: 'Dr. Sarah Johnson',
      id: 'EMP001',
      department: 'Cardiology',
      arrangement: 'Hybrid Work',
      details: '3 days office, 2 days remote',
      coreHours: '10:00-15:00',
      approvedBy: 'Dr. Kumar',
      status: 'Active',
      startDate: '2024-01-15',
      reviewDate: '2024-07-15'
    },
    {
      employee: 'Tech Lisa Davis',
      id: 'EMP005',
      department: 'Laboratory',
      arrangement: 'Flexible Hours',
      details: 'Start time 7:00-10:00',
      coreHours: '10:00-14:00',
      approvedBy: 'Lab Manager',
      status: 'Active',
      startDate: '2024-02-01',
      reviewDate: '2024-08-01'
    },
    {
      employee: 'Admin John Brown',
      id: 'EMP006',
      department: 'Administration',
      arrangement: 'Compressed Week',
      details: '4 days x 10 hours',
      coreHours: '09:00-17:00',
      approvedBy: 'HR Director',
      status: 'Pending',
      startDate: '2024-03-01',
      reviewDate: '2024-09-01'
    },
    {
      employee: 'Nurse Anna White',
      id: 'EMP007',
      department: 'Emergency',
      arrangement: 'Job Share',
      details: 'Split with Nurse Taylor',
      coreHours: '08:00-16:00',
      approvedBy: 'Nursing Director',
      status: 'Under Review',
      startDate: '2024-02-15',
      reviewDate: '2024-08-15'
    }
  ];

  const arrangementTypes = [
    {
      type: 'Hybrid Work',
      description: 'Combination of office and remote work',
      employees: 18,
      icon: <Home className="h-4 w-4" />
    },
    {
      type: 'Flexible Hours',
      description: 'Variable start/end times within limits',
      employees: 24,
      icon: <Clock className="h-4 w-4" />
    },
    {
      type: 'Compressed Week',
      description: 'Full-time hours in fewer days',
      employees: 8,
      icon: <Calendar className="h-4 w-4" />
    },
    {
      type: 'Job Share',
      description: 'One position shared between two people',
      employees: 4,
      icon: <User className="h-4 w-4" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getArrangementIcon = (arrangement: string) => {
    switch (arrangement) {
      case 'Hybrid Work': return <Home className="h-4 w-4 text-green-600" />;
      case 'Flexible Hours': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Compressed Week': return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'Job Share': return <User className="h-4 w-4 text-orange-600" />;
      default: return <Settings className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredArrangements = showPendingOnly 
    ? flexibleArrangements.filter(arr => arr.status === 'Pending' || arr.status === 'Under Review')
    : flexibleArrangements;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Flexible Working Arrangements</h3>
          <p className="text-sm text-muted-foreground">Manage hybrid, remote, and flexible work arrangements</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch 
              checked={showPendingOnly} 
              onCheckedChange={setShowPendingOnly}
              id="pending-filter"
            />
            <label htmlFor="pending-filter" className="text-sm">Show pending only</label>
          </div>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            New Arrangement
          </Button>
        </div>
      </div>

      {/* Arrangement Types Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {arrangementTypes.map((type, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  {type.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{type.type}</p>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                  <p className="text-sm font-semibold text-blue-600 mt-1">{type.employees} employees</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Arrangements */}
      <Card>
        <CardHeader>
          <CardTitle>Current Flexible Working Arrangements</CardTitle>
          <CardDescription>
            {showPendingOnly ? 'Pending approvals and reviews' : 'All flexible working arrangements'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Arrangement Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Core Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Review Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArrangements.map((arrangement) => (
                <TableRow key={arrangement.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{arrangement.employee}</p>
                        <p className="text-sm text-muted-foreground">{arrangement.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getArrangementIcon(arrangement.arrangement)}
                      <span className="text-sm">{arrangement.arrangement}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{arrangement.details}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{arrangement.coreHours}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(arrangement.status)}>
                      {arrangement.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(arrangement.reviewDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {arrangement.status === 'Pending' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            Reject
                          </Button>
                        </>
                      )}
                      {arrangement.status === 'Active' && (
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Policies & Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Flexible Working Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium text-sm">Hybrid Work Guidelines</h4>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• Minimum 2 days in office per week</li>
                <li>• Must attend all team meetings in person</li>
                <li>• Home office setup requirements apply</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm">Flexible Hours Policy</h4>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• Core hours: 10:00 AM - 3:00 PM</li>
                <li>• Start time between 7:00 AM - 10:00 AM</li>
                <li>• 40 hours per week requirement</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Approval Workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-2 border rounded-lg">
              <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</div>
              <div className="flex-1">
                <p className="text-sm font-medium">Employee Request</p>
                <p className="text-xs text-muted-foreground">Submit flexible working application</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 border rounded-lg">
              <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</div>
              <div className="flex-1">
                <p className="text-sm font-medium">Manager Review</p>
                <p className="text-xs text-muted-foreground">Department head assessment</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 border rounded-lg">
              <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</div>
              <div className="flex-1">
                <p className="text-sm font-medium">HR Approval</p>
                <p className="text-xs text-muted-foreground">Final policy compliance check</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlexibleWorkingTab;
