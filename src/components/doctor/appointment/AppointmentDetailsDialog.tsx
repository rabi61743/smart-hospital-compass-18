
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Calendar, Clock, User, Phone, Mail, FileText } from "lucide-react";

interface AppointmentDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: any;
}

const AppointmentDetailsDialog = ({ isOpen, onClose, appointment }: AppointmentDetailsDialogProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Appointment Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Appointment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Appointment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Appointment ID</label>
                  <p className="font-medium">{appointment.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Time</label>
                  <p className="font-medium">{appointment.time}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <p className="font-medium">{appointment.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Duration</label>
                  <p className="font-medium">{appointment.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  <p className="font-medium">{appointment.patientName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Patient ID</label>
                  <p className="font-medium">{appointment.patientId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    Phone
                  </label>
                  <p className="font-medium">{appointment.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <p className="font-medium">{appointment.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {appointment.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{appointment.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Separator />

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline">
              Reschedule
            </Button>
            <Button variant="outline">
              Cancel Appointment
            </Button>
          </div>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsDialog;
