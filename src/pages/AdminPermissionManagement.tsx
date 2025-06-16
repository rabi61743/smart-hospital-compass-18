
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Shield, 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff
} from "lucide-react";
import { NavigationItem, UserRole, PermissionMatrix } from "@/types/navigation";
import { NAVIGATION_SCHEMA, DEFAULT_ROLES } from "@/config/navigationSchema";

interface PermissionTreeProps {
  items: NavigationItem[];
  selectedRole: string;
  permissionMatrix: PermissionMatrix;
  onPermissionChange: (roleId: string, itemId: string, hasAccess: boolean) => void;
  level?: number;
}

const PermissionTree: React.FC<PermissionTreeProps> = ({
  items,
  selectedRole,
  permissionMatrix,
  onPermissionChange,
  level = 0
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const hasPermission = (itemId: string) => {
    const rolePerms = permissionMatrix[selectedRole];
    if (!rolePerms) return false;
    return rolePerms.navigationItems.includes('*') || rolePerms.navigationItems.includes(itemId);
  };

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.has(item.id);
        const indentClass = level > 0 ? `ml-${level * 4}` : '';
        
        return (
          <div key={item.id} className={indentClass}>
            <div className="flex items-center justify-between p-2 rounded border hover:bg-gray-50">
              <div className="flex items-center space-x-2 flex-1">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(item.id)}
                    className="p-1 h-6 w-6"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                )}
                {!hasChildren && <div className="w-6" />}
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{item.label}</span>
                    {item.path && (
                      <Badge variant="outline" className="text-xs">
                        {item.path}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">ID: {item.id}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={hasPermission(item.id)}
                  onCheckedChange={(checked) => onPermissionChange(selectedRole, item.id, checked)}
                />
              </div>
            </div>
            
            {hasChildren && isExpanded && (
              <PermissionTree
                items={item.children!}
                selectedRole={selectedRole}
                permissionMatrix={permissionMatrix}
                onPermissionChange={onPermissionChange}
                level={level + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const AdminPermissionManagement: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [roles, setRoles] = useState(DEFAULT_ROLES);
  const [permissionMatrix, setPermissionMatrix] = useState<PermissionMatrix>({
    "super-admin": {
      navigationItems: ["*"],
      permissions: ["*"],
      lastUpdated: new Date(),
      updatedBy: "system"
    },
    "admin": {
      navigationItems: ["dashboard", "clinical", "financial", "operations", "administration"],
      permissions: ["admin.*", "users.*", "billing.*", "reports.*"],
      lastUpdated: new Date(),
      updatedBy: "system"
    },
    "doctor": {
      navigationItems: ["dashboard", "clinical", "clinical.doctor", "clinical.patients"],
      permissions: ["clinical.*", "patients.*", "medical-records.*"],
      lastUpdated: new Date(),
      updatedBy: "system"
    },
    "finance": {
      navigationItems: ["dashboard", "financial"],
      permissions: ["finance.*", "billing.*", "payroll.*"],
      lastUpdated: new Date(),
      updatedBy: "system"
    }
  });

  const handlePermissionChange = (roleId: string, itemId: string, hasAccess: boolean) => {
    setPermissionMatrix(prev => {
      const newMatrix = { ...prev };
      if (!newMatrix[roleId]) {
        newMatrix[roleId] = {
          navigationItems: [],
          permissions: [],
          lastUpdated: new Date(),
          updatedBy: "admin"
        };
      }
      
      const currentItems = new Set(newMatrix[roleId].navigationItems);
      if (hasAccess) {
        currentItems.add(itemId);
      } else {
        currentItems.delete(itemId);
      }
      
      newMatrix[roleId] = {
        ...newMatrix[roleId],
        navigationItems: Array.from(currentItems),
        lastUpdated: new Date(),
        updatedBy: "admin"
      };
      
      return newMatrix;
    });
  };

  const savePermissions = () => {
    // In real app, this would save to database
    console.log('Saving permissions:', permissionMatrix);
    // Show success message
  };

  const resetPermissions = () => {
    // Reset to defaults
    setPermissionMatrix({
      "super-admin": {
        navigationItems: ["*"],
        permissions: ["*"],
        lastUpdated: new Date(),
        updatedBy: "system"
      },
      "admin": {
        navigationItems: ["dashboard", "clinical", "financial", "operations", "administration"],
        permissions: ["admin.*", "users.*", "billing.*", "reports.*"],
        lastUpdated: new Date(),
        updatedBy: "system"
      },
      "doctor": {
        navigationItems: ["dashboard", "clinical"],
        permissions: ["clinical.*", "patients.*"],
        lastUpdated: new Date(),
        updatedBy: "system"
      }
    });
  };

  const filteredNavigationItems = NAVIGATION_SCHEMA.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Permission Management</h1>
          <p className="text-gray-600">Configure role-based access control for the navigation system</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={resetPermissions} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={savePermissions}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="permissions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="permissions">Navigation Permissions</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="permissions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Role Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Role</CardTitle>
                <CardDescription>Choose a role to manage permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {roles.map((role) => (
                    <Button
                      key={role.id}
                      variant={selectedRole === role.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {role.displayName}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Permission Tree */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">
                      Navigation Permissions for {roles.find(r => r.id === selectedRole)?.displayName}
                    </CardTitle>
                    <CardDescription>
                      Configure which navigation items this role can access
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search navigation items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <PermissionTree
                    items={filteredNavigationItems}
                    selectedRole={selectedRole}
                    permissionMatrix={permissionMatrix}
                    onPermissionChange={handlePermissionChange}
                  />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>Create and manage user roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h4 className="font-medium">{role.displayName}</h4>
                      <p className="text-sm text-gray-500">{role.description}</p>
                      <div className="flex space-x-1 mt-2">
                        {role.permissions.slice(0, 3).map((perm) => (
                          <Badge key={perm} variant="outline" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>Preview how the navigation will look for each role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Navigation Preview</h3>
                <p className="text-gray-600 mb-4">
                  This would show a live preview of the navigation for the selected role
                </p>
                <Button>
                  <Eye className="h-4 w-4 mr-2" />
                  Open Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPermissionManagement;
