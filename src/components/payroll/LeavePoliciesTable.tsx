
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Edit, Clock } from "lucide-react";

interface LeavePolicy {
  id: string;
  name: string;
  type: string;
  accrualRate: string;
  maxAccrual: string;
  carryOver: string;
  status: string;
}

interface LeavePoliciesTableProps {
  leavePolicies: LeavePolicy[];
}

const LeavePoliciesTable = ({ leavePolicies }: LeavePoliciesTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
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
  );
};

export default LeavePoliciesTable;
