
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Clock, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LeaveApprovalsTab = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [approvalComments, setApprovalComments] = useState('');

  const pendingApprovals = [
    {
      id: 'LR002',
      employee: 'Nurse Mary Wilson',
      department: 'General Medicine',
      leaveType: 'Sick Leave',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      days: 2,
      reason: 'Flu symptoms, doctor advised rest',
      appliedDate: '2024-01-17',
      currentBalance: 15,
      requestedDays: 2
    },
    {
      id: 'LR005',
      employee: 'Pharmacy Tech Lisa Davis',
      department: 'Pharmacy',
      leaveType: 'Annual Leave',
      startDate: '2024-02-05',
      endDate: '2024-02-09',
      days: 5,
      reason: 'Family vacation',
      appliedDate: '2024-01-16',
      currentBalance: 20,
      requestedDays: 5
    },
    {
      id: 'LR006',
      employee: 'Dr. James Wilson',
      department: 'Orthopedics',
      leaveType: 'Personal Leave',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      reason: 'Personal family matter',
      appliedDate: '2024-01-18',
      currentBalance: 8,
      requestedDays: 2
    }
  ];

  const handleApprove = (request: any) => {
    setSelectedRequest(request);
    setShowApprovalDialog(true);
  };

  const handleReject = (request: any) => {
    setSelectedRequest(request);
    setShowApprovalDialog(true);
  };

  const confirmApproval = (approved: boolean) => {
    toast({
      title: approved ? "Leave Approved" : "Leave Rejected",
      description: `${selectedRequest?.employee}'s leave request has been ${approved ? 'approved' : 'rejected'}`,
    });
    setShowApprovalDialog(false);
    setSelectedRequest(null);
    setApprovalComments('');
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'Annual Leave': return 'bg-blue-100 text-blue-800';
      case 'Sick Leave': return 'bg-red-100 text-red-800';
      case 'Personal Leave': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <p className="text-2xl font-bold text-orange-600">{pendingApprovals.length}</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected Today</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <div className="bg-red-100 p-2 rounded-lg">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Leave Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Current Balance</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingApprovals.map((request) => (
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
                    <div>
                      <p className="font-medium">{request.days} days</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{request.currentBalance} days</p>
                      <p className="text-sm text-muted-foreground">
                        After: {request.currentBalance - request.requestedDays} days
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-48">
                      <p className="text-sm truncate" title={request.reason}>{request.reason}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleApprove(request)}
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleReject(request)}
                        size="sm" 
                        variant="destructive"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Request Approval</DialogTitle>
            <DialogDescription>
              Review and approve/reject the leave request for {selectedRequest?.employee}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Employee</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.employee}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Leave Type</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.leaveType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.days} days</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Current Balance</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.currentBalance} days</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Reason</p>
                <p className="text-sm text-muted-foreground">{selectedRequest.reason}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium">Comments (Optional)</label>
                <Textarea
                  value={approvalComments}
                  onChange={(e) => setApprovalComments(e.target.value)}
                  placeholder="Add any comments for the employee..."
                  className="mt-1"
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button 
                  onClick={() => confirmApproval(false)}
                  variant="destructive"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button 
                  onClick={() => confirmApproval(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveApprovalsTab;
