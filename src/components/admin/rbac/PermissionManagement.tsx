
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lock, 
  Search, 
  Database, 
  Users, 
  FileText, 
  DollarSign, 
  Settings,
  Shield,
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

interface PermissionManagementProps {
  currentUserRole: string;
}

const PermissionManagement = ({ currentUserRole }: PermissionManagementProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const permissionCategories = [
    {
      id: 'user-management',
      name: 'User Management',
      icon: Users,
      color: 'bg-blue-100 text-blue-800',
      permissions: [
        { id: 'users.view', name: 'View Users', description: 'Can view user profiles and lists' },
        { id: 'users.create', name: 'Create Users', description: 'Can create new user accounts' },
        { id: 'users.edit', name: 'Edit Users', description: 'Can modify user information' },
        { id: 'users.delete', name: 'Delete Users', description: 'Can delete user accounts' },
        { id: 'users.roles', name: 'Manage User Roles', description: 'Can assign/remove user roles' }
      ]
    },
    {
      id: 'patient-management',
      name: 'Patient Management',
      icon: FileText,
      color: 'bg-green-100 text-green-800',
      permissions: [
        { id: 'patients.view', name: 'View Patients', description: 'Can view patient records' },
        { id: 'patients.create', name: 'Create Patients', description: 'Can register new patients' },
        { id: 'patients.edit', name: 'Edit Patients', description: 'Can modify patient information' },
        { id: 'patients.medical', name: 'Medical Records', description: 'Can access medical records' },
        { id: 'patients.history', name: 'Patient History', description: 'Can view full patient history' }
      ]
    },
    {
      id: 'financial',
      name: 'Financial Operations',
      icon: DollarSign,
      color: 'bg-orange-100 text-orange-800',
      permissions: [
        { id: 'billing.view', name: 'View Billing', description: 'Can view billing information' },
        { id: 'billing.create', name: 'Create Bills', description: 'Can create new bills' },
        { id: 'billing.process', name: 'Process Payments', description: 'Can process payments' },
        { id: 'finance.reports', name: 'Financial Reports', description: 'Can generate financial reports' },
        { id: 'finance.commission', name: 'Commission Management', description: 'Can manage commissions' }
      ]
    },
    {
      id: 'system-admin',
      name: 'System Administration',
      icon: Settings,
      color: 'bg-red-100 text-red-800',
      permissions: [
        { id: 'system.config', name: 'System Configuration', description: 'Can modify system settings' },
        { id: 'system.modules', name: 'Module Management', description: 'Can manage system modules' },
        { id: 'system.security', name: 'Security Settings', description: 'Can modify security settings' },
        { id: 'system.audit', name: 'Audit Logs', description: 'Can access audit logs' },
        { id: 'system.backup', name: 'Backup & Recovery', description: 'Can manage backups' }
      ]
    }
  ];

  const rolePermissions = {
    'Super Administrator': ['*'],
    'Department Administrator': ['users.view', 'users.edit', 'patients.view', 'patients.edit', 'billing.view'],
    'Module Administrator': ['users.view', 'patients.view', 'billing.view'],
    'Medical Staff': ['patients.view', 'patients.create', 'patients.edit', 'patients.medical', 'patients.history'],
    'Finance Staff': ['billing.view', 'billing.create', 'billing.process', 'finance.reports', 'finance.commission']
  };

  return (
    <div className="space-y-6">
      {/* Permission Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Permissions</CardTitle>
            <Lock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {permissionCategories.reduce((sum, cat) => sum + cat.permissions.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">System permissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Database className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissionCategories.length}</div>
            <p className="text-xs text-muted-foreground">Permission groups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Permissions</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {permissionCategories.reduce((sum, cat) => sum + cat.permissions.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Currently enabled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Role Assignments</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(rolePermissions).length}</div>
            <p className="text-xs text-muted-foreground">Roles with permissions</p>
          </CardContent>
        </Card>
      </div>

      {/* Permission Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Permission Management</CardTitle>
              <CardDescription>
                Manage system permissions and their assignments to roles
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search permissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              {currentUserRole === "super-admin" && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Permission
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="by-category" className="space-y-4">
            <TabsList>
              <TabsTrigger value="by-category">By Category</TabsTrigger>
              <TabsTrigger value="by-role">By Role</TabsTrigger>
            </TabsList>

            <TabsContent value="by-category" className="space-y-6">
              {permissionCategories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <Card key={category.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <CategoryIcon className="h-5 w-5" />
                        {category.name}
                        <Badge className={category.color}>
                          {category.permissions.length} permissions
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.permissions.map((permission) => (
                          <div key={permission.id} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex-1">
                              <h4 className="font-medium">{permission.name}</h4>
                              <p className="text-sm text-muted-foreground">{permission.description}</p>
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                                {permission.id}
                              </code>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch defaultChecked />
                              {currentUserRole === "super-admin" && (
                                <div className="flex gap-1">
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-600">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="by-role" className="space-y-4">
              {Object.entries(rolePermissions).map(([role, permissions]) => (
                <Card key={role}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      {role}
                      <Badge variant="outline">
                        {permissions.includes('*') ? 'All Permissions' : `${permissions.length} permissions`}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {permissions.includes('*') ? (
                        <Badge className="bg-red-100 text-red-800">Full System Access</Badge>
                      ) : (
                        permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionManagement;
