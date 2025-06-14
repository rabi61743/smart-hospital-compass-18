
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const PatientUpcomingAppointments = () => {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      date: "Tomorrow",
      time: "10:30 AM",
      type: "Follow-up"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      department: "Neurology",
      date: "Dec 20, 2024",
      time: "2:15 PM",
      type: "Consultation"
    }
  ];

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled visits and consultations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{appointment.doctor}</p>
                <p className="text-sm text-gray-600">{appointment.department}</p>
                <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
              </div>
              <Badge variant="outline">{appointment.type}</Badge>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4" variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Book New Appointment
        </Button>
      </CardContent>
    </Card>
  );
};

export default PatientUpcomingAppointments;
