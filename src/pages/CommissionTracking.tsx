
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CommissionTrackingHeader from "@/components/CommissionTrackingHeader";
import CommissionSummaryCards from "@/components/CommissionSummaryCards";
import DoctorCommissionsTable from "@/components/DoctorCommissionsTable";
import AgentCommissionsTable from "@/components/AgentCommissionsTable";
import LabCommissionsTable from "@/components/LabCommissionsTable";
import PharmacyCommissionsTable from "@/components/PharmacyCommissionsTable";
import SurgeryCommissionsPlaceholder from "@/components/SurgeryCommissionsPlaceholder";
import CommissionRulesEngine from "@/components/CommissionRulesEngine";

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
      <CommissionTrackingHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Commission Tracking Center</h1>
          <p className="text-gray-600">Real-time commission tracking across all departments and stakeholders.</p>
        </div>

        {/* Commission Summary */}
        <CommissionSummaryCards summaryData={commissionSummary} />

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
            <DoctorCommissionsTable doctorCommissions={doctorCommissions} />
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <AgentCommissionsTable agentCommissions={agentCommissions} />
          </TabsContent>

          <TabsContent value="laboratory" className="space-y-6">
            <LabCommissionsTable labCommissions={labCommissions} />
          </TabsContent>

          <TabsContent value="pharmacy" className="space-y-6">
            <PharmacyCommissionsTable pharmacyCommissions={pharmacyCommissions} />
          </TabsContent>

          <TabsContent value="surgery" className="space-y-6">
            <SurgeryCommissionsPlaceholder />
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Commission Rules Engine</CardTitle>
                <CardDescription>Configure flexible commission rules for different scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <CommissionRulesEngine />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommissionTracking;
