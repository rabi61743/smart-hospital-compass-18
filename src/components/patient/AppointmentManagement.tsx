
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Phone, Video, User, FileText } from "lucide-react";
import { format, addDays } from "date-fns";

const upcomingAppointments = [
  {
    id: "apt1",
    doctor: "Dr. Sarah Johnson",
    department: "Cardiology",
    date: new Date(),
    time: "10:30 AM",
    type: "Follow-up",
    status: "Confirmed",
    location: "Room 205, Cardiology Wing",
    phone: "+91 98765 43210",
    notes: "Bring previous ECG reports"
  },
  {
    id: "apt2",
    doctor: "Dr. Michael Chen",
    department: "Neurology",
    date: addDays(new Date(), 2),
    time: "2:15 PM",
    type: "Consultation",
    status: "Pending",
    location: "Room 301, Neurology Wing",
    phone: "+91 98765 43211",
    notes: "Initial consultation for headaches"
  },
];

const pastAppointments = [
  {
    id: "apt3",
    doctor: "Dr. Emily Davis",
    department: "General Medicine",
    date: new Date(2024, 11, 10),
    time: "11:00 AM",
    type: "Routine Checkup",
    status: "Completed",
    location: "Room 101, General Wing",
    diagnosis: "Overall health is good",
    prescription: "Vitamin D supplements",
    nextVisit: "3 months"
  },
  {
    id: "apt4",
    doctor: "Dr. Sarah Johnson",
    department: "Cardiology",
    date: new Date(2024, 10, 28),
    time: "9:30 AM",
    type: "Follow-up",
    status: "Completed",
    location: "Room 205, Cardiology Wing",
    diagnosis: "Blood pressure under control",
    prescription: "Continue current medication",
    nextVisit: "6 weeks"
  },
];

const AppointmentManagement = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="history">Appointment History</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                      <Badge variant="outline">{appointment.department}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(appointment.date, "PPP")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{appointment.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>{appointment.type}</span>
                      </div>
                    </div>
                    {appointment.notes && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedAppointment(appointment)}>
                            <User className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Appointment Details</DialogTitle>
                          </DialogHeader>
                          {selectedAppointment && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Doctor</label>
                                  <p>{selectedAppointment.doctor}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Department</label>
                                  <p>{selectedAppointment.department}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Date & Time</label>
                                  <p>{format(selectedAppointment.date, "PPP")} at {selectedAppointment.time}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Type</label>
                                  <p>{selectedAppointment.type}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Location</label>
                                <p>{selectedAppointment.location}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm">
                                  <Phone className="h-4 w-4 mr-1" />
                                  Call Doctor
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Video className="h-4 w-4 mr-1" />
                                  Join Video Call
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button size="sm" variant="destructive">Cancel</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {pastAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                      <Badge variant="outline">{appointment.department}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(appointment.date, "PPP")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{appointment.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>{appointment.type}</span>
                      </div>
                    </div>
                    {appointment.diagnosis && (
                      <div className="space-y-2">
                        <div className="p-3 bg-green-50 rounded-md">
                          <p className="text-sm">
                            <strong>Diagnosis:</strong> {appointment.diagnosis}
                          </p>
                        </div>
                        {appointment.prescription && (
                          <div className="p-3 bg-blue-50 rounded-md">
                            <p className="text-sm">
                              <strong>Prescription:</strong> {appointment.prescription}
                            </p>
                          </div>
                        )}
                        {appointment.nextVisit && (
                          <div className="p-3 bg-yellow-50 rounded-md">
                            <p className="text-sm">
                              <strong>Next Visit:</strong> {appointment.nextVisit}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        View Report
                      </Button>
                      <Button size="sm" variant="outline">Book Follow-up</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentManagement;
