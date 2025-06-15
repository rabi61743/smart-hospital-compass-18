
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Save } from "lucide-react";

interface EditBillDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bill: any;
  onBillUpdated: (bill: any) => void;
}

const EditBillDialog = ({ isOpen, onClose, bill, onBillUpdated }: EditBillDialogProps) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    services: '',
    amount: 0,
    paid: 0,
    insurance: '',
    status: 'pending'
  });

  useEffect(() => {
    if (bill) {
      setFormData({
        patientName: bill.patientName,
        patientId: bill.patientId,
        services: bill.services,
        amount: bill.amount,
        paid: bill.paid,
        insurance: bill.insurance,
        status: bill.status
      });
    }
  }, [bill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBill = {
      ...bill,
      ...formData,
      due: formData.amount - formData.paid
    };
    onBillUpdated(updatedBill);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Bill - {bill?.billNumber}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Patient Name</Label>
            <Input
              value={formData.patientName}
              onChange={(e) => handleInputChange('patientName', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Patient ID</Label>
            <Input
              value={formData.patientId}
              onChange={(e) => handleInputChange('patientId', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Services</Label>
            <Textarea
              value={formData.services}
              onChange={(e) => handleInputChange('services', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Total Amount (₹)</Label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', parseInt(e.target.value) || 0)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Paid Amount (₹)</Label>
              <Input
                type="number"
                value={formData.paid}
                onChange={(e) => handleInputChange('paid', parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Insurance</Label>
            <Input
              value={formData.insurance}
              onChange={(e) => handleInputChange('insurance', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Update Bill
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBillDialog;
