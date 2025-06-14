
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, DollarSign, Eye } from "lucide-react";
import { CommissionApproval, ApprovalStatus, ApprovalAction } from "@/types/approval";
import { useToast } from "@/hooks/use-toast";

const CommissionApprovalWorkflow = () => {
  const { toast } = useToast();
  const [selectedApproval, setSelectedApproval] = useState<CommissionApproval | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  // Mock data - in real app this would come from API
  const [approvals, setApprovals] = useState<CommissionApproval[]>([
    {
      id: '1',
      doctorId: 'doc1',
      doctorName: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      period: '2024-01',
      totalCommission: 38500,
      consultations: 45,
      surgeries: 8,
      status: 'pending',
      submittedDate: new Date('2024-01-28'),
      breakdown: {
        consultationCommission: 22500,
        surgeryCommission: 16000
      }
    },
    {
      id: '2',
      doctorId: 'doc2',
      doctorName: 'Dr. Michael Chen',
      department: 'Neurology',
      period: '2024-01',
      totalCommission: 32200,
      consultations: 38,
      surgeries: 5,
      status: 'approved',
      submittedDate: new Date('2024-01-28'),
      reviewedDate: new Date('2024-01-30'),
      reviewedBy: 'Admin User',
      breakdown: {
        consultationCommission: 19200,
        surgeryCommission: 13000
      }
    },
    {
      id: '3',
      doctorId: 'doc3',
      doctorName: 'Dr. Emily Davis',
      department: 'General Medicine',
      period: '2024-01',
      totalCommission: 26000,
      consultations: 52,
      surgeries: 0,
      status: 'rejected',
      submittedDate: new Date('2024-01-28'),
      reviewedDate: new Date('2024-01-29'),
      reviewedBy: 'Admin User',
      notes: 'Discrepancy in consultation count - needs verification',
      breakdown: {
        consultationCommission: 26000,
        surgeryCommission: 0
      }
    }
  ]);

  const getStatusBadge = (status: ApprovalStatus) => {
    const variants = {
      pending: { variant: 'secondary', icon: <Clock className="w-3 h-3" />, text: 'Pending' },
      approved: { variant: 'default', icon: <CheckCircle className="w-3 h-3" />, text: 'Approved' },
      rejected: { variant: 'destructive', icon: <XCircle className="w-3 h-3" />, text: 'Rejected' },
      paid: { variant: 'default', icon: <DollarSign className="w-3 h-3" />, text: 'Paid' }
    };

    const config = variants[status];
    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        {config.icon}
        {config.text}
      </Badge>
    );
  };

  const handleApprovalAction = (action: 'approve' | 'reject') => {
    if (!selectedApproval) return;

    const updatedApprovals = approvals.map(approval => {
      if (approval.id === selectedApproval.id) {
        return {
          ...approval,
          status: action === 'approve' ? 'approved' as ApprovalStatus : 'rejected' as ApprovalStatus,
          reviewedDate: new Date(),
          reviewedBy: 'Current User', // In real app, get from auth context
          notes: reviewNotes || undefined
        };
      }
      return approval;
    });

    setApprovals(updatedApprovals);
    setIsReviewDialogOpen(false);
    setReviewNotes('');
    setSelectedApproval(null);

    toast({
      title: `Commission ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `Dr. ${selectedApproval.doctorName}'s commission has been ${action}d.`,
    });
  };

  const openReviewDialog = (approval: CommissionApproval) => {
    setSelectedApproval(approval);
    setReviewNotes('');
    setIsReviewDialogOpen(true);
  };

  const pendingApprovals = approvals.filter(a => a.status === 'pending');
  const processedApprovals = approvals.filter(a => a.status !== 'pending');

  const totalPendingAmount = pendingApprovals.reduce((sum, a) => sum + a.totalCommission, 0);
  const totalApprovedAmount = approvals
    .filter(a => a.status === 'approved')
    .reduce((sum, a) => sum + a.totalCommission, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Commission Approval Workflow</h2>
          <p className="text-gray-600">Review and approve doctor commissions before payout</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="w-48">
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Pending Approval</div>
              <div className="text-2xl font-bold text-orange-600">₹{totalPendingAmount.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{pendingApprovals.length} submissions</div>
            </CardContent>
          </Card>
          <Card className="w-48">
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Approved This Month</div>
              <div className="text-2xl font-bold text-green-600">₹{totalApprovedAmount.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending Approvals ({pendingApprovals.length})
          </TabsTrigger>
          <TabsTrigger value="processed">
            Processed ({processedApprovals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Commission Approvals</CardTitle>
              <CardDescription>Commissions awaiting review and approval</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Consultations</TableHead>
                    <TableHead>Surgeries</TableHead>
                    <TableHead>Total Commission</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell className="font-medium">{approval.doctorName}</TableCell>
                      <TableCell>{approval.department}</TableCell>
                      <TableCell>{approval.period}</TableCell>
                      <TableCell>{approval.consultations}</TableCell>
                      <TableCell>{approval.surgeries}</TableCell>
                      <TableCell className="font-bold">₹{approval.totalCommission.toLocaleString()}</TableCell>
                      <TableCell>{approval.submittedDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Commission Details</DialogTitle>
                                <DialogDescription>
                                  {approval.doctorName} - {approval.period}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm text-gray-600">Consultations</Label>
                                    <div className="font-medium">{approval.consultations} (₹{approval.breakdown.consultationCommission.toLocaleString()})</div>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-600">Surgeries</Label>
                                    <div className="font-medium">{approval.surgeries} (₹{approval.breakdown.surgeryCommission.toLocaleString()})</div>
                                  </div>
                                </div>
                                <div className="pt-3 border-t">
                                  <Label className="text-sm text-gray-600">Total Commission</Label>
                                  <div className="text-xl font-bold">₹{approval.totalCommission.toLocaleString()}</div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            onClick={() => openReviewDialog(approval)}
                          >
                            Review
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processed">
          <Card>
            <CardHeader>
              <CardTitle>Processed Commission Approvals</CardTitle>
              <CardDescription>Previously reviewed commission submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Total Commission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reviewed By</TableHead>
                    <TableHead>Review Date</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell className="font-medium">{approval.doctorName}</TableCell>
                      <TableCell>{approval.department}</TableCell>
                      <TableCell>{approval.period}</TableCell>
                      <TableCell className="font-bold">₹{approval.totalCommission.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(approval.status)}</TableCell>
                      <TableCell>{approval.reviewedBy || '-'}</TableCell>
                      <TableCell>{approval.reviewedDate?.toLocaleDateString() || '-'}</TableCell>
                      <TableCell className="max-w-xs truncate">{approval.notes || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Commission</DialogTitle>
            <DialogDescription>
              Review and approve/reject commission for {selectedApproval?.doctorName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedApproval && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-sm text-gray-600">Doctor</Label>
                  <div className="font-medium">{selectedApproval.doctorName}</div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Department</Label>
                  <div className="font-medium">{selectedApproval.department}</div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Period</Label>
                  <div className="font-medium">{selectedApproval.period}</div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Total Commission</Label>
                  <div className="font-bold text-lg">₹{selectedApproval.totalCommission.toLocaleString()}</div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Review Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this commission review..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleApprovalAction('reject')}>
              Reject
            </Button>
            <Button onClick={() => handleApprovalAction('approve')}>
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommissionApprovalWorkflow;
