
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Plus, Edit, Users } from "lucide-react";

const ShiftManagement = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const shifts = [
    {
      id: 'SHIFT001',
      name: 'Morning Shift',
      startTime: '08:00',
      endTime: '16:00',
      department: 'Cardiology',
      employeesAssigned: 12,
      maxCapacity: 15,
      status: 'Active'
    },
    {
      id: 'SHIFT002',
      name: 'Evening Shift',
      startTime: '16:00',
      endTime: '00:00',
      department: 'Emergency',
      employeesAssigned: 18,
      maxCapacity: 20,
      status: 'Active'
    },
    {
      id: 'SHIFT003',
      name: 'Night Shift',
      startTime: '00:00',
      endTime: '08:00',
      department: 'General Medicine',
      employeesAssigned: 8,
      maxCapacity: 10,
      status: 'Active'
    },
    {
      id: 'SHIFT004',
      name: 'Weekend Shift',
      startTime: '10:00',
      endTime: '18:00',
      department: 'Laboratory',
      employeesAssigned: 5,
      maxCapacity: 8,
      status: 'Active'
    }
  ];

  const weeklySchedule = [
    {
      employee: 'Dr. Sarah Johnson',
      monday: 'Morning',
      tuesday: 'Morning',
      wednesday: 'Morning',
      thursday: 'Morning',
      friday: 'Morning',
      saturday: 'Off',
      sunday: 'Off'
    },
    {
      employee: 'Nurse Mary Wilson',
      monday: 'Evening',
      tuesday: 'Evening',
      wednesday: 'Off',
      thursday: 'Evening',
      friday: 'Evening',
      saturday: 'Weekend',
      sunday: 'Weekend'
    },
    {
      employee: 'Dr. Michael Chen',
      monday: 'Night',
      tuesday: 'Night',
      wednesday: 'Night',
      thursday: 'Night',
      friday: 'Night',
      saturday: 'Off',
      sunday: 'Off'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShiftBadgeColor = (shift: string) => {
    switch (shift) {
      case 'Morning': return 'bg-blue-100 text-blue-800';
      case 'Evening': return 'bg-purple-100 text-purple-800';
      case 'Night': return 'bg-indigo-100 text-indigo-800';
      case 'Weekend': return 'bg-green-100 text-green-800';
      case 'Off': return 'bg-gray-100 text-gray-800';
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
    <div className="space-y-6">
      {/* Shift Templates */}
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

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Schedule
              </CardTitle>
              <CardDescription>View and manage employee shift assignments</CardDescription>
            </div>
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Week</SelectItem>
                <SelectItem value="next">Next Week</SelectItem>
                <SelectItem value="previous">Previous Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Monday</TableHead>
                  <TableHead>Tuesday</TableHead>
                  <TableHead>Wednesday</TableHead>
                  <TableHead>Thursday</TableHead>
                  <TableHead>Friday</TableHead>
                  <TableHead>Saturday</TableHead>
                  <TableHead>Sunday</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weeklySchedule.map((schedule, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{schedule.employee}</TableCell>
                    <TableCell>
                      <Badge className={getShiftBadgeColor(schedule.monday)} variant="outline">
                        {schedule.monday}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getShiftBadgeColor(schedule.tuesday)} variant="outline">
                        {schedule.tuesday}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getShiftBadgeColor(schedule.wednesday)} variant="outline">
                        {schedule.wednesday}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getShiftBadgeColor(schedule.thursday)} variant="outline">
                        {schedule.thursday}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getShiftBadgeColor(schedule.friday)} variant="outline">
                        {schedule.friday}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getShiftBadgeColor(schedule.saturday)} variant="outline">
                        {schedule.saturday}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getShiftBadgeColor(schedule.sunday)} variant="outline">
                        {schedule.sunday}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShiftManagement;
