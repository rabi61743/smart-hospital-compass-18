
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface AttendanceRecord {
  id: string;
  name: string;
  department: string;
  clockIn: string | null;
  clockOut: string | null;
  status: string;
  hoursWorked: number;
  isLate: boolean;
}

interface TodayAttendanceTableProps {
  todayAttendance: AttendanceRecord[];
}

const TodayAttendanceTable = ({ todayAttendance }: TodayAttendanceTableProps) => {
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
  );
};

export default TodayAttendanceTable;
