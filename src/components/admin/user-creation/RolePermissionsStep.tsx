
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserFormData } from '../EnhancedAddUserDialog';

interface RolePermissionsStepProps {
  formData: UserFormData;
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
  errors: Partial<UserFormData>;
}

const RolePermissionsStep = ({ formData, setFormData, errors }: RolePermissionsStepProps) => {
  const roles = [
    { value: 'admin', label: 'Admin', description: 'Full system access' },
    { value: 'doctor', label: 'Doctor', description: 'Medical records and patient care' },
    { value: 'nurse', label: 'Nurse', description: 'Patient care and medical records' },
    { value: 'pharmacist', label: 'Pharmacist', description: 'Pharmacy and inventory' },
    { value: 'finance', label: 'Finance', description: 'Billing and financial reports' },
    { value: 'reception', label: 'Reception', description: 'Patient registration and appointments' }
  ];

  const departments = [
    'Administration', 'Cardiology', 'Emergency', 'Pharmacy', 'Finance', 'Radiology', 'Laboratory', 'ICU'
  ];

  const availablePermissions = [
    'Patient Records', 'Medical History', 'Prescriptions', 'Appointments', 'Billing', 
    'Reports', 'User Management', 'System Settings', 'Inventory', 'Lab Results'
  ];

  const handleRoleChange = (roleValue: string) => {
    setFormData(prev => ({ ...prev, role: roleValue }));
    
    // Auto-assign permissions based on role
    const rolePermissions: { [key: string]: string[] } = {
      admin: ['Patient Records', 'Medical History', 'Prescriptions', 'Appointments', 'Billing', 'Reports', 'User Management', 'System Settings'],
      doctor: ['Patient Records', 'Medical History', 'Prescriptions', 'Appointments', 'Lab Results'],
      nurse: ['Patient Records', 'Medical History', 'Appointments', 'Lab Results'],
      pharmacist: ['Prescriptions', 'Inventory', 'Patient Records'],
      finance: ['Billing', 'Reports', 'Patient Records'],
      reception: ['Appointments', 'Patient Records']
    };

    setFormData(prev => ({ 
      ...prev, 
      permissions: rolePermissions[roleValue] || []
    }));
  };

  const handlePermissionToggle = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-700">Role *</Label>
          <Select value={formData.role} onValueChange={handleRoleChange}>
            <SelectTrigger className={`mt-1 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role.value} value={role.value}>
                  <div>
                    <div className="font-medium">{role.label}</div>
                    <div className="text-xs text-gray-500">{role.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role}</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Department *</Label>
          <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
            <SelectTrigger className={`mt-1 ${errors.department ? 'border-red-500' : 'border-gray-300'}`}>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.department && (
            <p className="text-red-500 text-xs mt-1">{errors.department}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
          Job Title *
        </Label>
        <Input
          id="jobTitle"
          value={formData.jobTitle}
          onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
          placeholder="Enter job title"
          className={`mt-1 ${errors.jobTitle ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
        )}
      </div>

      <div>
        <Label htmlFor="reportingManager" className="text-sm font-medium text-gray-700">
          Reporting Manager
        </Label>
        <Input
          id="reportingManager"
          value={formData.reportingManager}
          onChange={(e) => setFormData(prev => ({ ...prev, reportingManager: e.target.value }))}
          placeholder="Enter reporting manager"
          className="mt-1 border-gray-300"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Permissions
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {availablePermissions.map(permission => (
            <div key={permission} className="flex items-center space-x-2">
              <Checkbox
                id={permission}
                checked={formData.permissions.includes(permission)}
                onCheckedChange={() => handlePermissionToggle(permission)}
              />
              <Label htmlFor={permission} className="text-sm text-gray-700">
                {permission}
              </Label>
            </div>
          ))}
        </div>
        {formData.permissions.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-2">Selected permissions:</p>
            <div className="flex flex-wrap gap-1">
              {formData.permissions.map(permission => (
                <Badge key={permission} variant="secondary" className="text-xs">
                  {permission}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolePermissionsStep;
