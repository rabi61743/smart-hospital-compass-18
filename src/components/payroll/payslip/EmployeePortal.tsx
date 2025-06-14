
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, Eye, Download, Bell, Settings } from "lucide-react";
import { Payslip } from '@/types/payslip';

interface EmployeePortalProps {
  payslips: Payslip[];
}

const EmployeePortal = ({ payslips }: EmployeePortalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Group payslips by employee
  const employeePayslips = payslips.reduce((acc, payslip) => {
    const employeeId = payslip.employeeId;
    if (!acc[employeeId]) {
      acc[employeeId] = {
        employee: payslip.employee,
        payslips: [],
        lastLogin: null,
        totalViewed: 0,
        totalDownloaded: 0,
      };
    }
    acc[employeeId].payslips.push(payslip);
    if (payslip.status === 'viewed') acc[employeeId].totalViewed++;
    if (payslip.status === 'downloaded') acc[employeeId].totalDownloaded++;
    return acc;
  }, {} as Record<string, any>);

  const filteredEmployees = Object.values(employeePayslips).filter((emp: any) =>
    emp.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAccessStatusColor = (payslips: Payslip[]) => {
    const hasViewed = payslips.some(p => p.status === 'viewed' || p.status === 'downloaded');
    return hasViewed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getAccessStatus = (payslips: Payslip[]) => {
    const hasViewed = payslips.some(p => p.status === 'viewed' || p.status === 'downloaded');
    return hasViewed ? 'Active' : 'Not Accessed';
  };

  return (
    <div className="space-y-6">
      {/* Portal Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-2xl font-bold">{Object.keys(employeePayslips).length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {Object.values(employeePayslips).filter((emp: any) => 
                  emp.payslips.some((p: Payslip) => p.status === 'viewed' || p.status === 'downloaded')
                ).length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold text-blue-600">
                {payslips.filter(p => p.status === 'viewed').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Downloads</p>
              <p className="text-2xl font-bold text-purple-600">
                {payslips.filter(p => p.status === 'downloaded').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Portal Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Employee Portal Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Send Notifications
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Portal Settings
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Available Payslips</TableHead>
                  <TableHead>Viewed</TableHead>
                  <TableHead>Downloaded</TableHead>
                  <TableHead>Access Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((empData: any) => (
                  <TableRow key={empData.employee.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{empData.employee.name}</p>
                        <p className="text-sm text-muted-foreground">{empData.employee.position}</p>
                      </div>
                    </TableCell>
                    <TableCell>{empData.employee.department}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{empData.payslips.length}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-blue-600 font-medium">{empData.totalViewed}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-purple-600 font-medium">{empData.totalDownloaded}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getAccessStatusColor(empData.payslips)}>
                        {getAccessStatus(empData.payslips)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {empData.lastLogin || 'Never'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Portal
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bell className="h-3 w-3 mr-1" />
                          Notify
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Portal Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Portal Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Access Settings</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-generate portal access</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email notifications</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Download restrictions</span>
                  <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Notification Settings</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">New payslip notifications</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Reminder notifications</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS notifications</span>
                  <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeePortal;
