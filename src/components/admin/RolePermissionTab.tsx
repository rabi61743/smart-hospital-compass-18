
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Shield, 
  Users, 
  Plus, 
  Edit, 
  Eye, 
  Database, 
  FileText, 
  Settings,
  UserCheck,
  Lock
} from "lucide-react";

const RolePermissionTab = () => {
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);

  const roles = [
    {
      id: 1,
      name: "Super Admin",
      description: "Full system access and control",
      userCount: 2,
      permissions: ["All Permissions"],
      color: "bg-red-100 text-red-800"
    },
    {
      id: 2,
      name: "Department Admin",
      description: "Administrative access to specific departments",
      userCount: 8,
      permissions: ["User Management", "Reports", "Department Settings"],
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      name: "Doctor",
      description: "Medical professional access",
      userCount: 89,
      permissions: ["Patient Records", "Prescriptions", "Appointments", "Medical Records"],
      color: "bg-green-100 text-green-800"
    },
    {
      id: 4,
      name: "Nurse",
      description: "Nursing staff access",
      userCount: 156,
      permissions: ["Patient Care", "Basic Records", "Appointments"],
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: 5,
      name: "Finance",
      description: "Financial operations access",
      userCount: 12,
      permissions: ["Billing", "Payments", "Financial Reports", "Commission"],
      color: "bg-orange-100 text-orange-800"
    },
    {
      id: 6,
      name: "Patient",
      description: "Patient portal access",
      userCount: 980,
      permissions: ["Personal Records", "Appointments", "Billing View"],
      color: "bg-gray-100 text-gray-800"
    }
  ];

  const permissionModules = [
    {
      module: "User Management",
      permissions: [
        { name: "View Users", key: "users.view" },
        { name: "Create Users", key: "users.create" },
        { name: "Edit Users", key: "users.edit" },
        { name: "Delete Users", key: "users.delete" },
        { name: "Manage Roles", key: "users.roles" }
      ]
    },
    {
      module: "Patient Management",
      permissions: [
        { name: "View Patient Records", key: "patients.view" },
        { name: "Create Patient Records", key: "patients.create" },
        { name: "Edit Patient Records", key: "patients.edit" },
        { name: "Access Medical History", key: "patients.history" },
        { name: "Manage Appointments", key: "patients.appointments" }
      ]
    },
    {
      module: "Financial Operations",
      permissions: [
        { name: "View Financial Data", key: "finance.view" },
        { name: "Process Payments", key: "finance.payments" },
        { name: "Generate Reports", key: "finance.reports" },
        { name: "Manage Commission", key: "finance.commission" },
        { name: "Access Billing", key: "finance.billing" }
      ]
    },
    {
      module: "System Administration",
      permissions: [
        { name: "System Configuration", key: "system.config" },
        { name: "Module Management", key: "system.modules" },
        { name: "Security Settings", key: "system.security" },
        { name: "Audit Logs", key: "system.audit" },
        { name: "Backup & Recovery", key: "system.backup" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Role Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">System-wide roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Custom created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permission Groups</CardTitle>
            <Lock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Permission modules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users Assigned</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Total assignments</p>
          </CardContent>
        </Card>
      </div>

      {/* Roles Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>
                Create and manage user roles with specific permissions
              </CardDescription>
            </div>
            <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="roleName">Role Name</Label>
                      <Input id="roleName" placeholder="Enter role name" />
                    </div>
                    <div>
                      <Label htmlFor="roleDescription">Description</Label>
                      <Input id="roleDescription" placeholder="Role description" />
                    </div>
                  </div>

                  <div>
                    <Label>Permissions</Label>
                    <div className="mt-2 space-y-4 max-h-60 overflow-y-auto">
                      {permissionModules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="border rounded p-3">
                          <div className="font-medium mb-2">{module.module}</div>
                          <div className="space-y-2">
                            {module.permissions.map((permission, permIndex) => (
                              <div key={permIndex} className="flex items-center space-x-2">
                                <Checkbox id={permission.key} />
                                <Label htmlFor={permission.key} className="text-sm">
                                  {permission.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Create Role</Button>
                    <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <Card key={role.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className={role.color}>{role.name}</Badge>
                      <CardTitle className="text-lg mt-2">{role.name}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Users:</span>
                      <span className="font-medium">{role.userCount}</span>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Permissions:</div>
                      <div className="space-y-1">
                        {role.permissions.slice(0, 3).map((permission, index) => (
                          <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {permission}
                          </div>
                        ))}
                        {role.permissions.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{role.permissions.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
          <CardDescription>
            Detailed view of permissions across all roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {permissionModules.map((module, moduleIndex) => (
              <div key={moduleIndex}>
                <h4 className="font-medium text-lg mb-3 flex items-center gap-2">
                  {moduleIndex === 0 && <Users className="h-4 w-4" />}
                  {moduleIndex === 1 && <FileText className="h-4 w-4" />}
                  {moduleIndex === 2 && <Database className="h-4 w-4" />}
                  {moduleIndex === 3 && <Settings className="h-4 w-4" />}
                  {module.module}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {module.permissions.map((permission, permIndex) => (
                    <div key={permIndex} className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">{permission.name}</span>
                      <Switch />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RolePermissionTab;
