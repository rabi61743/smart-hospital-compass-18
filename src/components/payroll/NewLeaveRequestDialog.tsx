
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import LeaveRequestForm from './LeaveRequestForm';

interface NewLeaveRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewLeaveRequestDialog = ({ open, onOpenChange }: NewLeaveRequestDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            New Leave Request
          </DialogTitle>
          <DialogDescription>
            Submit a new leave request for approval
          </DialogDescription>
        </DialogHeader>

        <LeaveRequestForm onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default NewLeaveRequestDialog;
