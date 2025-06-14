
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Calendar, Clock, MapPin, Edit } from "lucide-react";

interface WorkSchedulesTabProps {
  department: string;
  week: string;
}

const WorkSchedulesTab = ({ department, week }: WorkSchedulesTabProps) => {
  const [viewMode, setViewMode] = useState('weekly');

  const weeklySchedules = [
    {
      employee: 'Dr. Sarah Johnson',
      id: 'EMP001',
      department: 'Cardiology',
      pattern: '4-Day Work Week',
      monday: { shift: 'Day', time: '09:00-18:00', location: 'Main' },
      tuesday: { shift: 'Day', time: '09:00-18:00', location: 'Main' },
      wednesday: { shift: 'Day', time: '09:00-18:00', location: 'Main' },
      thursday: { shift: 'Day', time: '09:00-18:00', location: 'Main' },
      friday: { shift: 'Off', time: '', location: '' },
      saturday: { shift: 'Off', time: '', location: '' },
      sunday: { shift: 'Off', time: '', location: '' },
      totalHours: 36
    },
    {
      employee: 'Nurse Mary Wilson',
      id: 'EMP002',
      department: 'Emergency',
      pattern: 'Rotating 12-Hour',
      monday: { shift: 'Day', time: '07:00-19:00', location: 'Main' },
      tuesday: { shift: 'Day', time: '07:00-19:00', location: 'Main' },
      wednesday: { shift: 'Off', time: '', location: '' },
      thursday: { shift: 'Off', time: '', location: '' },
      friday: { shift: 'Night', time: '19:00-07:00', location: 'Main' },
      saturday: { shift: 'Night', time: '19:00-07:00', location: 'Main' },
      sunday: { shift: 'Off', time: '', location: '' },
      totalHours: 48
    },
    {
      employee: 'Dr. Michael Chen',
      id: 'EMP003',
      department: 'General Medicine',
      pattern: 'Flexible Hours',
      monday: { shift: 'Flex', time: '08:00-16:00', location: 'Remote' },
      tuesday: { shift: 'Flex', time: '10:00-18:00', location: 'Main' },
      wednesday: { shift: 'Flex', time: '09:00-17:00', location: 'Main' },
      thursday: { shift: 'Flex', time: '07:00-15:00', location: 'Branch' },
      friday: { shift: 'Flex', time: '11:00-19:00', location: 'Main' },
      saturday: { shift: 'Off', time: '', location: '' },
      sunday: { shift: 'Off', time: '', location: '' },
      totalHours: 40
    }
  ];

  const getShiftBadgeColor = (shift: string) => {
    switch (shift) {
      case 'Day': return 'bg-blue-100 text-blue-800';
      case 'Night': return 'bg-indigo-100 text-indigo-800';
      case 'Flex': return 'bg-green-100 text-green-800';
      case 'Off': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLocationIcon = (location: string) => {
    if (location === 'Remote') return '🏠';
    if (location === 'Branch') return '🏢';
    return '🏥';
  };

  const renderDayCell = (dayData: any) => {
    if (dayData.shift === 'Off') {
      return <Badge className="bg-gray-100 text-gray-800" variant="outline">Off</Badge>;
    }

    return (
      <div className="space-y-1">
        <Badge className={getShiftBadgeColor(dayData.shift)} variant="outline">
          {dayData.shift}
        </Badge>
        <div className="text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {dayData.time}
          </div>
          <div className="flex items-center gap-1">
            <span>{getLocationIcon(dayData.location)}</span>
            {dayData.location}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Work Schedules</h3>
          <p className="text-sm text-muted-foreground">
            {week === 'current' ? 'Current Week' : week === 'next' ? 'Next Week' : 'Previous Week'} - 
            {department === 'all' ? ' All Departments' : ` ${department} Department`}
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Schedule
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-48">Employee</TableHead>
                  <TableHead>Pattern</TableHead>
                  <TableHead>Monday</TableHead>
                  <TableHead>Tuesday</TableHead>
                  <TableHead>Wednesday</TableHead>
                  <TableHead>Thursday</TableHead>
                  <TableHead>Friday</TableHead>
                  <TableHead>Saturday</TableHead>
                  <TableHead>Sunday</TableHead>
                  <TableHead>Total Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weeklySchedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{schedule.employee}</p>
                          <p className="text-sm text-muted-foreground">{schedule.department}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{schedule.pattern}</TableCell>
                    <TableCell>{renderDayCell(schedule.monday)}</TableCell>
                    <TableCell>{renderDayCell(schedule.tuesday)}</TableCell>
                    <TableCell>{renderDayCell(schedule.wednesday)}</TableCell>
                    <TableCell>{renderDayCell(schedule.thursday)}</TableCell>
                    <TableCell>{renderDayCell(schedule.friday)}</TableCell>
                    <TableCell>{renderDayCell(schedule.saturday)}</TableCell>
                    <TableCell>{renderDayCell(schedule.sunday)}</TableCell>
                    <TableCell className="font-semibold">{schedule.totalHours}h</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Coverage Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Day Shift</span>
                <span className="font-semibold">85% covered</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Night Shift</span>
                <span className="font-semibold">92% covered</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Weekend</span>
                <span className="font-semibold">78% covered</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Schedule Conflicts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-2 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium">Understaffed</p>
                <p className="text-xs text-muted-foreground">Thursday Night - Emergency</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <p className="text-sm font-medium">Double Booking</p>
                <p className="text-xs text-muted-foreground">Friday Day - Dr. Smith</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Workload Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Hours/Employee</span>
                <span className="font-semibold">41.3h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Overtime Hours</span>
                <span className="font-semibold">156.5h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Efficiency Score</span>
                <span className="font-semibold">87%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkSchedulesTab;
