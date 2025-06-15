
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Users, 
  DollarSign, 
  Heart, 
  Pill, 
  FlaskConical,
  Settings,
  Lock,
  CheckCircle,
  AlertTriangle,
  Database
} from "lucide-react";

interface DepartmentAdminTabProps {
  currentUserRole: string;
  departmentAccess: string[];
}

const DepartmentAdminTab = ({ currentUserRole, departmentAccess }: DepartmentAdminTabProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState(departmentAccess[0] || 'finance');

  const departmentModules = {
    finance: {
      name: "Finance Department",
      icon: DollarSign,
      color: "bg-green-100 text-green-800",
      modules: [
        { name: "Billing Management", enabled: true, users: 23, description: "Patient billing and invoicing" },
        { name: "Financial Reports", enabled: true, users: 12, description: "Revenue and expense reporting" },
        { name: "Commission Tracking", enabled: true, users: 8, description: "Doctor and staff commissions" },
        { name: "Insurance Claims", enabled: false, users: 0, description: "Insurance processing" },
        { name: "Accounts Payable", enabled: true, users: 15, description: "Vendor payments" }
      ]
    },
    hr: {
      name: "Human Resources",
      icon: Users,
      color: "bg-blue-100 text-blue-800",
      modules: [
        { name: "Employee Management", enabled: true, users: 45, description: "Staff records and profiles" },
        { name: "Payroll System", enabled: true, users: 156, description: "Salary and wage processing" },
        { name: "Leave Management", enabled: true, users: 89, description: "Time off and attendance" },
        { name: "Performance Reviews", enabled: false, users: 0, description: "Staff evaluations" },
        { name: "Recruitment", enabled: true, users: 12, description: "Hiring and onboarding" }
      ]
    },
    medical: {
      name: "Medical Department",
      icon: Heart,
      color: "bg-red-100 text-red-800",
      modules: [
        { name: "Patient Records", enabled: true, users: 234, description: "Electronic health records" },
        { name: "Doctor Portal", enabled: true, users: 89, description: "Physician dashboard" },
        { name: "Appointment System", enabled: true, users: 156, description: "Scheduling and calendar" },
        { name: "Medical Imaging", enabled: false, users: 0, description: "X-ray and scan management" },
        { name: "Treatment Plans", enabled: true, users: 67, description: "Care coordination" }
      ]
    },
    pharmacy: {
      name: "Pharmacy Department",
      icon: Pill,
      color: "bg-purple-100 text-purple-800",
      modules: [
        { name: "Prescription Management", enabled: true, users: 45, description: "Medication orders" },
        { name: "Inventory Control", enabled: true, users: 23, description: "Stock management" },
        { name: "Drug Interactions", enabled: false, users: 0, description: "Safety checking" },
        { name: "Pharmacy POS", enabled: true, users: 34, description: "Point of sale system" },
        { name: "Supplier Management", enabled: true, users: 12, description: "Vendor relations" }
      ]
    },
    laboratory: {
      name: "Laboratory Department",
      icon: FlaskConical,
      color: "bg-orange-100 text-orange-800",
      modules: [
        { name: "Lab Results", enabled: true, users: 56, description: "Test result management" },
        { name: "Sample Tracking", enabled: true, users: 34, description: "Specimen handling" },
        { name: "Equipment Management", enabled: false, users: 0, description: "Lab equipment" },
        { name: "Quality Control", enabled: true, users: 23, description: "Testing standards" },
        { name: "External Labs", enabled: true, users: 15, description: "Partner integration" }
      ]
    }
  };

  const currentDepartment = departmentModules[selectedDepartment as keyof typeof departmentModules];
  const DepartmentIcon = currentDepartment?.icon || Database;

  const departmentStats = [
    { label: "Active Modules", value: currentDepartment?.modules.filter(m => m.enabled).length || 0, total: currentDepartment?.modules.length || 0 },
    { label: "Department Users", value: currentDepartment?.modules.reduce((sum, m) => sum + m.users, 0) || 0 },
    { label: "Module Access", value: `${Math.round(((currentDepartment?.modules.filter(m => m.enabled).length || 0) / (currentDepartment?.modules.length || 1)) * 100)}%` },
    { label: "Admin Level", value: currentUserRole === "super-admin" ? "Full" : "Limited" }
  ];

  return (
    <div className="space-y-6">
      {/* Department Admin Alert */}
      {currentUserRole === "department-admin" && (
        <Alert className="border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            You have Department Admin access to: <strong>{departmentAccess.join(", ").toUpperCase()}</strong> modules.
            Contact Super Admin for additional permissions.
          </AlertDescription>
        </Alert>
      )}

      {/* Department Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Department Administration
          </CardTitle>
          <CardDescription>
            Manage department-specific modules and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Select Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departmentAccess.map((dept) => {
                    const deptData = departmentModules[dept as keyof typeof departmentModules];
                    return (
                      <SelectItem key={dept} value={dept}>
                        {deptData?.name || dept.toUpperCase()}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            {currentDepartment && (
              <div className="flex items-center gap-3 pt-6">
                <div className={`p-3 rounded-lg ${currentDepartment.color.replace('text-', 'bg-').replace('800', '600')}`}>
                  <DepartmentIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{currentDepartment.name}</h3>
                  <Badge className={currentDepartment.color}>
                    {currentDepartment.modules.filter(m => m.enabled).length} Active Modules
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Department Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {departmentStats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {typeof stat.value === 'number' && stat.total ? `${stat.value}/${stat.total}` : stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Module Management */}
      {currentDepartment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DepartmentIcon className="h-5 w-5" />
              {currentDepartment.name} Modules
            </CardTitle>
            <CardDescription>
              Configure access and settings for department modules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentDepartment.modules.map((module, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${module.enabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <div>
                        <h4 className="font-medium">{module.name}</h4>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{module.users} users</div>
                      <div className="text-xs text-gray-500">active</div>
                    </div>
                    
                    <Switch 
                      checked={module.enabled}
                      disabled={currentUserRole === "department-admin"}
                    />
                    
                    {module.enabled ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {currentUserRole === "department-admin" && (
              <Alert className="mt-6">
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  Module configuration is restricted to Super Admins. Contact your system administrator to modify module settings.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Department Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              View Permissions
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Database className="h-6 w-6 mb-2" />
              Module Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentAdminTab;
