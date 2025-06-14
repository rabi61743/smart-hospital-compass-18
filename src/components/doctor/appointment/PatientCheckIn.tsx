
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock,
  CheckCircle,
  XCircle,
  User,
  Search,
  Timer,
  MapPin,
  Video,
  Phone,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";

interface AppointmentStatus {
  id: string;
  patientName: string;
  patientId: string;
  scheduledTime: string;
  type: string;
  mode: 'in-person' | 'telemedicine' | 'phone';
  location?: string;
  status: 'waiting' | 'checked-in' | 'in-progress' | 'completed' | 'no-show';
  checkedInAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  waitTime?: number;
}

const mockTodayAppointments: AppointmentStatus[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    patientId: 'p1',
    scheduledTime: '09:00',
    type: 'Follow-up',
    mode: 'in-person',
    location: 'Room 101',
    status: 'checked-in',
    checkedInAt: new Date(),
    waitTime: 15
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    patientId: 'p2',
    scheduledTime: '10:30',
    type: 'Consultation',
    mode: 'telemedicine',
    status: 'waiting'
  },
  {
    id: '3',
    patientName: 'Emily Davis',
    patientId: 'p3',
    scheduledTime: '11:00',
    type: 'Follow-up',
    mode: 'in-person',
    location: 'Room 103',
    status: 'in-progress',
    checkedInAt: new Date(Date.now() - 30 * 60 * 1000),
    startedAt: new Date(Date.now() - 10 * 60 * 1000)
  },
  {
    id: '4',
    patientName: 'Robert Wilson',
    patientId: 'p4',
    scheduledTime: '14:00',
    type: 'Surgery Consult',
    mode: 'in-person',
    location: 'Room 105',
    status: 'waiting'
  }
];

const PatientCheckIn = () => {
  const [appointments, setAppointments] = useState<AppointmentStatus[]>(mockTodayAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'no-show': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'telemedicine': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const handleCheckIn = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'checked-in' as const, checkedInAt: new Date() }
        : apt
    ));
  };

  const handleStartConsultation = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'in-progress' as const, startedAt: new Date() }
        : apt
    ));
  };

  const handleCompleteConsultation = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'completed' as const, completedAt: new Date() }
        : apt
    ));
  };

  const handleMarkNoShow = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'no-show' as const }
        : apt
    ));
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getWaitTime = (appointment: AppointmentStatus) => {
    if (!appointment.checkedInAt) return null;
    if (appointment.startedAt) return null;
    
    const waitTime = Math.floor((Date.now() - appointment.checkedInAt.getTime()) / (1000 * 60));
    return waitTime;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Waiting</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {appointments.filter(a => a.status === 'waiting').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Checked In</p>
                <p className="text-2xl font-bold text-blue-600">
                  {appointments.filter(a => a.status === 'checked-in').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-green-600">
                  {appointments.filter(a => a.status === 'in-progress').length}
                </p>
              </div>
              <Timer className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-gray-600">
                  {appointments.filter(a => a.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => {
          const waitTime = getWaitTime(appointment);
          
          return (
            <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-600" />
                      <div>
                        <h3 className="font-semibold">{appointment.patientName}</h3>
                        <p className="text-sm text-gray-600">
                          {appointment.scheduledTime} • {appointment.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getModeIcon(appointment.mode)}
                      <span className="text-sm text-gray-600">
                        {appointment.location || 'Virtual'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {waitTime && waitTime > 15 && (
                      <div className="flex items-center space-x-1 text-orange-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Wait: {waitTime}m</span>
                      </div>
                    )}
                    
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      {appointment.status === 'waiting' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleCheckIn(appointment.id)}
                          >
                            Check In
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMarkNoShow(appointment.id)}
                          >
                            No Show
                          </Button>
                        </>
                      )}
                      
                      {appointment.status === 'checked-in' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStartConsultation(appointment.id)}
                        >
                          Start Consultation
                        </Button>
                      )}
                      
                      {appointment.status === 'in-progress' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleCompleteConsultation(appointment.id)}
                        >
                          Complete
                        </Button>
                      )}
                      
                      {appointment.mode === 'telemedicine' && appointment.status !== 'completed' && (
                        <Button size="sm" variant="outline">
                          <Video className="h-4 w-4 mr-1" />
                          Join Call
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {appointment.status === 'in-progress' && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      Consultation in progress since {appointment.startedAt && format(appointment.startedAt, 'HH:mm')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PatientCheckIn;
