
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ChevronLeft, ChevronRight, Filter, Download } from "lucide-react";

interface ScheduleCalendarTabProps {
  department: string;
  week: string;
}

const ScheduleCalendarTab = ({ department, week }: ScheduleCalendarTabProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');

  // Generate calendar days for the current week
  const getWeekDays = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays(currentDate);
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Sample schedule data
  const scheduleData = {
    'Dr. Sarah Johnson': {
      '0': { shift: 'Day', time: '09:00-18:00', location: 'Main', color: 'bg-blue-100' },
      '1': { shift: 'Day', time: '09:00-18:00', location: 'Main', color: 'bg-blue-100' },
      '2': { shift: 'Day', time: '09:00-18:00', location: 'Main', color: 'bg-blue-100' },
      '3': { shift: 'Day', time: '09:00-18:00', location: 'Main', color: 'bg-blue-100' },
    },
    'Nurse Mary Wilson': {
      '0': { shift: 'Day', time: '07:00-19:00', location: 'Main', color: 'bg-green-100' },
      '1': { shift: 'Day', time: '07:00-19:00', location: 'Main', color: 'bg-green-100' },
      '4': { shift: 'Night', time: '19:00-07:00', location: 'Main', color: 'bg-purple-100' },
      '5': { shift: 'Night', time: '19:00-07:00', location: 'Main', color: 'bg-purple-100' },
    },
    'Dr. Michael Chen': {
      '0': { shift: 'Flex', time: '08:00-16:00', location: 'Remote', color: 'bg-orange-100' },
      '1': { shift: 'Flex', time: '10:00-18:00', location: 'Main', color: 'bg-orange-100' },
      '2': { shift: 'Flex', time: '09:00-17:00', location: 'Main', color: 'bg-orange-100' },
      '3': { shift: 'Flex', time: '07:00-15:00', location: 'Branch', color: 'bg-orange-100' },
      '4': { shift: 'Flex', time: '11:00-19:00', location: 'Main', color: 'bg-orange-100' },
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMonthYearRange = () => {
    const startDate = weekDays[0];
    const endDate = weekDays[6];
    
    if (startDate.getMonth() === endDate.getMonth()) {
      return startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else {
      return `${startDate.toLocaleDateString('en-US', { month: 'short' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Schedule Calendar</h3>
          <p className="text-sm text-muted-foreground">
            Visual overview of employee schedules - {getMonthYearRange()}
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Schedule View
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>
            Week of {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-1">
            {/* Header row */}
            <div className="p-3 font-medium text-sm border-b">Employee</div>
            {dayNames.map((day, index) => (
              <div key={day} className="p-3 font-medium text-sm text-center border-b">
                <div>{day}</div>
                <div className="text-xs text-muted-foreground">{weekDays[index].getDate()}</div>
              </div>
            ))}

            {/* Schedule rows */}
            {Object.entries(scheduleData).map(([employee, schedule]) => (
              <React.Fragment key={employee}>
                <div className="p-3 text-sm font-medium border-r bg-gray-50">
                  {employee}
                </div>
                {dayNames.map((_, dayIndex) => {
                  const daySchedule = schedule[dayIndex.toString()];
                  return (
                    <div key={dayIndex} className="p-2 border-r border-b min-h-[80px]">
                      {daySchedule ? (
                        <div className={`p-2 rounded-lg ${daySchedule.color} text-xs`}>
                          <div className="font-medium">{daySchedule.shift}</div>
                          <div className="text-xs opacity-75">{daySchedule.time}</div>
                          <div className="text-xs opacity-75">{daySchedule.location}</div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400 text-xs mt-6">Off</div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend and Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Schedule Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-100 rounded"></div>
                <span className="text-sm">Day Shift (Regular Hours)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-purple-100 rounded"></div>
                <span className="text-sm">Night Shift</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-100 rounded"></div>
                <span className="text-sm">Extended Shift (12+ hours)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-100 rounded"></div>
                <span className="text-sm">Flexible/Remote Work</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Week Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Scheduled Hours</span>
                <span className="font-semibold">248 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Coverage Rate</span>
                <span className="font-semibold">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Overtime Hours</span>
                <span className="font-semibold">24 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Remote Work Hours</span>
                <span className="font-semibold">32 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleCalendarTab;
