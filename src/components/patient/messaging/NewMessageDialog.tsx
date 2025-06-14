
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewMessageDialog = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const { toast } = useToast();

  const doctors = [
    { id: "1", name: "Dr. Sarah Johnson", specialty: "Primary Care" },
    { id: "2", name: "Dr. Michael Chen", specialty: "Cardiology" },
    { id: "3", name: "Dr. Emily Rodriguez", specialty: "Dermatology" },
    { id: "4", name: "Dr. James Wilson", specialty: "Orthopedics" },
  ];

  const handleSendMessage = () => {
    if (!selectedDoctor || !subject || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    console.log('Sending new message:', {
      doctor: selectedDoctor,
      subject,
      message,
      isUrgent
    });

    toast({
      title: "Message Sent",
      description: "Your message has been sent to the doctor",
    });

    // Reset form
    setSelectedDoctor('');
    setSubject('');
    setMessage('');
    setIsUrgent(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          New Message
        </CardTitle>
        <CardDescription>
          Send a secure message to your healthcare provider
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor *</Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              placeholder="Message subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            className="min-h-[120px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="urgent"
            checked={isUrgent}
            onCheckedChange={setIsUrgent}
          />
          <Label htmlFor="urgent" className="text-sm">
            Mark as urgent (requires immediate attention)
          </Label>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2">Important Note:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• For medical emergencies, call 911 or go to the nearest emergency room</li>
            <li>• Allow 24-48 hours for non-urgent responses</li>
            <li>• Urgent messages will be reviewed within 4 hours during business hours</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSendMessage} className="flex-1">
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewMessageDialog;
