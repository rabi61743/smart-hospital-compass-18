
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Shield, 
  User, 
  Settings, 
  Database, 
  FileText, 
  DollarSign,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertTriangle
} from "lucide-react";

interface UserPermission {
  id: string;
  name: string;
  description: string;
  category: string;
  level: 'read' | 'write' | 'admin';
  critical: boolean;
}

interface UserPermissionManagerProps {
  userId?: number;
  userPermissions: string[];
  onPermissionsChange: (permissions: string[]) => void;
  userRole?: string;
}

const UserPermissionManager = ({ 
  userId, 
  userPermissions, 
  onPermissionsChange,
  userRole 
}: UserPermissionManagerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCustomPermissionOpen, setIsCustomPermissionOpen] = useState(false);

  const permissionCategories = [
    {
      id: 'user-management',
      name: 'User Management',
      icon: User,
      color: 'bg-blue-100 text-blue-800',
      description: 'User account and profile management'
    },
    {
      id: 'patient-data',
      name: 'Patient Data',
      icon: FileText,
      color: 'bg-green-100 text-green-800',
      description: 'Patient records and medical information'
    },
    {
      id: 'financial',
      name: 'Financial Operations',
      icon: DollarSign,
      color: 'bg-orange-100 text-orange-800',
      description: 'Billing, payments, and financial data'
    },
    {
      id: 'system-admin',
      name: 'System Administration',
      icon: Settings,
      color: 'bg-red-100 text-red-800',
      description: 'System configuration and administration'
    },
    {
      id: 'reporting',
      name: 'Reports & Analytics',
      icon: Database,
      color: 'bg-purple-100 text-purple-800',
      description: 'Data analysis and reporting capabilities'
    }
  ];

  const availablePermissions: UserPermission[] = [
    // User Management
    { id: 'users.view', name: 'View Users', description: 'Can view user profiles and lists', category: 'user-management', level: 'read', critical: false },
    { id: 'users.create', name: 'Create Users', description: 'Can create new user accounts', category: 'user-management', level: 'write', critical: true },
    { id: 'users.edit', name: 'Edit Users', description: 'Can modify user information', category: 'user-management', level: 'write', critical: true },
    { id: 'users.delete', name: 'Delete Users', description: 'Can delete user accounts', category: 'user-management', level: 'admin', critical: true },
    { id: 'users.permissions', name: 'Manage Permissions', description: 'Can assign permissions to users', category: 'user-management', level: 'admin', critical: true },
    
    // Patient Data
    { id: 'patients.view', name: 'View Patients', description: 'Can view patient records', category: 'patient-data', level: 'read', critical: false },
    { id: 'patients.create', name: 'Register Patients', description: 'Can register new patients', category: 'patient-data', level: 'write', critical: false },
    { id: 'patients.edit', name: 'Edit Patient Data', description: 'Can modify patient information', category: 'patient-data', level: 'write', critical: true },
    { id: 'patients.medical', name: 'Medical Records', description: 'Can access medical records', category: 'patient-data', level: 'read', critical: true },
    { id: 'patients.history', name: 'Patient History', description: 'Can view complete patient history', category: 'patient-data', level: 'read', critical: true },
    
    // Financial
    { id: 'billing.view', name: 'View Billing', description: 'Can view billing information', category: 'financial', level: 'read', critical: false },
    { id: 'billing.create', name: 'Create Bills', description: 'Can create new bills', category: 'financial', level: 'write', critical: false },
    { id: 'billing.process', name: 'Process Payments', description: 'Can process payments', category: 'financial', level: 'write', critical: true },
    { id: 'finance.reports', name: 'Financial Reports', description: 'Can access financial reports', category: 'financial', level: 'read', critical: false },
    { id: 'finance.commission', name: 'Commission Management', description: 'Can manage commissions', category: 'financial', level: 'admin', critical: true },
    
    // System Admin
    { id: 'system.config', name: 'System Configuration', description: 'Can modify system settings', category: 'system-admin', level: 'admin', critical: true },
    { id: 'system.modules', name: 'Module Management', description: 'Can manage system modules', category: 'system-admin', level: 'admin', critical: true },
    { id: 'system.security', name: 'Security Settings', description: 'Can modify security settings', category: 'system-admin', level: 'admin', critical: true },
    { id: 'system.audit', name: 'Audit Logs', description: 'Can access audit logs', category: 'system-admin', level: 'read', critical: false },
    
    // Reporting
    { id: 'reports.view', name: 'View Reports', description: 'Can view standard reports', category: 'reporting', level: 'read', critical: false },
    { id: 'reports.create', name: 'Create Reports', description: 'Can create custom reports', category: 'reporting', level: 'write', critical: false },
    { id: 'reports.export', name: 'Export Data', description: 'Can export report data', category: 'reporting', level: 'write', critical: false },
    { id: 'analytics.advanced', name: 'Advanced Analytics', description: 'Can access advanced analytics', category: 'reporting', level: 'read', critical: false }
  ];

  const handlePermissionToggle = (permissionId: string) => {
    const updatedPermissions = userPermissions.includes(permissionId)
      ? userPermissions.filter(p => p !== permissionId)
      : [...userPermissions, permissionId];
    
    onPermissionsChange(updatedPermissions);
  };

  const handleCategoryToggle = (category: string) => {
    const categoryPermissions = availablePermissions
      .filter(p => p.category === category)
      .map(p => p.id);
    
    const allCategoryPermissionsSelected = categoryPermissions.every(p => 
      userPermissions.includes(p)
    );

    if (allCategoryPermissionsSelected) {
      // Remove all category permissions
      const updatedPermissions = userPermissions.filter(p => !categoryPermissions.includes(p));
      onPermissionsChange(updatedPermissions);
    } else {
      // Add all category permissions
      const updatedPermissions = [...new Set([...userPermissions, ...categoryPermissions])];
      onPermissionsChange(updatedPermissions);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'read': return 'bg-green-100 text-green-800';
      case 'write': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPermissions = availablePermissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || permission.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Permission Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Permissions</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userPermissions.length}</div>
            <p className="text-xs text-muted-foreground">Assigned to user</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Access</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userPermissions.filter(p => 
                availablePermissions.find(ap => ap.id === p)?.critical
              ).length}
            </div>
            <p className="text-xs text-muted-foreground">Critical permissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Level</CardTitle>
            <Settings className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userPermissions.filter(p => 
                availablePermissions.find(ap => ap.id === p)?.level === 'admin'
              ).length}
            </div>
            <p className="text-xs text-muted-foreground">Admin permissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {availablePermissions.length - userPermissions.length}
            </div>
            <p className="text-xs text-muted-foreground">Not assigned</p>
          </CardContent>
        </Card>
      </div>

      {/* Permission Management Interface */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>User Permission Management</CardTitle>
              <CardDescription>
                Manage granular permissions for individual users
              </CardDescription>
            </div>
            <Dialog open={isCustomPermissionOpen} onOpenChange={setIsCustomPermissionOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Custom Permission
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Custom Permission</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="permissionName">Permission Name</Label>
                    <Input id="permissionName" placeholder="Enter permission name" />
                  </div>
                  <div>
                    <Label htmlFor="permissionDesc">Description</Label>
                    <Input id="permissionDesc" placeholder="Permission description" />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Create Permission</Button>
                    <Button variant="outline" onClick={() => setIsCustomPermissionOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Permission Categories */}
          <Tabs defaultValue="by-category" className="space-y-4">
            <TabsList>
              <TabsTrigger value="by-category">By Category</TabsTrigger>
              <TabsTrigger value="by-level">By Level</TabsTrigger>
              <TabsTrigger value="assigned">Assigned Only</TabsTrigger>
            </TabsList>

            <TabsContent value="by-category" className="space-y-6">
              {permissionCategories.map((category) => {
                const CategoryIcon = category.icon;
                const categoryPermissions = availablePermissions.filter(p => p.category === category.id);
                const assignedCount = categoryPermissions.filter(p => userPermissions.includes(p.id)).length;
                const allSelected = categoryPermissions.length === assignedCount;

                return (
                  <Card key={category.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CategoryIcon className="h-5 w-5" />
                          <div>
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                          </div>
                          <Badge className={category.color}>
                            {assignedCount}/{categoryPermissions.length}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`category-${category.id}`} className="text-sm">
                            Select All
                          </Label>
                          <Switch
                            id={`category-${category.id}`}
                            checked={allSelected}
                            onCheckedChange={() => handleCategoryToggle(category.id)}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryPermissions.map((permission) => (
                          <div key={permission.id} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-sm">{permission.name}</h4>
                                <Badge className={getLevelColor(permission.level)}>
                                  {permission.level}
                                </Badge>
                                {permission.critical && (
                                  <AlertTriangle className="h-3 w-3 text-orange-500" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{permission.description}</p>
                            </div>
                            <Switch
                              checked={userPermissions.includes(permission.id)}
                              onCheckedChange={() => handlePermissionToggle(permission.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="by-level" className="space-y-4">
              {['read', 'write', 'admin'].map((level) => (
                <Card key={level}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge className={getLevelColor(level)}>{level} Level</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {availablePermissions
                        .filter(p => p.level === level)
                        .map((permission) => (
                          <div key={permission.id} className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <h4 className="font-medium text-sm">{permission.name}</h4>
                              <p className="text-xs text-muted-foreground">{permission.description}</p>
                            </div>
                            <Switch
                              checked={userPermissions.includes(permission.id)}
                              onCheckedChange={() => handlePermissionToggle(permission.id)}
                            />
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="assigned" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Currently Assigned Permissions</CardTitle>
                </CardHeader>
                <CardContent>
                  {userPermissions.length === 0 ? (
                    <p className="text-muted-foreground">No permissions assigned</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {userPermissions.map((permissionId) => {
                        const permission = availablePermissions.find(p => p.id === permissionId);
                        if (!permission) return null;
                        
                        return (
                          <div key={permission.id} className="flex items-center justify-between p-3 border rounded bg-green-50">
                            <div>
                              <h4 className="font-medium text-sm">{permission.name}</h4>
                              <p className="text-xs text-muted-foreground">{permission.description}</p>
                              <div className="flex gap-1 mt-1">
                                <Badge className={getLevelColor(permission.level)}>
                                  {permission.level}
                                </Badge>
                                {permission.critical && (
                                  <Badge variant="outline" className="text-orange-600">
                                    Critical
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handlePermissionToggle(permission.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPermissionManager;
