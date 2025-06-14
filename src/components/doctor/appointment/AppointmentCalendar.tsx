
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  Video,
  Phone,
  MapPin,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  duration: number;
  type: 'consultation' | 'follow-up' | 'surgery' | 'emergency';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  mode: 'in-person' | 'telemedicine' | 'phone';
  location?: string;
  notes?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    patientId: 'p1',
    time: '09:00',
    duration: 30,
    type: 'follow-up',
    status: 'confirmed',
    mode: 'in-person',
    location: 'Room 101'
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    patientId: 'p2',
    time: '10:30',
    duration: 45,
    type: 'consultation',
    status: 'scheduled',
    mode: 'telemedicine'
  },
  {
    id: '3',
    patientName: 'Emily Davis',
    patientId: 'p3',
    time: '14:00',
    duration: 30,
    type: 'follow-up',
    status: 'in-progress',
    mode: 'in-person',
    location: 'Room 103'
  }
];

interface AppointmentCalendarProps {
  onScheduleAppointment: () => void;
  onViewAppointment: (appointmentId: string) => void;
}

const AppointmentCalendar = ({ onScheduleAppointment, onViewAppointment }: AppointmentCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  const getAppointmentColor = (appointment: Appointment) => {
    switch (appointment.status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'telemedicine': return <Video className="h-3 w-3" />;
      case 'phone': return <Phone className="h-3 w-3" />;
      default: return <MapPin className="h-3 w-3" />;
    }
  };

  const todayAppointments = mockAppointments.filter(apt => 
    isSameDay(selectedDate, new Date())
  );

  const renderDayView = () => {
    const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

    return (
      <div className="space-y-2">
        {timeSlots.map(hour => {
          const appointment = todayAppointments.find(apt => 
            parseInt(apt.time.split(':')[0]) === hour
          );

          return (
            <div key={hour} className="flex items-center space-x-4 p-2 border-b">
              <div className="w-16 text-sm text-gray-600">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="flex-1">
                {appointment ? (
                  <div 
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow",
                      getAppointmentColor(appointment)
                    )}
                    onClick={() => onViewAppointment(appointment.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{appointment.patientName}</span>
                        {getModeIcon(appointment.mode)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {appointment.type}
                      </Badge>
                    </div>
                    <div className="text-xs mt-1 opacity-75">
                      {appointment.duration} min • {appointment.location || 'Virtual'}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-400">
                    Available
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">
            {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="flex space-x-1">
            <Button
              variant={viewMode === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('day')}
            >
              Day
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedDate(addDays(selectedDate, -1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedDate(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button onClick={onScheduleAppointment}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mini Calendar */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="w-full"
            />
          </CardContent>
        </Card>

        {/* Main Calendar View */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>
              {todayAppointments.length} appointments for {format(selectedDate, 'EEEE, MMMM d')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {viewMode === 'day' && renderDayView()}
            {viewMode === 'week' && (
              <div className="text-center py-8 text-gray-500">
                Week view implementation coming soon
              </div>
            )}
            {viewMode === 'month' && (
              <div className="text-center py-8 text-gray-500">
                Month view implementation coming soon
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
