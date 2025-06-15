
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Send, Mail, MessageSquare, FileText } from "lucide-react";

interface SendBillDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bill: any;
  onBillSent: (bill: any, method: string) => void;
}

const SendBillDialog = ({ isOpen, onClose, bill, onBillSent }: SendBillDialogProps) => {
  const [sendMethod, setSendMethod] = useState('email');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    onBillSent(bill, sendMethod);
  };

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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send Bill
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bill Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Bill Number:</span>
                  <span className="font-medium">{bill?.billNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Patient:</span>
                  <span className="font-medium">{bill?.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount:</span>
                  <span className="font-medium">₹{bill?.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge className={getStatusColor(bill?.status)}>
                    {bill?.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Send Method */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Send Method</Label>
            <RadioGroup value={sendMethod} onValueChange={setSendMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sms" id="sms" />
                <Label htmlFor="sms" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  SMS
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whatsapp" id="whatsapp" />
                <Label htmlFor="whatsapp" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="print" id="print" />
                <Label htmlFor="print" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Print
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Additional Message */}
          <div className="space-y-2">
            <Label>Additional Message (Optional)</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSend}>
              <Send className="h-4 w-4 mr-2" />
              Send Bill
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendBillDialog;
