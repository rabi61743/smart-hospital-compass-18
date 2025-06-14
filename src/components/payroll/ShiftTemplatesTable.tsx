
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Edit, Users, Plus } from "lucide-react";

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  department: string;
  employeesAssigned: number;
  maxCapacity: number;
  status: string;
}

interface ShiftTemplatesTableProps {
  shifts: Shift[];
}

const ShiftTemplatesTable = ({ shifts }: ShiftTemplatesTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCapacityColor = (assigned: number, max: number) => {
    const percentage = (assigned / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Shift Templates
            </CardTitle>
            <CardDescription>Manage shift schedules and assignments</CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Shift
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shift Details</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{shift.name}</p>
                      <p className="text-sm text-muted-foreground">{shift.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{shift.startTime} - {shift.endTime}</p>
                    <p className="text-sm text-muted-foreground">
                      {parseInt(shift.endTime.split(':')[0]) - parseInt(shift.startTime.split(':')[0]) || 8}h shift
                    </p>
                  </div>
                </TableCell>
                <TableCell>{shift.department}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${getCapacityColor(shift.employeesAssigned, shift.maxCapacity)}`}>
                      {shift.employeesAssigned}/{shift.maxCapacity}
                    </span>
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(shift.employeesAssigned / shift.maxCapacity) * 100}%` }}
                    ></div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(shift.status)}>
                    {shift.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShiftTemplatesTable;
