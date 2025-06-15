
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Phone } from "lucide-react";

interface AppointmentSchedulerProps {
  onAppointmentScheduled?: (appointment: any) => void;
}

const AppointmentScheduler = ({ onAppointmentScheduled }: AppointmentSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [duration, setDuration] = useState('30');
  const [notes, setNotes] = useState('');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const appointmentTypes = [
    'Consultation', 'Follow-up', 'Emergency', 'Surgery Consult', 'Telemedicine'
  ];

  const handleSchedule = () => {
    const appointmentData = {
      date: selectedDate,
      time: selectedTime,
      patientName,
      type: appointmentType,
      duration,
      notes
    };

    console.log('Scheduling appointment:', appointmentData);
    
    if (onAppointmentScheduled) {
      onAppointmentScheduled(appointmentData);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Schedule New Appointment
        </CardTitle>
        <CardDescription>Book a new appointment for a patient</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patient">Patient Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="patient"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Appointment Type</Label>
            <Select value={appointmentType} onValueChange={setAppointmentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <Clock className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Input
            id="notes"
            placeholder="Additional notes or instructions"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <Button onClick={handleSchedule} className="w-full">
          Schedule Appointment
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppointmentScheduler;
