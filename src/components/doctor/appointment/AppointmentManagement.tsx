
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar,
  Clock,
  Users,
  Video,
  CheckCircle
} from "lucide-react";
import AppointmentCalendar from "./AppointmentCalendar";
import AppointmentScheduler from "./AppointmentScheduler";
import PatientCheckIn from "./PatientCheckIn";
import TelemedicineHub from "./TelemedicineHub";
import AppointmentDetailsDialog from "./AppointmentDetailsDialog";

const AppointmentManagement = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isAppointmentDetailsOpen, setIsAppointmentDetailsOpen] = useState(false);
  const { toast } = useToast();

  const handleScheduleAppointment = () => {
    setShowScheduler(true);
  };

  const handleViewAppointment = (appointmentId: string) => {
    // Mock appointment data for demonstration
    const mockAppointment = {
      id: appointmentId,
      patientName: 'Rajesh Kumar',
      patientId: 'P001',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'Consultation',
      status: 'Confirmed',
      notes: 'Follow-up consultation for hypertension management',
      duration: '30 minutes',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@email.com'
    };
    
    setSelectedAppointment(mockAppointment);
    setIsAppointmentDetailsOpen(true);
    
    console.log('View appointment:', appointmentId);
  };

  const handleAppointmentScheduled = (appointment: any) => {
    console.log('New appointment scheduled:', appointment);
    setShowScheduler(false);
    toast({
      title: "Appointment Scheduled",
      description: `Appointment for ${appointment.patientName} has been scheduled successfully.`,
    });
  };

  const stats = [
    { label: "Today's Appointments", value: "12", icon: <Calendar className="h-5 w-5" /> },
    { label: "Checked In", value: "8", icon: <CheckCircle className="h-5 w-5" /> },
    { label: "Virtual Sessions", value: "3", icon: <Video className="h-5 w-5" /> },
    { label: "Average Wait", value: "8min", icon: <Clock className="h-5 w-5" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="text-blue-600">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="calendar" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="checkin">Check-In</TabsTrigger>
            <TabsTrigger value="telemedicine">Telemedicine</TabsTrigger>
          </TabsList>
          <Button onClick={handleScheduleAppointment}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>

        <TabsContent value="calendar" className="space-y-4">
          <AppointmentCalendar
            onScheduleAppointment={handleScheduleAppointment}
            onViewAppointment={handleViewAppointment}
          />
        </TabsContent>

        <TabsContent value="checkin" className="space-y-4">
          <PatientCheckIn />
        </TabsContent>

        <TabsContent value="telemedicine" className="space-y-4">
          <TelemedicineHub />
        </TabsContent>
      </Tabs>

      {/* Appointment Scheduler */}
      {showScheduler && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Schedule New Appointment</h2>
                <Button variant="outline" onClick={() => setShowScheduler(false)}>
                  Close
                </Button>
              </div>
              <AppointmentScheduler onAppointmentScheduled={handleAppointmentScheduled} />
            </div>
          </div>
        </div>
      )}

      {/* Appointment Details Dialog */}
      {selectedAppointment && (
        <AppointmentDetailsDialog
          isOpen={isAppointmentDetailsOpen}
          onClose={() => setIsAppointmentDetailsOpen(false)}
          appointment={selectedAppointment}
        />
      )}
    </div>
  );
};

export default AppointmentManagement;
