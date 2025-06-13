
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Heart, Hospital, Bell, Settings, DollarSign, TrendingUp, Calculator, Receipt } from "lucide-react";
import { Link } from "react-router-dom";

const CommissionTracking = () => {
  const commissionSummary = [
    { type: "Doctor Commissions", amount: "₹2,45,600", change: "+18%", color: "text-green-600" },
    { type: "Agent Commissions", amount: "₹78,900", change: "+12%", color: "text-blue-600" },
    { type: "Lab Commissions", amount: "₹45,200", change: "+8%", color: "text-purple-600" },
    { type: "Pharmacy Commissions", amount: "₹32,100", change: "+15%", color: "text-orange-600" }
  ];

  const doctorCommissions = [
    { id: 1, name: "Dr. Sarah Johnson", department: "Cardiology", consultations: 45, surgeries: 8, commission: "₹38,500", rate: "15%" },
    { id: 2, name: "Dr. Michael Chen", department: "Neurology", consultations: 38, surgeries: 5, commission: "₹32,200", rate: "12%" },
    { id: 3, name: "Dr. Emily Davis", department: "General Medicine", consultations: 52, surgeries: 0, commission: "₹26,000", rate: "10%" },
    { id: 4, name: "Dr. Robert Wilson", department: "Orthopedics", consultations: 29, surgeries: 12, commission: "₹45,800", rate: "18%" }
  ];

  const agentCommissions = [
    { id: 1, name: "John Smith", type: "External Referral", referrals: 28, converted: 22, commission: "₹18,700", rate: "₹850/referral" },
    { id: 2, name: "Maria Garcia", type: "Insurance Agent", policies: 15, claims: 12, commission: "₹12,400", rate: "8%" },
    { id: 3, name: "David Kumar", type: "Corporate Liaison", companies: 3, employees: 85, commission: "₹25,600", rate: "₹300/employee" },
    { id: 4, name: "Lisa Wong", type: "Medical Tourism", patients: 7, revenue: "₹3,50,000", commission: "₹22,200", rate: "6.5%" }
  ];

  const labCommissions = [
    { test: "Blood Tests", count: 245, revenue: "₹73,500", commission: "₹11,025", rate: "15%" },
    { test: "X-Ray", count: 128, revenue: "₹38,400", commission: "₹5,760", rate: "15%" },
    { test: "MRI Scans", count: 18, revenue: "₹54,000", commission: "₹8,100", rate: "15%" },
    { test: "CT Scans", count: 24, revenue: "₹72,000", commission: "₹10,800", rate: "15%" }
  ];

  const pharmacyCommissions = [
    { category: "Prescription Medicines", sales: "₹1,25,000", commission: "₹12,500", rate: "10%" },
    { category: "OTC Medicines", sales: "₹78,000", commission: "₹7,800", rate: "10%" },
    { category: "Medical Supplies", sales: "₹45,000", commission: "₹6,750", rate: "15%" },
    { category: "Health Supplements", sales: "₹32,000", commission: "₹5,120", rate: "16%" }
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
              <Badge variant="secondary">Commission Tracking</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Commission Tracking Center</h1>
          <p className="text-gray-600">Real-time commission tracking across all departments and stakeholders.</p>
        </div>

        {/* Commission Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {commissionSummary.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {item.type}
                </CardTitle>
                <DollarSign className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{item.amount}</div>
                <p className={`text-xs font-medium ${item.color}`}>
                  {item.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Commission Tracking Tabs */}
        <Tabs defaultValue="doctors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="laboratory">Laboratory</TabsTrigger>
            <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
            <TabsTrigger value="surgery">Surgery</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="doctors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Commission Tracking</CardTitle>
                <CardDescription>Track consultation and procedure-based commissions for all doctors</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Consultations</TableHead>
                      <TableHead>Surgeries</TableHead>
                      <TableHead>Commission Rate</TableHead>
                      <TableHead>Total Commission</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {doctorCommissions.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell className="font-medium">{doctor.name}</TableCell>
                        <TableCell>{doctor.department}</TableCell>
                        <TableCell>{doctor.consultations}</TableCell>
                        <TableCell>{doctor.surgeries}</TableCell>
                        <TableCell>{doctor.rate}</TableCell>
                        <TableCell className="font-bold text-green-600">{doctor.commission}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Commission Tracking</CardTitle>
                <CardDescription>Monitor commissions for referral agents and external partners</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Commission Rate</TableHead>
                      <TableHead>Total Commission</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agentCommissions.map((agent) => (
                      <TableRow key={agent.id}>
                        <TableCell className="font-medium">{agent.name}</TableCell>
                        <TableCell>{agent.type}</TableCell>
                        <TableCell>
                          {agent.referrals && `${agent.converted}/${agent.referrals} converted`}
                          {agent.policies && `${agent.policies} policies`}
                          {agent.companies && `${agent.employees} employees`}
                          {agent.patients && `${agent.patients} patients`}
                        </TableCell>
                        <TableCell>{agent.rate}</TableCell>
                        <TableCell className="font-bold text-green-600">{agent.commission}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="laboratory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Laboratory Commission Tracking</CardTitle>
                <CardDescription>Track commissions from lab tests and diagnostic procedures</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test Type</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Commission Rate</TableHead>
                      <TableHead>Commission Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {labCommissions.map((lab, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{lab.test}</TableCell>
                        <TableCell>{lab.count}</TableCell>
                        <TableCell>{lab.revenue}</TableCell>
                        <TableCell>{lab.rate}</TableCell>
                        <TableCell className="font-bold text-green-600">{lab.commission}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pharmacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pharmacy Commission Tracking</CardTitle>
                <CardDescription>Monitor pharmacy sales and related commissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Sales Amount</TableHead>
                      <TableHead>Commission Rate</TableHead>
                      <TableHead>Commission Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pharmacyCommissions.map((pharmacy, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{pharmacy.category}</TableCell>
                        <TableCell>{pharmacy.sales}</TableCell>
                        <TableCell>{pharmacy.rate}</TableCell>
                        <TableCell className="font-bold text-green-600">{pharmacy.commission}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="surgery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Surgery Commission Tracking</CardTitle>
                <CardDescription>Track procedure-based commissions and revenue splits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Surgery Commission Calculator</h3>
                  <p className="text-gray-600 mb-4">Configure and track commissions for surgical procedures</p>
                  <Button>Configure Surgery Rules</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Commission Rules Engine</CardTitle>
                <CardDescription>Configure flexible commission rules for different scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 bg-blue-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-blue-600 mb-3" />
                    <h4 className="font-medium text-blue-900 mb-2">Doctor Rules</h4>
                    <p className="text-sm text-blue-700 mb-4">Configure consultation and procedure rates</p>
                    <Button variant="outline" size="sm">Manage Rules</Button>
                  </div>
                  <div className="p-6 bg-green-50 rounded-lg">
                    <Users className="h-8 w-8 text-green-600 mb-3" />
                    <h4 className="font-medium text-green-900 mb-2">Agent Rules</h4>
                    <p className="text-sm text-green-700 mb-4">Set referral and performance incentives</p>
                    <Button variant="outline" size="sm">Manage Rules</Button>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-lg">
                    <Receipt className="h-8 w-8 text-purple-600 mb-3" />
                    <h4 className="font-medium text-purple-900 mb-2">Department Rules</h4>
                    <p className="text-sm text-purple-700 mb-4">Configure lab and pharmacy commissions</p>
                    <Button variant="outline" size="sm">Manage Rules</Button>
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

export default CommissionTracking;
