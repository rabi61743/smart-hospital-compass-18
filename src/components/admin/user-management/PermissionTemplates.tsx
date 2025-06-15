import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  File, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  User, 
  Shield, 
  Stethoscope,
  DollarSign,
  Settings
} from "lucide-react";

interface PermissionTemplate {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  category: 'medical' | 'administrative' | 'financial' | 'technical';
  isCustom: boolean;
  usageCount: number;
  icon: any;
}

interface PermissionTemplatesProps {
  onApplyTemplate: (permissions: string[]) => void;
}

const PermissionTemplates = ({ onApplyTemplate }: PermissionTemplatesProps) => {
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const templates: PermissionTemplate[] = [
    {
      id: 'doctor-standard',
      name: 'Standard Doctor',
      description: 'Basic permissions for medical staff including patient records and appointments',
      permissions: ['patients.view', 'patients.edit', 'patients.medical', 'patients.history', 'patients.create'],
      category: 'medical',
      isCustom: false,
      usageCount: 89,
      icon: Stethoscope
    },
    {
      id: 'nurse-standard',
      name: 'Standard Nurse',
      description: 'Nursing staff permissions for patient care and basic record access',
      permissions: ['patients.view', 'patients.edit', 'patients.medical'],
      category: 'medical',
      isCustom: false,
      usageCount: 156,
      icon: User
    },
    {
      id: 'admin-department',
      name: 'Department Administrator',
      description: 'Administrative permissions for department management',
      permissions: ['users.view', 'users.edit', 'reports.view', 'patients.view'],
      category: 'administrative',
      isCustom: false,
      usageCount: 23,
      icon: Shield
    },
    {
      id: 'finance-manager',
      name: 'Finance Manager',
      description: 'Complete financial operations access including billing and commission management',
      permissions: ['billing.view', 'billing.create', 'billing.process', 'finance.reports', 'finance.commission'],
      category: 'financial',
      isCustom: false,
      usageCount: 12,
      icon: DollarSign
    },
    {
      id: 'system-admin',
      name: 'System Administrator',
      description: 'Full system access for technical administration',
      permissions: ['system.config', 'system.modules', 'system.security', 'system.audit', 'users.permissions'],
      category: 'technical',
      isCustom: false,
      usageCount: 5,
      icon: Settings
    },
    {
      id: 'custom-intern',
      name: 'Medical Intern',
      description: 'Limited access for medical interns with supervision requirements',
      permissions: ['patients.view', 'patients.medical'],
      category: 'medical',
      isCustom: true,
      usageCount: 34,
      icon: User
    }
  ];

  const availablePermissions = [
    { id: 'users.view', name: 'View Users' },
    { id: 'users.create', name: 'Create Users' },
    { id: 'users.edit', name: 'Edit Users' },
    { id: 'users.delete', name: 'Delete Users' },
    { id: 'users.permissions', name: 'Manage Permissions' },
    { id: 'patients.view', name: 'View Patients' },
    { id: 'patients.create', name: 'Register Patients' },
    { id: 'patients.edit', name: 'Edit Patient Data' },
    { id: 'patients.medical', name: 'Medical Records' },
    { id: 'patients.history', name: 'Patient History' },
    { id: 'billing.view', name: 'View Billing' },
    { id: 'billing.create', name: 'Create Bills' },
    { id: 'billing.process', name: 'Process Payments' },
    { id: 'finance.reports', name: 'Financial Reports' },
    { id: 'finance.commission', name: 'Commission Management' },
    { id: 'system.config', name: 'System Configuration' },
    { id: 'system.modules', name: 'Module Management' },
    { id: 'system.security', name: 'Security Settings' },
    { id: 'system.audit', name: 'Audit Logs' },
    { id: 'reports.view', name: 'View Reports' },
    { id: 'reports.create', name: 'Create Reports' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical': return 'bg-green-100 text-green-800';
      case 'administrative': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-orange-100 text-orange-800';
      case 'technical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(p => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Template Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['medical', 'administrative', 'financial', 'technical'].map((category) => (
          <Card key={category}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium capitalize">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {templates.filter(t => t.category === category).length}
              </div>
              <p className="text-xs text-muted-foreground">Templates available</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Permission Templates */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Permission Templates</CardTitle>
              <CardDescription>
                Pre-configured permission sets for common roles
              </CardDescription>
            </div>
            <Dialog open={isCreateTemplateOpen} onOpenChange={setIsCreateTemplateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Permission Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="templateName">Template Name</Label>
                      <Input id="templateName" placeholder="Enter template name" />
                    </div>
                    <div>
                      <Label htmlFor="templateCategory">Category</Label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="medical">Medical</option>
                        <option value="administrative">Administrative</option>
                        <option value="financial">Financial</option>
                        <option value="technical">Technical</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="templateDescription">Description</Label>
                    <Textarea id="templateDescription" placeholder="Template description" />
                  </div>

                  <div>
                    <Label>Permissions</Label>
                    <div className="mt-2 space-y-2 max-h-60 overflow-y-auto border rounded p-3">
                      {availablePermissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={selectedPermissions.includes(permission.id)}
                            onCheckedChange={() => handlePermissionToggle(permission.id)}
                          />
                          <Label htmlFor={permission.id} className="text-sm">
                            {permission.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Create Template</Button>
                    <Button variant="outline" onClick={() => setIsCreateTemplateOpen(false)}>
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
            {templates.map((template) => {
              const TemplateIcon = template.icon;
              return (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <TemplateIcon className="h-5 w-5" />
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge className={getCategoryColor(template.category)}>
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                      {template.isCustom && (
                        <Badge variant="outline">Custom</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      
                      <div className="text-sm">
                        <div className="font-medium mb-1">Permissions ({template.permissions.length})</div>
                        <div className="space-y-1">
                          {template.permissions.slice(0, 3).map((permissionId) => {
                            const permission = availablePermissions.find(p => p.id === permissionId);
                            return (
                              <div key={permissionId} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {permission?.name || permissionId}
                              </div>
                            );
                          })}
                          {template.permissions.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{template.permissions.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Used by {template.usageCount} users
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => onApplyTemplate(template.permissions)}
                        >
                          <File className="h-3 w-3 mr-1" />
                          Apply
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-3 w-3" />
                        </Button>
                        {template.isCustom && (
                          <>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionTemplates;
