
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewBillDialogProps {
  onBillCreated: (bill: any) => void;
}

const NewBillDialog = ({ onBillCreated }: NewBillDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    services: '',
    amount: '',
    insurance: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.patientId || !formData.services || !formData.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newBill = {
      id: Date.now().toString(),
      patientName: formData.patientName,
      patientId: formData.patientId,
      billNumber: `BILL-2024-${Date.now().toString().slice(-3)}`,
      date: new Date().toISOString().split('T')[0],
      services: formData.services,
      amount: parseInt(formData.amount),
      paid: 0,
      due: parseInt(formData.amount),
      status: 'pending',
      insurance: formData.insurance || 'None'
    };

    onBillCreated(newBill);
    
    toast({
      title: "Success",
      description: "New bill created successfully",
    });

    setFormData({
      patientName: '',
      patientId: '',
      services: '',
      amount: '',
      insurance: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Bill
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Bill</DialogTitle>
          <DialogDescription>
            Enter the details for the new patient bill.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="Enter patient name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID *</Label>
              <Input
                id="patientId"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                placeholder="P001"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="services">Services *</Label>
            <Textarea
              id="services"
              value={formData.services}
              onChange={(e) => setFormData({ ...formData, services: e.target.value })}
              placeholder="Consultation, Lab Tests, etc."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹) *</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insurance">Insurance Provider</Label>
              <Select value={formData.insurance} onValueChange={(value) => setFormData({ ...formData, insurance: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select insurance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Star Health">Star Health</SelectItem>
                  <SelectItem value="HDFC ERGO">HDFC ERGO</SelectItem>
                  <SelectItem value="ICICI Lombard">ICICI Lombard</SelectItem>
                  <SelectItem value="Bajaj Allianz">Bajaj Allianz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Bill</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewBillDialog;
