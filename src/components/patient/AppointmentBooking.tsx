
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar as CalendarIcon, Clock, User, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const appointmentSchema = z.object({
  doctorId: z.string().min(1, "Please select a doctor"),
  department: z.string().min(1, "Please select a department"),
  appointmentType: z.string().min(1, "Please select appointment type"),
  date: z.date({
    required_error: "Please select a date",
  }),
  timeSlot: z.string().min(1, "Please select a time slot"),
  reason: z.string().min(10, "Please provide reason for visit (minimum 10 characters)"),
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please provide a valid phone number"),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const doctors = [
  { id: "dr1", name: "Dr. Sarah Johnson", department: "Cardiology", specialization: "Interventional Cardiology" },
  { id: "dr2", name: "Dr. Michael Chen", department: "Neurology", specialization: "Neurological Surgery" },
  { id: "dr3", name: "Dr. Emily Davis", department: "General Medicine", specialization: "Internal Medicine" },
  { id: "dr4", name: "Dr. Robert Wilson", department: "Orthopedics", specialization: "Sports Medicine" },
  { id: "dr5", name: "Dr. Lisa Brown", department: "Dermatology", specialization: "Cosmetic Dermatology" },
];

const departments = ["Cardiology", "Neurology", "General Medicine", "Orthopedics", "Dermatology"];

const appointmentTypes = ["Consultation", "Follow-up", "Emergency", "Routine Checkup", "Procedure"];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientName: "John Doe",
      phone: "+91 9876543210",
    },
  });

  const watchedDepartment = form.watch("department");
  const filteredDoctors = doctors.filter(doctor => 
    !watchedDepartment || doctor.department === watchedDepartment
  );

  const onSubmit = (data: AppointmentFormData) => {
    console.log("Appointment booking data:", data);
    toast({
      title: "Appointment Booked Successfully!",
      description: `Your appointment with ${doctors.find(d => d.id === data.doctorId)?.name} has been scheduled for ${format(data.date, "PPP")} at ${data.timeSlot}.`,
    });
    setIsDialogOpen(false);
    form.reset();
    setSelectedDate(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Quick Book Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            Book New Appointment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-16 flex flex-col items-center gap-2">
                  <Stethoscope className="h-6 w-6" />
                  <span>Schedule Appointment</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Book Appointment</DialogTitle>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="patientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Patient Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {departments.map((dept) => (
                                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="doctorId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Doctor</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select doctor" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {filteredDoctors.map((doctor) => (
                                  <SelectItem key={doctor.id} value={doctor.id}>
                                    {doctor.name} - {doctor.specialization}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="appointmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Appointment Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select appointment type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {appointmentTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Select Date</FormLabel>
                            <div className="border rounded-md p-3">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setSelectedDate(date);
                                }}
                                disabled={(date) =>
                                  date < new Date() || date.getDay() === 0
                                }
                                className={cn("w-full pointer-events-auto")}
                              />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="timeSlot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Available Time Slots</FormLabel>
                            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                              {timeSlots.map((slot) => (
                                <Button
                                  key={slot}
                                  type="button"
                                  variant={field.value === slot ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => field.onChange(slot)}
                                  disabled={!selectedDate}
                                >
                                  <Clock className="h-3 w-3 mr-1" />
                                  {slot}
                                </Button>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason for Visit</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe your symptoms or reason for this appointment..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3">
                      <Button type="submit" className="flex-1">
                        Book Appointment
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <Clock className="h-6 w-6" />
              <span>Emergency Booking</span>
            </Button>

            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <User className="h-6 w-6" />
              <span>Book for Family</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Doctors */}
      <Card>
        <CardHeader>
          <CardTitle>Available Doctors Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.slice(0, 6).map((doctor) => (
              <div key={doctor.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{doctor.name}</h4>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  </div>
                  <Badge variant="secondary">{doctor.department}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">Available</span>
                  <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentBooking;
