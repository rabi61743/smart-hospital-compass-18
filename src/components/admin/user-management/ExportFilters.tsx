
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface ExportFiltersProps {
  exportFormat: string;
  setExportFormat: (format: string) => void;
  exportFilters: {
    roles: string[];
    status: string;
    departments: string[];
    includePermissions: boolean;
    includeLastLogin: boolean;
  };
  setExportFilters: (filters: any) => void;
}

const ExportFilters = ({ 
  exportFormat, 
  setExportFormat, 
  exportFilters, 
  setExportFilters 
}: ExportFiltersProps) => {
  const handleRoleFilter = (role: string, checked: boolean) => {
    setExportFilters((prev: any) => ({
      ...prev,
      roles: checked 
        ? [...prev.roles, role]
        : prev.roles.filter((r: string) => r !== role)
    }));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Export Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Filter by Status</label>
            <Select value={exportFilters.status} onValueChange={(value) => 
              setExportFilters((prev: any) => ({ ...prev, status: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Filter by Role</label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {['Admin', 'Doctor', 'Nurse', 'Pharmacist', 'Finance'].map(role => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox 
                    id={role}
                    checked={exportFilters.roles.includes(role)}
                    onCheckedChange={(checked) => handleRoleFilter(role, checked as boolean)}
                  />
                  <label htmlFor={role} className="text-sm">{role}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <label className="text-sm font-medium mb-3 block">Include Additional Data</label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="permissions"
              checked={exportFilters.includePermissions}
              onCheckedChange={(checked) => 
                setExportFilters((prev: any) => ({ ...prev, includePermissions: checked as boolean }))
              }
            />
            <label htmlFor="permissions" className="text-sm">User Permissions</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="lastLogin"
              checked={exportFilters.includeLastLogin}
              onCheckedChange={(checked) => 
                setExportFilters((prev: any) => ({ ...prev, includeLastLogin: checked as boolean }))
              }
            />
            <label htmlFor="lastLogin" className="text-sm">Last Login Information</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportFilters;
