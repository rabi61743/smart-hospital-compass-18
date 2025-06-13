
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Users, Calendar, Heart, Hospital, Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const todayStats = [
    { label: "Total Patients", value: "847", change: "+12%", icon: <Users className="h-5 w-5" /> },
    { label: "Appointments", value: "142", change: "+8%", icon: <Calendar className="h-5 w-5" /> },
    { label: "Revenue Today", value: "₹1,24,000", change: "+15%", icon: <Heart className="h-5 w-5" /> },
    { label: "Commission Earned", value: "₹18,600", change: "+22%", icon: <Hospital className="h-5 w-5" /> }
  ];

  const departmentPerformance = [
    { name: "OPD", revenue: 45000, commission: 6750, utilization: 85 },
    { name: "Surgery", revenue: 35000, commission: 5250, utilization: 92 },
    { name: "Laboratory", revenue: 25000, commission: 3750, utilization: 78 },
    { name: "Pharmacy", revenue: 19000, commission: 2850, utilization: 88 }
  ];

  const recentActivities = [
    { type: "appointment", message: "New appointment booked for Dr. Smith", time: "2 min ago" },
    { type: "commission", message: "Commission calculated for Surgery Dept", time: "5 min ago" },
    { type: "patient", message: "Patient discharge completed - Room 204", time: "12 min ago" },
    { type: "alert", message: "Lab results ready for Patient ID: PAT001", time: "18 min ago" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Hospital className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">MediFlow HMS</span>
              </Link>
              <Badge variant="secondary">Admin Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Good Morning, Dr. Admin</h1>
          <p className="text-gray-600">Here's what's happening at your hospital today.</p>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {todayStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.label}
                </CardTitle>
                <div className="text-blue-600">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium">
                  {stat.change} from yesterday
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Department Performance */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                  <CardDescription>Revenue and commission breakdown by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {departmentPerformance.map((dept, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{dept.name}</span>
                          <span className="text-sm text-gray-600">₹{dept.revenue.toLocaleString()}</span>
                        </div>
                        <Progress value={dept.utilization} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Utilization: {dept.utilization}%</span>
                          <span>Commission: ₹{dept.commission.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest updates from your hospital</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="commissions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Commission Overview</CardTitle>
                  <CardDescription>Real-time commission tracking across all departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Total Commissions Today</p>
                        <p className="text-2xl font-bold text-blue-600">₹18,600</p>
                      </div>
                      <Badge variant="secondary">+22% vs yesterday</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Doctor Commissions</span>
                        <span className="font-medium">₹12,400</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Agent Commissions</span>
                        <span className="font-medium">₹4,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Referral Bonuses</span>
                        <span className="font-medium">₹2,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Earners</CardTitle>
                  <CardDescription>Highest commission earners this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Dr. Sarah Johnson", dept: "Surgery", amount: "₹45,200" },
                      { name: "Dr. Michael Chen", dept: "Cardiology", amount: "₹38,900" },
                      { name: "Dr. Emily Davis", dept: "Neurology", amount: "₹34,500" },
                      { name: "Agent John Smith", dept: "Referrals", amount: "₹28,700" }
                    ].map((earner, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{earner.name}</p>
                          <p className="text-sm text-gray-600">{earner.dept}</p>
                        </div>
                        <span className="font-medium text-green-600">{earner.amount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>Overview of patient activities and appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Patient Portal Integration</h3>
                  <p className="text-gray-600 mb-4">Manage patient records, appointments, and medical history</p>
                  <Link to="/patient-portal">
                    <Button>Access Patient Portal</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Comprehensive insights into hospital performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Revenue Analytics</h4>
                    <p className="text-3xl font-bold text-blue-600">₹1.2M</p>
                    <p className="text-sm text-blue-700">This Month</p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Patient Satisfaction</h4>
                    <p className="text-3xl font-bold text-green-600">94%</p>
                    <p className="text-sm text-green-700">Average Rating</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Efficiency Score</h4>
                    <p className="text-3xl font-bold text-purple-600">87%</p>
                    <p className="text-sm text-purple-700">Overall Performance</p>
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

export default Dashboard;
