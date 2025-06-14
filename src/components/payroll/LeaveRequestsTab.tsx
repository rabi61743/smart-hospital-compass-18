
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Clock, User } from "lucide-react";
import NewLeaveRequestDialog from './NewLeaveRequestDialog';

const LeaveRequestsTab = () => {
  const [showNewRequestDialog, setShowNewRequestDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const leaveRequests = [
    {
      id: 'LR001',
      employee: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      leaveType: 'Annual Leave',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      days: 5,
      status: 'Approved',
      appliedDate: '2024-01-10',
      approver: 'Dr. Rajesh Kumar'
    },
    {
      id: 'LR002',
      employee: 'Nurse Mary Wilson',
      department: 'General Medicine',
      leaveType: 'Sick Leave',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      days: 2,
      status: 'Pending',
      appliedDate: '2024-01-17',
      approver: null
    },
    {
      id: 'LR003',
      employee: 'Dr. Michael Chen',
      department: 'Emergency',
      leaveType: 'Personal Leave',
      startDate: '2024-01-22',
      endDate: '2024-01-22',
      days: 1,
      status: 'Approved',
      appliedDate: '2024-01-15',
      approver: 'Dr. Lisa Park'
    },
    {
      id: 'LR004',
      employee: 'Lab Tech John Smith',
      department: 'Laboratory',
      leaveType: 'Annual Leave',
      startDate: '2024-02-01',
      endDate: '2024-02-10',
      days: 10,
      status: 'Rejected',
      appliedDate: '2024-01-12',
      approver: 'Dr. Rajesh Kumar'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'Annual Leave': return 'bg-blue-100 text-blue-800';
      case 'Sick Leave': return 'bg-red-100 text-red-800';
      case 'Personal Leave': return 'bg-purple-100 text-purple-800';
      case 'Maternity Leave': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = filterStatus === 'all' 
    ? leaveRequests 
    : leaveRequests.filter(req => req.status.toLowerCase() === filterStatus);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setShowNewRequestDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approver</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{request.employee}</p>
                        <p className="text-sm text-muted-foreground">{request.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getLeaveTypeColor(request.leaveType)} variant="outline">
                      {request.leaveType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{request.days} days</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{new Date(request.appliedDate).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.approver || '--'}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NewLeaveRequestDialog 
        open={showNewRequestDialog} 
        onOpenChange={setShowNewRequestDialog} 
      />
    </div>
  );
};

export default LeaveRequestsTab;
