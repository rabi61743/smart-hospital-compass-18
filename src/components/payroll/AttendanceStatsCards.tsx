
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User, Clock, CheckCircle, XCircle } from "lucide-react";

interface AttendanceStats {
  totalEmployees: number;
  present: number;
  absent: number;
  late: number;
  onLeave: number;
}

interface AttendanceStatsCardsProps {
  attendanceStats: AttendanceStats;
}

const AttendanceStatsCards = ({ attendanceStats }: AttendanceStatsCardsProps) => {
  return (
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
  );
};

export default AttendanceStatsCards;
