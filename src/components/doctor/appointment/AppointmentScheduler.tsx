
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Calendar as CalendarIcon,
  Clock,
  Search,
  AlertTriangle,
  CheckCircle,
  Video,
  Phone,
  MapPin
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface ConflictCheck {
  hasConflict: boolean;
  conflictingAppointments: Array<{
    patientName: string;
    time: string;
    duration: number;
  }>;
}

interface AppointmentSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (appointment: any) => void;
}

const mockPatients: Patient[] = [
  { id: 'p1', name: 'Sarah Johnson', phone: '+91 9876543210', email: 'sarah@email.com' },
  { id: 'p2', name: 'Michael Chen', phone: '+91 9876543212', email: 'michael@email.com' },
  { id: 'p3', name: 'Emily Davis', phone: '+91 9876543214', email: 'emily@email.com' },
];

const AppointmentScheduler = ({ isOpen, onClose, onSchedule }: AppointmentSchedulerProps) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [appointmentDate, setAppointmentDate] = useState<Date>();
  const [appointmentTime, setAppointmentTime] = useState('');
  const [duration, setDuration] = useState('30');
  const [appointmentType, setAppointmentType] = useState('');
  const [mode, setMode] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [conflictCheck, setConflictCheck] = useState<ConflictCheck | null>(null);

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const checkForConflicts = () => {
    // Mock conflict detection
    const hasConflict = appointmentTime === '10:00' && appointmentDate;
    setConflictCheck({
      hasConflict,
      conflictingAppointments: hasConflict ? [
        { patientName: 'John Doe', time: '10:00', duration: 30 }
      ] : []
    });
  };

  const handleSchedule = () => {
    if (!selectedPatient || !appointmentDate || !appointmentTime) return;

    const appointment = {
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      date: appointmentDate,
      time: appointmentTime,
      duration: parseInt(duration),
      type: appointmentType,
      mode,
      location,
      notes,
      status: 'scheduled'
    };

    onSchedule(appointment);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setSelectedPatient(null);
    setSearchTerm('');
    setAppointmentDate(undefined);
    setAppointmentTime('');
    setDuration('30');
    setAppointmentType('');
    setMode('');
    setLocation('');
    setNotes('');
    setConflictCheck(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
          <DialogDescription>
            Select a patient and appointment details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Selection */}
          <div className="space-y-2">
            <Label>Select Patient</Label>
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              {searchTerm && (
                <div className="max-h-32 overflow-y-auto border rounded-md">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className={cn(
                        "p-3 cursor-pointer hover:bg-gray-50 border-b last:border-b-0",
                        selectedPatient?.id === patient.id && "bg-blue-50"
                      )}
                      onClick={() => {
                        setSelectedPatient(patient);
                        setSearchTerm('');
                      }}
                    >
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-gray-600">{patient.phone} • {patient.email}</div>
                    </div>
                  ))}
                </div>
              )}
              {selectedPatient && (
                <div className="p-3 bg-blue-50 rounded-md">
                  <div className="font-medium">{selectedPatient.name}</div>
                  <div className="text-sm text-gray-600">{selectedPatient.phone} • {selectedPatient.email}</div>
                </div>
              )}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !appointmentDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {appointmentDate ? format(appointmentDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={appointmentDate}
                    onSelect={setAppointmentDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Select value={appointmentTime} onValueChange={(value) => {
                setAppointmentTime(value);
                if (value && appointmentDate) {
                  checkForConflicts();
                }
              }}>
                <SelectTrigger>
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 8).map(hour => 
                    ['00', '30'].map(minute => (
                      <SelectItem key={`${hour}:${minute}`} value={`${hour}:${minute}`}>
                        {hour.toString().padStart(2, '0')}:{minute}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conflict Detection */}
          {conflictCheck && (
            <div className={cn(
              "p-3 rounded-lg border",
              conflictCheck.hasConflict 
                ? "bg-red-50 border-red-200" 
                : "bg-green-50 border-green-200"
            )}>
              <div className="flex items-center space-x-2">
                {conflictCheck.hasConflict ? (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                <span className="font-medium">
                  {conflictCheck.hasConflict ? 'Schedule Conflict Detected' : 'No Conflicts Found'}
                </span>
              </div>
              {conflictCheck.hasConflict && (
                <div className="mt-2 text-sm">
                  {conflictCheck.conflictingAppointments.map((conflict, index) => (
                    <div key={index}>
                      {conflict.patientName} at {conflict.time} ({conflict.duration} min)
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Appointment Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
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
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Mode</Label>
              <Select value={mode} onValueChange={setMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      In-Person
                    </div>
                  </SelectItem>
                  <SelectItem value="telemedicine">
                    <div className="flex items-center">
                      <Video className="mr-2 h-4 w-4" />
                      Telemedicine
                    </div>
                  </SelectItem>
                  <SelectItem value="phone">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      Phone Call
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {mode === 'in-person' && (
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Room number or location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea
              placeholder="Additional notes for the appointment..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSchedule}
            disabled={!selectedPatient || !appointmentDate || !appointmentTime || !appointmentType || !mode}
          >
            Schedule Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentScheduler;
