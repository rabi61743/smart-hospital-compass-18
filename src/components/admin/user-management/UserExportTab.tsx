
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ExportFilters from './ExportFilters';

interface UserExportTabProps {
  users: any[];
}

interface ExportFilters {
  roles: string[];
  status: string;
  departments: string[];
  includePermissions: boolean;
  includeLastLogin: boolean;
}

const UserExportTab = ({ users }: UserExportTabProps) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportFilters, setExportFilters] = useState<ExportFilters>({
    roles: [],
    status: 'all',
    departments: [],
    includePermissions: true,
    includeLastLogin: true
  });
  const { toast } = useToast();

  const handleExport = () => {
    const filteredUsers = users.filter(user => {
      const roleMatch = exportFilters.roles.length === 0 || exportFilters.roles.includes(user.role);
      const statusMatch = exportFilters.status === 'all' || user.status.toLowerCase() === exportFilters.status;
      return roleMatch && statusMatch;
    });

    // Create CSV content
    const headers = [
      'Name', 'Email', 'Role', 'Department', 'Status',
      ...(exportFilters.includePermissions ? ['Permissions'] : []),
      ...(exportFilters.includeLastLogin ? ['Last Login'] : [])
    ];

    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.department,
        user.status,
        ...(exportFilters.includePermissions ? [user.permissions.join(';')] : []),
        ...(exportFilters.includeLastLogin ? [user.lastLogin] : [])
      ].join(','))
    ].join('\n');

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `users-export-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Completed",
      description: `Successfully exported ${filteredUsers.length} users to ${exportFormat.toUpperCase()}.`
    });
  };

  const getFilteredUsersCount = () => {
    return users.filter(user => {
      const roleMatch = exportFilters.roles.length === 0 || exportFilters.roles.includes(user.role);
      const statusMatch = exportFilters.status === 'all' || user.status.toLowerCase() === exportFilters.status;
      return roleMatch && statusMatch;
    }).length;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Export User Data</CardTitle>
        <CardDescription>
          Export user data with custom filters and formatting options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ExportFilters
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
          exportFilters={exportFilters}
          setExportFilters={setExportFilters}
        />

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="font-medium">
              {getFilteredUsersCount()} users will be exported
            </span>
          </div>
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserExportTab;
