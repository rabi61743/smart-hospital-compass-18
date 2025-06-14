
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const LeaveCalendarTab = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState('month');

  const leaveEvents = [
    { date: '2024-01-15', employee: 'Dr. Sarah Johnson', type: 'Annual Leave', days: 1 },
    { date: '2024-01-16', employee: 'Dr. Sarah Johnson', type: 'Annual Leave', days: 1 },
    { date: '2024-01-18', employee: 'Nurse Mary Wilson', type: 'Sick Leave', days: 1 },
    { date: '2024-01-19', employee: 'Nurse Mary Wilson', type: 'Sick Leave', days: 1 },
    { date: '2024-01-22', employee: 'Dr. Michael Chen', type: 'Personal Leave', days: 1 },
    { date: '2024-01-25', employee: 'Lab Tech John Smith', type: 'Annual Leave', days: 1 },
  ];

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'Annual Leave': return 'bg-blue-500';
      case 'Sick Leave': return 'bg-red-500';
      case 'Personal Leave': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date: string) => {
    return leaveEvents.filter(event => event.date === date);
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Create calendar grid
  const calendarDays = [];
  
  // Empty cells for days before the month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-xl font-semibold">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Select value={viewType} onValueChange={setViewType}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="week">Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-6">
            <h4 className="font-medium">Leave Types:</h4>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm">Annual Leave</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm">Sick Leave</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-sm">Personal Leave</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Leave Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground border-b">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={index} className="p-2 h-24"></div>;
              }
              
              const dateString = formatDate(year, month, day);
              const events = getEventsForDate(dateString);
              
              return (
                <div key={day} className="p-1 h-24 border border-gray-200 bg-white hover:bg-gray-50">
                  <div className="text-sm font-medium mb-1">{day}</div>
                  <div className="space-y-1">
                    {events.slice(0, 2).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`text-xs text-white p-1 rounded text-center ${getLeaveTypeColor(event.type)}`}
                        title={`${event.employee} - ${event.type}`}
                      >
                        {event.employee.split(' ')[0]}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-xs text-center text-muted-foreground">
                        +{events.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Today's Leave Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Today's Leave Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaveEvents
              .filter(event => event.date === new Date().toISOString().split('T')[0])
              .map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getLeaveTypeColor(event.type)}`}></div>
                    <span className="font-medium">{event.employee}</span>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            {leaveEvents.filter(event => event.date === new Date().toISOString().split('T')[0]).length === 0 && (
              <p className="text-center text-muted-foreground py-4">No employees on leave today</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveCalendarTab;
