
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, User, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConsultationSchedulingDialogProps {
  children: React.ReactNode;
}

const ConsultationSchedulingDialog = ({ children }: ConsultationSchedulingDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organizationType: '',
    timeSlot: '',
    message: ''
  });
  const { toast } = useToast();

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const organizationTypes = [
    "Hospital", "Clinic", "Medical Center", "Diagnostic Center", 
    "Nursing Home", "Healthcare Network", "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !formData.timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time slot for your consultation.",
        variant: "destructive"
      });
      return;
    }

    console.log('Consultation scheduled:', {
      ...formData,
      date: selectedDate,
      scheduledAt: new Date().toISOString()
    });

    toast({
      title: "Consultation Scheduled!",
      description: `Your consultation has been scheduled for ${format(selectedDate, "PPP")} at ${formData.timeSlot}. We'll contact you shortly to confirm.`,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      organizationType: '',
      timeSlot: '',
      message: ''
    });
    setSelectedDate(undefined);
    setIsOpen(false);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Schedule a Consultation</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <User className="h-5 w-5 mr-2" />
                Contact Information
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orgType">Organization Type *</Label>
                <Select value={formData.organizationType} onValueChange={(value) => updateFormData('organizationType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizationTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Schedule Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Schedule Preferences
              </h3>
              
              <div className="space-y-2">
                <Label>Preferred Date *</Label>
                <div className="border rounded-md p-3">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) =>
                      date < new Date() || date.getDay() === 0 || date.getDay() === 6
                    }
                    className={cn("w-full pointer-events-auto")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Time Slot *</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={formData.timeSlot === slot ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFormData('timeSlot', slot)}
                      disabled={!selectedDate}
                      className="justify-start"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => updateFormData('message', e.target.value)}
              placeholder="Tell us about your organization, current challenges, or specific requirements..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              Schedule Consultation
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            * Our team will contact you within 24 hours to confirm your consultation appointment.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationSchedulingDialog;
