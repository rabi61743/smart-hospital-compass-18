import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Heart, Hospital, Users, Bell, Settings, FileText, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentBooking from "@/components/patient/AppointmentBooking";
import AppointmentManagement from "@/components/patient/AppointmentManagement";

const PatientPortal = () => {
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

  const recentVisits = [
    {
      id: 1,
      doctor: "Dr. Emily Davis",
      department: "General Medicine",
      date: "Dec 10, 2024",
      diagnosis: "Routine Checkup",
      status: "Completed"
    },
    {
      id: 2,
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      date: "Nov 28, 2024",
      diagnosis: "Hypertension Follow-up",
      status: "Reports Available"
    }
  ];

  const healthMetrics = [
    { label: "Blood Pressure", value: "120/80", status: "Normal", color: "text-green-600" },
    { label: "Heart Rate", value: "72 bpm", status: "Normal", color: "text-green-600" },
    { label: "Weight", value: "68 kg", status: "Stable", color: "text-blue-600" },
    { label: "BMI", value: "22.5", status: "Normal", color: "text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Hospital className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">MediFlow HMS</span>
              </Link>
              <Badge variant="secondary">Patient Portal</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/patient-history">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Medical History
                </Button>
              </Link>
              <Link to="/patient-registration">
                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-xl">JP</AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John Doe</h1>
          <p className="text-gray-600">Patient ID: PAT001 | Member since 2022</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Book Appointment</CardTitle>
            </CardHeader>
          </Card>
          <Link to="/patient-history">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <CardTitle className="text-lg">View Medical History</CardTitle>
              </CardHeader>
            </Card>
          </Link>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Hospital className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Telemedicine</CardTitle>
            </CardHeader>
          </Card>
          <Link to="/patient-registration">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Register Family</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="book-appointment">Book Appointment</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="reports">Lab Reports</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Appointments */}
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

              {/* Health Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Health Metrics</CardTitle>
                  <CardDescription>Latest readings from your visits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {healthMetrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{metric.label}</p>
                          <p className="text-2xl font-bold">{metric.value}</p>
                        </div>
                        <Badge variant="secondary" className={metric.color}>
                          {metric.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Visits */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Visits</CardTitle>
                <CardDescription>Your medical history and past consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentVisits.map((visit) => (
                    <div key={visit.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{visit.doctor}</p>
                        <p className="text-sm text-gray-600">{visit.department}</p>
                        <p className="text-sm text-gray-600">{visit.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{visit.diagnosis}</p>
                        <Badge variant={visit.status === "Completed" ? "default" : "secondary"}>
                          {visit.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/patient-history">
                  <Button className="w-full mt-4" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Complete Medical History
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <AppointmentManagement />
          </TabsContent>

          <TabsContent value="book-appointment" className="space-y-6">
            <AppointmentBooking />
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription>Complete digital health history and documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Electronic Health Records</h3>
                  <p className="text-gray-600 mb-4">Secure access to your complete medical history</p>
                  <Link to="/patient-history">
                    <Button>View Records</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Laboratory Reports</CardTitle>
                <CardDescription>Test results and diagnostic reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Hospital className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Digital Lab Reports</h3>
                  <p className="text-gray-600 mb-4">Instant access to test results and imaging reports</p>
                  <Button>View Reports</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Payments</CardTitle>
                <CardDescription>Manage your medical bills and payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Outstanding Bills</h4>
                    <p className="text-3xl font-bold text-green-600">₹0</p>
                    <p className="text-sm text-green-700">All Clear!</p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">This Month</h4>
                    <p className="text-3xl font-bold text-blue-600">₹2,450</p>
                    <p className="text-sm text-blue-700">Total Spent</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Insurance Covered</h4>
                    <p className="text-3xl font-bold text-purple-600">₹1,850</p>
                    <p className="text-sm text-purple-700">75% Coverage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientPortal;
