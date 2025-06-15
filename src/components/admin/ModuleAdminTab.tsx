
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Lock, DollarSign, Heart, Pill, Users } from "lucide-react";
import ModuleAdminOverview from "./module-admin/ModuleAdminOverview";
import AssignModuleAdminDialog from "./module-admin/AssignModuleAdminDialog";
import ModuleAdminList from "./module-admin/ModuleAdminList";
import ModulePermissionMatrix from "./module-admin/ModulePermissionMatrix";

interface ModuleAdminTabProps {
  currentUserRole: string;
  departmentAccess: string[];
}

const ModuleAdminTab = ({ currentUserRole, departmentAccess }: ModuleAdminTabProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState(departmentAccess[0] || 'finance');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const moduleAdmins = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@hospital.com",
      department: "medical",
      modules: ["Patient Records", "Doctor Portal", "Medical Imaging"],
      permissions: {
        "Patient Records": ["view", "create", "edit", "delete", "export"],
        "Doctor Portal": ["view", "create", "edit", "manage_users"],
        "Medical Imaging": ["view", "create", "approve"]
      },
      lastActive: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@hospital.com",
      department: "finance",
      modules: ["Billing Management", "Financial Reports"],
      permissions: {
        "Billing Management": ["view", "create", "edit", "process_payments"],
        "Financial Reports": ["view", "generate", "export"]
      },
      lastActive: "1 day ago",
      status: "active"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@hospital.com",
      department: "pharmacy",
      modules: ["Prescription Management", "Inventory Control"],
      permissions: {
        "Prescription Management": ["view", "create", "edit", "approve"],
        "Inventory Control": ["view", "create", "edit", "manage_stock"]
      },
      lastActive: "3 hours ago",
      status: "active"
    }
  ];

  const departments = {
    finance: {
      name: "Finance Department",
      icon: DollarSign,
      modules: [
        { name: "Billing Management", users: 23, critical: true },
        { name: "Financial Reports", users: 12, critical: false },
        { name: "Commission Tracking", users: 8, critical: true },
        { name: "Accounts Payable", users: 15, critical: false }
      ]
    },
    medical: {
      name: "Medical Department", 
      icon: Heart,
      modules: [
        { name: "Patient Records", users: 234, critical: true },
        { name: "Doctor Portal", users: 89, critical: true },
        { name: "Medical Imaging", users: 45, critical: false },
        { name: "Treatment Plans", users: 67, critical: false }
      ]
    },
    pharmacy: {
      name: "Pharmacy Department",
      icon: Pill,
      modules: [
        { name: "Prescription Management", users: 45, critical: true },
        { name: "Inventory Control", users: 23, critical: true },
        { name: "Pharmacy POS", users: 34, critical: false },
        { name: "Supplier Management", users: 12, critical: false }
      ]
    },
    hr: {
      name: "Human Resources",
      icon: Users,
      modules: [
        { name: "Employee Management", users: 45, critical: true },
        { name: "Payroll System", users: 156, critical: true },
        { name: "Leave Management", users: 89, critical: false },
        { name: "Recruitment", users: 12, critical: false }
      ]
    }
  };

  const permissionTypes = [
    { key: "view", label: "View", description: "Read access to module data" },
    { key: "create", label: "Create", description: "Add new records" },
    { key: "edit", label: "Edit", description: "Modify existing records" },
    { key: "delete", label: "Delete", description: "Remove records" },
    { key: "export", label: "Export", description: "Export data" },
    { key: "approve", label: "Approve", description: "Approve transactions/requests" },
    { key: "manage_users", label: "Manage Users", description: "Add/remove module users" },
    { key: "configure", label: "Configure", description: "Module settings and configuration" }
  ];

  const currentDepartment = departments[selectedDepartment as keyof typeof departments];
  const filteredModuleAdmins = moduleAdmins.filter(admin => 
    departmentAccess.includes(admin.department) || currentUserRole === "super-admin"
  );

  return (
    <div className="space-y-6">
      <ModuleAdminOverview
        moduleAdminsCount={filteredModuleAdmins.length}
        currentDepartmentModulesCount={currentDepartment?.modules.length || 0}
        permissionTypesCount={permissionTypes.length}
        criticalModulesCount={currentDepartment?.modules.filter(m => m.critical).length || 0}
      />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Module Administration by Department
              </CardTitle>
              <CardDescription>
                Assign and manage module-specific administrators with granular permissions
              </CardDescription>
            </div>
            <AssignModuleAdminDialog
              isOpen={isAssignDialogOpen}
              onOpenChange={setIsAssignDialogOpen}
              departments={departments}
              departmentAccess={departmentAccess}
              currentDepartment={currentDepartment}
              permissionTypes={permissionTypes}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full max-w-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departmentAccess.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {departments[dept as keyof typeof departments]?.name || dept.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <ModuleAdminList 
        moduleAdmins={filteredModuleAdmins}
        departments={departments}
      />

      <ModulePermissionMatrix
        currentDepartment={currentDepartment}
        moduleAdmins={filteredModuleAdmins}
      />

      {currentUserRole === "department-admin" && (
        <Alert className="border-blue-200 bg-blue-50">
          <Lock className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            As a Department Admin, you can only view and manage module administrators within your assigned departments: <strong>{departmentAccess.join(", ").toUpperCase()}</strong>. 
            Contact Super Admin to modify cross-department permissions.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ModuleAdminTab;
