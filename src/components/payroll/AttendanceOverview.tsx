
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const AttendanceOverview = () => {
  const todayAttendance = [
    {
      id: 'EMP001',
      name: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      clockIn: '08:45 AM',
      clockOut: null,
      status: 'Present',
      hoursWorked: 7.25,
      isLate: false
    },
    {
      id: 'EMP002',
      name: 'Nurse Mary Wilson',
      department: 'General Medicine',
      clockIn: '09:15 AM',
      clockOut: null,
      status: 'Present',
      hoursWorked: 6.75,
      isLate: true
    },
    {
      id: 'EMP003',
      name: 'Dr. Michael Chen',
      department: 'Emergency',
      clockIn: '07:30 AM',
      clockOut: '04:00 PM',
      status: 'Completed',
      hoursWorked: 8.5,
      isLate: false
    },
    {
      id: 'EMP004',
      name: 'Lab Tech John Smith',
      department: 'Laboratory',
      clockIn: null,
      clockOut: null,
      status: 'Absent',
      hoursWorked: 0,
      isLate: false
    },
    {
      id: 'EMP005',
      name: 'Pharmacy Tech Lisa Davis',
      department: 'Pharmacy',
      clockIn: '08:55 AM',
      clockOut: null,
      status: 'On Break',
      hoursWorked: 6.0,
      isLate: false
    }
  ];

  const attendanceStats = {
    totalEmployees: 124,
    present: 89,
    absent: 12,
    late: 23,
    onLeave: 11
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Absent': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'On Break': return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'On Break': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-green-600">{attendanceStats.present}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <Progress 
                value={(attendanceStats.present / attendanceStats.totalEmployees) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {((attendanceStats.present / attendanceStats.totalEmployees) * 100).toFixed(1)}% of total
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-red-600">{attendanceStats.absent}</p>
              </div>
              <div className="bg-red-100 p-2 rounded-lg">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
            </div>
            <div className="mt-2">
              <Progress 
                value={(attendanceStats.absent / attendanceStats.totalEmployees) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {((attendanceStats.absent / attendanceStats.totalEmployees) * 100).toFixed(1)}% of total
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Late Arrivals</p>
                <p className="text-2xl font-bold text-orange-600">{attendanceStats.late}</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
            </div>
            <div className="mt-2">
              <Progress 
                value={(attendanceStats.late / attendanceStats.totalEmployees) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {((attendanceStats.late / attendanceStats.totalEmployees) * 100).toFixed(1)}% of total
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold text-blue-600">{attendanceStats.onLeave}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <Progress 
                value={(attendanceStats.onLeave / attendanceStats.totalEmployees) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {((attendanceStats.onLeave / attendanceStats.totalEmployees) * 100).toFixed(1)}% of total
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todayAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{record.name}</p>
                        <p className="text-sm text-muted-foreground">{record.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {record.clockIn || '--'}
                      {record.isLate && record.clockIn && (
                        <Badge variant="outline" className="text-orange-600 border-orange-200">
                          Late
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{record.clockOut || '--'}</TableCell>
                  <TableCell>{record.hoursWorked}h</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(record.status)}
                        {record.status}
                      </span>
                    </Badge>
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

export default AttendanceOverview;
