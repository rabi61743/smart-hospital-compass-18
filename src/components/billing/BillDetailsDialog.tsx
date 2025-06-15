
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, FileText, User, Calendar, CreditCard } from "lucide-react";

interface BillDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bill: any;
}

const BillDetailsDialog = ({ isOpen, onClose, bill }: BillDetailsDialogProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'partial':
        return 'bg-orange-100 text-orange-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Bill Details - {bill.billNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{bill.patientName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Patient ID</label>
                  <p className="font-medium">{bill.patientId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Insurance</label>
                  <p className="font-medium">{bill.insurance}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(bill.status)}>
                    {bill.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bill Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Bill Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bill Number</label>
                  <p className="font-medium">{bill.billNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <p className="font-medium">{new Date(bill.date).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Services</label>
                  <p className="font-medium">{bill.services}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-semibold text-lg">₹{bill.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Paid Amount:</span>
                  <span className="font-semibold text-green-600">₹{bill.paid.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Due Amount:</span>
                  <span className="font-bold text-red-600 text-lg">₹{bill.due.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BillDetailsDialog;
