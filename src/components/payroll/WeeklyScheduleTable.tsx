
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface WeeklyScheduleEmployee {
  employee: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

interface WeeklyScheduleTableProps {
  weeklySchedule: WeeklyScheduleEmployee[];
  selectedWeek: string;
  onWeekChange: (week: string) => void;
}

const WeeklyScheduleTable = ({ weeklySchedule, selectedWeek, onWeekChange }: WeeklyScheduleTableProps) => {
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

  return (
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
          <Select value={selectedWeek} onValueChange={onWeekChange}>
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
  );
};

export default WeeklyScheduleTable;
