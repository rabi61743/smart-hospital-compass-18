
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Edit, Clock, Calendar } from "lucide-react";

const LeavePoliciesTab = () => {
  const leavePolicies = [
    {
      id: 'POL001',
      name: 'Annual Leave Policy',
      type: 'Annual Leave',
      accrualRate: '2.5 days/month',
      maxAccrual: '40 days',
      carryOver: '10 days',
      status: 'Active'
    },
    {
      id: 'POL002',
      name: 'Sick Leave Policy',
      type: 'Sick Leave',
      accrualRate: '1.25 days/month',
      maxAccrual: '15 days',
      carryOver: '5 days',
      status: 'Active'
    },
    {
      id: 'POL003',
      name: 'Personal Leave Policy',
      type: 'Personal Leave',
      accrualRate: '0.83 days/month',
      maxAccrual: '10 days',
      carryOver: '0 days',
      status: 'Active'
    },
    {
      id: 'POL004',
      name: 'Maternity/Paternity Leave',
      type: 'Family Leave',
      accrualRate: 'N/A',
      maxAccrual: '180 days',
      carryOver: 'N/A',
      status: 'Active'
    }
  ];

  const approvalWorkflow = [
    { step: 1, role: 'Direct Supervisor', action: 'Initial Review', timeLimit: '2 business days' },
    { step: 2, role: 'Department Head', action: 'Approval/Rejection', timeLimit: '3 business days' },
    { step: 3, role: 'HR Manager', action: 'Final Approval', timeLimit: '1 business day' },
    { step: 4, role: 'System', action: 'Auto-notification', timeLimit: 'Immediate' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Leave Policies */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Leave Policies
              </CardTitle>
              <CardDescription>Configure leave types and accrual rules</CardDescription>
            </div>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Policies
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Accrual Rate</TableHead>
                <TableHead>Max Accrual</TableHead>
                <TableHead>Carry Over</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leavePolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.name}</TableCell>
                  <TableCell>{policy.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {policy.accrualRate}
                    </div>
                  </TableCell>
                  <TableCell>{policy.maxAccrual}</TableCell>
                  <TableCell>{policy.carryOver}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(policy.status)}>
                      {policy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Approval Workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Approval Workflow
          </CardTitle>
          <CardDescription>Leave request approval process and timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {approvalWorkflow.map((step, index) => (
              <div key={step.step} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                  {step.step}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{step.role}</p>
                  <p className="text-sm text-muted-foreground">{step.action}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {step.timeLimit}
                </Badge>
                {index < approvalWorkflow.length - 1 && (
                  <div className="absolute left-8 mt-12 w-0.5 h-8 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accrual Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Accrual Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Annual Leave</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Accrues 2.5 days per month</li>
                <li>• Maximum 40 days per year</li>
                <li>• Up to 10 days can be carried over</li>
                <li>• Pro-rated for new employees</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Sick Leave</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Accrues 1.25 days per month</li>
                <li>• Maximum 15 days per year</li>
                <li>• Up to 5 days can be carried over</li>
                <li>• No medical certificate required for 1-2 days</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Restrictions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Blackout Periods</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• December 20-31 (Holiday season)</li>
                <li>• First week of January</li>
                <li>• Department-specific busy periods</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Notice Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 2 weeks notice for 5+ consecutive days</li>
                <li>• 1 week notice for 2-4 days</li>
                <li>• Same day for emergency leave</li>
                <li>• Manager approval required for all leave</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeavePoliciesTab;
