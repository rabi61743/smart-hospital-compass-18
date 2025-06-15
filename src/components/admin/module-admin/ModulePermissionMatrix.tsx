
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface ModuleAdmin {
  id: number;
  name: string;
  email: string;
  department: string;
  modules: string[];
  permissions: Record<string, string[]>;
  lastActive: string;
  status: string;
}

interface ModulePermissionMatrixProps {
  currentDepartment: any;
  moduleAdmins: ModuleAdmin[];
}

const ModulePermissionMatrix = ({ currentDepartment, moduleAdmins }: ModulePermissionMatrixProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Module Permission Matrix</CardTitle>
        <CardDescription>
          Detailed view of permissions for {currentDepartment?.name || 'selected department'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Module</th>
                <th className="text-center p-3 font-medium">Admin</th>
                <th className="text-center p-3 font-medium">Users</th>
                <th className="text-center p-3 font-medium">Critical</th>
                <th className="text-center p-3 font-medium">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {currentDepartment?.modules.map((module: any, index: number) => {
                const moduleAdmin = moduleAdmins.find(admin => 
                  admin.modules.includes(module.name)
                );
                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium">{module.name}</div>
                    </td>
                    <td className="p-3 text-center">
                      {moduleAdmin ? (
                        <Badge variant="secondary" className="text-xs">
                          {moduleAdmin.name}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">Unassigned</span>
                      )}
                    </td>
                    <td className="p-3 text-center">{module.users}</td>
                    <td className="p-3 text-center">
                      {module.critical ? (
                        <AlertTriangle className="h-4 w-4 text-orange-500 mx-auto" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {moduleAdmin?.permissions[module.name] ? (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {moduleAdmin.permissions[module.name].map((perm, permIndex) => (
                            <Badge key={permIndex} variant="outline" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">None</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulePermissionMatrix;
