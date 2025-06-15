
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, Edit, Settings } from "lucide-react";

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

interface ModuleAdminListProps {
  moduleAdmins: ModuleAdmin[];
  departments: any;
}

const ModuleAdminList = ({ moduleAdmins, departments }: ModuleAdminListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Module Administrators</CardTitle>
        <CardDescription>
          Current module administrators and their permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {moduleAdmins.map((admin) => (
            <div key={admin.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{admin.name}</h3>
                      <Badge className={admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {admin.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{admin.email}</span>
                    </div>
                    
                    <div className="mb-3">
                      <span className="text-sm text-muted-foreground">Department: </span>
                      <Badge variant="outline">
                        {departments[admin.department as keyof typeof departments]?.name || admin.department}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <span className="text-sm text-muted-foreground mb-2 block">Managed Modules:</span>
                      <div className="flex flex-wrap gap-2">
                        {admin.modules.map((module, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {module}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Last Active:</span>
                        <div className="font-medium">{admin.lastActive}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Permission Groups:</span>
                        <div className="font-medium">
                          {Object.keys(admin.permissions).length} modules configured
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Permissions
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleAdminList;
